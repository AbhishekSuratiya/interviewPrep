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
    <div className="max-w-[1080px] mx-auto px-6 relative">

      {/* Editorial hero */}
      <div
        className="pt-14 pb-10 mb-10"
        style={{ borderBottom: '1px solid var(--line)' }}
      >
        <div className="eyebrow">Senior interview reference</div>
        <h1
          className="tracking-tight"
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 800,
            letterSpacing: '-.02em',
            lineHeight: 1.0,
            fontSize: 'clamp(2.2rem,5.5vw,3.6rem)',
            color: 'var(--ink)',
            maxWidth: '18ch',
          }}
        >
          Everything worth having ready before the interview.
        </h1>
        <p
          className="mt-6"
          style={{ color: 'var(--slate)', fontSize: 'clamp(1rem,2vw,1.18rem)', maxWidth: '60ch' }}
        >
          Deep dives on core concepts, hands-on coding practice, and STAR behavioral
          stories — written the way a strong senior candidate would actually explain them.
        </p>

        {/* Global Search bar */}
        <div className="relative w-full max-w-md mt-8" ref={searchContainerRef}>
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
            style={{
              fontFamily: 'var(--body)',
              border: '1px solid var(--line)',
              background: 'var(--paper-2)',
              color: 'var(--ink)',
            }}
            className="w-full h-11 pl-10 pr-8 rounded-full text-sm outline-none transition-all focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(44,74,140,0.1)]"
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
      <div className="space-y-14 relative z-10 pb-20">
        {categories.map((category) => {
          const categoryCards = filteredCards.filter((c) => c.category === category);
          if (categoryCards.length === 0) return null;

          return (
            <div key={category} className="space-y-6">
              {/* Category Header — editorial eyebrow */}
              <div className="eyebrow">{category}</div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {categoryCards.map((card) => {
                  const isHovered = hoveredCard === card.id;

                  return (
                    <div
                      key={card.id}
                      onClick={() => onSelectSkill(card.id)}
                      onMouseEnter={() => setHoveredCard(card.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="relative flex flex-col justify-between p-6 cursor-pointer select-none transition-all duration-200 h-[248px]"
                      style={{
                        background: 'var(--paper-2)',
                        border: `1px solid ${isHovered ? card.color : 'var(--line)'}`,
                        borderRadius: 14,
                        transform: isHovered ? 'translateY(-3px)' : 'none',
                        boxShadow: isHovered ? '0 14px 34px -18px rgba(14,22,38,0.35)' : 'none',
                      }}
                    >
                      {/* Top accent rule — rounded pill, inset from the card edges */}
                      <div
                        className="absolute h-[3px] transition-all duration-300 ease-out"
                        style={{
                          top: '6px',
                          left: '24px',
                          width: isHovered ? 'calc(100% - 48px)' : '40px',
                          background: card.color,
                          borderRadius: '999px',
                        }}
                      />

                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div
                            className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `${card.color}14`,
                              border: `1px solid ${card.color}33`,
                              borderRadius: 10,
                            }}
                          >
                            {card.iconUrl ? (
                              <img
                                src={card.iconUrl}
                                alt={card.title}
                                width={22}
                                height={22}
                                style={{ filter: card.isReactNative ? REACT_NATIVE_FILTER : undefined }}
                              />
                            ) : card.emoji ? (
                              <span className="text-lg">{card.emoji}</span>
                            ) : card.isCodePractice ? (
                              <CodePracticeIcon size={20} color={card.color} />
                            ) : card.isChecklist ? (
                              <ChecklistIcon size={20} color={card.color} />
                            ) : null}
                          </div>

                          <span
                            className="text-[10px] uppercase px-2.5 py-1 rounded-full"
                            style={{
                              fontFamily: 'var(--mono)',
                              letterSpacing: '.1em',
                              border: '1px solid var(--line)',
                              background: 'var(--paper)',
                              color: 'var(--slate)',
                            }}
                          >
                            {card.badge}
                          </span>
                        </div>

                        <h3
                          className="text-lg mb-1.5 transition-colors"
                          style={{
                            fontFamily: 'var(--display)',
                            fontWeight: 800,
                            letterSpacing: '-.01em',
                            color: isHovered ? card.color : 'var(--ink)',
                          }}
                        >
                          {card.title}
                        </h3>
                        <p
                          className="text-[13px] line-clamp-3 leading-relaxed"
                          style={{ color: 'var(--slate)' }}
                        >
                          {card.description}
                        </p>
                      </div>

                      <div
                        className="flex items-center justify-between pt-3 mt-4"
                        style={{ borderTop: '1px solid var(--line)' }}
                      >
                        <span
                          className="text-[11px]"
                          style={{ fontFamily: 'var(--mono)', letterSpacing: '.04em', color: 'var(--slate)' }}
                        >
                          {card.stats}
                        </span>
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
                          style={{
                            background: isHovered ? card.color : 'var(--paper)',
                            border: '1px solid var(--line)',
                            color: isHovered ? '#fff' : 'var(--slate)',
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
            <h3 className="font-semibold mb-1" style={{ fontFamily: 'var(--display)', color: 'var(--ink)' }}>No modules found</h3>
            <p className="text-sm" style={{ color: 'var(--slate)' }}>Try searching for a different term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
