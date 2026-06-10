/**
 * PrepDocs — Main Application Logic
 * Pure vanilla JS, data-driven from JSON files
 */

'use strict';

// ================================================================
// CONFIG
// ================================================================
const SKILLS = [
  { id: 'javascript',   file: 'data/javascript.json',   bodyClass: 'skill-javascript' },
  { id: 'react',        file: 'data/react.json',         bodyClass: 'skill-react' },
  { id: 'react-native', file: 'data/react-native.json',  bodyClass: 'skill-react-native' },
  { id: 'typescript',   file: 'data/typescript.json',    bodyClass: 'skill-typescript' },
];

// ================================================================
// STATE
// ================================================================
let currentSkillData = null;
let currentSkillId = 'javascript';

// ================================================================
// DOM REFS
// ================================================================
const dom = {
  sidebar:          document.getElementById('sidebar'),
  navItems:         document.querySelectorAll('.nav-item'),
  breadcrumbCurrent:document.getElementById('breadcrumb-current'),
  skillBadge:       document.getElementById('skill-badge'),
  skillTitle:       document.getElementById('skill-title'),
  skillSubtitle:    document.getElementById('skill-subtitle'),
  statSections:     document.getElementById('stat-sections'),
  statTopics:       document.getElementById('stat-topics'),
  sectionsContainer:document.getElementById('sections-container'),
  loadingState:     document.getElementById('loading-state'),
  searchInput:      document.getElementById('search-input'),
  themeToggle:      document.getElementById('theme-toggle'),
  themeIcon:        document.getElementById('theme-icon'),
  themeText:        document.getElementById('theme-text'),
  // Modal
  modalBackdrop:    document.getElementById('modal-backdrop'),
  codeModal:        document.getElementById('code-modal'),
  modalTitle:       document.getElementById('modal-title'),
  modalCode:        document.getElementById('modal-code'),
  modalCloseBtn:    document.getElementById('modal-close-btn'),
  modalCopyBtn:     document.getElementById('modal-copy-btn'),
};

// ================================================================
// INITIALISE
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  bindNavigation();
  bindSearch();
  bindModal();
  bindKeyboard();
  loadSkill('javascript');
});

// ================================================================
// THEME
// ================================================================
function initTheme() {
  const stored = localStorage.getItem('prepdocs-theme') || 'dark';
  applyTheme(stored);
}

function applyTheme(mode) {
  document.body.classList.toggle('light-mode', mode === 'light');
  if (dom.themeIcon) dom.themeIcon.textContent = mode === 'light' ? '☀️' : '🌙';
  if (dom.themeText) dom.themeText.textContent = mode === 'light' ? 'Light Mode' : 'Dark Mode';
  localStorage.setItem('prepdocs-theme', mode);
}

dom.themeToggle?.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light-mode');
  applyTheme(isLight ? 'dark' : 'light');
});

// ================================================================
// NAVIGATION
// ================================================================
function bindNavigation() {
  dom.navItems.forEach(item => {
    item.addEventListener('click', () => {
      const skillId = item.dataset.skill;
      if (skillId === currentSkillId) return;
      loadSkill(skillId);
    });
  });
}

function setActiveNav(skillId) {
  dom.navItems.forEach(item => {
    item.classList.toggle('active', item.dataset.skill === skillId);
  });
}

// ================================================================
// DATA LOADING
// ================================================================
async function loadSkill(skillId) {
  const config = SKILLS.find(s => s.id === skillId);
  if (!config) return;

  currentSkillId = skillId;
  setActiveNav(skillId);

  // Update body class for skill-specific colors
  SKILLS.forEach(s => document.body.classList.remove(s.bodyClass));
  document.body.classList.add(config.bodyClass);

  // Show loading
  showLoading();

  try {
    const res = await fetch(config.file);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    currentSkillData = data;
    renderSkill(data);
  } catch (err) {
    console.error('Failed to load skill data:', err);
    showError(skillId);
  }
}

