import { useEffect, useRef } from 'react';

/**
 * Renders a standalone HTML screen (like react-native-architecture.html) inside the app.
 * Uses srcdoc on an iframe so the page's own styles/scripts are fully isolated.
 */
export default function ScreenPage({ htmlPath, onBack, isLight }) {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    fetch(htmlPath)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then(html => {
        if (cancelled || !iframeRef.current) return;
        iframeRef.current.srcdoc = html;
      })
      .catch(e => console.error('Failed to load screen:', e));

    return () => { cancelled = true; };
  }, [htmlPath]);

  // Auto-resize iframe to fit content
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          const resizeObserver = new ResizeObserver(() => {
            const height = doc.documentElement.scrollHeight;
            iframe.style.height = height + 'px';
          });
          resizeObserver.observe(doc.documentElement);
          // Initial sizing
          iframe.style.height = doc.documentElement.scrollHeight + 'px';
        }
      } catch (e) {
        // srcdoc iframes should be same-origin, but fall back gracefully
        iframe.style.height = '100vh';
      }
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [htmlPath]);

  return (
    <div ref={containerRef} className="topic-page-enter">
      {/* Floating back button */}
      <div
        className={`
          sticky top-16 z-30 flex items-center gap-3 px-6 py-3 border-b backdrop-blur-md
          ${isLight ? 'bg-white/80 border-gray-200' : 'bg-[#030712]/80 border-white/6'}
        `}
      >
        <button
          onClick={onBack}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
            ${isLight ? 'text-gray-600 hover:bg-gray-100' : 'text-white/50 hover:bg-white/5'}
          `}
        >
          ← Back to React Native
        </button>
      </div>

      {/* Iframe with the standalone HTML page */}
      <iframe
        ref={iframeRef}
        title="Screen content"
        sandbox="allow-scripts allow-same-origin"
        style={{
          width: '100%',
          border: 'none',
          display: 'block',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      />
    </div>
  );
}
