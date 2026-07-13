import { useState, useEffect, useMemo, useRef } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { checklistSections } from '../data/checklistTopics';
import { reactNativeQuestions } from '../data/reactNativeQuestions';
import { javascriptQuestions } from '../data/javascriptQuestions';
import { typescriptQuestions } from '../data/typescriptQuestions';
import { reactQuestions } from '../data/reactQuestions';
import { nextjsQuestions } from '../data/nextjsQuestions';
import { essentialsQuestions } from '../data/essentialsQuestions';
import { nodejsQuestions } from '../data/nodejsQuestions';
import { aiQuestions } from '../data/aiQuestions';

const QUESTION_BANKS = {
  javascript: javascriptQuestions,
  typescript: typescriptQuestions,
  react: reactQuestions,
  nextjs: nextjsQuestions,
  'react-native': reactNativeQuestions,
  essentials: essentialsQuestions,
  nodejs: nodejsQuestions,
  ai: aiQuestions,
};

const STORAGE_KEY = 'checklist:known';

// Stable id for a topic so its checked state survives reorders / re-renders.
const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
const topicId = (sectionId, text) => `${sectionId}:${slug(text)}`;

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function Checkbox({ checked, color, isLight }) {
  return (
    <span
      style={{
        width: 20,
        height: 20,
        borderRadius: 6,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${checked ? color : isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'}`,
        background: checked ? color : 'transparent',
        transition: 'all 0.15s',
      }}
    >
      {checked && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </span>
  );
}

// Copy icon — separate from the dropdown toggle, just copies the given text.
function CopyButton({ text, isLight, copied, onCopied }) {
  const handleClick = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard unavailable */
    }
    onCopied();
  };

  return (
    <button
      onClick={handleClick}
      title="Copy text"
      aria-label={`Copy "${text}"`}
      style={{
        width: 28, height: 28, borderRadius: 7, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', cursor: 'pointer',
        background: 'transparent',
        color: copied ? '#22c55e' : isLight ? '#94a3b8' : '#64748b',
        transition: 'background 0.12s, color 0.12s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >
      {copied ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

// Search icon — redirects to the main app with the search pre-filled.
function SearchButton({ text, sectionLabel, isLight }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        const searchInput = document.querySelector('input[placeholder*="Search modules"]');
        if (searchInput) {
          searchInput.value = text;
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }}
      title="Search for this topic"
      aria-label={`Search for "${text}"`}
      style={{
        width: 28, height: 28, borderRadius: 7, flexShrink: 0,
        display: 'none', alignItems: 'center', justifyContent: 'center',
        border: 'none', cursor: 'pointer',
        background: 'transparent',
        color: isLight ? '#94a3b8' : '#64748b',
        transition: 'background 0.12s, color 0.12s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </button>
  );
}

// Simple progress bar
function ProgressBar({ done, total, color, isLight }) {
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 200, maxWidth: 300 }}>
      <div style={{
        flex: 1, height: 6, borderRadius: 3,
        background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.07)',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${percent}%`, height: '100%', borderRadius: 3,
          background: color, transition: 'width 0.3s ease-out',
        }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 800, color: isLight ? '#64748b' : '#94a3b8', minWidth: 55, textAlign: 'right' }}>
        {done}/{total} · {percent}%
      </span>
    </div>
  );
}

