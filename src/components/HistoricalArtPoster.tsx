import React from 'react';
import { CATEGORIES, type HistoricalNode } from '../data/historyData';

interface HistoricalArtPosterProps {
  node: HistoricalNode;
  variant?: 'card' | 'hero' | 'mini';
}

// Curated Public-Domain Museum Paintings & Archival Photographs (Wikimedia Commons Thumbnails)
export const HISTORICAL_IMAGES: Record<
  string,
  { url: string; caption: string; artistOrSource: string }
> = {
  'big-bang': {
    url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=80',
    caption: 'Deep Space Nebula & Primordial Expansion',
    artistOrSource: 'NASA / Hubble Deep Field Archive',
  },
  'first-stars': {
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=900&q=80',
    caption: 'Stellar Nurseries & Supernova Forges in the Cosmos',
    artistOrSource: 'Deep Space Astrophysical Observatory',
  },
  'earth-formation': {
    url: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=900&q=80',
    caption: 'The Blue Marble — Planetary Oceans & Biosphere',
    artistOrSource: 'Apollo Planetary Archive',
  },
  'cambrian-explosion': {
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80',
    caption: 'Primordial Oceans — Cradle of Multicellular Life',
    artistOrSource: 'Natural History Paleobiology Collection',
  },
  'cognitive-revolution': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lascaux_painting.jpg/800px-Lascaux_painting.jpg',
    caption: 'Lascaux Cave Paintings — Dawn of Symbolic Mind (c. 17,000 BCE)',
    artistOrSource: 'Paleolithic Cave Art, Dordogne, France',
  },
  'neolithic-revolution': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/G%C3%B6bekli_Tepe%2C_Urfa.jpg/800px-G%C3%B6bekli_Tepe%2C_Urfa.jpg',
    caption: 'Göbekli Tepe Sanctuary & The Dawn of Settled Civilization',
    artistOrSource: 'Anatolian Archaeological Archive (c. 9600 BCE)',
  },
  'mesopotamia-writing': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/P1050763_Louvre_code_Hammurabi_face_rwk.JPG/600px-P1050763_Louvre_code_Hammurabi_face_rwk.JPG',
    caption: 'Stele of the Code of Hammurabi & Cuneiform Law',
    artistOrSource: 'Louvre Museum, Paris (c. 1750 BCE)',
  },
  'eastern-philosophy': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Kamakura_Budda_Daibutsu_front_1885.jpg/800px-Kamakura_Budda_Daibutsu_front_1885.jpg',
    caption: 'The Great Bronze Buddha & The Axial Awakening of Asia',
    artistOrSource: 'Classical Buddhist & Confucian Heritage',
  },
  'athens-socrates': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/900px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
    caption: 'The School of Athens — Plato, Aristotle & Socrates',
    artistOrSource: 'Raphael (1511), Apostolic Palace, Vatican',
  },
  'alexander-hellenistic': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Alexander_the_Great_mosaic.jpg/800px-Alexander_the_Great_mosaic.jpg',
    caption: 'Alexander the Great in Battle at Issus',
    artistOrSource: 'House of the Faun Mosaic, Pompeii (c. 100 BCE)',
  },
  'roman-republic-empire': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg/900px-Colosseum_in_Rome-April_2007-1-_copie_2B.jpg',
    caption: 'The Flavian Amphitheatre & Imperial Rome at its Zenith',
    artistOrSource: 'Classical Roman Architecture, Rome',
  },
  'qin-han-silk-road': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Terracotta_Army%2C_View_of_Pit_1.jpg/900px-Terracotta_Army%2C_View_of_Pit_1.jpg',
    caption: 'The Terracotta Army of First Emperor Qin Shi Huang',
    artistOrSource: 'Xi’an Imperial Mausoleum (210 BCE)',
  },
  'islamic-golden-age': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Yahya_ibn_Mahmud_al-Wasiti_-_Maqamat_al-Hariri_-_Biblioth%C3%A8que_nationale_de_France%2C_Arabe_5847%2C_fol._5v.jpg/800px-Yahya_ibn_Mahmud_al-Wasiti_-_Maqamat_al-Hariri_-_Biblioth%C3%A8que_nationale_de_France%2C_Arabe_5847%2C_fol._5v.jpg',
    caption: 'Scholars at an Abbasid Library in Baghdad (House of Wisdom)',
    artistOrSource: 'Yahya ibn Mahmud al-Wasiti (1237 CE), BnF Paris',
  },
  'mongol-empire': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/YuanEmperorAlbumGenghisPortrait.jpg/600px-YuanEmperorAlbumGenghisPortrait.jpg',
    caption: 'Imperial Portrait of Genghis Khan (Temüjin)',
    artistOrSource: 'National Palace Museum, Taipei (Yuan Dynasty)',
  },
  'printing-press': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg/700px-Da_Vinci_Vitruve_Luc_Viatour.jpg',
    caption: 'The Vitruvian Man — Renaissance Humanism & Proportion',
    artistOrSource: 'Leonardo da Vinci (c. 1490), Gallerie dell’Accademia',
  },
  'scientific-revolution': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/GodfreyKneller-IsaacNewton-1689.jpg/700px-GodfreyKneller-IsaacNewton-1689.jpg',
    caption: 'Sir Isaac Newton, Author of Principia Mathematica',
    artistOrSource: 'Portrait by Godfrey Kneller (1689)',
  },
  'enlightenment-kant': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Atelier_de_Nicolas_de_Largilli%C3%A8re%2C_portrait_de_Voltaire%2C_d%C3%A9tail_%28mus%C3%A9e_Carnavalet%29_-002.jpg/700px-Atelier_de_Nicolas_de_Largilli%C3%A8re%2C_portrait_de_Voltaire%2C_d%C3%A9tail_%28mus%C3%A9e_Carnavalet%29_-002.jpg',
    caption: 'Age of Reason & The European Enlightenment',
    artistOrSource: 'Musée Carnavalet, Paris (18th Century)',
  },
  'industrial-revolution': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Hartmann_Maschinenhalle_1868_%2801%29.jpg/900px-Hartmann_Maschinenhalle_1868_%2801%29.jpg',
    caption: 'The Great Steam Locomotive Foundry of the Industrial Age',
    artistOrSource: '19th-Century Industrial Engraving (1868)',
  },
  'french-revolution': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Anonymous_-_Prise_de_la_Bastille.jpg/900px-Anonymous_-_Prise_de_la_Bastille.jpg',
    caption: 'The Storming of the Bastille (July 14, 1789)',
    artistOrSource: 'Jean-Pierre Houël (1789), Bibliothèque Nationale',
  },
  'napoleonic-wars': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/David_-_Napoleon_crossing_the_Alps_-_Malmaison2.jpg/700px-David_-_Napoleon_crossing_the_Alps_-_Malmaison2.jpg',
    caption: 'Napoleon Crossing the Alps at the Saint-Bernard Pass',
    artistOrSource: 'Jacques-Louis David (1801), Château de Malmaison',
  },
  'evolution-darwin': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Charles_Darwin_seated_crop.jpg/700px-Charles_Darwin_seated_crop.jpg',
    caption: 'Charles Darwin & The Evolutionary Tree of Life',
    artistOrSource: '19th-Century Archival Portrait (c. 1878)',
  },
  'quantum-relativity': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Solvay_conference_1927.jpg/900px-Solvay_conference_1927.jpg',
    caption: 'The 1927 Solvay Conference — Einstein, Curie, Bohr, Planck & Heisenberg',
    artistOrSource: 'Benjamin Couprie (1927), International Solvay Institutes',
  },
  'world-wars-atomic': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/900px-Into_the_Jaws_of_Death_23-0455M_edit.jpg',
    caption: 'D-Day Normandy Landings — The Crucible of the Second World War',
    artistOrSource: 'Robert F. Sargent (June 6, 1944), U.S. National Archives',
  },
  'turing-internet': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/600px-Alan_Turing_Aged_16.jpg',
    caption: 'Alan Turing — Architect of Universal Computation & AI',
    artistOrSource: 'British Computing & Bletchley Park Archive',
  },
  'apollo-space': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/800px-Aldrin_Apollo_11_original.jpg',
    caption: 'Apollo 11 on the Sea of Tranquility (July 20, 1969)',
    artistOrSource: 'Neil Armstrong / NASA Apollo Archive',
  },
  'renaissance-high-art': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/900px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
    caption: 'The Creation of Adam — Sistine Chapel Ceiling',
    artistOrSource: 'Michelangelo Buonarroti (c. 1512), Vatican',
  },
  'classical-symphony': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Beethoven.jpg/700px-Beethoven.jpg',
    caption: 'Ludwig van Beethoven Composing the Missa Solemnis & Ninth Symphony',
    artistOrSource: 'Joseph Karl Stieler (1820), Beethoven-Haus',
  },
  'modern-art-movements': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/900px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    caption: 'The Starry Night (1889) & The Modernist Aesthetic Revolution',
    artistOrSource: 'Vincent van Gogh (1889), Museum of Modern Art',
  },
  'cinema-age': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Le_Voyage_dans_la_lune.jpg/800px-Le_Voyage_dans_la_lune.jpg',
    caption: 'Le Voyage dans la Lune (A Trip to the Moon) & The Seventh Art',
    artistOrSource: 'Georges Méliès (1902), Early Cinema Archive',
  },
  'global-music-wave': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Louis_Armstrong_restored.jpg/800px-Louis_Armstrong_restored.jpg',
    caption: 'Louis Armstrong & The Global Sonic Wave of Jazz, Rock & Rhythm',
    artistOrSource: 'World Music & Sound Archive (20th Century)',
  },
  'ai-singularity': {
    url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80',
    caption: 'Planetary Neural Compute & The Synthetic Intelligence Horizon',
    artistOrSource: '21st-Century Frontier Compute Atlas',
  },
};

