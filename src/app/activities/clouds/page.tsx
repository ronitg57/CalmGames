'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAudio, useLocalStorage } from '@/hooks';

interface Cloud {
  id: string;
  thought: string;
  category: 'keep' | 'letgo';
}

interface CloudsState {
  clouds: Cloud[];
}

export default function CloudsPage() {
  const { play } = useAudio();
  const [state, setState] = useLocalStorage<CloudsState>('clouds-state', { clouds: [] });
  const [thoughtInput, setThoughtInput] = useState('');
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const addThought = () => {
    if (!thoughtInput.trim()) return;
    const newCloud: Cloud = {
      id: Date.now().toString(),
      thought: thoughtInput,
      category: 'keep',
    };
    setState({ clouds: [...state.clouds, newCloud] });
    setThoughtInput('');
    play('/sounds/chime.mp3', { volume: 0.3 });
  };

  const categorizeCloud = (id: string, category: 'keep' | 'letgo') => {
    setState({
      clouds: state.clouds.map(cloud =>
        cloud.id === id ? { ...cloud, category } : cloud
      ),
    });
    if (category === 'letgo') {
      play('/sounds/exhale.mp3', { volume: 0.3 });
    } else {
      play('/sounds/inhale.mp3', { volume: 0.3 });
    }
  };

  const deleteCloud = (id: string) => {
    setState({ clouds: state.clouds.filter(c => c.id !== id) });
  };

  const keepClouds = state.clouds.filter(c => c.category === 'keep');
  const letgoClouds = state.clouds.filter(c => c.category === 'letgo');

  return (
    <main className="fixed inset-0 bg-gradient-to-b from-sky-50 via-cyan-50 to-blue-100 flex flex-col overflow-hidden">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-calm-900">Cloud Thoughts</h1>
          <p className="text-xs sm:text-sm text-calm-600 mt-1">Sort thoughts: keep close or let them drift away</p>
        </motion.div>
        <div className="w-12"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto flex flex-col px-4 sm:px-6 pb-4">
        {/* Input */}
        <div className="mb-4">
          <input
            type="text"
            value={thoughtInput}
            onChange={e => setThoughtInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addThought()}
            placeholder="What's on your mind?"
            className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 mb-3"
          />
          <button
            onClick={addThought}
            className="w-full px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors"
          >
            Add Thought
          </button>
        </div>
        {/* Keep and Let Go sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Keep */}
          <div className="bg-white bg-opacity-70 backdrop-blur rounded-lg p-4 shadow-soft">
            <h2 className="font-semibold text-calm-900 mb-3 text-sm">✓ Keep Close ({keepClouds.length})</h2>
            <div className="space-y-2 min-h-[150px] text-xs">
              {keepClouds.map(cloud => (
                <motion.div
                  key={cloud.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-sky-100 rounded-lg p-2 text-calm-700 cursor-grab active:cursor-grabbing flex justify-between items-start"
                  draggable
                  onDragStart={() => setDraggedId(cloud.id)}
                >
                  <span className="flex-1">{cloud.thought}</span>
                  <button
                    onClick={() => deleteCloud(cloud.id)}
                    className="ml-2 text-red-500 hover:text-red-700 text-xs flex-shrink-0"
                  >
                    ✕
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Let Go */}
          <div className="bg-white bg-opacity-70 backdrop-blur rounded-lg p-4 shadow-soft">
            <h2 className="font-semibold text-calm-900 mb-3 text-sm">✈️ Let Go ({letgoClouds.length})</h2>
            <div
              className="space-y-2 min-h-[150px] border-2 border-dashed border-lavender-300 rounded-lg p-2 text-xs"
              onDragOver={e => e.preventDefault()}
              onDrop={() => {
                if (draggedId) {
                  categorizeCloud(draggedId, 'letgo');
                  setDraggedId(null);
                }
              }}
            >
              {letgoClouds.length === 0 ? (
                <p className="text-center text-calm-400 text-xs py-6">Drag thoughts here</p>
              ) : (
                letgoClouds.map(cloud => (
                  <motion.div
                    key={cloud.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-lavender-100 rounded-lg p-2 text-calm-700 flex justify-between items-start"
                  >
                    <span className="flex-1">{cloud.thought}</span>
                    <button
                      onClick={() => deleteCloud(cloud.id)}
                      className="ml-2 text-red-500 hover:text-red-700 text-xs flex-shrink-0"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white bg-opacity-60 backdrop-blur rounded-lg p-4 shadow-soft mt-auto"
        >
          <h3 className="font-semibold text-calm-900 mb-2 text-sm">Tips:</h3>
          <ul className="space-y-1 text-xs text-calm-700">
            <li>• Keep thoughts that serve you</li>
            <li>• Release thoughts that don&apos;t help</li>
            <li>• Letting go doesn&apos;t mean forgetting</li>
            <li>• You can always revisit or redo</li>
          </ul>
        </motion.div>
      </div>
    </main>
  );
}
