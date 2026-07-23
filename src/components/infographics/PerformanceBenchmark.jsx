import { useState, useEffect } from 'react';

const FLASHLIST_BENCHMARKS = [
  { label: 'Scroll FPS (1000 items)', flatlist: 28, flashlist: 58, unit: 'fps', max: 60 },
  { label: 'JS Thread Work', flatlist: 82, flashlist: 15, unit: 'ms/frame', max: 100, invertColor: true },
  { label: 'Memory (1000 items)', flatlist: 180, flashlist: 65, unit: 'MB', max: 200, invertColor: true },
  { label: 'Native View Creations', flatlist: 1000, flashlist: 12, unit: 'views', max: 1000, invertColor: true },
];

const STATE_MGMT = [
  { label: 'Bundle Size', zustand: '2.9 KB', redux: '16.7 KB' },
  { label: 'Boilerplate', zustand: 'Minimal', redux: 'Actions + Reducers + Store' },
  { label: 'Persistence Speed', zustand: '< 1ms (MMKV)', redux: '50-100ms (AsyncStorage)' },
  { label: 'Provider Required', zustand: 'No', redux: 'Yes' },
  { label: 'Selector Pattern', zustand: 'Atomic', redux: 'useSelector + shallowEqual' },
];

function FPSGauge({ value, max = 120, label, color, isLight }) {
  const [animValue, setAnimValue] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setAnimValue(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  const pct = (animValue / max) * 100;
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (pct / 100) * circumference * 0.75; // 270deg arc

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="100" height="90" viewBox="0 0 100 90">
        {/* Background arc */}
        <circle
          cx="50" cy="50" r="40"
          fill="none"
          stroke={isLight ? '#e5e7eb' : 'rgba(255,255,255,0.06)'}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          transform="rotate(135 50 50)"
        />
        {/* Value arc */}
        <circle
          cx="50" cy="50" r="40"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeDashoffset={dashOffset}
          transform="rotate(135 50 50)"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        {/* Value text */}
        <text x="50" y="48" textAnchor="middle" fill={color} fontSize="20" fontWeight="700" fontFamily="var(--font-mono)">
          {animValue}
        </text>
        <text x="50" y="63" textAnchor="middle" fill={isLight ? '#9ca3af' : 'rgba(255,255,255,0.3)'} fontSize="9">
          fps
        </text>
      </svg>
      <span className={`text-xs font-medium ${isLight ? 'text-gray-600' : 'text-white/60'}`}>{label}</span>
    </div>
  );
}