// Bespoke Vector Emblem Overlay that always renders crisp & instant (even offline)
function renderPosterVectorMotif(nodeId: string, color: string) {
  switch (nodeId) {
    case 'big-bang':
    case 'first-stars':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-40">
          <circle cx="100" cy="100" r="75" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="45" fill="none" stroke={color} strokeWidth="1.5" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + Math.cos(angle) * 90}
                y2={100 + Math.sin(angle) * 90}
                stroke={color}
                strokeWidth="1"
              />
            );
          })}
        </svg>
      );
    case 'athens-socrates':
    case 'roman-republic-empire':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-35">
          <polygon points="100,25 30,65 170,65" fill="none" stroke={color} strokeWidth="2" />
          <line x1="45" y1="65" x2="45" y2="165" stroke={color} strokeWidth="4" />
          <line x1="82" y1="65" x2="82" y2="165" stroke={color} strokeWidth="4" />
          <line x1="118" y1="65" x2="118" y2="165" stroke={color} strokeWidth="4" />
          <line x1="155" y1="65" x2="155" y2="165" stroke={color} strokeWidth="4" />
          <line x1="25" y1="165" x2="175" y2="165" stroke={color} strokeWidth="3" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-30">
          <circle cx="100" cy="100" r="68" fill="none" stroke={color} strokeWidth="1.2" />
          <polygon points="100,32 158,135 42,135" fill="none" stroke={color} strokeWidth="1.2" />
          <polygon points="100,168 158,65 42,65" fill="none" stroke={color} strokeWidth="1.2" />
        </svg>
      );
  }
}

