import { useState } from 'react';

const SECURITY_LAYERS = [
  { layer: 'Transport', desc: 'SSL/TLS Pinning', icon: '🌐', color: '#60a5fa', detail: 'Pin server certificate or public key. Prevents MITM even with rogue CA.' },
  { layer: 'Storage', desc: 'Keychain + MMKV Encrypted', icon: '🔐', color: '#a78bfa', detail: 'Tokens in Keychain (hardware-backed). Data in encrypted MMKV instances.' },
  { layer: 'Code', desc: 'Obfuscation + Hermes Bytecode', icon: '🔒', color: '#f59e0b', detail: 'ProGuard/R8 on Android. Hermes bytecode harder to reverse than JS source.' },
  { layer: 'Runtime', desc: 'Jailbreak/Root + Tamper Detection', icon: '🛡️', color: '#ef4444', detail: 'Detect jailbreak/root (JailMonkey), anti-debugging, signature verification.' },
];

const SSL_STEPS = [
  { step: 1, client: 'Client Hello', server: '', arrow: 'right', color: '#60a5fa', detail: 'Client sends supported TLS versions, cipher suites' },
  { step: 2, client: '', server: 'Server Hello + Certificate', arrow: 'left', color: '#22c55e', detail: 'Server responds with chosen cipher + its certificate' },
  { step: 3, client: 'Verify Certificate', server: '', arrow: 'none', color: '#f59e0b', detail: '⭐ SSL PINNING: App checks cert matches pinned copy (not just CA chain)' },
  { step: 4, client: 'Key Exchange', server: 'Key Exchange', arrow: 'both', color: '#a78bfa', detail: 'Both sides derive shared session key' },
  { step: 5, client: '🔒 Encrypted Data', server: '🔒 Encrypted Data', arrow: 'both', color: '#22c55e', detail: 'All subsequent traffic encrypted with session key' },
];

const PINNING_TYPES = [
  {
    type: 'Certificate Pinning',
    icon: '📜',
    color: '#f59e0b',
    pros: ['Easier to implement', 'Validates exact cert'],
    cons: ['Breaks on cert rotation', 'Needs app update for new cert'],
  },
  {
    type: 'Public Key Pinning',
    icon: '🔑',
    color: '#22c55e',
    pros: ['Survives cert rotation', 'Pin stays valid longer'],
    cons: ['Slightly more complex', 'Must pin backup key too'],
  },
];

