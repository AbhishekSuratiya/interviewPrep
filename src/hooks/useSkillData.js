import { useState, useEffect } from 'react';

const SKILLS = [
  { id: 'react-native', file: '/data/react-native.json',  icon: '📱',  color: '#a78bfa', label: 'React Native' },
  { id: 'react',        file: '/data/react.json',         icon: '⚛',   color: '#60a5fa', label: 'React' },
  { id: 'javascript',   file: '/data/javascript.json',   icon: 'JS',  color: '#facc15', label: 'JavaScript' },
  { id: 'typescript',   file: '/data/typescript.json',    icon: 'TS',  color: '#3b82f6', label: 'TypeScript' },
  { id: 'nodejs',       file: '/data/nodejs.json',        icon: '🟢',  color: '#68a063', label: 'Node.js' },
  { id: 'ai',           file: '/data/ai.json',            icon: '🤖',  color: '#22d3ee', label: 'Artificial Intelligence' },
  { id: 'senior',       file: '/data/senior.json',        icon: '🎯',  color: '#f59e0b', label: 'Senior Topics' },
];

export function useSkillData(skillId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const config = SKILLS.find(s => s.id === skillId);

  useEffect(() => {
    if (!config) return;
    setLoading(true);
    setError(null);
    setData(null);

    fetch(config.file)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [skillId]);

  return { data, loading, error, config };
}

export { SKILLS };
