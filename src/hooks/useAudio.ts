'use client';

import { useEffect, useState } from 'react';
import { Howl, Howler } from 'howler';

interface AudioConfig {
  volume?: number;
  loop?: boolean;
  muted?: boolean;
}

export const useAudio = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [masterVolume, setMasterVolume] = useState(1);

  useEffect(() => {
    // Load preferences from localStorage
    const savedMuted = localStorage.getItem('audio-muted') === 'true';
    const savedVolume = localStorage.getItem('audio-volume');
    
    setIsMuted(savedMuted);
    if (savedVolume) {
      const volume = parseFloat(savedVolume);
      setMasterVolume(volume);
      Howler.volume(volume);
    }
  }, []);

  const play = (soundPath: string, config: AudioConfig = {}) => {
    if (isMuted) return;

    const sound = new Howl({
      src: [soundPath],
      volume: (config.volume || 1) * masterVolume,
      loop: config.loop || false,
      autoplay: true,
    });

    return sound;
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('audio-muted', String(newMuted));
  };

  const setVolume = (volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setMasterVolume(clampedVolume);
    localStorage.setItem('audio-volume', String(clampedVolume));
    Howler.volume(clampedVolume);
  };

  return { play, isMuted, toggleMute, masterVolume, setVolume };
};
