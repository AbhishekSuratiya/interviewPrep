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
    <header className={`
      fixed top-0 left-64 right-0 h-16 z-30 flex items-center gap-4 px-6
      border-b backdrop-blur-md transition-colors duration-300
      ${isLight
        ? 'bg-white/90 border-gray-200'
        : 'bg-[#0a0a0a]/80 border-white/8'}
    `}>
      {/* Breadcrumb */}
      <div className={`flex items-center gap-2 text-sm ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
        <span>PrepDocs</span>
        <span>/</span>
        <span className={isLight ? 'text-gray-700 font-medium' : 'text-white/70 font-medium'}>{skillName}</span>
      </div>

      {/* Search */}
      {!hideSearch && (
        <div className="flex-1 max-w-md ml-auto relative">
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
            🔍
          </div>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search topics… (⌘K)"
            className={`
              w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none border transition-all duration-200
              ${isLight
                ? 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100'
                : 'bg-white/6 border-white/10 text-white placeholder-white/30 focus:border-blue-400/50 focus:bg-white/8 focus:ring-2 focus:ring-blue-400/10'}
            `}
          />
          {search && (
            <button
              onClick={() => onSearch('')}
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${isLight ? 'text-gray-400 hover:text-gray-600' : 'text-white/30 hover:text-white/60'}`}
            >
              ✕
            </button>
          )}
        </div>
      )}
    </header>
  );
}
