import { useState } from 'react';
import { SKILLS } from '../hooks/useSkillData';

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

// Brand icons from devicon CDN + custom SVGs
const SKILL_ICONS = {
  javascript:    `${DEVICON_BASE}/javascript/javascript-original.svg`,
  react:         `${DEVICON_BASE}/react/react-original.svg`,
  'react-native':`${DEVICON_BASE}/react/react-original.svg`,
  typescript:    `${DEVICON_BASE}/typescript/typescript-original.svg`,
};

// React Native gets purple tint via CSS filter
const REACT_NATIVE_FILTER = 'invert(60%) sepia(80%) saturate(400%) hue-rotate(220deg) brightness(110%)';

const CODE_PRACTICE_ITEM = {
  id: 'code-practice',
  color: '#34d399',
  label: 'Code Practice',
};

// Inline SVG for Code Practice (no devicon equivalent)
function PuzzleIcon({ size = 20, color = '#34d399' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H19C19.5523 5 20 5.44772 20 6V8H22C22.5523 8 23 8.44772 23 9V15C23 15.5523 22.5523 16 22 16H20V18C20 18.5523 19.5523 19 19 19H17V21C17 21.5523 16.5523 22 16 22H8C7.44772 22 7 21.5523 7 21V19H5C4.44772 19 4 18.5523 4 18V16H2C1.44772 16 1 15.5523 1 15V9C1 8.44772 1.44772 8 2 8H4V6C4 5.44772 4.44772 5 5 5H7V3Z" fill={color} opacity="0.9"/>
    </svg>
  );
}

// Tooltip shown in icon-only mode
function Tooltip({ children, label, isLight, expanded }) {
  if (expanded) return children;
  return (
    <div style={{ position: 'relative' }} className="group">
      {children}
      <div style={{
        position: 'absolute', left: '100%', top: '50%', transform: 'translateY(-50%)',
        marginLeft: 10, whiteSpace: 'nowrap',
        padding: '5px 10px', borderRadius: 7, fontSize: 12, fontWeight: 600,
        background: isLight ? '#1e293b' : '#f1f5f9',
        color: isLight ? '#f1f5f9' : '#1e293b',
        pointerEvents: 'none', zIndex: 100,
        opacity: 0, transition: 'opacity 0.15s',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      }} className="group-hover:opacity-100">
        {label}
        <div style={{
          position: 'absolute', right: '100%', top: '50%', transform: 'translateY(-50%)',
          width: 0, height: 0,
          borderTop: '5px solid transparent', borderBottom: '5px solid transparent',
          borderRight: `5px solid ${isLight ? '#1e293b' : '#f1f5f9'}`,
        }} />
      </div>
    </div>
  );
}

