import { useGame } from '../utils/GameContext';
import { AnimatePresence, motion } from 'framer-motion';

export default function ToastContainer() {
  const { toasts } = useGame();

  const colors = {
    info: 'border-cyan bg-cyan/10 text-cyan',
    success: 'border-accent bg-accent/10 text-accent',
    error: 'border-coral bg-coral/10 text-coral',
    warn: 'border-orange bg-orange/10 text-orange',
    chat: 'border-purple-500 bg-purple-500/10 text-white'
  };

  return (
    <div className="fixed top-20 right-4 z-[1000] flex flex-col gap-2 pointer-events-none items-end">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
            className={`px-4 py-3 rounded-lg border text-sm font-medium shadow-lg backdrop-blur-sm ${colors[t.type] || colors.info}`}
          >
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
