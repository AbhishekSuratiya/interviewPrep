import { useState, useEffect } from 'react';
import { ReadAloudPlayer } from './ReadAloudPlayer';
import ArchitecturePipeline from './infographics/ArchitecturePipeline';
import StorageComparison from './infographics/StorageComparison';
import PerformanceBenchmark from './infographics/PerformanceBenchmark';
import DeepLinkFlow from './infographics/DeepLinkFlow';
import SecurityLayers from './infographics/SecurityLayers';

// Map section IDs to their infographic component
const SECTION_INFOGRAPHIC = {
  'new-arch-complete': ArchitecturePipeline,
  'storage-types': StorageComparison,
  'performance-libraries': PerformanceBenchmark,
  'deep-linking': DeepLinkFlow,
  'app-security': SecurityLayers,
};

// Section accent colors
const SECTION_COLORS = {
  'new-arch-complete': '#a78bfa',
  'storage-types': '#60a5fa',
  'performance-libraries': '#34d399',
  'deep-linking': '#f59e0b',
  'app-security': '#f472b6',
};

export default function TopicDetailPage({
  topic,
  section,
  sectionIndex,
  topicIndex,
  allTopicsInSection,
  allSections,
  isLight,
  onBack,
  onNavigate,
  onOpenCode,
}) {
  const [revealedSituations, setRevealedSituations] = useState({});
  const [checkedPoints, setCheckedPoints] = useState({});

  // Scroll to top when topic changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [topic.id]);

  const accentColor = SECTION_COLORS[section.id] || '#60a5fa';
  const InfographicComponent = SECTION_INFOGRAPHIC[section.id];

  // Navigation helpers
  const currentIdx = allTopicsInSection.findIndex(t => t.id === topic.id);
  const prevTopic = currentIdx > 0 ? allTopicsInSection[currentIdx - 1] : null;
  const nextTopic = currentIdx < allTopicsInSection.length - 1 ? allTopicsInSection[currentIdx + 1] : null;

  // Get overall topic number across all 5 sections
  let globalIndex = 0;
  let totalTopics = 0;
  for (const sec of allSections) {
    for (const t of sec.topics) {
      totalTopics++;
      if (t.id === topic.id) globalIndex = totalTopics;
    }
  }

  const toggleSituation = (i) => {
    setRevealedSituations(prev => ({ ...prev, [i]: !prev[i] }));
  };

  const togglePoint = (i) => {
    setCheckedPoints(prev => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div className="topic-page-enter max-w-4xl mx-auto px-6 py-8">
      {/* Breadcrumb / Back */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={onBack}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
            ${isLight ? 'text-gray-500 hover:bg-gray-100' : 'text-white/40 hover:bg-white/5'}
          `}
        >
          ← Back to React Native
        </button>
        <span className={`text-xs ${isLight ? 'text-gray-300' : 'text-white/15'}`}>/</span>
        <span className={`text-xs ${isLight ? 'text-gray-400' : 'text-white/30'}`}>{section.emoji} {section.title}</span>
        <span className={`text-xs ${isLight ? 'text-gray-300' : 'text-white/15'}`}>/</span>
        <span className={`text-xs font-medium`} style={{ color: accentColor }}>{topic.title}</span>
      </div>

      {/* Hero */}
      <div
        className="fade-in-up relative rounded-2xl p-8 mb-8 overflow-hidden border"
        style={{
          background: isLight
            ? `linear-gradient(135deg, ${accentColor}08, ${accentColor}04)`
            : `linear-gradient(135deg, ${accentColor}0a, rgba(0,0,0,0))`,
          borderColor: `${accentColor}20`,
        }}
      >
        {/* Glow orb */}
        {!isLight && (
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ background: accentColor }}
          />
        )}

        <div className="relative">
          {/* Topic counter */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{
                background: `${accentColor}18`,
                color: accentColor,
                border: `1px solid ${accentColor}30`,
              }}
            >
              Topic {globalIndex} of {totalTopics}
            </span>
            <span className={`text-xs ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
              {section.emoji} {section.title}
            </span>
          </div>

          <h1 className={`text-2xl font-bold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
            {topic.title}
          </h1>
          <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-500' : 'text-white/50'}`}>
            {topic.summary}
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* 1. Explanation */}
        <div className="fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
            <div className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>
              📖 Detailed Explanation
            </div>
            <ReadAloudPlayer
              text={topic.explanation}
              isLight={isLight}
              textClassName={`text-sm leading-relaxed ${isLight ? 'text-gray-700' : 'text-white/70'}`}
              compact
            />
          </div>
        </div>

        {/* 2. In Simple Terms (Analogy) */}
        {topic.analogy && (
          <div className="fade-in-up" style={{ animationDelay: '200ms' }}>
            <div
              className="rounded-2xl p-6 border"
              style={{
                background: isLight ? '#f0fdfa' : 'rgba(20,184,166,0.04)',
                borderColor: isLight ? '#ccfbf1' : 'rgba(20,184,166,0.12)',
              }}
            >
              <div className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>
                🧠 In Simple Terms
              </div>
              <ReadAloudPlayer
                text={topic.analogy}
                isLight={isLight}
                textClassName={`text-sm leading-relaxed ${isLight ? 'text-gray-700' : 'text-white/70'}`}
                compact
              />
            </div>
          </div>
        )}

        {/* 3. Key Points (interactive checklist) */}
        {topic.keyPoints?.length > 0 && (
          <div className="fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`text-xs font-semibold uppercase tracking-widest ${isLight ? 'text-green-600' : 'text-green-400'}`}>
                  ⚡ Quick Revision — Key Points
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isLight ? 'bg-green-100 text-green-600' : 'bg-green-500/10 text-green-400'}`}>
                  {Object.values(checkedPoints).filter(Boolean).length}/{topic.keyPoints.length} checked
                </span>
              </div>
              <div className="space-y-2">
                {topic.keyPoints.map((point, i) => (
                  <button
                    key={i}
                    onClick={() => togglePoint(i)}
                    className={`
                      w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border transition-all duration-200
                      ${checkedPoints[i]
                        ? (isLight ? 'bg-green-50 border-green-200' : 'bg-green-500/5 border-green-500/15')
                        : (isLight ? 'bg-gray-50 border-gray-100 hover:border-green-200' : 'bg-white/2 border-white/6 hover:border-green-500/20')}
                    `}
                  >
                    <span className={`
                      flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center text-[10px] mt-0.5 transition-all
                      ${checkedPoints[i]
                        ? (isLight ? 'bg-green-500 border-green-500 text-white' : 'bg-green-500 border-green-500 text-white')
                        : (isLight ? 'border-gray-300' : 'border-white/20')}
                    `}>
                      {checkedPoints[i] && '✓'}
                    </span>
                    <span className={`
                      text-sm leading-relaxed transition-all
                      ${checkedPoints[i]
                        ? (isLight ? 'text-gray-500 line-through' : 'text-white/40 line-through')
                        : (isLight ? 'text-gray-700' : 'text-white/70')}
                    `}>
                      {point}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. Infographic */}
        {InfographicComponent && (
          <div className="fade-in-up" style={{ animationDelay: '400ms' }}>
            <InfographicComponent isLight={isLight} topicId={topic.id} />
          </div>
        )}

        {/* 5. Architecture Diagram (image) */}
        {topic.imageUrl && (
          <div className="fade-in-up" style={{ animationDelay: '450ms' }}>
            <div className={`rounded-2xl border overflow-hidden ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
              <div className={`text-xs font-semibold uppercase tracking-widest px-6 pt-5 mb-3 ${isLight ? 'text-purple-600' : 'text-purple-400'}`}>
                🏗️ Architecture Diagram
              </div>
              <div className="px-6 pb-5">
                <div className={`rounded-xl overflow-hidden border ${isLight ? 'border-gray-200' : 'border-white/8'}`}>
                  <img
                    src={topic.imageUrl}
                    alt={`${topic.title} diagram`}
                    loading="lazy"
                    className="w-full"
                    onError={e => e.currentTarget.closest('div').style.display = 'none'}
                  />
                  {topic.imageCaption && (
                    <p className={`text-xs px-4 py-2.5 ${isLight ? 'bg-gray-50 text-gray-500' : 'bg-white/3 text-white/40'}`}>
                      {topic.imageCaption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. Code Example */}
        {topic.code && (
          <div className="fade-in-up" style={{ animationDelay: '500ms' }}>
            <div className={`rounded-2xl border overflow-hidden ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
              <div className={`flex items-center justify-between px-6 py-3 border-b ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-white/3 border-white/6'}`}>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-widest ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
                    💻 Code Example
                  </span>
                </div>
                <button
                  onClick={() => onOpenCode(topic.title, topic.code)}
                  className={`
                    text-xs px-3 py-1.5 rounded-lg font-medium transition-colors
                    ${isLight
                      ? 'text-blue-600 hover:bg-blue-50 border border-blue-200'
                      : 'text-blue-400 hover:bg-blue-400/10 border border-blue-400/20'}
                  `}
                >
                  ⤢ Expand
                </button>
              </div>
              <div className={`p-6 overflow-auto max-h-[500px] ${isLight ? 'bg-gray-50' : 'bg-[#0d0d0d]'}`}>
                <pre className={`text-xs leading-relaxed ${isLight ? 'text-gray-800' : 'text-[#e2e8f0]'}`}>{topic.code}</pre>
              </div>
            </div>
          </div>
        )}

        {/* 7. Senior Dev Situations (Interactive Q&A) */}
        {topic.situations?.length > 0 && (
          <div className="fade-in-up" style={{ animationDelay: '600ms' }}>
            <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'bg-white/[0.03] border-white/8'}`}>
              <div className={`text-xs font-semibold uppercase tracking-widest mb-4 ${isLight ? 'text-orange-600' : 'text-orange-400'}`}>
                🔥 Senior Dev Situations — Test Yourself
              </div>
              <div className="space-y-3">
                {topic.situations.map((s, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border overflow-hidden transition-all duration-300 ${isLight ? 'border-orange-100' : 'border-orange-500/15'}`}
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggleSituation(i)}
                      className={`
                        w-full text-left flex gap-3 px-5 py-4 transition-colors
                        ${isLight ? 'hover:bg-orange-50' : 'hover:bg-orange-500/[0.03]'}
                      `}
                    >
                      <span className="text-lg flex-shrink-0">💬</span>
                      <div className="flex-1">
                        <div className={`text-sm font-medium leading-relaxed ${isLight ? 'text-gray-800' : 'text-white/80'}`}>
                          {s.question}
                        </div>
                        <div className={`text-[10px] mt-1.5 font-medium ${revealedSituations[i]
                          ? (isLight ? 'text-orange-400' : 'text-orange-400/50')
                          : (isLight ? 'text-orange-500' : 'text-orange-400')
                        }`}>
                          {revealedSituations[i] ? '▲ Hide Answer' : '▼ Think about it, then reveal the answer'}
                        </div>
                      </div>
                    </button>

                    {/* Answer (animated reveal) */}
                    <div className={`quiz-answer ${revealedSituations[i] ? 'open' : ''}`}>
                      <div className="quiz-answer-inner">
                        <div className={`px-5 pb-5 pt-2 ml-9 border-t ${isLight ? 'border-orange-100' : 'border-orange-500/10'}`}>
                          <ReadAloudPlayer
                            text={s.answer}
                            isLight={isLight}
                            textClassName={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-white/60'}`}
                            compact
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between mt-10 mb-6">
        {/* Previous */}
        {prevTopic ? (
          <button
            onClick={() => onNavigate(section.id, prevTopic.id)}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200
              ${isLight ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50' : 'border-white/8 hover:border-white/15 hover:bg-white/[0.02]'}
            `}
          >
            <span className={`text-sm ${isLight ? 'text-gray-400' : 'text-white/30'}`}>←</span>
            <div className="text-left">
              <div className={`text-[10px] ${isLight ? 'text-gray-400' : 'text-white/30'}`}>Previous</div>
              <div className={`text-xs font-medium ${isLight ? 'text-gray-700' : 'text-white/70'}`}>{prevTopic.title}</div>
            </div>
          </button>
        ) : <div />}

        {/* Topic dots */}
        <div className="flex gap-1.5">
          {allTopicsInSection.map((t, i) => (
            <button
              key={t.id}
              onClick={() => onNavigate(section.id, t.id)}
              className={`
                w-2 h-2 rounded-full transition-all duration-200
                ${t.id === topic.id
                  ? 'scale-125'
                  : (isLight ? 'bg-gray-200 hover:bg-gray-300' : 'bg-white/10 hover:bg-white/20')}
              `}
              style={t.id === topic.id ? { background: accentColor } : {}}
              title={t.title}
            />
          ))}
        </div>

        {/* Next */}
        {nextTopic ? (
          <button
            onClick={() => onNavigate(section.id, nextTopic.id)}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200
              ${isLight ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50' : 'border-white/8 hover:border-white/15 hover:bg-white/[0.02]'}
            `}
          >
            <div className="text-right">
              <div className={`text-[10px] ${isLight ? 'text-gray-400' : 'text-white/30'}`}>Next</div>
              <div className={`text-xs font-medium ${isLight ? 'text-gray-700' : 'text-white/70'}`}>{nextTopic.title}</div>
            </div>
            <span className={`text-sm ${isLight ? 'text-gray-400' : 'text-white/30'}`}>→</span>
          </button>
        ) : <div />}
      </div>
    </div>
  );
}
