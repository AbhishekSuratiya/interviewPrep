import { useEffect, useMemo, useRef } from 'react';

/**
 * Renders a standalone editorial HTML screen (like react-native-architecture.html)
 * directly in the React DOM — NO iframe. The document flows as normal page
 * content, so it scrolls with the rest of the app (no scroll-capture glitches).
 *
 * The screen's own <style> is scoped under `.screen-doc` so it can't leak into
 * the rest of the app, and its <script> (the interactive switches) runs against
 * the real DOM exactly as it would on a standalone page.
 */

// Bundle the raw HTML of every screen so it works in dev AND production build.
const RAW_SCREENS = import.meta.glob('../screens/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function rawFor(htmlPath) {
  const base = htmlPath.split('/').pop();
  const key = Object.keys(RAW_SCREENS).find((k) => k.endsWith('/' + base));
  return key ? RAW_SCREENS[key] : null;
}

/**
 * Prefix every rule in a stylesheet with `scope` so it only applies inside the
 * screen container. `:root`, `html`, and `body` selectors map onto the scope
 * element itself (so CSS variables and body styling still take effect).
 * @media / @supports blocks are recursed into; @keyframes / @font-face are
 * passed through untouched.
 */
function scopeCss(css, scope) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, ''); // strip comments
  const out = [];
  let i = 0;
  const n = css.length;

  while (i < n) {
    while (i < n && /\s/.test(css[i])) i++;
    if (i >= n) break;
    if (css[i] === '}') { i++; continue; }

    const start = i;
    while (i < n && css[i] !== '{' && css[i] !== '}' && css[i] !== ';') i++;
    const prelude = css.slice(start, i).trim();

    if (css[i] !== '{') {
      if (prelude) out.push(prelude + ';'); // e.g. @import
      i++;
      continue;
    }

    // Found '{' — capture the balanced block body.
    let depth = 1;
    i++;
    const bodyStart = i;
    while (i < n && depth > 0) {
      if (css[i] === '{') depth++;
      else if (css[i] === '}') depth--;
      if (depth > 0) i++;
    }
    const body = css.slice(bodyStart, i);
    i++; // skip closing '}'

    if (prelude.startsWith('@')) {
      if (/^@(media|supports|container|layer)/i.test(prelude)) {
        out.push(`${prelude}{${scopeCss(body, scope)}}`);
      } else {
        out.push(`${prelude}{${body}}`); // keyframes / font-face — leave alone
      }
    } else {
      const scoped = prelude
        .split(',')
        .map((sel) => {
          sel = sel.trim();
          if (!sel) return '';
          if (sel === ':root' || sel === 'html' || sel === 'body') return scope;
          if (sel.startsWith(':root')) return scope + sel.slice(5);
          if (sel.startsWith('html')) return scope + sel.slice(4);
          if (sel.startsWith('body')) return scope + sel.slice(4);
          return `${scope} ${sel}`;
        })
        .filter(Boolean)
        .join(', ');
      out.push(`${scoped}{${body}}`);
    }
  }

  return out.join('\n');
}

export default function ScreenPage({ htmlPath, onBack }) {
  const hostRef = useRef(null);
  const raw = useMemo(() => rawFor(htmlPath), [htmlPath]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !raw) return;

    const doc = new DOMParser().parseFromString(raw, 'text/html');

    // Scope + collect styles.
    const styleText = [...doc.querySelectorAll('style')]
      .map((s) => s.textContent)
      .join('\n');
    const scoped = scopeCss(styleText, '.screen-doc');

    // Pull scripts out so they don't get injected inertly via innerHTML.
    const scriptTexts = [...doc.body.querySelectorAll('script')].map((s) => s.textContent);
    doc.body.querySelectorAll('script').forEach((s) => s.remove());

    // Render styles + body markup.
    host.innerHTML = `<style>${scoped}</style>${doc.body.innerHTML}`;

    // Run the page's scripts in global scope against the live DOM, so their
    // top-level functions (e.g. setArch) become global for the inline onclick
    // handlers, and their getElementById calls resolve to the just-rendered
    // markup — exactly like a standalone page. Using global eval instead of an
    // injected <script> keeps this synchronous and idempotent, so React's
    // StrictMode mount→unmount→mount cycle always leaves the surviving mount
    // correctly initialized with nothing to clean up afterwards.
    for (const text of scriptTexts) {
      try {
        window.eval(text);
      } catch (err) {
        console.error('Screen script failed:', err);
      }
    }

    window.scrollTo({ top: 0 });

    return () => {
      host.innerHTML = '';
    };
  }, [raw]);

  return (
    <div className="topic-page-enter">
      {/* Floating back button */}
      <div
        className="sticky top-16 z-30 flex items-center gap-3 px-6 py-3"
        style={{
          background: 'rgba(237,240,245,0.82)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
          style={{
            fontFamily: 'var(--mono)',
            letterSpacing: '.04em',
            border: '1px solid var(--line)',
            background: 'var(--paper-2)',
            color: 'var(--slate)',
          }}
        >
          ← Back to React Native
        </button>
      </div>

      {!raw && (
        <div className="max-w-[1080px] mx-auto px-6 py-20 text-center" style={{ color: 'var(--slate)' }}>
          Could not load this page.
        </div>
      )}

      {/* The screen document renders here, in normal page flow. */}
      <div className="screen-doc" ref={hostRef} />
    </div>
  );
}
