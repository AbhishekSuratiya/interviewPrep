import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthModal({ isLight, onSkip }) {
  const { login, signup, authError, setAuthError } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const switchMode = () => {
    setMode(m => m === 'login' ? 'signup' : 'login');
    setAuthError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch {
      // error already set in context
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 10, fontSize: 14,
    border: `1.5px solid ${isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)'}`,
    background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.06)',
    color: isLight ? '#1e293b' : '#e2e8f0',
    outline: 'none', boxSizing: 'border-box',
  };

  return (
    /* backdrop */
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
    }}>
      {/* card */}
      <div style={{
        width: '100%', maxWidth: 400, borderRadius: 20, padding: '36px 32px',
        background: isLight ? '#ffffff' : '#111827',
        border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
      }}>
        {/* logo / title */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>📋</div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: isLight ? '#1e293b' : '#f1f5f9' }}>
            Interview Prep
          </h2>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: isLight ? '#64748b' : '#94a3b8' }}>
            {mode === 'login' ? 'Sign in to sync your progress across devices.' : 'Create an account to save your progress.'}
          </p>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={inputStyle}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            style={inputStyle}
          />

          {authError && (
            <p style={{ margin: 0, fontSize: 12.5, color: '#f87171', textAlign: 'center' }}>
              {authError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4, padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 700,
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              background: loading ? '#4f46e580' : '#4f46e5',
              color: '#fff', transition: 'background 0.15s',
            }}
          >
            {loading ? '…' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* switch mode */}
        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: isLight ? '#64748b' : '#94a3b8' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={switchMode}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#818cf8', fontWeight: 700, fontSize: 13, padding: 0 }}
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>

        {/* divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0 16px' }}>
          <div style={{ flex: 1, height: 1, background: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontSize: 12, color: isLight ? '#94a3b8' : '#475569' }}>or</span>
          <div style={{ flex: 1, height: 1, background: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }} />
        </div>

        {/* skip */}
        <button
          onClick={onSkip}
          style={{
            width: '100%', padding: '11px', borderRadius: 10, fontSize: 13, fontWeight: 600,
            border: `1.5px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
            background: 'transparent', cursor: 'pointer',
            color: isLight ? '#64748b' : '#94a3b8',
            transition: 'background 0.12s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          Continue as Guest
        </button>
        <p style={{ textAlign: 'center', margin: '10px 0 0', fontSize: 11.5, color: isLight ? '#94a3b8' : '#475569' }}>
          Progress saves locally only — won't sync across devices.
        </p>
      </div>
    </div>
  );
}
