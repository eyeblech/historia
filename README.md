# HISTORIA — The Interactive 13.8-Billion-Year Historical Atlas

> **From the Big Bang & Ancient Civilizations to Philosophy, Great Revolutions & the Modern AI Age.**

**HISTORIA** is a fast, high-contrast, interactive web atlas that unifies **13.8 billion years of cosmic and human history** into one seamless experience. Explore epochal wars, philosophical awakenings, scientific breakthroughs, great revolutions, and cultural renaissances through an **Illustrated Atlas**, an **Interactive 3D Globe with Zoom & Physics**, a **Chronological Timeline**, and a **Side-by-Side Comparison Arena**.

---

## ✨ Key Features

1. **Illustrated Atlas (6 Grand Epochs & 27 Curated Milestones)**
   - **I. Cosmic Origins (13.8 BYA – 300k BCE):** The Big Bang Singularity, First Stars & Supernovae, Earth & Abiogenesis, Cambrian Explosion, and *Homo Sapiens* & the Cognitive Revolution.
   - **II. Ancient Civilizations (10,000 – 600 BCE):** The Neolithic Agricultural Revolution (Göbekli Tepe) and Sumerian Writing & Code of Hammurabi.
   - **III. Classical Antiquity (600 BCE – 500 CE):** The Eastern Axial Awakening (Buddha, Confucius, Laozi), Athenian Democracy (Socrates, Plato, Aristotle), Alexander the Great, Rise & Fall of Rome, and Qin-Han Silk Road.
   - **IV. Renaissance & Scientific Dawn (500 – 1750 CE):** The Islamic Golden Age (House of Wisdom), Genghis Khan & the Mongol World System, Gutenberg’s Printing Press, High Renaissance Art & Shakespeare, and the Scientific Revolution (Galileo & Newton).
   - **V. Age of Revolutions (1750 – 1914 CE):** The Enlightenment (Kant, Locke, Voltaire), the Industrial Revolution, the American & French Revolutions, the Symphonic Revolution (Bach, Mozart, Beethoven), the Napoleonic Wars, Darwin/Marx/Nietzsche, and Modernist Art (Hokusai, Van Gogh, Picasso).
   - **VI. Atomic, Space & AI Age (1914 – Present):** Einstein & Quantum Physics, the Birth of Cinema, the World Wars & Atomic Crucible, Global Sonic Culture, Alan Turing & the Internet, Apollo 11 & DNA, and the AI Revolution & Singularity Horizon.

2. **Interactive 3D Historical Globe (Zero Heavy WebGL RAM Overhead)**
   - Custom mathematical 3D spherical projection engine built on native HTML5 Canvas.
   - **Smooth Zoom (`70%` to `260%`)** via scroll wheel, double-click, or `+`/`-` buttons with adaptive latitude/longitude graticules.
   - **Inertial Momentum Physics** when dragging and spinning the Earth, plus glowing causal arcs connecting historical landmarks.

3. **Deep-Dive Reader & Causal Ripple Graph**
   - Click any entry to inspect its **Universal Impact Index (1–100)**, archival artwork/photography, historical synthesis, key metrics, numbered deep-dive insights, primary-source quotes, philosophical core, and **What Led To This / What This Inspired Later** causal links.

4. **Side-by-Side Synoptic Compare ("Mind-Duel")**
   - Place any two historical events, empires, philosophies, or scientific revolutions side-by-side to analyze their causal bridge, time separation, and philosophical cores.

---

## 🚀 How to Run Locally

### Prerequisites
- **Node.js** (v18+ recommended) and **npm**

### Installation & Development Server
```bash
# 1. Clone the repository
git clone https://github.com/eyeblech/historia.git
cd historia

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev
```
Then open **`http://localhost:5173`** in your browser.

### Production Build
```bash
npm run build
npm run preview
```
The optimized static production bundle is generated in the `dist/` folder.

---

## 🌍 How to Deploy on the Web (Free & Live in 60 Seconds)

Because **HISTORIA** compiles into a pure, self-contained static bundle (`dist/`), you can host it globally for **free** with zero backend maintenance:

### Option 1: Deploy on Vercel (Recommended — Fastest)
1. Go to [vercel.com](https://vercel.com) and sign in with your **GitHub** account.
2. Click **"Add New Project"** and import your `eyeblech/historia` repository.
3. Vercel will automatically detect **Vite**:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. In ~30 seconds, you will get a live `https://historia-...vercel.app` URL (and every future `git push` will update the site automatically).

### Option 2: Deploy on Netlify
1. Go to [netlify.com](https://www.netlify.com), click **"Add new site" → "Import an existing project"**, and select `eyeblech/historia` from GitHub.
2. Set **Build command** to `npm run build` and **Publish directory** to `dist`.
3. Click **Deploy site**.

### Option 3: Deploy on Cloudflare Pages
1. Open the [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select `eyeblech/historia`, set framework preset to **Vite** (`npm run build` / `dist`), and deploy on Cloudflare's global edge network.

---

## 📣 How to Promote HISTORIA so Thousands of People See It

Once your live URL is deployed, use this launch playbook to get strong organic traffic from history lovers, students, developers, and educators:

1. **Hacker News (`Show HN`)**
   - Submit a post titled:
     > `Show HN: Historia – An interactive 13.8B-year atlas from the Big Bang to the AI Age`
   - Hacker News readers love fast, information-dense, zero-bloat interactive visual atlases (especially with a custom 60fps Canvas 3D Globe). Post a brief comment explaining why you built it and how the causal links work.

2. **Reddit Communities (High-Engagement Subreddits)**
   - **r/InternetIsBeautiful** — Share the direct live link; this subreddit is dedicated to unique, interactive educational web apps.
   - **r/History** & **r/AskHistorians** (check weekly showcase threads) — Highlight the causal chains connecting ancient philosophy to modern revolutions.
   - **r/Philosophy** — Share how the app links the Axial Age (Buddha, Socrates, Confucius) to Kant, Nietzsche, and the AI era.
   - **r/webdev** & **r/reactjs** — Share a short screen recording on "Showoff Saturday" showing the 3D Globe zoom/momentum and editorial UI.

3. **Short-Form Video (TikTok, Instagram Reels, YouTube Shorts, X/Twitter)**
   - Record a **20-second screen capture** zooming into the 3D Globe from Athens to Baghdad to the French Revolution, then clicking into the "Causes & Ripples" tab.
   - Hook idea: *"I built a website that maps every major revolution, philosophy, war, and invention across 13.8 billion years..."*

4. **Product Hunt & Dev Hunt Launch**
   - Launch on [Product Hunt](https://www.producthunt.com) under the **Education**, **History**, and **Design Tools** topics with 3–4 crisp screenshots of the Illustrated Atlas, the 3D Interactive Globe, and the Compare modal.

5. **GitHub Topics & Social Preview**
   - On your GitHub repo page (`https://github.com/eyeblech/historia`), click the ⚙️ gear icon next to **About**, add your live deployed URL, and add topics like:
     `history` `interactive-atlas` `3d-globe` `philosophy` `timeline` `big-history` `education` `react` `typescript` `vite`.
   - Upload a screenshot of the app in **Settings → General → Social Preview** so links shared on X, Discord, and Reddit display a rich preview card.
