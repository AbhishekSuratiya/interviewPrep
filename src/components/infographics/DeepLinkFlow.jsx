export default function DeepLinkFlow({ isLight, topicId }) {
  const isOverview = topicId === 'deep-link-types';
  const isUniversal = topicId === 'universal-links';

  const nodeStyle = (color) => ({
    borderColor: `${color}40`,
    background: isLight ? `${color}10` : `${color}0c`,
    boxShadow: `0 0 16px ${color}15`,
  });

  return (
    <div className="space-y-6">
      {/* Deep Link Types Comparison */}
      {isOverview && (
        <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>
            🔗 Deep Link Types Compared
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                type: 'Custom Scheme',
                example: 'myapp://profile/123',
                color: '#f59e0b',
                icon: '🔗',
                pros: ['Easy to implement', 'No server needed'],
                cons: ['Shows warning dialog', 'Fails if app not installed', 'Can be hijacked'],
              },
              {
                type: 'Universal / App Links',
                example: 'https://myapp.com/profile/123',
                color: '#22c55e',
                icon: '🌐',
                pros: ['Falls back to website', 'Cannot be hijacked', 'Best UX'],
                cons: ['Requires server config', 'AASA / assetlinks.json'],
              },
              {
                type: 'Deferred Deep Link',
                example: 'Link → Install → Content',
                color: '#a78bfa',
                icon: '⏳',
                pros: ['Survives install flow', 'Marketing attribution'],
                cons: ['Needs 3rd party (Branch)', 'Complex setup'],
              },
            ].map((link, i) => (
              <div
                key={link.type}
                className="fade-in-up rounded-xl p-4 border-2"
                style={{ ...nodeStyle(link.color), animationDelay: `${i * 120}ms` }}
              >
                <div className="text-2xl mb-2">{link.icon}</div>
                <div className={`text-xs font-bold mb-1 ${isLight ? 'text-gray-800' : 'text-white/90'}`}>{link.type}</div>
                <div className={`text-[10px] font-mono mb-3 px-2 py-1 rounded ${isLight ? 'bg-gray-100 text-gray-500' : 'bg-white/5 text-white/35'}`}>{link.example}</div>
                <div className="space-y-1 mb-2">
                  {link.pros.map(p => (
                    <div key={p} className={`text-[10px] flex items-center gap-1 ${isLight ? 'text-green-600' : 'text-green-400'}`}>
                      <span>✅</span> {p}
                    </div>
                  ))}
                </div>
                <div className="space-y-1">
                  {link.cons.map(c => (
                    <div key={c} className={`text-[10px] flex items-center gap-1 ${isLight ? 'text-red-500' : 'text-red-400'}`}>
                      <span>⚠️</span> {c}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Link Resolution Flow */}
      <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
        <h3 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`}>
          🧭 {isUniversal ? 'Universal/App Link Resolution' : 'Link Resolution Flow'}
        </h3>

        {/* Flow diagram */}
        <div className="flex flex-col items-center gap-2">
          {/* Step 1: User taps link */}
          <div
            className="scale-pop rounded-xl px-5 py-3 border-2 text-center"
            style={nodeStyle('#60a5fa')}
          >
            <span className="text-lg">👆</span>
            <div className={`text-xs font-bold ${isLight ? 'text-gray-800' : 'text-white/90'}`}>User Taps Link</div>
            <div className={`text-[10px] font-mono ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
              {isUniversal ? 'https://myapp.com/profile/123' : 'myapp://profile/123'}
            </div>
          </div>

          {/* Arrow */}
          <svg width="2" height="20"><line x1="1" y1="0" x2="1" y2="20" stroke={isLight ? '#d1d5db' : 'rgba(255,255,255,0.1)'} strokeWidth="2" className="dash-flow" /></svg>

          {/* Step 2: OS checks */}
          <div
            className="scale-pop rounded-xl px-5 py-3 border-2 text-center"
            style={{ ...nodeStyle('#f59e0b'), animationDelay: '100ms' }}
          >
            <span className="text-lg">🔍</span>
            <div className={`text-xs font-bold ${isLight ? 'text-gray-800' : 'text-white/90'}`}>
              {isUniversal ? 'OS Verifies AASA / assetlinks.json' : 'OS Checks Scheme Registry'}
            </div>
          </div>

          {/* Arrow */}
          <svg width="2" height="20"><line x1="1" y1="0" x2="1" y2="20" stroke={isLight ? '#d1d5db' : 'rgba(255,255,255,0.1)'} strokeWidth="2" className="dash-flow" /></svg>

          {/* Branch: App installed? */}
          <div
            className="scale-pop rounded-xl px-5 py-3 border-2 text-center"
            style={{ ...nodeStyle('#a78bfa'), animationDelay: '200ms' }}
          >
            <span className="text-lg">❓</span>
            <div className={`text-xs font-bold ${isLight ? 'text-gray-800' : 'text-white/90'}`}>App Installed?</div>
          </div>

          {/* Two branches */}
          <div className="grid grid-cols-2 gap-6 w-full max-w-md">
            {/* Yes branch */}
            <div className="flex flex-col items-center gap-2">
              <div className={`text-xs font-bold px-3 py-1 rounded-full ${isLight ? 'bg-green-100 text-green-700' : 'bg-green-500/15 text-green-400'}`}>✅ Yes</div>
              <svg width="2" height="16"><line x1="1" y1="0" x2="1" y2="16" stroke={isLight ? '#22c55e' : 'rgba(34,197,94,0.3)'} strokeWidth="2" className="dash-flow" /></svg>
              <div
                className="scale-pop rounded-xl px-4 py-3 border-2 text-center w-full"
                style={{ ...nodeStyle('#22c55e'), animationDelay: '350ms' }}
              >
                <span className="text-lg">📱</span>
                <div className={`text-xs font-bold ${isLight ? 'text-gray-800' : 'text-white/90'}`}>Opens in App</div>
                <div className={`text-[10px] ${isLight ? 'text-gray-400' : 'text-white/30'}`}>React Navigation parses URL → navigates to screen</div>
              </div>
            </div>
            {/* No branch */}
            <div className="flex flex-col items-center gap-2">
              <div className={`text-xs font-bold px-3 py-1 rounded-full ${isLight ? 'bg-red-100 text-red-700' : 'bg-red-500/15 text-red-400'}`}>❌ No</div>
              <svg width="2" height="16"><line x1="1" y1="0" x2="1" y2="16" stroke={isLight ? '#ef4444' : 'rgba(239,68,68,0.3)'} strokeWidth="2" className="dash-flow" /></svg>
              <div
                className="scale-pop rounded-xl px-4 py-3 border-2 text-center w-full"
                style={{ ...nodeStyle(isUniversal ? '#60a5fa' : '#ef4444'), animationDelay: '350ms' }}
              >
                <span className="text-lg">{isUniversal ? '🌐' : '⚠️'}</span>
                <div className={`text-xs font-bold ${isLight ? 'text-gray-800' : 'text-white/90'}`}>
                  {isUniversal ? 'Opens Website' : 'Error / No Handler'}
                </div>
                <div className={`text-[10px] ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
                  {isUniversal ? 'Falls back to https:// web page' : 'Custom scheme fails silently or shows error'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Server config checklist (Universal Links specific) */}
      {isUniversal && (
        <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-5 ${isLight ? 'text-teal-600' : 'text-teal-400'}`}>
            ✅ Setup Checklist
          </h3>
          <div className="space-y-2">
            {[
              { platform: 'iOS', steps: [
                'Host AASA at /.well-known/apple-app-site-association',
                'Add Associated Domains entitlement: applinks:myapp.com',
                'AASA must be served with Content-Type: application/json',
                'No redirects allowed on AASA file path',
              ]},
              { platform: 'Android', steps: [
                'Host assetlinks.json at /.well-known/assetlinks.json',
                'Add intent-filter with autoVerify="true" in Manifest',
                'Include SHA-256 fingerprint of signing key',
                'Verify: adb shell am start -a android.intent.action.VIEW -d "https://..."',
              ]},
            ].map(platform => (
              <div key={platform.platform}>
                <div className={`text-xs font-bold mb-2 ${isLight ? 'text-gray-700' : 'text-white/70'}`}>
                  {platform.platform === 'iOS' ? '🍎' : '🤖'} {platform.platform}
                </div>
                <div className="space-y-1 ml-4 mb-3">
                  {platform.steps.map((step, i) => (
                    <div key={i} className={`flex items-start gap-2 text-xs ${isLight ? 'text-gray-600' : 'text-white/55'}`}>
                      <span className={`flex-shrink-0 ${isLight ? 'text-teal-500' : 'text-teal-400'}`}>▸</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
