import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  GitBranch,
  MapPin,
  Quote,
  Users,
  BookOpen,
  Scale,
  X,
  Compass,
  Flame,
  Image as ImageIcon,
} from 'lucide-react';
import {
  CATEGORIES,
  ERAS,
  NODE_MAP,
  type HistoricalNode,
} from '../data/historyData';
import { HistoricalArtPoster, HISTORICAL_IMAGES } from './HistoricalArtPoster';

interface ChronicleInspectorProps {
  node: HistoricalNode | null;
  onClose: () => void;
  onSelectNode: (node: HistoricalNode) => void;
  onStartCompare: (node: HistoricalNode) => void;
}

export const ChronicleInspector: React.FC<ChronicleInspectorProps> = ({
  node,
  onClose,
  onSelectNode,
  onStartCompare,
}) => {
  const [activeTab, setActiveTab] = useState<'chronicle' | 'causality' | 'philosophy'>('chronicle');

  if (!node) return null;

  const cat = CATEGORIES[node.category];
  const era = ERAS.find((e) => e.id === node.era) || ERAS[0];
  const causeNodes = node.causes.map((id) => NODE_MAP[id]).filter(Boolean);
  const effectNodes = node.effects.map((id) => NODE_MAP[id]).filter(Boolean);
  const imgMeta = HISTORICAL_IMAGES[node.id];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      <aside className="relative w-full max-w-2xl h-full bg-[#090d18] border-l border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Top Close & Compare Floating Controls */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={() => onStartCompare(node)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-950/85 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-400/40 backdrop-blur-md transition cursor-pointer shadow-lg"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Compare in Mind-Duel</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950/85 hover:bg-rose-600 text-slate-200 hover:text-white border border-slate-700 backdrop-blur-md transition cursor-pointer shadow-lg"
            aria-label="Close Inspector"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Full Story + Art Poster */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero Art Poster Header */}
          <HistoricalArtPoster node={node} variant="hero" />

          <div className="p-6 sm:p-8 space-y-6">
            {/* Title & Archival Source Attribution */}
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
                <span>{era.title}</span>
                {node.coordinates && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-cyan-300">
                      <MapPin className="w-3.5 h-3.5" />
                      {node.coordinates.locationName}
                    </span>
                  </>
                )}
              </div>

              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white leading-tight">
                {node.title}
              </h2>
              <p className="text-sm text-slate-300 mt-1 font-medium">
                {node.subtitle}
              </p>

              {imgMeta && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    <strong className="text-slate-200">Archival Masterpiece:</strong> {imgMeta.caption} ({imgMeta.artistOrSource})
                  </span>
                </div>
              )}
            </div>

            {/* Universal Impact Banner */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  Why This Changed The Universe
                </span>
                <span className="font-mono-code font-bold text-amber-300">
                  Impact: {node.impactScore} / 100
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2.5">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${node.impactScore}%`,
                    background: `linear-gradient(90deg, ${cat.color}, #fde047)`,
                  }}
                />
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {node.universalImpact}
              </p>
            </div>

            {/* Section Tabs */}
            <div className="grid grid-cols-3 gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveTab('chronicle')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'chronicle'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Full Story & People</span>
              </button>
              <button
                onClick={() => setActiveTab('causality')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'causality'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <span>Causes & Ripples ({causeNodes.length + effectNodes.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('philosophy')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'philosophy'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Philosophy & Quotes</span>
              </button>
            </div>

            {/* TAB 1: FULL STORY & PEOPLE */}
            {activeTab === 'chronicle' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Overview
                  </h4>
                  <p className="text-base text-slate-200 leading-relaxed">
                    {node.summary}
                  </p>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {node.stats.map((st, i) => (
                    <div
                      key={i}
                      className="bg-slate-900/75 border border-slate-800 rounded-xl p-3.5"
                    >
                      <div className="text-[11px] uppercase tracking-wider text-slate-400">
                        {st.label}
                      </div>
                      <div className="font-mono-code text-sm font-bold text-white mt-1">
                        {st.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Historical Insights */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Key Historical Insights
                  </h4>
                  <div className="space-y-3">
                    {node.deepDive.map((para, i) => (
                      <div
                        key={i}
                        className="flex gap-3 text-sm text-slate-200 leading-relaxed bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80"
                      >
                        <span
                          className="font-mono-code font-bold text-sm shrink-0 mt-0.5"
                          style={{ color: cat.color }}
                        >
                          0{i + 1}
                        </span>
                        <p>{para}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Figures */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    Great Figures & Pioneers
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {node.keyFigures.map((fig, i) => (
                      <div
                        key={i}
                        className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl"
                      >
                        <div className="text-sm font-bold text-white">{fig.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{fig.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CAUSES & RIPPLES */}
            {activeTab === 'causality' && (
              <div className="space-y-6">
                <p className="text-sm text-slate-300 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                  History is an unbroken chain of cause and effect. Click any event card below to jump straight to that moment in history.
                </p>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
                    <Compass className="w-4 h-4" />
                    What Led To This ({causeNodes.length})
                  </h4>
                  {causeNodes.length === 0 ? (
                    <p className="text-sm text-slate-400 italic bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                      This is the primordial origin point of spacetime itself.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {causeNodes.map((cNode) => (
                        <button
                          key={cNode.id}
                          onClick={() => onSelectNode(cNode)}
                          className="text-left p-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 transition flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <div className="text-[11px] font-mono-code text-amber-300">
                              {cNode.dateDisplay}
                            </div>
                            <div className="text-sm font-bold text-white group-hover:text-amber-200 mt-0.5">
                              {cNode.title}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 group-hover:translate-x-1 transition" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                    <GitBranch className="w-4 h-4" />
                    What This Inspired Later ({effectNodes.length})
                  </h4>
                  {effectNodes.length === 0 ? (
                    <p className="text-sm text-slate-400 italic bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                      We are living inside the unfolding consequences of this breakthrough right now.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {effectNodes.map((eNode) => (
                        <button
                          key={eNode.id}
                          onClick={() => onSelectNode(eNode)}
                          className="text-left p-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 transition flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <div className="text-[11px] font-mono-code text-cyan-300">
                              {eNode.dateDisplay}
                            </div>
                            <div className="text-sm font-bold text-white group-hover:text-cyan-200 mt-0.5">
                              {eNode.title}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 group-hover:translate-x-1 transition" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: PHILOSOPHY & QUOTES */}
            {activeTab === 'philosophy' && (
              <div className="space-y-5">
                {node.philosophicalCore && (
                  <div className="bg-gradient-to-br from-indigo-950/70 via-slate-900 to-purple-950/60 border border-indigo-500/40 rounded-2xl p-5">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      The Big Philosophical Idea
                    </div>
                    <p className="text-base text-slate-100 leading-relaxed font-medium">
                      {node.philosophicalCore}
                    </p>
                  </div>
                )}

                {node.quote && (
                  <div className="bg-slate-900/85 border border-amber-500/30 rounded-2xl p-5">
                    <Quote className="w-7 h-7 text-amber-400/40 mb-2" />
                    <blockquote className="font-serif-title text-base sm:text-lg italic text-amber-100 leading-relaxed">
                      “{node.quote.text}”
                    </blockquote>
                    <div className="mt-3 text-sm font-semibold text-amber-400">
                      — {node.quote.author}
                    </div>
                  </div>
                )}

                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Historical Era: {era.title} ({era.timeSpan})
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {era.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};
