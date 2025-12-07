# 🧘 CalmGames — Your Personal Sanctuary for Mental Wellness

> **Made with care for your wellbeing by Ronit Goswami**

A thoughtfully designed web application providing **10 calming games and activities** to help you manage anxiety, stress, and panic through evidence-based techniques. Built with accessibility and anxiety-first design principles.

---

## 🌟 Vision & Philosophy

CalmGames is built on a simple belief: **When anxiety knocks on your door, you should have immediate, compassionate, judgment-free tools to find moments of calm.**

This app doesn't ask you to "fix" yourself or measure progress. Instead, it offers gentle activities that work *with* your nervous system rather than against it. Each game is designed with the understanding that people in distress need:

- ✨ **Minimal cognitive load** — No complex interactions or time pressure
- 💙 **Emotional validation** — Constant reassurance that what you're feeling is okay
- 🌬️ **Breathing support** — Grounding techniques based on clinical practices
- 📝 **Expression tools** — Ways to externalize worries and fears
- 🤝 **Connection** — Knowing someone cares about your wellbeing

---

## 🎮 The 10 Calm Games

### 1. **Breathe With Me** 💨
**Vision:** Panic starts in the breath. If we can regulate breathing, we can soothe the nervous system.

*How it works:* A gentle, animated bubble expands and contracts in rhythm with your breath. You control the pace—inhale for 4 seconds, hold for 4, exhale for 6. Background music plays softly. With each session, a counter tracks how many times you've reached for calm.

**Validation throughout:** 
- Session counter celebrates every time you use this
- Customizable durations (for different anxiety levels)
- Clear, reassuring instructions
- Emphasis that there's no "right" way to breathe

---

### 2. **Mind Garden** 🌸
**Vision:** Negative thoughts are like weeds—they grow without invitation. But we can transform them into flowers.

*How it works:* You plant your worries as weeds on a canvas, then "tend" your garden by clicking weeds to transform them into flowers. Over time, your garden transforms from overgrown to beautiful. Your garden is saved forever (localStorage), so you can watch your growth.

