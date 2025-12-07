'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const activities = [
  { id: 1, name: 'Breathe With Me', slug: 'breathe', emoji: '💨', description: 'Breath regulation & panic reduction', color: 'from-sky-100 to-cyan-100', accent: 'sky' },
  { id: 2, name: 'Mind Garden', slug: 'garden', emoji: '🌸', description: 'Transform negative thoughts', color: 'from-emerald-100 to-teal-100', accent: 'emerald' },
  { id: 3, name: 'Cloud Thoughts', slug: 'clouds', emoji: '☁️', description: 'Let go & categorize', color: 'from-slate-100 to-blue-100', accent: 'slate' },
  { id: 4, name: 'Love Notes', slug: 'love-notes', emoji: '💌', description: 'Personalized reassurance', color: 'from-pink-100 to-rose-100', accent: 'pink' },
  { id: 5, name: 'Focus Fireflies', slug: 'fireflies', emoji: '✨', description: 'Attention training', color: 'from-yellow-100 to-amber-100', accent: 'yellow' },
  { id: 6, name: 'Journal Carousel', slug: 'journal', emoji: '📝', description: 'Micro-journaling', color: 'from-purple-100 to-violet-100', accent: 'purple' },
  { id: 7, name: 'Safe Zone', slug: 'safe-zone', emoji: '🏠', description: 'Mini escape room', color: 'from-green-100 to-lime-100', accent: 'green' },
  { id: 8, name: 'Hold My Hand', slug: 'hand', emoji: '🤝', description: 'Reassurance button', color: 'from-rose-100 to-pink-100', accent: 'rose' },
  { id: 9, name: 'Color My Mood', slug: 'mood', emoji: '🎨', description: 'Mood mapping', color: 'from-indigo-100 to-purple-100', accent: 'indigo' },
  { id: 10, name: 'Worry Box', slug: 'worry-box', emoji: '📦', description: 'Offload & let go', color: 'from-orange-100 to-red-100', accent: 'orange' },
];

const motivationalCards = [
  { text: "You are stronger than you think", emoji: '💪', gradient: 'from-blue-100 to-cyan-100', accent: 'blue' },
  { text: "Your journey matters", emoji: '🌟', gradient: 'from-yellow-100 to-amber-100', accent: 'yellow' },
  { text: "Progress, not perfection", emoji: '🎯', gradient: 'from-orange-100 to-red-100', accent: 'orange' },
  { text: "You deserve kindness", emoji: '💝', gradient: 'from-pink-100 to-rose-100', accent: 'pink' },
  { text: "Every moment is a fresh start", emoji: '🌅', gradient: 'from-purple-100 to-pink-100', accent: 'purple' },
  { text: "You are enough", emoji: '✨', gradient: 'from-indigo-100 to-blue-100', accent: 'indigo' },
  { text: "It's okay to rest", emoji: '🌙', gradient: 'from-slate-100 to-blue-100', accent: 'slate' },
  { text: "Be gentle with yourself", emoji: '💙', gradient: 'from-green-100 to-teal-100', accent: 'green' },
];

const inspirationalQuotes = [
  { quote: "There is hope, even when your brain tells you there isn't.", author: "John Green, Turtles All the Way Down" },
  { quote: "The bravest thing I ever did was continuing my life when I wanted to die.", author: "Juliette Lewis" },
  { quote: "When a flower doesn't bloom, you fix the environment in which it grows, not the flower itself.", author: "Alexander Den Heijer" },
  { quote: "There is no standard normal. Normal is subjective. There are seven billion versions of normal on this planet.", author: "Matt Haig, Reasons to Stay Alive" },
  { quote: "Healing is not the same as curing. Healing is about getting better, even if you can't get fixed.", author: "Matt Haig, Reasons to Stay Alive" },
];

const MotivationalCard = ({ card, index }: { card: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -6, scale: 1.02 }}
    className={`bg-gradient-to-br ${card.gradient} rounded-xl p-4 sm:p-6 shadow-soft border border-white flex flex-col items-center text-center gap-2 min-h-fit`}
    role="article"
    aria-label={`Motivational message: ${card.text}`}
  >
    <motion.span
      className="text-3xl sm:text-4xl"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      role="img"
      aria-label={`${card.emoji} emoji`}
    >
      {card.emoji}
    </motion.span>
    <p className="text-sm sm:text-base font-semibold text-calm-800">
      {card.text}
    </p>
  </motion.div>
);

