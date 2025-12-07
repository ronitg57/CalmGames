'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAudio, useLocalStorage } from '@/hooks';

interface Plant {
  id: string;
  worry: string;
  type: 'weed' | 'flower';
  createdAt: number;
}

interface GardenState {
  plants: Plant[];
}

export default function GardenPage() {
  const { play } = useAudio();
  const [gardenState, setGardenState] = useLocalStorage<GardenState>('garden-state', { plants: [] });
  const [worryInput, setWorryInput] = useState('');
  const [showInput, setShowInput] = useState(false);

  const flowerEmojis = ['🌸', '🌼', '🌻', '🌷', '🌹', '🏵️', '💐'];
  const weedEmojis = ['🌱', '🌾', '🪴'];

  const addWorry = () => {
    if (!worryInput.trim()) return;

    const newPlant: Plant = {
      id: Date.now().toString(),
      worry: worryInput,
      type: 'weed',
      createdAt: Date.now(),
    };

    setGardenState({
      plants: [...gardenState.plants, newPlant],
    });

    setWorryInput('');
    setShowInput(false);
    play('/sounds/chime.mp3', { volume: 0.3 });
  };

  const transformPlant = (id: string) => {
    setGardenState({
      plants: gardenState.plants.map(plant =>
        plant.id === id ? { ...plant, type: 'flower' } : plant
      ),
    });
    play('/sounds/success.mp3', { volume: 0.4 });
  };

  const deletePlant = (id: string) => {
    setGardenState({
      plants: gardenState.plants.filter(plant => plant.id !== id),
    });
  };

  const getEmoji = (plant: Plant) => {
    if (plant.type === 'weed') {
      return weedEmojis[Math.floor(Math.random() * weedEmojis.length)];
    }
    return flowerEmojis[Math.floor((plant.id.charCodeAt(0)) % flowerEmojis.length)];
  };

  return (
    <main className="fixed inset-0 bg-gradient-to-b from-green-50 via-calm-50 to-mint-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="relative p-4 sm:p-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-calm-600 hover:text-calm-900 text-sm font-medium z-10"
        >
          ← Back
        </Link>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center flex-1"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-calm-900">Mind Garden</h1>
          <p className="text-xs sm:text-sm text-calm-600 mt-1">Transform worries into growth</p>
        </motion.div>
        <div className="w-12"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto flex flex-col px-4 sm:px-6 pb-4">
        {/* Garden stats */}
        <div className="text-center mb-4">
          <p className="text-sm text-calm-600">
            Flowers: <span className="font-bold">{gardenState.plants.filter(p => p.type === 'flower').length}</span> | 
            Weeds: <span className="font-bold">{gardenState.plants.filter(p => p.type === 'weed').length}</span>
          </p>
        </div>

        {/* Garden grid */}
        <div className="mb-4">
        {gardenState.plants.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white bg-opacity-60 backdrop-blur rounded-lg"
          >
            <p className="text-4xl mb-4">🌱</p>
            <p className="text-calm-600">Your garden is empty. Plant a worry to get started!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {gardenState.plants.map(plant => (
              <motion.div
                key={plant.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-lg p-4 shadow-soft text-center"
              >
                <div className="text-3xl mb-2">{getEmoji(plant)}</div>
                <p className="text-xs text-calm-600 mb-3 line-clamp-2">{plant.worry}</p>
                <div className="flex gap-2 justify-center">
                  {plant.type === 'weed' && (
                    <button
                      onClick={() => transformPlant(plant.id)}
                      className="text-xs px-2 py-1 bg-mint-200 hover:bg-mint-300 text-mint-700 rounded transition-colors"
                    >
                      Transform
                    </button>
                  )}
                  <button
                    onClick={() => deletePlant(plant.id)}
                    className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

        {/* Add worry button/input */}
        {!showInput ? (
          <button
            onClick={() => setShowInput(true)}
            className="w-full px-6 py-3 bg-mint-500 hover:bg-mint-600 text-white rounded-lg font-medium transition-colors shadow-soft mb-4"
          >
            + Plant a new worry
          </button>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 shadow-soft mb-4"
          >
            <label className="block text-sm font-medium text-calm-900 mb-3">
              What's worrying you?
            </label>
            <input
              type="text"
              value={worryInput}
              onChange={e => setWorryInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addWorry()}
              placeholder="Type your worry here..."
              className="w-full px-4 py-2 border border-calm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-500 mb-4"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={addWorry}
                className="flex-1 px-4 py-2 bg-mint-500 hover:bg-mint-600 text-white rounded-lg font-medium transition-colors"
              >
                Plant worry
              </button>
              <button
                onClick={() => {
                  setShowInput(false);
                  setWorryInput('');
                }}
                className="flex-1 px-4 py-2 bg-calm-200 hover:bg-calm-300 text-calm-900 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white bg-opacity-60 backdrop-blur rounded-lg p-4 shadow-soft mt-auto"
        >
          <h3 className="font-semibold text-calm-900 mb-2 text-sm">Garden tips:</h3>
          <ul className="space-y-1 text-xs text-calm-700">
            <li>• Plant worries to externalize them</li>
            <li>• Tap "Transform" to reframe them as growth</li>
            <li>• Your garden grows with every reframe</li>
            <li>• No wrong way to garden</li>
          </ul>
        </motion.div>
      </div>
    </main>
  );
}