**Validation throughout:**
- Visual transformation from weed to flower (reframing in action)
- Stats show flower count vs. weed count (progress tracking)
- Can edit/delete entries anytime (you're in control)
- Garden persists across sessions (your effort matters)

---

### 3. **Cloud Thoughts** ☁️
**Vision:** Some thoughts we hold close; others we let go. This teaches emotional triage without judgment.

*How it works:* Thoughts appear as clouds. Drag them left to "Keep Close" (things you want to remember) or right to "Let Go" (things that don't serve you). The clouds float away as you release them, with gentle animations showing things leaving your mind.

**Validation throughout:**
- No judgment about which thoughts are "right" to keep
- Visual metaphor of releasing (literal floating away)
- Calming drag-and-drop interaction
- Works offline, no data collection

---

### 4. **Love Notes** 💌
**Vision:** When depression lies to us, we need external reminders of truth. This is your personal affirmation collection.

*How it works:* Write or save personalized reassurance messages ("I've survived every hard day before this one"). Each note appears as a card that flips over when clicked, revealing encouraging words. You're building a bank of hope.

**Validation throughout:**
- Your own words matter (user-generated affirmations)
- Can add unlimited notes (no gatekeeping)
- 3D flip animation makes reveal feel special
- Access to your hope bank anytime

---

### 5. **Focus Fireflies** ✨
**Vision:** When anxiety scatters our attention, gentle focus exercises help us stay present.

*How it works:* Fireflies (glowing dots) appear randomly on screen. Click them to keep focus sharp. It's a meditation disguised as a game—simple, non-judgmental, with soothing visuals and sound effects.

**Validation throughout:**
- No scoring/competition (removing performance anxiety)
- Visual feedback for each interaction (satisfying clicks)
- Soothing color palette and animations
- Improves concentration gradually

---

### 6. **Journal Carousel** 📝
**Vision:** Journaling is evidence-based for anxiety. But blank pages are scary. This provides guided structure.

*How it works:* Each time you open it, you get a randomized prompt: "What are you grateful for?" or "What did you survive today?" You write in a textarea, and your responses are saved. History shows past entries for reflection.

**Validation throughout:**
- Prompts provide structure (reducing decision paralysis)
- Entries are saved automatically (your thoughts matter)
- Can revisit history anytime (seeing growth over time)
- Randomization means fresh perspective each visit

---

### 7. **Anxiety Safe Zone** 🏠
**Vision:** When everything feels threatening, you need one safe place. This is a mini-escape room of calm.

*How it works:* A cozy room appears on screen. You can drag objects (books, plants, comfort items) into a "safe corner" to build your haven. Customizing your space gives a sense of control during chaos.

**Validation throughout:**
- You control the environment (agency is therapeutic)
- Visual coziness and warmth
- Objects stay where you place them (effort persists)
- Sense of creating something safe

---

### 8. **Hold My Hand** 🤝
**Vision:** Sometimes anxiety means you need to know *someone cares right now*. This button is immediate, always-available reassurance.

*How it works:* You click the emoji, and you get:
- **6 random emojis** (🤝 🫂 💜 🤲 👐 ✨) to represent different types of support
- **16 supportive messages** like "I see you. You're doing better than you think"
- **12 validation messages** in popups confirming your feelings are real
- **Session counter** tracking how many times you reached out
- **Particle effects & glow animations** to make the moment feel special
- **Personalized crisis section** with your helper's name and 24/7 availability

**Validation throughout:**
- Reaches out to **Ronit Goswami** for 24/7 personal support
- Every click is celebrated, not judged
- Different messages each time (combats "they're tired of me")
- Visible session count (you matter enough to track)
- Instruction text explains you can click anytime

---

### 9. **Color My Mood** 🎨
**Vision:** Moods are data. This helps you identify and track emotional patterns without diagnosis.

*How it works:* Select your mood from a color palette (red for angry, blue for sad, green for calm, etc.). The app logs it with timestamp. You see a mood timeline and suggestions tailored to each mood state.

**Validation throughout:**
- Moods shift constantly (no "stuck" narrative)
- Suggestions are compassionate, not prescriptive
- Visual timeline shows patterns (hope in seeing data)
- No judgment about "good" or "bad" moods

---

### 10. **Worry Box** 📦
**Vision:** Externalizing fears makes them less scary. Write them down, seal them away, and regain peace.

*How it works:* Type your worry into a box, "seal" it (with a lock animation and particle burst). The worry is stored but contained. Over time, you can revisit old worries and see how many you survived.

**Validation throughout:**
- Worry is acknowledged (not minimized as "just think positive")
- Sealed worries have visual finality
- Particle effects make containment feel powerful
- Historical worries show resilience ("you got through these")

---

## 🏗️ Technical Architecture

### Tech Stack
- **Framework:** Next.js 14.2.33 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom calm color palette
- **Animations:** Framer Motion
- **Audio:** Howler.js
- **State Management:** React Hooks + localStorage
- **Deployment:** Vercel (recommended)

### Key Design Decisions

**Mobile-First Fullscreen Layout**
```tsx
// Every game uses fixed inset-0 for immersive fullscreen
className="fixed inset-0 w-full h-full overflow-y-auto"
```

**Soft, Slow Animations** (300-800ms transitions)
- Nothing jarring or startling
- Duration varies: 300ms for micro-interactions, 500-800ms for transitions
- Uses ease-in-out for natural feel

**Accessibility Built-In**
- `prefers-reduced-motion` CSS media query
- Focus indicators on all interactive elements
- Semantic HTML (button, input, form)
- ARIA labels for screen readers

**Privacy-First**
- All data lives in localStorage (no backend needed)
- No tracking, analytics, or external calls
- Works offline
- User controls their data

### Color Palette
```css
/* Calm, soothing colors designed for anxiety reduction */
- Sky: #0ea5e9 (peaceful, open)
- Cyan: #06b6d4 (cool, refreshing)
- Teal: #14b8a6 (grounded, natural)
- Emerald: #10b981 (growth, renewal)
- Lavender: #c4b5fd (gentle, dreamy)
- Pink: #f472b6 (compassionate, soft)
```

---

## 📋 File Structure

```
calmgames/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with metadata
│   │   ├── page.tsx                # Home page with all activities + motivational content
│   │   ├── globals.css             # Global styles, Tailwind config
│   │   └── activities/
│   │       ├── [slug]/page.tsx     # Placeholder for unimplemented games
│   │       ├── breathe/page.tsx    # Breathe With Me
│   │       ├── garden/page.tsx     # Mind Garden
│   │       ├── clouds/page.tsx     # Cloud Thoughts
│   │       ├── love-notes/page.tsx # Love Notes
│   │       ├── fireflies/page.tsx  # Focus Fireflies
│   │       ├── journal/page.tsx    # Journal Carousel
│   │       ├── safe-zone/page.tsx  # Anxiety Safe Zone
│   │       ├── hand/page.tsx       # Hold My Hand
│   │       ├── mood/page.tsx       # Color My Mood
│   │       └── worry-box/page.tsx  # Worry Box
│   ├── hooks/
│   │   ├── index.ts                # Hook exports
│   │   ├── useMotionSafe.ts        # Respects prefers-reduced-motion
│   │   ├── useAudio.ts             # Howler.js wrapper for sounds
│   │   └── useLocalStorage.ts      # Persistent state hook
│   ├── components/                 # Reusable components (TBD)
│   └── lib/                        # Utility functions (TBD)
├── public/
│   ├── sounds/                     # Audio files (MP3/AAC, ≤200KB)
│   └── manifest.json               # PWA manifest
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** (recommended 20.x)
- **npm 9+** or **yarn 3+**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/ronitg57/calmgames.git
cd calmgames

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# → http://localhost:3000
```

### Available Scripts

```bash
# Development (with hot reload)
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

---

## 🎨 Customization

### Changing the Color Palette

Edit `tailwind.config.ts`:
```typescript
theme: {
  colors: {
    calm: {
      50: '#f8fafc',
      100: '#f1f5f9',
      600: '#475569',
      900: '#0f172a',
    },
    sky: { /* ... */ },
    lavender: { /* ... */ },
  }
}
```

### Adding Sounds

1. Export audio as **MP3 + AAC** (≤200KB each)
2. Place in `public/sounds/`
3. Use in game:
```typescript
const { play } = useAudio();
play('/sounds/success.mp3', { volume: 0.4 });
```

### Adding a New Game

1. Create `src/app/activities/[game-name]/page.tsx`
2. Use the fullscreen layout pattern:
```typescript
export default function GamePage() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-y-auto bg-gradient-to-br from-sky-50 to-cyan-50 p-4">
      {/* Your game here */}
    </div>
  );
}
```
3. Update `src/app/page.tsx` activities array

---

## 💙 Contributing

This app is created with care for people in distress. If you want to contribute:

1. **Maintain the anxiety-first design** — No complex UI, no time pressure, no scoring anxiety
2. **Validate constantly** — Remind users their feelings are valid
3. **Preserve privacy** — Keep data local, no tracking
4. **Test on mobile** — DevTools → Toggle device toolbar

### Ideas for Contribution
- Add more games (Sand Mandala, Gratitude Journal, etc.)
- Improve existing activities with better animations
- Translate to other languages
- Add PWA/offline support
- Create alternative difficulty levels
- Improve accessibility
- Add ambient sounds/music

---

## 📖 Inspiration & Resources

Games designed with clinical psychology principles:

- **Breathe With Me**: Box breathing (4-4-6 pattern) from anxiety therapy
- **Mind Garden**: Cognitive reframing technique from CBT
- **Cloud Thoughts**: Acceptance and Commitment Therapy (ACT)
- **Love Notes**: Positive psychology affirmations
- **Focus Fireflies**: Mindfulness and attention training
- **Journal Carousel**: Reflective journaling from DBT
- **Safe Zone**: Grounding in trauma therapy
- **Hold My Hand**: Immediate crisis support (always have a person too)
- **Color My Mood**: Mood tracking and emotional awareness
- **Worry Box**: Worry externalization from cognitive therapy

**Further Reading:**
- [The Body Keeps the Score by Bessel van der Kolk](https://www.besselvanderkolk.com/book) — Trauma and healing
- [Feeling Good by David D. Burns](https://www.davidhburn.com/) — CBT and mood
- [The Anxiety and Phobia Workbook by Edmund J. Bourne](https://www.newharbinger.com/) — Practical techniques

---

## 🆘 Crisis Support

**CalmGames is a tool, not a replacement for professional help.**

If you're in crisis:
- **Reach out to Ronit Goswami** — Your helper is available 24/7 (Hold My Hand feature)
- **Contact a crisis helpline:**
  - 🇺🇸 National Suicide Prevention Lifeline: 988
  - 🇬🇧 Samaritans: 116 123
  - 🇮🇳 AASRA: 9820 466 726
  - **Find helplines by country:** [findahelpline.com](https://www.findahelpline.com/)
- **Talk to a trusted person** — Call a friend, family member, or therapist
- **Go to an emergency room** if you're in immediate danger

---

## 📄 License

MIT License — See LICENSE file for details

---

## 🙏 Acknowledgments

- **Inspiration:** People who struggle with anxiety and courage to seek calm
- **Design:** Anxiety-first, accessibility-first principles
- **Tech:** Next.js, Framer Motion, Tailwind CSS communities
- **Clinical Input:** Based on evidence-based therapy techniques (CBT, DBT, ACT, somatic therapy)

---

## 📮 Feedback & Support

Found a bug? Have an idea? Want to contribute?

- **Issues:** [GitHub Issues](https://github.com/ronitg57/calmgames/issues)
- **Discussions:** [GitHub Discussions](https://github.com/ronitg57/calmgames/discussions)
- **Email:** [Your Email]

---

<div align="center">

**Remember:** You are not broken. You are not alone. You are worthy of calm.

Made with 💙 to help you find moments of peace.

**CalmGames © 2025 | A sanctuary for mental wellness**

</div>