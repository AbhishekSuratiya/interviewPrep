import { useState } from 'react';

function PersonalCard({ q, index, isLight }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`
      rounded-xl border overflow-hidden transition-all duration-200
      ${isLight ? 'border-pink-200 bg-pink-50/40' : 'border-pink-500/15 bg-pink-500/4'}
    `}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`
          w-full flex items-start gap-3 px-5 py-4 text-left transition-colors
          ${isLight ? 'hover:bg-pink-50' : 'hover:bg-pink-500/8'}
        `}
      >
        <span className={`
          flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5
          ${isLight ? 'bg-pink-200 text-pink-800' : 'bg-pink-500/20 text-pink-400'}
        `}>
          {index + 1}
        </span>
        <span className={`flex-1 font-medium text-sm leading-snug ${isLight ? 'text-gray-800' : 'text-white/85'}`}>
          {q.question}
        </span>
        <span className={`flex-shrink-0 text-xs mt-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''} ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
          ▼
        </span>
      </button>

      {open && (
        <div className={`px-5 pb-5 border-t ${isLight ? 'border-pink-200 bg-white' : 'border-pink-500/10 bg-black/10'}`}>
          <div className="mt-4 space-y-3">
            {/* Response Hints */}
            <div className={`rounded-lg p-3 ${isLight ? 'bg-blue-50 border border-blue-100' : 'bg-blue-500/8 border border-blue-500/15'}`}>
              <div className={`text-xs font-semibold uppercase tracking-wide mb-1.5 ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>
                Response Hints
              </div>
              <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-700' : 'text-white/70'}`}>
                {q.response_hints}
              </p>
            </div>

            {/* Feedback */}
            <div className={`rounded-lg p-3 ${isLight ? 'bg-amber-50 border border-amber-100' : 'bg-amber-500/8 border border-amber-500/15'}`}>
              <div className={`text-xs font-semibold uppercase tracking-wide mb-1.5 ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>
                Feedback
              </div>
              <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-700' : 'text-white/70'}`}>
                {q.feedback}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PersonalBehavioralSection({ section, isLight, search }) {
  const filtered = search
    ? section.questions.filter(q =>
        q.question.toLowerCase().includes(search) ||
        q.response_hints.toLowerCase().includes(search) ||
        q.feedback.toLowerCase().includes(search)
      )
    : section.questions;

  if (filtered.length === 0) return null;

  return (
    <div className={`
      rounded-2xl border mb-6 overflow-hidden
      ${isLight ? 'border-pink-200 bg-white' : 'border-pink-500/15 bg-[#141414]'}
    `}>
      {/* Header */}
      <div className={`
        flex items-center gap-3 px-6 py-4 border-b
        ${isLight ? 'bg-pink-50 border-pink-100' : 'bg-pink-500/5 border-pink-500/10'}
      `}>
        <span className="text-xl">{section.emoji}</span>
        <div className="flex-1">
          <h2 className={`font-semibold ${isLight ? 'text-gray-900' : 'text-white/90'}`}>
            {section.title}
          </h2>
          {section.description && (
            <p className={`text-xs mt-0.5 ${isLight ? 'text-gray-500' : 'text-white/40'}`}>
              {section.description}
            </p>
          )}
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium
          ${isLight ? 'bg-white border border-pink-200 text-pink-600' : 'bg-pink-500/15 border border-pink-500/20 text-pink-400'}
        `}>
          {filtered.length} question{filtered.length !== 1 ? 's' : ''}
        </span>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium
          ${isLight ? 'bg-pink-100 text-pink-700' : 'bg-pink-500/15 text-pink-400'}
        `}>
          Personal
        </span>
      </div>

      {/* Questions */}
      <div className="p-4 space-y-2">
        {filtered.map((q, i) => (
          <PersonalCard key={q.id} q={q} index={i} isLight={isLight} />
        ))}
      </div>
    </div>
  );
}
