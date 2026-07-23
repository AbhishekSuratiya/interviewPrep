import { useState } from 'react';

const PIPELINE_STAGES = [
  { id: 'js', label: 'JS Thread', sub: 'Hermes Engine', icon: '⚡', color: '#facc15', detail: 'Your JSX runs here. Hermes compiles to bytecode AOT for fast startup.' },
  { id: 'jsi', label: 'JSI', sub: 'C++ Interface', icon: '🔗', color: '#60a5fa', detail: 'Direct C++ binding — no JSON, no async queue. Synchronous calls.' },
  { id: 'fabric', label: 'Fabric', sub: 'Shadow Tree', icon: '🎨', color: '#a78bfa', detail: 'Concurrent renderer with priority lanes. Shares C++ shadow tree.' },
  { id: 'yoga', label: 'Yoga', sub: 'Layout Engine', icon: '📐', color: '#34d399', detail: 'C++ Flexbox engine. Calculates layout off the main thread.' },
  { id: 'ui', label: 'UI Thread', sub: 'Native Paint', icon: '📱', color: '#f472b6', detail: 'Final native rendering. GPU composition at 60–120fps.' },
];

const OLD_VS_NEW = [
  { aspect: 'Communication', old: 'Async JSON Bridge', new_: 'Synchronous JSI (C++)' },
  { aspect: 'Serialization', old: 'JSON.stringify/parse', new_: 'Direct object references' },
  { aspect: 'Module Loading', old: 'All at startup (eager)', new_: 'Lazy via TurboModules' },
  { aspect: 'Rendering', old: 'Sequential UIManager', new_: 'Concurrent Fabric' },
  { aspect: 'Layout', old: 'Async bridge to Yoga', new_: 'Shared C++ shadow tree' },
  { aspect: 'Priority', old: 'FIFO queue', new_: 'Priority lanes (input > animation > data)' },
];

