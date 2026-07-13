import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchIndex, RESULT_ICONS } from '../hooks/useSearchIndex';

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const SKILLS_METADATA = [
  {
    id: 'javascript',
    title: 'JavaScript',
    category: 'Core Concepts',
    color: '#facc15',
    iconUrl: `${DEVICON_BASE}/javascript/javascript-original.svg`,
    description: 'Master core language internals: execution context, event loop, closures, scopes, memory management, and asynchronous control flow.',
    stats: '16 Sections • 36 Topics',
    badge: 'Core Concept'
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    category: 'Core Concepts',
    color: '#3b82f6',
    iconUrl: `${DEVICON_BASE}/typescript/typescript-original.svg`,
    description: 'Strengthen type safety: generic interfaces, utility types, conditional types, mapped types, declaration merging, and tsconfig settings.',
    stats: '6 Sections • 14 Topics',
    badge: 'Core Concept'
  },
  {
    id: 'react',
    title: 'React',
    category: 'Core Concepts',
    color: '#60a5fa',
    iconUrl: `${DEVICON_BASE}/react/react-original.svg`,
    description: 'Master React internals: functional hooks, fiber architecture, concurrent rendering, virtual DOM, and performance tuning.',
    stats: '11 Sections • 24 Topics',
    badge: 'Framework'
  },
  {
    id: 'react-native',
    title: 'React Native',
    category: 'Core Concepts',
    color: '#a78bfa',
    iconUrl: `${DEVICON_BASE}/react/react-original.svg`,
    isReactNative: true,
    description: 'Build native cross-platform mobile apps: bridge and JSI systems, gesture handling, thread model, and native module integration.',
    stats: '9 Sections • 22 Topics',
    badge: 'Mobile'
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    category: 'Core Concepts',
    color: '#68a063',
    iconUrl: `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
    description: 'Master the runtime: event loop internals, streams & backpressure, Express middleware pipelines, and production-grade Node engineering.',
    stats: '5 Sections • 22 Topics',
    badge: 'Hot Topic'
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    category: 'Core Concepts',
    color: '#22d3ee',
    emoji: '🤖',
    description: 'Understand ML fundamentals, neural networks & Transformers, LLM prompt engineering, RAG, and building production AI features.',
    stats: '5 Sections • 22 Topics',
    badge: 'Hot Topic'
  },
  {
    id: 'senior',
    title: 'Senior Topics',
    category: 'Architecture',
    color: '#f59e0b',
    emoji: '🎯',
    description: 'Advance to software architect/senior levels: design patterns (Proxy, Observer, Strategy), memory profiling, web workers, and scaling.',
    stats: '7 Sections • 15 Topics',
    badge: 'Advanced'
  },
  {
    id: 'personal-behavioral',
    title: 'My Personal',
    category: 'Architecture',
    color: '#ec4899',
    emoji: '👤',
    description: 'Prepare your personal professional stories: achievements, project highlights, and custom STAR-format answers for managerial rounds.',
    stats: 'Personal Behavioral Prep',
    badge: 'Custom'
  },
  {
    id: 'code-practice',
    title: 'Code Practice',
    category: 'Interactive Practice',
    color: '#34d399',
    isCodePractice: true,
    description: 'Hone your hands-on coding skills: solve data structures, algorithms, and frontend challenges inside an integrated compiler.',
    stats: 'Interactive Playground',
    badge: 'Hands-on'
  },
  {
    id: 'checklist',
    title: 'Topic Checklist',
    category: 'Interactive Practice',
    color: '#f472b6',
    isChecklist: true,
    description: 'Track your interview readiness: interactive checklists and question banks spanning all core categories to test your knowledge.',
    stats: 'Progress Tracker',
    badge: 'Readiness'
  }
];

const REACT_NATIVE_FILTER = 'invert(60%) sepia(80%) saturate(400%) hue-rotate(220deg) brightness(110%)';

// SVGs to match TopBar/Sidebar styles
function CodePracticeIcon({ size = 32, color = '#34d399' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" opacity="0.5" />
    </svg>
  );
}

function ChecklistIcon({ size = 32, color = '#f472b6' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 20 6" />
      <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
    </svg>
  );
}

// ── Highlight matched query words in text ────────────────────────────────

function HighlightedText({ text, query, isLight }) {
  if (!query || !text) return <>{text}</>;

  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return <>{text}</>;

  // Build a regex that matches any query word (exact substring)
  const escaped = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = words.some(w => part.toLowerCase() === w || part.toLowerCase().includes(w));
        return isMatch ? (
          <mark
            key={i}
            style={{
              background: isLight ? 'rgba(250,204,21,0.3)' : 'rgba(250,204,21,0.2)',
              color: 'inherit',
              borderRadius: 2,
              padding: '0 1px',
            }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

// ── Search Results Panel ─────────────────────────────────────────────────

function SearchResultsPanel({ results, query, isLight, onNavigate, onClose }) {
  const panelRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  if (results.length === 0) {
    return (
      <div
        ref={panelRef}
        className="absolute top-full left-0 right-0 mt-2 rounded-2xl border overflow-hidden z-50"
        style={{
          background: isLight ? '#ffffff' : '#0f1117',
          borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
          boxShadow: isLight
            ? '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)'
            : '0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)',
        }}
      >
        <div className="flex flex-col items-center py-10 gap-2">
          <span className="text-3xl">🔍</span>
          <p className={`text-sm font-semibold ${isLight ? 'text-gray-500' : 'text-white/40'}`}>
            No results found
          </p>
          <p className={`text-xs ${isLight ? 'text-gray-400' : 'text-white/25'}`}>
            Try a different search term or check for typos
          </p>
        </div>
      </div>
    );
  }

  // Group by type
  const grouped = { topic: [], checklist: [], code: [] };
  for (const r of results) {
    (grouped[r.type] || []).push(r);
  }

  const typeLabels = {
    topic: 'Topics & Concepts',
    checklist: 'Checklist Items',
    code: 'Code Problems',
  };

  return (
    <div
      ref={panelRef}
      className="absolute top-full left-0 right-0 mt-2 rounded-2xl border overflow-hidden z-50"
      style={{
        background: isLight ? '#ffffff' : '#0f1117',
        borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
        boxShadow: isLight
          ? '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)'
          : '0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)',
        maxHeight: '420px',
        overflowY: 'auto',
      }}
    >
      {/* Result count header */}
      <div
        className="sticky top-0 z-10 px-4 py-2.5 border-b text-[11px] font-semibold uppercase tracking-wider"
        style={{
          background: isLight ? '#f8fafc' : '#0a0c12',
          borderColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
          color: isLight ? '#94a3b8' : '#64748b',
        }}
      >
        {results.length} result{results.length !== 1 ? 's' : ''} found
      </div>

      {Object.entries(grouped).map(([type, items]) => {
        if (items.length === 0) return null;
        return (
          <div key={type}>
            {/* Type section header */}
            <div
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider border-b"
              style={{
                color: isLight ? '#94a3b8' : '#475569',
                background: isLight ? '#f1f5f9' : 'rgba(255,255,255,0.02)',
                borderColor: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
              }}
            >
              {RESULT_ICONS[type]} {typeLabels[type]} ({items.length})
            </div>

            {items.map((result, idx) => (
              <button
                key={`${type}-${idx}`}
                onClick={() => onNavigate(result)}
                className="w-full text-left px-4 py-3 flex items-start gap-3 transition-colors duration-150 border-b"
                style={{
                  borderColor: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isLight ? '#f8fafc' : 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {/* Color indicator dot */}
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                  style={{ background: result.color }}
                />

                <div className="flex-1 min-w-0">
                  {/* Title with highlight */}
                  <p
                    className={`text-[13px] font-semibold leading-snug truncate ${
                      isLight ? 'text-gray-900' : 'text-white/90'
                    }`}
                  >
                    <HighlightedText text={result.title} query={query} isLight={isLight} />
                  </p>

                  {/* Subtitle / preview */}
                  {result.subtitle && (
                    <p
                      className={`text-[11px] mt-0.5 truncate ${
                        isLight ? 'text-gray-500' : 'text-white/35'
                      }`}
                    >
                      <HighlightedText text={result.subtitle} query={query} isLight={isLight} />
                    </p>
                  )}

                  {/* Breadcrumb */}
                  <p
                    className={`text-[10px] mt-1 truncate ${
                      isLight ? 'text-gray-400' : 'text-white/20'
                    }`}
                  >
                    {result.breadcrumb}
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  className="w-3.5 h-3.5 flex-shrink-0 mt-1"
                  style={{ color: isLight ? '#cbd5e1' : '#334155' }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ── Main Home Component ─────────────────────────────────────────────────

export default function Home({ onSelectSkill, isLight }) {
  const [search, setSearch] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);

  const { search: globalSearch, isReady } = useSearchIndex();

  // Debounce the search query (200ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(search.trim());
    }, 200);
    return () => clearTimeout(timer);
  }, [search]);

  // Show results panel when we have a query
  useEffect(() => {
    if (debouncedQuery) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [debouncedQuery]);

  // Close results on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setShowResults(false);
        setSearch('');
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const searchResults = debouncedQuery && isReady ? globalSearch(debouncedQuery) : [];

  // Handle navigating to a search result
  const handleNavigate = useCallback((result) => {
    setShowResults(false);
    setSearch('');

    if (result.type === 'topic' && result.skillId) {
      onSelectSkill(result.skillId, { searchQuery: debouncedQuery });
    } else if (result.type === 'checklist') {
      onSelectSkill('checklist', { section: result.checklistSection });
    } else if (result.type === 'code') {
      onSelectSkill('code-practice', { problemId: result.problemId });
    }
  }, [onSelectSkill, debouncedQuery]);

  // Card filtering (still filters cards by title when typing, but the global results panel is the primary UX)
  const filteredCards = SKILLS_METADATA.filter(card => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      card.title.toLowerCase().includes(q) ||
      card.category.toLowerCase().includes(q) ||
      card.description.toLowerCase().includes(q)
    );
  });

  const categories = ['Core Concepts', 'Architecture', 'Interactive Practice'];

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 relative">
      
      {/* Decorative ambient background glows */}
      {!isLight && (
        <>
          <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-20 right-1/4 w-[350px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        </>
      )}

      {/* Compact Top Header Row (no large padding, cards fully visible immediately) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 relative z-10 border-b pb-6"
        style={{ borderColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)' }}
      >
        <div>
          <h1 className={`text-2xl font-black tracking-tight ${
            isLight ? 'text-gray-900' : 'text-white'
          }`}>
            Senior Engineering{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Prep Hub
            </span>
          </h1>
          <p className={`text-xs mt-1 ${isLight ? 'text-gray-500' : 'text-white/40'}`}>
            Deepen core concepts, practice algorithms, and review STAR behavioral stories.
          </p>
        </div>

        {/* Global Search bar */}
        <div className="relative w-full sm:max-w-sm" ref={searchContainerRef}>
          <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
            isLight ? 'text-gray-400' : 'text-white/30'
          }`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.25" stroke="currentColor" strokeWidth="1.5" />
              <line x1="9.5" y1="9.5" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => { if (debouncedQuery) setShowResults(true); }}
            placeholder={isReady ? "Search all topics, questions, problems..." : "Loading search index..."}
            className={`w-full h-10 pl-10 pr-8 rounded-xl text-xs outline-none border transition-all duration-300 ${
              isLight
                ? 'bg-white border-gray-200/90 text-gray-900 placeholder-gray-400 focus:border-blue-400/60 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.12)]'
                : 'bg-white/5 border-white/8 text-white/85 placeholder-white/25 focus:bg-white/8 focus:border-blue-500/30 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.06)]'
            }`}
          />
          {search && (
            <button
              onClick={() => { setSearch(''); setShowResults(false); }}
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[8px] transition-all ${
                isLight ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' : 'bg-white/10 text-white/40 hover:bg-white/20'
              }`}
            >
              ✕
            </button>
          )}

          {/* Search Results Panel */}
          {showResults && debouncedQuery && (
            <SearchResultsPanel
              results={searchResults}
              query={debouncedQuery}
              isLight={isLight}
              onNavigate={handleNavigate}
              onClose={() => setShowResults(false)}
            />
          )}
        </div>
      </div>

      {/* Grid Categories */}
      <div className="space-y-12 relative z-10">
        {categories.map((category) => {
          const categoryCards = filteredCards.filter((c) => c.category === category);
          if (categoryCards.length === 0) return null;

          return (
            <div key={category} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <h2 className={`text-lg font-bold tracking-tight uppercase ${
                  isLight ? 'text-gray-400' : 'text-white/40'
                }`}>
                  {category}
                </h2>
                <div className={`flex-1 h-px ${isLight ? 'bg-gray-200' : 'bg-white/5'}`} />
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryCards.map((card) => {
                  const isHovered = hoveredCard === card.id;
                  
                  return (
                    <div
                      key={card.id}
                      onClick={() => onSelectSkill(card.id)}
                      onMouseEnter={() => setHoveredCard(card.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className={`relative flex flex-col justify-between p-6 rounded-2xl border cursor-pointer select-none transition-all duration-300 ease-out h-[260px] ${
                        isLight
                          ? isHovered
                            ? 'bg-white shadow-xl translate-y-[-4px]'
                            : 'bg-white border-gray-100/90 shadow-md'
                          : isHovered
                            ? 'bg-[#15151b] translate-y-[-4px]'
                            : 'bg-[#101014] border-white/5 shadow-lg'
                      }`}
                      style={{
                        borderColor: isHovered 
                          ? card.color 
                          : isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)',
                        boxShadow: isHovered
                          ? `${card.color}15 0px 10px 30px -5px, ${card.color}10 0px 0px 20px`
                          : undefined
                      }}
                    >
                      {/* Glow effect at top boundary */}
                      {isHovered && (
                        <div
                          className="absolute top-0 left-1/4 right-1/4 h-[2px] blur-[1px] transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`
                          }}
                        />
                      )}

                      <div>
                        {/* Header: Icon & Badge */}
                        <div className="flex items-center justify-between mb-4">
                          {/* Icon Container */}
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300"
                            style={{
                              background: isLight 
                                ? `${card.color}08` 
                                : `linear-gradient(135deg, ${card.color}15, ${card.color}08)`,
                              borderColor: isHovered ? `${card.color}40` : isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
                              boxShadow: isHovered ? `0 0 16px ${card.color}15` : 'none'
                            }}
                          >
                            {card.iconUrl ? (
                              <img
                                src={card.iconUrl}
                                alt={card.title}
                                width={24}
                                height={24}
                                style={{
                                  filter: card.isReactNative ? REACT_NATIVE_FILTER : undefined
                                }}
                              />
                            ) : card.emoji ? (
                              <span className="text-xl">{card.emoji}</span>
                            ) : card.isCodePractice ? (
                              <CodePracticeIcon size={22} color={card.color} />
                            ) : card.isChecklist ? (
                              <ChecklistIcon size={22} color={card.color} />
                            ) : null}
                          </div>

                          {/* Skill badge */}
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                            isLight
                              ? 'bg-gray-50 border-gray-200 text-gray-500'
                              : 'bg-white/5 border-white/8 text-white/40'
                          }`}>
                            {card.badge}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className={`text-base font-bold mb-1.5 transition-colors ${
                          isLight ? 'text-gray-900' : 'text-white'
                        }`}
                        style={{
                          color: isHovered ? card.color : undefined
                        }}>
                          {card.title}
                        </h3>
                        <p className={`text-xs line-clamp-3 leading-relaxed ${
                          isLight ? 'text-gray-500' : 'text-white/40'
                        }`}>
                          {card.description}
                        </p>
                      </div>

                      {/* Footer: Stats & Arrow */}
                      <div className="flex items-center justify-between border-t pt-3 mt-4"
                        style={{
                          borderColor: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'
                        }}
                      >
                        <span className={`text-[11px] font-semibold ${
                          isLight ? 'text-gray-400' : 'text-white/30'
                        }`}>
                          {card.stats}
                        </span>
                        
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
                          style={{
                            background: isHovered 
                              ? card.color 
                              : isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.04)',
                            color: isHovered 
                              ? '#fff' 
                              : isLight ? '#4b5563' : 'rgba(255,255,255,0.45)'
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredCards.length === 0 && !showResults && (
          <div className="text-center py-20">
            <span className="text-4xl mb-4 block">🔍</span>
            <h3 className={`font-semibold mb-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>No modules found</h3>
            <p className={`text-sm ${isLight ? 'text-gray-400' : 'text-white/30'}`}>Try searching for a different term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
