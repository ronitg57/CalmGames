'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAudio, useLocalStorage } from '@/hooks';

interface Worry {
  id: string;
  text: string;
  createdAt: number;
}

interface WorryBoxState {
  worries: Worry[];
  boxLocked: boolean;
}

export default function WorryBoxPage() {
  const { play } = useAudio();
  const [state, setState] = useLocalStorage<WorryBoxState>('worry-box-state', {
    worries: [],
    boxLocked: false,
  });
  const [worryInput, setWorryInput] = useState('');
  const [particles, setParticles] = useState<Array<{ id: string; x: number; y: number }>>([]);

  const addWorry = () => {
    if (!worryInput.trim()) return;
    const newWorry: Worry = {
      id: Date.now().toString(),
      text: worryInput,
      createdAt: Date.now(),
    };
    setState({ worries: [...state.worries, newWorry], boxLocked: false });
    setWorryInput('');
    play('/sounds/chime.mp3', { volume: 0.3 });
  };

  const lockBox = () => {
    if (state.worries.length === 0) return;

    setState({ ...state, boxLocked: true });
    play('/sounds/success.mp3', { volume: 0.5 });

    // Create particle effect
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: `${i}-${Date.now()}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);

    // Clear worries after animation
    setTimeout(() => {
      setState({ worries: [], boxLocked: false });
      setParticles([]);
    }, 2000);
  };

  return (
    <main className="fixed inset-0 bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-100 flex flex-col overflow-hidden">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-calm-900">Worry Box</h1>
          <p className="text-xs sm:text-sm text-calm-600 mt-1">Store & release your worries</p>
        </motion.div>
        <div className="w-12"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto flex flex-col px-4 sm:px-6 pb-4">
        {/* Input */}
        <div className="mb-4">
          <textarea
            value={worryInput}
            onChange={e => setWorryInput(e.target.value)}
            onKeyDown={e => e.ctrlKey && e.key === 'Enter' && addWorry()}
            placeholder="What's worrying you? (It's safe here)"
            rows={2}
            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 mb-3 text-sm"
          />
          <button
            onClick={addWorry}
            className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors text-sm"
          >
            Drop Worry in Box
          </button>
        </div>

        {/* Box visualization */}
        <div className="mb-4 flex-1">
          <motion.div
            animate={state.boxLocked ? { rotateZ: [0, -5, 5, 0] } : {}}
            className="relative bg-gradient-to-b from-amber-700 to-amber-900 rounded-lg p-6 shadow-soft-lg h-full flex flex-col"
          >
            {/* Box lid */}
            <motion.div
              animate={state.boxLocked ? { y: -20, opacity: 0 } : { y: 0, opacity: 1 }}
              className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-3/4 h-5 bg-amber-800 rounded-t-lg shadow-soft"
            />

            {/* Worries inside */}
            <div className="min-h-20 bg-amber-100 bg-opacity-20 rounded p-3 mb-3 flex-1 overflow-y-auto">
              {state.worries.length === 0 ? (
                <p className="text-center text-amber-600 text-xs py-3">Box is empty</p>
              ) : (
                <div className="space-y-2">
                  {state.worries.map(worry => (
                    <motion.div
                      key={worry.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white bg-opacity-80 rounded p-2 text-xs text-calm-700 shadow-soft"
                    >
                      {worry.text}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Lock button */}
            {state.worries.length > 0 && (
              <motion.button
                onClick={lockBox}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 bg-amber-900 hover:bg-amber-950 text-white rounded font-medium transition-colors flex items-center justify-center gap-2 text-sm"
              >
                🔒 Lock & Release
              </motion.button>
            )}

            {/* Particles */}
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute w-2 h-2 bg-amber-500 rounded-full"
                style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
                animate={{ y: [0, -200], opacity: [1, 0], scale: [1, 0] }}
                transition={{ duration: 1.5 }}
              />
            ))}
          </motion.div>
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white bg-opacity-60 backdrop-blur rounded-lg p-3 shadow-soft"
        >
          <h3 className="font-semibold text-calm-900 mb-2 text-sm">How it works:</h3>
          <ul className="space-y-1 text-xs text-calm-700">
            <li>✓ Write down your worries</li>
            <li>✓ They&apos;re safe in the box</li>
            <li>✓ Lock the box to release them</li>
            <li>✓ You can return anytime</li>
            <li>✓ Worries are temporary—so is this app&apos;s storage</li>
          </ul>
        </motion.div>
      </div>
    </main>
  );
}
