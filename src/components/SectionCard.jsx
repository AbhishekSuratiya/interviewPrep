import TopicAccordion from './TopicAccordion';

// Sections that have a dedicated full-screen HTML page
const SCREEN_SECTIONS = {
  'new-arch-complete': '/src/screens/react-native-architecture.html',
  'storage-types': '/src/screens/react-native-storage.html',
  'performance-libraries': '/src/screens/react-native-performance.html',
  'deep-linking': '/src/screens/react-native-deep-linking.html',
  'app-security': '/src/screens/react-native-security.html',
  'navigation-advanced': '/src/screens/react-native-navigation.html',
  'rn-performance': '/src/screens/react-native-optimization.html',
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
  const screenPath = isRN ? SCREEN_SECTIONS[section.id] : null;
  const hasDetailPages = isRN && DETAIL_PAGE_SECTIONS.has(section.id);

  return (
    <div className={`
      rounded-2xl border mb-6 overflow-hidden
      ${isLight
        ? isSenior ? 'border-purple-200 bg-white' : 'border-gray-200 bg-white'
        : isSenior ? 'border-purple-500/15 bg-[#141414]' : 'border-white/6 bg-[#111111]'}
    `}>
      {/* Section header — clickable if it has a screen page */}
      {screenPath ? (
        <button
          onClick={() => onOpenScreen && onOpenScreen(screenPath)}
          className={`
            w-full flex items-center gap-3 px-6 py-4 border-b text-left group transition-colors
            ${isLight
              ? 'bg-gray-50 border-gray-100 hover:bg-blue-50'
              : 'bg-white/2 border-white/6 hover:bg-white/[0.04]'}
          `}
        >
          <span className="text-xl">{section.emoji}</span>
          <h2 className={`font-semibold flex-1 ${isLight ? 'text-gray-900' : 'text-white/90'}`}>
            {section.title}
          </h2>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium
            ${isLight ? 'bg-white border border-gray-200 text-gray-500' : 'bg-white/6 border border-white/8 text-white/40'}
          `}>
            {filtered.length} topic{filtered.length !== 1 ? 's' : ''}
          </span>
          <span className={`
            text-xs flex-shrink-0 px-3 py-1.5 rounded-lg font-medium transition-all duration-200
            ${isLight
              ? 'text-blue-600 bg-blue-50 border border-blue-200 opacity-70 group-hover:opacity-100'
              : 'text-blue-400 bg-blue-500/10 border border-blue-400/20 opacity-70 group-hover:opacity-100'}
          `}>
            Open Full Page →
          </span>
        </button>
      ) : (
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
      )}

      {/* Topics — for screen sections, show a summary list; for detail sections, show clickable cards */}
      <div className="p-4 space-y-2">
        {filtered.map((topic, i) => (
          screenPath ? (
            /* Summary list for screen-page sections — clicking any topic opens the section page */
            <button
              key={topic.id}
              onClick={() => onOpenScreen && onOpenScreen(screenPath)}
              className={`
                w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors group
                ${isLight ? 'text-gray-600 hover:bg-blue-50/60 hover:text-blue-600' : 'text-white/50 hover:bg-white/5 hover:text-white/80'}
              `}
            >
              <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-colors
                ${isLight ? 'bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600' : 'bg-white/5 text-white/25 group-hover:bg-blue-500/20 group-hover:text-blue-400'}
              `}>{i + 1}</span>
              <span className="text-xs truncate flex-1">{topic.title}</span>
              <span className={`text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>
                Open Page →
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