export default function SecurityLayers({ isLight, topicId }) {
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeStep, setActiveStep] = useState(null);

  const isSSL = topicId === 'ssl-pinning';
  const isObfuscation = topicId === 'code-obfuscation';

  return (
    <div className="space-y-6">
      {/* Layered Security Model */}
      <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
        <h3 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isLight ? 'text-rose-600' : 'text-rose-400'}`}>
          🛡️ Defense in Depth — Security Layers
        </h3>
        <div className="space-y-2">
          {SECURITY_LAYERS.map((l, i) => {
            const isActive = activeLayer === l.layer;
            const isRelevant = isSSL ? i === 0 : isObfuscation ? i >= 2 : true;
            return (
              <button
                key={l.layer}
                onClick={() => setActiveLayer(isActive ? null : l.layer)}
                className={`
                  w-full text-left fade-in-up rounded-xl px-4 py-3 border-2 transition-all duration-300
                  ${!isRelevant ? 'opacity-30' : ''}
                  ${isActive ? 'scale-[1.01]' : 'hover:scale-[1.005]'}
                `}
                style={{
                  animationDelay: `${i * 100}ms`,
                  borderColor: isActive ? l.color : `${l.color}25`,
                  background: isActive ? (isLight ? `${l.color}10` : `${l.color}08`) : 'transparent',
                  boxShadow: isActive ? `0 0 20px ${l.color}15` : 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{l.icon}</span>
                  <div className="flex-1">
                    <div className={`text-xs font-bold ${isLight ? 'text-gray-800' : 'text-white/90'}`}>
                      Layer {i + 1}: {l.layer}
                    </div>
                    <div className={`text-[11px] ${isLight ? 'text-gray-500' : 'text-white/45'}`}>{l.desc}</div>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0`}
                    style={{ background: l.color }}
                  />
                </div>
                {isActive && (
                  <p className={`mt-2 text-xs leading-relaxed ml-9 fade-in-up ${isLight ? 'text-gray-600' : 'text-white/55'}`}>
                    {l.detail}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SSL Handshake Diagram */}
      {isSSL && (
        <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>
            🤝 SSL Handshake with Certificate Pinning
          </h3>

          {/* Client / Server headers */}
          <div className="grid grid-cols-[1fr_40px_1fr] gap-0 mb-3 px-2">
            <div className={`text-xs font-bold text-center px-3 py-2 rounded-lg ${isLight ? 'bg-blue-50 text-blue-700' : 'bg-blue-500/10 text-blue-400'}`}>
              📱 Client (App)
            </div>
            <div />
            <div className={`text-xs font-bold text-center px-3 py-2 rounded-lg ${isLight ? 'bg-green-50 text-green-700' : 'bg-green-500/10 text-green-400'}`}>
              🖥️ Server
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-1">
            {SSL_STEPS.map((s, i) => {
              const isActive = activeStep === s.step;
              const isPinStep = s.step === 3;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(isActive ? null : s.step)}
                  className="w-full text-left fade-in-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className={`grid grid-cols-[1fr_40px_1fr] gap-0 px-2 py-2 rounded-xl transition-all ${isActive ? (isLight ? 'bg-gray-50' : 'bg-white/[0.03]') : ''}`}>
                    {/* Client side */}
                    <div className={`text-[11px] text-right pr-2 py-1 ${s.client
                      ? (isPinStep
                        ? (isLight ? 'font-bold text-amber-600' : 'font-bold text-amber-400')
                        : (isLight ? 'text-gray-700' : 'text-white/70'))
                      : ''}`}
                    >
                      {s.client}
                    </div>
                    {/* Arrow */}
                    <div className="flex items-center justify-center">
                      {s.arrow === 'right' && <span className="text-xs" style={{ color: s.color }}>→</span>}
                      {s.arrow === 'left' && <span className="text-xs" style={{ color: s.color }}>←</span>}
                      {s.arrow === 'both' && <span className="text-xs" style={{ color: s.color }}>⇄</span>}
                      {s.arrow === 'none' && <span className="text-xs" style={{ color: s.color }}>⭐</span>}
                    </div>
                    {/* Server side */}
                    <div className={`text-[11px] pl-2 py-1 ${s.server ? (isLight ? 'text-gray-700' : 'text-white/70') : ''}`}>
                      {s.server}
                    </div>
                  </div>
                  {isActive && (
                    <div className={`mx-2 mt-1 mb-2 text-[10px] px-3 py-2 rounded-lg fade-in-up ${
                      isPinStep
                        ? (isLight ? 'bg-amber-50 border border-amber-100 text-amber-700' : 'bg-amber-500/5 border border-amber-500/15 text-amber-400')
                        : (isLight ? 'bg-gray-50 text-gray-500' : 'bg-white/4 text-white/40')
                    }`}>
                      {s.detail}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Certificate vs Public Key Pinning */}
      {isSSL && (
        <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isLight ? 'text-violet-600' : 'text-violet-400'}`}>
            📜 vs 🔑 Pinning Type Comparison
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {PINNING_TYPES.map((pin, i) => (
              <div
                key={pin.type}
                className="fade-in-up rounded-xl p-4 border-2"
                style={{
                  borderColor: `${pin.color}30`,
                  background: isLight ? `${pin.color}05` : `${pin.color}05`,
                  animationDelay: `${i * 120}ms`,
                }}
              >
                <div className="text-2xl mb-2">{pin.icon}</div>
                <div className={`text-xs font-bold mb-3 ${isLight ? 'text-gray-800' : 'text-white/90'}`}>{pin.type}</div>
                <div className="space-y-1 mb-2">
                  {pin.pros.map(p => (
                    <div key={p} className={`text-[10px] flex items-start gap-1 ${isLight ? 'text-green-600' : 'text-green-400'}`}>
                      <span className="flex-shrink-0">✅</span> {p}
                    </div>
                  ))}
                </div>
                <div className="space-y-1">
                  {pin.cons.map(c => (
                    <div key={c} className={`text-[10px] flex items-start gap-1 ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>
                      <span className="flex-shrink-0">⚠️</span> {c}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Obfuscation Layers */}
      {isObfuscation && (
        <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isLight ? 'text-orange-600' : 'text-orange-400'}`}>
            🔒 Obfuscation & Protection Stack
          </h3>
          <div className="space-y-3">
            {[
              { level: 'Build Time', items: ['Hermes AOT bytecode (harder to read)', 'ProGuard/R8 minification + obfuscation'], icon: '🔨', color: '#f59e0b' },
              { level: 'Runtime', items: ['Jailbreak/Root detection (JailMonkey)', 'Anti-debugging checks', 'App signature verification'], icon: '🛡️', color: '#ef4444' },
              { level: 'Server-Side', items: ['Keep sensitive logic on server', 'Short-lived tokens', 'Rate limiting + anomaly detection'], icon: '☁️', color: '#60a5fa' },
            ].map((group, i) => (
              <div
                key={group.level}
                className="fade-in-up rounded-xl p-4 border"
                style={{
                  borderColor: `${group.color}25`,
                  background: isLight ? `${group.color}05` : `${group.color}05`,
                  animationDelay: `${i * 120}ms`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{group.icon}</span>
                  <span className={`text-xs font-bold ${isLight ? 'text-gray-800' : 'text-white/90'}`}>{group.level}</span>
                </div>
                <div className="space-y-1 ml-7">
                  {group.items.map(item => (
                    <div key={item} className={`text-[11px] flex items-start gap-1.5 ${isLight ? 'text-gray-600' : 'text-white/55'}`}>
                      <span className="flex-shrink-0" style={{ color: group.color }}>▸</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Key reminder */}
          <div className={`mt-4 rounded-xl p-3 border text-xs ${isLight ? 'bg-rose-50 border-rose-100 text-rose-700' : 'bg-rose-500/5 border-rose-500/15 text-rose-400'}`}>
            🚨 <strong>Remember:</strong> Client-side protection only raises the bar — it doesn't make apps unbreakable. Always keep truly sensitive logic on the server.
          </div>
        </div>
      )}
    </div>
  );
}
