import { useGame } from '../utils/GameContext';
import { motion } from 'framer-motion';
import EditorComponent from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

const Editor = EditorComponent.default || EditorComponent;

export default function Study() {
  const { challenge, studyTimeRemaining, studyProgress, studyCanStart, triggerStartRace, isHost } = useGame();

  if (!challenge) return null;

  return (
    <motion.section 
      className="screen active flex flex-col h-screen"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.4 }}
    >
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-surface border-b border-border flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full badge-${challenge.difficulty.toLowerCase()}`}>
            {challenge.difficulty.toUpperCase()}
          </span>
          <span className="text-xs text-muted font-mono hidden sm:inline">Study the code before the race begins</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-cyan">
            <motion.i 
              animate={{ opacity: [1, 0.5, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="fas fa-robot"
            ></motion.i>
            <span>Opponent is reading...</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="text-2xl font-bold mb-2"
          >
            {challenge.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="text-muted mb-6 max-w-2xl"
          >
            {challenge.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className="bg-[#0a1018] border border-border rounded-lg p-5 overflow-x-auto"
          >
            <Editor
              value={challenge.brokenCode}
              onValueChange={() => {}}
              highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
              padding={10}
              disabled
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 15,
                lineHeight: 1.8,
                backgroundColor: 'transparent',
              }}
              className="study-code pointer-events-none"
            />
          </motion.div>
        </div>

        <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-border bg-surface/30 p-5 pb-24 flex flex-col">
          <h3 className="text-xs uppercase tracking-widest text-muted font-semibold mb-4">Understanding the Bug</h3>
          <div className="space-y-3 mb-6 flex-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex items-start gap-2 text-sm">
              <i className="fas fa-circle-question text-orange mt-0.5"></i>
              <span className="text-muted">Read through the code carefully. What's the expected behavior?</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="flex items-start gap-2 text-sm">
              <i className="fas fa-search text-cyan mt-0.5"></i>
              <span className="text-muted">Trace the logic with the test inputs. Where does it go wrong?</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-start gap-2 text-sm">
              <i className="fas fa-wrench text-accent mt-0.5"></i>
              <span className="text-muted">Once you spot it, you'll fix it during the race phase.</span>
            </motion.div>
          </div>

          <div className="mb-6">
            <h4 className="text-xs uppercase tracking-widest text-muted font-semibold mb-2">Test Cases</h4>
            <div className="space-y-1.5 text-xs font-mono">
              {challenge.testCases.map((tc, idx) => (
                <div key={idx} className="flex items-center gap-2 text-muted">
                  <i className="fas fa-circle text-[5px] text-border"></i>{tc.display}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <div className="text-center mb-3">
              <div className="inline-flex items-center gap-2 relative">
                <svg width="36" height="36" className="rotate-[-90deg]">
                  <circle cx="18" cy="18" r="15" stroke="#1e3048" strokeWidth="3" fill="none" />
                  <circle cx="18" cy="18" r="15" stroke={studyCanStart ? "#00ff88" : "#00ff88"} strokeWidth="3" fill="none"
                    strokeDasharray="94.25" strokeDashoffset={94.25 * (1 - studyProgress)} strokeLinecap="round" className="study-progress-ring transition-all duration-100 ease-linear" />
                </svg>
                <span className="text-sm font-mono text-muted absolute inset-0 flex items-center justify-center">
                  {studyCanStart ? 'GO' : `${studyTimeRemaining}`}
                </span>
              </div>
            </div>
            <motion.button 
              whileHover={studyCanStart ? { scale: 1.02 } : {}}
              whileTap={studyCanStart ? { scale: 0.98 } : {}}
              onClick={triggerStartRace} 
              disabled={!studyCanStart}
              className={`btn-glow w-full px-6 py-3 font-bold rounded-xl text-sm transition-all border ${studyCanStart ? 'bg-accent text-bg shadow-lg shadow-accent/20 border-transparent' : 'bg-card text-muted border-border cursor-not-allowed opacity-50'}`}
            >
              <i className="fas fa-flag-checkered mr-2"></i> Start Racing
            </motion.button>
            <p className="text-[10px] text-muted/50 text-center mt-2">Minimum study time ensures fair play</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
