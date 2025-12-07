'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAudio, useLocalStorage } from '@/hooks';

interface JournalEntry {
  id: string;
  prompt: string;
  response: string;
  date: number;
}

interface JournalState {
  entries: JournalEntry[];
}

const prompts = [
  'What made you smile today?',
  'What are you grateful for?',
  'A small win today was...',
  'Someone who made me feel good...',
  'Something I learned today...',
  'A moment of peace I found...',
  'Something I am proud of...',
  'Someone I appreciate...',
];

export default function JournalPage() {
  const { play } = useAudio();
  const [state, setState] = useLocalStorage<JournalState>('journal-state', { entries: [] });
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);
  const [response, setResponse] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const getRandomPrompt = () => {
    const random = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(random);
    setResponse('');
  };

  const saveEntry = () => {
    if (!response.trim()) return;
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      prompt: currentPrompt,
      response,
      date: Date.now(),
    };
    setState({ entries: [newEntry, ...state.entries] });
    setResponse('');
    getRandomPrompt();
    play('/sounds/success.mp3', { volume: 0.4 });
  };

  const deleteEntry = (id: string) => {
    setState({ entries: state.entries.filter(e => e.id !== id) });
  };

  return (
    <main className="fixed inset-0 bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-100 flex flex-col overflow-hidden">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-calm-900">Journal</h1>
          <p className="text-xs sm:text-sm text-calm-600 mt-1">Reflect on your day</p>
        </motion.div>
        <div className="w-12"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto flex flex-col px-4 sm:px-6 pb-4">
        {!showHistory ? (
          <>
            {/* Prompt Card */}
            <motion.div
              key={currentPrompt}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-soft p-6 text-center mb-4 flex-shrink-0"
            >
              <p className="text-3xl mb-3">✨</p>
              <p className="text-base sm:text-lg text-calm-700 font-medium mb-4">{currentPrompt}</p>
              <input
                type="text"
                value={response}
                onChange={e => setResponse(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveEntry()}
                placeholder="Your answer..."
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 mb-4 text-sm"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={saveEntry}
                  className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors text-sm"
                >
                  Save & Next
                </button>
                <button
                  onClick={getRandomPrompt}
                  className="px-4 py-2 bg-calm-200 hover:bg-calm-300 text-calm-900 rounded-lg font-medium transition-colors text-sm"
                >
                  Skip
                </button>
              </div>
            </motion.div>

            {/* View History Button */}
            <button
              onClick={() => setShowHistory(true)}
              className="w-full px-4 py-3 bg-calm-100 hover:bg-calm-200 text-calm-900 rounded-lg font-medium transition-colors text-sm mb-4"
            >
              📚 View History ({state.entries.length})
            </button>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white bg-opacity-60 backdrop-blur rounded-lg p-4 shadow-soft mt-auto"
            >
              <h3 className="font-semibold text-calm-900 mb-2 text-sm">Tips:</h3>
              <ul className="space-y-1 text-xs text-calm-700">
                <li>• One line is enough</li>
                <li>• Honesty over perfection</li>
                <li>• Review your entries for patterns</li>
                <li>• Celebrate small wins</li>
              </ul>
            </motion.div>
          </>
        ) : (
          <>
            {/* Back to Journal Button */}
            <button
              onClick={() => setShowHistory(false)}
              className="mb-4 px-4 py-2 bg-calm-200 hover:bg-calm-300 text-calm-900 rounded-lg font-medium transition-colors text-sm"
            >
              ← Back to Journal
            </button>

            {/* History */}
            {state.entries.length === 0 ? (
              <div className="text-center py-8 bg-white bg-opacity-60 backdrop-blur rounded-lg">
                <p className="text-calm-600 text-sm">No entries yet. Start journaling!</p>
              </div>
            ) : (
              <div className="space-y-3 flex-1 overflow-y-auto">
                {state.entries.map(entry => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg p-4 shadow-soft"
                  >
                    <p className="text-xs text-calm-500 mb-1">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs font-medium text-amber-600 mb-2">{entry.prompt}</p>
                    <p className="text-calm-700 text-sm mb-2">{entry.response}</p>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
