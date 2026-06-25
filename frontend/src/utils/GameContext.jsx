import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import useWebSocketLib from 'react-use-websocket';
const useWebSocket = useWebSocketLib.default || useWebSocketLib;
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
  const isAiModeRef = useRef(false);
  useEffect(() => { isAiModeRef.current = isAiMode; }, [isAiMode]);
  const [speedSetting, setSpeedSetting] = useState('normal');
  const [topic, setTopic] = useState('javascript');
  const [playerName, setPlayerName] = useState(() => {
    try {
      const saved = localStorage.getItem('codeArenaPlayerName');
      if (saved) return saved;
      const generated = OPPONENT_NAMES[Math.floor(Math.random() * OPPONENT_NAMES.length)] + '_' + Math.floor(Math.random() * 999);
      localStorage.setItem('codeArenaPlayerName', generated);
      return generated;
    } catch(e) {
      return OPPONENT_NAMES[0];
    }
  });
  const [playerId] = useState(() => {
    try {
      const saved = localStorage.getItem('codeArenaPlayerId');
      if (saved) return saved;
      const generated = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('codeArenaPlayerId', generated);
      return generated;
    } catch(e) {
      return 'user_temp';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('codeArenaPlayerName', playerName);
    } catch (e) {}
  }, [playerName]);

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
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const pauseTimeRef = useRef(null);
  const aiEventsRef = useRef([]);
  const handleGameOverRef = useRef(null);
  
  // Refs for mid-match transitions
  const challengeRef = useRef(null);
  const screenRef = useRef('lobby');

  const [aiState, setAiState] = useState({ name: 'AI Bot', progress: 0, status: 'Analyzing...', ready: true });
  const [solutionRevealed, setSolutionRevealed] = useState(false);
  const [globalLeaderboard, setGlobalLeaderboard] = useState(() => {
    try {
      const saved = localStorage.getItem('codeArenaLeaderboard');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return [];
  });

  const startTimeRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const studyTimerRef = useRef(null);
  const opponentTimersRef = useRef([]);
  const socketIdRef = useRef(null);

  const [isLight, setIsLight] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'light';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  });

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

  const showToast = useCallback((msg, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const baseUrl = import.meta.env.PROD ? 'wss://coding-arena-ion2.onrender.com' : 'ws://localhost:1999';
  const socketUrl = isAiMode ? null : `${baseUrl}/?room=${roomCode || 'lobby'}&name=${playerName}&id=${playerId}`;
  const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
  });



  const socket = {
    id: socketId,
    send: sendMessage
  };

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
    challengeRef.current = ch;
    setHintUsed(false);
    setGameActive(false);
    setCodeValue(ch.brokenCode);
    setStudyTimeRemaining(8);
    setStudyProgress(0);
    setStudyCanStart(false);

    music.setMood('study');
    setMusicState(prev => ({ ...prev, mood: 'study' }));
    setScreen('study');
    screenRef.current = 'study';

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
          const available = CHALLENGES.filter(c => c.topic === topic || !c.topic);
          const ch = available[Math.floor(Math.random() * available.length)] || CHALLENGES[0];
          enterStudyPhase(ch);
        } else if (socket.id && players[socket.id]?.isHost) {
          const available = CHALLENGES.filter(c => c.topic === topic || !c.topic);
          const ch = available[Math.floor(Math.random() * available.length)] || CHALLENGES[0];
          socket.send(JSON.stringify({ type: 'start_study', challengeId: ch.id }));
        }
      }
    }, 800);
  }, [socket, players, roomCode, enterStudyPhase]);



  const startAiOpponent = useCallback((ch) => {
    const profile = SPEED_PROFILES[speedSetting];
    let diffMult = ch.difficulty === 'Easy' ? 0.85 : ch.difficulty === 'Medium' ? 1.15 : 1.5;
    
    // Topic-based difficulty modifier (Frameworks & syntax-heavy languages take humans longer to type)
    const heavyTopics = ['react', 'vue', 'node', 'java', 'docker', 'sql', 'git'];
    if (heavyTopics.includes(ch.topic)) diffMult *= 1.4;
    else if (ch.topic === 'python' || ch.topic === 'php') diffMult *= 1.2;
    
    // Start typing immediately to feel responsive
    setAiState(prev => ({ ...prev, progress: 0, status: 'Typing...' }));

    // Offset time if AI is joining mid-match
    const timeOffset = gameActiveRef.current ? Date.now() - startTimeRef.current : 0;

    const events = [];
    const totalTests = ch.testCases.length;
    for (let i = 0; i < totalTests; i++) {
      const base = profile.baseDelays[Math.min(i, profile.baseDelays.length - 1)];
      const delay = base * (0.75 + Math.random() * 0.5) * diffMult;
      events.push({
        time: timeOffset + delay,
        action: 'progress',
        progress: i + 1,
        status: i + 1 < totalTests ? `${i + 1}/${totalTests} tests` : 'All tests passing!' 
      });
    }

    const lastBase = profile.baseDelays[Math.min(totalTests - 1, profile.baseDelays.length - 1)];
    const endDelay = lastBase * (0.85 + Math.random() * 0.3) * diffMult + 1500;
    events.push({
      time: timeOffset + endDelay,
      action: 'gameover'
    });

    aiEventsRef.current = events;
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
    setIsPaused(false);
    isPausedRef.current = false;
    setTestResults(null);
    setRunError(null);
    setScreen('game');
    screenRef.current = 'game';
    
    startTimeRef.current = Date.now();
    setElapsedTime(0);
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      if (isPausedRef.current) return;
      
      const newElapsed = Date.now() - startTimeRef.current;
      setElapsedTime(newElapsed);
      
      if (isAiModeRef.current && aiEventsRef.current && aiEventsRef.current.length > 0) {
        const pending = [];
        let shouldGameOver = false;
        
        for (let ev of aiEventsRef.current) {
          if (newElapsed >= ev.time) {
            if (ev.action === 'progress') {
              setAiState(prev => ({ ...prev, progress: ev.progress, status: ev.status }));
            } else if (ev.action === 'gameover') {
              shouldGameOver = true;
            }
          } else {
            pending.push(ev);
          }
        }
        aiEventsRef.current = pending;
        if (shouldGameOver && handleGameOverRef.current) {
          handleGameOverRef.current('opponent');
        }
      }
    }, 100);

    if (isAiMode && challenge) {
      startAiOpponent(challenge);
    }
  }, [isAiMode, challenge, startAiOpponent]);

  const runTests = useCallback(async (force = false) => {
    if ((!gameActive && !force) || !challenge) return;
    setRunError(null);

    let passed = 0;
    let results = [];

    if (challenge.evalMethod === 'regex') {
      results = challenge.testCases.map(tc => {
        const ok = tc.regex.test(codeValue);
        if (ok) passed++;
        return { tc, actual: ok ? 'Match' : 'No match', err: !ok ? 'Did not match expected pattern' : null, ok };
      });
    } else {
      const workerCode = `
        self.onmessage = function(e) {
          const { code, functionName, testCases } = e.data;
          try {
            const fn = new Function(code + '\\nreturn ' + functionName)();
            if (typeof fn !== 'function') {
              self.postMessage({ error: functionName + ' is not a function.' });
              return;
            }
            const results = testCases.map(tc => {
              let actual = null, err = null;
              try {
                const clonedInputs = JSON.parse(JSON.stringify(tc.input));
                actual = fn(...clonedInputs);
              } catch (error) {
                err = error.message;
              }
              return { actual, err };
            });
            self.postMessage({ results });
          } catch (err) {
            self.postMessage({ error: 'SyntaxError: ' + err.message });
          }
        };
      `;
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      const worker = new Worker(url);

      const workerPromise = new Promise((resolve, reject) => {
        worker.onmessage = (e) => resolve(e.data);
        worker.onerror = (e) => reject(new Error(e.message || 'Worker execution failed.'));
        setTimeout(() => {
          worker.terminate();
          reject(new Error('Execution Timeout: Possible infinite loop detected!'));
        }, 2000);
      });

      worker.postMessage({ code: codeValue, functionName: challenge.functionName, testCases: challenge.testCases });

      try {
        const res = await workerPromise;
        worker.terminate();
        URL.revokeObjectURL(url);
        
        if (res.error) {
          setRunError(res.error);
          playSound('fail');
          return;
        }
        
        results = challenge.testCases.map((tc, i) => {
          const actual = res.results[i].actual;
          const err = res.results[i].err;
          const ok = !err && deepEqual(actual, tc.expected);
          if (ok) passed++;
          return { tc, actual, err, ok };
        });
      } catch (e) {
        worker.terminate();
        URL.revokeObjectURL(url);
        setRunError(e.message);
        playSound('fail');
        return;
      }
    }

    setTestResults(results);

    if (!isAiMode) {
      if (sendMessage) {
        sendMessage(JSON.stringify({
          type: 'progress',
          progress: passed,
          status: passed === challenge.testCases.length ? 'All tests passing!' : `${passed}/${challenge.testCases.length} tests`
        }));
      }
    } else {
      setPlayers(prev => ({...prev, [socketId]: { ...prev[socketId], progress: passed }}));
    }

    if (passed === challenge.testCases.length) {
      playSound('pass');
      if (!isAiMode) {
        if (sendMessage) {
          sendMessage(JSON.stringify({ type: 'win' }));
        }
      } else {
        if (handleGameOverRef.current) handleGameOverRef.current(socketId);
      }
    } else {
      if (passed > 0) playSound('pass');
      else playSound('fail');
    }
  }, [gameActive, challenge, codeValue, socketId, isAiMode, sendMessage]);

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
    setIsPaused(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    opponentTimersRef.current.forEach(clearTimeout);

    // Auto-run tests one last time so the user sees their final progress
    // even if they didn't get time to hit submit before the game ended.
    if (winnerId !== socket.id) {
      setTimeout(() => runTests(true), 100);
    }

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
        
        let xpGained = 100;
        if (newStats.currentStreak > 1) xpGained += Math.min(newStats.currentStreak * 10, 50);
        if (challenge.difficulty === 'Medium') xpGained += 25;
        if (challenge.difficulty === 'Hard') xpGained += 50;
        newStats.xp = (newStats.xp || 0) + xpGained;
        
        // Record global leaderboard time if multiplayer match
        if (!isAiMode && socket && socket.send) {
          socket.send(JSON.stringify({
            type: 'record_time',
            time: Math.floor(finalElapsed / 1000),
            name: playerName,
            challengeId: challenge.id,
            challengeTitle: challenge.title
          }));
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
    if (hintUsed) return;
    
    if ((stats.xp || 0) >= 50) {
      const newStats = loadStats();
      newStats.xp = (newStats.xp || 0) - 50;
      saveStats(newStats);
      setStats(newStats);
      setHintUsed(true);
      showToast('Hint revealed! (-50 XP)', 'warn');
    } else {
      showToast(`Need 50 XP for hint. You have ${stats.xp || 0} XP. Win matches to earn XP!`, 'error');
    }
  }, [challenge, hintUsed, stats.xp, showToast]);

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

  const sendChat = useCallback((text) => {
    if (isAiMode) {
      showToast('AI Bot says: Beep boop! 🤖', 'chat');
    } else if (sendMessage) {
      sendMessage(JSON.stringify({ type: 'chat', text }));
    }
    showToast(`You: ${text}`, 'chat');
  }, [isAiMode, sendMessage, showToast]);

  const processedMessageRef = useRef(null);

  useEffect(() => {
    if (!lastMessage || lastMessage === processedMessageRef.current) return;
    processedMessageRef.current = lastMessage;
    
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
      if (msg.type === 'global_leaderboard') {
        setGlobalLeaderboard(msg.data);
        try { localStorage.setItem('codeArenaLeaderboard', JSON.stringify(msg.data)); } catch(e) {}
      }
      if (msg.type === 'player_left') {
        if (msg.leaverId === socketIdRef.current) {
          handleGameOver('opponent'); // We gave up
        } else {
          if (msg.remainingPlayers > 1) {
            showToast(`${msg.leaverName} fled the match!`, 'warn');
          } else {
            showToast('All opponents fled! An AI bot is taking over...', 'info');
            setIsAiMode(true);
            setRoomCode('AI_MATCH');
            setSpeedSetting('chill'); // Be lenient on time when taking over
            
            // If we are already racing, we must start the AI immediately
            if (screenRef.current === 'game' && challengeRef.current) {
              startAiOpponent(challengeRef.current);
            }
          }
        }
      }
      if (msg.type === 'chat') {
        if (msg.senderId !== socketIdRef.current) {
          showToast(`${msg.senderName}: ${msg.text}`, 'chat');
        }
      }
  }, [lastMessage, roomCode, startCountdown, enterStudyPhase, socketId, startRacingPhase, handleGameOver, isAiMode, showToast, startAiOpponent, setSpeedSetting]);

  useEffect(() => {
    handleGameOverRef.current = handleGameOver;
  }, [handleGameOver]);

  const togglePause = useCallback(() => {
    if (!gameActive || !isAiMode) return;
    setIsPaused(p => {
      const newPaused = !p;
      isPausedRef.current = newPaused;
      if (newPaused) {
        pauseTimeRef.current = Date.now();
      } else {
        const pauseDuration = Date.now() - pauseTimeRef.current;
        startTimeRef.current += pauseDuration;
      }
      return newPaused;
    });
  }, [gameActive, isAiMode]);

  let currentPlayer = isAiMode ? { ready: true, progress: testResults?.filter(r=>r.ok)?.length || 0, status: 'Thinking...' } : players[socketId];
  let opponent = isAiMode ? null : Object.entries(players).find(([id]) => id !== socketId);
  let opponentData = isAiMode ? aiState : (opponent ? opponent[1] : null);

  const value = {
    screen, setScreen,
    stats, setStats, handleResetStats,
    toasts, showToast,
    musicState, toggleMusic, setMusicVolume,
    speedSetting, setSpeedSetting, topic, setTopic,
    roomInput, setRoomInput,
    roomCode, isHost,
    playerName, setPlayerName, currentPlayer, opponentData, players,
    challenge, countdown, startCountdown,
    studyTimeRemaining, studyProgress, studyCanStart,
    gameActive, elapsedTime,
    codeValue, setCodeValue, testResults, runError, hintUsed,
    winner, solutionRevealed, setSolutionRevealed,
    handleCreateRoom, handleJoinRoom, copyRoomCode, toggleReady,
    triggerStartRace, runTests, useHint, resetCode, playAgain, goHome, handleGiveUp, sendChat,
    isLight, setIsLight,
    isPaused, togglePause,
    globalLeaderboard
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
