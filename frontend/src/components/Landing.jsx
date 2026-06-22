import { useGame } from '../utils/GameContext';
import { formatTime } from '../utils/helpers';
import { CHALLENGES } from '../challenges';
import { motion } from 'framer-motion';

export default function Landing() {
  const { 
    stats, speedSetting, setSpeedSetting, 
    roomInput, setRoomInput, handleJoinRoom, handleCreateRoom, 
    handleResetStats, globalLeaderboard
  } = useGame();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      className="screen items-center justify-center p-4 sm:p-6 pb-24 relative overflow-y-auto active flex flex-col min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="float-code top-10 left-4 hidden md:block" style={{ transform: 'rotate(-5deg)' }}>
        {`function fixBug() {\n  return code.map(\n    x => x.debug()\n  )\n}`}
      </div>
      <div className="float-code bottom-20 right-8 hidden md:block" style={{ transform: 'rotate(3deg)' }}>
        {`const arena = new\n  CodeArena({\n    mode: 'versus',\n    timeout: 60000\n  })`}
      </div>
      <div className="float-code top-1/3 right-1/4 hidden lg:block" style={{ transform: 'rotate(-2deg)' }}>
        {`try {\n  player.fix(bug)\n} catch(e) {\n  opponent.win()\n}`}
      </div>

      <div className="text-center max-w-2xl mx-auto w-full relative z-10 pt-8 sm:pt-0">
        <motion.div variants={itemVariants} className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-mono rounded-full border border-accent/20 bg-accent/5 text-accent tracking-widest uppercase mb-6">Real-Time Competitive Debugging</span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="glitch mb-4 text-4xl sm:text-6xl" data-text="Code Arena">Code Arena</motion.h1>
        
        <motion.p variants={itemVariants} className="text-lg sm:text-xl text-muted mb-8 max-w-lg mx-auto">
          Race against an opponent to fix broken code. Read, understand, then debug. First to pass all tests wins.
        </motion.p>

        {stats.totalGames > 0 && (
          <motion.div variants={itemVariants} className="mb-8 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="stat-card rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-accent">{stats.totalWins}</div>
                <div className="text-[10px] text-muted uppercase tracking-wider">Wins</div>
              </div>
              <div className="stat-card rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-coral">{stats.totalLosses}</div>
                <div className="text-[10px] text-muted uppercase tracking-wider">Losses</div>
              </div>
              <div className="stat-card rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-gold">{stats.currentStreak}</div>
                <div className="text-[10px] text-muted uppercase tracking-wider">Streak</div>
              </div>
              <div className="stat-card rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-cyan">{formatTime(stats.fastestWin)}</div>
                <div className="text-[10px] text-muted uppercase tracking-wider">Best Time</div>
              </div>
            </div>

            <div className="mt-6 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="bg-surface border border-border rounded-xl p-5 shadow-lg relative overflow-hidden group flex flex-col min-h-[160px]">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors"></div>
                <h3 className="text-xs font-bold text-muted tracking-widest uppercase mb-4 flex items-center gap-2">
                  <i className="fas fa-trophy text-gold"></i> Personal Best
                </h3>
                <div className="flex-1 flex flex-col justify-center">
                  {stats.challengeBest && Object.keys(stats.challengeBest || {}).length > 0 ? (
                    <ul className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                      {Object.entries(stats.challengeBest).sort((a,b)=>a[1].bestTime - b[1].bestTime).map(([cid, data]) => {
                         const c = CHALLENGES.find(ch => ch.id == cid);
                         if (!c) return null;
                         return (
                           <li key={cid} className="flex justify-between items-center text-xs bg-bg/50 px-3 py-2 rounded-lg border border-border/30">
                             <span className="text-white truncate pr-2"><span className="text-muted mr-1">#{cid}</span>{c.title}</span>
                             <span className="font-mono text-accent whitespace-nowrap">{formatTime(data.bestTime)}</span>
                           </li>
                         )
                      })}
                    </ul>
                  ) : (
                    <p className="text-xs text-muted/50 italic text-center">Win races to record your best times!</p>
                  )}
                </div>
              </div>
              
              <div className="bg-surface border border-border rounded-xl p-5 shadow-lg relative overflow-hidden group flex flex-col min-h-[160px]">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-cyan/5 rounded-full blur-2xl group-hover:bg-cyan/10 transition-colors"></div>
                <h3 className="text-xs font-bold text-muted tracking-widest uppercase mb-4 flex items-center gap-2">
                  <i className="fas fa-globe text-cyan"></i> Global Top 10
                </h3>
                <div className="flex-1 flex flex-col justify-center">
                  {!globalLeaderboard || globalLeaderboard.length === 0 ? (
                    <p className="text-xs text-muted/50 italic text-center">Waiting for servers to register records...</p>
                  ) : (
                    <ul className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                      {globalLeaderboard.map((record, idx) => (
                        <li key={idx} className="flex justify-between items-center text-xs bg-bg/50 px-3 py-2 rounded-lg border border-border/30">
                          <span className="text-white truncate pr-2 flex items-center gap-2">
                            <span className={`font-mono text-[10px] w-4 text-center ${idx===0?'text-gold':idx===1?'text-silver':idx===2?'text-bronze':'text-muted'}`}>{idx+1}.</span>
                            <span className="font-bold text-accent">{record.name}</span>
                            <span className="text-muted/70 truncate hidden sm:inline-block">({record.challengeTitle})</span>
                          </span>
                          <span className="font-mono text-cyan whitespace-nowrap">{formatTime(record.time * 1000)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-xs text-muted uppercase tracking-widest mb-3 font-semibold">Opponent Speed</p>
          <div className="flex gap-3 justify-center flex-wrap">
            {[
              { id: 'chill', icon: 'fa-mug-hot text-accent', name: 'Chill', desc: 'Relaxed' },
              { id: 'normal', icon: 'fa-bolt text-orange', name: 'Normal', desc: 'Fair fight' },
              { id: 'intense', icon: 'fa-fire text-coral', name: 'Intense', desc: 'No mercy' },
              { id: 'insane', icon: 'fa-skull text-coral', name: 'Insane', desc: 'Inhuman' }
            ].map(s => (
              <motion.div 
                key={s.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`speed-card bg-surface border rounded-xl px-5 py-3 text-center min-w-[90px] ${speedSetting === s.id ? 'selected border-accent' : 'border-border'}`} 
                onClick={() => setSpeedSetting(s.id)}
              >
                <div className="text-lg mb-1"><i className={`fas ${s.icon}`}></i></div>
                <div className="text-sm font-bold">{s.name}</div>
                <div className="text-[10px] text-muted">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <div className="flex items-center gap-2 bg-surface border border-border rounded-xl px-4 py-3 w-full sm:w-auto">
            <input 
              type="text" 
              placeholder="Room code" 
              maxLength="6" 
              className="bg-transparent outline-none text-white font-mono text-lg w-28 placeholder:text-muted/50 uppercase" 
              aria-label="Room code" 
              value={roomInput} 
              onChange={e => setRoomInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && handleJoinRoom()} 
            />
            <button 
              onClick={handleJoinRoom} 
              className="btn-glow px-5 py-2 bg-card hover:bg-border rounded-lg text-accent font-semibold text-sm transition-colors border border-border"
            >
              <i className="fas fa-arrow-right-to-bracket mr-1"></i> Join
            </button>
          </div>
          <span className="text-muted text-sm">or</span>
          <div className="flex gap-2 w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCreateRoom(false)} 
              className="flex-1 btn-glow px-6 py-3 bg-accent hover:bg-accent-dim text-bg font-bold rounded-xl text-sm transition-colors shadow-lg shadow-accent/20 whitespace-nowrap"
            >
              <i className="fas fa-plus mr-2"></i> Create Room
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCreateRoom(true)} 
              className="flex-1 btn-glow px-6 py-3 bg-card hover:bg-border border border-border text-cyan font-bold rounded-xl text-sm transition-colors whitespace-nowrap"
            >
              <i className="fas fa-robot mr-2"></i> Play AI
            </motion.button>
          </div>
        </motion.div>
        
        <motion.button variants={itemVariants} onClick={handleResetStats} className="text-[10px] text-muted/40 hover:text-muted transition-colors">
          Reset Stats
        </motion.button>
      </div>
    </motion.section>
  );
}
