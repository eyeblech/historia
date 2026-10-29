import React, { useEffect, useRef, useState } from 'react';
import {
  MapPin,
  Compass,
  ArrowUpRight,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
} from 'lucide-react';
import {
  CATEGORIES,
  HISTORICAL_NODES,
  type CategoryId,
  type HistoricalNode,
} from '../data/historyData';
import { HistoricalArtPoster } from './HistoricalArtPoster';

interface EnchantedGlobe3DProps {
  activeCategories: Set<CategoryId>;
  selectedNode: HistoricalNode | null;
  onSelectNode: (node: HistoricalNode) => void;
}

// Detailed Continental Outlines (Lat, Lng pairs)
const CONTINENT_POLYGONS: Array<Array<[number, number]>> = [
  // North America
  [
    [70, -160], [72, -110], [60, -65], [45, -60], [25, -80],
    [18, -95], [8, -78], [20, -105], [35, -122], [55, -135],
  ],
  // South America
  [
    [10, -75], [5, -52], [-6, -35], [-23, -42], [-38, -58],
    [-54, -68], [-42, -74], [-18, -72], [-4, -81],
  ],
  // Europe
  [
    [36, -9], [44, -8], [48, -4], [54, 8], [68, 15], [70, 28],
    [60, 45], [46, 38], [41, 28], [37, 23], [38, 15], [43, 5],
  ],
  // Africa
  [
    [35, -6], [37, 10], [32, 32], [12, 51], [-2, 42], [-18, 36],
    [-34, 25], [-34, 18], [-16, 12], [4, 9], [5, -8], [15, -17], [28, -13],
  ],
  // Asia & India & Middle East
  [
    [32, 33], [13, 45], [24, 58], [24, 68], [8, 77], [22, 88],
    [14, 100], [2, 103], [22, 114], [32, 122], [42, 132], [55, 140],
    [66, 170], [72, 120], [70, 60], [46, 39],
  ],
  // Japan
  [
    [31, 130], [35, 136], [40, 140], [44, 144], [36, 141],
  ],
  // Australia
  [
    [-12, 130], [-12, 142], [-25, 153], [-38, 147], [-35, 136],
    [-34, 115], [-22, 114],
  ],
];

// Shortest angular difference so the globe never spins the wrong way around
function normalizeAngleDelta(target: number, current: number): number {
  let diff = (target - current) % (Math.PI * 2);
  if (diff > Math.PI) diff -= Math.PI * 2;
  if (diff < -Math.PI) diff += Math.PI * 2;
  return diff;
}

// Project (lat, lng) onto 3D sphere rotated by (rotY, rotX)
function project3D(
  lat: number,
  lng: number,
  rotY: number,
  rotX: number,
  radius: number,
  cx: number,
  cy: number
) {
  const phi = (lat * Math.PI) / 180;
  const lambda = (lng * Math.PI) / 180 + rotY;

  const x0 = Math.cos(phi) * Math.sin(lambda);
  const y0 = Math.sin(phi);
  const z0 = Math.cos(phi) * Math.cos(lambda);

  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const y = y0 * cosX - z0 * sinX;
  const z = y0 * sinX + z0 * cosX;
  const x = x0;

  return {
    screenX: cx + x * radius,
    screenY: cy - y * radius,
    z,
  };
}

