import { useState, useRef, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';

function buildSandbox(userCode) {
  const encoded = JSON.stringify(userCode);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #fff; }
  </style>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
</head>
<body>
  <div id="root"></div>
  <script>
    function _ser(a) {
      if (a === null) return 'null';
      if (a === undefined) return 'undefined';
      if (typeof a === 'object') { try { return JSON.stringify(a, null, 2); } catch(e) { return String(a); } }
      return String(a);
    }
    function _send(level, args) {
      window.parent.postMessage({ type: 'console', level, text: Array.from(args).map(_ser).join(' ') }, '*');
    }
    const _cl = console.log.bind(console);
    console.log   = (...a) => { _send('log', a); _cl(...a); };
    console.warn  = (...a) => { _send('warn', a); };
    console.error = (...a) => { _send('error', a); };
    window.onerror = (msg, src, line, col, err) => {
      _send('error', [err ? (err.stack || err.toString()) : msg]);
      return true;
    };
    window.onunhandledrejection = (e) => { _send('error', [String(e.reason)]); };

    function require(mod) {
      if (mod === 'react') return React;
      if (mod === 'react-dom' || mod === 'react-dom/client') return ReactDOM;
      console.warn('Module not available in sandbox: ' + mod);
      return {};
    }

    ['useState','useEffect','useRef','useCallback','useMemo','useReducer',
     'useContext','createContext','useLayoutEffect','useId','useTransition',
     'useImperativeHandle','useDebugValue','Fragment','memo','forwardRef',
    ].forEach(function(h) { if (React[h] !== undefined) window[h] = React[h]; });

    window.addEventListener('load', function() {
      var userSource = ${encoded};
      var el = document.getElementById('root');
      try {
        var result = Babel.transform(userSource, {
          presets: [['react', { runtime: 'classic' }]],
          plugins: ['transform-modules-commonjs'],
          filename: 'app.jsx',
        });
        var _module  = { exports: {} };
        var _exports = _module.exports;
        var fn = new Function('React', 'ReactDOM', 'require', 'module', 'exports', result.code);
        fn(React, ReactDOM, require, _module, _exports);
        var Comp = _module.exports['default'] || _module.exports;
        if (typeof Comp !== 'function') Comp = null;
        if (!Comp) {
          el.innerHTML = '<div style="color:#ef4444;padding:20px;font-family:monospace;font-size:13px">⚠️ No default export found.<br/><br/>Add at the bottom of your code:<br/><b>export default YourComponentName;</b></div>';
          return;
        }
        ReactDOM.createRoot(el).render(React.createElement(Comp));
      } catch(e) {
        _send('error', [e.stack || e.toString()]);
        el.innerHTML = '<pre style="color:#ef4444;padding:16px;white-space:pre-wrap;font-size:12px;margin:0">' + e.toString() + '</pre>';
      }
    });
  <\/script>
</body>
</html>`;
}

function ReactEditor({ value, onChange, readOnly = false }) {
  const containerRef = useRef(null);
  const [editorHeight, setEditorHeight] = useState(400);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        setEditorHeight(Math.max(100, entry.contentRect.height - 37));
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  function beforeMount(monaco) {
    const jsxCompilerOpts = {
      jsx: monaco.languages.typescript.JsxEmit.React,
      jsxFactory: 'React.createElement',
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      allowJs: true,
      checkJs: false,
    };
    const noDiagnostics = { noSemanticValidation: true, noSyntaxValidation: true };
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions(jsxCompilerOpts);
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(noDiagnostics);
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(jsxCompilerOpts);
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(noDiagnostics);

    const reactTypes = `
declare namespace React {
  type ReactNode = ReactElement | string | number | boolean | null | undefined;
  interface ReactElement { type: any; props: any; key: any; }
  interface FC<P = {}> { (props: P): ReactElement | null; displayName?: string; }
  type CSSProperties = { [key: string]: string | number };
  interface HTMLAttributes<T> {
    className?: string; id?: string; style?: CSSProperties;
    onClick?: (e: MouseEvent) => void; onChange?: (e: any) => void;
    onSubmit?: (e: any) => void; onKeyDown?: (e: any) => void;
    onKeyUp?: (e: any) => void; onFocus?: (e: any) => void;
    onBlur?: (e: any) => void; onMouseEnter?: (e: any) => void;
    onMouseLeave?: (e: any) => void; children?: ReactNode;
    placeholder?: string; value?: string | number; type?: string;
    disabled?: boolean; checked?: boolean; href?: string; src?: string;
    alt?: string; ref?: any; key?: any; [key: string]: any;
  }
  function createElement(type: any, props?: any, ...children: any[]): ReactElement;
  function useState<T>(init: T | (() => T)): [T, (val: T | ((prev: T) => T)) => void];
  function useEffect(fn: () => void | (() => void), deps?: any[]): void;
  function useCallback<T extends (...args: any[]) => any>(fn: T, deps: any[]): T;
  function useMemo<T>(fn: () => T, deps: any[]): T;
  function useRef<T = any>(init?: T): { current: T };
  function useReducer<S, A>(reducer: (state: S, action: A) => S, init: S): [S, (action: A) => void];
  function useContext<T>(ctx: Context<T>): T;
  function useLayoutEffect(fn: () => void | (() => void), deps?: any[]): void;
  function useId(): string;
  function useTransition(): [boolean, (fn: () => void) => void];
  function memo<T>(component: T): T;
  function forwardRef<T, P = {}>(render: (props: P, ref: any) => ReactElement | null): FC<P & { ref?: any }>;
  interface Context<T> { Provider: FC<{ value: T; children?: ReactNode }>; }
  function createContext<T>(defaultValue: T): Context<T>;
  const Fragment: any;
}
declare function useState<T>(init: T | (() => T)): [T, (val: T | ((prev: T) => T)) => void];
declare function useEffect(fn: () => void | (() => void), deps?: any[]): void;
declare function useCallback<T extends (...args: any[]) => any>(fn: T, deps: any[]): T;
declare function useMemo<T>(fn: () => T, deps: any[]): T;
declare function useRef<T = any>(init?: T): { current: T };
declare function useReducer<S, A>(reducer: (state: S, action: A) => S, init: S): [S, (action: A) => void];
declare function useContext<T>(ctx: any): T;
declare function useLayoutEffect(fn: () => void | (() => void), deps?: any[]): void;
declare function useId(): string;
declare function useTransition(): [boolean, (fn: () => void) => void];
declare function createContext<T>(defaultValue: T): any;
declare const Fragment: any;
declare function memo<T>(component: T): T;
declare function forwardRef<T, P = {}>(render: (props: P, ref: any) => any): any;
`;
    monaco.languages.typescript.javascriptDefaults.addExtraLib(reactTypes, 'file:///react-globals.d.ts');

    monaco.editor.defineTheme('solution-dark', {
      base: 'vs-dark', inherit: true,
      rules: [
        { token: '', foreground: 'a5f3a5' },
        { token: 'keyword', foreground: '4ade80', fontStyle: 'bold' },
        { token: 'string', foreground: '86efac' },
        { token: 'comment', foreground: '6ee7a0', fontStyle: 'italic' },
      ],
      colors: { 'editor.background': '#0a1a0f', 'editor.lineHighlightBackground': '#0f2a18' },
    });
  }

  function handleMount(editor, monaco) {
    const model = editor.getModel();
    if (model) {
      const clearMarkers = () => {
        ['typescript', 'javascript'].forEach(owner =>
          monaco.editor.setModelMarkers(model, owner, [])
        );
      };
      clearMarkers();
      monaco.editor.onDidChangeMarkers(uris => {
        if (uris.some(u => u.toString() === model.uri.toString())) clearMarkers();
      });
    }
    if (!readOnly) editor.focus();
  }

  return (
    <div ref={containerRef} style={{ height: '100%', display: 'flex', flexDirection: 'column',
      background: readOnly ? '#0a1a0f' : '#1e1e1e' }}>
      <div style={{
        display: 'flex', gap: 6, padding: '8px 14px', alignItems: 'center', flexShrink: 0,
        background: readOnly ? '#0a1a0f' : '#252526',
        borderBottom: `1px solid ${readOnly ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.06)'}`,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28ca41', display: 'inline-block' }} />
        <span style={{ marginLeft: 8, fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>
          {readOnly ? 'solution.jsx' : 'App.jsx'}
        </span>
        <span style={{
          marginLeft: 'auto', fontSize: 10, borderRadius: 6, padding: '2px 8px',
          ...(readOnly
            ? { background: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)' }
            : { background: 'rgba(96,165,250,0.15)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.3)' }),
        }}>
          {readOnly ? '✨ Solution' : '⚛️ JSX • React'}
        </span>
      </div>
      <Editor
        height={editorHeight}
        language="javascript"
        path={readOnly ? 'solution.jsx' : 'app.jsx'}
        value={value}
        theme={readOnly ? 'solution-dark' : 'vs-dark'}
        beforeMount={beforeMount}
        onMount={handleMount}
        onChange={val => !readOnly && onChange(val ?? '')}
        options={{
          readOnly, fontSize: 13,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true, lineHeight: 22,
          minimap: { enabled: false }, scrollBeyondLastLine: false,
          wordWrap: 'on', automaticLayout: true, tabSize: 2,
          padding: { top: 14, bottom: 14 },
          bracketPairColorization: { enabled: true },
          scrollbar: { verticalScrollbarSize: 4 },
          smoothScrolling: true, cursorBlinking: 'smooth',
          renderLineHighlight: readOnly ? 'none' : 'line',
        }}
      />
    </div>
  );
}