export const HistoricalArtPoster: React.FC<HistoricalArtPosterProps> = ({
  node,
  variant = 'card',
}) => {
  const cat = CATEGORIES[node.category];
  const imgData = HISTORICAL_IMAGES[node.id];

  const heightClass =
    variant === 'hero'
      ? 'h-72 sm:h-80'
      : variant === 'mini'
        ? 'h-36'
        : 'h-56';

  return (
    <div
      className={`relative w-full ${heightClass} overflow-hidden rounded-t-2xl bg-slate-950 select-none group`}
    >
      {/* 1. Underlying Vector Sacred Geometry & Color Gradient Fallback */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${cat.color}33 0%, #090d18 75%, #05070e 100%)`,
        }}
      >
        <div className="w-48 h-48">{renderPosterVectorMotif(node.id, cat.color)}</div>
      </div>

      {/* 2. High-Resolution Archival / Museum Painting Image */}
      {imgData && (
        <img
          src={imgData.url}
          alt={imgData.caption}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-700 ease-out"
          onError={(e) => {
            // Gracefully hide broken image so bespoke SVG poster background shines through
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      )}

      {/* 3. Museum Poster Frame Border & Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-[#090d18]/35 to-transparent" />
      <div
        className="absolute inset-2.5 rounded-xl border pointer-events-none transition-opacity duration-300 opacity-55 group-hover:opacity-90"
        style={{ borderColor: `${cat.color}55` }}
      />

      {/* 4. Top Poster Edition Stamp & Date */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
        <span
          className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md border shadow-sm ${cat.bgBadge}`}
        >
          {cat.shortLabel}
        </span>
        <span className="font-mono-code text-[11px] font-semibold text-amber-200 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-amber-400/30">
          {node.dateDisplay}
        </span>
      </div>

      {/* 5. Bottom Archival Caption Strip */}
      {imgData && variant !== 'mini' && (
        <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[10px] text-slate-300/90 z-10">
          <span className="truncate italic">{imgData.caption}</span>
          <span className="font-mono-code text-[9px] text-amber-300/80 shrink-0 ml-2 uppercase tracking-wider">
            Impact {node.impactScore}/100
          </span>
        </div>
      )}
    </div>
  );
};
