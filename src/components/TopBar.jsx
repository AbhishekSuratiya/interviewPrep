import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function TopBar({
  activeSkill,
  onBackToHome,
  skillName,
  search,
  onSearch,
  isLight,
  hideSearch,
  onShowAuth,
  theme,
  onThemeToggle
}) {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
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
        sticky top-0 w-full h-16 z-30
        backdrop-blur-md transition-all duration-300 border-b
        ${isLight ? 'bg-white/80 border-gray-200/60 shadow-sm' : 'bg-[#030712]/80 border-white/5 shadow-md'}
      `}
    >
      {/* Ambient top glow — dark mode only */}
      {!isLight && (
        <div
          className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none"
        />
      )}

      {/* Main content row - aligned with the grid max-w-6xl */}
      <div className="h-full max-w-6xl mx-auto px-6 flex items-center justify-between gap-4 relative z-10">
        
        {/* Left Side: Clickable Brand / Breadcrumb & Back Button */}
        <div className="flex items-center gap-4">
          {/* Brand Logo & Name */}
          <div 
            onClick={onBackToHome}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            {/* Elegant logo with gradient and subtle rotate on hover */}
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black text-white shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-3deg]"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #818cf8 100%)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
              }}
            >
              P
            </div>
            
            <div className="flex flex-col">
              <span className={`text-sm font-black tracking-tight transition-colors duration-200 leading-none ${
                isLight ? 'text-gray-900 group-hover:text-blue-600' : 'text-white group-hover:text-blue-400'
              }`}>
                PrepDocs
              </span>
              <span className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 leading-none ${
                isLight ? 'text-gray-400' : 'text-white/30'
              }`}>
                Interview Hub
              </span>
            </div>
          </div>

          {/* Breadcrumb separator */}
          {activeSkill !== 'home' && (
            <div className="flex items-center gap-3">
              <span className={isLight ? 'text-gray-300' : 'text-white/10'}>/</span>
              
              <span className={`text-sm font-bold tracking-tight px-2.5 py-1 rounded-lg border ${
                isLight 
                  ? 'bg-blue-50 border-blue-100/50 text-blue-600' 
                  : 'bg-blue-500/10 border-blue-500/15 text-blue-400'
              }`}>
                {skillName}
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Back to Hub + Search + Theme Toggle + User Menu */}
        <div className="flex items-center gap-4">
          
          {/* Back to Hub Button (visible when not on homepage) */}
          {activeSkill !== 'home' && (
            <button
              onClick={onBackToHome}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700 shadow-sm hover:translate-x-[-2px]'
                  : 'bg-white/5 hover:bg-white/10 border-white/8 text-white/80 hover:translate-x-[-2px]'
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to Hub</span>
            </button>
          )}

          {/* Search bar inside header (only visible when filtering is active and not on homepage) */}
          {!hideSearch && (
            <div className="relative w-[240px] hidden sm:block">
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
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
                style={{ paddingRight: search ? '2rem' : '4.5rem' }}
                className={`
                  w-full h-8.5 pl-9.5 rounded-full text-[11px] outline-none border transition-all duration-200
                  ${isLight
                    ? 'bg-gray-100/80 border-gray-200 text-gray-900 placeholder-gray-450 focus:bg-white focus:border-blue-405 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.12)]'
                    : 'bg-white/5 border-white/8 text-white/85 placeholder-white/20 focus:bg-white/8 focus:border-blue-500/40 focus:shadow-[0_0_0_3px_rgba(96,165,250,0.06)]'}
                `}
              />

              {!search && (
                <kbd className={`
                  absolute right-2.5 top-1/2 -translate-y-1/2
                  px-[5px] py-[2.5px] rounded-[4px] text-[8.5px] font-semibold leading-none border
                  pointer-events-none font-mono
                  ${isLight
                    ? 'bg-gray-200/90 text-gray-400 border-gray-300/60'
                    : 'bg-white/7 text-white/20 border-white/10'}
                `}>⌘K</kbd>
              )}

              {search && (
                <button
                  onClick={() => onSearch('')}
                  className={`
                    absolute right-2.5 top-1/2 -translate-y-1/2
                    w-[16px] h-[16px] rounded-full flex items-center justify-center text-[8px] transition-all
                    ${isLight
                      ? 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                      : 'bg-white/10 text-white/40 hover:bg-white/18 hover:text-white/70'}
                  `}
                >✕</button>
              )}
            </div>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={onThemeToggle}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer ${
              isLight
                ? 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200/80'
                : 'bg-white/5 border-white/8 text-white/80 hover:bg-white/10'
            }`}
            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {isLight ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.22" x2="5.64" y2="17.78" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          {/* Sign In (Guest mode) */}
          {user === null && (
            <button
              onClick={onShowAuth}
              className="px-4.5 py-1.5 rounded-full text-xs font-bold text-white transition-all cursor-pointer hover:shadow-md hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
              }}
            >
              Sign In
            </button>
          )}

          {/* User profile avatar dropdown */}
          {user && (
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <button
                onClick={() => setShowMenu(m => !m)}
                title={user.email}
                className="w-8.5 h-8.5 rounded-full flex items-center justify-center text-xs font-bold text-white cursor-pointer transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                }}
              >
                {user.email[0].toUpperCase()}
              </button>

              {showMenu && (
                <div
                  className={`absolute right-0 mt-2 min-w-[200px] rounded-2xl p-2 border z-50 shadow-xl ${
                    isLight ? 'bg-white border-gray-100' : 'bg-[#15151b] border-white/5'
                  }`}
                >
                  <p className={`mx-3 my-2 text-[11px] font-semibold break-all ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
                    {user.email}
                  </p>
                  <button
                    onClick={() => { logout(); setShowMenu(false); }}
                    className="w-full text-left font-bold text-xs p-2.5 rounded-xl text-red-550 transition-colors hover:bg-red-500/10 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}

              {showMenu && (
                <div
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setShowMenu(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: isLight
            ? 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.3) 35%, rgba(99,102,241,0.3) 65%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.15) 35%, rgba(99,102,241,0.15) 65%, transparent 100%)',
        }}
      />
    </header>
  );
}
