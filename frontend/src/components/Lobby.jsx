import { useEffect } from 'react';
import { useGame } from '../utils/GameContext';
import { motion } from 'framer-motion';

export default function Lobby() {
  const { roomCode, copyRoomCode, playerName, currentPlayer, opponentData, players, toggleReady, startCountdown } = useGame();

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
      <div className="text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-2">Waiting Room</h2>
        <p className="text-muted text-sm mb-6">
          {Object.keys(players || {}).length} participant(s) in room. Share this code to invite more!
        </p>
        
        <div className="bg-surface border border-border rounded-xl p-6 mb-8">
          <p className="text-xs text-muted uppercase tracking-widest mb-2">Room Code</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl font-mono font-bold text-accent tracking-[.2em]">{roomCode || '------'}</span>
            <button 
              onClick={copyRoomCode} 
              className="text-muted hover:text-accent transition-colors" 
              aria-label="Copy room code"
            >
              <i className="fas fa-copy"></i>
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-3 bg-surface border rounded-xl px-5 py-4 ${currentPlayer?.ready ? 'border-accent' : 'border-border'}`}
          >
            <div className={`pulse-dot ${currentPlayer?.ready ? 'bg-accent' : 'bg-muted'}`}></div>
            <span className="font-semibold text-sm flex-1 text-left">{playerName} (You)</span>
            <button onClick={toggleReady} className="btn-glow px-4 py-1.5 bg-card hover:bg-border text-white text-xs font-bold rounded-lg border border-border">
              {currentPlayer?.ready ? 'READY' : 'CLICK TO READY'}
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`flex items-center gap-3 bg-surface border rounded-xl px-5 py-4 transition-all duration-300 ${opponentData ? (opponentData.ready ? 'border-cyan' : 'border-border') : 'border-border/50 opacity-50'}`}
          >
            {opponentData ? (
              <>
                <div className={`pulse-dot ${opponentData.ready ? 'bg-cyan' : 'bg-muted'}`}></div>
                <span className="font-semibold text-sm flex-1 text-left">{opponentData.name}</span>
                <span className={`text-xs font-mono ${opponentData.ready ? 'text-cyan' : 'text-muted'}`}>{opponentData.ready ? 'READY' : 'WAITING...'}</span>
              </>
            ) : (
              <>
                <div className="w-2.5 h-2.5 rounded-full bg-muted"></div>
                <span className="font-semibold text-sm flex-1 text-muted text-left">Waiting for opponent...</span>
                <div className="flex gap-1">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
