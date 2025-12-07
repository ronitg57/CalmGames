'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAudio, useLocalStorage } from '@/hooks';

interface GameState {
  score: number;
  bestScore: number;
  streak: number;
}

interface Firefly {
  id: string;
  x: number;
  y: number;
  isGolden: boolean;
  spawnTime: number;
}

export default function FirefliesPage() {
  const { play } = useAudio();
  const spawnCounterRef = useRef(0);
  const gameStartTimeRef = useRef<number | null>(null);

  const [gameState, setGameState] = useLocalStorage<GameState>('fireflies-state', {
    score: 0,
    bestScore: 0,
    streak: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [gameEnded, setGameEnded] = useState(false);

  // Game logic with skill-based golden fireflies
  useEffect(() => {
    if (!isPlaying) return;

    const spawnFirefly = () => {
      const id = Date.now().toString() + Math.random();
      const x = Math.random() * 85 + 5;
      const y = Math.random() * 85 + 5;
      
      // Golden fireflies spawn every 3rd firefly (skill-based pattern, not random)
      spawnCounterRef.current++;
      const isGolden = spawnCounterRef.current % 3 === 0;

      setFireflies(prev => [...prev, { id, x, y, isGolden, spawnTime: Date.now() }]);

      // Auto remove after 3 seconds
      setTimeout(() => {
        setFireflies(prev => prev.filter(f => f.id !== id));
      }, 3000);
    };

    const interval = setInterval(spawnFirefly, 1500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const tapFirefly = (id: string, isGolden: boolean) => {
    if (isGolden) {
      const newScore = gameState.score + 1;
      setGameState({
        ...gameState,
        score: newScore,
        streak: gameState.streak + 1,
        bestScore: Math.max(gameState.bestScore, newScore),
      });
      play('/sounds/success.mp3', { volume: 0.4 });
    } else {
      setGameState({ 
        ...gameState, 
        score: Math.max(0, gameState.score - 1), 
        streak: 0 
      });
      play('/sounds/exhale.mp3', { volume: 0.2 });
    }
    setFireflies(prev => prev.filter(f => f.id !== id));
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameEnded(false);
    setGameState({ ...gameState, score: 0, streak: 0 });
    setCountdown(60);
    spawnCounterRef.current = 0;
    gameStartTimeRef.current = Date.now();
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameEnded(true);
    setFireflies([]);
  };

  // Countdown with proper game ending
  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown <= 0) {
      endGame();
      return;
    }

    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <main className="fixed inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-black flex flex-col overflow-hidden">
      {/* Header with back button and score (only on non-mobile or game not started) */}
      {(!isPlaying || countdown === null) && (
        <div className="relative p-4 sm:p-6 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-white text-opacity-60 hover:text-opacity-100 text-sm font-medium z-10"
          >
            ← Back
          </Link>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center flex-1"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Focus Fireflies</h1>
            <p className="mt-1 text-xs sm:text-sm text-purple-300">Tap golden fireflies</p>
          </motion.div>
          <div className="w-12"></div>
        </div>
      )}

      {/* Game Container - Fullscreen */}
      <div className="flex-1 relative w-full bg-gradient-to-b from-indigo-800 to-black overflow-hidden">
        {/* In-game stats (top during gameplay) */}
        {isPlaying && countdown !== null && (
          <div className="absolute top-4 left-4 right-4 z-20 flex justify-between text-white text-sm font-bold">
            <div className="text-center flex-1">
              <p className="text-yellow-400 text-lg">{gameState.score}</p>
              <p className="text-xs text-purple-300">Score</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-cyan-400 text-lg">{countdown}s</p>
              <p className="text-xs text-purple-300">Time</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-purple-400 text-lg">{gameState.streak}</p>
              <p className="text-xs text-purple-300">Streak</p>
            </div>
          </div>
        )}

        {/* Fireflies */}
        <AnimatePresence>
          {fireflies.map((ff) => (
            <motion.button
              key={ff.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [1, 0.6, 1],
                scale: ff.isGolden ? [1, 1.2, 1] : [1, 0.9, 1],
              }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={() => tapFirefly(ff.id, ff.isGolden)}
              className={`absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full cursor-pointer transition-all ${
                ff.isGolden
                  ? 'bg-yellow-300 shadow-lg shadow-yellow-400'
                  : 'bg-purple-400 shadow-lg shadow-purple-500'
              }`}
              style={{ left: `${ff.x}%`, top: `${ff.y}%`, transform: 'translate(-50%, -50%)' }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          ))}
        </AnimatePresence>

        {/* Start Screen */}
        {!isPlaying && countdown === null && !gameEnded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Focus Fireflies</h2>
              <p className="text-purple-300 mb-8 text-sm sm:text-base">
                Tap only the <span className="text-yellow-400 font-bold">GOLDEN</span> fireflies!
              </p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg text-lg transition-colors shadow-lg"
              >
                Start Game (60s)
              </button>
            </motion.div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameEnded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Game Over!</h2>
              <div className="bg-purple-900 bg-opacity-50 rounded-lg p-6 mb-6 backdrop-blur">
                <div className="grid grid-cols-2 gap-8 text-white">
                  <div>
                    <p className="text-4xl font-bold text-yellow-400">{gameState.score}</p>
                    <p className="text-sm text-purple-300 mt-1">Final Score</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-pink-400">{gameState.bestScore}</p>
                    <p className="text-sm text-purple-300 mt-1">Best Score</p>
                  </div>
                </div>
              </div>
              <button
                onClick={startGame}
                className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition-colors shadow-lg mb-4"
              >
                Play Again
              </button>
              <Link
                href="/"
                className="block text-purple-300 hover:text-purple-200 text-sm font-medium"
              >
                ← Back to Home
              </Link>
            </motion.div>
          </div>
        )}
      </div>

      {/* Tips (only show before game) */}
      {!isPlaying && countdown === null && !gameEnded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 sm:p-6 bg-purple-900 bg-opacity-60 backdrop-blur border-t border-purple-700 border-opacity-30"
        >
          <h3 className="font-semibold text-white mb-2 text-sm">Tips:</h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-purple-300">
            <div>✨ <span className="text-yellow-400">Golden</span> = +1</div>
            <div>💜 <span className="text-purple-400">Purple</span> = -1</div>
            <div>🎯 Every 3rd firefly is golden</div>
            <div>⚡ Tap fast, build your streak</div>
          </div>
        </motion.div>
      )}
    </main>
  );
}
