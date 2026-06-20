import { useEffect, useState } from 'react';

export default function CodeModal({ title, code, onClose, isLight }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const copy = async () => {
    await navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className={`
        modal-box w-full max-w-4xl max-h-[85vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl
        ${isLight ? 'bg-white border border-gray-200' : 'bg-[#141414] border border-white/10'}
      `}>
        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b flex-shrink-0 ${isLight ? 'border-gray-100' : 'border-white/8'}`}>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <span className={`text-sm font-semibold ${isLight ? 'text-gray-700' : 'text-white/80'}`}>{title}</span>
            <span className={`text-xs px-2 py-0.5 rounded-md ${isLight ? 'bg-gray-100 text-gray-500' : 'bg-white/8 text-white/40'}`}>JavaScript</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copy}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                ${copied
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : isLight
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                    : 'bg-white/8 text-white/60 hover:bg-white/12 border border-white/10'}
              `}
            >
              {copied ? '✓ Copied!' : '⎘ Copy'}
            </button>
            <button
              onClick={onClose}
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-colors
                ${isLight ? 'text-gray-400 hover:bg-gray-100' : 'text-white/40 hover:bg-white/8'}`}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Code */}
        <div className={`flex-1 overflow-auto p-6 ${isLight ? 'bg-gray-50' : 'bg-[#0d0d0d]'}`}>
          <pre className={`text-sm leading-relaxed ${isLight ? 'text-gray-800' : 'text-[#e2e8f0]'}`}>{code}</pre>
        </div>
      </div>
    </div>
  );
}
