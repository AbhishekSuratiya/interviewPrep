import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { checklistSections } from '../data/checklistTopics';
import { codingQuestions, reactQuestions } from '../data/codePractice';
import { javascriptQuestions } from '../data/javascriptQuestions';
import { typescriptQuestions } from '../data/typescriptQuestions';
import { reactQuestions as reactChecklistQuestions } from '../data/reactQuestions';
import { nextjsQuestions } from '../data/nextjsQuestions';
import { reactNativeQuestions } from '../data/reactNativeQuestions';
import { essentialsQuestions } from '../data/essentialsQuestions';

// ── Fuzzy matching engine ──────────────────────────────────────────────────

/**
 * Check if `pattern` appears as a subsequence within `text`.
 * Characters of pattern must appear in order but not necessarily adjacent.
 * Returns the number of matched characters (0 = no match).
 */
function subsequenceMatch(pattern, text) {
  let pi = 0;
  for (let ti = 0; ti < text.length && pi < pattern.length; ti++) {
    if (pattern[pi] === text[ti]) pi++;
  }
  return pi === pattern.length ? pattern.length : 0;
}

/**
 * Score how well a single query word matches a target string.
 * Higher = better. 0 = no match.
 *
 * Scoring tiers:
 *  - Exact word boundary match: 100
 *  - Starts-with match: 80
 *  - Contains substring: 60
 *  - Subsequence match (typo tolerance): 30
 */