export default function ArchitecturePipeline({ isLight, topicId }) {
  const [activeStage, setActiveStage] = useState(null);
  const [showOldNew, setShowOldNew] = useState(false);

  // Show the full pipeline for overview topics, simpler view for specific topics
  const isOverview = ['complete-flow', 'new-arch-deep-dive'].includes(topicId);
  const isJSI = topicId === 'jsi-detail';
  const isFabric = topicId === 'fabric-detail';
  const isTurbo = topicId === 'turbomodules-detail';
  const isHermes = topicId === 'hermes-engine';
  const isYoga = topicId === 'yoga-layout';

  // Highlight relevant stages
  const highlightIds = isJSI ? ['js', 'jsi']
    : isFabric ? ['fabric', 'yoga', 'ui']
    : isTurbo ? ['js', 'jsi']
    : isHermes ? ['js']
    : isYoga ? ['yoga']
    : null; // show all for overview

  return (
    <div className="space-y-6">
      {/* Pipeline Flow Diagram */}
      <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
        <h3 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`}>
          ⚙️ Execution Pipeline
        </h3>

        {/* Horizontal pipeline */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {PIPELINE_STAGES.map((stage, i) => {
            const isHighlighted = !highlightIds || highlightIds.includes(stage.id);
            const isActive = activeStage === stage.id;
            return (
              <div key={stage.id} className="flex items-center flex-shrink-0">
                {/* Stage node */}
                <button
                  onClick={() => setActiveStage(isActive ? null : stage.id)}
                  className={`
                    relative flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer
                    ${isActive ? 'scale-105' : 'hover:scale-[1.02]'}
                    ${!isHighlighted ? 'opacity-30' : ''}
                  `}
                  style={{
                    borderColor: isActive ? stage.color : isHighlighted ? `${stage.color}40` : 'transparent',
                    background: isActive
                      ? (isLight ? `${stage.color}15` : `${stage.color}12`)
                      : (isLight ? 'white' : 'transparent'),
                    boxShadow: isActive ? `0 0 20px ${stage.color}25` : 'none',
                  }}
                >
                  <span className="text-2xl">{stage.icon}</span>
                  <span className={`text-xs font-bold whitespace-nowrap ${isLight ? 'text-gray-800' : 'text-white/90'}`}>{stage.label}</span>
                  <span className={`text-[10px] whitespace-nowrap ${isLight ? 'text-gray-400' : 'text-white/35'}`}>{stage.sub}</span>

                  {/* Active glow ring */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-xl node-glow pointer-events-none"
                      style={{ color: stage.color }}
                    />
                  )}
                </button>

                {/* Arrow between stages */}
                {i < PIPELINE_STAGES.length - 1 && (
                  <div className="flex items-center px-1">
                    <svg width="32" height="16" viewBox="0 0 32 16" className="flex-shrink-0">
                      <line
                        x1="0" y1="8" x2="24" y2="8"
                        className="dash-flow"
                        stroke={isLight ? '#94a3b8' : 'rgba(255,255,255,0.2)'}
                        strokeWidth="2"
                      />
                      <polygon
                        points="24,3 32,8 24,13"
                        fill={isLight ? '#94a3b8' : 'rgba(255,255,255,0.25)'}
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Stage detail tooltip */}
        {activeStage && (
          <div
            className={`mt-4 rounded-xl p-4 border fade-in-up ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-white/[0.04] border-white/8'}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{PIPELINE_STAGES.find(s => s.id === activeStage)?.icon}</span>
              <span className={`font-semibold text-sm ${isLight ? 'text-gray-800' : 'text-white/90'}`}>
                {PIPELINE_STAGES.find(s => s.id === activeStage)?.label}
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-white/60'}`}>
              {PIPELINE_STAGES.find(s => s.id === activeStage)?.detail}
            </p>
          </div>
        )}
      </div>

      {/* Threading model diagram (for overview topics) */}
      {isOverview && (
        <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isLight ? 'text-purple-600' : 'text-purple-400'}`}>
            🧵 Threading Model — 4 Threads
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'JS Thread', desc: 'Your logic + JSX (Hermes)', color: '#facc15', icon: '💛' },
              { name: 'Render Thread', desc: 'Fabric sync (Shadow Tree)', color: '#a78bfa', icon: '💜' },
              { name: 'Background Thread', desc: 'Yoga layout calc (C++)', color: '#34d399', icon: '💚' },
              { name: 'UI Thread', desc: 'Native paint → GPU', color: '#f472b6', icon: '💗' },
            ].map((thread, i) => (
              <div
                key={thread.name}
                className="fade-in-up rounded-xl p-4 border"
                style={{
                  animationDelay: `${i * 100}ms`,
                  borderColor: `${thread.color}30`,
                  background: isLight ? `${thread.color}08` : `${thread.color}08`,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{thread.icon}</span>
                  <span className={`text-xs font-bold ${isLight ? 'text-gray-800' : 'text-white/90'}`}>{thread.name}</span>
                </div>
                <p className={`text-[11px] ${isLight ? 'text-gray-500' : 'text-white/45'}`}>{thread.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Old vs New Architecture comparison */}
      {isOverview && (
        <div className={`rounded-2xl border overflow-hidden ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
          <button
            onClick={() => setShowOldNew(o => !o)}
            className={`w-full flex items-center justify-between px-6 py-4 border-b transition-colors ${isLight ? 'border-gray-100 hover:bg-gray-50' : 'border-white/6 hover:bg-white/[0.02]'}`}
          >
            <h3 className={`text-sm font-semibold uppercase tracking-widest ${isLight ? 'text-orange-600' : 'text-orange-400'}`}>
              🔄 Old Architecture vs New Architecture
            </h3>
            <span className={`text-sm transition-transform duration-300 ${showOldNew ? 'rotate-180' : ''} ${isLight ? 'text-gray-400' : 'text-white/30'}`}>▾</span>
          </button>

          <div className={`quiz-answer ${showOldNew ? 'open' : ''}`}>
            <div className="quiz-answer-inner">
              <div className="p-4">
                <div className="space-y-2">
                  {OLD_VS_NEW.map((row, i) => (
                    <div
                      key={row.aspect}
                      className="fade-in-up grid grid-cols-[100px_1fr_1fr] gap-2 text-xs"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <span className={`font-semibold py-2 ${isLight ? 'text-gray-700' : 'text-white/70'}`}>{row.aspect}</span>
                      <span className={`rounded-lg px-3 py-2 ${isLight ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-red-500/8 text-red-400 border border-red-500/15'}`}>
                        ❌ {row.old}
                      </span>
                      <span className={`rounded-lg px-3 py-2 ${isLight ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-green-500/8 text-green-400 border border-green-500/15'}`}>
                        ✅ {row.new_}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hermes-specific: AOT compilation diagram */}
      {isHermes && (
        <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>
            ⏱️ Hermes AOT Compilation
          </h3>
          <div className="space-y-3">
            {[
              { step: 'Build Time', detail: 'JS → Hermes bytecode (.hbc)', icon: '🔨', pct: 100 },
              { step: 'Bundle Size', detail: 'Bytecode more compact than source', icon: '📦', pct: 70 },
              { step: 'Startup Time', detail: '30–50% faster (no parsing)', icon: '🚀', pct: 50 },
              { step: 'Memory Usage', detail: '~30% less vs JSC', icon: '💾', pct: 70 },
            ].map((item, i) => (
              <div key={item.step} className="fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold ${isLight ? 'text-gray-700' : 'text-white/70'}`}>
                    {item.icon} {item.step}
                  </span>
                  <span className={`text-[10px] ${isLight ? 'text-gray-400' : 'text-white/35'}`}>{item.detail}</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${isLight ? 'bg-gray-100' : 'bg-white/6'}`}>
                  <div
                    className="bar-grow h-full rounded-full"
                    style={{
                      width: `${item.pct}%`,
                      background: `linear-gradient(90deg, #facc15, #f59e0b)`,
                      animationDelay: `${i * 150}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TurboModules: Lazy loading visual */}
      {isTurbo && (
        <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`}>
            📦 Eager Loading vs Lazy Loading
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Old arch */}
            <div className={`rounded-xl p-4 border ${isLight ? 'border-red-200 bg-red-50' : 'border-red-500/15 bg-red-500/5'}`}>
              <div className={`text-xs font-bold mb-3 ${isLight ? 'text-red-700' : 'text-red-400'}`}>❌ Old: Eager (All at startup)</div>
              <div className="grid grid-cols-3 gap-1.5">
                {['Camera', 'BT', 'GPS', 'Contacts', 'NFC', 'Audio'].map(m => (
                  <div key={m} className={`text-[10px] px-2 py-1.5 rounded text-center font-medium ${isLight ? 'bg-red-100 text-red-600' : 'bg-red-500/15 text-red-400'}`}>
                    {m}
                  </div>
                ))}
              </div>
              <p className={`text-[10px] mt-2 ${isLight ? 'text-red-500' : 'text-red-400/60'}`}>All 6 init at startup — even if unused</p>
            </div>
            {/* New arch */}
            <div className={`rounded-xl p-4 border ${isLight ? 'border-green-200 bg-green-50' : 'border-green-500/15 bg-green-500/5'}`}>
              <div className={`text-xs font-bold mb-3 ${isLight ? 'text-green-700' : 'text-green-400'}`}>✅ New: Lazy (On demand)</div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { n: 'Camera', active: true }, { n: 'BT', active: false }, { n: 'GPS', active: true },
                  { n: 'Contacts', active: false }, { n: 'NFC', active: false }, { n: 'Audio', active: false },
                ].map(m => (
                  <div key={m.n} className={`text-[10px] px-2 py-1.5 rounded text-center font-medium ${m.active
                    ? (isLight ? 'bg-green-200 text-green-700' : 'bg-green-500/25 text-green-400')
                    : (isLight ? 'bg-gray-100 text-gray-400' : 'bg-white/5 text-white/25')
                  }`}>
                    {m.n}
                  </div>
                ))}
              </div>
              <p className={`text-[10px] mt-2 ${isLight ? 'text-green-600' : 'text-green-400/60'}`}>Only 2 loaded — the ones actually used</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
