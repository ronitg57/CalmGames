'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAudio, useLocalStorage } from '@/hooks';

interface MoodEntry {
  id: string;
  color: string;
  date: number;
}

interface MoodState {
  entries: MoodEntry[];
}

const moods = [
  { color: 'bg-red-500', name: 'Stressed', emoji: '😰' },
  { color: 'bg-orange-500', name: 'Anxious', emoji: '😟' },
  { color: 'bg-yellow-500', name: 'Neutral', emoji: '😐' },
  { color: 'bg-lime-500', name: 'Content', emoji: '😊' },
  { color: 'bg-green-500', name: 'Happy', emoji: '😄' },
  { color: 'bg-cyan-500', name: 'Calm', emoji: '😌' },
  { color: 'bg-blue-500', name: 'Focused', emoji: '😐' },
  { color: 'bg-purple-500', name: 'Creative', emoji: '🤔' },
];

export default function MoodPage() {
  const { play } = useAudio();
  const [state, setState] = useLocalStorage<MoodState>('mood-state', { entries: [] });
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState('from-calm-50 to-calm-100');

  const selectMood = (color: string) => {
    setSelectedColor(color);
    play('/sounds/chime.mp3', { volume: 0.3 });

    // Add to history
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      color,
      date: Date.now(),
    };
    setState({ entries: [newEntry, ...state.entries] });

    // Change background based on mood
    const moodIndex = moods.findIndex(m => m.color === color);
    const gradients = [
      'from-red-100 to-orange-100',
      'from-orange-100 to-yellow-100',
      'from-yellow-100 to-lime-100',
      'from-lime-100 to-green-100',
      'from-green-100 to-cyan-100',
      'from-cyan-100 to-blue-100',
      'from-blue-100 to-purple-100',
      'from-purple-100 to-pink-100',
    ];
    setBgColor(gradients[moodIndex]);
  };

  const currentMood = moods.find(m => m.color === selectedColor);

  return (
    <main className={`fixed inset-0 bg-gradient-to-b ${bgColor} flex flex-col overflow-hidden`}>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-calm-900">Mood Palette</h1>
          <p className="text-xs sm:text-sm text-calm-600 mt-1">How are you feeling today?</p>
        </motion.div>
        <div className="w-12"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-4 sm:px-6 pb-4">
        {currentMood && (
          <motion.div
            key={selectedColor}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-6 sm:mb-8"
          >
            <p className="text-6xl sm:text-7xl mb-3">{currentMood.emoji}</p>
            <p className="text-xl sm:text-2xl font-bold text-calm-800">{currentMood.name}</p>
          </motion.div>
        )}

        {/* Mood palette */}
        <div className="w-full max-w-sm mb-6">
          <div className="grid grid-cols-4 gap-2 mb-4">
            {moods.map(mood => (
              <motion.button
                key={mood.color}
                onClick={() => selectMood(mood.color)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`h-16 sm:h-20 rounded-lg shadow-soft transition-all ${mood.color} ${
                  selectedColor === mood.color ? 'ring-4 ring-offset-2 ring-calm-900' : ''
                }`}
                title={mood.name}
              />
            ))}
          </div>

          {/* Suggestion card */}
          {currentMood && (
            <motion.div
              key={currentMood.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white bg-opacity-70 backdrop-blur rounded-lg p-4 shadow-soft text-center text-sm"
            >
              <p className="text-xs text-calm-600 mb-2">Based on your mood, try:</p>
              <div className="space-y-1">
                {currentMood.name === 'Calm' && (
                  <>
                    <p className="font-medium text-calm-800">You're in a great place. Keep it up!</p>
                    <p className="text-xs text-calm-600">Maybe explore journaling or the mind garden.</p>
                  </>
                )}
                {currentMood.name === 'Stressed' && (
                  <>
                    <p className="font-medium text-calm-800">Let's bring your stress down</p>
                    <p className="text-xs text-calm-600">Try breathing exercises or hold my hand.</p>
                  </>
                )}
                {currentMood.name === 'Anxious' && (
                  <>
                    <p className="font-medium text-calm-800">You can work through this</p>
                    <p className="text-xs text-calm-600">Breathe with me or try the safe zone.</p>
                  </>
                )}
                {currentMood.name === 'Happy' && (
                  <>
                    <p className="font-medium text-calm-800">That's wonderful! Celebrate it!</p>
                    <p className="text-xs text-calm-600">Journal this feeling to remember it.</p>
                  </>
                )}
                {!['Calm', 'Stressed', 'Anxious', 'Happy'].includes(currentMood.name) && (
                  <>
                    <p className="font-medium text-calm-800">Take a moment for yourself</p>
                    <p className="text-xs text-calm-600">Any of these games can help you feel better.</p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Mood history */}
        {state.entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white bg-opacity-60 backdrop-blur rounded-lg p-4 shadow-soft w-full max-w-sm mt-auto"
          >
            <h3 className="font-semibold text-calm-900 mb-2 text-sm">Your Mood Timeline (Last 7)</h3>
            <div className="flex gap-1 justify-start flex-wrap">
              {state.entries.slice(0, 7).map(entry => (
                <div
                  key={entry.id}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${entry.color} shadow-soft cursor-help`}
                  title={new Date(entry.date).toLocaleDateString()}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