export const EnchantedGlobe3D: React.FC<EnchantedGlobe3DProps> = ({
  activeCategories,
  selectedNode,
  onSelectNode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const geoNodes = HISTORICAL_NODES.filter(
    (n) => n.coordinates && activeCategories.has(n.category)
  );

  const [focusedNode, setFocusedNode] = useState<HistoricalNode>(
    selectedNode && selectedNode.coordinates ? selectedNode : geoNodes[0] || HISTORICAL_NODES[8]
  );
  const [zoomPercent, setZoomPercent] = useState<number>(100);
  const [isAutoOrbit, setIsAutoOrbit] = useState<boolean>(true);

  // Physics & Camera state in mutable ref for 60fps smoothness
  const globeRef = useRef({
    rotY: -0.45,
    rotX: 0.25,
    velY: 0,
    velX: 0,
    zoom: 1.0,
    targetZoom: 1.0,
    targetRotY: null as number | null,
    targetRotX: null as number | null,
    isDragging: false,
    dragMoved: false,
    lastX: 0,
    lastY: 0,
    autoSpin: true,
    hoveredId: null as string | null,
    screenPins: [] as Array<{
      node: HistoricalNode;
      x: number;
      y: number;
      z: number;
      color: string;
    }>,
  });

  const flyGlobeToNode = (node: HistoricalNode, zoomInSlightly: boolean = true) => {
    setFocusedNode(node);
    if (node.coordinates) {
      globeRef.current.velY = 0;
      globeRef.current.velX = 0;
      globeRef.current.targetRotY = -(node.coordinates.lng * Math.PI) / 180;
      globeRef.current.targetRotX = Math.max(
        -0.8,
        Math.min(0.8, (node.coordinates.lat * Math.PI) / 180)
      );
      if (zoomInSlightly && globeRef.current.targetZoom < 1.35) {
        globeRef.current.targetZoom = 1.35;
        setZoomPercent(135);
      }
    }
  };

  const adjustZoom = (delta: number) => {
    const next = Math.max(0.7, Math.min(2.6, globeRef.current.targetZoom + delta));
    globeRef.current.targetZoom = next;
    setZoomPercent(Math.round(next * 100));
  };

  const resetGlobeView = () => {
    globeRef.current.targetRotY = -0.45;
    globeRef.current.targetRotX = 0.25;
    globeRef.current.targetZoom = 1.0;
    globeRef.current.velY = 0;
    globeRef.current.velX = 0;
    setZoomPercent(100);
  };

  useEffect(() => {
    if (selectedNode && selectedNode.coordinates) {
      flyGlobeToNode(selectedNode, false);
    }
  }, [selectedNode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Non-passive wheel listener for smooth zooming without scrolling the page
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = -e.deltaY * 0.0014;
      const next = Math.max(0.7, Math.min(2.6, globeRef.current.targetZoom + zoomFactor));
      globeRef.current.targetZoom = next;
      setZoomPercent(Math.round(next * 100));
    };
    canvas.addEventListener('wheel', onWheel, { passive: false });

    let animId = 0;

    // Subtle background stars
    const stars = Array.from({ length: 75 }).map((_, i) => ({
      x: ((i * 73) % 100) / 100,
      y: ((i * 41) % 100) / 100,
      r: (i % 2) * 0.5 + 0.5,
      alpha: 0.15 + ((i * 19) % 45) / 100,
    }));

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      const st = globeRef.current;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (
        canvas.width !== Math.floor(rect.width * dpr) ||
        canvas.height !== Math.floor(rect.height * dpr)
      ) {
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;

      // Smoothly interpolate zoom level
      st.zoom += (st.targetZoom - st.zoom) * 0.12;
      const baseRadius = Math.min(w, h) * 0.36;
      const radius = baseRadius * st.zoom;

      ctx.clearRect(0, 0, w, h);

      // Physics & Rotation Mechanics
      if (st.targetRotY !== null && st.targetRotX !== null) {
        const dy = normalizeAngleDelta(st.targetRotY, st.rotY);
        const dx = st.targetRotX - st.rotX;
        st.rotY += dy * 0.09;
        st.rotX += dx * 0.09;
        if (Math.abs(dy) < 0.003 && Math.abs(dx) < 0.003) {
          st.targetRotY = null;
          st.targetRotX = null;
        }
      } else if (!st.isDragging) {
        // Apply momentum damping
        st.rotY += st.velY;
        st.rotX = Math.max(-1.1, Math.min(1.1, st.rotX + st.velX));
        st.velY *= 0.92;
        st.velX *= 0.92;

        // Gentle auto-orbit when momentum settles
        if (st.autoSpin && Math.abs(st.velY) < 0.0002) {
          st.rotY -= 0.0016;
        }
      }

      // 1. Subtle Background Stars
      stars.forEach((s) => {
        ctx.fillStyle = `rgba(203, 213, 225, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Soft Atmospheric Rim Glow
      const atmoGrad = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.9,
        cx,
        cy,
        radius * 1.15
      );
      atmoGrad.addColorStop(0, 'rgba(56, 189, 248, 0.18)');
      atmoGrad.addColorStop(1, 'rgba(9, 13, 22, 0)');
      ctx.fillStyle = atmoGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // 3. 3D Shaded Ocean Sphere
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.3,
        radius * 0.05,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, '#162642');
      sphereGrad.addColorStop(0.6, '#0c1526');
      sphereGrad.addColorStop(1, '#060a12');

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Clip inside sphere
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      // 4. Spherical Graticule Grid (More detail appears as you zoom in)
      const gridStep = st.zoom > 1.5 ? 15 : 30;
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.09)';
      ctx.lineWidth = 0.8;

      for (let lng = -180; lng < 180; lng += gridStep) {
        ctx.beginPath();
        let started = false;
        for (let lat = -80; lat <= 80; lat += 6) {
          const p = project3D(lat, lng, st.rotY, st.rotX, radius, cx, cy);
          if (p.z > -0.05) {
            if (!started) {
              ctx.moveTo(p.screenX, p.screenY);
              started = true;
            } else {
              ctx.lineTo(p.screenX, p.screenY);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      for (let lat = -60; lat <= 60; lat += gridStep) {
        ctx.beginPath();
        let started = false;
        for (let lng = -180; lng <= 180; lng += 6) {
          const p = project3D(lat, lng, st.rotY, st.rotX, radius, cx, cy);
          if (p.z > -0.05) {
            if (!started) {
              ctx.moveTo(p.screenX, p.screenY);
              started = true;
            } else {
              ctx.lineTo(p.screenX, p.screenY);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle =
          lat === 0 ? 'rgba(217, 119, 6, 0.25)' : 'rgba(148, 163, 184, 0.09)';
        ctx.stroke();
      }

      // 5. 3D Projected Continents
      CONTINENT_POLYGONS.forEach((poly) => {
        ctx.beginPath();
        let visibleCount = 0;
        poly.forEach(([lat, lng], idx) => {
          const p = project3D(lat, lng, st.rotY, st.rotX, radius, cx, cy);
          if (p.z > 0) visibleCount++;
          if (idx === 0) {
            ctx.moveTo(p.screenX, p.screenY);
          } else {
            ctx.lineTo(p.screenX, p.screenY);
          }
        });
        ctx.closePath();
        if (visibleCount > 1) {
          ctx.fillStyle = 'rgba(30, 41, 59, 0.72)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.32)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });

      ctx.restore(); // End sphere clip

      // Subtle Sphere Border
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // 6. Causal Connection Arcs for Focused Node
      if (focusedNode?.coordinates) {
        const pOrigin = project3D(
          focusedNode.coordinates.lat,
          focusedNode.coordinates.lng,
          st.rotY,
          st.rotX,
          radius,
          cx,
          cy
        );

        if (pOrigin.z > 0) {
          const connectedIds = [...focusedNode.causes, ...focusedNode.effects];
          connectedIds.forEach((targetId) => {
            const targetNode = geoNodes.find((n) => n.id === targetId);
            if (!targetNode?.coordinates) return;
            const pTarget = project3D(
              targetNode.coordinates.lat,
              targetNode.coordinates.lng,
              st.rotY,
              st.rotX,
              radius,
              cx,
              cy
            );
            if (pTarget.z > 0) {
              const midX = (pOrigin.screenX + pTarget.screenX) / 2;
              const midY = (pOrigin.screenY + pTarget.screenY) / 2 - 24 * st.zoom;
              ctx.beginPath();
              ctx.moveTo(pOrigin.screenX, pOrigin.screenY);
              ctx.quadraticCurveTo(midX, midY, pTarget.screenX, pTarget.screenY);
              ctx.strokeStyle = 'rgba(217, 119, 6, 0.55)';
              ctx.lineWidth = 1.5;
              ctx.setLineDash([4, 4]);
              ctx.stroke();
              ctx.setLineDash([]);
            }
          });
        }
      }

      // 7. Render Historical Landmark Beacons
      const nextPins: typeof st.screenPins = [];

      geoNodes.forEach((node) => {
        if (!node.coordinates) return;
        const p = project3D(
          node.coordinates.lat,
          node.coordinates.lng,
          st.rotY,
          st.rotX,
          radius,
          cx,
          cy
        );
        if (p.z > 0.05) {
          const cat = CATEGORIES[node.category];
          nextPins.push({
            node,
            x: p.screenX,
            y: p.screenY,
            z: p.z,
            color: cat.color,
          });
        }
      });

      nextPins.sort((a, b) => a.z - b.z);
      st.screenPins = nextPins;

      nextPins.forEach((pin) => {
        const isFocused = focusedNode?.id === pin.node.id;
        const isHovered = st.hoveredId === pin.node.id;
        const pulse = Math.sin(time * 0.004) * 2.5;

        if (isFocused || isHovered) {
          ctx.beginPath();
          ctx.arc(pin.x, pin.y, 12 + pulse, 0, Math.PI * 2);
          ctx.strokeStyle = pin.color;
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }

        ctx.fillStyle = pin.color;
        ctx.beginPath();
        ctx.arc(pin.x, pin.y, isFocused || isHovered ? 6 : 4.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(pin.x, pin.y, isFocused ? 2.2 : 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Show clean readable labels (more labels appear as you zoom in)
        const labelThreshold = st.zoom > 1.3 ? 0.45 : 0.78;
        if (isFocused || isHovered || pin.z > labelThreshold) {
          const label = pin.node.title.split(':')[0];
          ctx.font = isFocused
            ? '600 11px Inter, sans-serif'
            : '500 10.5px Inter, sans-serif';
          const textWidth = ctx.measureText(label).width;
          const lx = pin.x + 10;
          const ly = pin.y + 4;

          ctx.fillStyle = isFocused
            ? 'rgba(15, 23, 42, 0.95)'
            : 'rgba(15, 23, 42, 0.82)';
          ctx.beginPath();
          ctx.roundRect(lx - 5, ly - 12, textWidth + 10, 17, 4);
          ctx.fill();

          ctx.fillStyle = isFocused ? '#fbbf24' : '#f1f5f9';
          ctx.fillText(label, lx, ly);
        }
      });

      ctx.restore();
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('wheel', onWheel);
    };
  }, [geoNodes, focusedNode]);

  // Pointer Drag + Inertial Momentum Mechanics
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const st = globeRef.current;
    st.isDragging = true;
    st.dragMoved = false;
    st.targetRotY = null;
    st.targetRotX = null;
    st.velY = 0;
    st.velX = 0;
    st.lastX = e.clientX;
    st.lastY = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const st = globeRef.current;

    if (st.isDragging) {
      const dx = e.clientX - st.lastX;
      const dy = e.clientY - st.lastY;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        st.dragMoved = true;
      }
      st.lastX = e.clientX;
      st.lastY = e.clientY;

      // Scale rotation speed inversely with zoom so zoomed-in dragging feels super precise
      const sensitivity = 0.0055 / Math.sqrt(st.zoom);
      st.velY = -dx * sensitivity;
      st.velX = dy * sensitivity;
      st.rotY += st.velY;
      st.rotX = Math.max(-1.1, Math.min(1.1, st.rotX + st.velX));
      return;
    }

    // Hover pin detection
    let hitNode: HistoricalNode | null = null;
    for (const pin of st.screenPins) {
      const dist = Math.hypot(mx - pin.x, my - pin.y);
      if (dist < 15) {
        hitNode = pin.node;
        break;
      }
    }
    st.hoveredId = hitNode ? hitNode.id : null;
    canvas.style.cursor = hitNode ? 'pointer' : 'grab';
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const st = globeRef.current;
    const wasDrag = st.dragMoved;
    st.isDragging = false;
    if (wasDrag) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    for (const pin of st.screenPins) {
      const dist = Math.hypot(mx - pin.x, my - pin.y);
      if (dist < 16) {
        flyGlobeToNode(pin.node, true);
        return;
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Left 2 Columns: Interactive 3D Globe with Zoom & Momentum */}
      <div className="lg:col-span-2 relative rounded-2xl bg-[#0c111d] border border-slate-800 shadow-2xl overflow-hidden p-4 sm:p-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div>
            <h3 className="font-serif-title text-lg font-bold text-slate-100">
              Interactive 3D Historical Globe
            </h3>
            <p className="text-xs text-slate-400">
              Scroll (or use + / −) to zoom in up to 260% • Drag to spin with smooth momentum • Click any pin to focus
            </p>
          </div>

          {/* Dedicated Zoom & Orbit Controls */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => adjustZoom(-0.25)}
              title="Zoom Out"
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono-code text-xs text-amber-300 px-2 min-w-[52px] text-center">
              {zoomPercent}%
            </span>
            <button
              onClick={() => adjustZoom(0.25)}
              title="Zoom In"
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <div className="w-px h-4 bg-slate-800 mx-0.5" />

            <button
              onClick={() => {
                const next = !isAutoOrbit;
                setIsAutoOrbit(next);
                globeRef.current.autoSpin = next;
              }}
              title="Toggle Auto-Rotation"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                isAutoOrbit
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAutoOrbit ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>Orbit</span>
            </button>

            <button
              onClick={resetGlobeView}
              title="Reset Globe View & Zoom"
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3D Spherical Projection Canvas */}
        <div className="relative w-full h-[440px] sm:h-[510px] rounded-xl bg-[#070a12] border border-slate-800/80 overflow-hidden">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={() => {
              globeRef.current.isDragging = false;
            }}
            onDoubleClick={() => adjustZoom(0.35)}
            className="w-full h-full block touch-none"
          />

          <div className="absolute bottom-3 left-3 pointer-events-none bg-slate-950/85 border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] text-slate-300">
            Scroll or Double-Click to Zoom • Drag to Spin • Click Any Landmark Pin
          </div>
        </div>

        {/* Landmark Selector Grid Below Globe */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {geoNodes.map((node) => {
            const cat = CATEGORIES[node.category];
            const isCurr = focusedNode?.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => flyGlobeToNode(node, true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition flex items-center gap-1.5 cursor-pointer ${
                  isCurr
                    ? 'bg-slate-800 text-white border-amber-500/60 shadow-sm'
                    : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span>{node.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Focused Landmark Reader Card */}
      {focusedNode && (
        <div className="rounded-2xl bg-[#0c111d] border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
          <HistoricalArtPoster node={focusedNode} variant="card" />
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-1.5 text-xs text-sky-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{focusedNode.coordinates?.locationName}</span>
            </div>

            <div>
              <h4 className="font-serif-title text-xl font-bold text-white leading-snug">
                {focusedNode.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {focusedNode.subtitle}
              </p>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">
              {focusedNode.summary}
            </p>

            {focusedNode.quote && (
              <div className="bg-slate-900/90 border-l-2 border-amber-500/70 pl-3.5 py-2 text-xs italic text-slate-200">
                “{focusedNode.quote.text}” —{' '}
                <span className="not-italic font-semibold text-amber-300">
                  {focusedNode.quote.author}
                </span>
              </div>
            )}

            <button
              onClick={() => onSelectNode(focusedNode)}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
            >
              <Compass className="w-4 h-4" />
              <span>Read Full Historical Entry</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
