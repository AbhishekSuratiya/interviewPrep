import { useState } from 'react';

const STORAGE_OPTIONS = [
  {
    name: 'MMKV',
    icon: '⚡',
    color: '#facc15',
    speed: 98,
    encryption: 85,
    capacity: 60,
    sync: true,
    bestFor: 'Preferences, cached data, fast KV',
    speedLabel: '~4800 ops/ms',
  },
  {
    name: 'AsyncStorage',
    icon: '📦',
    color: '#94a3b8',
    speed: 15,
    encryption: 0,
    capacity: 50,
    sync: false,
    bestFor: 'Simple prefs (legacy)',
    speedLabel: '~90 ops/ms',
  },
  {
    name: 'SQLite / WatermelonDB',
    icon: '🗄️',
    color: '#60a5fa',
    speed: 60,
    encryption: 40,
    capacity: 95,
    sync: false,
    bestFor: 'Relational data, large datasets, offline-first',
    speedLabel: 'Varies (relational)',
  },
  {
    name: 'Keychain / Keystore',
    icon: '🔐',
    color: '#f472b6',
    speed: 30,
    encryption: 100,
    capacity: 10,
    sync: false,
    bestFor: 'Auth tokens, passwords, secrets',
    speedLabel: 'Hardware-backed',
  },
];

const DIMENSIONS = [
  { key: 'speed', label: 'Speed', icon: '🚀' },
  { key: 'encryption', label: 'Security', icon: '🔒' },
  { key: 'capacity', label: 'Capacity', icon: '💾' },
];

const DECISION_FLOW = [
  { q: 'Is the data sensitive (tokens, passwords)?', yes: 'Keychain / Keystore', yesIcon: '🔐', no: null },
  { q: 'Is it relational / large dataset?', yes: 'SQLite / WatermelonDB', yesIcon: '🗄️', no: null },
  { q: 'Need speed + simple KV?', yes: 'MMKV', yesIcon: '⚡', no: 'AsyncStorage (legacy)' },
];

