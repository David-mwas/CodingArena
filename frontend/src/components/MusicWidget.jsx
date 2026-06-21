import { useGame } from '../utils/GameContext';
import { moodColors } from '../music';

export default function MusicWidget() {
  const { musicState, toggleMusic, setMusicVolume } = useGame();

  return (
    <div className="music-widget fixed bottom-5 right-5 z-50 bg-surface/80 border border-border rounded-xl p-3 flex items-center gap-3 shadow-xl shadow-black/40">
      <button 
        onClick={toggleMusic} 
        className="w-9 h-9 rounded-lg bg-card hover:bg-border flex items-center justify-center text-accent transition-colors" 
        aria-label="Toggle music"
      >
        <i className={`fas ${musicState.playing ? 'fa-pause' : 'fa-play'} text-sm`}></i>
      </button>
      <div 
        className="flex items-end gap-[3px] h-5" 
        style={{ opacity: musicState.playing ? 1 : 0.3 }} 
        aria-hidden="true"
      >
        <div className="music-bar" style={{ height: musicState.playing ? '6px' : '4px' }}></div>
        <div className="music-bar" style={{ height: musicState.playing ? '12px' : '4px' }}></div>
        <div className="music-bar" style={{ height: musicState.playing ? '8px' : '4px' }}></div>
        <div className="music-bar" style={{ height: musicState.playing ? '16px' : '4px' }}></div>
        <div className="music-bar" style={{ height: musicState.playing ? '10px' : '4px' }}></div>
      </div>
      <div 
        className="mood-indicator" 
        title="Current mood" 
        style={{ background: moodColors[musicState.mood] || '#7a8ba0' }}
      ></div>
      <input 
        type="range" 
        className="volume-slider" 
        min="0" 
        max="100" 
        value={musicState.volume} 
        onChange={(e) => setMusicVolume(e.target.value)} 
        aria-label="Volume" 
      />
      <span className="text-[10px] text-muted font-mono w-7">{musicState.volume}%</span>
    </div>
  );
}
