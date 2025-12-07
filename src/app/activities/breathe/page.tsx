'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMotionSafe, useAudio, useLocalStorage } from '@/hooks';

interface BreathingPreferences {
  sessionsCompleted: number;
}

export default function BreathePage() {
  const { shouldReduceMotion } = useMotionSafe();
  const { play } = useAudio();
  const backgroundMusicRef = useRef<any>(null);
  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [prefs, setPrefs] = useLocalStorage<BreathingPreferences>('breathing-prefs', {
    sessionsCompleted: 0,
  });

  const [isBreathing, setIsBreathing] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [bubbleScale, setBubbleScale] = useState(1);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [phaseText, setPhaseText] = useState('Ready to breathe?');
  const [displayTimer, setDisplayTimer] = useState('0s');
  const [musicVolume, setMusicVolume] = useState(0.3);


  const startBreathing = () => {
    setIsBreathing(true);
    setCycleCount(0);
    setBubbleScale(1);
    setCurrentPhase('inhale');

    // Start background music
    if (!backgroundMusicRef.current) {
      try {
        backgroundMusicRef.current = play('/sounds/calm-background.mp3', { volume: musicVolume, loop: true });
      } catch (e) {
        console.log('Background music not available');
      }
    }

    let timeElapsed = 0;
    const INHALE_TIME = 4000;
    const HOLD_TIME = 7000;
    const EXHALE_TIME = 8000;
    const TOTAL_CYCLE = INHALE_TIME + HOLD_TIME + EXHALE_TIME;
    let lastCycleCount = 0;

    breathingIntervalRef.current = setInterval(() => {
      timeElapsed += 100;
      const cyclePosition = timeElapsed % TOTAL_CYCLE;

      if (cyclePosition < INHALE_TIME) {
        // Inhale phase
        setCurrentPhase('inhale');
        setPhaseText('Inhale slowly...');
        const progress = cyclePosition / INHALE_TIME;
        setBubbleScale(1 + progress * 0.8);
        const secondsLeft = Math.ceil((INHALE_TIME - cyclePosition) / 1000);
        setDisplayTimer(`${secondsLeft}s`);
      } else if (cyclePosition < INHALE_TIME + HOLD_TIME) {
        // Hold phase
        setCurrentPhase('hold');
        setPhaseText('Hold gently...');
        setBubbleScale(1.8);
        const timeInHold = cyclePosition - INHALE_TIME;
        const secondsLeft = Math.ceil((HOLD_TIME - timeInHold) / 1000);
        setDisplayTimer(`${secondsLeft}s`);
      } else {
        // Exhale phase
        setCurrentPhase('exhale');
        setPhaseText('Exhale completely...');
        const timeInExhale = cyclePosition - INHALE_TIME - HOLD_TIME;
        const progress = timeInExhale / EXHALE_TIME;
        setBubbleScale(1.8 - progress * 0.8);
        const secondsLeft = Math.ceil((EXHALE_TIME - timeInExhale) / 1000);
        setDisplayTimer(`${secondsLeft}s`);
      }

      // Increment cycle when we loop back
      const newCycleCount = Math.floor(timeElapsed / TOTAL_CYCLE);
      if (newCycleCount > lastCycleCount) {
        setCycleCount(newCycleCount);
        lastCycleCount = newCycleCount;
      }
    }, 100);
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setPhaseText('Ready to breathe?');
    setBubbleScale(1);
    setDisplayTimer('0s');
    setCurrentPhase('inhale');

    if (breathingIntervalRef.current) {
      clearInterval(breathingIntervalRef.current);
      breathingIntervalRef.current = null;
    }

    if (backgroundMusicRef.current) {
      try {
        backgroundMusicRef.current.stop();
      } catch (e) {
        console.log('Error stopping music');
      }
      backgroundMusicRef.current = null;
    }

    setPrefs({ ...prefs, sessionsCompleted: prefs.sessionsCompleted + 1 });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setMusicVolume(newVolume);
    
    // If music is currently playing, update its volume
    if (backgroundMusicRef.current && isBreathing) {
      try {
        backgroundMusicRef.current.volume(newVolume);
      } catch (err) {
        console.log('Error updating volume');
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
      if (backgroundMusicRef.current) {
        try {
          backgroundMusicRef.current.stop();
        } catch (e) {
          console.log('Error cleaning up music');
        }
      }
    };
  }, []);
  return (
    <main className="fixed inset-0 bg-gradient-to-b from-sky-50 via-calm-50 to-lavender-100 flex flex-col overflow-hidden">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-calm-900">Breathe With Me</h1>
          <p className="text-xs sm:text-sm text-calm-600 mt-1">Follow the bubble. You&apos;re safe.</p>
        </motion.div>
        <div className="w-12"></div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center px-4 sm:px-6 pb-4">
        <div className="w-full max-w-xl flex flex-col items-center pt-4 sm:pt-6">

        {/* Bubble container */}
        <div className="w-64 h-64 sm:w-80 sm:h-80 flex justify-center items-center mb-4 sm:mb-6 flex-shrink-0">
          <motion.div
            animate={{
              scale: shouldReduceMotion ? 1 : bubbleScale,
            }}
            transition={{
              type: 'tween',
              duration: 0.1,
              ease: 'linear',
            }}
            style={{
              boxShadow:
                isBreathing && currentPhase === 'inhale'
                  ? `0 0 80px rgba(14, 165, 233, 0.6)`
                  : isBreathing && currentPhase === 'hold'
                    ? `0 0 80px rgba(168, 85, 247, 0.6)`
                    : isBreathing && currentPhase === 'exhale'
                      ? `0 0 80px rgba(34, 197, 94, 0.6)`
                      : undefined,
            }}
            className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br ${
              currentPhase === 'inhale'
                ? 'from-sky-300 to-sky-500'
                : currentPhase === 'hold'
                  ? 'from-lavender-300 to-lavender-500'
                  : 'from-mint-300 to-mint-500'
            } shadow-soft-lg flex items-center justify-center cursor-pointer transition-colors relative overflow-hidden flex-shrink-0 ${
              !isBreathing ? 'hover:scale-105 hover:shadow-lg' : ''
            }`}
            onClick={() => {
              if (!isBreathing) startBreathing();
            }}
          >
            {/* Border animation during hold phase */}
            {currentPhase === 'hold' && isBreathing && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white border-opacity-40"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 0.4, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* Inner dot */}
            <motion.span
              className="text-5xl sm:text-6xl text-white text-opacity-70 relative z-10"
              animate={{
                opacity: isBreathing ? [0.5, 1, 0.5] : 0.7,
              }}
              transition={{
                duration: currentPhase === 'hold' ? 1 : 2,
                repeat: isBreathing ? Infinity : 0,
              }}
            >
              ●
            </motion.span>
          </motion.div>
        </div>

        {/* Phase text with timer */}
        <div className="text-center mb-8">
          <motion.p
            key={currentPhase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-xl font-medium text-calm-700 h-8"
          >
            {isBreathing && phaseText} {isBreathing && `(${displayTimer})`}
          </motion.p>
        </div>

        {/* Cycle counter */}
        {isBreathing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <p className="text-sm text-calm-600">
              Breathing cycles: <span className="font-bold text-calm-900 text-lg">{cycleCount}</span>
            </p>
          </motion.div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 justify-center flex-col sm:flex-row mb-8">
          {!isBreathing ? (
            <>
              <button
                onClick={startBreathing}
                className="flex-1 px-6 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-soft"
              >
                Start Breathing
              </button>
              <button
                onClick={() => {
                  // Settings placeholder
                }}
                className="flex-1 px-6 py-4 bg-calm-200 hover:bg-calm-300 text-calm-900 rounded-lg font-medium transition-colors"
              >
                ⚙️ Settings
              </button>
            </>
          ) : (
            <button
              onClick={stopBreathing}
              className="flex-1 px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all shadow-soft"
            >
              Stop Breathing
            </button>
          )}
        </div>

        {/* Volume Control */}
        <div className="w-full max-w-sm bg-white bg-opacity-50 backdrop-blur rounded-lg p-4 shadow-soft mb-8">
          <label className="block text-sm font-semibold text-calm-900 mb-2">
            🔊 Background Music Volume
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={musicVolume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-calm-200 rounded-full appearance-none cursor-pointer accent-sky-500"
            />
            <span className="text-sm font-medium text-calm-700 w-10 text-center">
              {Math.round(musicVolume * 100)}%
            </span>
          </div>
          <p className="mt-2 text-xs text-calm-600">
            {musicVolume === 0 ? 'Muted' : musicVolume <= 0.3 ? 'Low' : musicVolume <= 0.6 ? 'Medium' : 'High'}
          </p>
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 bg-white bg-opacity-60 backdrop-blur rounded-lg p-6 shadow-soft"
        >
          <h3 className="font-semibold text-calm-900 mb-3">Breathing Tips:</h3>
          <ul className="space-y-2 text-sm text-calm-700">
            <li>• Focus on the bubble, not your surroundings</li>
            <li>• Breathe naturally—no forcing</li>
            <li>• If your mind wanders, gently bring it back</li>
            <li>• Use this whenever you feel anxious</li>
            <li>• Consistency matters more than perfection</li>
          </ul>
        </motion.div>

        {/* Stats */}
        <div className="mt-6 text-center text-xs text-calm-500">
          <p>
            Sessions completed:{' '}
            <span className="font-bold text-calm-700">{prefs.sessionsCompleted}</span>
          </p>
          <p className="mt-1 text-calm-400">Each breath brings you closer to calm</p>
        </div>
        </div>
      </div>
    </main>
  );
}
