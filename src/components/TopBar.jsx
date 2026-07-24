import { useEffect, useRef } from 'react';

export default function TopBar({
  activeSkill,
  onBackToHome,
  skillName,
  search,
  onSearch,
  hideSearch,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <header
      className="sticky top-0 w-full z-30"
      style={{
        background: 'rgba(237,240,245,0.82)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="h-16 max-w-[1080px] mx-auto px-6 flex items-center justify-between gap-4">

        {/* Brand / breadcrumb */}
        <div className="flex items-center gap-4 min-w-0">
          <div
            onClick={onBackToHome}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div
              className="w-8 h-8 flex items-center justify-center text-sm font-bold"
              style={{
                background: 'var(--ink)',
                color: 'var(--paper-2)',
                borderRadius: 8,
                fontFamily: 'var(--display)',
              }}
            >
              P
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-[15px] font-bold tracking-tight"
                style={{ fontFamily: 'var(--display)', color: 'var(--ink)' }}
              >
                PrepDocs
              </span>
              <span
                className="text-[9px] font-medium uppercase tracking-[0.16em] mt-0.5"
                style={{ fontFamily: 'var(--mono)', color: 'var(--slate)' }}
              >
                Interview Reference
              </span>
            </div>
          </div>

          {activeSkill !== 'home' && skillName && (
            <div className="hidden sm:flex items-center gap-3 min-w-0">
              <span style={{ color: 'var(--line)' }}>/</span>
              <span
                className="text-xs font-medium uppercase tracking-[0.1em] truncate"
                style={{ fontFamily: 'var(--mono)', color: 'var(--slate)' }}
              >
                {skillName}
              </span>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {activeSkill !== 'home' && (
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium cursor-pointer transition-colors"
              style={{
                fontFamily: 'var(--mono)',
                letterSpacing: '.04em',
                border: '1px solid var(--line)',
                borderRadius: 100,
                background: 'var(--paper-2)',
                color: 'var(--slate)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>All topics</span>
            </button>
          )}

          {!hideSearch && (
            <div className="relative w-[240px] hidden sm:block">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'var(--slate)' }}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <circle cx="6" cy="6" r="4.25" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="9.5" y1="9.5" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={e => onSearch(e.target.value)}
                placeholder="Search topics…"
                style={{
                  paddingRight: search ? '2rem' : '4.5rem',
                  fontFamily: 'var(--body)',
                  border: '1px solid var(--line)',
                  background: 'var(--paper-2)',
                  color: 'var(--ink)',
                }}
                className="w-full h-9 pl-9 rounded-full text-[12px] outline-none transition-all focus:border-[var(--accent)]"
              />
              {!search ? (
                <kbd
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 px-[5px] py-[2.5px] rounded-[4px] text-[9px] font-medium leading-none pointer-events-none"
                  style={{
                    fontFamily: 'var(--mono)',
                    border: '1px solid var(--line)',
                    background: 'var(--paper)',
                    color: 'var(--slate)',
                  }}
                >⌘K</kbd>
              ) : (
                <button
                  onClick={() => onSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full flex items-center justify-center text-[8px]"
                  style={{ background: 'var(--line-2)', color: 'var(--slate)' }}
                >✕</button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