function showLoading() {
  dom.sectionsContainer.innerHTML = `
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading concepts...</p>
    </div>
  `;
}

function showError(skillId) {
  dom.sectionsContainer.innerHTML = `
    <div class="no-results">
      <div class="no-results-icon">⚠️</div>
      <h3>Could not load data</h3>
      <p>Make sure <code>data/${skillId}.json</code> exists in the project.</p>
    </div>
  `;
}

// ================================================================
// RENDER SKILL
// ================================================================
function renderSkill(data) {
  // Update hero
  if (dom.breadcrumbCurrent) dom.breadcrumbCurrent.textContent = data.skill;
  if (dom.skillTitle) dom.skillTitle.textContent = data.skill;
  if (dom.skillBadge) dom.skillBadge.textContent = data.icon;
  if (dom.skillSubtitle) dom.skillSubtitle.textContent = 'Advanced Concepts for Interview Preparation';

  const seniorSections = data.seniorSections || [];

  // Stats — combined sections + topics across both regular and senior
  const totalSections = data.sections.length + seniorSections.length;
  const totalTopics =
    data.sections.reduce((acc, s) => acc + s.topics.length, 0) +
    seniorSections.reduce((acc, s) => acc + s.topics.length, 0);
  if (dom.statSections) dom.statSections.textContent = totalSections;
  if (dom.statTopics) dom.statTopics.textContent = totalTopics;

  // Render regular sections
  let html = data.sections.map((section, si) => renderSection(section, si, false)).join('');

  // Render senior sections with a divider banner
  if (seniorSections.length > 0) {
    html += `
      <div class="senior-divider" id="senior-level-divider">
        <div class="senior-divider-inner">
          <span class="senior-divider-badge">🎯 Senior Level</span>
          <div class="senior-divider-line"></div>
          <span class="senior-divider-desc">Advanced topics for senior engineers</span>
        </div>
      </div>
    `;
    html += seniorSections.map((section, si) => renderSection(section, si, true)).join('');
  }

  dom.sectionsContainer.innerHTML = html || '<div class="no-results"><div class="no-results-icon">📭</div><h3>No content</h3></div>';

  // Bind accordion triggers
  bindAccordions();

  // Clear search
  if (dom.searchInput) dom.searchInput.value = '';
}

// ================================================================
// RENDER SECTION
// ================================================================
function renderSection(section, sectionIndex, isSenior = false) {
  const topicsHtml = section.topics.map((topic, ti) =>
    renderTopic(topic, ti, section.id)
  ).join('');

  return `
    <div class="section-card${isSenior ? ' section-card--senior' : ''}" data-section-id="${escapeAttr(section.id)}">
      <div class="section-header">
        <div class="section-emoji">${section.emoji}</div>
        <h2 class="section-title">${escapeHtml(section.title)}</h2>
        <span class="section-count">${section.topics.length} topics</span>
        ${isSenior ? '<span class="section-senior-tag">Senior</span>' : ''}
      </div>
      <div class="topics-grid">
        ${topicsHtml}
      </div>
    </div>
  `;
}