function ConsoleLine({ entry }) {
  const colors = { log: '#86efac', warn: '#fbbf24', error: '#fca5a5' };
  const icons  = { log: '›', warn: '⚠', error: '✕' };
  return (
    <div style={{
      display: 'flex', gap: 8, padding: '5px 0',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      fontFamily: "'JetBrains Mono', monospace", fontSize: 12, lineHeight: 1.6,
      color: colors[entry.level] || '#e2e8f0',
    }}>
      <span style={{ opacity: 0.5, flexShrink: 0, minWidth: 12 }}>{icons[entry.level] || '›'}</span>
      <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{entry.text}</span>
    </div>
  );
}

// Thin vertical strip shown when a panel is collapsed
function CollapsedStrip({ label, icon, color, onClick, side }) {
  return (
    <div
      onClick={onClick}
      title={`Expand ${label}`}
      style={{
        width: 28, flexShrink: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        background: 'rgba(255,255,255,0.03)',
        borderRight: side === 'left'  ? '1px solid rgba(255,255,255,0.08)' : undefined,
        borderLeft:  side === 'right' ? '1px solid rgba(255,255,255,0.08)' : undefined,
        gap: 8, transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
    >
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span style={{
        writingMode: 'vertical-rl', textOrientation: 'mixed',
        fontSize: 10, fontWeight: 700, color, letterSpacing: '0.08em',
        transform: 'rotate(180deg)',
      }}>{label}</span>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
        {side === 'left' ? '›' : '‹'}
      </span>
    </div>
  );
}

// Draggable resize divider with grip dots
function ResizeDivider({ onMouseDown, isLight }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Drag to resize panels"
      style={{
        width: 6, flexShrink: 0, position: 'relative',
        cursor: 'col-resize',
        background: hovered
          ? 'rgba(99,102,241,0.55)'
          : isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)',
        transition: 'background 0.15s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 10,
      }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 3,
        opacity: hovered ? 0.9 : 0.3, transition: 'opacity 0.15s',
      }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            width: 2, height: 2, borderRadius: '50%',
            background: hovered ? '#818cf8' : '#94a3b8',
          }} />
        ))}
      </div>
    </div>
  );
}

