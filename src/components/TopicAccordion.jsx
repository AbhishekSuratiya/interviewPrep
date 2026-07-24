import { useState } from 'react';
import { ReadAloudPlayer } from './ReadAloudPlayer';

export default function TopicAccordion({ topic, index, isLight, onOpenCode }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="transition-all duration-200 overflow-hidden"
      style={{
        borderRadius: 12,
        border: `1px solid ${open ? 'var(--accent)' : 'var(--line)'}`,
        background: 'var(--paper-2)',
      }}
    >
      {/* Trigger */}
      <button
        className="w-full flex items-center gap-4 px-5 py-4 text-left group"
        onClick={() => setOpen(o => !o)}
      >
        <span
          className="w-7 h-7 flex items-center justify-center text-xs flex-shrink-0 transition-colors"
          style={{
            fontFamily: 'var(--mono)',
            borderRadius: 8,
            background: open ? 'var(--accent)' : 'var(--paper)',
            border: '1px solid var(--line)',
            color: open ? '#fff' : 'var(--slate)',
          }}
        >
          {index + 1}
        </span>

        <div className="flex-1 min-w-0">
          <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: '.98rem', color: 'var(--ink)' }}>
            {topic.title}
          </div>
          <div className="text-[13px] truncate" style={{ color: 'var(--slate)' }}>
            {topic.summary}
          </div>
        </div>

        <span
          className={`text-base flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          style={{ color: 'var(--slate)' }}
        >
          ▾
        </span>
      </button>

      {/* Panel */}
      <div className={`topic-panel ${open ? 'open' : ''}`}>
        <div className="topic-panel-inner">
          <div className="mx-5 mb-5" style={{ borderTop: '1px solid var(--line)' }} />

          <div className="px-5 pb-5 space-y-5">
            {/* Explanation */}
            <div>
              <div className="mb-2" style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                Explanation
              </div>
              <ReadAloudPlayer
                text={topic.explanation}
                isLight={isLight}
                textClassName={isLight ? 'text-gray-700' : 'text-white/70'}
                compact
              />
            </div>

            {/* Analogy */}
            {topic.analogy && (
              <div className={`rounded-xl p-4 border ${isLight ? 'bg-teal-50 border-teal-100' : 'bg-teal-500/5 border-teal-500/15'}`}>
                <div className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>
                  🧠 In Simple Terms
                </div>
                <ReadAloudPlayer
                  text={topic.analogy}
                  isLight={isLight}
                  textClassName={isLight ? 'text-gray-700' : 'text-white/70'}
                  compact
                />
              </div>
            )}

            {/* Key Points */}
            {topic.keyPoints?.length > 0 && (
              <div>
                <div className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isLight ? 'text-green-600' : 'text-green-400'}`}>
                  ⚡ Quick Revision
                </div>
                <ul className="space-y-1.5">
                  {topic.keyPoints.map((point, i) => (
                    <li key={i} className={`flex gap-2 text-sm leading-relaxed ${isLight ? 'text-gray-700' : 'text-white/70'}`}>
                      <span className={`flex-shrink-0 ${isLight ? 'text-green-500' : 'text-green-400'}`}>▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Image */}
            {topic.imageUrl && (
              <div>
                <div className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isLight ? 'text-purple-600' : 'text-purple-400'}`}>
                  Architecture Diagram
                </div>
                <div className={`rounded-xl overflow-hidden border ${isLight ? 'border-gray-200' : 'border-white/8'}`}>
                  <img
                    src={topic.imageUrl}
                    alt={`${topic.title} diagram`}
                    loading="lazy"
                    className="w-full"
                    onError={e => e.currentTarget.closest('div').style.display = 'none'}
                  />
                  {topic.imageCaption && (
                    <p className={`text-xs px-3 py-2 ${isLight ? 'bg-gray-50 text-gray-500' : 'bg-white/3 text-white/40'}`}>
                      {topic.imageCaption}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Code */}
            {topic.code && (
              <div>
                <div className={`rounded-xl overflow-hidden border ${isLight ? 'border-gray-200' : 'border-white/8'}`}>
                  <div className={`flex items-center justify-between px-4 py-2.5 border-b ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-white/3 border-white/6'}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
                      </div>
                      <span className={`text-xs ${isLight ? 'text-gray-400' : 'text-white/30'}`}>JavaScript</span>
                    </div>
                    <button
                      onClick={() => onOpenCode(topic.title, topic.code)}
                      className={`
                        text-xs px-3 py-1 rounded-lg font-medium transition-colors duration-200
                        ${isLight
                          ? 'text-blue-600 hover:bg-blue-50 border border-blue-200'
                          : 'text-blue-400 hover:bg-blue-400/10 border border-blue-400/20'}
                      `}
                    >
                      ⤢ Expand
                    </button>
                  </div>
                  <div className={`p-4 overflow-auto max-h-72 ${isLight ? 'bg-gray-50' : 'bg-[#0d0d0d]'}`}>
                    <pre className={`text-xs leading-relaxed ${isLight ? 'text-gray-800' : 'text-[#e2e8f0]'}`}>{topic.code}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* Situations */}
            {topic.situations?.length > 0 && (
              <div>
                <div className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isLight ? 'text-orange-600' : 'text-orange-400'}`}>
                  🔥 Senior Dev Situations
                </div>
                <div className="space-y-3">
                  {topic.situations.map((s, i) => (
                    <div
                      key={i}
                      className={`rounded-xl p-4 border ${isLight ? 'bg-orange-50 border-orange-100' : 'bg-orange-500/5 border-orange-500/15'}`}
                    >
                      <div className={`flex gap-2 text-sm font-medium mb-2 ${isLight ? 'text-gray-800' : 'text-white/80'}`}>
                        <span className="flex-shrink-0">💬</span>
                        <span>{s.question}</span>
                      </div>
                      <div className="pl-6">
                        <ReadAloudPlayer
                          text={s.answer}
                          isLight={isLight}
                          textClassName={isLight ? 'text-gray-600' : 'text-white/60'}
                          compact
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
