import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HomeDashboard from './components/HomeDashboard';
import RoomLobby from './components/RoomLobby';
import AuctionStage from './components/AuctionStage';

import { FOOTBALL_CLUBS } from './data/teamsData';
import { PLAYER_DATABASE } from './data/legendsData';
import { RoomSync } from './utils/roomSync';
import { audioSystem } from './utils/audioSystem';

function formatTime() {
  const d = new Date();
  return d.toTimeString().split(' ')[0].substring(0, 5);
}

export default function App() {
  // Parse URL query parameter e.g. ?room=AXG8YD
  const urlParams = new URLSearchParams(window.location.search);
  const initialRoomCode = urlParams.get('room') || null;

  // Persistent User ID in localStorage
  const [myUserId] = useState(() => {
    let saved = localStorage.getItem('football_auction_user_id');
    if (!saved) {
      saved = `user_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('football_auction_user_id', saved);
    }
    return saved;
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('football_auction_user_name') || 'Player';
  });

  const [selectedClub, setSelectedClub] = useState(FOOTBALL_CLUBS[0]);

  // Current view: 'HOME' | 'LOBBY' | 'ARENA'
  const [view, setView] = useState(initialRoomCode ? 'LOBBY' : 'HOME');

  // Room State
  const [roomCode, setRoomCode] = useState(initialRoomCode);
  const [isHost, setIsHost] = useState(false);
  const [roomStatus, setRoomStatus] = useState('WAITING'); // 'WAITING' | 'IN_PROGRESS' | 'COMPLETED'
  const [isPaused, setIsPaused] = useState(false);
  const [currentLotIndex, setCurrentLotIndex] = useState(0);
  const [currentBid, setCurrentBid] = useState(0);
  const [highestBidder, setHighestBidder] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(10);
  const [managers, setManagers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [availableDeck, setAvailableDeck] = useState(PLAYER_DATABASE);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isPublicRoom, setIsPublicRoom] = useState(true);

  const roomSyncRef = useRef(null);

  // Active player on block
  const currentLot = availableDeck[currentLotIndex] || null;

  // Sync state whenever roomCode changes
  useEffect(() => {
    if (!roomCode) {
      setView('HOME');
      return;
    }

    const sync = new RoomSync(roomCode, handleRemoteStateChange, {
      myUserId,
      userName,
      selectedClub,
      isCreating: isCreatingRoom,
      isPublic: isPublicRoom,
      onRoomNotFound: () => {
        alert('Room not found or expired.');
        handleGoHome();
      }
    });
    roomSyncRef.current = sync;

    return () => {
      sync.close();
    };
  }, [roomCode, isCreatingRoom, isPublicRoom]);

  // Apply state update to component
  const applyRoomState = (state) => {
    if (!state) return;
    setIsHost(state.hostId === myUserId);
    setRoomStatus(state.status || 'WAITING');
    setIsPaused(state.isPaused || false);
    setCurrentLotIndex(state.currentLotIndex || 0);
    setCurrentBid(state.currentBid || 0);
    setHighestBidder(state.highestBidder || null);
    setTimerSeconds(state.timerSeconds !== undefined ? state.timerSeconds : 10);
    if (state.availableDeck) setAvailableDeck(state.availableDeck);
    if (state.managers) setManagers(state.managers);
    if (state.chatMessages) setChatMessages(state.chatMessages);
    if (state.activityLogs) setActivityLogs(state.activityLogs);

    // Auto-transition to ARENA if status is IN_PROGRESS
    if (state.status === 'IN_PROGRESS') {
      setView('ARENA');
    } else if (state.status === 'WAITING') {
      setView('LOBBY');
    }
  };

  const handleRemoteStateChange = (newState) => {
    applyRoomState(newState);
  };

  const broadcastStateChange = (updatedFields) => {
    const currentState = roomSyncRef.current?.getRoomState() || {};
    const newState = {
      ...currentState,
      ...updatedFields
    };
    applyRoomState(newState);
    roomSyncRef.current?.saveAndBroadcast(newState);
  };

  // 1. Host Countdown Timer Interval (Runs only when status === 'IN_PROGRESS')
  useEffect(() => {
    if (!isHost || isPaused || roomStatus !== 'IN_PROGRESS' || !currentLot) return;

    const timer = setInterval(() => {
      const currentState = roomSyncRef.current?.getRoomState();
      if (!currentState || currentState.isPaused || currentState.status !== 'IN_PROGRESS') return;

      const newTime = currentState.timerSeconds - 1;
      if (newTime <= 0) {
        clearInterval(timer);
        handleHostSellNow();
      } else {
        broadcastStateChange({ timerSeconds: newTime });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isHost, isPaused, roomStatus, currentLotIndex]);

  // Create Room action from Home
  const handleCreateRoom = (newCode, isPublic) => {
    localStorage.setItem('football_auction_user_name', userName);
    setIsCreatingRoom(true);
    setIsPublicRoom(isPublic);
    setRoomCode(newCode);

    // Update URL query
    const newUrl = `${window.location.pathname}?room=${newCode}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    setView('LOBBY');
  };

  // Join Room action from Home
  const handleJoinRoom = (codeToJoin) => {
    localStorage.setItem('football_auction_user_name', userName);
    setIsCreatingRoom(false);
    setRoomCode(codeToJoin);

    const newUrl = `${window.location.pathname}?room=${codeToJoin}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    setView('LOBBY');
  };

  // Host starts auction game
  const handleStartAuction = () => {
    const startLog = { type: 'START', text: 'Auction has started!', time: formatTime() };
    setActivityLogs([startLog]);
    broadcastStateChange({
      status: 'IN_PROGRESS',
      activityLogs: [startLog],
      chatMessages: [
        ...chatMessages,
        { sender: 'System', text: 'Auction Started! First player on the block.', time: formatTime(), isSystem: true }
      ]
    });
    setView('ARENA');
  };

  // Change club inside room lobby
  const handleChangeClub = (newClub) => {
    const updatedManagers = managers.map(m => {
      if (m.id === myUserId) {
        return {
          ...m,
          teamId: newClub.id,
          teamName: newClub.name,
          badge: newClub.badge
        };
      }
      return m;
    });

    const newChat = [
      ...chatMessages,
      { sender: 'System', text: `${userName} selected ${newClub.name}`, time: formatTime(), isSystem: true }
    ];

    broadcastStateChange({
      managers: updatedManagers,
      chatMessages: newChat
    });
  };

  // Send Chat message
  const handleSendMessage = (text) => {
    const newMsg = {
      sender: userName,
      text,
      time: formatTime(),
      isSystem: false
    };

    broadcastStateChange({
      chatMessages: [...chatMessages, newMsg]
    });
  };

  // Place a Bid in Auction
  const handlePlaceBid = (amount) => {
    const myMgr = managers.find(m => m.id === myUserId);
    if (!myMgr) return;
    if (amount > myMgr.budget) {
      alert(`Cannot bid £${amount}M! Purse is £${myMgr.budget}M`);
      return;
    }

    audioSystem.playBid();

    const newBidder = {
      id: myUserId,
      userName: myMgr.userName,
      teamName: myMgr.teamName,
      badge: myMgr.badge
    };

    const newLog = { type: 'BID', text: `${myMgr.teamName} bids £${amount}M for ${currentLot?.name || 'player'}`, time: formatTime() };
    const updatedLogs = [...activityLogs, newLog];
    setActivityLogs(updatedLogs);

    broadcastStateChange({
      currentBid: amount,
      highestBidder: newBidder,
      timerSeconds: 10,
      activityLogs: updatedLogs
    });
  };

  // Host Pause / Resume
  const handleHostTogglePause = () => {
    broadcastStateChange({ isPaused: !isPaused });
  };

  // Host Sell Now
  const handleHostSellNow = () => {
    const currentState = roomSyncRef.current?.getRoomState();
    if (!currentState) return;

    audioSystem.playHammer();

    let updatedManagers = [...currentState.managers];
    let soldLog = null;

    if (currentState.highestBidder) {
      const winnerId = currentState.highestBidder.id;
      const price = currentState.currentBid;
      const soldPlayer = currentState.availableDeck[currentState.currentLotIndex];

      soldLog = { type: 'SOLD', text: `${soldPlayer?.name} sold to ${currentState.highestBidder.teamName} for £${price}M!`, time: formatTime() };

      updatedManagers = updatedManagers.map(m => {
        if (m.id === winnerId) {
          return {
            ...m,
            budget: m.budget - price,
            squad: [...m.squad, soldPlayer]
          };
        }
        return m;
      });
    }

    const nextIndex = currentState.currentLotIndex + 1;
    const updatedLogs = soldLog ? [...activityLogs, soldLog] : activityLogs;
    setActivityLogs(updatedLogs);

    broadcastStateChange({
      managers: updatedManagers,
      currentLotIndex: nextIndex,
      currentBid: 0,
      highestBidder: null,
      timerSeconds: 10,
      activityLogs: updatedLogs
    });
  };

  // Host Skip Lot
  const handleHostSkipLot = () => {
    const currentState = roomSyncRef.current?.getRoomState();
    if (!currentState) return;

    broadcastStateChange({
      currentLotIndex: currentState.currentLotIndex + 1,
      currentBid: 0,
      highestBidder: null,
      timerSeconds: 10
    });
  };

  // Host Nominate specific player
  const handleHostNominatePlayer = (player) => {
    const idx = availableDeck.findIndex(p => p.id === player.id);
    if (idx !== -1) {
      broadcastStateChange({
        currentLotIndex: idx,
        currentBid: 0,
        highestBidder: null,
        timerSeconds: 10
      });
    }
  };

  // Return to Home
  const handleGoHome = () => {
    window.history.pushState({ path: window.location.pathname }, '', window.location.pathname);
    setRoomCode(null);
    setView('HOME');
  };

  const myManager = managers.find(m => m.id === myUserId) || {
    badge: selectedClub.badge,
    teamName: selectedClub.name,
    budget: 2000,
    squad: []
  };

  return (
    <div className="main-app">
      
      {/* Top Navbar */}
      <Navbar
        roomCode={roomCode}
        managerCount={managers.length}
        isHost={isHost}
        isPaused={isPaused}
        onTogglePause={handleHostTogglePause}
        onEndAuction={handleHostSellNow}
        onOpenSim={() => {}}
        onGoHome={handleGoHome}
      />

      {/* View 1: Home Dashboard */}
      {view === 'HOME' && (
        <HomeDashboard
          userName={userName}
          setUserName={setUserName}
          selectedClub={selectedClub}
          setSelectedClub={setSelectedClub}
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinRoom}
        />
      )}

      {/* View 2: Room Waiting Lobby (Matches Screenshot 1) */}
      {view === 'LOBBY' && (
        <RoomLobby
          roomCode={roomCode}
          isHost={isHost}
          myUserId={myUserId}
          userName={userName}
          selectedClub={selectedClub}
          setSelectedClub={setSelectedClub}
          managers={managers}
          chatMessages={chatMessages}
          onSendMessage={handleSendMessage}
          onStartAuction={handleStartAuction}
          onChangeClub={handleChangeClub}
        />
      )}

      {/* View 3: Live Auction Arena (IN_PROGRESS) — Full Screen like screenshot */}
      {view === 'ARENA' && (
        <AuctionStage
          currentLot={currentLot}
          currentBid={currentBid}
          highestBidder={highestBidder}
          timerSeconds={timerSeconds}
          isPaused={isPaused}
          userTeam={selectedClub}
          userBudget={myManager.budget}
          userSquad={myManager.squad || []}
          activityLogs={activityLogs}
          chatMessages={chatMessages}
          myUserId={myUserId}
          onPlaceBid={handlePlaceBid}
          onSendMessage={handleSendMessage}
          onNominateNext={handleHostSkipLot}
        />
      )}

    </div>
  );
}


