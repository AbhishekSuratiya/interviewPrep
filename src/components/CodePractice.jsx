import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { codingQuestions } from '../data/codePractice';

const DIFFICULTY_COLORS = {
  Easy:   { bg: 'rgba(34,197,94,0.15)',  text: '#22c55e', border: 'rgba(34,197,94,0.3)'  },
  Medium: { bg: 'rgba(251,146,60,0.15)', text: '#fb923c', border: 'rgba(251,146,60,0.3)' },
  Hard:   { bg: 'rgba(239,68,68,0.15)',  text: '#ef4444', border: 'rgba(239,68,68,0.3)'  },
};

const CATEGORY_COLORS = {
  Array:  { bg: 'rgba(96,165,250,0.12)',  text: '#60a5fa'  },
  String: { bg: 'rgba(167,139,250,0.12)', text: '#a78bfa'  },
};

function CodeEditor({ value, onChange, readOnly = false, height = 320 }) {
  const editorRef = useRef(null);

  function handleMount(editor, monaco) {
    editorRef.current = editor;

    // Enable JS/TS validation and strict type checking suggestions
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      checkJs: true,
    });

    // Focus editor on mount if editable
    if (!readOnly) {
      editor.focus();
    }
  }

  const monacoTheme = readOnly ? 'solution-dark' : 'vs-dark';

  function beforeMount(monaco) {
    // Define a custom solution theme with a subtle green tint
    monaco.editor.defineTheme('solution-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '', foreground: 'a5f3a5' },
        { token: 'comment', foreground: '6ee7a0', fontStyle: 'italic' },
        { token: 'string', foreground: '86efac' },
        { token: 'keyword', foreground: '4ade80', fontStyle: 'bold' },
        { token: 'number', foreground: '34d399' },
        { token: 'identifier', foreground: 'd1fae5' },
      ],
      colors: {
        'editor.background': '#0a1a0f',
        'editor.lineHighlightBackground': '#0f2a18',
        'editorLineNumber.foreground': '#2d6a4a',
        'editorCursor.foreground': '#4ade80',
      },
    });
  }

  return (
    <div
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: `1px solid ${readOnly ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.1)'}`,
        boxShadow: readOnly ? '0 0 20px rgba(74,222,128,0.05)' : '0 0 20px rgba(99,102,241,0.08)',
      }}
    >
      {/* Title bar */}
      <div style={{
        display: 'flex', gap: 6, padding: '10px 14px',
        borderBottom: `1px solid ${readOnly ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.06)'}`,
        alignItems: 'center',
        background: readOnly ? '#0a1a0f' : '#1e1e1e',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28ca41', display: 'inline-block' }} />
        <span style={{ marginLeft: 8, fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>
          {readOnly ? 'solution.js' : 'editor.js'}
        </span>
        {readOnly ? (
          <span style={{
            marginLeft: 'auto', fontSize: 10, background: 'rgba(74,222,128,0.15)',
            color: '#4ade80', borderRadius: 6, padding: '2px 8px', border: '1px solid rgba(74,222,128,0.3)',
          }}>✨ Solution</span>
        ) : (
          <span style={{
            marginLeft: 'auto', fontSize: 10, background: 'rgba(99,102,241,0.15)',
            color: '#818cf8', borderRadius: 6, padding: '2px 8px', border: '1px solid rgba(99,102,241,0.3)',
          }}>⚡ JS • IntelliSense ON</span>
        )}
      </div>

      {/* Monaco Editor */}
      <Editor
        height={height}
        language="javascript"
        value={value}
        theme={monacoTheme}
        beforeMount={beforeMount}
        onMount={handleMount}
        onChange={(val) => !readOnly && onChange(val ?? '')}
        options={{
          readOnly,
          fontSize: 13,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Menlo, monospace",
          fontLigatures: true,
          lineHeight: 22,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          automaticLayout: true,
          tabSize: 2,
          padding: { top: 14, bottom: 14 },
          suggestOnTriggerCharacters: true,
          quickSuggestions: { other: true, comments: false, strings: false },
          acceptSuggestionOnEnter: 'on',
          snippetSuggestions: 'top',
          formatOnPaste: true,
          formatOnType: true,
          bracketPairColorization: { enabled: true },
          guides: { bracketPairs: true },
          renderLineHighlight: readOnly ? 'none' : 'line',
          scrollbar: { verticalScrollbarSize: 4, horizontalScrollbarSize: 4 },
          overviewRulerLanes: 0,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
        }}
      />
    </div>
  );
}

function OutputPanel({ output, isLight }) {
  if (!output) return null;
  const isError = output.startsWith('❌');

  return (
    <div style={{
      marginTop: 12,
      borderRadius: 10,
      overflow: 'hidden',
      border: `1px solid ${isError ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
      background: isError ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.06)',
    }}>
      <div style={{
        padding: '8px 14px',
        fontSize: 11,
        fontWeight: 600,
        color: isError ? '#ef4444' : '#22c55e',
        borderBottom: `1px solid ${isError ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.15)'}`,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        {isError ? '❌ Error' : '✅ Output'}
      </div>
      <pre style={{
        margin: 0,
        padding: '12px 14px',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 12,
        color: isError ? '#fca5a5' : '#86efac',
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
      }}>
        {output}
      </pre>
    </div>
  );
}

function QuestionCard({ q, isLight, isActive, onClick }) {
  const diff = DIFFICULTY_COLORS[q.difficulty];
  const cat = CATEGORY_COLORS[q.category];

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '12px 14px',
        borderRadius: 10,
        border: `1px solid ${isActive
          ? 'rgba(96,165,250,0.5)'
          : isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)'}`,
        background: isActive
          ? isLight ? 'rgba(96,165,250,0.08)' : 'rgba(96,165,250,0.1)'
          : isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)',
        cursor: 'pointer',
        transition: 'all 0.18s',
        marginBottom: 6,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <span style={{
          fontSize: 10, fontWeight: 700,
          color: diff.text, background: diff.bg,
          border: `1px solid ${diff.border}`,
          borderRadius: 5, padding: '2px 7px',
        }}>{q.difficulty}</span>
        <span style={{
          fontSize: 10, fontWeight: 600,
          color: cat.text, background: cat.bg,
          borderRadius: 5, padding: '2px 7px',
        }}>{q.category}</span>
      </div>
      <div style={{
        fontSize: 13, fontWeight: 600,
        color: isActive ? '#60a5fa' : isLight ? '#1e293b' : '#e2e8f0',
      }}>
        {q.id}. {q.title}
      </div>
    </button>
  );
}

export default function CodePractice({ isLight }) {
  const [activeId, setActiveId] = useState(1);
  const [codes, setCodes] = useState(() =>
    Object.fromEntries(codingQuestions.map(q => [q.id, q.starterCode]))
  );
  const [outputs, setOutputs] = useState({});
  const [showSolution, setShowSolution] = useState({});
  const [search, setSearch] = useState('');
  const [filterDiff, setFilterDiff] = useState('All');
  const [filterCat, setFilterCat] = useState('All');

  const activeQ = codingQuestions.find(q => q.id === activeId);

  const filtered = codingQuestions.filter(q => {
    const matchSearch = !search || q.title.toLowerCase().includes(search.toLowerCase());
    const matchDiff = filterDiff === 'All' || q.difficulty === filterDiff;
    const matchCat = filterCat === 'All' || q.category === filterCat;
    return matchSearch && matchDiff && matchCat;
  });

  const runCode = () => {
    const code = codes[activeId] || '';
    const logs = [];
    const fakeConsole = {
      log: (...args) => logs.push(args.map(a => {
        if (Array.isArray(a)) return '[' + a.join(', ') + ']';
        if (typeof a === 'object' && a !== null) return JSON.stringify(a);
        return String(a);
      }).join(' ')),
      error: (...args) => logs.push('ERROR: ' + args.join(' ')),
      warn: (...args) => logs.push('WARN: ' + args.join(' ')),
    };

    try {
      // eslint-disable-next-line no-new-func
      new Function('console', code)(fakeConsole);
      setOutputs(prev => ({
        ...prev,
        [activeId]: logs.length ? logs.join('\n') : '(no output)',
      }));
    } catch (err) {
      setOutputs(prev => ({
        ...prev,
        [activeId]: `❌ ${err.name}: ${err.message}`,
      }));
    }
  };

  const toggleSolution = () => {
    setShowSolution(prev => ({ ...prev, [activeId]: !prev[activeId] }));
  };

  const resetCode = () => {
    setCodes(prev => ({ ...prev, [activeId]: activeQ.starterCode }));
    setOutputs(prev => ({ ...prev, [activeId]: null }));
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Question List Sidebar */}
      <div style={{
        width: 280,
        flexShrink: 0,
        borderRight: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ padding: '18px 16px 12px', borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: isLight ? '#1e293b' : '#e2e8f0', marginBottom: 10 }}>
            🧩 Problems <span style={{ color: '#60a5fa', fontWeight: 400 }}>({codingQuestions.length})</span>
          </div>
          {/* Search */}
          <input
            type="text"
            placeholder="Search problems…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '7px 10px',
              borderRadius: 8,
              border: `1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
              background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
              color: isLight ? '#1e293b' : '#e2e8f0',
              fontSize: 12,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {/* Filters */}
          <div style={{ display: 'flex', gap: 5, marginTop: 8 }}>
            {['All','Easy','Medium','Hard'].map(d => (
              <button key={d} onClick={() => setFilterDiff(d)} style={{
                padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600,
                border: `1px solid ${filterDiff === d ? '#60a5fa' : isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
                background: filterDiff === d ? 'rgba(96,165,250,0.15)' : 'transparent',
                color: filterDiff === d ? '#60a5fa' : isLight ? '#64748b' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}>{d}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 5, marginTop: 5 }}>
            {['All','Array','String'].map(c => (
              <button key={c} onClick={() => setFilterCat(c)} style={{
                padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600,
                border: `1px solid ${filterCat === c ? '#a78bfa' : isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
                background: filterCat === c ? 'rgba(167,139,250,0.15)' : 'transparent',
                color: filterCat === c ? '#a78bfa' : isLight ? '#64748b' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 10px' }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', color: isLight ? '#94a3b8' : '#475569', fontSize: 13, marginTop: 24 }}>
              No problems found
            </div>
          )}
          {filtered.map(q => (
            <QuestionCard
              key={q.id}
              q={q}
              isLight={isLight}
              isActive={activeId === q.id}
              onClick={() => {
                setActiveId(q.id);
                setShowSolution(prev => ({ ...prev, [q.id]: false }));
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      {activeQ && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Top bar */}
          <div style={{
            padding: '14px 24px',
            borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexShrink: 0,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: isLight ? '#1e293b' : '#f1f5f9' }}>
                  {activeQ.id}. {activeQ.title}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
                  color: DIFFICULTY_COLORS[activeQ.difficulty].text,
                  background: DIFFICULTY_COLORS[activeQ.difficulty].bg,
                  border: `1px solid ${DIFFICULTY_COLORS[activeQ.difficulty].border}`,
                }}>{activeQ.difficulty}</span>
                <span style={{
                  fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 6,
                  color: CATEGORY_COLORS[activeQ.category].text,
                  background: CATEGORY_COLORS[activeQ.category].bg,
                }}>{activeQ.category}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={resetCode} style={{
                padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                border: `1px solid ${isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)'}`,
                background: 'transparent',
                color: isLight ? '#64748b' : '#94a3b8',
                cursor: 'pointer', transition: 'all 0.15s',
              }}>↺ Reset</button>
              <button onClick={toggleSolution} style={{
                padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                border: '1px solid rgba(167,139,250,0.4)',
                background: showSolution[activeId] ? 'rgba(167,139,250,0.2)' : 'rgba(167,139,250,0.08)',
                color: '#a78bfa',
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
                {showSolution[activeId] ? '👁 Hide Solution' : '✨ Show Solution'}
              </button>
              <button onClick={runCode} style={{
                padding: '7px 20px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                border: 'none',
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                color: '#fff',
                cursor: 'pointer', transition: 'all 0.15s',
                boxShadow: '0 2px 12px rgba(99,102,241,0.35)',
              }}>▶ Run</button>
            </div>
          </div>

          {/* Content area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', gap: 20 }}>
            {/* Left: Description */}
            <div style={{ width: 340, flexShrink: 0 }}>
              <div style={{
                padding: '18px 20px',
                borderRadius: 14,
                border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
                background: isLight ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.03)',
                marginBottom: 14,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#60a5fa', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  📋 Problem Description
                </div>
                <pre style={{
                  margin: 0,
                  fontFamily: 'inherit',
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: isLight ? '#374151' : '#cbd5e1',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}>{activeQ.description}</pre>
              </div>

              {/* Explanation (visible when solution shown) */}
              {showSolution[activeId] && (
                <div style={{
                  padding: '16px 18px',
                  borderRadius: 12,
                  border: '1px solid rgba(167,139,250,0.25)',
                  background: 'rgba(167,139,250,0.06)',
                  animation: 'fadeIn 0.3s ease',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#a78bfa', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    💡 Explanation
                  </div>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: isLight ? '#4b5563' : '#c4b5fd' }}>
                    {activeQ.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Editor + Solution + Output */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Editor label */}
              <div style={{ fontSize: 11, fontWeight: 700, color: isLight ? '#64748b' : '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                Your Code
              </div>
              <CodeEditor
                key={activeId}
                value={codes[activeId] || ''}
                onChange={val => setCodes(prev => ({ ...prev, [activeId]: val }))}
                height={340}
              />

              <OutputPanel output={outputs[activeId]} isLight={isLight} />

              {/* Solution */}
              {showSolution[activeId] && (
                <div style={{ marginTop: 18, animation: 'fadeIn 0.35s ease' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                    ✨ Optimal Solution
                  </div>
                  <CodeEditor
                    key={`solution-${activeId}`}
                    value={activeQ.solution}
                    onChange={() => {}}
                    height={340}
                    readOnly
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        textarea::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
