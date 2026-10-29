import React from 'react';
import { Scale, X, Zap, Sparkles, GitMerge, Users } from 'lucide-react';
import {
  CATEGORIES,
  HISTORICAL_NODES,
  type HistoricalNode,
} from '../data/historyData';

interface MindDuelModalProps {
  leftNode: HistoricalNode;
  rightNode: HistoricalNode;
  onSelectLeft: (node: HistoricalNode) => void;
  onSelectRight: (node: HistoricalNode) => void;
  onClose: () => void;
}

export const MindDuelModal: React.FC<MindDuelModalProps> = ({
  leftNode,
  rightNode,
  onSelectLeft,
  onSelectRight,
  onClose,
}) => {
  const leftCat = CATEGORIES[leftNode.category];
  const rightCat = CATEGORIES[rightNode.category];

  // Check if there is a direct or 2-hop causal bridge between the two nodes
  const directLeftToRight = leftNode.effects.includes(rightNode.id);
  const directRightToLeft = rightNode.effects.includes(leftNode.id);
  const sharedCauses = leftNode.causes.filter((c) => rightNode.causes.includes(c));
  const sharedEffects = leftNode.effects.filter((e) => rightNode.effects.includes(e));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-950/95 border border-slate-700/70 shadow-[0_0_80px_rgba(56,189,248,0.25)] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-title text-lg font-bold text-white tracking-wide">
                CHRONO MIND-DUEL // SYNOPTIC COMPARISON
              </h2>
              <p className="text-xs text-slate-400">
                Juxtapose any two epochs, philosophies, wars, or scientific revolutions across 13.8 billion years
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selectors Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-3 bg-slate-900/40 border-b border-slate-800/80">
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 block mb-1">
              First Historical Force
            </label>
            <select
              value={leftNode.id}
              onChange={(e) => {
                const found = HISTORICAL_NODES.find((n) => n.id === e.target.value);
                if (found) onSelectLeft(found);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              {HISTORICAL_NODES.map((n) => (
                <option key={n.id} value={n.id}>
                  [{n.dateDisplay}] {n.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 block mb-1">
              Second Historical Force
            </label>
            <select
              value={rightNode.id}
              onChange={(e) => {
                const found = HISTORICAL_NODES.find((n) => n.id === e.target.value);
                if (found) onSelectRight(found);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              {HISTORICAL_NODES.map((n) => (
                <option key={n.id} value={n.id}>
                  [{n.dateDisplay}] {n.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Causal Bridge Banner */}
        <div className="px-6 py-3 bg-gradient-to-r from-amber-500/10 via-indigo-500/15 to-cyan-500/10 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs text-indigo-200">
            <GitMerge className="w-4 h-4 text-indigo-400 shrink-0" />
            {directLeftToRight ? (
              <span>
                <strong className="text-amber-300">{leftNode.title}</strong> directly catalyzed{' '}
                <strong className="text-cyan-300">{rightNode.title}</strong> across time.
              </span>
            ) : directRightToLeft ? (
              <span>
                <strong className="text-cyan-300">{rightNode.title}</strong> directly catalyzed{' '}
                <strong className="text-amber-300">{leftNode.title}</strong> across time.
              </span>
            ) : sharedCauses.length > 0 || sharedEffects.length > 0 ? (
              <span>
                Connected via shared historical roots & downstream ripples ({sharedCauses.length} shared causes, {sharedEffects.length} shared effects).
              </span>
            ) : (
              <span>
                Parallel cosmic & civilizational milestones separated by{' '}
                <strong className="text-white font-mono-code">
                  {Math.abs(rightNode.yearNumeric - leftNode.yearNumeric).toLocaleString()} years
                </strong>.
              </span>
            )}
          </div>
          <div className="text-xs font-mono-code text-slate-400">
            Impact Delta: {Math.abs(leftNode.impactScore - rightNode.impactScore)} pts
          </div>
        </div>

        {/* Side-by-Side Comparison Columns */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { node: leftNode, cat: leftCat, accent: 'border-amber-500/40' },
            { node: rightNode, cat: rightCat, accent: 'border-cyan-500/40' },
          ].map(({ node, cat, accent }, idx) => (
            <div
              key={node.id + idx}
              className={`rounded-2xl bg-slate-900/70 border ${accent} p-5 flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-semibold uppercase rounded-full border ${cat.bgBadge}`}
                  >
                    {cat.shortLabel}
                  </span>
                  <span className="font-mono-code text-xs text-slate-300">
                    {node.dateDisplay}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-title text-lg font-bold text-white">
                    {node.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{node.subtitle}</p>
                </div>

                {/* Universal Impact */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Universal Impact Score
                    </span>
                    <span className="font-mono-code font-bold text-white">
                      {node.impactScore}/100
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {node.universalImpact}
                  </p>
                </div>

                {/* Philosophical Core */}
                {node.philosophicalCore && (
                  <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-3">
                    <div className="text-[10px] uppercase tracking-wider text-indigo-300 font-semibold flex items-center gap-1 mb-1">
                      <Sparkles className="w-3 h-3" />
                      Philosophical Core
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {node.philosophicalCore}
                    </p>
                  </div>
                )}

                {/* Key Figures */}
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1 mb-1.5">
                    <Users className="w-3 h-3 text-amber-400" />
                    Key Figures
                  </div>
                  <div className="space-y-1">
                    {node.keyFigures.map((f, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-xs bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800/70"
                      >
                        <span className="font-semibold text-white">{f.name}</span>
                        <span className="text-slate-400 text-[11px]">{f.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote Footer */}
              {node.quote && (
                <div className="pt-3 border-t border-slate-800/80 text-xs italic text-amber-200/90">
                  “{node.quote.text}” —{' '}
                  <span className="not-italic font-semibold text-amber-400">
                    {node.quote.author}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