// ================================================================
// RENDER TOPIC (accordion item)
// ================================================================
function renderTopic(topic, index, sectionId) {
  const topicId = `${sectionId}-${topic.id}`;
  const codeEscaped = escapeHtml(topic.code || '');

  return `
    <div class="topic-item" id="topic-${escapeAttr(topicId)}" data-topic-id="${escapeAttr(topicId)}">
      <button class="topic-trigger" 
              aria-expanded="false" 
              aria-controls="panel-${escapeAttr(topicId)}"
              id="trigger-${escapeAttr(topicId)}">
        <span class="topic-num">${index + 1}</span>
        <div class="topic-text">
          <div class="topic-title">${escapeHtml(topic.title)}</div>
          <div class="topic-summary">${escapeHtml(topic.summary)}</div>
        </div>
        <span class="topic-chevron">▾</span>
      </button>

      <div class="topic-panel" 
           id="panel-${escapeAttr(topicId)}" 
           role="region" 
           aria-labelledby="trigger-${escapeAttr(topicId)}">
        <div class="topic-panel-inner">
          <div class="topic-divider"></div>
          
          <div class="explanation-block">
            <div class="explanation-label">Explanation</div>
            <p class="explanation-text">${escapeHtml(topic.explanation)}</p>
          </div>

          ${topic.imageUrl ? `
          <div class="diagram-block">
            <div class="diagram-label">Architecture Diagram</div>
            <div class="diagram-img-wrap">
              <img class="diagram-img is-loading" 
                   src="${topic.imageUrl}" 
                   alt="${escapeAttr(topic.title)} diagram"
                   loading="lazy"
                   onload="this.classList.remove('is-loading')"
                   onerror="this.closest('.diagram-block').style.display='none'">
              ${topic.imageCaption ? `<div class="diagram-caption">${escapeHtml(topic.imageCaption)}</div>` : ''}
            </div>
          </div>
          ` : ''}

          ${topic.code ? `
          <div class="code-preview">
            <div class="code-preview-header">
              <div class="code-dots">
                <span class="code-dot code-dot-red"></span>
                <span class="code-dot code-dot-yellow"></span>
                <span class="code-dot code-dot-green"></span>
              </div>
              <span class="code-lang-tag">JavaScript</span>
              <button class="code-expand-btn" 
                      data-code="${escapeAttr(topic.code)}" 
                      data-title="${escapeAttr(topic.title)}">
                ⤢ Expand
              </button>
            </div>
            <div class="code-preview-body">
              <pre>${codeEscaped}</pre>
            </div>
          </div>
          ` : ''}

          ${topic.situations && topic.situations.length > 0 ? `
          <div class="situations-block">
            <div class="situations-label">🔥 Senior Dev Situations</div>
            ${topic.situations.map(s => `
              <div class="situation-card">
                <div class="situation-q">
                  <span class="situation-q-icon">💬</span>
                  <span>${escapeHtml(s.question)}</span>
                </div>
                <div class="situation-a">${escapeHtml(s.answer)}</div>
              </div>
            `).join('')}
          </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// ================================================================
// ACCORDION LOGIC
// ================================================================
function bindAccordions() {
  // Accordion triggers
  document.querySelectorAll('.topic-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => toggleTopic(trigger));
  });

  // Code expand buttons
  document.querySelectorAll('.code-expand-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Don't close accordion
      openCodeModal(btn.dataset.title, btn.dataset.code);
    });
  });
}

function toggleTopic(trigger) {
  const topicItem = trigger.closest('.topic-item');
  const panel = topicItem.querySelector('.topic-panel');
  const isOpen = topicItem.classList.contains('is-open');

  // Close other open topics (optional: comment out for multi-open)
  const allTopics = document.querySelectorAll('.topic-item.is-open');
  allTopics.forEach(item => {
    if (item !== topicItem) {
      closeTopic(item);
    }
  });

  if (isOpen) {
    closeTopic(topicItem);
  } else {
    openTopic(topicItem, trigger, panel);
  }
}

function openTopic(topicItem, trigger, panel) {
  topicItem.classList.add('is-open');
  trigger.setAttribute('aria-expanded', 'true');
  panel.classList.add('is-expanded');
}

function closeTopic(topicItem) {
  const trigger = topicItem.querySelector('.topic-trigger');
  const panel = topicItem.querySelector('.topic-panel');

  topicItem.classList.remove('is-open');
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
  if (panel) panel.classList.remove('is-expanded');
}

// ================================================================
// SEARCH
// ================================================================
function bindSearch() {
  if (!dom.searchInput) return;

  dom.searchInput.addEventListener('input', debounce((e) => {
    filterTopics(e.target.value.trim().toLowerCase());
  }, 200));
}

