const THEME_STORAGE_KEY = 'ai-math-tutor-theme';
const THEME_MODERN = 'modern';
const THEME_CLASSIC = 'classic';

function getStoredTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY) || THEME_MODERN;
}

function setStoredTheme(theme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function loadTheme(theme) {
    const existingLink = document.getElementById('theme-stylesheet');
    if (existingLink) {
        existingLink.remove();
    }
    
    const link = document.createElement('link');
    link.id = 'theme-stylesheet';
    link.rel = 'stylesheet';
    link.href = theme === THEME_MODERN ? 'styles/theme-modern.css' : 'styles/theme-classic.css';
    document.head.appendChild(link);
}

function initThemeToggle() {
    const currentTheme = getStoredTheme();
    loadTheme(currentTheme);
    
    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
        updateToggleButton(toggleBtn, currentTheme);
        
        toggleBtn.addEventListener('click', function() {
            const newTheme = currentTheme === THEME_MODERN ? THEME_CLASSIC : THEME_MODERN;
            setStoredTheme(newTheme);
            loadTheme(newTheme);
            updateToggleButton(toggleBtn, newTheme);
            location.reload();
        });
    }
}

function updateToggleButton(button, theme) {
    if (theme === THEME_MODERN) {
        button.textContent = '🎨 Switch to Classic';
    } else {
        button.textContent = '✨ Switch to Modern';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
    initThemeToggle();
}
