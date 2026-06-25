import { useState, useEffect } from 'react';
import { loader } from '@monaco-editor/react';
import { useGame } from '../utils/GameContext';
import { formatTime } from '../utils/helpers';
import { CHALLENGES } from '../challenges';
import { motion, AnimatePresence } from 'framer-motion';

export default function Landing() {
  const { 
    stats, speedSetting, setSpeedSetting, topic, setTopic,
    roomInput, setRoomInput, handleJoinRoom, handleCreateRoom, 
    handleResetStats, globalLeaderboard
  } = useGame();

  useEffect(() => {
    loader.init().catch(console.error);
  }, []);

  const [showAllTopics, setShowAllTopics] = useState(false);
  const [showLeaderboards, setShowLeaderboards] = useState(false);

  const ALL_TOPICS = [
    { id: 'javascript', icon: 'fab fa-js text-yellow-400', name: 'JavaScript' },
    { id: 'python', icon: 'fab fa-python text-blue-400', name: 'Python' },
    { id: 'react', icon: 'fab fa-react text-cyan', name: 'React' },
    { id: 'css', icon: 'fab fa-css3-alt text-blue-500', name: 'CSS' },
    { id: 'html', icon: 'fab fa-html5 text-orange-500', name: 'HTML5' },
    { id: 'node', icon: 'fab fa-node-js text-green-500', name: 'Node.js' },
    { id: 'vue', icon: 'fab fa-vuejs text-emerald-400', name: 'Vue' },
    { id: 'java', icon: 'fab fa-java text-red-500', name: 'Java' },
    { id: 'php', icon: 'fab fa-php text-indigo-400', name: 'PHP' },
    { id: 'sql', icon: 'fas fa-database text-gray-400', name: 'SQL' },
    { id: 'docker', icon: 'fab fa-docker text-blue-600', name: 'Docker' },
    { id: 'git', icon: 'fab fa-git-alt text-orange-600', name: 'Git' }
  ];

  const displayedTopics = showAllTopics ? ALL_TOPICS : ALL_TOPICS.slice(0, 4);

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
      className="screen items-center justify-center p-2 sm:p-4 pb-16 relative overflow-hidden active flex flex-col min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="float-code top-10 left-4 hidden md:block" style={{ transform: 'rotate(-5deg)' }}>
        <span className="text-purple-400">function</span> <span className="text-gold">fixBug</span>() {'{\n'}
        {'  '}<span className="text-purple-400">return</span> code.map({'\n'}
        {'    '}x {`=>`} x.<span className="text-gold">debug</span>(){'\n'}
        {'  )'}{'\n}'}
      </div>
      <div className="float-code bottom-20 right-8 hidden md:block" style={{ transform: 'rotate(3deg)' }}>
        <span className="text-cyan">const</span> arena = <span className="text-purple-400">new</span>{'\n'}
        {'  '}<span className="text-gold">CodeArena</span>({'{'}{'\n'}
        {'    '}mode: <span className="text-green-400">'versus'</span>,{'\n'}
        {'    '}timeout: <span className="text-orange">60000</span>{'\n'}
        {'  }'})
      </div>
      <div className="float-code top-1/3 right-1/4 hidden lg:block" style={{ transform: 'rotate(-2deg)' }}>
        <span className="text-purple-400">try</span> {'{\n'}
        {'  '}player.<span className="text-gold">fix</span>(bug){'\n'}
        {'} '}<span className="text-purple-400">catch</span>(e) {'{\n'}
        {'  '}opponent.<span className="text-gold">win</span>(){'\n'}
        {'}'}
      </div>
      <div className="float-code bottom-1/4 left-10 hidden lg:block" style={{ transform: 'rotate(4deg)' }}>
        <span className="text-purple-400">while</span> (bugs {`>`} <span className="text-orange">0</span>) {'{\n'}
        {'  '}coffee.<span className="text-gold">drink</span>();{'\n'}
        {'  '}code.<span className="text-gold">refactor</span>();{'\n'}
        {'}'}
      </div>

      <div className="text-center max-w-2xl mx-auto w-full relative z-10 pt-4 sm:pt-0">
        <motion.div variants={itemVariants} className="mb-2">
          <span className="inline-block px-3 py-1 text-[10px] font-mono rounded-full border border-accent/20 bg-accent/5 text-accent tracking-widest uppercase mb-4">Real-Time Competitive Debugging</span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="glitch mb-4 text-3xl sm:text-5xl" data-text="Code Arena">Code Arena</motion.h1>
        
        <motion.div variants={itemVariants} className="mb-8 mx-auto w-full flex justify-center">
          <div className="inline-block text-left font-mono text-xs sm:text-sm text-muted/80 tracking-wide">
            <span className="text-slate-500">/**</span><br/>
            <span className="text-slate-500">&nbsp;*</span> <span className="text-green-400/90 hover:text-green-400 transition-colors cursor-default tracking-wider">Race against an opponent to fix broken code.</span><br/>
            <span className="text-slate-500">&nbsp;*</span> <span className="text-green-400/90 hover:text-green-400 transition-colors cursor-default tracking-wider">Read, understand, then debug.</span><br/>
            <span className="text-slate-500">&nbsp;*</span> <span className="text-cyan/90 tracking-wider">@returns</span> <span className="text-gold/90 tracking-wider">{`{Victory}`}</span> <span className="text-muted tracking-wider">First to pass all tests.</span><br/>
            <span className="text-slate-500">&nbsp;*/</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="max-w-3xl mx-auto w-full mb-4 text-left relative">
          <div className="absolute inset-0 border border-border opacity-20 rounded-xl pointer-events-none z-10"></div>
          <div className="bg-card/80 backdrop-blur-xl rounded-xl shadow-2xl p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-hidden">
            
            {/* The Top Stats as an Object */}
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-purple-400">export</span>
              <span className="text-cyan">const</span>
              <span className="text-gold">playerStats</span>
              <span className="text-muted">=</span>
              <span className="text-orange">{`{`}</span>
            </div>
            
            {stats.totalGames > 0 ? (
              <div className="flex justify-between items-center px-4 sm:px-8 mb-4 flex-wrap gap-4">
                <div className="flex flex-col">
                  <span className="text-text-main opacity-70 mb-1">xp:</span>
                  <div className="flex items-end gap-1">
                    <span className="text-purple-400 text-xl sm:text-2xl font-bold leading-none">{stats.xp || 0}</span>
                    <span className="text-muted mb-0.5">,</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-main opacity-70 mb-1">wins:</span>
                  <div className="flex items-end gap-1">
                    <span className="text-accent text-xl sm:text-2xl font-bold leading-none">{stats.totalWins}</span>
                    <span className="text-muted mb-0.5">,</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-main opacity-70 mb-1">losses:</span>
                  <div className="flex items-end gap-1">
                    <span className="text-coral text-xl sm:text-2xl font-bold leading-none">{stats.totalLosses}</span>
                    <span className="text-muted mb-0.5">,</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-main opacity-70 mb-1">streak:</span>
                  <div className="flex items-end gap-1">
                    <span className="text-gold text-xl sm:text-2xl font-bold leading-none">{stats.currentStreak}</span>
                    <span className="text-muted mb-0.5">,</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-main opacity-70 mb-1">bestTime:</span>
                  <div className="flex items-end gap-1">
                    <span className="text-cyan text-xl sm:text-2xl font-bold leading-none">"{formatTime(stats.fastestWin)}"</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pl-4 sm:pl-8 mb-4 text-muted/50 italic text-xs">
                // No matches played yet. Win a race to generate stats.
              </div>
            )}
            
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-orange">{`}`}</span><span className="text-muted">;</span>
            </div>

            {/* The Actions (Left and Right) */}
            <hr className="border-border opacity-15 my-3" />
            <div className="flex justify-between items-center">
              <button 
                onClick={() => setShowLeaderboards(!showLeaderboards)} 
                className="text-xs transition-colors font-mono font-bold text-muted hover:text-gold flex items-center gap-2 group"
              >
                console.table(leaderboards); 
                <i className={`fas fa-play text-gold group-hover:scale-110 ${showLeaderboards ? 'rotate-90' : ''} transition-all`}></i>
              </button>

              <button 
                onClick={handleResetStats} 
                className={`text-xs transition-colors font-mono font-bold hover:text-coral ${stats.totalGames > 0 ? 'text-muted' : 'text-muted/30 cursor-not-allowed'}`}
                disabled={stats.totalGames === 0}
              >
                <i className="fas fa-trash-can mr-1.5"></i>resetPlayerStats()
              </button>
            </div>
          
          <AnimatePresence>
            {showLeaderboards && (
              <motion.div 
                layout
                initial={{ height: 0, opacity: 0, y: -20 }} 
                animate={{ height: 'auto', opacity: 1, y: 0 }} 
                exit={{ height: 0, opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "anticipate" }}
                className="mt-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-left overflow-hidden"
              >
                <div className="panel-card p-5 relative group flex flex-col min-h-[160px]">
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
                    <div className="text-center">
                      <p className="text-xs text-muted/80 italic mb-1">No records found on the server.</p>
                      <p className="text-[10px] text-accent font-semibold">Play a Multiplayer Match to claim #1!</p>
                    </div>
                  ) : (
                    <ul className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                      {globalLeaderboard.map((record, idx) => (
                        <li key={idx} className="flex justify-between items-center text-xs bg-bg/50 px-3 py-2 rounded-lg border border-border/30">
                          <span className="text-white truncate pr-2 flex items-center gap-2">
                            <span className={`font-mono text-[10px] w-4 text-center ${idx===0?'text-gold':idx===1?'text-slate-400':idx===2?'text-amber-600':'text-muted'}`}>{idx+1}.</span>
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
            </motion.div>
            )}
          </AnimatePresence>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="max-w-3xl mx-auto w-full mb-4 text-left relative">
          <div className="absolute inset-0 border border-border opacity-20 rounded-xl pointer-events-none z-10"></div>
          <div className="bg-card/80 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
            {/* IDE Header */}
            <div className="bg-bg relative select-none">
              <div className="absolute inset-x-0 bottom-0 h-px bg-border opacity-20"></div>
              <div className="px-3 py-1.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-coral/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gold/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-accent/80"></div>
              </div>
              <div className="text-[9px] text-muted/70 tracking-widest flex items-center gap-1.5">
                <i className="fas fa-file-code text-cyan"></i> match_config.ts
              </div>
              <div className="w-10"></div>
              </div>
            </div>

            {/* IDE Body */}
            <div className="p-3 sm:p-5 overflow-x-auto">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-purple-400">const</span>
                <span className="text-cyan">arenaConfig</span>
                <span className="text-muted">=</span>
                <span className="text-orange">{`{`}</span>
              </div>

              <div className="pl-3 sm:pl-5 space-y-3 relative ml-1.5">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border opacity-15"></div>
                
                {/* Topic Config */}
                <motion.div layout>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-text-main">topic</span><span className="text-muted">:</span>
                  </div>
                  <motion.div layout className="flex gap-2 flex-wrap">
                    <AnimatePresence mode="popLayout">
                      {displayedTopics.map(t => (
                        <motion.div 
                          key={t.id}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`speed-card bg-surface border rounded-lg px-3 py-2 text-center cursor-pointer flex items-center gap-2 ${topic === t.id ? 'selected border-accent' : 'border-border'}`} 
                          onClick={() => setTopic(t.id)}
                        >
                          <i className={`${t.icon} text-base`}></i>
                          <span className="text-xs font-bold font-sans">{t.name}</span>
                        </motion.div>
                      ))}
                      <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="speed-card bg-surface border rounded-lg px-3 py-2 text-center cursor-pointer border-border flex items-center justify-center"
                          onClick={() => setShowAllTopics(!showAllTopics)}
                        >
                          <span className="text-xs font-bold text-muted font-sans">{showAllTopics ? 'Less ▲' : 'More ▼'}</span>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </motion.div>

                {/* Speed Config */}
                <motion.div layout>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-text-main">botDifficulty</span><span className="text-muted">:</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { id: 'beginner', icon: 'fa-baby text-cyan', name: 'Beginner', desc: 'Learning' },
                      { id: 'chill', icon: 'fa-mug-hot text-accent', name: 'Chill', desc: 'Relaxed' },
                      { id: 'normal', icon: 'fa-bolt text-orange', name: 'Normal', desc: 'Fair fight' },
                      { id: 'intense', icon: 'fa-fire text-coral', name: 'Intense', desc: 'No mercy' },
                      { id: 'insane', icon: 'fa-skull text-coral', name: 'Insane', desc: 'Inhuman' },
                      { id: 'godlike', icon: 'fa-ghost text-purple-500', name: 'Godlike', desc: 'Impossible' }
                    ].map(s => (
                      <motion.div 
                        key={s.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`speed-card bg-surface border rounded-lg px-3 py-2 text-center flex items-center gap-2 ${speedSetting === s.id ? 'selected border-accent' : 'border-border'}`} 
                        onClick={() => setSpeedSetting(s.id)}
                      >
                        <i className={`fas ${s.icon} text-base`}></i>
                        <span className="text-xs font-bold font-sans">{s.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

              </div>

              <div className="mt-3 flex items-center gap-1.5">
                <span className="text-orange">{`}`}</span><span className="text-muted">;</span>
              </div>

              <hr className="border-border opacity-15 my-4" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-2">
                  <span className="text-purple-400">await</span>
                  <div className="flex items-center">
                    <span className="text-cyan">CodeArena</span><span className="text-muted">.</span><span className="text-gold">start</span><span className="text-muted">(</span>
                    <span className="text-cyan">arenaConfig</span><span className="text-muted">,</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 pl-3 sm:pl-5 relative ml-1.5 mt-2">
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border opacity-15"></div>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[#e4e8ef] text-sm font-semibold">enterARoomCode</span><span className="text-muted text-sm">:</span>
                      <div className="bg-black/40 shadow-inner border border-border/80 rounded-md px-3 py-2 flex items-center focus-within:border-accent focus-within:bg-black/60 transition-all ml-1">
                        <span className="text-muted/50 text-xs mr-2">#</span>
                        <input 
                          type="text" 
                          placeholder="enter a room code" 
                          maxLength="6" 
                          className="bg-transparent outline-none text-green-400 font-mono text-sm w-44 sm:w-48 placeholder:text-muted/40 placeholder:normal-case placeholder:tracking-normal uppercase tracking-widest" 
                          value={roomInput} 
                          onChange={e => setRoomInput(e.target.value)} 
                          onKeyDown={e => e.key === 'Enter' && handleJoinRoom()} 
                        />
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleJoinRoom} 
                      className="speed-card bg-surface hover:bg-surface/80 border border-border rounded-lg px-5 py-2 flex items-center justify-center gap-2 text-white text-sm font-bold transition-all w-full sm:w-auto"
                    >
                      <span role="img" aria-label="rocket">🚀</span> Join
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto font-sans sm:ml-2">
                    <button 
                      onClick={() => handleCreateRoom(false)} 
                      className="speed-card bg-surface hover:bg-surface/80 border border-border rounded-lg px-6 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-accent transition-all flex-1 sm:flex-none"
                    >
                      <span role="img" aria-label="swords">⚔️</span> Host Match
                    </button>
                    <button 
                      onClick={() => handleCreateRoom(true)} 
                      className="speed-card bg-surface hover:bg-surface/80 border border-border rounded-lg px-6 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-purple-400 transition-all flex-1 sm:flex-none"
                    >
                      <span role="img" aria-label="robot">🤖</span> Play AI
                    </button>
                  </div>
                </div>
                
                <div className="mt-2">
                  <span className="text-muted">);</span>
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
