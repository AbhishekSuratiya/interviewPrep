export default function SkillHero({ data, config, isLight }) {
  if (!data || !config) return null;

  const totalSections = (data.sections?.length || 0) + (data.seniorSections?.length || 0);
  const totalTopics =
    (data.sections || []).reduce((a, s) => a + s.topics.length, 0) +
    (data.seniorSections || []).reduce((a, s) => a + s.topics.length, 0);

  return (
    <div className={`
      relative rounded-2xl p-8 mb-8 overflow-hidden border
      ${isLight ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100' : 'border-white/8'}
    `}
      style={!isLight ? {
        background: `linear-gradient(135deg, ${config.color}0a, rgba(167,139,250,0.05))`,
      } : {}}
    >
      {/* Glow orb */}
      {!isLight && (
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: config.color }}
        />
      )}

      <div className="relative flex items-start gap-6">
        {/* Badge */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${config.color}30, ${config.color}15)`,
            border: `1px solid ${config.color}40`,
            color: config.color,
            boxShadow: `0 0 24px ${config.color}22`,
          }}
        >
          {config.icon}
        </div>

        <div className="flex-1 min-w-0">
          <h1 className={`text-2xl font-bold mb-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>
            {data.skill}
          </h1>
          <p className={`text-sm mb-5 ${isLight ? 'text-gray-500' : 'text-white/40'}`}>
            Advanced concepts for senior interview preparation
          </p>

          {/* Stats */}
          <div className="flex gap-4 flex-wrap">
            {[
              { label: 'Sections', value: totalSections, icon: '📂' },
              { label: 'Topics', value: totalTopics, icon: '📚' },
            ].map(stat => (
              <div
                key={stat.label}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                  ${isLight ? 'bg-white border border-gray-200' : 'bg-white/6 border border-white/8'}
                `}
              >
                <span>{stat.icon}</span>
                <span
                  className="font-bold text-base"
                  style={{ color: config.color }}
                >
                  {stat.value}
                </span>
                <span className={isLight ? 'text-gray-500' : 'text-white/40'}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
