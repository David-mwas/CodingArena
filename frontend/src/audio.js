const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudio() {
  if (!audioCtx) audioCtx = new AudioCtx();
  return audioCtx;
}

export function playSound(type) {
  try {
    const ctx = getAudio();
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    
    switch (type) {
      case 'pass':
        o.frequency.setValueAtTime(600, now);
        o.frequency.linearRampToValueAtTime(900, now + 0.1);
        g.gain.setValueAtTime(0.08, now);
        g.gain.linearRampToValueAtTime(0, now + 0.15);
        o.start(now);
        o.stop(now + 0.15);
        break;
      case 'fail':
        o.frequency.setValueAtTime(300, now);
        o.frequency.linearRampToValueAtTime(150, now + 0.2);
        g.gain.setValueAtTime(0.06, now);
        g.gain.linearRampToValueAtTime(0, now + 0.25);
        o.start(now);
        o.stop(now + 0.25);
        break;
      case 'win':
        [523, 659, 784, 1047].forEach((f, i) => {
          const oo = ctx.createOscillator();
          const gg = ctx.createGain();
          oo.connect(gg);
          gg.connect(ctx.destination);
          oo.frequency.value = f;
          gg.gain.setValueAtTime(0.07, now + i * 0.12);
          gg.gain.linearRampToValueAtTime(0, now + i * 0.12 + 0.2);
          oo.start(now + i * 0.12);
          oo.stop(now + i * 0.12 + 0.2);
        });
        break;
      case 'lose':
        [400, 350, 300, 200].forEach((f, i) => {
          const oo = ctx.createOscillator();
          const gg = ctx.createGain();
          oo.connect(gg);
          gg.connect(ctx.destination);
          oo.frequency.value = f;
          gg.gain.setValueAtTime(0.06, now + i * 0.15);
          gg.gain.linearRampToValueAtTime(0, now + i * 0.15 + 0.25);
          oo.start(now + i * 0.15);
          oo.stop(now + i * 0.15 + 0.25);
        });
        break;
      case 'countdown':
        o.frequency.value = 440;
        g.gain.setValueAtTime(0.06, now);
        g.gain.linearRampToValueAtTime(0, now + 0.12);
        o.start(now);
        o.stop(now + 0.12);
        break;
      case 'go':
        o.frequency.value = 880;
        g.gain.setValueAtTime(0.08, now);
        g.gain.linearRampToValueAtTime(0, now + 0.2);
        o.start(now);
        o.stop(now + 0.2);
        break;
    }
  } catch (e) {
    console.error('Audio failed', e);
  }
}