const DEFAULT_DESC_WIDTH = 260;
const DEFAULT_PREVIEW_WIDTH = 420;
const MIN_WIDTH = 80;

export default function ReactIDE({ question, isLight }) {
  const [code, setCode] = useState(question.starterCode);
  const [showSolution, setShowSolution] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [sandboxSrc, setSandboxSrc] = useState('');
  const [activeTab, setActiveTab] = useState('preview');
  const [hasRun, setHasRun] = useState(false);
  const consoleRef = useRef(null);
  const containerRef = useRef(null);

  const [descCollapsed,    setDescCollapsed]    = useState(false);
  const [previewCollapsed, setPreviewCollapsed] = useState(false);

  // Resizable panel widths
  const [descWidth,    setDescWidth]    = useState(DEFAULT_DESC_WIDTH);
  const [previewWidth, setPreviewWidth] = useState(DEFAULT_PREVIEW_WIDTH);
  const dragRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === 'console') {
        setConsoleLogs(prev => [...prev, { level: e.data.level, text: e.data.text }]);
        if (e.data.level === 'error') setActiveTab('console');
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [consoleLogs]);

  useEffect(() => {
    setCode(question.starterCode);
    setShowSolution(false);
    setConsoleLogs([]);
    setSandboxSrc('');
    setHasRun(false);
  }, [question.id]);

  const runCode = useCallback(() => {
    setConsoleLogs([]);
    setActiveTab('preview');
    setHasRun(true);
    setSandboxSrc(buildSandbox(code));
  }, [code]);

  const reset = () => {
    setCode(question.starterCode);
    setSandboxSrc('');
    setConsoleLogs([]);
    setHasRun(false);
    setShowSolution(false);
  };

  // Start dragging a panel divider
  const startDrag = useCallback((panel, e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = panel === 'desc' ? descWidth : previewWidth;
    dragRef.current = { panel, startX, startWidth };

    const onMove = (ev) => {
      if (!dragRef.current) return;
      const delta = ev.clientX - dragRef.current.startX;
      const containerW = containerRef.current?.offsetWidth ?? 1200;
      const otherFixed = panel === 'desc' ? previewWidth : descWidth;
      const maxW = containerW - otherFixed - MIN_WIDTH * 2;

      if (panel === 'desc') {
        setDescWidth(Math.max(MIN_WIDTH, Math.min(dragRef.current.startWidth + delta, maxW)));
      } else {
        // Preview panel grows leftward, so delta is inverted
        setPreviewWidth(Math.max(MIN_WIDTH, Math.min(dragRef.current.startWidth - delta, maxW)));
      }
    };

    const onUp = () => {
      dragRef.current = null;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [descWidth, previewWidth]);

  const errorCount = consoleLogs.filter(l => l.level === 'error').length;

  const CollapseBtn = ({ collapsed, onClick, direction }) => (
    <button
      onClick={onClick}
      title={collapsed ? 'Expand' : 'Collapse'}
      style={{
        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        zIndex: 20, width: 16, height: 36, borderRadius: 4,
        border: '1px solid rgba(255,255,255,0.12)',
        background: isLight ? '#e2e8f0' : '#1e1e2e',
        color: isLight ? '#475569' : '#94a3b8',
        fontSize: 10, fontWeight: 700,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 0,
        ...(direction === 'right' ? { right: -8 } : { left: -8 }),
      }}
    >
      {direction === 'right'
        ? (collapsed ? '›' : '‹')
        : (collapsed ? '‹' : '›')}
    </button>
  );

  return (
    <div ref={containerRef} style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

      {/* ── DESCRIPTION PANEL ── */}
      {descCollapsed ? (
        <CollapsedStrip
          label="PROBLEM" icon="📋" color="#60a5fa" side="left"
          onClick={() => setDescCollapsed(false)}
        />
      ) : (
        <div style={{
          width: descWidth, flexShrink: 0, display: 'flex', flexDirection: 'column',
          position: 'relative',
        }}>
          <CollapseBtn collapsed={false} direction="right" onClick={() => setDescCollapsed(true)} />

          <div style={{
            flex: 1, overflowY: 'auto', padding: '14px 14px',
            borderRight: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
          }}>
            <div style={{
              padding: '14px 16px', borderRadius: 12, marginBottom: 12,
              border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
              background: isLight ? '#fff' : 'rgba(255,255,255,0.03)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#60a5fa',
                  textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  📋 Problem
                </div>
                {question.estimatedTime && (
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
                    color: '#f59e0b', background: 'rgba(245,158,11,0.12)',
                    border: '1px solid rgba(245,158,11,0.3)',
                    borderRadius: 6, padding: '2px 7px',
                    display: 'flex', alignItems: 'center', gap: 3,
                  }}>
                    ⏱ {question.estimatedTime}
                  </div>
                )}
              </div>
              <pre style={{
                margin: 0, fontFamily: 'inherit', fontSize: 12.5, lineHeight: 1.75,
                color: isLight ? '#374151' : '#cbd5e1', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              }}>{question.description}</pre>
            </div>

            {showSolution && (
              <div style={{ padding: '12px 14px', borderRadius: 10,
                border: '1px solid rgba(167,139,250,0.25)', background: 'rgba(167,139,250,0.06)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#a78bfa', marginBottom: 6,
                  textTransform: 'uppercase', letterSpacing: '0.06em' }}>💡 Key Concepts</div>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.7, color: isLight ? '#4b5563' : '#c4b5fd' }}>
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── RESIZE DIVIDER: Description ↔ Editor ── */}
      {!descCollapsed && (
        <ResizeDivider isLight={isLight} onMouseDown={(e) => startDrag('desc', e)} />
      )}

      {/* ── EDITOR PANEL (flex:1) ── */}
      <div style={{
        flex: 1, minWidth: MIN_WIDTH, display: 'flex', flexDirection: 'column', position: 'relative',
        borderRight: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
      }}>
        {descCollapsed && (
          <button
            onClick={() => setDescCollapsed(false)}
            title="Expand description"
            style={{
              position: 'absolute', top: '50%', left: -8, transform: 'translateY(-50%)',
              zIndex: 20, width: 16, height: 36, borderRadius: 4,
              border: '1px solid rgba(255,255,255,0.12)',
              background: isLight ? '#e2e8f0' : '#1e1e2e',
              color: '#60a5fa', fontSize: 10, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
            }}
          >›</button>
        )}

        {/* Toolbar */}
        <div style={{
          padding: '8px 12px', display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0,
          background: isLight ? '#f8fafc' : '#1a1a2e',
          borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: isLight ? '#64748b' : '#475569',
            textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ✏️ Editor
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            <button onClick={reset} style={{
              padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600,
              border: `1px solid ${isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)'}`,
              background: 'transparent', color: isLight ? '#64748b' : '#94a3b8', cursor: 'pointer',
            }}>↺ Reset</button>
            <button onClick={() => setShowSolution(s => !s)} style={{
              padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600,
              border: '1px solid rgba(167,139,250,0.4)',
              background: showSolution ? 'rgba(167,139,250,0.2)' : 'rgba(167,139,250,0.08)',
              color: '#a78bfa', cursor: 'pointer',
            }}>
              {showSolution ? '👁 Hide' : '✨ Solution'}
            </button>
            <button onClick={runCode} style={{
              padding: '6px 20px', borderRadius: 7, fontSize: 12, fontWeight: 700,
              border: 'none', background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              color: '#fff', cursor: 'pointer', boxShadow: '0 2px 10px rgba(99,102,241,0.4)',
            }}>▶ Run</button>
          </div>
        </div>

        {/* Monaco editor */}
        <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
          <ReactEditor key={`editor-${question.id}`} value={code} onChange={setCode} />
        </div>

        {/* Solution panel */}
        {showSolution && (
          <div style={{ height: 280, flexShrink: 0, borderTop: '2px solid rgba(167,139,250,0.2)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#a78bfa',
              textTransform: 'uppercase', letterSpacing: '0.06em', padding: '6px 14px',
              background: 'rgba(167,139,250,0.06)', borderBottom: '1px solid rgba(167,139,250,0.12)' }}>
              ✨ Optimal Solution
            </div>
            <div style={{ height: 'calc(100% - 28px)' }}>
              <ReactEditor key={`solution-${question.id}`} value={question.solution} onChange={() => {}} readOnly />
            </div>
          </div>
        )}
      </div>

      {/* ── RESIZE DIVIDER: Editor ↔ Preview ── */}
      {!previewCollapsed && (
        <ResizeDivider isLight={isLight} onMouseDown={(e) => startDrag('preview', e)} />
      )}

      {/* ── PREVIEW + CONSOLE PANEL ── */}
      {previewCollapsed ? (
        <CollapsedStrip
          label="PREVIEW" icon="⚛️" color="#22d3ee" side="right"
          onClick={() => setPreviewCollapsed(false)}
        />
      ) : (
        <div style={{
          width: previewWidth, flexShrink: 0, display: 'flex', flexDirection: 'column',
          overflow: 'hidden', position: 'relative',
        }}>
          <button
            onClick={() => setPreviewCollapsed(true)}
            title="Collapse preview"
            style={{
              position: 'absolute', top: '50%', left: -2, transform: 'translateY(-50%)',
              zIndex: 20, width: 16, height: 36, borderRadius: 4,
              border: '1px solid rgba(255,255,255,0.12)',
              background: isLight ? '#e2e8f0' : '#1e1e2e',
              color: isLight ? '#475569' : '#94a3b8',
              fontSize: 10, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
            }}
          >›</button>

          {/* Tab bar */}
          <div style={{
            display: 'flex', alignItems: 'center', flexShrink: 0,
            borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
            padding: '0 10px',
            background: isLight ? '#f8fafc' : '#1a1a2e',
            borderLeft: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
          }}>
            {['preview', 'console'].map(tab => {
              const isActive = activeTab === tab;
              const hasErr = tab === 'console' && errorCount > 0;
              return (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: '9px 14px', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
                  background: 'transparent', marginRight: 2,
                  color: isActive ? (hasErr ? '#ef4444' : '#60a5fa') : isLight ? '#94a3b8' : '#475569',
                  borderBottom: isActive
                    ? `2px solid ${hasErr ? '#ef4444' : '#60a5fa'}`
                    : '2px solid transparent',
                }}>
                  {tab === 'preview' ? '⚛️ Preview' : '🖥 Console'}
                  {tab === 'console' && consoleLogs.length > 0 && (
                    <span style={{
                      marginLeft: 5, fontSize: 10, padding: '1px 5px', borderRadius: 8,
                      background: hasErr ? '#ef4444' : 'rgba(255,255,255,0.12)',
                      color: hasErr ? '#fff' : '#94a3b8',
                    }}>{consoleLogs.length}</span>
                  )}
                </button>
              );
            })}
            {consoleLogs.length > 0 && (
              <button onClick={() => setConsoleLogs([])} style={{
                marginLeft: 'auto', padding: '4px 9px', fontSize: 10, borderRadius: 5,
                border: `1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
                background: 'transparent', color: isLight ? '#94a3b8' : '#475569', cursor: 'pointer',
              }}>Clear</button>
            )}
          </div>

          {/* Preview iframe */}
          <div style={{ flex: 1, overflow: 'hidden', display: activeTab === 'preview' ? 'flex' : 'none',
            flexDirection: 'column', background: isLight ? '#f8fafc' : '#0d1117',
            borderLeft: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}` }}>
            {!hasRun ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: 10, color: '#475569' }}>
                <div style={{ fontSize: 52 }}>⚛️</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: isLight ? '#94a3b8' : '#475569' }}>
                  Click ▶ Run to preview
                </div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Your React component renders here</div>
              </div>
            ) : (
              <iframe
                key={sandboxSrc.length}
                srcDoc={sandboxSrc}
                sandbox="allow-scripts allow-same-origin"
                style={{ flex: 1, border: 'none', background: '#fff', display: 'block' }}
                title="React Preview"
              />
            )}
          </div>

          {/* Console */}
          <div ref={consoleRef} style={{
            flex: 1, overflow: 'auto', padding: '10px 14px',
            background: '#0d1117',
            borderLeft: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
            display: activeTab === 'console' ? 'block' : 'none',
          }}>
            {consoleLogs.length === 0 ? (
              <div style={{ color: '#334155', fontSize: 12, fontFamily: 'monospace', paddingTop: 6 }}>
                Console output appears here after running your code.
              </div>
            ) : (
              consoleLogs.map((entry, i) => <ConsoleLine key={i} entry={entry} />)
            )}
          </div>
        </div>
      )}
    </div>
  );
}
