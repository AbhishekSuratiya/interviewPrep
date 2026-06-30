import { useState, useRef, useCallback } from 'react';

function AnswerWithHighlight({ text, highlightIndex, className }) {
  const words = text.split(/(\s+)/);
  let wordCount = 0;

  return (
    <span className={className}>
      {words.map((segment, i) => {
        if (/^\s+$/.test(segment)) return segment;
        const idx = wordCount++;
        const active = idx === highlightIndex;
        return (
          <mark
            key={i}
            style={{ color: 'inherit', backgroundColor: active ? 'rgba(252,211,77,0.45)' : 'transparent' }}
            className="rounded px-0.5 transition-colors duration-100"
          >
            {segment}
          </mark>
        );
      })}
    </span>
  );
}

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

// textClassName — applied to the text paragraph (pass existing text color classes)
// compact — smaller button strip, used inline in dense layouts
export function ReadAloudPlayer({ text, isLight, textClassName = '', compact = false }) {
  const [status, setStatus] = useState('idle');
  const [wordIndex, setWordIndex] = useState(-1);
  const [speed, setSpeed] = useState(1);
  const charOffsetsRef = useRef([]);

  const buildOffsets = useCallback(() => {
    const offsets = [];
    const regex = /\S+/g;
    let m;
    while ((m = regex.exec(text)) !== null) offsets.push(m.index);
    charOffsetsRef.current = offsets;
  }, [text]);

  const createUtterance = useCallback((rate) => {
    buildOffsets();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;

    u.onboundary = (e) => {
      if (e.name !== 'word') return;
      const offsets = charOffsetsRef.current;
      let wi = offsets.findIndex(o => o >= e.charIndex);
      if (wi === -1) wi = offsets.length - 1;
      if (wi > 0 && Math.abs(offsets[wi - 1] - e.charIndex) <= Math.abs(offsets[wi] - e.charIndex)) wi--;
      setWordIndex(wi);
    };
    u.onend = () => { setStatus('done'); setWordIndex(-1); };
    u.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      setStatus('idle'); setWordIndex(-1);
    };
    return u;
  }, [text, buildOffsets]);

  const play = (rate = speed) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(createUtterance(rate));
    setStatus('playing');
  };

  const pause = () => { window.speechSynthesis.pause(); setStatus('paused'); };
  const resume = () => { window.speechSynthesis.resume(); setStatus('playing'); };
  const stop = () => { window.speechSynthesis.cancel(); setStatus('idle'); setWordIndex(-1); };
  const restart = (rate = speed) => {
    window.speechSynthesis.cancel();
    setWordIndex(-1);
    setTimeout(() => { window.speechSynthesis.speak(createUtterance(rate)); setStatus('playing'); }, 80);
  };

  const changeSpeed = (newSpeed) => {
    setSpeed(newSpeed);
    if (status === 'playing' || status === 'paused') {
      restart(newSpeed);
    }
  };

  const sz = compact ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-xs';
  const base = `flex items-center gap-1 rounded-lg font-medium transition-colors ${sz}`;
  const primary = isLight ? 'bg-amber-400 text-white hover:bg-amber-500' : 'bg-amber-500/40 text-amber-200 hover:bg-amber-500/55';
  const secondary = isLight ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-amber-500/15 text-amber-400 hover:bg-amber-500/25';
  const danger = isLight ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-red-500/15 text-red-400 hover:bg-red-500/25';

  return (
    <div>
      <p className={`text-sm leading-relaxed whitespace-pre-line ${textClassName}`}>
        <AnswerWithHighlight text={text} highlightIndex={wordIndex} />
      </p>

      <div className="flex items-center gap-2 mt-2 flex-wrap">
        {status === 'idle' && (
          <button onClick={() => play()} className={`${base} ${primary}`}>▶ Read Aloud</button>
        )}
        {status === 'playing' && (<>
          <button onClick={pause}       className={`${base} ${secondary}`}>⏸ Pause</button>
          <button onClick={() => restart()} className={`${base} ${secondary}`}>↺ Restart</button>
          <button onClick={stop}        className={`${base} ${danger}`}>⏹ Stop</button>
        </>)}
        {status === 'paused' && (<>
          <button onClick={resume}      className={`${base} ${primary}`}>▶ Continue</button>
          <button onClick={() => restart()} className={`${base} ${secondary}`}>↺ Restart</button>
          <button onClick={stop}        className={`${base} ${danger}`}>⏹ Stop</button>
        </>)}
        {status === 'done' && (
          <button onClick={() => restart()} className={`${base} ${secondary}`}>↺ Read Again</button>
        )}

        {/* Speed control */}
        <div className="flex items-center gap-1 ml-1">
          {SPEED_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => changeSpeed(s)}
              className={`rounded-md font-semibold transition-colors ${compact ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-[11px]'} ${
                speed === s
                  ? isLight ? 'bg-amber-400 text-white' : 'bg-amber-500/50 text-amber-200'
                  : isLight ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' : 'bg-white/5 text-white/35 hover:bg-white/10'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
