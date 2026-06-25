import { useGame } from '../utils/GameContext';
import { formatTime } from '../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';

export default function Game() {
  const { 
    roomCode, challenge, elapsedTime, 
    currentPlayer, opponentData, playerName, players,
    codeValue, setCodeValue, runTests, useHint, resetCode, hintUsed,
    testResults, runError, handleGiveUp, sendChat, isLight,
    isPaused, togglePause
  } = useGame();

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme('gamify-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#151822',
        'editor.lineHighlightBackground': '#1e2230',
        'editorLineNumber.foreground': '#4f5b70'
      }
    });
    // the default 'vs' theme is fine for light mode
  };

  if (!challenge) return null;

  return (
    <motion.section 
      className="screen active flex flex-col h-screen"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-surface border-b border-border flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted font-mono">ROOM <span className="text-white">{roomCode}</span></span>
          {roomCode !== 'AI_MATCH' && (
            <span className="text-xs text-muted bg-surface-light px-2 py-0.5 rounded border border-border">
              <i className="fas fa-users mr-1"></i>{Object.keys(players || {}).length}
            </span>
          )}
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full badge-${challenge.difficulty.toLowerCase()}`}>
            {challenge.difficulty.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <i className="fas fa-clock text-muted text-sm"></i>
          <span className="font-mono text-lg font-bold text-white">{formatTime(elapsedTime)}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted font-mono">Challenge {challenge.id}</span>
        </div>
      </header>
      
      <div className="px-4 sm:px-6 py-3 bg-surface/50 border-b border-border/50 flex-shrink-0">
        <h2 className="font-bold text-lg">{challenge.title}</h2>
        <p className="text-sm text-muted mt-1">{challenge.description}</p>
      </div>
      
      <div className="px-4 sm:px-6 py-4 bg-bg/50 flex-shrink-0">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center max-w-3xl mx-auto">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-accent"><i className="fas fa-user mr-1"></i> {playerName} (You)</span>
              <span className="text-xs font-mono text-accent">{currentPlayer?.progress || 0}/{challenge.testCases.length}</span>
            </div>
            <div className="race-track">
              <motion.div 
                className="race-fill bg-accent" 
                initial={{ width: 0 }}
                animate={{ width: `${((currentPlayer?.progress || 0) / challenge.testCases.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              ></motion.div>
            </div>
          </div>
          <span className="text-xs font-bold text-muted">VS</span>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-cyan"><i className="fas fa-robot mr-1"></i> {opponentData?.name || 'Opponent'}</span>
              <span className="text-xs font-mono text-cyan">{opponentData?.progress || 0}/{challenge.testCases.length}</span>
            </div>
            <div className="race-track">
              <motion.div 
                className="race-fill bg-cyan" 
                initial={{ width: 0 }}
                animate={{ width: `${((opponentData?.progress || 0) / challenge.testCases.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              ></motion.div>
            </div>
          </div>
        </div>
        <div className="text-center mt-2 flex justify-between px-8">
          <span className="text-xs text-muted">You: <i className="fas fa-keyboard mr-1"></i> {currentPlayer?.status || 'Thinking...'}</span>
          <span className="text-xs text-muted">Opponent: <i className="fas fa-eye mr-1"></i> {opponentData?.status || 'Analyzing...'}</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 flex flex-col p-4 sm:p-6 min-h-0">
          <div className="editor-wrap flex-1 min-h-[200px] relative">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme={isLight ? 'vs' : 'gamify-dark'}
              beforeMount={handleEditorWillMount}
              loading={
                <div className="p-4 w-full h-full flex flex-col gap-3 bg-surface/50">
                  <div className="h-3 bg-muted/20 rounded w-1/3 animate-pulse"></div>
                  <div className="h-3 bg-muted/20 rounded w-1/2 animate-pulse ml-4"></div>
                  <div className="h-3 bg-muted/20 rounded w-1/4 animate-pulse ml-4"></div>
                  <div className="flex items-center gap-2 mt-4 text-xs text-muted font-mono"><div className="w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>Loading engine...</div>
                </div>
              }
              value={codeValue}
              onChange={(val) => setCodeValue(val || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: '"JetBrains Mono", monospace',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 16 }
              }}
              className="flex-1 overflow-auto rounded-lg"
            />
          </div>
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={runTests} 
              className="btn-glow px-6 py-2.5 bg-accent hover:bg-accent-dim text-bg font-bold rounded-lg text-sm transition-colors shadow-lg shadow-accent/20"
            >
              <i className="fas fa-play mr-2"></i>Run Tests
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={useHint} 
              className={`btn-glow px-4 py-2.5 bg-card font-semibold rounded-lg text-sm transition-colors border ${hintUsed ? 'border-border text-muted/50 cursor-not-allowed' : 'border-border text-orange hover:bg-border'}`}
            >
              <i className="fas fa-lightbulb mr-1"></i> Hint {!hintUsed && <span className="text-[10px] opacity-75 ml-1">-50 XP</span>}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={resetCode} 
              className="btn-glow px-4 py-2.5 bg-card hover:bg-border text-muted font-semibold rounded-lg text-sm transition-colors border border-border"
            >
              <i className="fas fa-rotate-left mr-1"></i> Reset
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={handleGiveUp} 
              className="btn-glow px-4 py-2.5 bg-card hover:bg-coral/20 text-coral font-semibold rounded-lg text-sm transition-colors border border-border"
            >
              <i className="fas fa-flag mr-1"></i> Give Up
            </motion.button>
            {roomCode === 'AI_MATCH' && (
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={togglePause} 
                className="btn-glow px-4 py-2.5 bg-card hover:bg-border text-muted font-semibold rounded-lg text-sm transition-colors border border-border ml-2"
              >
                {isPaused ? (
                  <><i className="fas fa-play mr-1 text-accent"></i> Resume</>
                ) : (
                  <><i className="fas fa-pause mr-1 text-orange"></i> Pause</>
                )}
              </motion.button>
            )}
            <div className="h-6 w-px bg-border mx-1 hidden sm:block"></div>
            <div className="flex items-center gap-1 ml-auto sm:ml-0">
              <span className="text-xs text-muted font-semibold mr-1 hidden sm:block">React:</span>
              {['🔥', '😅', '👀', '💀', 'GG'].map(reaction => (
                <motion.button
                  key={reaction}
                  whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }}
                  onClick={() => sendChat(reaction)}
                  className="w-8 h-8 flex items-center justify-center bg-card border border-border rounded-lg hover:bg-surface-light hover:border-purple-500/50 transition-all text-sm"
                  title={`Send ${reaction}`}
                >
                  {reaction}
                </motion.button>
              ))}
              <div className="flex items-center ml-2 border border-border rounded-lg overflow-hidden bg-card focus-within:border-purple-500/50 transition-colors">
                <input 
                  type="text" 
                  placeholder="Send chat..." 
                  className="bg-transparent border-none outline-none text-xs px-2 py-2 w-28 sm:w-40 text-text-main"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      sendChat(e.target.value.trim());
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </div>
            <AnimatePresence>
              {hintUsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-orange ml-2"
                >
                  <i className="fas fa-lightbulb mr-1"></i><span>{challenge.hint}</span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-border bg-surface/30 p-4 sm:p-5 pb-24 overflow-y-auto">
          <h3 className="text-xs uppercase tracking-widest text-muted font-semibold mb-3">Test Results</h3>
          <div className="space-y-2">
            {!testResults && <div className="text-sm text-muted/60 italic">Run your code to see results...</div>}
            <AnimatePresence>
              {testResults && testResults.map((r, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`test-result p-3 rounded-lg border ${r.ok ? 'border-accent/20 bg-accent/5' : 'border-coral/20 bg-coral/5'}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5">
                      {r.ok ? <i className="fas fa-check-circle text-accent"></i> : <i className="fas fa-times-circle text-coral"></i>}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-mono font-semibold ${r.ok ? 'text-accent' : 'text-coral'}`}>
                        {r.tc.display} {r.tc.expected !== undefined && <span className="text-muted/60">{'// ->'} {JSON.stringify(r.tc.expected)}</span>}
                      </div>
                      {r.ok ? (
                        <div className="text-xs text-muted mt-1">
                          {r.tc.expected !== undefined ? `Expected: ${JSON.stringify(r.tc.expected)} ` : 'Required pattern matched '} 
                          <span className="text-accent">&#10003;</span>
                        </div>
                      ) : (
                        <>
                          <div className="text-xs text-muted mt-1">
                            {r.tc.expected !== undefined ? `Expected: ${JSON.stringify(r.tc.expected)}` : 'Expected a specific code structure, but it was not found.'}
                          </div>
                          {r.err ? (
                            <div className="text-xs text-coral mt-0.5">Error: {r.err}</div>
                          ) : (
                            <div className="text-xs text-coral mt-0.5">Got: {JSON.stringify(r.actual)}</div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {runError && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 p-3 bg-coral/10 border border-coral/20 rounded-lg text-xs text-coral font-mono whitespace-pre-wrap"
              >
                {runError}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
