import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { CHALLENGES, OPPONENT_NAMES, SPEED_PROFILES } from '../challenges';
import { playSound } from '../audio';
import { music } from '../music';
import { loadStats, saveStats, deepEqual, generateRoomCode } from './helpers';

const GameContext = createContext();

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [screen, setScreen] = useState('landing');
  const [stats, setStats] = useState(loadStats());
  const [toasts, setToasts] = useState([]);
  const [musicState, setMusicState] = useState({ playing: false, volume: 35, mood: 'menu' });
  const [roomInput, setRoomInput] = useState('');
  
  // Multiplayer
  const [roomCode, setRoomCode] = useState(null);
  const [isAiMode, setIsAiMode] = useState(false);
  const [speedSetting, setSpeedSetting] = useState('normal');
  const [playerName] = useState(() => OPPONENT_NAMES[Math.floor(Math.random() * OPPONENT_NAMES.length)]);
  const [players, setPlayers] = useState({});
  const [isHost, setIsHost] = useState(false);
  const [socketId, setSocketId] = useState(null);
  
  const [challenge, setChallenge] = useState(null);
  const [countdown, setCountdown] = useState(null);
  
  const [studyTimeRemaining, setStudyTimeRemaining] = useState(8);
  const [studyProgress, setStudyProgress] = useState(0);
  const [studyCanStart, setStudyCanStart] = useState(false);
  
  const [gameActive, setGameActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [codeValue, setCodeValue] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [runError, setRunError] = useState(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [winner, setWinner] = useState(null);
  const [solutionRevealed, setSolutionRevealed] = useState(false);

  const startTimeRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const studyTimerRef = useRef(null);
  const opponentTimersRef = useRef([]);
  const socketIdRef = useRef(null);

  const showToast = useCallback((msg, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const socketUrl = isAiMode ? null : `ws://ringleted-unreposefully-lachlan.ngrok-free.dev/?room=${roomCode || 'lobby'}&name=${playerName}`;
  const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
  });

  const socket = {
    id: socketId,
    send: sendMessage
  };

  useEffect(() => {
    if (!lastMessage) return;
    const e = { data: lastMessage.data };
      if (isAiMode) return;
      const msg = JSON.parse(e.data);
      if (msg.type === 'init') {
        setSocketId(msg.id);
        socketIdRef.current = msg.id;
      }
      if (msg.type === 'sync') {
        setPlayers(msg.state.players);
        setIsHost(msg.state.players[socketIdRef.current]?.isHost || false);
      }
      if (msg.type === 'all_ready') {
        startCountdown();
      }
      if (msg.type === 'study_started') {
        const ch = CHALLENGES.find(c => c.id === msg.challengeId);
        enterStudyPhase(ch);
      }
      if (msg.type === 'race_started') {
        startRacingPhase();
      }
      if (msg.type === 'game_over') {
        handleGameOver(msg.winnerId);
      }
    }
  }, [lastMessage, roomCode, startCountdown, enterStudyPhase, socketId]);

  const handleResetStats = useCallback(() => {
    const fresh = { totalWins: 0, totalLosses: 0, currentStreak: 0, bestStreak: 0, fastestWin: null, totalGames: 0, challengeBest: {} };
    saveStats(fresh);
    setStats(fresh);
    showToast('Stats reset', 'info');
  }, [showToast]);

  const initMusicIfNeeded = useCallback(() => {
    if (!music.playing) {
      music.start();
      music.setMood('menu');
      setMusicState(prev => ({ ...prev, playing: true, mood: 'menu' }));
    }
  }, []);

  const toggleMusic = useCallback(() => {
    if (music.playing) {
      music.stop();
      setMusicState(prev => ({ ...prev, playing: false }));
    } else {
      music.start();
      setMusicState(prev => ({ ...prev, playing: true }));
    }
  }, []);

  const setMusicVolume = useCallback((val) => {
    music.setVolume(parseInt(val) / 100);
    setMusicState(prev => ({ ...prev, volume: val }));
  }, []);

  const handleCreateRoom = useCallback((ai = false) => {
    initMusicIfNeeded();
    setIsAiMode(ai);
    if (ai) {
      setRoomCode('AI_MATCH');
      setScreen('lobby');
      showToast('AI Match created!', 'success');
    } else {
      const code = generateRoomCode();
      setRoomCode(code);
      setScreen('lobby');
      showToast('Room created! Share code with opponent.', 'success');
    }
  }, [initMusicIfNeeded, showToast]);

  const handleJoinRoom = useCallback(() => {
    const code = roomInput.trim().toUpperCase();
    if (code.length < 4) { showToast('Enter a valid room code', 'error'); return; }
    initMusicIfNeeded();
    setIsAiMode(false);
    setRoomCode(code);
    setScreen('lobby');
    showToast('Joined room!', 'success');
  }, [roomInput, initMusicIfNeeded, showToast]);

  const copyRoomCode = useCallback(() => {
    navigator.clipboard.writeText(roomCode).then(() => showToast('Copied!', 'success')).catch(() => {});
  }, [roomCode, showToast]);

  const toggleReady = useCallback(() => {
    socket.send(JSON.stringify({ type: 'ready' }));
  }, [socket]);

  const enterStudyPhase = useCallback((ch) => {
    setChallenge(ch);
    setHintUsed(false);
    setGameActive(false);
    setCodeValue(ch.brokenCode);
    setStudyTimeRemaining(8);
    setStudyProgress(0);
    setStudyCanStart(false);

    music.setMood('study');
    setMusicState(prev => ({ ...prev, mood: 'study' }));
    setScreen('study');

    const minTime = 8000;
    const step = 100;
    let elapsed = 0;
    
    if (studyTimerRef.current) clearInterval(studyTimerRef.current);
    studyTimerRef.current = setInterval(() => {
      elapsed += step;
      const progress = Math.min(elapsed / minTime, 1);
      setStudyProgress(progress);
      setStudyTimeRemaining(Math.max(0, Math.ceil((minTime - elapsed) / 1000)));

      if (elapsed >= minTime) {
        clearInterval(studyTimerRef.current);
        setStudyCanStart(true);
      }
    }, step);
  }, []);

  const startCountdown = useCallback(() => {
    setCountdown(3);
    playSound('countdown');
    let count = 3;
    const iv = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
        playSound('countdown');
      } else if (count === 0) {
        setCountdown('GO');
        playSound('go');
      } else {
        clearInterval(iv);
        setCountdown(null);
        if (roomCode === 'AI_MATCH') {
          const ch = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
          enterStudyPhase(ch);
        } else if (socket.id && players[socket.id]?.isHost) {
          const ch = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
          socket.send(JSON.stringify({ type: 'start_study', challengeId: ch.id }));
        }
      }
    }, 800);
  }, [socket, players, roomCode, enterStudyPhase]);

  const [aiState, setAiState] = useState({ name: 'AI Bot', progress: 0, status: 'Analyzing...', ready: true });

  const startAiOpponent = useCallback((ch) => {
    const profile = SPEED_PROFILES[speedSetting];
    const diffMult = ch.difficulty === 'Easy' ? 0.85 : ch.difficulty === 'Medium' ? 1.15 : 1.5;
    setAiState(prev => ({ ...prev, progress: 0, status: 'Analyzing...' }));

    const t1 = setTimeout(() => {
      setAiState(prev => ({ ...prev, status: 'Typing...' }));
    }, profile.analyze[0] + Math.random() * (profile.analyze[1] - profile.analyze[0]));
    opponentTimersRef.current.push(t1);

    const totalTests = ch.testCases.length;
    for (let i = 0; i < totalTests; i++) {
      const base = profile.baseDelays[Math.min(i, profile.baseDelays.length - 1)];
      const t = setTimeout(() => {
        setAiState(prev => ({ 
          ...prev, 
          progress: i + 1,
          status: i + 1 < totalTests ? `${i + 1}/${totalTests} tests` : 'All tests passing!' 
        }));
      }, base * (0.75 + Math.random() * 0.5) * diffMult);
      opponentTimersRef.current.push(t);
    }

    const lastBase = profile.baseDelays[Math.min(totalTests - 1, profile.baseDelays.length - 1)];
    const t2 = setTimeout(() => {
      handleGameOver('opponent');
    }, lastBase * (0.85 + Math.random() * 0.3) * diffMult + 1500);
    opponentTimersRef.current.push(t2);
  }, [speedSetting]);

  const triggerStartRace = useCallback(() => {
    if (isAiMode) {
      startRacingPhase();
    } else {
      socket.send(JSON.stringify({ type: 'start_race' }));
    }
  }, [socket, isAiMode]);

  const startRacingPhase = useCallback(() => {
    if (studyTimerRef.current) clearInterval(studyTimerRef.current);
    opponentTimersRef.current.forEach(clearTimeout);
    opponentTimersRef.current = [];
    music.setMood('race');
    setMusicState(prev => ({ ...prev, mood: 'race' }));
    
    setGameActive(true);
    setTestResults(null);
    setRunError(null);
    setScreen('game');
    
    startTimeRef.current = Date.now();
    setElapsedTime(0);
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    }, 100);

    if (isAiMode && challenge) {
      startAiOpponent(challenge);
    }
  }, [isAiMode, challenge, startAiOpponent]);

  const runTests = useCallback(() => {
    if (!gameActive || !challenge) return;
    setRunError(null);

    let fn;
    try {
      // eslint-disable-next-line no-new-func
      fn = new Function(codeValue + `\nreturn ${challenge.functionName};`)();
    } catch (e) {
      setRunError(`SyntaxError: ${e.message}`);
      playSound('fail');
      return;
    }

    if (typeof fn !== 'function') {
      setRunError(`${challenge.functionName} is not a function.`);
      playSound('fail');
      return;
    }

    let passed = 0;
    const results = challenge.testCases.map(tc => {
      let actual, err = null;
      try { 
        // Deep clone inputs to prevent user code from mutating test case state
        const clonedInputs = JSON.parse(JSON.stringify(tc.input));
        actual = fn(...clonedInputs); 
      } catch (e) { err = e.message; }
      const ok = !err && deepEqual(actual, tc.expected);
      if (ok) passed++;
      return { tc, actual, err, ok };
    });

    setTestResults(results);

    if (!isAiMode) {
      socket.send(JSON.stringify({
        type: 'progress',
        progress: passed,
        status: passed === challenge.testCases.length ? 'All tests passing!' : `${passed}/${challenge.testCases.length} tests`
      }));
    } else {
      setPlayers(prev => ({...prev, [socket.id]: { ...prev[socket.id], progress: passed }}));
    }

    if (passed === challenge.testCases.length) {
      playSound('pass');
      if (!isAiMode) {
        socket.send(JSON.stringify({ type: 'win' }));
      } else {
        handleGameOver(socket.id);
      }
    } else {
      if (passed > 0) playSound('pass');
      else playSound('fail');
    }
  }, [gameActive, challenge, codeValue, socket, isAiMode]);

  const launchVictoryParticles = useCallback(() => {
    const canvas = document.getElementById('victoryCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const colors = ['#00ff88', '#00cc6a', '#ff8c42', '#00d4ff', '#ffffff', '#fbbf24'];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 16 - 4,
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.008 + Math.random() * 0.008,
        gravity: 0.18,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2
      });
    }
    let frame;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.vx *= 0.99; p.life -= p.decay; p.rotation += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      if (alive) frame = requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
    setTimeout(() => {
      cancelAnimationFrame(frame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
  }, []);

  const handleGameOver = useCallback((winnerId) => {
    setGameActive(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    opponentTimersRef.current.forEach(clearTimeout);

    const isWin = winnerId === socket.id;
    setWinner(isWin ? 'player' : 'opponent');

    const newStats = loadStats();
    newStats.totalGames++;
    const finalElapsed = Date.now() - startTimeRef.current;
    
    if (isWin) {
      newStats.totalWins++;
      newStats.currentStreak++;
      if (newStats.currentStreak > newStats.bestStreak) newStats.bestStreak = newStats.currentStreak;
      if (!newStats.fastestWin || finalElapsed < newStats.fastestWin) newStats.fastestWin = finalElapsed;
      
      if (challenge) {
        if (!newStats.challengeBest[challenge.id] || finalElapsed < newStats.challengeBest[challenge.id].bestTime) {
          newStats.challengeBest[challenge.id] = { bestTime: finalElapsed };
        }
      }
    } else {
      newStats.totalLosses++;
      newStats.currentStreak = 0;
    }
    saveStats(newStats);
    setStats(newStats);

    music.setMood(isWin ? 'victory' : 'defeat');
    setMusicState(prev => ({ ...prev, mood: isWin ? 'victory' : 'defeat' }));
    setSolutionRevealed(false);
    
    if (isWin) {
      playSound('win');
      launchVictoryParticles();
    } else {
      playSound('lose');
    }

    setTimeout(() => setScreen('results'), isWin ? 800 : 400);
  }, [socket.id, launchVictoryParticles]);

  const useHint = useCallback(() => {
    if (!challenge) return;
    setHintUsed(true);
    showToast('Hint revealed!', 'warn');
  }, [challenge, showToast]);

  const resetCode = useCallback(() => {
    if (!challenge) return;
    setCodeValue(challenge.brokenCode);
    showToast('Code reset', 'info');
  }, [challenge, showToast]);

  const playAgain = useCallback(() => {
    music.setMood('menu');
    setMusicState(prev => ({ ...prev, mood: 'menu' }));
    if (!isAiMode) socket.send(JSON.stringify({ type: 'play_again' }));
    setScreen('lobby');
    if (isAiMode) {
      setTimeout(() => startCountdown(), 1000);
    }
  }, [socket, isAiMode]);

  const goHome = useCallback(() => {
    setGameActive(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    opponentTimersRef.current.forEach(clearTimeout);
    music.setMood('menu');
    setMusicState(prev => ({ ...prev, mood: 'menu' }));
    setRoomCode(null);
    setIsAiMode(false);
    setScreen('landing');
  }, []);

  const handleGiveUp = useCallback(() => {
    if (!gameActive) return;
    playSound('fail');
    if (!isAiMode) {
      socket.send(JSON.stringify({ type: 'give_up' }));
    } else {
      handleGameOver('opponent');
    }
  }, [gameActive, isAiMode, socket, handleGameOver]);

  let currentPlayer = isAiMode ? { ready: true, progress: testResults?.filter(r=>r.ok)?.length || 0, status: 'Thinking...' } : players[socketId];
  let opponent = isAiMode ? null : Object.entries(players).find(([id]) => id !== socketId);
  let opponentData = isAiMode ? aiState : (opponent ? opponent[1] : null);

  const value = {
    screen, setScreen,
    stats, setStats, handleResetStats,
    toasts, showToast,
    musicState, toggleMusic, setMusicVolume,
    speedSetting, setSpeedSetting,
    roomInput, setRoomInput,
    roomCode, isHost,
    playerName, currentPlayer, opponentData, players,
    challenge, countdown, startCountdown,
    studyTimeRemaining, studyProgress, studyCanStart,
    gameActive, elapsedTime,
    codeValue, setCodeValue, testResults, runError, hintUsed,
    winner, solutionRevealed, setSolutionRevealed,
    handleCreateRoom, handleJoinRoom, copyRoomCode, toggleReady,
    triggerStartRace, runTests, useHint, resetCode, playAgain, goHome, handleGiveUp
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
