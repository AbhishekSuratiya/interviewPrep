import { SKILLS } from '../hooks/useSkillData';

const CODE_PRACTICE_ITEM = {
  id: 'code-practice',
  icon: '🧩',
  color: '#34d399',
  label: 'Code Practice',
};

export default function Sidebar({ activeSkill, onSelect, theme, onThemeToggle }) {
  const isLight = theme === 'light';

  return (
    <aside className={`
      fixed top-0 left-0 h-screen w-64 z-40 flex flex-col
      border-r transition-colors duration-300
      ${isLight
        ? 'bg-white border-gray-200'
        : 'bg-[#111111] border-white/8'}
    `}>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-6 py-5 border-b ${isLight ? 'border-gray-100' : 'border-white/8'}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
          P
        </div>
        <div>
          <div className={`font-semibold text-sm ${isLight ? 'text-gray-900' : 'text-white'}`}>PrepDocs</div>
          <div className={`text-xs ${isLight ? 'text-gray-400' : 'text-white/40'}`}>Interview Prep</div>
        </div>
      </div>

      {/* Nav label */}
      <div className={`px-6 pt-5 pb-2 text-xs font-semibold uppercase tracking-widest ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
        Skills
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 overflow-y-auto">
        <div className="space-y-1">
          {SKILLS.map(skill => {
            const isActive = activeSkill === skill.id;
            return (
              <button
                key={skill.id}
                onClick={() => onSelect(skill.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200 text-left group
                  ${isActive
                    ? isLight
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-white/10 text-white'
                    : isLight
                      ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                  }
                `}
              >
                <span
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0
                    transition-all duration-200
                    ${isActive ? 'scale-110 shadow-lg' : 'opacity-70 group-hover:opacity-100'}
                  `}
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${skill.color}33, ${skill.color}22)`
                      : isLight ? '#f3f4f6' : 'rgba(255,255,255,0.06)',
                    color: isActive ? skill.color : isLight ? '#6b7280' : 'rgba(255,255,255,0.5)',
                    border: isActive ? `1px solid ${skill.color}44` : '1px solid transparent',
                    boxShadow: isActive ? `0 0 12px ${skill.color}22` : 'none',
                  }}
                >
                  {skill.icon}
                </span>
                <span>{skill.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className={`my-3 h-px ${isLight ? 'bg-gray-100' : 'bg-white/8'}`} />

        {/* Code Practice label */}
        <div className={`px-3 pb-2 text-xs font-semibold uppercase tracking-widest ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
          Practice
        </div>

        {/* Code Practice button */}
        {(() => {
          const isActive = activeSkill === CODE_PRACTICE_ITEM.id;
          return (
            <button
              onClick={() => onSelect(CODE_PRACTICE_ITEM.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 text-left group
                ${isActive
                  ? isLight
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-white/10 text-white'
                  : isLight
                    ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                }
              `}
            >
              <span
                className={`
                  w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0
                  transition-all duration-200
                  ${isActive ? 'scale-110 shadow-lg' : 'opacity-70 group-hover:opacity-100'}
                `}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${CODE_PRACTICE_ITEM.color}33, ${CODE_PRACTICE_ITEM.color}22)`
                    : isLight ? '#f3f4f6' : 'rgba(255,255,255,0.06)',
                  border: isActive ? `1px solid ${CODE_PRACTICE_ITEM.color}44` : '1px solid transparent',
                  boxShadow: isActive ? `0 0 12px ${CODE_PRACTICE_ITEM.color}22` : 'none',
                }}
              >
                {CODE_PRACTICE_ITEM.icon}
              </span>
              <span>{CODE_PRACTICE_ITEM.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: CODE_PRACTICE_ITEM.color }}></span>
              )}
            </button>
          );
        })()}
      </nav>

      {/* Theme toggle */}
      <div className={`px-3 pb-5 pt-3 border-t ${isLight ? 'border-gray-100' : 'border-white/8'}`}>
        <button
          onClick={onThemeToggle}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
            transition-all duration-200
            ${isLight
              ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              : 'text-white/50 hover:bg-white/5 hover:text-white/80'}
          `}
        >
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${isLight ? 'bg-gray-100' : 'bg-white/6'}`}>
            {isLight ? '☀️' : '🌙'}
          </span>
          <span>{isLight ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </aside>
  );
}
