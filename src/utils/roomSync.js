import { ref, onValue, set, off } from 'firebase/database';
import { database, isConfigured } from './firebase';
import { PLAYER_DATABASE } from '../data/legendsData';

function formatTime() {
  const d = new Date();
  return d.toTimeString().split(' ')[0].substring(0, 5);
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
    this.isInitialized = false;
    this.firebaseListener = null;

    this.init();
  }

  init() {
    if (isConfigured && database) {
      // ----------------------------------------------------
      // FIREBASE ONLINE REALTIME SYNC
      // ----------------------------------------------------
      const dbRef = ref(database, `rooms/${this.roomCode}`);
      this.firebaseListener = onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        
        if (!this.isInitialized) {
          this.isInitialized = true;
          this.handleInitialState(val);
        } else {
          if (val) {
            this.cachedState = val;
            this.onStateChange(val);
          }
        }
      });
    } else {
      // ----------------------------------------------------
      // LOCAL BROADCAST & STORAGE SYNC (Fallback)
      // ----------------------------------------------------
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

      // Initialize state from localStorage
      const localVal = this.getLocalStorageState();
      this.handleInitialState(localVal);
    }
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

  handleInitialState(val) {
    const { myUserId, userName, selectedClub, isCreating, isPublic, onRoomNotFound } = this.options;

    if (!val) {
      // Room does not exist yet
      if (isCreating) {
        // We are the creator, so initialize the room
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
          availableDeck: PLAYER_DATABASE,
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
        this.saveAndBroadcast(initialState);
      } else {
        // User joined but room doesn't exist
        if (onRoomNotFound) {
          onRoomNotFound();
        }
      }
    } else {
      // Room already exists
      let state = { ...val };
      this.cachedState = state;

      // Join room if not already in the room
      if (myUserId) {
        if (!state.managers) state.managers = [];
        let myMgrIndex = state.managers.findIndex(m => m.id === myUserId);
        if (myMgrIndex === -1) {
          state.managers.push({
            id: myUserId,
            userName,
            teamId: selectedClub?.id || 'MUTD',
            teamName: selectedClub?.name || 'Manchester United',
            badge: selectedClub?.badge || '🔴',
            budget: 2000,
            squad: []
          });

          if (!state.chatMessages) state.chatMessages = [];
          state.chatMessages.push({
            sender: 'System',
            text: `${userName} joined the room.`,
            time: formatTime(),
            isSystem: true
          });

          this.saveAndBroadcast(state);
          return;
        }
      }
      this.onStateChange(state);
    }
  }

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

  saveAndBroadcast(newState) {
    this.cachedState = newState;
    if (isConfigured && database) {
      const dbRef = ref(database, `rooms/${this.roomCode}`);
      set(dbRef, newState)
        .then(() => {
          if (newState.isPublic) {
            this.updatePublicRoomsList(newState);
          }
        })
        .catch(err => console.error("Firebase write error:", err));
    } else {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(newState));

        if (newState.isPublic) {
          this.updatePublicRoomsList(newState);
        }

        if (this.broadcastChannel) {
          this.broadcastChannel.postMessage(newState);
        }
        this.onStateChange(newState);
      } catch (e) {
        console.error('Broadcast failed:', e);
      }
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
      set(publicRef, roomSummary).catch(err => console.error("Firebase public room write error:", err));
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
      return onValue(publicRef, (snapshot) => {
        const val = snapshot.val();
        if (val) {
          const list = Object.values(val);
          callback(list);
        } else {
          callback([]);
        }
      });
    } else {
      try {
        const raw = localStorage.getItem('football_auction_public_rooms');
        const list = raw ? JSON.parse(raw) : [];
        callback(list);
      } catch (e) {
        callback([]);
      }
      return null;
    }
  }

  close() {
    if (isConfigured && database) {
      if (this.firebaseListener) {
        const dbRef = ref(database, `rooms/${this.roomCode}`);
        off(dbRef);
      }
    } else {
      if (this.broadcastChannel) {
        this.broadcastChannel.close();
      }
      window.removeEventListener('storage', this.handleStorageEvent);
    }
  }
}