function wordScore(queryWord, target) {
  if (!queryWord || !target) return 0;

  // For very short queries (1-2 chars), require substring match only
  if (queryWord.length <= 2) {
    return target.includes(queryWord) ? 60 : 0;
  }

  // Check word-boundary exact match (the target contains the query as a whole word)
  const wordBoundaryRe = new RegExp(`(?:^|[\\s\\-_.,;:!?/()\\[\\]])${escapeRegex(queryWord)}(?:$|[\\s\\-_.,;:!?/()\\[\\]])`, 'i');
  if (wordBoundaryRe.test(target)) return 100;

  // Starts-with on any word in target
  const words = target.split(/[\s\-_.,;:!?/()[\]]+/);
  if (words.some(w => w.startsWith(queryWord))) return 80;

  // Substring match
  if (target.includes(queryWord)) return 60;

  // Subsequence match — catches typos like "closre" → "closure"
  // Only allow if the query word is at least 3 chars and we match at least 70% of chars
  if (queryWord.length >= 3) {
    const matched = subsequenceMatch(queryWord, target);
    if (matched > 0) {
      // Check density — the matched chars shouldn't be too spread apart
      // Find the span in target that covers the subsequence
      const ratio = queryWord.length / target.length;
      if (ratio > 0.15) return 30; // reasonable density
    }
  }

  return 0;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Score how well a multi-word query matches a target string.
 * All words must match (AND logic). Score = sum of word scores.
 * Returns 0 if any word fails to match.
 */
function fuzzyScore(query, target) {
  if (!query || !target) return 0;
  const targetLower = target.toLowerCase();
  const queryWords = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (queryWords.length === 0) return 0;

  let totalScore = 0;
  for (const word of queryWords) {
    const score = wordScore(word, targetLower);
    if (score === 0) return 0; // ALL words must match
    totalScore += score;
  }

  return totalScore;
}

// ── Skill JSON files to fetch ──────────────────────────────────────────────

const SKILL_FILES = [
  { id: 'javascript', file: '/data/javascript.json', label: 'JavaScript' },
  { id: 'typescript', file: '/data/typescript.json', label: 'TypeScript' },
  { id: 'react', file: '/data/react.json', label: 'React' },
  { id: 'react-native', file: '/data/react-native.json', label: 'React Native' },
  { id: 'senior', file: '/data/senior.json', label: 'Senior Topics' },
  { id: 'personal-behavioral', file: '/data/personal-behavioral.json', label: 'My Personal' },
];

// ── Build search index ─────────────────────────────────────────────────────

function buildSkillEntries(skillId, label, data) {
  const entries = [];

  const sections = [
    ...(data.sections || []).map(s => ({ ...s, isSenior: false })),
    ...(data.seniorSections || []).map(s => ({ ...s, isSenior: true })),
  ];

  for (const section of sections) {
    for (const topic of section.topics || []) {
      // Combine all searchable text for this topic
      const searchableTexts = [
        topic.title,
        topic.summary,
        topic.explanation,
        topic.analogy,
        ...(topic.keyPoints || []),
      ].filter(Boolean);

      const searchText = searchableTexts.join(' ');

      entries.push({
        type: 'topic',
        title: topic.title,
        subtitle: topic.summary || '',
        breadcrumb: `${label} → ${section.title}`,
        searchText,
        skillId,
        sectionId: section.id,
        topicId: topic.id,
        color: data.color || '#60a5fa',
      });
    }

    // Also index situation questions within topics
    for (const topic of section.topics || []) {
      for (const sit of topic.situations || []) {
        entries.push({
          type: 'topic',
          title: sit.question.length > 80 ? sit.question.slice(0, 77) + '…' : sit.question,
          subtitle: `Situation Q from "${topic.title}"`,
          breadcrumb: `${label} → ${section.title}`,
          searchText: `${sit.question} ${sit.answer || ''}`,
          skillId,
          sectionId: section.id,
          topicId: topic.id,
          color: data.color || '#60a5fa',
        });
      }
    }
  }

  // Personal behavioral section
  if (data.personalSection) {
    for (const item of data.personalSection.items || []) {
      entries.push({
        type: 'topic',
        title: item.title || item.label || 'Personal Story',
        subtitle: item.situation || '',
        breadcrumb: `${label} → Personal Behavioral`,
        searchText: [item.title, item.label, item.situation, item.task, item.action, item.result].filter(Boolean).join(' '),
        skillId,
        color: data.color || '#ec4899',
      });
    }
  }

  // Behavioral section
  if (data.behavioralSection) {
    for (const cat of data.behavioralSection.categories || []) {
      for (const q of cat.questions || []) {
        entries.push({
          type: 'topic',
          title: typeof q === 'string' ? q : q.question || q.q || '',
          subtitle: `Behavioral Q`,
          breadcrumb: `${label} → ${cat.title || 'Behavioral'}`,
          searchText: typeof q === 'string' ? q : [q.question, q.q, q.answer, q.a].filter(Boolean).join(' '),
          skillId,
          color: data.color || '#f59e0b',
        });
      }
    }
  }

  return entries;
}

function buildChecklistEntries() {
  const entries = [];
  const QUESTION_BANKS = {
    javascript: javascriptQuestions,
    typescript: typescriptQuestions,
    react: reactChecklistQuestions,
    nextjs: nextjsQuestions,
    'react-native': reactNativeQuestions,
    essentials: essentialsQuestions,
  };

  for (const section of checklistSections) {
    for (const group of section.groups) {
      for (const topic of group.topics) {
        entries.push({
          type: 'checklist',
          title: topic,
          subtitle: group.title,
          breadcrumb: `Checklist → ${section.label} → ${group.title}`,
          searchText: `${topic} ${group.title}`,
          checklistSection: section.id,
          color: section.color || '#f472b6',
        });
      }
    }

    // Also index question bank entries for this checklist section
    const bank = QUESTION_BANKS[section.id];
    if (bank) {
      for (const [topicSlug, questions] of Object.entries(bank)) {
        for (const q of questions) {
          const qText = typeof q === 'string' ? q : (q.q || q.question || '');
          if (qText) {
            entries.push({
              type: 'checklist',
              title: qText.length > 80 ? qText.slice(0, 77) + '…' : qText,
              subtitle: `Question in ${section.label}`,
              breadcrumb: `Checklist → ${section.label}`,
              searchText: typeof q === 'string' ? q : [q.q, q.question, q.a, q.answer].filter(Boolean).join(' '),
              checklistSection: section.id,
              color: section.color || '#f472b6',
            });
          }
        }
      }
    }
  }
  return entries;
}

function buildCodePracticeEntries() {
  const all = [...codingQuestions, ...(reactQuestions || [])];
  return all.map(q => ({
    type: 'code',
    title: `${q.id}. ${q.title}`,
    subtitle: `${q.difficulty} • ${q.category}`,
    breadcrumb: `Code Practice → ${q.category}`,
    searchText: `${q.title} ${q.category} ${q.difficulty} ${q.description || ''} ${q.explanation || ''}`,
    problemId: q.id,
    color: q.difficulty === 'Easy' ? '#22c55e' : q.difficulty === 'Medium' ? '#fb923c' : '#ef4444',
  }));
}

// ── Icons per result type ──────────────────────────────────────────────────

export const RESULT_ICONS = {
  topic: '📘',
  checklist: '✅',
  code: '💻',
};

// ── The hook ───────────────────────────────────────────────────────────────

export function useSearchIndex() {
  const [skillData, setSkillData] = useState(null); // null = loading, [] = loaded
  const indexRef = useRef(null);

  // Fetch all skill JSONs in parallel on mount
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      SKILL_FILES.map(s =>
        fetch(s.file)
          .then(r => r.ok ? r.json() : null)
          .then(data => ({ ...s, data }))
          .catch(() => ({ ...s, data: null }))
      )
    ).then(results => {
      if (!cancelled) setSkillData(results.filter(r => r.data));
    });
    return () => { cancelled = true; };
  }, []);

  // Build the full index once data is loaded
  const index = useMemo(() => {
    if (!skillData) return null;

    const entries = [];

    // 1. Skill topic entries
    for (const { id, label, data } of skillData) {
      entries.push(...buildSkillEntries(id, label, data));
    }

    // 2. Checklist entries
    entries.push(...buildChecklistEntries());

    // 3. Code practice entries
    entries.push(...buildCodePracticeEntries());

    indexRef.current = entries;
    return entries;
  }, [skillData]);

  // Search function — returns scored, sorted, capped results
  const search = useCallback((query) => {
    const idx = indexRef.current;
    if (!idx || !query || !query.trim()) return [];

    const q = query.trim();
    const scored = [];

    for (const entry of idx) {
      // Score against the full searchText and the title separately
      const textScore = fuzzyScore(q, entry.searchText);
      const titleScore = fuzzyScore(q, entry.title) * 1.5; // boost title matches
      const bestScore = Math.max(textScore, titleScore);

      if (bestScore > 0) {
        scored.push({ ...entry, _score: bestScore });
      }
    }

    // Sort by score descending, then by type priority (topics > checklist > code)
    const typePriority = { topic: 0, checklist: 1, code: 2 };
    scored.sort((a, b) => {
      if (b._score !== a._score) return b._score - a._score;
      return (typePriority[a.type] || 9) - (typePriority[b.type] || 9);
    });

    return scored.slice(0, 30);
  }, []);

  return {
    search,
    isReady: index !== null,
  };
}