export default function PerformanceBenchmark({ isLight, topicId }) {
  const isFlashList = topicId === 'flashlist';
  const isFastImage = topicId === 'react-native-fast-image';
  const isReanimated = topicId === 'reanimated-v3';
  const isZustand = topicId === 'zustand-rn';

  return (
    <div className="space-y-6">
      {/* FlashList vs FlatList Benchmark */}
      {(isFlashList || isFastImage) && (
        <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-1 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`}>
            📊 {isFlashList ? 'FlashList vs FlatList' : 'Image Performance'}
          </h3>
          <p className={`text-xs mb-5 ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
            {isFlashList ? 'Benchmark with 1000-item social feed' : 'Native caching vs no caching'}
          </p>

          <div className="space-y-4">
            {FLASHLIST_BENCHMARKS.map((b, i) => {
              const flatPct = (b.flatlist / b.max) * 100;
              const flashPct = (b.flashlist / b.max) * 100;
              const flatColor = b.invertColor ? '#ef4444' : '#94a3b8';
              const flashColor = b.invertColor ? '#22c55e' : '#22c55e';
              return (
                <div key={b.label} className="fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className={`text-xs font-medium mb-2 ${isLight ? 'text-gray-600' : 'text-white/55'}`}>{b.label}</div>
                  {/* FlatList bar */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] w-16 text-right font-medium ${isLight ? 'text-gray-400' : 'text-white/30'}`}>FlatList</span>
                    <div className={`flex-1 h-2.5 rounded-full overflow-hidden ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
                      <div
                        className="bar-grow h-full rounded-full"
                        style={{ width: `${flatPct}%`, background: flatColor, animationDelay: `${i * 150}ms` }}
                      />
                    </div>
                    <span className={`text-[10px] w-14 font-mono tabular-nums ${isLight ? 'text-gray-500' : 'text-white/40'}`}>{b.flatlist} {b.unit}</span>
                  </div>
                  {/* FlashList bar */}
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] w-16 text-right font-medium ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`}>FlashList</span>
                    <div className={`flex-1 h-2.5 rounded-full overflow-hidden ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
                      <div
                        className="bar-grow h-full rounded-full"
                        style={{ width: `${flashPct}%`, background: flashColor, animationDelay: `${i * 150 + 80}ms` }}
                      />
                    </div>
                    <span className={`text-[10px] w-14 font-mono tabular-nums ${isLight ? 'text-gray-500' : 'text-white/40'}`}>{b.flashlist} {b.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key insight */}
          <div className={`mt-5 rounded-xl p-3 border text-xs ${isLight ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-emerald-500/5 border-emerald-500/15 text-emerald-400'}`}>
            💡 <strong>Key insight:</strong> FlashList recycles native views (like RecyclerView/UICollectionView) instead of destroying and recreating them. The same 10–15 native views get repopulated as you scroll.
          </div>
        </div>
      )}

      {/* Reanimated FPS Gauges */}
      {isReanimated && (
        <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isLight ? 'text-violet-600' : 'text-violet-400'}`}>
            🎯 Animation FPS Comparison
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <FPSGauge value={18} max={60} label="Animated (JS blocked)" color="#ef4444" isLight={isLight} />
            <FPSGauge value={45} max={60} label="LayoutAnimation" color="#f59e0b" isLight={isLight} />
            <FPSGauge value={60} max={60} label="Reanimated Worklet" color="#22c55e" isLight={isLight} />
          </div>
          <div className={`mt-5 rounded-xl p-3 border text-xs ${isLight ? 'bg-violet-50 border-violet-100 text-violet-700' : 'bg-violet-500/5 border-violet-500/15 text-violet-400'}`}>
            💡 <strong>Why 60fps?</strong> Reanimated worklets run directly on the UI thread via JSI. Even if the JS thread is completely blocked (e.g., heavy computation), animations keep running at full frame rate.
          </div>
        </div>
      )}

      {/* FastImage caching visual */}
      {isFastImage && (
        <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>
            🖼️ Image Loading: Built-in vs FastImage
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className={`rounded-xl p-4 border ${isLight ? 'bg-red-50 border-red-100' : 'bg-red-500/5 border-red-500/15'}`}>
              <div className={`text-xs font-bold mb-3 ${isLight ? 'text-red-700' : 'text-red-400'}`}>❌ Built-in Image</div>
              <div className="space-y-2">
                {['Visit 1: Download ↓', 'Visit 2: Download ↓', 'Visit 3: Download ↓'].map((s, i) => (
                  <div key={i} className={`text-[11px] px-2 py-1.5 rounded ${isLight ? 'bg-red-100 text-red-600' : 'bg-red-500/10 text-red-400'}`}>{s}</div>
                ))}
              </div>
              <p className={`text-[10px] mt-2 ${isLight ? 'text-red-500' : 'text-red-400/60'}`}>No caching — same URL re-downloaded every time</p>
            </div>
            <div className={`rounded-xl p-4 border ${isLight ? 'bg-green-50 border-green-100' : 'bg-green-500/5 border-green-500/15'}`}>
              <div className={`text-xs font-bold mb-3 ${isLight ? 'text-green-700' : 'text-green-400'}`}>✅ FastImage</div>
              <div className="space-y-2">
                {[
                  { s: 'Visit 1: Download ↓ + Cache 💾', cached: false },
                  { s: 'Visit 2: From Memory ⚡', cached: true },
                  { s: 'Visit 3: From Disk 💾', cached: true },
                ].map((item, i) => (
                  <div key={i} className={`text-[11px] px-2 py-1.5 rounded ${item.cached
                    ? (isLight ? 'bg-green-200 text-green-700' : 'bg-green-500/20 text-green-400')
                    : (isLight ? 'bg-green-100 text-green-600' : 'bg-green-500/10 text-green-400')
                  }`}>{item.s}</div>
                ))}
              </div>
              <p className={`text-[10px] mt-2 ${isLight ? 'text-green-600' : 'text-green-400/60'}`}>Memory → Disk → Network (cascading cache)</p>
            </div>
          </div>
        </div>
      )}

      {/* Zustand + MMKV vs Redux */}
      {isZustand && (
        <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isLight ? 'text-orange-600' : 'text-orange-400'}`}>
            ⚖️ Zustand + MMKV vs Redux + AsyncStorage
          </h3>
          <div className="space-y-2">
            {STATE_MGMT.map((row, i) => (
              <div key={row.label} className="fade-in-up grid grid-cols-[110px_1fr_1fr] gap-2 text-xs" style={{ animationDelay: `${i * 60}ms` }}>
                <span className={`font-semibold py-2 ${isLight ? 'text-gray-700' : 'text-white/70'}`}>{row.label}</span>
                <span className={`rounded-lg px-3 py-2 ${isLight ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-green-500/8 text-green-400 border border-green-500/15'}`}>
                  ✅ {row.zustand}
                </span>
                <span className={`rounded-lg px-3 py-2 ${isLight ? 'bg-gray-50 text-gray-600 border border-gray-200' : 'bg-white/4 text-white/50 border border-white/8'}`}>
                  {row.redux}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
