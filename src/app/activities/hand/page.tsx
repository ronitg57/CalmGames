'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAudio, useLocalStorage } from '@/hooks';

interface SupportSession {
  count: number;
  lastVisit: string;
}

export default function HandPage() {
  const { play } = useAudio();
  const [isHolding, setIsHolding] = useState(false);
  const [message, setMessage] = useState('I am here for you.');
  const [currentEmoji, setCurrentEmoji] = useState('🤝');
  const [sessionCount, setSessionCount] = useLocalStorage<SupportSession>('hand-sessions', {
    count: 0,
    lastVisit: new Date().toISOString(),
  });
  const [showValidation, setShowValidation] = useState(false);
  const [validationText, setValidationText] = useState('');

  const emojis = ['🤝', '🫂', '💜', '🤲', '👐', '✨'];

  const messages = [
    'I am here for you.',
    'You are not alone.',
    'This will pass.',
    'You are safe.',
    'I believe in you.',
    'You are stronger than you think.',
    'Breathe. You can do this.',
    'You matter.',
    'Your pain is valid.',
    'You deserve kindness.',
    'Take it one moment at a time.',
    'You have survived 100% of your worst days.',
    'You are worthy of love.',
    'This is temporary.',
    'You are brave.',
    'It is okay to not be okay.',
  ];

  const validationMessages = [
    'Your feelings are completely valid.',
    'It is okay to feel overwhelmed.',
    'Your struggles matter.',
    'You are allowed to take breaks.',
    'Being vulnerable takes strength.',
    'Your pain is real and acknowledged.',
    'You deserve to be heard.',
    'It is okay to ask for help.',
    'You are doing better than you think.',
    'Progress is not always linear, and that is okay.',
    'Your mental health matters.',
    'You are enough, just as you are.',
  ];

  const holdHand = () => {
    setIsHolding(true);
    
    // Play sound
    play('/sounds/success.mp3', { volume: 0.5 });
    
    // Random emoji from the list
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setCurrentEmoji(randomEmoji);
    
    // Random message
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMsg);
    
    // Random validation message
    const randomValidation = validationMessages[Math.floor(Math.random() * validationMessages.length)];
    setValidationText(randomValidation);
    setShowValidation(true);
    
    // Update session count
    setSessionCount({ count: sessionCount.count + 1, lastVisit: new Date().toISOString() });

    setTimeout(() => {
      setIsHolding(false);
      setShowValidation(false);
    }, 4000);
  };

  return (
    <main className="fixed inset-0 bg-gradient-to-b from-pink-50 via-red-50 to-rose-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="relative p-4 sm:p-6 flex items-center justify-between">
        <Link href="/" className="text-calm-600 hover:text-calm-900 text-sm font-medium z-10">
          ← Back
        </Link>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center flex-1"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-calm-900">Hold My Hand</h1>
          <p className="text-xs sm:text-sm text-calm-600 mt-1">You don&apos;t have to face this alone</p>
        </motion.div>
        <div className="w-12 text-center">
          <span className="text-xs font-bold text-rose-600">{sessionCount.count}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center px-4 sm:px-6 pb-4 pt-4 sm:pt-6">
        <div className="w-full max-w-xs flex flex-col items-center justify-center">
        
        {/* Instruction */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 text-center"
        >
          <p className="text-sm text-calm-700 font-medium">✨ Click the emoji below whenever you need</p>
          <p className="text-xs text-calm-600 mt-1">a moment of support or validation</p>
        </motion.div>
        
        {/* Hand button with multiple emoji support */}
        <motion.button
          onClick={holdHand}
          disabled={isHolding}
          className="mb-8 sm:mb-10 focus:outline-none cursor-pointer relative group flex-shrink-0 transition-transform"
          whileHover={!isHolding ? { scale: 1.12 } : {}}
          whileTap={!isHolding ? { scale: 0.88 } : {}}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity"
            animate={isHolding ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
          
          {/* Main emoji */}
          <motion.div
            key={currentEmoji}
            animate={isHolding ? { 
              scale: [1, 1.15, 1], 
              rotate: [0, 8, -8, 0],
              y: [0, -10, 0]
            } : {}}
            initial={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-7xl sm:text-8xl cursor-pointer relative z-10"
          >
            {currentEmoji}
          </motion.div>
          
          {/* Pulse particles */}
          <AnimatePresence>
            {isHolding && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 0,
                      x: Math.cos((i / 5) * Math.PI * 2) * 80,
                      y: Math.sin((i / 5) * Math.PI * 2) * 80,
                    }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-1/2 left-1/2 text-2xl pointer-events-none"
                  >
                    ✨
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Validation message */}
        <AnimatePresence>
          {showValidation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mb-4 sm:mb-6 max-w-xs bg-gradient-to-r from-pink-100 to-rose-100 border-2 border-pink-300 rounded-lg p-4 text-center"
            >
              <p className="text-sm font-semibold text-rose-700">{validationText}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message */}
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-xs mb-6 sm:mb-8 min-h-12"
        >
          <p className="text-lg sm:text-2xl font-medium text-calm-800">{message}</p>
        </motion.div>

        {/* Interactive affirmations with checkmarks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xs bg-white bg-opacity-70 backdrop-blur rounded-lg p-5 shadow-soft text-center mb-6 border-2 border-pink-100"
        >
          <h3 className="font-semibold text-calm-900 mb-3 text-sm">You Are:</h3>
          <ul className="space-y-2 text-xs text-calm-700">
            <motion.li
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              💚 Deserving of love and support
            </motion.li>
            <motion.li
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              💙 Worthy of kindness
            </motion.li>
            <motion.li
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              💜 Brave for reaching out
            </motion.li>
            <motion.li
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              ❤️ Stronger than you know
            </motion.li>
            <motion.li
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              🧡 Never alone in this
            </motion.li>
          </ul>
        </motion.div>

        {/* Session info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-calm-600 mb-6"
        >
          <p>You&apos;ve reached out <span className="font-bold text-rose-600">{sessionCount.count}</span> times</p>
          <p className="text-xs text-calm-500 mt-1">✨ Every moment of care matters</p>
        </motion.div>

        {/* Crisis info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="max-w-xs bg-gradient-to-br from-rose-100 to-pink-100 border-2 border-rose-300 rounded-lg p-5 text-center text-xs text-calm-800 mt-auto"
        >
          <p className="font-bold text-2xl mb-2">💜</p>
          <p className="font-bold text-rose-700 mb-2 text-sm">Need Someone?</p>
          <p className="mb-3">Reach out to <span className="font-bold text-rose-700">Ronit</span></p>
          <p className="font-semibold text-calm-900 mb-2">Text me anytime</p>
          <p className="text-xs text-calm-700">24/7 • I am always here for you</p>
          <p className="mt-3 text-xs text-calm-600 italic">Your well-wisher always 💙</p>
        </motion.div>
        </div>
      </div>
    </main>
  );
}