export default function Checklist({ isLight, initialSection }) {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState(
    (initialSection && checklistSections.some(s => s.id === initialSection))
      ? initialSection
      : checklistSections[0].id
  );
  const [known, setKnown] = useState(loadState);
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState({}); // group title -> bool
  const [hideKnown, setHideKnown] = useState(false);
  const [copiedId, setCopiedId] = useState(null); // topic id whose copy icon shows a checkmark
  const [expanded, setExpanded] = useState({}); // topic id -> bool, shows its question list
  const [answerShown, setAnswerShown] = useState({}); // question id -> bool, shows its answer
  const lastRemoteValueRef = useRef(null);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(false);

  const flashCopied = (id) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 1500);
  };

  // 1. Listen to Firestore in real-time
  useEffect(() => {
    if (!user) {
      setInitialLoadDone(true);
      return;
    }
    setInitialLoadDone(false);
    setSyncing(true);
    setSyncError(false);

    const unsub = onSnapshot(
      doc(db, 'users', user.uid),
      (snap) => {
        setSyncing(false);
        if (snap.exists() && snap.data().known) {
          const remoteKnown = snap.data().known;
          lastRemoteValueRef.current = remoteKnown;
          setKnown((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(remoteKnown)) {
              return remoteKnown;
            }
            return prev;
          });
        }
        setInitialLoadDone(true);
      },
      (err) => {
        console.error('Failed to listen to checklist progress:', err);
        setSyncError(true);
        setSyncing(false);
        setInitialLoadDone(true);
      }
    );

    return () => unsub();
  }, [user]);

  // 2. Persist Local & Firestore Sync
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(known));
    } catch { /* ignore */ }

    if (user && initialLoadDone) {
      // Avoid writing if this update came from the server
      if (
        lastRemoteValueRef.current &&
        JSON.stringify(known) === JSON.stringify(lastRemoteValueRef.current)
      ) {
        return;
      }

      setDoc(doc(db, 'users', user.uid), { known }, { merge: true })
        .then(() => setSyncError(false))
        .catch((err) => {
          console.error('Failed to save checklist progress to Firestore:', err);
          setSyncError(true);
        });
    }
  }, [known, user, initialLoadDone]);

  const section = checklistSections.find((s) => s.id === activeSection);
  const questionBank = QUESTION_BANKS[activeSection] || {};
  const q = search.trim().toLowerCase();

  const toggleTopic = (id) =>
    setKnown((prev) => ({ ...prev, [id]: !prev[id] }));

  // Per-section overall progress (ignores search/hide filters)
  const sectionProgress = useMemo(() => {
    const map = {};
    for (const s of checklistSections) {
      let total = 0;
      let done = 0;
      for (const g of s.groups) {
        for (const t of g.topics) {
          total += 1;
          if (known[topicId(s.id, t)]) done += 1;
        }
      }
      map[s.id] = { total, done };
    }
    return map;
  }, [known]);

  // Groups after search + hide-known filtering
  const visibleGroups = useMemo(() => {
    if (!section) return [];
    return section.groups
      .map((g) => {
        const topics = g.topics.filter((t) => {
          if (q && !t.toLowerCase().includes(q) && !g.title.toLowerCase().includes(q)) return false;
          if (hideKnown && known[topicId(section.id, t)]) return false;
          return true;
        });
        return { ...g, topics };
      })
      .filter((g) => g.topics.length > 0);
  }, [section, q, hideKnown, known]);

  const markGroup = (group, value) =>
    setKnown((prev) => {
      const next = { ...prev };
      for (const t of group.topics) next[topicId(section.id, t)] = value;
      return next;
    });

  const cur = sectionProgress[activeSection] || { total: 0, done: 0 };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Section tabs */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
        padding: '10px 0', flexShrink: 0,
        borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
        background: isLight ? '#f8fafc' : 'rgba(255,255,255,0.02)',
      }}>
        {checklistSections.map((s) => {
          const p = sectionProgress[s.id];
          const isActive = activeSection === s.id;
          const empty = p.total === 0;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '6px 14px', borderRadius: 9, fontSize: 13, fontWeight: 600,
                border: `1.5px solid ${isActive ? s.color : isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
                background: isActive ? `${s.color}1e` : 'transparent',
                color: isActive ? s.color : isLight ? '#64748b' : '#94a3b8',
                cursor: 'pointer', transition: 'all 0.15s',
                opacity: empty ? 0.55 : 1,
              }}
            >
              <span style={{ fontSize: 13 }}>{s.icon}</span>
              {s.label}
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 999,
                background: isActive ? `${s.color}33` : isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.07)',
              }}>
                {empty ? 'soon' : `${p.done}/${p.total}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Section header: progress + controls */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
        padding: '12px 0', flexShrink: 0,
        borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: isLight ? '#1e293b' : '#f1f5f9' }}>
            {section.icon} {section.label}
          </span>
          <span style={{ fontSize: 11, color: syncError ? '#f87171' : isLight ? '#94a3b8' : '#64748b' }}>
            {user
              ? syncError
                ? '⚠ Sync failed — check your connection or Firestore permissions'
                : syncing
                  ? '⏳ Syncing your progress…'
                  : `✓ Synced to ${user.email}`
              : 'Progress saves locally. Sign in to sync across devices.'}
          </span>
        </div>

        <div style={{ flex: 1 }} />

        {cur.total > 0 && (
          <ProgressBar done={cur.done} total={cur.total} color={section.color} isLight={isLight} />
        )}
      </div>

      {/* Toolbar: search + hide-known */}
      {cur.total > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
          padding: '10px 0', flexShrink: 0,
          borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
        }}>
          <input
            type="text"
            placeholder="Search topics…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: 200, maxWidth: 360,
              padding: '7px 12px', borderRadius: 8, fontSize: 13, outline: 'none',
              border: `1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
              background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
              color: isLight ? '#1e293b' : '#e2e8f0',
            }}
          />
          <label style={{
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600,
            color: isLight ? '#64748b' : '#94a3b8', cursor: 'pointer', userSelect: 'none',
          }}>
            <input type="checkbox" checked={hideKnown} onChange={(e) => setHideKnown(e.target.checked)} />
            Hide known
          </label>
        </div>
      )}

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 0 48px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {cur.total === 0 ? (
            <div style={{
              textAlign: 'center', padding: '80px 20px',
              color: isLight ? '#94a3b8' : '#475569',
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🚧</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: isLight ? '#475569' : '#94a3b8' }}>
                {section.label} topics coming soon
              </div>
              <div style={{ fontSize: 13, marginTop: 6 }}>
                Being added after the JavaScript list is reviewed.
              </div>
            </div>
          ) : visibleGroups.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: isLight ? '#94a3b8' : '#475569' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{hideKnown ? '🎉' : '🔍'}</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>
                {hideKnown ? 'Nothing left — every matching topic is checked!' : 'No topics match your search'}
              </div>
            </div>
          ) : (
            visibleGroups.map((group) => {
              const isCollapsed = collapsed[group.title];
              const gDone = group.topics.filter((t) => known[topicId(section.id, t)]).length;
              const allDone = gDone === group.topics.length;
              return (
                <div
                  key={group.title}
                  style={{
                    marginBottom: 16,
                    borderRadius: 14,
                    border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
                    background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.02)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Group header */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 16px',
                    borderBottom: isCollapsed ? 'none' : `1px solid ${isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}`,
                  }}>
                    <button
                      onClick={() => setCollapsed((p) => ({ ...p, [group.title]: !p[group.title] }))}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 9, flex: 1,
                        background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0,
                      }}
                    >
                      <span style={{
                        fontSize: 12, color: isLight ? '#94a3b8' : '#64748b',
                        transform: isCollapsed ? 'rotate(-90deg)' : 'none', transition: 'transform 0.15s',
                      }}>▼</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: isLight ? '#1e293b' : '#e2e8f0' }}>
                        {group.title}
                      </span>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                        color: allDone ? '#22c55e' : section.color,
                        background: allDone ? 'rgba(34,197,94,0.14)' : `${section.color}1e`,
                      }}>
                        {gDone}/{group.topics.length}
                      </span>
                    </button>
                    <button
                      onClick={() => markGroup(group, !allDone)}
                      style={{
                        fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 7, cursor: 'pointer',
                        border: `1px solid ${isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)'}`,
                        background: 'transparent', color: isLight ? '#64748b' : '#94a3b8',
                      }}
                    >
                      {allDone ? 'Clear all' : 'Mark all'}
                    </button>
                  </div>

                  {/* Topics */}
                  {!isCollapsed && (
                    <div>
                      {group.topics.map((t) => {
                        const id = topicId(section.id, t);
                        const checked = !!known[id];
                        const questions = questionBank[t];
                        const hasQuestions = !!questions && questions.length > 0;
                        const isExpanded = !!expanded[id];
                        return (
                          <div key={id}>
                            <div
                              onClick={() => toggleTopic(id)}
                              role="checkbox"
                              aria-checked={checked}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleTopic(id); }
                              }}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                                padding: '10px 16px', textAlign: 'left', cursor: 'pointer',
                                background: 'transparent',
                                borderTop: `1px solid ${isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}`,
                                transition: 'background 0.12s',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)')}
                              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                            >
                              <Checkbox checked={checked} color={section.color} isLight={isLight} />
                              <span style={{
                                flex: 1,
                                fontSize: 13.5, lineHeight: 1.5,
                                color: checked
                                  ? isLight ? '#94a3b8' : '#64748b'
                                  : isLight ? '#334155' : '#cbd5e1',
                                textDecoration: checked ? 'line-through' : 'none',
                              }}>
                                {t}
                              </span>
                              {hasQuestions && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpanded((p) => ({ ...p, [id]: !p[id] }));
                                  }}
                                  title={isExpanded ? 'Hide questions' : 'Show questions'}
                                  aria-label={isExpanded ? 'Hide questions' : 'Show questions'}
                                  style={{
                                    width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: 'none', cursor: 'pointer',
                                    background: 'transparent',
                                    color: isLight ? '#94a3b8' : '#64748b',
                                  }}
                                >
                                  <span style={{
                                    fontSize: 12,
                                    transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                                    transition: 'transform 0.15s',
                                    display: 'inline-block',
                                  }}>▼</span>
                                </button>
                              )}
                              <CopyButton
                                text={t}
                                isLight={isLight}
                                copied={copiedId === id}
                                onCopied={() => flashCopied(id)}
                              />
                              <SearchButton
                                text={t}
                                sectionLabel={section.label}
                                isLight={isLight}
                              />
                            </div>

                            {hasQuestions && isExpanded && (
                              <div style={{
                                padding: '4px 16px 10px 46px',
                                borderTop: `1px solid ${isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}`,
                                background: isLight ? 'rgba(0,0,0,0.015)' : 'rgba(255,255,255,0.015)',
                              }}>
                                {questions.map((question, qi) => {
                                  const qid = `${id}::q${qi}`;
                                  // Support both the newer { q, a } shape and the older plain-string shape.
                                  const questionText = typeof question === 'string' ? question : question.q;
                                  const answerText = typeof question === 'string' ? null : question.a;
                                  const hasAnswer = !!answerText;
                                  const isAnswerShown = !!answerShown[qid];
                                  return (
                                    <div
                                      key={qid}
                                      style={{
                                        padding: '7px 0',
                                        borderTop: qi === 0 ? 'none' : `1px solid ${isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}`,
                                      }}
                                    >
                                      <div
                                        onClick={hasAnswer ? () => setAnswerShown((p) => ({ ...p, [qid]: !p[qid] })) : undefined}
                                        role={hasAnswer ? 'button' : undefined}
                                        tabIndex={hasAnswer ? 0 : undefined}
                                        onKeyDown={hasAnswer ? (e) => {
                                          if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setAnswerShown((p) => ({ ...p, [qid]: !p[qid] })); }
                                        } : undefined}
                                        style={{
                                          display: 'flex', alignItems: 'flex-start', gap: 6,
                                          cursor: hasAnswer ? 'pointer' : 'default',
                                        }}
                                      >
                                        {hasAnswer && (
                                          <span style={{
                                            fontSize: 11, color: isLight ? '#94a3b8' : '#64748b', paddingTop: 5,
                                            transform: isAnswerShown ? 'rotate(0deg)' : 'rotate(-90deg)',
                                            transition: 'transform 0.15s', flexShrink: 0,
                                          }}>▼</span>
                                        )}
                                        <span style={{
                                          flex: 1, fontSize: 12.5, lineHeight: 1.5, paddingTop: 4,
                                          fontWeight: hasAnswer ? 600 : 400,
                                          color: isLight ? '#475569' : '#94a3b8',
                                        }}>
                                          {questionText}
                                        </span>
                                        <CopyButton
                                          text={questionText}
                                          isLight={isLight}
                                          copied={copiedId === qid}
                                          onCopied={() => flashCopied(qid)}
                                        />
                                        <SearchButton
                                          text={questionText}
                                          sectionLabel={section.label}
                                          isLight={isLight}
                                        />
                                      </div>

                                      {hasAnswer && isAnswerShown && (
                                        <div style={{
                                          margin: '6px 0 4px 18px',
                                          padding: '10px 12px',
                                          borderRadius: 10,
                                          borderLeft: `2.5px solid ${section.color}`,
                                          background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.04)',
                                        }}>
                                          <p style={{
                                            margin: 0, fontSize: 12.5, lineHeight: 1.65,
                                            color: isLight ? '#334155' : '#cbd5e1',
                                          }}>
                                            {answerText}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
