export const STATS_KEY = 'codeArenaStats';

export function loadStats() {
  try {
    const d = localStorage.getItem(STATS_KEY);
    if (d) return JSON.parse(d);
  } catch (e) {}
  return { totalWins: 0, totalLosses: 0, currentStreak: 0, bestStreak: 0, fastestWin: null, totalGames: 0, challengeBest: {}, xp: 0 };
}

export function saveStats(stats) {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch (e) {}
}

export function formatTime(ms) {
  if (ms === null || ms === undefined) return '--';
  const s = Math.floor(ms / 1000), m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}

export function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  if (typeof a === 'object') {
    const ka = Object.keys(a), kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    return ka.every(k => deepEqual(a[k], b[k]));
  }
  return false;
}

export function generateRoomCode() {
  const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let code = '';
  for (let i = 0; i < 6; i++) code += c[Math.floor(Math.random() * c.length)]; return code;
}

export function generateDiff(broken, fixed) {
  const bL = broken.split('\n'), fL = fixed.split('\n');
  const lines = [];
  const max = Math.max(bL.length, fL.length);
  for (let i = 0; i < max; i++) {
    const b = bL[i] || '', f = fL[i] || '';
    if (b === f) lines.push({ type: 'same', text: b, id: i });
    else {
      if (b) lines.push({ type: 'remove', text: `- ${b}`, id: `r${i}` });
      if (f) lines.push({ type: 'add', text: `+ ${f}`, id: `a${i}` });
    }
  }
  return lines;
}
