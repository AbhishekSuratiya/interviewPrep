import { useState, useRef, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { codingQuestions, reactQuestions } from '../data/codePractice';
import ReactIDE from './ReactIDE';

const allQuestions = [...codingQuestions, ...reactQuestions];

const DIFFICULTY_COLORS = {
  Easy:   { bg: 'rgba(34,197,94,0.15)',  text: '#22c55e', border: 'rgba(34,197,94,0.3)'  },
  Medium: { bg: 'rgba(251,146,60,0.15)', text: '#fb923c', border: 'rgba(251,146,60,0.3)' },
  Hard:   { bg: 'rgba(239,68,68,0.15)',  text: '#ef4444', border: 'rgba(239,68,68,0.3)'  },
};

const CATEGORY_COLORS = {
  Array:  { bg: 'rgba(96,165,250,0.12)',  text: '#60a5fa'  },
  String: { bg: 'rgba(167,139,250,0.12)', text: '#a78bfa'  },
  React:  { bg: 'rgba(34,211,238,0.12)',  text: '#22d3ee'  },
};

function CodeEditor({ value, onChange, readOnly = false, height = 320, onReady, onSave, path }) {
  const editorRef = useRef(null);

  function handleMount(editor, monaco) {
    editorRef.current = editor;
    if (!readOnly && onReady) onReady(editor);

    // Cmd/Ctrl+S → run the code (and suppress the browser "Save page" dialog)
    if (!readOnly) {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        onSave?.();
      });
    }

    // Enable JS/TS validation and strict type checking suggestions
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      checkJs: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      jsxFactory: 'React.createElement',
      allowJs: true,
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
        path={path}
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

/* ═══════════════════════════════════════════════════════════════
   Playground — a plain editor for experimenting with JS / React
   ═══════════════════════════════════════════════════════════════ */
const PG_STORAGE_KEY = 'codePractice:playground';

const JS_STARTER = `// JavaScript Playground — experiment freely!
console.log('Hello, world!');
`;

const REACT_STARTER = `// React Playground — write any component!
export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ padding: 32, fontFamily: 'sans-serif' }}>
      <h2>\u{1F680} React Playground</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
`;

function Playground({ isLight }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem(PG_STORAGE_KEY + ':lang') || 'javascript'; } catch { return 'javascript'; }
  });
  const [jsCode, setJsCode] = useState(() => {
    try { return localStorage.getItem(PG_STORAGE_KEY + ':js') || JS_STARTER; } catch { return JS_STARTER; }
  });
  const [reactCode, setReactCode] = useState(() => {
    try { return localStorage.getItem(PG_STORAGE_KEY + ':react') || REACT_STARTER; } catch { return REACT_STARTER; }
  });
  const [jsOutput, setJsOutput] = useState(null);
  const iframeRef = useRef(null);
  const editorRef = useRef(null);

  // Persist to localStorage
  useEffect(() => {
    try { localStorage.setItem(PG_STORAGE_KEY + ':lang', lang); } catch {}
  }, [lang]);
  useEffect(() => {
    try { localStorage.setItem(PG_STORAGE_KEY + ':js', jsCode); } catch {}
  }, [jsCode]);
  useEffect(() => {
    try { localStorage.setItem(PG_STORAGE_KEY + ':react', reactCode); } catch {}
  }, [reactCode]);

  const code = lang === 'javascript' ? jsCode : reactCode;
  const setCode = lang === 'javascript' ? setJsCode : setReactCode;

  // Run JS in a Web Worker
  const runJs = useCallback(() => {
    const workerSrc = `
      self.onmessage = function(e) {
        var logs = [];
        var fakeConsole = {
          log: function() {
            var args = Array.prototype.slice.call(arguments);
            logs.push(args.map(function(a) {
              if (Array.isArray(a)) return '[' + a.join(', ') + ']';
              if (typeof a === 'object' && a !== null) { try { return JSON.stringify(a, null, 2); } catch(_) { return String(a); } }
              return String(a);
            }).join(' '));
          },
          error: function() { logs.push('ERROR: ' + Array.prototype.slice.call(arguments).join(' ')); },
          warn: function() { logs.push('WARN: ' + Array.prototype.slice.call(arguments).join(' ')); },
        };
        try {
          new Function('console', e.data)(fakeConsole);
          self.postMessage({ ok: true, logs: logs });
        } catch(err) {
          self.postMessage({ ok: false, error: err.name + ': ' + err.message });
        }
      };
    `;
    const blob = new Blob([workerSrc], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    const timeout = setTimeout(() => {
      worker.terminate(); URL.revokeObjectURL(url);
      setJsOutput('❌ Timed out: possible infinite loop (>5s)');
    }, 5000);
    worker.onmessage = (e) => {
      clearTimeout(timeout); worker.terminate(); URL.revokeObjectURL(url);
      const { ok, logs, error } = e.data;
      setJsOutput(ok ? (logs.length ? logs.join('\n') : '(no output)') : `❌ ${error}`);
    };
    worker.onerror = (e) => {
      clearTimeout(timeout); worker.terminate(); URL.revokeObjectURL(url);
      setJsOutput(`❌ ${e.message}`);
    };
    worker.postMessage(jsCode);
  }, [jsCode]);

  // Run React in sandboxed iframe
  const runReact = useCallback(() => {
    if (!iframeRef.current) return;
    const encoded = JSON.stringify(reactCode);
    const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8" />
<style>* { box-sizing: border-box; } body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }</style>
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
</head><body><div id="root"></div>
<script>
['useState','useEffect','useRef','useCallback','useMemo','useReducer',
 'useContext','createContext','Fragment','memo','forwardRef'
].forEach(function(h) { if (React[h] !== undefined) window[h] = React[h]; });
function _send(level, args) {
  window.parent.postMessage({ type: 'pg-console', level, text: Array.from(args).map(a => {
    if (a === null) return 'null'; if (a === undefined) return 'undefined';
    if (typeof a === 'object') { try { return JSON.stringify(a,null,2); } catch(e) { return String(a); } }
    return String(a);
  }).join(' ') }, '*');
}
console.log = (...a) => { _send('log', a); };
console.error = (...a) => { _send('error', a); };
console.warn = (...a) => { _send('warn', a); };
window.onerror = (msg,s,l,c,err) => { _send('error', [err?(err.stack||err.toString()):msg]); return true; };
window.addEventListener('load', function() {
  var src = ${encoded};
  try {
    var result = Babel.transform(src, { presets: [['react',{runtime:'classic'}]], plugins:['transform-modules-commonjs'], filename:'app.jsx' });
    var mod = { exports: {} };
    new Function('module','exports','require','React','ReactDOM', result.code)(mod, mod.exports, function(m){ if(m==='react') return React; if(m==='react-dom'||m==='react-dom/client') return ReactDOM; return {}; }, React, ReactDOM);
    var Comp = mod.exports.default || (typeof mod.exports === 'function' ? mod.exports : null);
    if (!Comp) { var _k = Object.keys(mod.exports); for (var i=0;i<_k.length;i++) { if (typeof mod.exports[_k[i]] === 'function') { Comp = mod.exports[_k[i]]; break; } } }
    if (typeof Comp === 'function') { ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Comp)); }
    else { document.getElementById('root').innerHTML = '<p style="color:#94a3b8;padding:20px;font-size:14px;">Tip: use <code>export default function App()</code> to render your component.</p>'; }
  } catch(err) { _send('error', [err.stack||err.toString()]); document.getElementById('root').innerHTML='<pre style="color:#ef4444;padding:20px;white-space:pre-wrap;">' + (err.stack||err.message) + '</pre>'; }
});
<\/script></body></html>`;
    iframeRef.current.srcdoc = html;
  }, [reactCode]);

  // Auto-run React on code change (debounced)
  useEffect(() => {
    if (lang !== 'react') return;
    const t = setTimeout(runReact, 800);
    return () => clearTimeout(t);
  }, [reactCode, lang, runReact]);

  // Cmd+S handler
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        if (lang === 'javascript') runJs();
        else runReact();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lang, runJs, runReact]);

  // Listen for console messages from React iframe
  const [reactLogs, setReactLogs] = useState([]);
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === 'pg-console') {
        setReactLogs(prev => [...prev.slice(-49), { level: e.data.level, text: e.data.text }]);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const clearPlayground = () => {
    if (lang === 'javascript') { setJsCode(JS_STARTER); setJsOutput(null); }
    else { setReactCode(REACT_STARTER); setReactLogs([]); }
  };

  const langTabs = [
    { id: 'javascript', label: 'JavaScript', icon: '⚡', color: '#facc15' },
    { id: 'react', label: 'React', icon: '⚛️', color: '#60a5fa' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 24px', flexShrink: 0,
        borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
      }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: isLight ? '#1e293b' : '#f1f5f9', marginRight: 8 }}>
          🧪 Playground
        </span>

        {/* Language tabs */}
        {langTabs.map(t => (
          <button
            key={t.id}
            onClick={() => setLang(t.id)}
            style={{
              padding: '5px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
              border: `1px solid ${lang === t.id ? t.color : isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
              background: lang === t.id ? `${t.color}22` : 'transparent',
              color: lang === t.id ? t.color : isLight ? '#64748b' : '#94a3b8',
              cursor: 'pointer', transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', gap: 5,
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        <button onClick={clearPlayground} style={{
          padding: '5px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
          border: `1px solid ${isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)'}`,
          background: 'transparent', color: isLight ? '#64748b' : '#94a3b8',
          cursor: 'pointer', transition: 'all 0.15s',
        }}>↺ Reset</button>

        {lang === 'javascript' && (
          <button onClick={runJs} style={{
            padding: '5px 20px', borderRadius: 8, fontSize: 12, fontWeight: 700,
            border: 'none', background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            color: '#fff', cursor: 'pointer', transition: 'all 0.15s',
            boxShadow: '0 2px 12px rgba(99,102,241,0.35)',
          }}>▶ Run</button>
        )}
        {lang === 'react' && (
          <button onClick={runReact} style={{
            padding: '5px 20px', borderRadius: 8, fontSize: 12, fontWeight: 700,
            border: 'none', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            color: '#fff', cursor: 'pointer', transition: 'all 0.15s',
            boxShadow: '0 2px 12px rgba(6,182,212,0.35)',
          }}>▶ Run</button>
        )}
      </div>

      {/* Editor + Output */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Editor pane */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}` }}>
          <CodeEditor
            key={`playground-${lang}`}
            value={code}
            onChange={val => setCode(val)}
            height="100%"
            path={lang === 'react' ? 'playground.jsx' : 'playground.js'}
            onReady={editor => { editorRef.current = editor; }}
            onSave={() => { lang === 'javascript' ? runJs() : runReact(); }}
          />
        </div>

        {/* Output pane */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {lang === 'javascript' ? (
            /* JS output */
            <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
              <div style={{
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                color: isLight ? '#64748b' : '#64748b', marginBottom: 12,
              }}>
                📟 Console Output
              </div>
              {jsOutput ? (
                <pre style={{
                  margin: 0, padding: 16, borderRadius: 10,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 13, lineHeight: 1.7,
                  background: jsOutput.startsWith('❌') ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.06)',
                  border: `1px solid ${jsOutput.startsWith('❌') ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.2)'}`,
                  color: jsOutput.startsWith('❌') ? '#fca5a5' : '#86efac',
                  whiteSpace: 'pre-wrap', wordBreak: 'break-all',
                }}>{jsOutput}</pre>
              ) : (
                <div style={{
                  color: isLight ? '#94a3b8' : '#475569', fontSize: 13, marginTop: 40, textAlign: 'center',
                }}>
                  Click <strong>▶ Run</strong> or press <strong>Cmd+S</strong> to see output
                </div>
              )}
            </div>
          ) : (
            /* React preview */
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{
                padding: '8px 16px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.05em', color: '#22d3ee', flexShrink: 0,
                borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
              }}>
                ⚛️ Live Preview
              </div>
              <iframe
                ref={iframeRef}
                title="React Playground"
                sandbox="allow-scripts allow-modals"
                style={{
                  flex: 1, width: '100%', border: 'none',
                  background: '#fff', borderRadius: 0,
                }}
              />
              {reactLogs.length > 0 && (
                <div style={{
                  maxHeight: 140, overflowY: 'auto', flexShrink: 0,
                  borderTop: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
                  padding: '8px 12px',
                  background: isLight ? '#f8fafc' : 'rgba(0,0,0,0.3)',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                }}>
                  {reactLogs.map((log, i) => (
                    <div key={i} style={{
                      color: log.level === 'error' ? '#ef4444' : log.level === 'warn' ? '#f59e0b' : (isLight ? '#374151' : '#94a3b8'),
                      lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-all',
                    }}>{log.level === 'error' ? '❌ ' : log.level === 'warn' ? '⚠️ ' : '› '}{log.text}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default function CodePractice({ isLight, initialProblemId }) {
  const STORAGE_KEY = 'codePractice:codes';
  const [mode, setMode] = useState('problems'); // 'problems' | 'playground'
  const [activeId, setActiveId] = useState(
    initialProblemId && allQuestions.some(q => q.id === initialProblemId)
      ? initialProblemId
      : 1
  );
  const [codes, setCodes] = useState(() => {
    const defaults = Object.fromEntries(allQuestions.map(q => [q.id, q.starterCode]));
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return { ...defaults, ...saved };
    } catch {
      return defaults;
    }
  });
  const [outputs, setOutputs] = useState({});
  const [showSolution, setShowSolution] = useState({});
  const [search, setSearch] = useState('');
  const [filterDiff, setFilterDiff] = useState('All');
  const [filterCat, setFilterCat] = useState('All');
  const [listCollapsed, setListCollapsed] = useState(false);

  const activeQ = allQuestions.find(q => q.id === activeId);

  const filtered = allQuestions.filter(q => {
    const matchSearch = !search || q.title.toLowerCase().includes(search.toLowerCase());
    const matchDiff = filterDiff === 'All' || q.difficulty === filterDiff;
    const matchCat = filterCat === 'All' || q.category === filterCat;
    return matchSearch && matchDiff && matchCat;
  });

  // Holds the live Monaco editor instance for the editable pane (for formatting)
  const editorInstanceRef = useRef(null);

  // Auto-save: persist all code to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
    } catch {
      /* storage full or unavailable — ignore */
    }
  }, [codes]);

  const runCode = (codeArg) => {
    const code = (typeof codeArg === 'string' ? codeArg : null) ?? codes[activeId] ?? '';
    const activeIdSnapshot = activeId;

    const workerSrc = `
      self.onmessage = function(e) {
        var logs = [];
        var fakeConsole = {
          log: function() {
            var args = Array.prototype.slice.call(arguments);
            logs.push(args.map(function(a) {
              if (Array.isArray(a)) return '[' + a.join(', ') + ']';
              if (typeof a === 'object' && a !== null) { try { return JSON.stringify(a); } catch(_) { return String(a); } }
              return String(a);
            }).join(' '));
          },
          error: function() { logs.push('ERROR: ' + Array.prototype.slice.call(arguments).join(' ')); },
          warn: function() { logs.push('WARN: ' + Array.prototype.slice.call(arguments).join(' ')); },
        };
        try {
          new Function('console', e.data)(fakeConsole);
          self.postMessage({ ok: true, logs: logs });
        } catch(err) {
          self.postMessage({ ok: false, error: err.name + ': ' + err.message });
        }
      };
    `;
    const blob = new Blob([workerSrc], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);

    const timeout = setTimeout(() => {
      worker.terminate();
      URL.revokeObjectURL(url);
      setOutputs(prev => ({ ...prev, [activeIdSnapshot]: '❌ Timed out: possible infinite loop (>5s)' }));
    }, 5000);

    worker.onmessage = (e) => {
      clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(url);
      const { ok, logs, error } = e.data;
      setOutputs(prev => ({
        ...prev,
        [activeIdSnapshot]: ok ? (logs.length ? logs.join('\n') : '(no output)') : `❌ ${error}`,
      }));
    };

    worker.onerror = (e) => {
      clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(url);
      setOutputs(prev => ({ ...prev, [activeIdSnapshot]: `❌ ${e.message}` }));
    };

    worker.postMessage(code);
  };

  // Format the editable Monaco document via its built-in formatter
  const formatActiveEditor = () => {
    const editor = editorInstanceRef.current;
    if (!editor) return;
    const action = editor.getAction('editor.action.formatDocument');
    if (action) action.run();
  };

  const activeCode = codes[activeId];

  // Page-level guard: Cmd/Ctrl+S runs the code instead of opening the browser save dialog
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        if (activeQ && activeQ.type !== 'react') {
          formatActiveEditor();
          runCode(codes[activeId]);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, activeQ, codes]);


  const toggleSolution = () => {
    setShowSolution(prev => ({ ...prev, [activeId]: !prev[activeId] }));
  };

  const resetCode = () => {
    setCodes(prev => ({ ...prev, [activeId]: activeQ.starterCode }));
    setOutputs(prev => ({ ...prev, [activeId]: null }));
  };

  const modeTabs = [
    { id: 'problems', label: '🧩 Problems', color: '#34d399' },
    { id: 'playground', label: '🧪 Playground', color: '#818cf8' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>

      {/* Mode switcher bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '8px 24px', flexShrink: 0,
        borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
        background: isLight ? '#f8fafc' : 'rgba(255,255,255,0.02)',
      }}>
        {modeTabs.map(t => (
          <button
            key={t.id}
            onClick={() => setMode(t.id)}
            style={{
              padding: '6px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              border: mode === t.id
                ? `1.5px solid ${t.color}`
                : `1.5px solid transparent`,
              background: mode === t.id ? `${t.color}18` : 'transparent',
              color: mode === t.id ? t.color : isLight ? '#64748b' : '#94a3b8',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {mode === 'playground' ? (
        <Playground isLight={isLight} />
      ) : (
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', paddingLeft: !listCollapsed ? '16px' : '12px' }}>

      {/* ── Question List Sidebar ── */}
      {listCollapsed ? (
        /* Collapsed: thin icon strip */
        <div style={{
          width: 40, flexShrink: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', paddingTop: 12,
          borderRight: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
          background: isLight ? '#f8fafc' : 'rgba(255,255,255,0.02)',
          cursor: 'pointer',
          gap: 10,
        }} onClick={() => setListCollapsed(false)} title="Expand problem list">
          <button style={{
            width: 28, height: 28, borderRadius: 7, border: 'none', cursor: 'pointer',
            background: isLight ? '#e2e8f0' : 'rgba(255,255,255,0.08)',
            color: isLight ? '#475569' : '#94a3b8',
            fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>›</button>
          <span style={{
            writingMode: 'vertical-rl', transform: 'rotate(180deg)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
            color: isLight ? '#94a3b8' : '#475569',
          }}>Problems</span>
          <span style={{ fontSize: 18 }}>🧩</span>
        </div>
      ) : (
        /* Expanded question list */
        <div style={{
          width: 280, flexShrink: 0,
          borderRight: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          transition: 'width 0.2s ease',
        }}>
          {/* Header */}
          <div style={{ padding: '14px 14px 10px', borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: isLight ? '#1e293b' : '#e2e8f0' }}>
                🧩 Problems
              </span>
              <span style={{ marginLeft: 6, fontSize: 12, color: '#60a5fa' }}>({allQuestions.length})</span>
              {/* Collapse button */}
              <button onClick={() => setListCollapsed(true)} title="Collapse problem list" style={{
                marginLeft: 'auto', width: 24, height: 24, borderRadius: 6, border: 'none',
                background: isLight ? '#e2e8f0' : 'rgba(255,255,255,0.08)',
                color: isLight ? '#475569' : '#94a3b8',
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>‹</button>
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
                cursor: 'pointer', transition: 'all 0.15s',
              }}>{d}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 5, marginTop: 5, flexWrap: 'wrap' }}>
            {['All','Array','String','React'].map(c => (
              <button key={c} onClick={() => setFilterCat(c)} style={{
                padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600,
                border: `1px solid ${filterCat === c ? (c === 'React' ? '#22d3ee' : '#a78bfa') : isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
                background: filterCat === c ? (c === 'React' ? 'rgba(34,211,238,0.15)' : 'rgba(167,139,250,0.15)') : 'transparent',
                color: filterCat === c ? (c === 'React' ? '#22d3ee' : '#a78bfa') : isLight ? '#64748b' : '#94a3b8',
                cursor: 'pointer', transition: 'all 0.15s',
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
      )}

      {/* Main Content */}
      {activeQ && activeQ.type === 'react' ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Top bar for React questions */}
          <div style={{
            padding: '14px 24px', flexShrink: 0,
            borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: isLight ? '#1e293b' : '#f1f5f9' }}>
              {activeQ.title}
            </span>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
              color: DIFFICULTY_COLORS[activeQ.difficulty].text,
              background: DIFFICULTY_COLORS[activeQ.difficulty].bg,
              border: `1px solid ${DIFFICULTY_COLORS[activeQ.difficulty].border}`,
            }}>{activeQ.difficulty}</span>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
              color: '#22d3ee', background: 'rgba(34,211,238,0.12)',
            }}>⚛️ React</span>
            {activeQ.estimatedTime && (
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
                color: '#f59e0b', background: 'rgba(245,158,11,0.12)',
                border: '1px solid rgba(245,158,11,0.3)',
                marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 3,
              }}>⏱ {activeQ.estimatedTime}</span>
            )}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <ReactIDE key={activeQ.id} question={activeQ} isLight={isLight} />
          </div>
        </div>
      ) : activeQ && (
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
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{
                fontSize: 10, fontWeight: 600, color: isLight ? '#94a3b8' : '#64748b',
                display: 'flex', alignItems: 'center', gap: 4, marginRight: 2,
              }} title="Press Cmd/Ctrl+S to format and run your code">
                ⚡ Run on Cmd+S
              </span>
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
              <button onClick={() => runCode()} style={{
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
                onReady={editor => { editorInstanceRef.current = editor; }}
                onSave={() => { formatActiveEditor(); runCode(codes[activeId]); }}
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
