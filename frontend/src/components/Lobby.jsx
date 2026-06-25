import { useEffect } from 'react';
import { useGame } from '../utils/GameContext';
import { motion } from 'framer-motion';

export default function Lobby() {
  const { roomCode, copyRoomCode, playerName, currentPlayer, opponentData, players, toggleReady, startCountdown, handleCreateRoom, showToast, isHost, socket } = useGame();

  // Auto-pair with AI if waiting alone for 60 seconds
  useEffect(() => {
    if (roomCode === 'AI_MATCH' || opponentData) return;
    
    const t = setTimeout(() => {
      showToast('Taking too long? Automatically paired with an AI bot!', 'info');
      handleCreateRoom(true); // Switch to AI match
    }, 60000); // 1 minute
    
    return () => clearTimeout(t);
  }, [roomCode, opponentData, handleCreateRoom, showToast]);

  // Force start match if opponent is AFK (not ready) for 30 seconds
  useEffect(() => {
    if (roomCode === 'AI_MATCH' || !opponentData) return;
    if (currentPlayer?.ready && !opponentData.ready) {
      const t = setTimeout(() => {
        if (isHost) {
          showToast('Opponent took too long! Forcing match to start...', 'warn');
          startCountdown(); // Force start
        }
      }, 30000); // 30 seconds
      return () => clearTimeout(t);
    }
  }, [roomCode, opponentData, currentPlayer?.ready, isHost, startCountdown, showToast]);

  useEffect(() => {
    if (roomCode === 'AI_MATCH') {
      const t = setTimeout(() => {
        startCountdown();
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [roomCode, startCountdown]);

  return (
    <motion.section 
      className="screen items-center justify-center p-6 pb-24 active flex flex-col min-h-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-xl mx-auto w-full relative">
        <div className="absolute inset-0 border border-border opacity-20 rounded-xl pointer-events-none z-10"></div>
        <div className="bg-card/80 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden font-mono">
          
          {/* Terminal Header */}
          <div className="bg-bg relative select-none">
            <div className="absolute inset-x-0 bottom-0 h-px bg-border opacity-20"></div>
            <div className="px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-coral/80"></div>
                <div className="w-3 h-3 rounded-full bg-gold/80"></div>
                <div className="w-3 h-3 rounded-full bg-accent/80"></div>
              </div>
              <div className="text-[10px] sm:text-xs text-muted/70 tracking-widest uppercase flex items-center gap-2">
                <i className="fas fa-network-wired"></i> session_init.sh
              </div>
              <button 
                onClick={() => window.location.reload()} 
                className="text-[10px] text-coral hover:text-coral-dim font-bold tracking-widest uppercase transition-colors px-2 py-0.5 rounded bg-coral/5 hover:bg-coral/10 border border-coral/10"
              >
                Abort
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-8 text-left">
            <div className="mb-8 border-l-2 border-accent/40 pl-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#e4e8ef] mb-1">Awaiting Connection</h2>
              <p className="text-muted text-xs">
                [{Object.keys(players || {}).length}/2] active sockets. Distribute access token to invite.
              </p>
            </div>
            
            <div className="bg-black/40 shadow-inner border border-border/80 rounded-lg p-5 sm:p-6 mb-8 relative group overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-accent/5 to-transparent pointer-events-none"></div>
              <p className="text-[10px] text-accent/80 font-bold uppercase tracking-widest mb-2 w-full text-center">Access Token</p>
              <div className="flex items-center justify-center gap-4 relative z-10 w-full">
                <span className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-[.2em] drop-shadow-md">{roomCode || '------'}</span>
                <button 
                  onClick={copyRoomCode} 
                  className="w-10 h-10 rounded-md bg-surface border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/50 transition-all shadow-lg" 
                  title="Copy Access Token"
                >
                  <i className="fas fa-copy text-lg"></i>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-2 px-1">Node Status</p>
              
              {/* Player 1 (You) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-3 bg-surface border rounded-lg px-4 py-3 relative overflow-hidden transition-colors ${currentPlayer?.ready ? 'border-accent/50' : 'border-border'}`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${currentPlayer?.ready ? 'bg-accent' : 'bg-transparent'}`}></div>
                <div className={`pulse-dot ${currentPlayer?.ready ? 'bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.8)]' : 'bg-muted'}`}></div>
                <span className="font-semibold text-sm flex-1 text-left text-white">{playerName} <span className="text-xs text-muted ml-1 font-normal">(Local)</span></span>
                <button onClick={toggleReady} className={`px-4 py-1.5 text-xs font-bold rounded-md border transition-all ${currentPlayer?.ready ? 'bg-accent/10 border-accent/50 text-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.2)]' : 'bg-bg hover:bg-border border-border text-white shadow-inner'}`}>
                  {currentPlayer?.ready ? 'READY' : 'INITIALIZE'}
                </button>
              </motion.div>
              
              {/* Player 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`flex items-center gap-3 bg-surface border rounded-lg px-4 py-3 relative overflow-hidden transition-all duration-300 ${opponentData ? (opponentData.ready ? 'border-purple-500/50' : 'border-border') : 'border-border/30 opacity-70 bg-black/20'}`}
              >
                {opponentData ? (
                  <>
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${opponentData.ready ? 'bg-purple-500' : 'bg-transparent'}`}></div>
                    <div className={`pulse-dot ${opponentData.ready ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'bg-muted'}`}></div>
                    <span className="font-semibold text-sm flex-1 text-left text-white">{opponentData.name} <span className="text-xs text-muted ml-1 font-normal">(Remote)</span></span>
                    <span className={`text-xs font-mono font-bold tracking-wider px-2 py-1 rounded bg-black/30 border ${opponentData.ready ? 'text-purple-400 border-purple-500/30' : 'text-muted border-border/50'}`}>{opponentData.ready ? 'READY' : 'WAITING'}</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-border"></div>
                    <span className="font-mono text-xs sm:text-sm flex-1 text-muted/70 text-left tracking-wide">Listening for remote socket...</span>
                    <div className="flex gap-1.5 opacity-50">
                      <div className="typing-dot bg-muted/60"></div>
                      <div className="typing-dot bg-muted/60"></div>
                      <div className="typing-dot bg-muted/60"></div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
