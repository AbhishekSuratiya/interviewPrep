export default function SkillHero({ data, config, isLight }) {
  if (!data || !config) return null;

  const totalSections = (data.sections?.length || 0) + (data.seniorSections?.length || 0);
  const totalTopics =
    (data.sections || []).reduce((a, s) => a + s.topics.length, 0) +
    (data.seniorSections || []).reduce((a, s) => a + s.topics.length, 0);
  const totalQuestions = data.behavioralSection?.questions?.length || 0;
  const isBehavioralOnly = totalSections === 0 && totalTopics === 0 && totalQuestions > 0;

  const stats = isBehavioralOnly
    ? [{ label: 'Questions', value: totalQuestions }]
    : [
        { label: 'Sections', value: totalSections },
        { label: 'Topics', value: totalTopics },
        ...(totalQuestions ? [{ label: 'Behavioral Qs', value: totalQuestions }] : []),
      ];

  return (
    <div className="mb-10 pb-8" style={{ borderBottom: '1px solid var(--line)' }}>
      <div className="eyebrow">
        <span style={{ color: config.color }}>{config.icon}</span>
        Study reference
      </div>

      <h1
        style={{
          fontFamily: 'var(--display)',
          fontWeight: 800,
          letterSpacing: '-.02em',
          lineHeight: 1.02,
          fontSize: 'clamp(2rem,4.5vw,3rem)',
          color: 'var(--ink)',
        }}
      >
        {data.skill}
      </h1>

      <p className="mt-4" style={{ color: 'var(--slate)', fontSize: '1.08rem', maxWidth: '58ch' }}>
        {isBehavioralOnly
          ? 'Managerial round & leadership questions for senior engineers.'
          : 'Advanced concepts for senior interview preparation.'}
      </p>

      <div className="flex gap-2.5 flex-wrap mt-6">
        {stats.map((stat) => (
          <span key={stat.label} className="chip">
            <b style={{ color: 'var(--ink)', fontWeight: 600 }}>{stat.value}</b>{' '}
            {stat.label}
          </span>
        ))}
      </div>
    </div>
  );
}
