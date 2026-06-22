import { useState, useEffect } from 'react';
import { GameProvider, useGame } from './utils/GameContext';
import Landing from './components/Landing';
import Lobby from './components/Lobby';
import Study from './components/Study';
import Game from './components/Game';
import Results from './components/Results';
import ToastContainer from './components/ToastContainer';
import MusicWidget from './components/MusicWidget';
import { AnimatePresence } from 'framer-motion';

function GameScreenManager() {
  const { screen, countdown, isLight, setIsLight } = useGame();

  return (
    <>
      <div className="scanlines" aria-hidden="true"></div>
      <canvas id="victoryCanvas"></canvas>
      <MusicWidget />
      <ToastContainer />
      
      <button 
        onClick={() => setIsLight(prev => !prev)}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-accent transition-colors shadow-lg"
        title="Toggle Theme"
      >
        <i className={`fas ${isLight ? 'fa-moon' : 'fa-sun'}`}></i>
      </button>

      <AnimatePresence mode="wait">
        {countdown && (
          <div className="fixed inset-0 z-50 bg-bg/90 flex items-center justify-center">
            <div className="countdown-num" style={countdown === 'GO' ? { color: 'var(--accent)' } : {}}>{countdown}</div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {screen === 'landing' && <Landing key="landing" />}
        {screen === 'lobby' && <Lobby key="lobby" />}
        {screen === 'study' && <Study key="study" />}
        {screen === 'game' && <Game key="game" />}
        {screen === 'results' && <Results key="results" />}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameScreenManager />
    </GameProvider>
  );
}
