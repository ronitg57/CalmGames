# Contributing to CalmGames

Thank you for wanting to contribute to CalmGames! We're grateful for your care and interest in making mental health tools accessible and compassionate.

## 🧠 Core Principles

Before contributing, please understand our core values:

### 1. **Anxiety-First Design**
- No complex interactions
- No time pressure or scoring
- No performance anxiety
- Minimal cognitive load
- Clear, reassuring language

### 2. **Constant Validation**
- Remind users that their feelings are valid
- No judgment language
- Celebrate every interaction
- Acknowledge progress without pressure

### 3. **Privacy-First**
- All data stored locally (no backends)
- No tracking or analytics
- No external data collection
- Users fully control their data

### 4. **Accessibility**
- WCAG AA compliant
- Keyboard navigation
- Screen reader support
- Motion preferences respected
- High contrast support

---

## 🚀 How to Contribute

### Reporting Bugs

Found a bug? Please create an issue with:
- **Title:** Concise description of the bug
- **Description:** Detailed explanation
- **Steps to Reproduce:** How to trigger the bug
- **Expected Behavior:** What should happen
- **Actual Behavior:** What actually happened
- **Screenshots:** If applicable
- **Device/Browser:** Where you found it

### Suggesting Features

Have an idea? Please include:
- **Use Case:** Who needs this and why?
- **Design:** How should it work?
- **Alignment:** Does it fit anxiety-first principles?
- **Examples:** Similar apps/features you've seen

### Code Contributions

#### Setup
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/calmgames.git
cd calmgames

# Create a branch
git checkout -b feature/your-feature-name

# Install dependencies
npm install

# Start development server
npm run dev
```

#### Before You Code
1. **Check existing issues** — Don't duplicate efforts
2. **Discuss big changes** — Comment on an issue first
3. **Read the code** — Understand the architecture
4. **Review guidelines** — Follow our style guide

#### While Coding

**Maintain Anxiety-First Design:**
- No timers or countdowns (unless user-initiated)
- No notifications that startle
- Soft, slow animations (300-800ms)
- Clear, empathetic copy
- Celebrate progress gently

**Follow Code Style:**
```typescript
// Use TypeScript
// Prefer functional components
// Use custom hooks for state management
// Comment non-obvious logic

export default function GamePage() {
  const [value, setValue] = useLocalStorage('key', defaultValue);
  const { play } = useAudio();
  const motionSafe = useMotionSafe();

  return (
    <div className="fixed inset-0 w-full h-full overflow-y-auto">
      {/* Your component */}
    </div>
  );
}
```

**Accessibility Checklist:**
- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] ARIA labels for buttons/inputs
- [ ] Focus indicators visible
- [ ] Color contrast WCAG AA+
- [ ] Tested with screen reader
- [ ] Motion preferences respected

**Testing:**
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Manual testing on mobile (DevTools device emulation)
```

#### After You Code

1. **Create a Pull Request**
   - Title: "Feature: [description]" or "Fix: [description]"
   - Description: Explain what and why
   - Reference issues: "Fixes #123"

2. **PR Checklist:**
   - [ ] Code follows our style guide
   - [ ] Accessibility tested
   - [ ] No console errors/warnings
   - [ ] Mobile tested
   - [ ] Motion-reduce tested
   - [ ] Changes documented

3. **Respond to Feedback**
   - We'll review kindly
   - Questions mean we want to understand better
   - Be open to suggestions

---

## 📋 Project Ideas

### Easy (Good First Issues)
- Add more inspirational quotes
- Improve existing game descriptions
- Add localization (Spanish, French, etc.)
- Create emoji-based mood tracker
- Improve UI of specific games

### Medium
- Add PWA support (offline, installable)
- Create alternative themes (dark mode, high contrast)
- Build audio library for ambient sounds
- Add export-to-journal feature
- Implement achievement badges

### Hard
- Create backend for optional cloud sync
- Build community features (anonymous support circles)
- Create admin dashboard for game metrics
- Implement AI-powered mood suggestions
- Build mobile app wrapper (React Native/Flutter)

---

## 📚 Code Architecture

### Adding a New Game

