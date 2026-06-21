import { useEffect, useRef } from 'react';

export default function TopBar({ skillName, search, onSearch, isLight, hideSearch }) {
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
      className={`
        fixed top-0 right-0 h-16 z-30
        backdrop-blur-xl transition-colors duration-300
        relative
        ${isLight ? 'bg-white/88' : 'bg-[#0c0c0c]/92'}
      `}
      style={{ left: 0 }}
    >

      {/* Ambient left glow — dark mode only */}
      {!isLight && (
        <div
          className="absolute inset-y-0 left-0 w-64 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, rgba(96,165,250,0.05) 0%, transparent 100%)' }}
        />
      )}

      {/* Main content row */}
      <div className="h-full flex items-center px-6 gap-4">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 flex-shrink-0">
          {/* Logo badge */}
          <div
            className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center text-[10px] font-black text-white flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)',
              boxShadow: '0 0 12px rgba(99,102,241,0.45), 0 1px 4px rgba(0,0,0,0.35)',
            }}
          >
            P
          </div>

          {/* › separator */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            className={isLight ? 'text-gray-300' : 'text-white/20'}>
            <path d="M4 2.5l3.5 3.5L4 9.5" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <span className={`text-[13px] font-medium ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
            PrepDocs
          </span>

          {/* › separator */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            className={isLight ? 'text-gray-300' : 'text-white/18'}>
            <path d="M4 2.5l3.5 3.5L4 9.5" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <span className={`text-[14px] font-semibold tracking-tight ${isLight ? 'text-gray-800' : 'text-white/88'}`}>
            {skillName}
          </span>
        </nav>

        {/* ── Search ── */}
        {!hideSearch && (
          <div className="flex-1 flex justify-end">
            <div className="relative w-[264px]">

              {/* Search icon */}
              <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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
                style={{ paddingRight: search ? '2.25rem' : '4.75rem' }}
                className={`
                  w-full h-9 pl-10 rounded-full text-[13px] outline-none border transition-all duration-200
                  ${isLight
                    ? 'bg-gray-100/90 border-gray-200/90 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-400/60 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.14)]'
                    : 'bg-white/5 border-white/8 text-white/85 placeholder-white/25 focus:bg-white/8 focus:border-blue-500/35 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.08)]'}
                `}
              />

              {/* ⌘K kbd badge */}
              {!search && (
                <kbd className={`
                  absolute right-3 top-1/2 -translate-y-1/2
                  px-[7px] py-[3px] rounded-[5px] text-[10px] font-semibold leading-none border
                  pointer-events-none font-mono
                  ${isLight
                    ? 'bg-gray-200/90 text-gray-400 border-gray-300/70'
                    : 'bg-white/7 text-white/25 border-white/10'}
                `}>⌘K</kbd>
              )}

              {/* Clear × */}
              {search && (
                <button
                  onClick={() => onSearch('')}
                  className={`
                    absolute right-3 top-1/2 -translate-y-1/2
                    w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] transition-all
                    ${isLight
                      ? 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                      : 'bg-white/10 text-white/40 hover:bg-white/18 hover:text-white/70'}
                  `}
                >✕</button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom gradient accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: isLight
            ? 'linear-gradient(90deg, transparent 0%, rgba(147,197,253,0.55) 35%, rgba(167,139,250,0.55) 65%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.28) 35%, rgba(129,140,248,0.28) 65%, transparent 100%)',
        }}
      />
    </header>
  );
}
