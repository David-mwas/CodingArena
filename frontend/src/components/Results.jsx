import { useGame } from '../utils/GameContext';
import { formatTime, generateDiff } from '../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

export default function Results() {
  const { 
    challenge, winner, opponentData, currentPlayer, elapsedTime, stats,
    hintUsed,
    solutionRevealed, setSolutionRevealed,
    playAgain, goHome, showToast
  } = useGame();

  if (!challenge) return null;

  return (
    <motion.section 
      className="screen items-center justify-center p-6 pb-24 overflow-y-auto active flex flex-col min-h-screen"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className="text-center max-w-2xl mx-auto py-10 w-full">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-7xl mb-4"
        >
          {winner === 'player' ? <i className="fas fa-trophy text-gold"></i> : <i className="fas fa-skull-crossbones text-coral"></i>}
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className={`text-3xl font-bold mb-2 ${winner === 'player' ? 'text-accent' : 'text-coral'}`}
        >
          {winner === 'player' ? 'Victory!' : 'Defeated'}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-muted text-lg mb-8"
        >
          {winner === 'player' ? 'You squashed the bug first. Well debugged.' : `${opponentData?.name || 'Opponent'} fixed it first. Review the solution below.`}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-surface border border-border rounded-xl p-6 mb-6 text-left space-y-3 shadow-lg"
        >
          <div className="flex justify-between items-center"><span className="text-sm text-muted">Time</span><span className="font-mono font-bold text-white">{formatTime(elapsedTime)}</span></div>
          <div className="flex justify-between items-center"><span className="text-sm text-muted">Your Tests</span><span className={`font-mono font-bold ${(currentPlayer?.progress || 0) === challenge.testCases.length ? 'text-accent' : 'text-coral'}`}>{currentPlayer?.progress || 0}/{challenge.testCases.length}</span></div>
          <div className="flex justify-between items-center"><span className="text-sm text-muted">{opponentData?.name || 'Opponent'}</span><span className="font-mono font-bold text-cyan">{opponentData?.progress || 0}/{challenge.testCases.length}</span></div>
          <div className="flex justify-between items-center"><span className="text-sm text-muted">Hint Used</span><span className={`font-mono font-bold ${hintUsed ? 'text-orange' : 'text-accent'}`}>{hintUsed ? 'Yes' : 'No'}</span></div>
          <div className="border-t border-border pt-3 flex justify-between items-center">
            <span className="text-sm text-muted">Win Rate</span>
            <span className="font-mono font-bold text-white">{stats.totalGames > 0 ? Math.round((stats.totalWins / stats.totalGames) * 100) : 0}% ({stats.totalWins}W/{stats.totalLosses}L)</span>
          </div>
          <div className="flex justify-between items-center"><span className="text-sm text-muted">Current Streak</span><span className={`font-mono font-bold ${stats.currentStreak >= 3 ? 'text-gold' : 'text-white'}`}>{stats.currentStreak} {stats.currentStreak >= 3 ? '🔥' : ''}</span></div>
          <div className="flex justify-between items-center"><span className="text-sm text-muted">Best Streak</span><span className="font-mono font-bold text-gold">{stats.bestStreak}</span></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-surface border border-border rounded-xl p-6 mb-8 text-left shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent"><i className="fas fa-lightbulb mr-2"></i>Solution</h3>
            <button onClick={() => setSolutionRevealed(!solutionRevealed)} className="text-xs text-muted hover:text-accent transition-colors font-semibold">
              <i className={`fas ${solutionRevealed ? 'fa-eye-slash' : 'fa-eye'} mr-1`}></i> {solutionRevealed ? 'Hide Fix' : 'Show Fix'}
            </button>
          </div>
          <div className="mb-4 p-3 bg-orange/5 border border-orange/15 rounded-lg">
            <p className="text-sm text-orange"><i className="fas fa-lightbulb mr-2"></i><span>{challenge.hint}</span></p>
          </div>
          <AnimatePresence>
            {solutionRevealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <p className="text-xs text-muted mb-2 uppercase tracking-wider font-semibold">What Changed</p>
                <div className="bg-bg/60 rounded-lg p-4 overflow-x-auto mb-4 font-mono text-sm">
                  {generateDiff(challenge.brokenCode, challenge.fixedCode).map((line, i) => (
                    <div key={line.id || i} className={`code-diff-line ${line.type === 'remove' ? 'diff-remove' : line.type === 'add' ? 'diff-add' : 'diff-same'}`}>
                      {line.text}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted mb-2 uppercase tracking-wider font-semibold">Corrected Code</p>
                <div className="relative">
                  <pre 
                    className="bg-bg/60 rounded-lg p-4 text-sm font-mono text-accent overflow-x-auto whitespace-pre border border-accent/10"
                    dangerouslySetInnerHTML={{ __html: Prism.highlight(challenge.fixedCode, Prism.languages.javascript, 'javascript') }}
                  />
                  <button 
                    onClick={() => { navigator.clipboard.writeText(challenge.fixedCode); showToast('Solution copied!', 'success'); }} 
                    className="absolute top-2 right-2 text-xs text-muted hover:text-accent bg-surface px-2 py-1 rounded border border-border transition-colors"
                  >
                    <i className="fas fa-copy mr-1"></i>Copy
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={playAgain} 
            className="btn-glow px-8 py-3 bg-accent hover:bg-accent-dim text-bg font-bold rounded-xl text-sm transition-colors shadow-lg shadow-accent/20"
          >
            <i className="fas fa-redo mr-2"></i> Play Again
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={goHome} 
            className="btn-glow px-6 py-3 bg-card hover:bg-border text-white font-semibold rounded-xl text-sm transition-colors border border-border"
          >
            <i className="fas fa-home mr-2"></i> Home
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
