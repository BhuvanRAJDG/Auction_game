import { ref, onValue, set, update, off } from 'firebase/database';
import { database, isConfigured } from './firebase';

function formatTime() {
  const d = new Date();
  return d.toTimeString().split(' ')[0].substring(0, 5);
}

// Strip large fields that should NOT be synced through Firebase
function stripHeavyFields(state) {
  const { availableDeck, ...lightState } = state;
  return lightState;
}

export class RoomSync {
  constructor(roomCode, onStateChange, options = {}) {
    this.roomCode = roomCode ? roomCode.toUpperCase() : 'DEFAULT';
    this.onStateChange = onStateChange;
    this.options = options;
    this.channelName = `football_auction_room_${this.roomCode}`;
    this.storageKey = `football_auction_data_${this.roomCode}`;

    this.broadcastChannel = null;
    this.cachedState = null;
    this.unsubscribeFn = null; // Firebase unsubscribe function

    this.init();
  }

  init() {
    if (isConfigured && database) {
      // -----------------------------------------------
      // FIREBASE ONLINE REALTIME SYNC
      // -----------------------------------------------
      const dbRef = ref(database, `rooms/${this.roomCode}`);
      this.unsubscribeFn = onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        this._handleFirebaseSnapshot(val);
      }, (err) => {
        console.error('Firebase read error:', err);
        if (err.code === 'PERMISSION_DENIED') {
          alert('Firebase Permission Denied! Go to Firebase Console → Realtime Database → Rules and set both .read and .write to "true".');
        }
      });

    } else {
      // -----------------------------------------------
      // LOCAL BROADCAST & STORAGE SYNC (Fallback)
      // -----------------------------------------------
      if ('BroadcastChannel' in window) {
        this.broadcastChannel = new BroadcastChannel(this.channelName);
        this.broadcastChannel.onmessage = (event) => {
          if (event.data) {
            this.cachedState = event.data;
            this.onStateChange(event.data);
          }
        };
      }
      window.addEventListener('storage', this.handleStorageEvent);

      // Initialize from localStorage
      const localVal = this.getLocalStorageState();
      this._handleLocalSnapshot(localVal);
    }
  }

  // Called on EVERY Firebase snapshot update
  _handleFirebaseSnapshot(val) {
    const { myUserId, userName, selectedClub, isCreating, isPublic, onRoomNotFound } = this.options;

    if (!val) {
      // No room exists in Firebase
      if (isCreating) {
        // HOST: create room
        const initialState = {
          hostId: myUserId,
          roomCode: this.roomCode,
          status: 'WAITING',
          isPublic: isPublic ?? true,
          isPaused: false,
          currentLotIndex: 0,
          currentBid: 0,
          highestBidder: null,
          timerSeconds: 10,
          // NOTE: availableDeck is NOT stored in Firebase
          chatMessages: [
            { sender: 'System', text: `Room ${this.roomCode} created. Share code to invite friends!`, time: formatTime(), isSystem: true }
          ],
          managers: [
            {
              id: myUserId,
              userName,
              teamId: selectedClub?.id || 'MUTD',
              teamName: selectedClub?.name || 'Manchester United',
              badge: selectedClub?.badge || '🔴',
              budget: 2000,
              squad: []
            }
          ],
          activityLogs: []
        };
        this._writeToFirebase(initialState);
        // Don't call onStateChange here - wait for Firebase to confirm the write
        // by triggering another onValue snapshot
      } else {
        // JOINER: room not found
        if (onRoomNotFound) onRoomNotFound();
      }
      return;
    }

    // Room exists in Firebase
    let state = { ...val };

    // Check if this device is already in the room
    if (!state.managers) state.managers = [];
    const myMgrIndex = state.managers.findIndex(m => m.id === myUserId);

    if (myUserId && myMgrIndex === -1) {
      // JOINER: add self to managers
      const updatedManagers = [
        ...state.managers,
        {
          id: myUserId,
          userName,
          teamId: selectedClub?.id || 'MUTD',
          teamName: selectedClub?.name || 'Manchester United',
          badge: selectedClub?.badge || '🔴',
          budget: 2000,
          squad: []
        }
      ];

      const updatedChat = [
        ...(state.chatMessages || []),
        { sender: 'System', text: `${userName} joined the room.`, time: formatTime(), isSystem: true }
      ];

      // Write ONLY the updated managers & chat to Firebase (not the full state)
      const dbRef = ref(database, `rooms/${this.roomCode}`);
      update(dbRef, {
        managers: updatedManagers,
        chatMessages: updatedChat
      }).catch(err => {
        console.error('Firebase join error:', err);
        if (err.code === 'PERMISSION_DENIED') {
          alert('Firebase Permission Denied! Please set Realtime Database Rules to Test Mode.');
        }
      });
      // Don't call onStateChange here - let the next Firebase snapshot handle it
      return;
    }

    // This device is already in the room — apply the full state from Firebase
    this.cachedState = state;
    this.onStateChange(state);
  }

  // Local (offline) fallback snapshot handler
  _handleLocalSnapshot(val) {
    const { myUserId, userName, selectedClub, isCreating, isPublic, onRoomNotFound } = this.options;

    if (!val) {
      if (isCreating) {
        const initialState = {
          hostId: myUserId,
          roomCode: this.roomCode,
          status: 'WAITING',
          isPublic: isPublic ?? true,
          isPaused: false,
          currentLotIndex: 0,
          currentBid: 0,
          highestBidder: null,
          timerSeconds: 10,
          chatMessages: [
            { sender: 'System', text: `Room ${this.roomCode} created. Share code to invite friends!`, time: formatTime(), isSystem: true }
          ],
          managers: [
            {
              id: myUserId,
              userName,
              teamId: selectedClub?.id || 'MUTD',
              teamName: selectedClub?.name || 'Manchester United',
              badge: selectedClub?.badge || '🔴',
              budget: 2000,
              squad: []
            }
          ],
          activityLogs: []
        };
        this.cachedState = initialState;
        this._broadcastLocal(initialState);
        this.onStateChange(initialState);
      } else {
        if (onRoomNotFound) onRoomNotFound();
      }
      return;
    }

    let state = { ...val };
    if (!state.managers) state.managers = [];
    const myMgrIndex = state.managers.findIndex(m => m.id === myUserId);

    if (myUserId && myMgrIndex === -1) {
      state.managers = [
        ...state.managers,
        {
          id: myUserId,
          userName,
          teamId: selectedClub?.id || 'MUTD',
          teamName: selectedClub?.name || 'Manchester United',
          badge: selectedClub?.badge || '🔴',
          budget: 2000,
          squad: []
        }
      ];
      state.chatMessages = [
        ...(state.chatMessages || []),
        { sender: 'System', text: `${userName} joined the room.`, time: formatTime(), isSystem: true }
      ];
      this._broadcastLocal(state);
    }

    this.cachedState = state;
    this.onStateChange(state);
  }

  handleStorageEvent = (e) => {
    if (e.key === this.storageKey && e.newValue) {
      try {
        const newState = JSON.parse(e.newValue);
        this.cachedState = newState;
        this.onStateChange(newState);
      } catch (err) {
        console.error('Storage sync error:', err);
      }
    }
  };

  getLocalStorageState() {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  getRoomState() {
    return this.cachedState;
  }

  _writeToFirebase(state) {
    const lightState = stripHeavyFields(state);
    this.cachedState = state; // Cache includes availableDeck locally
    const dbRef = ref(database, `rooms/${this.roomCode}`);
    return set(dbRef, lightState).catch(err => {
      console.error('Firebase write error:', err);
      if (err.code === 'PERMISSION_DENIED') {
        alert('Firebase Permission Denied! Please set your Realtime Database Rules to Test Mode.');
      }
    });
  }

  _broadcastLocal(state) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(state));
      if (this.broadcastChannel) {
        this.broadcastChannel.postMessage(state);
      }
    } catch (e) {
      console.error('Local broadcast failed:', e);
    }
  }

  saveAndBroadcast(newState) {
    this.cachedState = newState;

    if (isConfigured && database) {
      // Strip availableDeck before writing to Firebase
      // This prevents flooding Firebase with 250 players on every state change
      const lightState = stripHeavyFields(newState);
      const dbRef = ref(database, `rooms/${this.roomCode}`);
      set(dbRef, lightState)
        .then(() => {
          if (newState.isPublic) this.updatePublicRoomsList(newState);
        })
        .catch(err => {
          console.error('Firebase saveAndBroadcast error:', err);
          if (err.code === 'PERMISSION_DENIED') {
            alert('Firebase Permission Denied! Set Realtime Database Rules to Test Mode.');
          }
        });
    } else {
      this._broadcastLocal(newState);
      this.onStateChange(newState);
    }
  }

  updatePublicRoomsList(roomState) {
    const roomSummary = {
      roomCode: roomState.roomCode,
      status: roomState.status,
      playerCount: roomState.managers ? roomState.managers.length : 1,
      hostName: roomState.managers?.[0]?.userName || 'Host',
      createdAt: roomState.createdAt || Date.now()
    };

    if (isConfigured && database) {
      const publicRef = ref(database, `public_rooms/${this.roomCode}`);
      set(publicRef, roomSummary).catch(err => console.error("Public room update error:", err));
    } else {
      try {
        const rawList = localStorage.getItem('football_auction_public_rooms');
        let list = rawList ? JSON.parse(rawList) : [];
        const index = list.findIndex(r => r.roomCode === roomState.roomCode);
        if (index !== -1) {
          list[index] = roomSummary;
        } else {
          list.push(roomSummary);
        }
        localStorage.setItem('football_auction_public_rooms', JSON.stringify(list));
      } catch (e) {
        console.error('Public room list update failed:', e);
      }
    }
  }

  static getPublicRooms(callback) {
    if (isConfigured && database) {
      const publicRef = ref(database, 'public_rooms');
      const unsubFn = onValue(publicRef, (snapshot) => {
        const val = snapshot.val();
        callback(val ? Object.values(val) : []);
      });
      return unsubFn;
    } else {
      try {
        const raw = localStorage.getItem('football_auction_public_rooms');
        callback(raw ? JSON.parse(raw) : []);
      } catch (e) {
        callback([]);
      }
      return null;
    }
  }

  close() {
    if (isConfigured && database) {
      if (this.unsubscribeFn) {
        this.unsubscribeFn(); // Properly unsubscribe using the returned function
        this.unsubscribeFn = null;
      }
    } else {
      if (this.broadcastChannel) {
        this.broadcastChannel.close();
      }
      window.removeEventListener('storage', this.handleStorageEvent);
    }
  }
}