export default function StorageComparison({ isLight, topicId }) {
  const [activeDim, setActiveDim] = useState('speed');
  const [activeStorage, setActiveStorage] = useState(null);

  const isOverview = topicId === 'storage-overview';

  // For specific storage topics, highlight that storage
  const highlightName = topicId === 'asyncstorage' ? 'AsyncStorage'
    : topicId === 'mmkv' ? 'MMKV'
    : topicId === 'watermelondb' ? 'SQLite / WatermelonDB'
    : topicId === 'keychain-storage' ? 'Keychain / Keystore'
    : null;

  return (
    <div className="space-y-6">
      {/* Bar Chart Comparison */}
      <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
        <h3 className={`text-sm font-semibold uppercase tracking-widest mb-1 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`}>
          📊 Storage Comparison
        </h3>
        <p className={`text-xs mb-5 ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
          Click a metric to compare
        </p>

        {/* Dimension tabs */}
        <div className="flex gap-2 mb-5">
          {DIMENSIONS.map(dim => (
            <button
              key={dim.key}
              onClick={() => setActiveDim(dim.key)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border
                ${activeDim === dim.key
                  ? (isLight ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400')
                  : (isLight ? 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100' : 'bg-white/4 border-white/8 text-white/40 hover:bg-white/6')}
              `}
            >
              {dim.icon} {dim.label}
            </button>
          ))}
        </div>

        {/* Bars */}
        <div className="space-y-3">
          {STORAGE_OPTIONS.map((opt, i) => {
            const value = opt[activeDim];
            const isHL = !highlightName || opt.name === highlightName;
            const isSelected = activeStorage === opt.name;
            return (
              <button
                key={opt.name}
                onClick={() => setActiveStorage(isSelected ? null : opt.name)}
                className={`w-full text-left transition-opacity ${!isHL ? 'opacity-30' : ''}`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg w-6 text-center">{opt.icon}</span>
                  <span className={`text-xs font-semibold flex-1 ${isLight ? 'text-gray-700' : 'text-white/75'}`}>{opt.name}</span>
                  <span className={`text-[11px] font-mono tabular-nums ${isLight ? 'text-gray-400' : 'text-white/35'}`}>{value}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6" />
                  <div className={`flex-1 h-3 rounded-full overflow-hidden ${isLight ? 'bg-gray-100' : 'bg-white/6'}`}>
                    <div
                      className="bar-grow h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${value}%`,
                        background: `linear-gradient(90deg, ${opt.color}, ${opt.color}cc)`,
                        animationDelay: `${i * 120}ms`,
                      }}
                    />
                  </div>
                </div>
                {/* Detail on select */}
                {isSelected && (
                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-6" />
                    <div className={`flex-1 text-[11px] fade-in-up px-3 py-2 rounded-lg ${isLight ? 'bg-gray-50 text-gray-600' : 'bg-white/4 text-white/50'}`}>
                      <strong>Best for:</strong> {opt.bestFor} · <strong>Speed:</strong> {opt.speedLabel} · {opt.sync ? '✅ Sync API' : '⏳ Async API'}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Decision Flowchart (overview only) */}
      {isOverview && (
        <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isLight ? 'text-teal-600' : 'text-teal-400'}`}>
            🧭 Decision Flowchart
          </h3>
          <div className="space-y-3">
            {DECISION_FLOW.map((step, i) => (
              <div key={i} className="fade-in-up" style={{ animationDelay: `${i * 120}ms` }}>
                {/* Question */}
                <div className={`rounded-xl px-4 py-3 border text-sm font-medium ${isLight ? 'bg-blue-50 border-blue-100 text-gray-800' : 'bg-blue-500/5 border-blue-500/15 text-white/80'}`}>
                  ❓ {step.q}
                </div>
                {/* Yes/No branches */}
                <div className="flex gap-3 mt-2 ml-6">
                  <div className={`flex-1 rounded-lg px-3 py-2 border text-xs ${isLight ? 'bg-green-50 border-green-100 text-green-700' : 'bg-green-500/5 border-green-500/15 text-green-400'}`}>
                    ✅ Yes → <strong>{step.yesIcon} {step.yes}</strong>
                  </div>
                  {step.no ? (
                    <div className={`flex-1 rounded-lg px-3 py-2 border text-xs ${isLight ? 'bg-gray-50 border-gray-200 text-gray-600' : 'bg-white/4 border-white/8 text-white/50'}`}>
                      ➡️ No → {step.no}
                    </div>
                  ) : (
                    <div className={`flex-1 rounded-lg px-3 py-2 border text-xs ${isLight ? 'bg-amber-50 border-amber-100 text-amber-700' : 'bg-amber-500/5 border-amber-500/15 text-amber-400'}`}>
                      ⬇️ No → Continue below
                    </div>
                  )}
                </div>
                {/* Connector */}
                {i < DECISION_FLOW.length - 1 && (
                  <div className="flex justify-center my-1">
                    <div className={`w-px h-4 ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick reference table for specific storage topics */}
      {!isOverview && highlightName && (
        <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-4 ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>
            📋 At a Glance
          </h3>
          {(() => {
            const opt = STORAGE_OPTIONS.find(o => o.name === highlightName);
            if (!opt) return null;
            return (
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'API Type', value: opt.sync ? 'Synchronous' : 'Asynchronous' },
                  { label: 'Speed', value: opt.speedLabel },
                  { label: 'Best For', value: opt.bestFor },
                  { label: 'Encryption', value: opt.encryption >= 85 ? 'Built-in' : opt.encryption >= 40 ? 'Optional' : 'None' },
                ].map(item => (
                  <div key={item.label} className={`rounded-xl p-3 border ${isLight ? 'bg-gray-50 border-gray-100' : 'bg-white/3 border-white/6'}`}>
                    <div className={`text-[10px] font-semibold uppercase tracking-widest mb-1 ${isLight ? 'text-gray-400' : 'text-white/30'}`}>{item.label}</div>
                    <div className={`text-sm font-medium ${isLight ? 'text-gray-800' : 'text-white/80'}`}>{item.value}</div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
