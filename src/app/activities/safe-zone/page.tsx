'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAudio, useLocalStorage } from '@/hooks';

interface RoomObject {
  id: string;
  color: string;
  shape: 'square' | 'circle';
  x: number;
  y: number;
}

interface SafeZoneState {
  objects: RoomObject[];
  sorted: boolean;
}

export default function SafeZonePage() {
  const { play } = useAudio();
  const [state, setState] = useLocalStorage<SafeZoneState>('safe-zone-state', {
    objects: [
      { id: '1', color: 'bg-red-500', shape: 'square', x: 20, y: 20 },
      { id: '2', color: 'bg-blue-500', shape: 'circle', x: 60, y: 30 },
      { id: '3', color: 'bg-yellow-500', shape: 'square', x: 40, y: 60 },
      { id: '4', color: 'bg-green-500', shape: 'circle', x: 70, y: 70 },
    ],
    sorted: false,
  });

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [redZone, setRedZone] = useState<RoomObject[]>([]);
  const [blueZone, setBlueZone] = useState<RoomObject[]>([]);

  const dragStart = (id: string) => {
    setDraggedId(id);
  };

  const dropInZone = (zone: 'red' | 'blue') => {
    if (!draggedId) return;
    const obj = state.objects.find(o => o.id === draggedId);
    if (!obj) return;

    setState({
      ...state,
      objects: state.objects.filter(o => o.id !== draggedId),
    });

    if (zone === 'red') {
      setRedZone([...redZone, obj]);
    } else {
      setBlueZone([...blueZone, obj]);
    }

    setDraggedId(null);
    play('/sounds/chime.mp3', { volume: 0.3 });

    // Check if done
    if (state.objects.length === 1) {
      setTimeout(() => {
        play('/sounds/success.mp3', { volume: 0.4 });
        setState({ ...state, sorted: true });
      }, 500);
    }
  };

  const reset = () => {
    setState({
      objects: [
        { id: '1', color: 'bg-red-500', shape: 'square', x: 20, y: 20 },
        { id: '2', color: 'bg-blue-500', shape: 'circle', x: 60, y: 30 },
        { id: '3', color: 'bg-yellow-500', shape: 'square', x: 40, y: 60 },
        { id: '4', color: 'bg-green-500', shape: 'circle', x: 70, y: 70 },
      ],
      sorted: false,
    });
    setRedZone([]);
    setBlueZone([]);
  };

  return (
    <main className="fixed inset-0 bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-100 flex flex-col overflow-hidden">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-calm-900">Safe Zone</h1>
          <p className="text-xs sm:text-sm text-calm-600 mt-1">Organize & find focus</p>
        </motion.div>
        <div className="w-12"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto flex flex-col px-4 sm:px-6 pb-4">
        {/* Playfield */}
        <div className="bg-white rounded-lg shadow-soft p-4 mb-4 flex-1 flex flex-col">
          <div className="relative bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex-1 mb-3 overflow-hidden">
            {state.objects.map(obj => (
              <motion.div
                key={obj.id}
                draggable
                onDragStart={() => dragStart(obj.id)}
                className={`absolute w-10 h-10 ${obj.color} rounded cursor-grab active:cursor-grabbing transform hover:scale-110 transition-transform ${
                  obj.shape === 'circle' ? 'rounded-full' : 'rounded'
                }`}
                style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            ))}

            {state.objects.length === 0 && !state.sorted && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-calm-600 font-medium text-sm">Drag all objects to zones</p>
              </div>
            )}
          </div>

          {/* Zones */}
          <div className="grid grid-cols-2 gap-2">
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={() => dropInZone('red')}
              className="bg-red-100 border-2 border-dashed border-red-400 rounded-lg p-2 min-h-20 flex items-center justify-center"
            >
              <div>
                <p className="text-center text-red-700 font-medium text-xs mb-1">Red Zone</p>
                <div className="space-y-0.5">
                  {redZone.map(obj => (
                    <div
                      key={obj.id}
                      className={`w-6 h-6 ${obj.color} rounded mx-auto ${
                        obj.shape === 'circle' ? 'rounded-full' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div
              onDragOver={e => e.preventDefault()}
              onDrop={() => dropInZone('blue')}
              className="bg-blue-100 border-2 border-dashed border-blue-400 rounded-lg p-2 min-h-20 flex items-center justify-center"
            >
              <div>
                <p className="text-center text-blue-700 font-medium text-xs mb-1">Blue Zone</p>
                <div className="space-y-0.5">
                  {blueZone.map(obj => (
                    <div
                      key={obj.id}
                      className={`w-6 h-6 ${obj.color} rounded mx-auto ${
                        obj.shape === 'circle' ? 'rounded-full' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Completion message */}
        {state.sorted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-100 border-2 border-green-400 rounded-lg p-4 text-center mb-3"
          >
            <p className="text-2xl mb-1">✨</p>
            <p className="text-green-700 font-medium text-sm">Task complete! You've organized your space.</p>
          </motion.div>
        )}

        {/* Controls */}
        <button
          onClick={reset}
          className="w-full px-4 py-2 bg-calm-200 hover:bg-calm-300 text-calm-900 rounded-lg font-medium transition-colors text-sm mb-3"
        >
          Reset
        </button>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white bg-opacity-60 backdrop-blur rounded-lg p-3 shadow-soft"
        >
          <h3 className="font-semibold text-calm-900 mb-2 text-xs">Tips:</h3>
          <ul className="space-y-0.5 text-xs text-calm-700">
            <li>• Take your time organizing</li>
            <li>• Repetition is grounding</li>
            <li>• Creating order reduces anxiety</li>
            <li>• Replay whenever you need focus</li>
          </ul>
        </motion.div>
      </div>
    </main>
  );
}
