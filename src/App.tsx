import React, { useState, useMemo } from 'react';
import {
  Search,
  Scale,
  Sparkles,
  BookOpen,
  Globe2,
  LayoutGrid,
  Compass,
  MapPin,
  ArrowUpRight,
  GitBranch,
  Users,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  CATEGORIES,
  ERAS,
  HISTORICAL_NODES,
  type CategoryId,
  type EraId,
  type HistoricalNode,
} from './data/historyData';
import { HistoricalArtPoster } from './components/HistoricalArtPoster';
import { ChronicleInspector } from './components/ChronicleInspector';
import { MindDuelModal } from './components/MindDuelModal';
import { EnchantedGlobe3D } from './components/EnchantedGlobe3D';
import { soundEngine } from './utils/soundEngine';

type LayoutMode = 'chronicles' | 'globe' | 'timeline';

export function App() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('chronicles');
  const [selectedEra, setSelectedEra] = useState<EraId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<HistoricalNode | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Side-by-Side Comparison Modal state
  const [compareState, setCompareState] = useState<{
    isOpen: boolean;
    left: HistoricalNode;
    right: HistoricalNode;
  }>({
    isOpen: false,
    left: HISTORICAL_NODES[8], // Athenian Democracy & Socrates
    right: HISTORICAL_NODES[19], // French Revolution
  });

  // Active categories set for the 3D Globe view
  const activeCategoriesSet = useMemo(() => {
    if (selectedCategory === 'all') {
      return new Set<CategoryId>([
        'cosmic',
        'civilization',
        'philosophy',
        'war',
        'science',
        'culture',
        'person',
      ]);
    }
    return new Set<CategoryId>([selectedCategory]);
  }, [selectedCategory]);

  // Filtered nodes based on Era, Category, and Search Query
  const filteredNodes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return HISTORICAL_NODES.filter((node) => {
      if (selectedEra !== 'all' && node.era !== selectedEra) return false;
      if (selectedCategory !== 'all' && node.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        node.title.toLowerCase().includes(q) ||
        node.subtitle.toLowerCase().includes(q) ||
        node.summary.toLowerCase().includes(q) ||
        node.dateDisplay.toLowerCase().includes(q) ||
        node.keyFigures.some((f) => f.name.toLowerCase().includes(q)) ||
        (node.coordinates?.locationName.toLowerCase().includes(q) ?? false)
      );
    });
  }, [selectedEra, selectedCategory, searchQuery]);

  // Subtle 3D Card Tilt handler
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  const openNode = (node: HistoricalNode) => {
    soundEngine.playNodeSelect(node.impactScore);
    setSelectedNode(node);
  };

  return (
    <div className="min-h-screen bg-[#080b12] text-slate-100 flex flex-col">
      {/* 1. Clean Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#080b12]/95 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 flex-wrap">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-center shadow-sm">
              <Compass className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-serif-title text-lg sm:text-xl font-bold tracking-wider text-slate-100">
                  HISTORIA
                </h1>
                <span className="text-[11px] font-mono-code px-2.5 py-0.5 rounded-md bg-slate-900 text-amber-300 border border-slate-700">
                  13.8B Years
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                From the Big Bang & Ancient Civilizations to Philosophy, Great Revolutions & the Modern AI Age
              </p>
            </div>
          </div>

          {/* Center View Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setLayoutMode('chronicles')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                layoutMode === 'chronicles'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Illustrated Atlas</span>
            </button>

            <button
              onClick={() => setLayoutMode('globe')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                layoutMode === 'globe'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>3D Interactive Globe</span>
            </button>

            <button
              onClick={() => setLayoutMode('timeline')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                layoutMode === 'timeline'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Chronological Timeline</span>
            </button>
          </div>

          {/* Right Search, Compare & Audio */}
          <div className="flex items-center gap-2.5 flex-1 sm:flex-initial justify-end">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Socrates, Rome, Einstein, AI..."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={() =>
                setCompareState((prev) => ({
                  ...prev,
                  isOpen: true,
                }))
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition cursor-pointer shrink-0"
            >
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Compare</span>
            </button>

            <button
              onClick={() => {
                const muted = soundEngine.toggleMute();
                setIsMuted(muted);
              }}
              title={isMuted ? 'Enable Ambient Sound' : 'Mute Sound'}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                !isMuted
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Spacious, No-Scrollbar Epoch Cards & Discipline Filter */}
      <section className="bg-[#0b0f19] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-3.5">
          {/* 6 Epoch Cards Grid (Plus 'All History' Reset) */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Select Historical Epoch
            </span>
            {selectedEra !== 'all' && (
              <button
                onClick={() => setSelectedEra('all')}
                className="text-xs font-semibold text-amber-400 hover:underline cursor-pointer"
              >
                Show All 6 Epochs ({HISTORICAL_NODES.length} Milestones)
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {ERAS.map((era) => {
              const isSelected = selectedEra === era.id;
              const count = HISTORICAL_NODES.filter((n) => n.era === era.id).length;
              return (
                <button
                  key={era.id}
                  onClick={() => setSelectedEra(isSelected ? 'all' : era.id)}
                  className={`text-left p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-800/95 border-amber-400 shadow-md'
                      : 'bg-slate-900/70 border-slate-800/90 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-mono-code text-[10px] text-amber-300/90 font-medium">
                      {era.timeSpan}
                    </span>
                    <span className="text-[10px] font-mono-code text-slate-400">
                      {count}
                    </span>
                  </div>
                  <div className="font-serif-title text-xs sm:text-sm font-bold text-slate-100 leading-snug">
                    {era.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {era.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Wrapped Topic Filter Pills (No Horizontal Scrollbar) */}
          <div className="flex items-center flex-wrap gap-2 pt-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">
              Discipline:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              All ({HISTORICAL_NODES.length})
            </button>
            {(Object.keys(CATEGORIES) as CategoryId[]).map((catId) => {
              const cat = CATEGORIES[catId];
              const isSelected = selectedCategory === catId;
              return (
                <button
                  key={catId}
                  onClick={() =>
                    setSelectedCategory(isSelected ? 'all' : catId)
                  }
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-slate-800 text-white border-amber-400/70'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-800'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span>{cat.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Main Content Area */}
      <main className="relative z-10 flex-1 pb-16">
        {layoutMode === 'globe' ? (
          <EnchantedGlobe3D
            activeCategories={activeCategoriesSet}
            selectedNode={selectedNode}
            onSelectNode={openNode}
          />
        ) : layoutMode === 'chronicles' ? (
          /* ILLUSTRATED ATLAS MODE (High-Contrast Editorial Cards) */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-14">
            {ERAS.map((era) => {
              const eraNodes = filteredNodes.filter((n) => n.era === era.id);
              if (eraNodes.length === 0) return null;

              return (
                <section key={era.id} className="space-y-6">
                  {/* Epoch Section Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: era.color }}
                        />
                        <span className="font-mono-code text-xs uppercase tracking-widest text-amber-300">
                          {era.timeSpan}
                        </span>
                      </div>
                      <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
                        {era.title} —{' '}
                        <span className="text-slate-400 font-normal">
                          {era.subtitle}
                        </span>
                      </h2>
                    </div>
                    <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                      {era.description}
                    </p>
                  </div>

                  {/* Editorial Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eraNodes.map((node) => {
                      const cat = CATEGORIES[node.category];
                      return (
                        <article
                          key={node.id}
                          onMouseMove={handleCardMouseMove}
                          onMouseLeave={handleCardMouseLeave}
                          onClick={() => openNode(node)}
                          className="poster-card-3d rounded-2xl bg-[#0d121f] border border-slate-800/90 hover:border-slate-600 shadow-lg flex flex-col justify-between overflow-hidden cursor-pointer group"
                        >
                          <div>
                            {/* Archival Painting / Photograph */}
                            <HistoricalArtPoster node={node} variant="card" />

                            {/* Readable Editorial Body */}
                            <div className="p-5 space-y-3.5">
                              {node.coordinates && (
                                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                  <MapPin className="w-3.5 h-3.5 text-amber-400/90 shrink-0" />
                                  <span className="truncate">
                                    {node.coordinates.locationName}
                                  </span>
                                </div>
                              )}

                              <div>
                                <h3 className="font-serif-title text-lg font-bold text-slate-100 group-hover:text-amber-300 transition leading-snug">
                                  {node.title}
                                </h3>
                                <p className="text-xs text-slate-400 mt-1 font-medium">
                                  {node.subtitle}
                                </p>
                              </div>

                              <p className="text-sm text-slate-200 leading-relaxed">
                                {node.summary}
                              </p>

                              {/* Primary Quote Preview */}
                              {node.quote && (
                                <div className="bg-slate-900/90 border-l-2 border-amber-500/60 pl-3.5 py-2 text-xs italic text-slate-300">
                                  “{node.quote.text}” —{' '}
                                  <span className="not-italic font-semibold text-slate-200">
                                    {node.quote.author}
                                  </span>
                                </div>
                              )}

                              {/* Key People Pills */}
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {node.keyFigures.slice(0, 2).map((fig, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-slate-200"
                                  >
                                    <Users className="w-3 h-3 text-amber-400" />
                                    {fig.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Card Footer */}
                          <div className="px-5 py-3.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs">
                            <span className="text-slate-400 flex items-center gap-1.5">
                              <GitBranch
                                className="w-3.5 h-3.5"
                                style={{ color: cat.color }}
                              />
                              <span>
                                {node.causes.length + node.effects.length} Historical Links
                              </span>
                            </span>
                            <span className="font-semibold text-amber-300 group-hover:translate-x-0.5 transition flex items-center gap-1">
                              <span>Read Full Entry</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          /* CHRONOLOGICAL TIMELINE MODE */
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 relative">
            <div className="absolute left-6 sm:left-1/2 top-10 bottom-10 w-px bg-slate-700" />

            <div className="space-y-10">
              {filteredNodes.map((node, index) => {
                const cat = CATEGORIES[node.category];
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={node.id}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    } gap-6`}
                  >
                    <div
                      className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-8 w-3.5 h-3.5 rounded-full border-2 border-slate-950 z-10"
                      style={{ backgroundColor: cat.color }}
                    />

                    <div className="w-full sm:w-[calc(50%-2rem)] pl-12 sm:pl-0">
                      <div
                        onClick={() => openNode(node)}
                        className="poster-card-3d rounded-2xl bg-[#0d121f] border border-slate-800 hover:border-slate-600 overflow-hidden shadow-lg cursor-pointer group"
                      >
                        <HistoricalArtPoster node={node} variant="card" />
                        <div className="p-5 space-y-2.5">
                          <h3 className="font-serif-title text-lg font-bold text-slate-100 group-hover:text-amber-300">
                            {node.title}
                          </h3>
                          <p className="text-xs text-amber-300/90 font-medium">
                            {node.universalImpact}
                          </p>
                          <p className="text-sm text-slate-200 leading-relaxed">
                            {node.summary}
                          </p>
                          {node.philosophicalCore && (
                            <div className="pt-2 flex items-start gap-2 text-xs text-slate-300">
                              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                              <span>{node.philosophicalCore}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* 4. Deep-Dive Reader Drawer when an Entry is Clicked */}
      <ChronicleInspector
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onSelectNode={openNode}
        onStartCompare={(node) => {
          setSelectedNode(null);
          setCompareState((prev) => ({
            ...prev,
            isOpen: true,
            left: node,
            right:
              node.id === prev.right.id
                ? HISTORICAL_NODES.find((n) => n.id !== node.id)!
                : prev.right,
          }));
        }}
      />

      {/* 5. Side-by-Side Compare Modal */}
      {compareState.isOpen && (
        <MindDuelModal
          leftNode={compareState.left}
          rightNode={compareState.right}
          onSelectLeft={(node) =>
            setCompareState((prev) => ({ ...prev, left: node }))
          }
          onSelectRight={(node) =>
            setCompareState((prev) => ({ ...prev, right: node }))
          }
          onClose={() =>
            setCompareState((prev) => ({ ...prev, isOpen: false }))
          }
        />
      )}
    </div>
  );
}

export default App;