export default function Sidebar({ activeSkill, onSelect, theme, onThemeToggle }) {
  const isLight = theme === 'light';
  const [hovered, setHovered] = useState(false);

  // expanded = hovered; collapsed = !hovered
  const expanded = hovered;
  const w = expanded ? 256 : 68;

  const renderIcon = (skill, size = 20) => {
    const src = SKILL_ICONS[skill.id];
    // Fallback for skills without a devicon (e.g. emoji/text icons)
    if (!src) {
      return (
        <span style={{ fontSize: size - 1, lineHeight: 1, display: 'block' }}>
          {skill.icon}
        </span>
      );
    }
    return (
      <img
        src={src}
        width={size} height={size}
        alt={skill.label}
        style={{
          filter: skill.id === 'react-native' ? REACT_NATIVE_FILTER : undefined,
          display: 'block',
        }}
      />
    );
  };

  const NavItem = ({ id, label, color, icon: iconEl, isActive, onClick }) => {
    const btn = (
      <button
        onClick={onClick}
        title={!expanded ? label : undefined}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: expanded ? 10 : 0,
          justifyContent: expanded ? 'flex-start' : 'center',
          padding: expanded ? '8px 10px' : '8px 0',
          borderRadius: 10,
          border: 'none',
          background: isActive
            ? isLight ? `${color}18` : 'rgba(255,255,255,0.09)'
            : 'transparent',
          cursor: 'pointer',
          transition: 'background 0.15s',
          textAlign: 'left',
          marginBottom: 2,
          boxShadow: 'none',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)'; }}
        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
      >
        {/* Icon box */}
        <span style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isActive ? `${color}22` : isLight ? '#f1f5f9' : 'rgba(255,255,255,0.06)',
          outline: isActive ? `2px solid ${color}` : '2px solid transparent',
          outlineOffset: 1,
          boxShadow: isActive ? `0 0 8px ${color}55` : 'none',
          transition: 'all 0.15s',
        }}>
          {iconEl}
        </span>

        {/* Label — only shown when expanded */}
        <span style={{
          fontSize: 13, fontWeight: 500,
          color: isActive ? (isLight ? color : '#f1f5f9') : isLight ? '#374151' : 'rgba(255,255,255,0.55)',
          flex: 1,
          opacity: expanded ? 1 : 0,
          maxWidth: expanded ? 160 : 0,
          transition: 'opacity 0.18s, max-width 0.18s',
          overflow: 'hidden',
        }}>{label}</span>

        {/* Active dot */}
        {isActive && (
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: color, flexShrink: 0,
            display: expanded ? 'inline-block' : 'none',
            opacity: expanded ? 1 : 0,
            transition: 'opacity 0.18s',
          }} />
        )}
      </button>
    );

    return (
      <Tooltip label={label} isLight={isLight} expanded={expanded}>
        {btn}
      </Tooltip>
    );
  };

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed', top: 0, left: 0, height: '100vh',
        width: w, zIndex: 40,
        display: 'flex', flexDirection: 'column',
        background: isLight ? '#ffffff' : '#111111',
        borderRight: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)'}`,
        transition: 'width 0.22s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
        boxShadow: expanded
          ? isLight ? '4px 0 24px rgba(0,0,0,0.08)' : '4px 0 24px rgba(0,0,0,0.4)'
          : 'none',
      }}
    >

      {/* Logo / Header */}
      <div style={{
        display: 'flex', alignItems: 'center',
        gap: expanded ? 10 : 0,
        justifyContent: expanded ? 'flex-start' : 'center',
        padding: expanded ? '16px 18px' : '16px 0',
        borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
        flexShrink: 0,
        transition: 'padding 0.22s, gap 0.22s',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}>
        {/* Logo mark */}
        <div style={{
          width: 32, height: 32, borderRadius: 9,
          background: 'linear-gradient(135deg, #60a5fa, #818cf8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 800, color: '#fff',
          flexShrink: 0, boxShadow: '0 2px 10px rgba(99,102,241,0.4)',
        }}>P</div>
        <div style={{
          opacity: expanded ? 1 : 0,
          maxWidth: expanded ? 160 : 0,
          transition: 'opacity 0.18s, max-width 0.18s',
          overflow: 'hidden',
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: isLight ? '#111827' : '#f1f5f9' }}>PrepDocs</div>
          <div style={{ fontSize: 10, color: isLight ? '#9ca3af' : 'rgba(255,255,255,0.3)' }}>Interview Prep</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: expanded ? '12px 10px' : '12px 8px' }}>

        {/* SKILLS section label */}
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: isLight ? '#9ca3af' : 'rgba(255,255,255,0.25)',
          padding: '2px 10px 8px',
          opacity: expanded ? 1 : 0,
          maxHeight: expanded ? 30 : 0,
          overflow: 'hidden',
          transition: 'opacity 0.18s, max-height 0.18s',
        }}>
          Skills
        </div>

        {SKILLS.map(skill => (
          <NavItem
            key={skill.id}
            id={skill.id}
            label={skill.label}
            color={skill.color}
            isActive={activeSkill === skill.id}
            onClick={() => onSelect(skill.id)}
            icon={renderIcon(skill, 18)}
          />
        ))}

        {/* Divider */}
        <div style={{
          margin: expanded ? '10px 8px' : '10px 4px',
          height: 1,
          background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.07)',
        }} />

        {/* PRACTICE section label */}
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: isLight ? '#9ca3af' : 'rgba(255,255,255,0.25)',
          padding: '2px 10px 8px',
          opacity: expanded ? 1 : 0,
          maxHeight: expanded ? 30 : 0,
          overflow: 'hidden',
          transition: 'opacity 0.18s, max-height 0.18s',
        }}>
          Practice
        </div>

        <NavItem
          id="code-practice"
          label="Code Practice"
          color={CODE_PRACTICE_ITEM.color}
          isActive={activeSkill === 'code-practice'}
          onClick={() => onSelect('code-practice')}
          icon={<PuzzleIcon size={18} color={activeSkill === 'code-practice' ? CODE_PRACTICE_ITEM.color : (isLight ? '#6b7280' : 'rgba(255,255,255,0.45)')} />}
        />
      </nav>

      {/* Footer: theme toggle */}
      <div style={{
        borderTop: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
        padding: expanded ? '10px 10px' : '10px 8px',
        flexShrink: 0,
        transition: 'padding 0.22s',
      }}>
        <Tooltip label={isLight ? 'Light Mode' : 'Dark Mode'} isLight={isLight} expanded={expanded}>
          <button
            onClick={onThemeToggle}
            style={{
              width: '100%',
              display: 'flex', alignItems: 'center',
              gap: expanded ? 10 : 0,
              justifyContent: expanded ? 'flex-start' : 'center',
              padding: expanded ? '8px 10px' : '8px 0',
              borderRadius: 10, border: 'none', cursor: 'pointer',
              background: 'transparent',
              overflow: 'hidden', whiteSpace: 'nowrap',
              transition: 'padding 0.22s, gap 0.22s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{
              width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 16, flexShrink: 0,
              background: isLight ? '#f1f5f9' : 'rgba(255,255,255,0.06)',
            }}>
              {isLight ? '☀️' : '🌙'}
            </span>
            <span style={{
              fontSize: 13, fontWeight: 500,
              color: isLight ? '#374151' : 'rgba(255,255,255,0.5)',
              opacity: expanded ? 1 : 0,
              maxWidth: expanded ? 140 : 0,
              overflow: 'hidden',
              transition: 'opacity 0.18s, max-width 0.18s',
            }}>
              {isLight ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </Tooltip>
      </div>
    </aside>
  );
}