1. **Create folder:**
   ```bash
   mkdir src/app/activities/[game-slug]
   ```

2. **Create `page.tsx`:**
   ```typescript
   'use client';

   import { useState, useEffect } from 'react';
   import { motion } from 'framer-motion';
   import { useLocalStorage, useAudio, useMotionSafe } from '@/hooks';

   export default function GamePage() {
     const [data, setData] = useLocalStorage('game-key', defaultValue);
     const { play } = useAudio();
     const prefersReducedMotion = useMotionSafe();

     return (
       <div className="fixed inset-0 w-full h-full overflow-y-auto bg-gradient-to-br from-sky-50 to-cyan-50">
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.6 }}
           className="p-4 sm:p-6"
         >
           {/* Your game UI */}
         </motion.div>
       </div>
     );
   }
   ```

3. **Update `src/app/page.tsx`:**
   ```typescript
   const activities = [
     // ... existing games
     { 
       id: 11, 
       name: 'Game Name', 
       slug: 'game-slug', 
       emoji: '🎮',
       description: 'Brief description',
       color: 'from-blue-100 to-cyan-100',
       accent: 'blue' 
     },
   ];
   ```

### Useful Hooks

**`useLocalStorage(key, defaultValue)`**
```typescript
const [value, setValue] = useLocalStorage('key', defaultValue);
// Automatically syncs with localStorage
```

**`useAudio()`**
```typescript
const { play, stop, setVolume } = useAudio();
play('/sounds/success.mp3', { volume: 0.4 });
```

**`useMotionSafe()`**
```typescript
const prefersReducedMotion = useMotionSafe();
if (!prefersReducedMotion) {
  // Play animations
}
```

---

## 🎨 Design Guidelines

### Colors
Use our calm palette (defined in `tailwind.config.ts`):
- Sky: Peace and openness
- Teal: Grounding and nature
- Lavender: Calm and focus
- Pink: Compassion and softness

### Animations
- **Micro-interactions:** 300ms (hover, tap)
- **Page transitions:** 500-600ms
- **Entrance animations:** 600-800ms
- **Always:** Respect `prefers-reduced-motion`

### Typography
- Use system sans-serif for accessibility
- Sizes: sm (14px), base (16px), lg (18px), xl (20px)
- Line height: 1.5 for readability
- Avoid small text (<14px)

### Spacing
Use Tailwind scale (4px base):
- p-2, p-4, p-6, p-8 (padding)
- gap-4, gap-6 (spacing between elements)
- my-4, my-8 (vertical margins)

---

## 📝 Commit Messages

Write clear, descriptive commit messages:

```
feat: Add dark mode toggle
fix: Correct bubble positioning on mobile
docs: Update README with setup guide
chore: Update dependencies
style: Format code with Prettier
test: Add tests for Hand game

Optionally add a body:
- What changed
- Why it changed
- How to test it
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Test on desktop (Chrome, Firefox, Safari)
- [ ] Test on mobile (iPhone, Android)
- [ ] Test with keyboard navigation (Tab, Enter, Esc)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Test with motion-reduce enabled
- [ ] Test with high contrast mode
- [ ] Test in private/incognito mode (localStorage)

### Running Tests
```bash
# Lint
npm run lint

# Type check
npm run type-check

# Build to catch errors
npm run build
```

---

## 🤝 Code of Conduct

- **Be kind and respectful** — We're all learning
- **Focus on ideas, not people** — Critique code, not developers
- **Assume good intent** — Ask clarifying questions
- **Celebrate efforts** — Small contributions matter
- **Respect mental health** — Don't push yourself or others too hard

This is a mental health project. Be gentle. 💙

---

## ❓ Questions?

- **Documentation:** Check README.md and copilot-instructions.md
- **Issues:** Search existing GitHub issues
- **Discussions:** Start a discussion for open-ended questions
- **Email:** Your contact info (to be added)

---

## 🙏 Thank You

Thank you for caring enough to contribute. You're helping create a tool that might save someone's life or at least give them a moment of peace.

You matter. Your work matters. 💙

---

**Remember:** CalmGames is built with people in distress in mind. Every line of code should ask: "Does this help someone feel safe and less alone?"