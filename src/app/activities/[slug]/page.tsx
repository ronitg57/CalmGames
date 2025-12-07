'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ActivityPlaceholder({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState('');

  useEffect(() => {
    Promise.resolve(params).then(value => setSlug(value.slug));
  }, [params]);
  return (
    <main className="min-h-screen bg-gradient-to-b from-calm-50 to-lavender-50 flex flex-col items-center justify-center p-4">
      <Link
        href="/"
        className="absolute top-6 left-6 text-calm-600 hover:text-calm-900 transition-colors text-sm font-medium"
      >
        ← Back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <h1 className="text-3xl font-bold text-calm-900 mb-4">
          Coming Soon
        </h1>
        <p className="text-calm-600 mb-8">
          This activity is being carefully crafted to support your calm and focus.
        </p>
        <div className="text-4xl mb-8">🎨</div>
        <p className="text-sm text-calm-500">
          Activity: <span className="font-mono font-semibold">{slug}</span>
        </p>
      </motion.div>
    </main>
  );
}