const QuoteCard = ({ quote, index }: { quote: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ x: 4 }}
    className="bg-white bg-opacity-70 backdrop-blur rounded-lg p-5 sm:p-6 shadow-soft border-l-4 border-sky-400"
  >
    <p className="text-sm sm:text-base text-calm-800 italic mb-2">
      &ldquo;{quote.quote}&rdquo;
    </p>
    <p className="text-xs sm:text-sm text-calm-600 font-medium">
      — {quote.author}
    </p>
  </motion.div>
);

const FloatingText = ({ children, delay = 0 }: { children: any; delay?: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="inline-block"
  >
    {children}
  </motion.span>
);

const ActivityCard = ({ activity, index }: { activity: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={activity.id}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Link href={`/activities/${activity.slug}`} aria-label={`Go to ${activity.name} activity`}>
        <motion.div
          className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${activity.color} p-8 h-full shadow-soft transition-all duration-300 cursor-pointer flex flex-col`}
          whileHover={{ 
            y: -8,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}
          whileTap={{ scale: 0.98 }}
          role="article"
        >
          {/* Background decoration */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-white opacity-0 group-hover:opacity-10 rounded-full blur-3xl"
            animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Emoji */}
            <motion.div
              className="text-5xl mb-4"
              animate={isHovered ? { scale: 1.2, rotate: 12 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
              role="img"
              aria-label={`${activity.name} icon: ${activity.emoji}`}
            >
              {activity.emoji}
            </motion.div>

            {/* Title */}
            <h3 className="text-xl font-bold text-calm-900 group-hover:text-calm-800 transition-colors mb-2">
              {activity.name}
            </h3>

            {/* Description with staggered reveal */}
            <p className="text-sm text-calm-700 mb-4 flex-grow">
              {activity.description}
            </p>

            {/* Interactive arrow */}
            <motion.div
              className="inline-flex items-center gap-2 font-medium text-calm-700 group-hover:text-calm-900 transition-colors"
              animate={isHovered ? { x: 4 } : { x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span>Explore</span>
              <motion.span
                animate={isHovered ? { x: 4 } : { x: 0 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </motion.div>
          </div>

          {/* Top accent bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-50"
            animate={isHovered ? { opacity: 0.5 } : { opacity: 0 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-calm-50 via-sky-50 to-lavender-100 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="fixed top-20 left-10 w-64 h-64 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="fixed top-40 right-10 w-64 h-64 bg-lavender-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="fixed bottom-20 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"
        animate={{ y: [0, 20, 0], x: [0, 30, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="text-center space-y-4">
          <motion.h1
            className="text-5xl sm:text-6xl font-black tracking-tight text-calm-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.span
              className="inline-block"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="inline">Welcome to </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-600">
                CalmGames
              </span>
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-2"
          >
            <p className="text-xl text-calm-700 font-medium">
              <FloatingText delay={0.3}>Your </FloatingText>
              <FloatingText delay={0.4}>personal </FloatingText>
              <FloatingText delay={0.5}>sanctuary </FloatingText>
              <FloatingText delay={0.6}>for </FloatingText>
              <FloatingText delay={0.7}>calm</FloatingText>
            </p>
            <p className="text-sm text-calm-600">
              Take a deep breath. You&apos;re safe here. 💙
            </p>
            <p className="text-sm text-calm-500 max-w-2xl mx-auto mt-4 leading-relaxed">
              <strong className="text-calm-700">Free mental wellness tools</strong> designed for anxiety relief, stress management, panic attack support, and mindfulness practice. 
              No signup required—just instant access to calming activities when you need them most.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center gap-2 pt-4"
            aria-hidden="true"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-sky-400"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Section Title with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="text-center space-y-2">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-calm-900"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Choose Your Moment
          </motion.h2>
          <p className="text-calm-600">Each game is designed to bring you peace and clarity</p>
        </div>
      </motion.div>

      {/* Motivational Cards Section 1 - Top */}
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12"
        >
          {motivationalCards.slice(0, 4).map((card, index) => (
            <MotivationalCard key={index} card={card} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Games Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 border-t-2 border-b-2 border-calm-200 my-4"
      >
        <div className="text-center space-y-2">
          <motion.h2
            className="text-3xl sm:text-4xl font-black text-calm-900 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span>🎮</span>
            <span>Your Calm Games</span>
            <span>🎮</span>
          </motion.h2>
          <p className="text-calm-600 font-medium">10 activities designed to bring you peace and clarity</p>
        </div>
      </motion.div>

      {/* Activities Grid */}
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -150px 0px' }}
        >
          {activities.map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Inspirational Quotes Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 my-8 bg-gradient-to-br from-sky-50 to-cyan-50 rounded-3xl border-2 border-sky-200"
      >
        <motion.h3
          className="text-2xl sm:text-3xl font-black text-center text-calm-900 mb-10 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span>✨</span>
          <span>Inspirational Thoughts</span>
          <span>✨</span>
        </motion.h3>
        <div className="grid gap-4 sm:gap-6">
          {inspirationalQuotes.map((quote, index) => (
            <QuoteCard key={index} quote={quote} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Motivational Cards Section 2 - Middle */}
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {motivationalCards.slice(4, 8).map((card, index) => (
            <MotivationalCard key={index + 4} card={card} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Motivational section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          className="space-y-4 p-8 rounded-2xl bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 border-2 border-white shadow-soft"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="text-2xl font-bold text-calm-900"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ You&apos;ve Got This ✨
          </motion.p>
          <p className="text-calm-700 leading-relaxed">
            It&apos;s okay to not be okay. It&apos;s okay to take breaks. It&apos;s okay to ask for help. 
            These games are here to support you through the tough moments. 
            Choose what resonates with you, and take it one moment at a time.
          </p>
          <motion.p
            className="text-sm text-calm-600 font-medium"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💜 You matter. Your feelings matter. You are worthy of care.
          </motion.p>
        </motion.div>

        {/* Additional affirmation cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12"
        >
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4 text-center">
            <p className="text-2xl mb-2">🌟</p>
            <p className="text-xs sm:text-sm font-semibold text-calm-800">You are loved</p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 text-center">
            <p className="text-2xl mb-2">💚</p>
            <p className="text-xs sm:text-sm font-semibold text-calm-800">You are worthy</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl p-4 text-center">
            <p className="text-2xl mb-2">⭐</p>
            <p className="text-xs sm:text-sm font-semibold text-calm-800">You matter</p>
          </div>
          <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl p-4 text-center">
            <p className="text-2xl mb-2">🌹</p>
            <p className="text-xs sm:text-sm font-semibold text-calm-800">You deserve care</p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl p-4 text-center">
            <p className="text-2xl mb-2">✨</p>
            <p className="text-xs sm:text-sm font-semibold text-calm-800">You are enough</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl p-4 text-center">
            <p className="text-2xl mb-2">💫</p>
            <p className="text-xs sm:text-sm font-semibold text-calm-800">You can do this</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center py-16 px-4 bg-gradient-to-b from-transparent to-calm-50"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <motion.div
            className="space-y-4"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="text-lg font-semibold text-calm-900">
              Remember, you&apos;re not alone in this journey 💙
            </p>
            <div className="flex justify-center gap-2 text-2xl">
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                💚
              </motion.span>
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                💜
              </motion.span>
              <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                💙
              </motion.span>
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}>
                🧡
              </motion.span>
            </div>
          </motion.div>

          <p className="text-calm-700">
            When anxiety or stress knocks on your door, we&apos;re here. Reach out, take a breath, and choose a moment of calm.
          </p>
          
          <motion.div
            className="pt-6 border-t border-calm-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-base font-semibold text-calm-800 mb-2">
              Made with care for your wellbeing by <span className="text-sky-600 font-bold">Ronit Goswami</span>
            </p>
            <p className="text-sm text-calm-600 mb-3">
              CalmGames © 2025 | A sanctuary for mental wellness
            </p>
            <p className="text-xs text-calm-500">
              If you&apos;re in crisis, please reach out to a mental health professional or contact a crisis helpline.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </main>
  );
}
