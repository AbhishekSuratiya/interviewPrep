import { useState } from 'react';

export default function TopicAccordion({ topic, index, isLight, onOpenCode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`
      rounded-xl border transition-all duration-200 overflow-hidden
      ${isLight
        ? open ? 'border-blue-200 bg-white shadow-sm' : 'border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm'
        : open ? 'border-white/12 bg-white/4' : 'border-white/6 bg-white/2 hover:border-white/10 hover:bg-white/3'}
    `}>
      {/* Trigger */}
      <button
        className="w-full flex items-center gap-4 px-5 py-4 text-left group"
        onClick={() => setOpen(o => !o)}
      >
        <span className={`
          w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0
          transition-colors duration-200
          ${isLight
            ? open ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
            : open ? 'bg-blue-500/20 text-blue-400' : 'bg-white/6 text-white/40'}
        `}>
          {index + 1}
        </span>

        <div className="flex-1 min-w-0">
          <div className={`font-semibold text-sm mb-0.5 ${isLight ? 'text-gray-900' : 'text-white/90'}`}>
            {topic.title}
          </div>
          <div className={`text-xs truncate ${isLight ? 'text-gray-500' : 'text-white/40'}`}>
            {topic.summary}
          </div>
        </div>

        <span className={`
          text-base flex-shrink-0 transition-transform duration-300
          ${open ? 'rotate-180' : ''}
          ${isLight ? 'text-gray-400' : 'text-white/30'}
        `}>
          ▾
        </span>
      </button>

      {/* Panel */}
      <div className={`topic-panel ${open ? 'open' : ''}`}>
        <div className="topic-panel-inner">
          <div className={`mx-5 border-t mb-5 ${isLight ? 'border-gray-100' : 'border-white/6'}`} />

          <div className="px-5 pb-5 space-y-5">
            {/* Explanation */}
            <div>
              <div className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>
                Explanation
              </div>
              <p className={`text-sm leading-relaxed whitespace-pre-line ${isLight ? 'text-gray-700' : 'text-white/70'}`}>
                {topic.explanation}
              </p>
            </div>

            {/* Analogy — plain-language intuition */}
            {topic.analogy && (
              <div className={`rounded-xl p-4 border ${isLight ? 'bg-teal-50 border-teal-100' : 'bg-teal-500/5 border-teal-500/15'}`}>
                <div className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>
                  🧠 In Simple Terms
                </div>
                <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-700' : 'text-white/70'}`}>
                  {topic.analogy}
                </p>
              </div>
            )}

            {/* Key Points — quick revision */}
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
                  {/* Code header */}
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
                  {/* Code body */}
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
                      <p className={`text-sm leading-relaxed pl-6 ${isLight ? 'text-gray-600' : 'text-white/60'}`}>
                        {s.answer}
                      </p>
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
