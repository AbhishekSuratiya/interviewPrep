import TopicAccordion from './TopicAccordion';

// Sections that have a dedicated full-screen HTML page
const SCREEN_SECTIONS = {
  'react-internals-architecture': '/src/screens/react-internals-architecture.html',
  'new-arch-complete': '/src/screens/react-native-architecture.html',
  'storage-types': '/src/screens/react-native-storage.html',
  'performance-libraries': '/src/screens/react-native-performance.html',
  'deep-linking': '/src/screens/react-native-deep-linking.html',
  'app-security': '/src/screens/react-native-security.html',
  'navigation-advanced': '/src/screens/react-native-navigation.html',
  'rn-ci-cd': '/src/screens/react-native-cicd.html',
  'offline-first': '/src/screens/react-native-offline.html',
  'native-modules-advanced': '/src/screens/react-native-modules.html',
  'monorepo-architecture': '/src/screens/react-native-monorepo.html',
  'rn-testing-advanced': '/src/screens/react-native-testing.html',
  'rn-observability': '/src/screens/react-native-observability.html',
};

const DETAIL_PAGE_SECTIONS = new Set([]);

export default function SectionCard({ section, isSenior, isLight, onOpenCode, search, activeSkill, onOpenTopic, onOpenScreen }) {
  const filtered = search
    ? section.topics.filter(t =>
        t.title.toLowerCase().includes(search) ||
        t.summary.toLowerCase().includes(search) ||
        t.explanation?.toLowerCase().includes(search)
      )
    : section.topics;

  if (filtered.length === 0) return null;

  const isRN = activeSkill === 'react-native';
  const screenPath = SCREEN_SECTIONS[section.id];
  const hasDetailPages = isRN && DETAIL_PAGE_SECTIONS.has(section.id);

  const countPill = (
    <span
      className="text-[11px] px-2.5 py-1 rounded-full"
      style={{ fontFamily: 'var(--mono)', letterSpacing: '.06em', border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--slate)' }}
    >
      {filtered.length} topic{filtered.length !== 1 ? 's' : ''}
    </span>
  );

  return (
    <div
      className="mb-6 overflow-hidden"
      style={{ border: '1px solid var(--line)', borderRadius: 14, background: 'var(--paper-2)' }}
    >
      {/* Section header — clickable if it has a screen page */}
      {screenPath ? (
        <button
          onClick={() => onOpenScreen && onOpenScreen(screenPath)}
          className="w-full flex flex-wrap items-center gap-x-3 gap-y-3 px-5 sm:px-6 py-4 text-left group transition-colors"
          style={{ borderBottom: '1px solid var(--line)', background: 'var(--line-2)' }}
        >
          {/* Title block — full width on mobile, shares the row on larger screens */}
          <div className="flex items-center gap-3 min-w-0 basis-full sm:basis-auto sm:flex-1">
            <span className="text-xl flex-shrink-0">{section.emoji}</span>
            <h2 className="min-w-0" style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--ink)' }}>
              {section.title}
            </h2>
          </div>
          {/* Meta — wraps onto its own row on mobile */}
          <div className="flex items-center gap-2 flex-wrap">
            {countPill}
            <span
              className="text-xs flex-shrink-0 px-3 py-1.5 rounded-full font-medium transition-all"
              style={{ fontFamily: 'var(--mono)', letterSpacing: '.04em', color: 'var(--modern)', background: 'var(--modern-bg)', border: '1px solid var(--modern)' }}
            >
              Open full page →
            </span>
          </div>
        </button>
      ) : (
        <div
          className="flex flex-wrap items-center gap-x-3 gap-y-3 px-5 sm:px-6 py-4"
          style={{ borderBottom: '1px solid var(--line)', background: 'var(--line-2)' }}
        >
          <div className="flex items-center gap-3 min-w-0 basis-full sm:basis-auto sm:flex-1">
            <span className="text-xl flex-shrink-0">{section.emoji}</span>
            <h2 className="min-w-0" style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--ink)' }}>
              {section.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {countPill}
            {isSenior && (
              <span
                className="text-[11px] px-2.5 py-1 rounded-full"
                style={{ fontFamily: 'var(--mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--legacy)', background: 'var(--legacy-bg)' }}
              >
                Senior
              </span>
            )}
          </div>
        </div>
      )}

      {/* Topics — for screen sections, show a summary list; for detail sections, show clickable cards */}
      <div className="p-4 space-y-2">
        {filtered.map((topic, i) => (
          screenPath ? (
            /* Summary list for screen-page sections — clicking any topic opens the section page */
            <button
              key={topic.id}
              onClick={() => onOpenScreen && onOpenScreen(screenPath)}
              className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors group hover:bg-[var(--line-2)]"
              style={{ color: 'var(--slate)' }}
            >
              <span
                className="w-5 h-5 rounded flex items-center justify-center text-[10px] flex-shrink-0"
                style={{ fontFamily: 'var(--mono)', background: 'var(--paper)', border: '1px solid var(--line)', color: 'var(--slate)' }}
              >{i + 1}</span>
              <span className="text-sm truncate flex-1">{topic.title}</span>
              {/* Hover affordance is pointless on touch — hide it so titles get the width */}
              <span className="hidden sm:inline text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: 'var(--mono)', color: 'var(--modern)' }}>
                Open page →
              </span>
            </button>
          ) : hasDetailPages ? (
            /* Interactive topic card — navigates to detail page */
            <button
              key={topic.id}
              onClick={() => onOpenTopic && onOpenTopic(section.id, topic.id)}
              className={`
                w-full text-left flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-200 group
                ${isLight
                  ? 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5'
                  : 'border-white/6 bg-white/2 hover:border-white/12 hover:bg-white/[0.04]'}
              `}
            >
              <span className={`
                w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0
                transition-colors duration-200
                ${isLight
                  ? 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                  : 'bg-white/6 text-white/40 group-hover:bg-blue-500/20 group-hover:text-blue-400'}
              `}>
                {i + 1}
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
                text-xs flex-shrink-0 px-2.5 py-1 rounded-lg font-medium transition-all duration-200
                ${isLight
                  ? 'text-blue-500 bg-blue-50 border border-blue-200 opacity-0 group-hover:opacity-100'
                  : 'text-blue-400 bg-blue-500/10 border border-blue-400/20 opacity-0 group-hover:opacity-100'}
              `}>
                Learn →
              </span>
            </button>
          ) : (
            /* Regular accordion for other sections */
            <TopicAccordion
              key={topic.id}
              topic={topic}
              index={i}
              isLight={isLight}
              onOpenCode={onOpenCode}
            />
          )
        ))}
      </div>
    </div>
  );
}