function filterTopics(query) {
  if (!currentSkillData) return;

  const allTopicItems = dom.sectionsContainer.querySelectorAll('.topic-item');
  const allSectionCards = dom.sectionsContainer.querySelectorAll('.section-card');

  if (!query) {
    // Show all
    allTopicItems.forEach(item => item.classList.remove('is-hidden'));
    allSectionCards.forEach(card => card.classList.remove('all-hidden'));
    return;
  }

  // Track which sections have visible topics
  const sectionVisibility = new Map();

  allTopicItems.forEach(item => {
    const title = item.querySelector('.topic-title')?.textContent.toLowerCase() || '';
    const summary = item.querySelector('.topic-summary')?.textContent.toLowerCase() || '';
    const explanation = item.querySelector('.explanation-text')?.textContent.toLowerCase() || '';

    const matches = title.includes(query) || summary.includes(query) || explanation.includes(query);
    item.classList.toggle('is-hidden', !matches);

    // Track section
    const sectionCard = item.closest('.section-card');
    if (sectionCard) {
      const secId = sectionCard.dataset.sectionId;
      if (!sectionVisibility.has(secId)) sectionVisibility.set(secId, false);
      if (matches) sectionVisibility.set(secId, true);
    }
  });

  // Hide sections with no matching topics
  allSectionCards.forEach(card => {
    const secId = card.dataset.sectionId;
    card.classList.toggle('all-hidden', !sectionVisibility.get(secId));
  });

  // Show no results message if everything is hidden
  const hasVisible = [...allTopicItems].some(item => !item.classList.contains('is-hidden'));
  if (!hasVisible) {
    const noResults = dom.sectionsContainer.querySelector('.no-results-search');
    if (!noResults) {
      const div = document.createElement('div');
      div.className = 'no-results no-results-search';
      div.innerHTML = `
        <div class="no-results-icon">🔍</div>
        <h3>No topics found</h3>
        <p>Try a different keyword</p>
      `;
      dom.sectionsContainer.appendChild(div);
    }
  } else {
    dom.sectionsContainer.querySelector('.no-results-search')?.remove();
  }
}

// ================================================================
// CODE MODAL
// ================================================================
function bindModal() {
  dom.modalCloseBtn?.addEventListener('click', closeModal);
  dom.modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === dom.modalBackdrop) closeModal();
  });
  dom.modalCopyBtn?.addEventListener('click', copyModalCode);
}

function openCodeModal(title, code) {
  if (!dom.modalBackdrop) return;
  dom.modalTitle.textContent = title;
  dom.modalCode.textContent = code;
  dom.modalBackdrop.classList.add('is-open');
  dom.modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  dom.modalCloseBtn?.focus();
}

function closeModal() {
  dom.modalBackdrop?.classList.remove('is-open');
  dom.modalBackdrop?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

async function copyModalCode() {
  const code = dom.modalCode?.textContent || '';
  try {
    await navigator.clipboard.writeText(code);
    dom.modalCopyBtn.classList.add('copied');
    const copyText = dom.modalCopyBtn.querySelector('.copy-text');
    if (copyText) copyText.textContent = 'Copied!';
    setTimeout(() => {
      dom.modalCopyBtn.classList.remove('copied');
      if (copyText) copyText.textContent = 'Copy';
    }, 2000);
  } catch {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = code;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

// ================================================================
// KEYBOARD SHORTCUTS
// ================================================================
function bindKeyboard() {
  document.addEventListener('keydown', (e) => {
    // Escape: close modal
    if (e.key === 'Escape') {
      if (dom.modalBackdrop?.classList.contains('is-open')) {
        closeModal();
      }
    }

    // Cmd/Ctrl+K: focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      dom.searchInput?.focus();
    }
  });
}

// ================================================================
// UTILITIES
// ================================================================
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(str) {
  if (!str) return '';
  return str.replace(/[^a-zA-Z0-9-_]/g, '-');
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
