# CalmGames Development Guide

## Project Overview

CalmGames is a Next.js-based web application providing 10 calming games/activities for anxiety, stress, and concentration support. The project is built with:

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Audio**: Howler.js
- **State**: React Context + localStorage

## Architecture & Design Principles

### Anxiety-First Design
- Minimize cognitive load (no complex interactions)
- Use soft, slow animations (300-500ms transitions)
- Gentle color palette (calm, mint, lavender, sky)
- Clear, reassuring language
- No time pressure or scoring anxiety

### File Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home (activity grid)
│   ├── globals.css        # Global styles
│   └── activities/
│       ├── [slug]/        # Dynamic activity routes
│       ├── breathe/       # Breathe With Me (first game)
│       └── garden/        # Mind Garden (second game)
├── hooks/                 # Custom React hooks
│   ├── useMotionSafe.ts   # Motion preference support
│   ├── useAudio.ts        # Audio playback control
│   └── useLocalStorage.ts # Persistent storage
├── components/            # Reusable UI components (TBD)
└── lib/                   # Utilities & helpers (TBD)
```

## Key Features Implemented

### 1. Breathe With Me (`/activities/breathe`)
- Fullscreen bubble that expands/contracts with breathing
- Customizable inhale/hold/exhale durations
- Session counter & history
- Audio cues (soft whoosh)
- Motion-reduce support

### 2. Mind Garden (`/activities/garden`)
- Plant worries (weeds) on a garden canvas
- Transform worries to flowers (reframe)
- Persistent storage of plants
- Stats (flower/weed count)
- Delete/edit entries

### 3. Placeholder Route (`/activities/[slug]`)
- Generic "Coming Soon" page for unimplemented activities
- Used for: Clouds, Love Notes, Fireflies, Journal, Safe Zone, Hold Hand, Color Mood, Worry Box

## Development Workflow

### Adding a New Activity

1. **Create the route folder**: `src/app/activities/[activity-name]/`
2. **Create `page.tsx`** with activity component
3. **Update home page** (`src/app/page.tsx`) to add activity to grid
4. **Use provided hooks**:
   - `useMotionSafe()` for reduced-motion support
   - `useAudio()` for sound effects
   - `useLocalStorage()` for data persistence
5. **Test on mobile** (DevTools > Toggle device toolbar)

### Styling Guidelines

- **Color palette** (in `tailwind.config.ts`): calm-{50-900}, mint, lavender, sky
- **Soft shadows**: Use `.shadow-soft` or `.shadow-soft-lg`
- **Rounded corners**: Use `rounded-soft` (12px) or `rounded-lg` (16px)
- **Transitions**: 300ms for hover states, 500-800ms for animations
- **Focus states**: Always include focus-visible (auto-applied in globals.css)

### Audio Implementation

Audio files should be placed in `public/sounds/`:
- Use Howler.js via `useAudio()` hook
- Keep files ≤200KB (MP3 + AAC format)
- Volume: 0.3-0.5 (low and non-intrusive)
- Example: `play('/sounds/inhale.mp3', { volume: 0.3 })`

### State Management

**localStorage** for simple state:
```typescript
const [prefs, setPrefs] = useLocalStorage('key', initialValue);
```

**React Context** (planned for):
- Theme (light/dark)
- Audio preferences (mute, master volume)
- User settings

**Zustand** (if global complexity grows)

## Testing & QA

- **Build**: `npm run build`
- **Dev**: `npm run dev` (localhost:3000)
- **Lint**: `npm run lint`
- **Type check**: `npm run type-check`

## Accessibility Checklist

- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] Screen reader text (aria-labels, aria-describedby)
- [ ] Focus indicators (outline-2, sky-500)
- [ ] Motion-reduce CSS media query
- [ ] Color contrast (WCAG AA)
- [ ] Alt text for images
- [ ] Semantic HTML (button, input, form)

## Common Tasks

### Creating a Button
```tsx
<button className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors shadow-soft">
  Click me
</button>
```

### Adding Motion
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Playing Audio
```tsx
const { play } = useAudio();
// Later:
play('/sounds/success.mp3', { volume: 0.4 });
```

### Persisting Data
```tsx
const [data, setData] = useLocalStorage('key', defaultValue);
// setData updates both state and localStorage
```

## Next Steps (Priorities)

1. **Implement remaining 8 activities** (Clouds, Love Notes, Fireflies, Journal, Safe Zone, Hand, Mood, Worry Box)
2. **Add sound assets** to `public/sounds/`
3. **Build reusable components** (Modal, Card, Slider, etc.)
4. **Add PWA support** (service worker, offline)
5. **Implement analytics** (opt-in, privacy-first)
6. **Add testing** (Jest + React Testing Library)
7. **Deployment** (Vercel recommended)

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Howler.js](https://howlerjs.com/)
- [WCAG Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)

## Support & Contribution

For questions or suggestions, refer to the original CalmGames Requirements document for full specifications of each activity.

---

**Remember**: This app is for people in distress. Prioritize calm, clarity, and psychological safety in every decision.
