'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAudio, useLocalStorage } from '@/hooks';

interface LoveNote {
  id: string;
  message: string;
  createdAt: number;
}

interface NotesState {
  notes: LoveNote[];
}

export default function LoveNotesPage() {
  const { play } = useAudio();
  const [state, setState] = useLocalStorage<NotesState>('love-notes-state', { notes: [] });
  const [messageInput, setMessageInput] = useState('');
  const [openedId, setOpenedId] = useState<string | null>(null);

  const addMessage = () => {
    if (!messageInput.trim()) return;
    const newNote: LoveNote = {
      id: Date.now().toString(),
      message: messageInput,
      createdAt: Date.now(),
    };
    setState({ notes: [...state.notes, newNote] });
    setMessageInput('');
    play('/sounds/chime.mp3', { volume: 0.3 });
  };

  const toggleOpen = (id: string) => {
    setOpenedId(openedId === id ? null : id);
    if (openedId !== id) {
      play('/sounds/success.mp3', { volume: 0.4 });
    }
  };

  const deleteNote = (id: string) => {
    setState({ notes: state.notes.filter(n => n.id !== id) });
  };

  return (
    <main className="fixed inset-0 bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 flex flex-col overflow-hidden">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-calm-900">Love Notes</h1>
          <p className="text-xs sm:text-sm text-calm-600 mt-1">Personalized messages of reassurance</p>
        </motion.div>
        <div className="w-12"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto flex flex-col px-4 sm:px-6 pb-4">
        {/* Add Message */}
        <div className="mb-4">
          <textarea
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            placeholder="Write a message of support..."
            rows={2}
            className="w-full px-4 py-3 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 mb-3 text-sm"
          />
          <button
            onClick={addMessage}
            className="w-full px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium transition-colors"
          >
            Save Message
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1">
          {state.notes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white bg-opacity-60 backdrop-blur rounded-lg"
            >
              <p className="text-3xl mb-3">💌</p>
              <p className="text-calm-600 text-sm">No messages yet. Add one when you need reassurance.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {state.notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.05 }}
                >
                  <motion.div
                    onClick={() => toggleOpen(note.id)}
                    className="bg-white rounded-lg p-4 shadow-soft cursor-pointer min-h-[120px] sm:min-h-[140px] flex flex-col justify-between text-sm"
                    animate={{
                      rotateY: openedId === note.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {openedId === note.id ? (
                      <div className="text-center">
                        <p className="text-calm-700 text-xs sm:text-sm leading-relaxed">{note.message}</p>
                      </div>
                    ) : (
                      <div className="text-center flex flex-col items-center justify-center h-full">
                        <p className="text-4xl mb-2">💌</p>
                        <p className="text-calm-600 text-xs">Click to open</p>
                      </div>
                    )}
                    {openedId === note.id && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          deleteNote(note.id);
                        }}
                        className="mt-3 text-xs text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
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
            <li>• Write messages to yourself for hard days</li>
            <li>• Share with trusted ones you want to hear from</li>
            <li>• Open when you need a reminder you're loved</li>
            <li>• Keep messages short and genuine</li>
          </ul>
        </motion.div>
      </div>
    </main>
  );
}
