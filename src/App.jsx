import { useState } from 'react';
import { useSkillData } from './hooks/useSkillData';
import Home from './components/Home';
import TopBar from './components/TopBar';
import SkillHero from './components/SkillHero';
import SectionCard from './components/SectionCard';
import CodeModal from './components/CodeModal';
import CodePractice from './components/CodePractice';
import Checklist from './components/Checklist';
import PersonalBehavioralSection from './components/PersonalBehavioralSection';
import BehavioralSection from './components/BehavioralSection';
import PrepJournal from './components/PrepJournal';
import TopicDetailPage from './components/TopicDetailPage';
import ScreenPage from './components/ScreenPage';

// Section IDs that have interactive topic detail pages
const DETAIL_PAGE_SECTIONS = new Set([
  'new-arch-complete',
  'storage-types',
  'performance-libraries',
  'deep-linking',
  'app-security',
]);

function AppShell() {
  // Editorial "paper" theme — single light theme, no dark mode.
  const isLight = true;

  const [activeSkill, setActiveSkill] = useState('home');
  const [navContext, setNavContext] = useState(null); // { section?, problemId? }
  const isCodePractice = activeSkill === 'code-practice';
  const isChecklist = activeSkill === 'checklist';
  const isPersonalBehavioral = activeSkill === 'personal-behavioral';
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // { title, code }
  const [activeTopic, setActiveTopic] = useState(null); // { sectionId, topicId }
  const [activeScreen, setActiveScreen] = useState(null); // HTML path for screen pages

  const { data, loading, error, config } = useSkillData(activeSkill);

  const handleSelectSkill = (id, context = null) => {
    setActiveSkill(id);
    setNavContext(context);
    setSearch(context?.searchQuery || '');
    setActiveTopic(null);
    setActiveScreen(null);
  };

  // Navigate to a topic detail page
  const handleOpenTopic = (sectionId, topicId) => {
    setActiveTopic({ sectionId, topicId });
    setActiveScreen(null);
  };

  // Navigate to a full screen page (standalone HTML)
  const handleOpenScreen = (htmlPath) => {
    setActiveScreen(htmlPath);
    setActiveTopic(null);
  };

  // Get sections that have detail pages (for TopicDetailPage nav)
  const detailSections = (data?.sections || []).filter(s => DETAIL_PAGE_SECTIONS.has(s.id));

  const q = search.trim().toLowerCase();

  const allSections = [
    ...(data?.sections || []).map(s => ({ ...s, isSenior: false })),
    ...(data?.seniorSections || []).map(s => ({ ...s, isSenior: true })),
  ];

  const visibleSections = allSections.filter(section =>
    !q || section.topics?.some(t =>
      t.title.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.explanation?.toLowerCase().includes(q)
    )
  );

  const hasSenior = visibleSections.some(s => s.isSenior);
  const hasNonSenior = visibleSections.some(s => !s.isSenior);

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <TopBar
        activeSkill={activeSkill}
        onBackToHome={() => { setNavContext(null); handleSelectSkill('home'); }}
        skillName={isCodePractice ? 'Code Practice' : isChecklist ? 'Topic Checklist' : (data?.skill || '')}
        search={isCodePractice || isChecklist || activeSkill === 'home' ? '' : search}
        onSearch={isCodePractice || isChecklist || activeSkill === 'home' ? () => { } : setSearch}
        isLight={isLight}
        hideSearch={isCodePractice || isChecklist || activeSkill === 'home'}
      />

      <div>
        <main>
          {/* Homepage Hub */}
          {activeSkill === 'home' && (
            <Home onSelectSkill={handleSelectSkill} isLight={isLight} />
          )}

          {/* Code Practice view */}
          {isCodePractice && (
            <div className="max-w-6xl mx-auto px-6">
              <CodePractice isLight={isLight} initialProblemId={navContext?.problemId} />
            </div>
          )}

          {/* Topic Checklist view */}
          {isChecklist && (
            <div className="max-w-6xl mx-auto px-6">
              <Checklist isLight={isLight} initialSection={navContext?.section} />
            </div>
          )}

          {/* Normal skill view */}
          {!isCodePractice && !isChecklist && activeSkill !== 'home' && (
            <div className={activeTopic || activeScreen ? '' : 'max-w-4xl mx-auto px-6 py-8'}>
              {/* Full screen page (e.g. New Architecture) */}
              {activeScreen && (
                <ScreenPage
                  htmlPath={activeScreen}
                  onBack={() => setActiveScreen(null)}
                  isLight={isLight}
                />
              )}
              {/* Loading */}
              {!activeScreen && loading && (
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                  <div className="w-10 h-10 rounded-full border-2 border-blue-400/20 border-t-blue-400 animate-spin" />
                  <p className={`text-sm ${isLight ? 'text-gray-400' : 'text-white/30'}`}>Loading concepts…</p>
                </div>
              )}

              {/* Error */}
              {!activeScreen && error && (
                <div className={`text-center py-32 ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
                  <div className="text-4xl mb-4">⚠️</div>
                  <h3 className="font-semibold mb-1">Could not load data</h3>
                  <p className="text-sm">Make sure <code>data/{activeSkill}.json</code> exists</p>
                </div>
              )}

              {/* Topic Detail Page */}
              {!activeScreen && !loading && !error && data && activeTopic && (() => {
                const section = (data.sections || []).find(s => s.id === activeTopic.sectionId);
                const topic = section?.topics?.find(t => t.id === activeTopic.topicId);
                if (!section || !topic) return null;
                const sectionIndex = detailSections.findIndex(s => s.id === section.id);
                const topicIndex = section.topics.findIndex(t => t.id === topic.id);
                return (
                  <TopicDetailPage
                    topic={topic}
                    section={section}
                    sectionIndex={sectionIndex}
                    topicIndex={topicIndex}
                    allTopicsInSection={section.topics}
                    allSections={detailSections}
                    isLight={isLight}
                    onBack={() => setActiveTopic(null)}
                    onNavigate={(sectionId, topicId) => setActiveTopic({ sectionId, topicId })}
                    onOpenCode={(title, code) => setModal({ title, code })}
                  />
                );
              })()}

              {/* Content */}
              {!activeScreen && !loading && !error && data && !activeTopic && (
                <>
                  <SkillHero data={data} config={config} isLight={isLight} />

                  {/* No search results */}
                  {q && visibleSections.length === 0 && !data?.personalSection && (
                    <div className={`text-center py-20 ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
                      <div className="text-4xl mb-3">🔍</div>
                      <h3 className="font-semibold mb-1">No topics found</h3>
                      <p className="text-sm">Try a different keyword</p>
                    </div>
                  )}

                  {/* Regular sections */}
                  {visibleSections.filter(s => !s.isSenior).map(section => (
                    <SectionCard
                      key={section.id}
                      section={section}
                      isSenior={false}
                      isLight={isLight}
                      onOpenCode={(title, code) => setModal({ title, code })}
                      search={q}
                      activeSkill={activeSkill}
                      onOpenTopic={handleOpenTopic}
                      onOpenScreen={handleOpenScreen}
                    />
                  ))}

                  {/* Senior divider */}
                  {hasSenior && hasNonSenior && (
                    <div className="flex items-center gap-4 my-8">
                      <div className={`flex-1 h-px ${isLight ? 'bg-purple-200' : 'bg-purple-500/20'}`} />
                      <div className={`
                        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border
                        ${isLight ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-purple-500/10 border-purple-500/25 text-purple-300'}
                      `}>
                        🎯 Senior Level
                      </div>
                      <div className={`flex-1 h-px ${isLight ? 'bg-purple-200' : 'bg-purple-500/20'}`} />
                    </div>
                  )}

                  {/* Senior sections */}
                  {visibleSections.filter(s => s.isSenior).map(section => (
                    <SectionCard
                      key={section.id}
                      section={section}
                      isSenior={true}
                      isLight={isLight}
                      onOpenCode={(title, code) => setModal({ title, code })}
                      search={q}
                      activeSkill={activeSkill}
                      onOpenTopic={handleOpenTopic}
                      onOpenScreen={handleOpenScreen}
                    />
                  ))}

                  {/* Personal Behavioral section */}
                  {data?.personalSection && (
                    <PersonalBehavioralSection
                      section={data.personalSection}
                      isLight={isLight}
                      search={q}
                    />
                  )}

                  {/* Behavioral section */}
                  {data?.behavioralSection && (
                    <>
                      {visibleSections.length > 0 && (
                        <div className="flex items-center gap-4 my-8">
                          <div className={`flex-1 h-px ${isLight ? 'bg-amber-200' : 'bg-amber-500/20'}`} />
                          <div className={`
                            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border
                            ${isLight ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-amber-500/10 border-amber-500/25 text-amber-300'}
                          `}>
                            🤝 Behavioral & Situational
                          </div>
                          <div className={`flex-1 h-px ${isLight ? 'bg-amber-200' : 'bg-amber-500/20'}`} />
                        </div>
                      )}
                      <BehavioralSection
                        section={data.behavioralSection}
                        isLight={isLight}
                        search={q}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Code Modal */}
      {modal && (
        <CodeModal
          title={modal.title}
          code={modal.code}
          onClose={() => setModal(null)}
          isLight={isLight}
        />
      )}

      {/* Global Study Notepad / Prep Journal overlay */}
      <PrepJournal isLight={isLight} />
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
