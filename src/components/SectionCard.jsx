import TopicAccordion from './TopicAccordion';

export default function SectionCard({ section, isSenior, isLight, onOpenCode, search }) {
  const filtered = search
    ? section.topics.filter(t =>
        t.title.toLowerCase().includes(search) ||
        t.summary.toLowerCase().includes(search) ||
        t.explanation?.toLowerCase().includes(search)
      )
    : section.topics;

  if (filtered.length === 0) return null;

  return (
    <div className={`
      rounded-2xl border mb-6 overflow-hidden
      ${isLight
        ? isSenior ? 'border-purple-200 bg-white' : 'border-gray-200 bg-white'
        : isSenior ? 'border-purple-500/15 bg-[#141414]' : 'border-white/6 bg-[#111111]'}
    `}>
      {/* Section header */}
      <div className={`
        flex items-center gap-3 px-6 py-4 border-b
        ${isLight
          ? isSenior ? 'bg-purple-50 border-purple-100' : 'bg-gray-50 border-gray-100'
          : isSenior ? 'bg-purple-500/5 border-purple-500/10' : 'bg-white/2 border-white/6'}
      `}>
        <span className="text-xl">{section.emoji}</span>
        <h2 className={`font-semibold flex-1 ${isLight ? 'text-gray-900' : 'text-white/90'}`}>
          {section.title}
        </h2>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium
          ${isLight ? 'bg-white border border-gray-200 text-gray-500' : 'bg-white/6 border border-white/8 text-white/40'}
        `}>
          {filtered.length} topic{filtered.length !== 1 ? 's' : ''}
        </span>
        {isSenior && (
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium
            ${isLight ? 'bg-purple-100 text-purple-600' : 'bg-purple-500/15 text-purple-400'}
          `}>
            Senior
          </span>
        )}
      </div>

      {/* Topics */}
      <div className="p-4 space-y-2">
        {filtered.map((topic, i) => (
          <TopicAccordion
            key={topic.id}
            topic={topic}
            index={i}
            isLight={isLight}
            onOpenCode={onOpenCode}
          />
        ))}
      </div>
    </div>
  );
}
