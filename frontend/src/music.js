export const moodColors = {
  menu: '#00d4ff',
  study: '#00ff88',
  race: '#ff4757',
  victory: '#fbbf24',
  defeat: '#7a8ba0'
};

class MusicEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.playing = false;
    this.volume = 0.35;
    this.nodes = [];
    this.currentMood = 'menu';
    this.chordIndex = 0;
    this.chordTimer = null;
    this.arpTimer = null;
    
    this.moods = {
      menu: {
        chords: [[130.81, 164.81, 196], [146.83, 174.61, 220], [110, 138.59, 164.81], [130.81, 164.81, 196]],
        arpNotes: [220, 261.63, 293.66, 329.63, 392], arpRange: [700, 1100],
        filterFreq: 500, bassMult: 1, label: 'Calm'
      },
      study: {
        chords: [[146.83, 174.61, 220], [130.81, 164.81, 196], [110, 138.59, 164.81], [123.47, 146.83, 185]],
        arpNotes: [220, 261.63, 293.66, 329.63, 392, 440], arpRange: [600, 1000],
        filterFreq: 650, bassMult: 1, label: 'Focus'
      },
      race: {
        chords: [[110, 130.81, 164.81], [116.54, 146.83, 174.61], [98, 116.54, 146.83], [103.83, 130.81, 155.56]],
        arpNotes: [220, 261.63, 329.63, 392, 440, 523.25, 587.33], arpRange: [250, 450],
        filterFreq: 1400, bassMult: 0.5, label: 'Tension'
      },
      victory: {
        chords: [[130.81, 164.81, 196], [174.61, 220, 261.63], [146.83, 196, 246.94], [164.81, 196, 246.94]],
        arpNotes: [261.63, 329.63, 392, 523.25, 659.25], arpRange: [400, 700],
        filterFreq: 2000, bassMult: 1, label: 'Triumph'
      },
      defeat: {
        chords: [[110, 130.81, 155.56], [98, 116.54, 146.83], [103.83, 123.47, 155.56], [110, 130.81, 164.81]],
        arpNotes: [164.81, 196, 220, 261.63], arpRange: [900, 1400],
        filterFreq: 400, bassMult: 1, label: 'Somber'
      }
    };
  }

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = this.volume * 0.25;
    this.masterGain.connect(this.ctx.destination);
  }

  start(onStateChange) {
    this.init();
    if (this.playing) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    this.playing = true;
    this.chordIndex = 0;
    this.playPadChord();
    this.scheduleArp();
    if (onStateChange) onStateChange();
  }

  stop(onStateChange) {
    this.playing = false;
    this.nodes.forEach(n => { try { n.stop(); } catch (e) {} });
    this.nodes = [];
    if (this.chordTimer) clearTimeout(this.chordTimer);
    if (this.arpTimer) clearTimeout(this.arpTimer);
    this.chordTimer = null;
    this.arpTimer = null;
    if (onStateChange) onStateChange();
  }

  setMood(mood, onMoodChange) {
    if (this.currentMood === mood) return;
    this.currentMood = mood;
    this.chordIndex = 0;
    if (onMoodChange) onMoodChange(mood);
  }

  playPadChord() {
    if (!this.playing) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const mood = this.moods[this.currentMood];
    const chord = mood.chords[this.chordIndex % mood.chords.length];
    const dur = 4.5;

    chord.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const f = ctx.createBiquadFilter();
      o.type = 'sine';
      o.frequency.value = freq;
      if (i > 0) o.detune.value = (Math.random() - 0.5) * 10;
      f.type = 'lowpass';
      f.frequency.value = mood.filterFreq;
      f.Q.value = 0.7;
      o.connect(f);
      f.connect(g);
      g.connect(this.masterGain);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.14, now + 1.2);
      g.gain.setValueAtTime(0.14, now + dur - 1.5);
      g.gain.linearRampToValueAtTime(0, now + dur);
      o.start(now);
      o.stop(now + dur + 0.1);
      this.nodes.push(o);
    });

    const b = ctx.createOscillator();
    const bg = ctx.createGain();
    b.type = 'sine';
    b.frequency.value = chord[0] * mood.bassMult;
    b.connect(bg);
    bg.connect(this.masterGain);
    bg.gain.setValueAtTime(0, now);
    bg.gain.linearRampToValueAtTime(0.09, now + 0.8);
    bg.gain.setValueAtTime(0.09, now + dur - 1);
    bg.gain.linearRampToValueAtTime(0, now + dur);
    b.start(now);
    b.stop(now + dur + 0.1);
    this.nodes.push(b);

    this.chordTimer = setTimeout(() => {
      this.chordIndex++;
      this.playPadChord();
    }, 4000);
  }

  scheduleArp() {
    if (!this.playing) return;
    const ctx = this.ctx;
    const mood = this.moods[this.currentMood];

    const playNote = () => {
      if (!this.playing) return;
      const now = ctx.currentTime;
      const freq = mood.arpNotes[Math.floor(Math.random() * mood.arpNotes.length)];
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const f = ctx.createBiquadFilter();
      o.type = 'triangle';
      o.frequency.value = freq;
      f.type = 'lowpass';
      f.frequency.value = Math.min(mood.filterFreq * 1.5, 2000);
      o.connect(f);
      f.connect(g);
      g.connect(this.masterGain);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.07, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      o.start(now);
      o.stop(now + 1.6);
      this.nodes.push(o);
    };

    const scheduleNext = () => {
      if (!this.playing) return;
      playNote();
      const [rMin, rMax] = mood.arpRange;
      const delay = rMin + Math.random() * (rMax - rMin);
      this.arpTimer = setTimeout(scheduleNext, delay);
    };
    scheduleNext();
  }

  setVolume(v) {
    this.volume = v;
    if (this.masterGain) this.masterGain.gain.value = v * 0.25;
  }
}

export const music = new MusicEngine();
