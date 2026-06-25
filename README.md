# Code Arena 🕹️💻

Code Arena is a real-time, high-fidelity competitive debugging platform. Designed to gamify the process of learning and practicing code, players face off in head-to-head matches or against dynamic AI bots. Your objective: read, understand, and fix broken code faster than your opponent to pass the test cases.

---

## 🌟 Features

- **Real-Time Multiplayer:** Built on WebSockets for instant state synchronization, live racing, and presence detection.
- **Dynamic AI Opponents:** Challenge the AI bot with multiple difficulty tiers (*Beginner* to *Godlike*). The AI features **Dynamic Topic Scaling**, meaning it intelligently slows down its typing speed when you select syntax-heavy frameworks (like React, Docker, or SQL) to ensure a fair race!
- **Extensive Tech Topics:** Supports multiple languages and frameworks. 
  - **Core:** JavaScript, Python, HTML, CSS.
  - **Frameworks & Tools:** React, Vue, Node.js, Java, SQL, Docker, Git.
  - **Execution Engine:** Uses native execution for JS, and an advanced AST/Regex emulation engine for other frameworks.
- **Gamification & XP Economy:**
  - Earn XP for winning matches, complete with streak bonuses and difficulty multipliers.
  - Spend XP to buy hints during a match.
  - Level up and claim a spot on the Global Leaderboard.
- **Quick Chat & Emotes:** Send live reactions (🔥, 😅, 👀, 💀, GG) to your opponent during the match.
- **High-Fidelity UI/UX:** 
  - **IDE-Themed Dashboards:** The lobby is designed entirely as an interactive code block (`match_config.ts` and `playerStats` objects), providing maximum immersion.
  - **Responsive Theming:** Full support for both a Cyberpunk Dark Mode and a crisp Light Mode, utilizing glassmorphism, Framer Motion transitions, and tactical HUD elements.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (via Vite)
- **Tailwind CSS** (Custom themes, semantic design tokens, grid systems)
- **Framer Motion** (For smooth layout animations, AnimatePresence pop-ins, and toast notifications)
- **Monaco Editor** (VS Code's embedded editor for syntax highlighting)

### Backend
- **Node.js** & **Express**
- **ws** (Native WebSocket library for fast, lightweight bidirectional communication)
- **JSON Persistence** for global leaderboards (`leaderboard.json`).

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd gamify
   ```

2. **Run the Backend (WebSocket Server):**
   ```bash
   cd backend
   npm install
   npm start
   ```
   *The backend will run on port 1999 by default.*

3. **Run the Frontend (React App):**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The frontend will run on port 5173 by default.*

4. **Play:**
   Open your browser and navigate to `http://localhost:5173`. 

---

## 📂 Codebase Architecture & Documentation

```text
gamify/
├── backend/
│   ├── leaderboard.json      # Persistent global top 10 records
│   └── server.js             # WebSocket signaling server (rooms, state sync)
└── frontend/
    ├── src/
    │   ├── challenges.js     # The content database (bugs, test cases, AI speeds)
    │   ├── index.css         # Global design system & theme variables (Light/Dark)
    │   ├── components/
    │   │   ├── Landing.jsx   # Interactive IDE-themed lobby & matchmaking
    │   │   ├── Game.jsx      # Core arena, Monaco editor, progress HUD
    │   │   └── ToastContainer.jsx
    │   └── utils/
    │       ├── GameContext.jsx # Global state manager & code evaluation engine
    │       └── helpers.js      # Formatting utilities
```

### Key Technical Decisions
1. **The Evaluation Engine (`GameContext.jsx`):** 
   - Instead of spinning up heavy Docker containers for every language, Code Arena uses a lightweight evaluation strategy. JavaScript is executed securely in the browser environment, while non-JS languages utilize an advanced Regex/String-matching validation system defined in `challenges.js`.
2. **Viewport Optimization (`Landing.jsx`):**
   - The landing page is engineered as a strict single-viewport application (no scrolling). Dynamic elements like leaderboards and extra topics use `framer-motion` `<AnimatePresence>` to slide in and gracefully reflow the layout without breaking the bounds of the screen.

---

## 📝 Contributions

- **Adding Challenges:** To add a new challenge, update `frontend/src/challenges.js`. Ensure you tag it with the correct `topic` so the AI speed scaling applies correctly. For non-JS languages, ensure `evalMethod: "regex"` is set.
- **Styling:** Avoid hardcoded hex colors. Always use the semantic CSS variables (`bg-surface`, `bg-card`, `text-muted`) defined in `index.css` to ensure full compatibility with the Light/Dark theme toggle.

Happy Debugging! 👾
