document.addEventListener('DOMContentLoaded', () => {
    const markdownContent = document.getElementById('markdown-content');
    const navItems = document.querySelectorAll('.nav-item');
    const currentCategoryLabel = document.getElementById('current-category');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const themeText = themeToggle.querySelector('.theme-text');
    const searchInput = document.getElementById('search-input');

    // Modal Elements
    const modal = document.getElementById('concept-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalExplanation = document.getElementById('modal-explanation');
    const modalCode = document.getElementById('modal-code');
    const closeModal = document.getElementById('close-modal');
    const doneBtn = document.getElementById('done-btn');

    // Configure marked to use Prism for code highlighting
    marked.setOptions({
        highlight: function(code, lang) {
            if (Prism.languages[lang]) {
                return Prism.highlight(code, Prism.languages[lang], lang);
            }
            return code;
        },
        breaks: true,
        gfm: true
    });

    // Function to open modal
    function openModal(conceptName) {
        if (typeof getConceptData !== 'function') {
            console.error('getConceptData function not found. Make sure conceptsData.js is loaded.');
            return;
        }
        const data = getConceptData(conceptName);
        if (!data) {
            console.warn(`No data found for concept: ${conceptName}`);
            return; // Exit if no data is found to prevent crash
        }
        modalTitle.textContent = conceptName;
        modalExplanation.innerHTML = data.explanation;
        modalCode.textContent = data.code;
        
        // Trigger Prism highlighting for the new code
        Prism.highlightElement(modalCode);
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    // Function to close modal
    function hideModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeModal) closeModal.addEventListener('click', hideModal);
    if (doneBtn) doneBtn.addEventListener('click', hideModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideModal();
    });

    // Event Delegation for clicks on concepts
    markdownContent.addEventListener('click', (e) => {
        if (e.target.tagName === 'STRONG') {
            const conceptName = e.target.textContent.trim();
            openModal(conceptName);
        }
    });

    // Function to load and render markdown
    async function loadMarkdown(filename) {
        markdownContent.innerHTML = '<div class="loader">Fetching the roadmap...</div>';
        try {
            const response = await fetch(filename);
            if (!response.ok) throw new Error('File not found');
            const text = await response.text();
            
            // Render Markdown
            markdownContent.innerHTML = marked.parse(text);
            
            // Re-highlight code blocks
            Prism.highlightAllUnder(markdownContent);

            // Add dynamic animation delays to children
            const children = markdownContent.children;
            for (let i = 0; i < children.length; i++) {
                children[i].style.animationDelay = `${i * 0.05}s`;
            }
        } catch (error) {
            console.error('Error loading markdown:', error);
            markdownContent.innerHTML = `
                <div class="error-state" style="text-align: center; padding: 3rem;">
                    <h2 style="font-size: 2rem; color: var(--accent-color); margin-bottom: 1rem;">Oops! Document not found.</h2>
                    <p style="color: var(--text-secondary);">Make sure the file <code>${filename}</code> exists in your project directory.</p>
                </div>
            `;
        }
    }

    // Navigation Click Handler
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update UI
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const filename = item.getAttribute('data-file');
            const label = item.querySelector('.label').textContent;
            
            currentCategoryLabel.textContent = label;
            loadMarkdown(filename);
        });
    });

    // Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-mode');
            if (isDark) {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                if (themeIcon) themeIcon.textContent = '☀️';
                if (themeText) themeText.textContent = 'Light Mode';
            } else {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                if (themeIcon) themeIcon.textContent = '🌙';
                if (themeText) themeText.textContent = 'Dark Mode';
            }
        });
    }

    // Search Functionality (Filter current content)
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const sections = markdownContent.querySelectorAll('li, h2');
            
            sections.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = '';
                    item.style.animation = 'none'; // Reset animation
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Initial Load
    loadMarkdown('javascript.md');
});
