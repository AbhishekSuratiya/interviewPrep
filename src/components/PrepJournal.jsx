import { useState, useEffect, useRef } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

const STORAGE_KEY = 'prepdocs:journal';

export default function PrepJournal({ isLight }) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  // Form states
  const [newText, setNewText] = useState('');
  const [newType, setNewType] = useState('to-learn'); // 'to-learn' | 'doubt' | 'note'
  const [filter, setFilter] = useState('all'); // 'all' | 'to-learn' | 'doubt' | 'note' | 'completed'

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Firestore sync states
  const lastRemoteValueRef = useRef(null);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // 1. Listen to Firestore in real-time
  useEffect(() => {
    if (!user) {
      setInitialLoadDone(true);
      return;
    }
    setInitialLoadDone(false);
    setSyncing(true);

    const unsub = onSnapshot(
      doc(db, 'users', user.uid),
      (snap) => {
        setSyncing(false);
        if (snap.exists() && snap.data().journalNotes) {
          const remoteNotes = snap.data().journalNotes;
          lastRemoteValueRef.current = remoteNotes;
          setItems((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(remoteNotes)) {
              return remoteNotes;
            }
            return prev;
          });
        }
        setInitialLoadDone(true);
      },
      (err) => {
        console.error('Failed to listen to journal from Firestore:', err);
        setSyncing(false);
        setInitialLoadDone(true);
      }
    );

    return () => unsub();
  }, [user]);

  // 2. Persist Local & Firestore Sync
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

    if (user && initialLoadDone) {
      // Avoid writing if this update came from the server
      if (
        lastRemoteValueRef.current &&
        JSON.stringify(items) === JSON.stringify(lastRemoteValueRef.current)
      ) {
        return;
      }

      setSyncing(true);
      setDoc(doc(db, 'users', user.uid), { journalNotes: items }, { merge: true })
        .then(() => setSyncing(false))
        .catch((err) => {
          console.error('Failed to sync journal to Firestore:', err);
          setSyncing(false);
        });
    }
  }, [items, user, initialLoadDone]);

  // 4. Form Actions
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      text: newText.trim(),
      type: newType,
      completed: false,
      createdAt: Date.now(),
    };

    setItems((prev) => [newItem, ...prev]);
    setNewText('');
  };

  const handleToggleComplete = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditingText(item.text);
  };

  const saveEdit = (id) => {
    if (!editingText.trim()) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: editingText.trim() } : item))
    );
    setEditingId(null);
  };

  // 5. Computed Counts
  const activeCount = items.filter((item) => !item.completed).length;

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return item.completed;
    return !item.completed && item.type === filter;
  });

  const typeConfig = {
    'to-learn': { label: 'To Learn', emoji: '📚', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
    'doubt': { label: 'Doubt', emoji: '❓', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
    'note': { label: 'Note', emoji: '💡', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  };

  return (
    <>
      {/* FLOATING ACTION BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-xl border cursor-pointer select-none transition-all duration-300 hover:scale-105"
        style={{
          background: isLight ? '#ffffff' : '#15151b',
          borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
          boxShadow: isLight
            ? '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)'
            : '0 10px 25px -5px rgba(0,0,0,0.4), 0 8px 10px -6px rgba(0,0,0,0.3)',
        }}
        title="Open Study Journal"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isLight ? '#3b82f6' : '#60a5fa'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>

        {activeCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center text-[10px] font-black text-white bg-blue-500 border-2 border-white dark:border-[#030712] animate-pulse">
            {activeCount}
          </span>
        )}
      </button>

      {/* BACKDROP OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px] z-50 transition-opacity"
        />
      )}

      {/* DRAWER PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] z-50 transform transition-transform duration-300 ease-out flex flex-col border-l ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: isLight ? 'rgba(255,255,255,0.98)' : 'rgba(15,17,23,0.98)',
          borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
          boxShadow: isLight
            ? '-10px 0 30px rgba(0,0,0,0.05)'
            : '-10px 0 30px rgba(0,0,0,0.3)',
        }}
      >
        {/* HEADER */}
        <div
          className="p-4 border-b flex items-center justify-between"
          style={{ borderColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">📓</span>
            <div>
              <h2 className={`text-sm font-black ${isLight ? 'text-gray-900' : 'text-white'}`}>
                My Prep Journal
              </h2>
              <p className={`text-[10px] ${isLight ? 'text-gray-400' : 'text-white/30'}`}>
                {syncing ? '⚡ Syncing roadmap...' : '✓ Notes autosaved'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors ${
              isLight ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-white/5 text-white/40'
            }`}
          >
            ✕
          </button>
        </div>

        {/* INPUT FORM */}
        <form
          onSubmit={handleAddItem}
          className="p-4 border-b flex flex-col gap-3"
          style={{ borderColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)' }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="What do you want to learn next, clarify, or log?"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className={`w-full h-9 pl-3 pr-3 rounded-lg text-xs outline-none border transition-all ${
                isLight
                  ? 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-400'
                  : 'bg-white/5 border-white/8 text-white placeholder-white/20 focus:bg-white/8 focus:border-blue-500/30'
              }`}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1.5">
              {Object.entries(typeConfig).map(([type, cfg]) => {
                const isSelected = newType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setNewType(type)}
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer flex items-center gap-1"
                    style={{
                      background: isSelected ? cfg.bg : 'transparent',
                      borderColor: isSelected ? cfg.color : isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)',
                      color: isSelected ? cfg.color : isLight ? '#64748b' : '#94a3b8',
                    }}
                  >
                    <span>{cfg.emoji}</span>
                    <span>{cfg.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={!newText.trim()}
              className="h-7 px-4 rounded-lg text-[10px] font-bold text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-blue-500 cursor-pointer transition-colors"
            >
              Add Note
            </button>
          </div>
        </form>

        {/* FILTER BAR */}
        <div
          className="px-4 py-2 border-b flex gap-1 overflow-x-auto scrollbar-none"
          style={{ borderColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)' }}
        >
          {['all', 'to-learn', 'doubt', 'note', 'completed'].map((f) => {
            const isSelected = filter === f;
            const labelMap = {
              all: 'All',
              'to-learn': '📚 To Learn',
              doubt: '❓ Doubts',
              note: '💡 Notes',
              completed: '✓ Done',
            };
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-2.5 py-1 rounded-md text-[10px] font-bold whitespace-nowrap border transition-all cursor-pointer"
                style={{
                  background: isSelected ? (isLight ? '#f1f5f9' : 'rgba(255,255,255,0.08)') : 'transparent',
                  borderColor: isSelected ? (isLight ? '#cbd5e1' : 'rgba(255,255,255,0.15)') : 'transparent',
                  color: isSelected
                    ? isLight ? '#1e293b' : '#ffffff'
                    : isLight ? '#64748b' : '#94a3b8',
                }}
              >
                {labelMap[f]}
              </button>
            );
          })}
        </div>

        {/* LIST CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
              <span className="text-3xl">📝</span>
              <p className={`text-xs font-semibold ${isLight ? 'text-gray-400' : 'text-white/20'}`}>
                {filter === 'completed'
                  ? 'No completed items yet.'
                  : filter === 'all'
                  ? 'Your prep journal is empty.'
                  : `No ${typeConfig[filter]?.label.toLowerCase()} entries found.`}
              </p>
              <p className={`text-[10px] ${isLight ? 'text-gray-400/80' : 'text-white/10'}`}>
                Add things you want to track or doubts to clear later.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isEditing = editingId === item.id;
              const cfg = typeConfig[item.type] || typeConfig['to-learn'];

              return (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border flex gap-3 items-start group relative transition-all"
                  style={{
                    background: isLight ? '#ffffff' : 'rgba(255,255,255,0.01)',
                    borderColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)',
                    opacity: item.completed ? 0.6 : 1,
                  }}
                >
                  {/* Left status accent line */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                    style={{ background: item.completed ? '#cbd5e1' : cfg.color }}
                  />

                  {/* CHECKBOX */}
                  <button
                    onClick={() => handleToggleComplete(item.id)}
                    className="mt-0.5 w-4.5 h-4.5 rounded-md border flex items-center justify-center flex-shrink-0 cursor-pointer transition-all"
                    style={{
                      borderColor: item.completed ? cfg.color : isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
                      background: item.completed ? cfg.color : 'transparent',
                    }}
                  >
                    {item.completed && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>

                  {/* CONTENT AREA */}
                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className={`flex-1 px-2 py-1 rounded text-xs outline-none border ${
                            isLight
                              ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-400'
                              : 'bg-white/5 border-white/10 text-white focus:border-blue-500'
                          }`}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit(item.id);
                            if (e.key === 'Escape') setEditingId(null);
                          }}
                        />
                        <button
                          onClick={() => saveEdit(item.id)}
                          className="px-2 py-1 rounded bg-blue-500 text-white text-[10px] font-bold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div>
                        {/* Text */}
                        <p
                          className={`text-xs leading-relaxed break-words font-medium ${
                            item.completed
                              ? 'line-through text-gray-400 dark:text-white/20'
                              : isLight
                              ? 'text-gray-800'
                              : 'text-white/80'
                          }`}
                        >
                          {item.text}
                        </p>

                        {/* Badges row */}
                        <div className="mt-2 flex items-center gap-2">
                          <span
                            className="px-1.5 py-0.5 rounded text-[8px] font-extrabold tracking-wider uppercase"
                            style={{ background: cfg.bg, color: cfg.color }}
                          >
                            {cfg.emoji} {cfg.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ACTION BUTTONS (VISIBLE ON HOVER) */}
                  {!isEditing && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEditing(item)}
                        className={`w-6 h-6 rounded flex items-center justify-center transition-colors cursor-pointer ${
                          isLight ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-white/5 text-white/40'
                        }`}
                        title="Edit Note"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className={`w-6 h-6 rounded flex items-center justify-center transition-colors cursor-pointer ${
                          isLight ? 'hover:bg-red-50 text-red-500' : 'hover:bg-red-500/10 text-red-400'
                        }`}
                        title="Delete Note"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
