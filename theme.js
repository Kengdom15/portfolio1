/**
 * Theme Switcher Script
 * This script handles the theme switching functionality between light and dark modes.
 * It includes features like:
 * - System theme detection
 * - Theme persistence using localStorage
 * - Smooth theme transitions
 * - Automatic theme icon updates
 */

// Theme initialization
document.addEventListener('DOMContentLoaded', () => {
    // Get saved theme from localStorage or use system preference
    const savedTheme = localStorage.getItem('theme');
    // NOTE: default to light mode on first visit, even if the system prefers dark.
    // This ensures the deployed site shows the light theme by default.
    // If a user has a saved preference, respect it.
    const defaultTheme = savedTheme || 'light';

    // Set initial theme
    setTheme(defaultTheme);

    // Theme toggle button functionality
    // Guard in case a page doesn't include the toggle (prevents runtime errors)
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) {
        // Toggle not present on this page; nothing more to do.
        return;
    }
    const themeIcon = themeToggle.querySelector('i');

    // Update button icon based on current theme
    updateThemeIcon(defaultTheme === 'dark', themeIcon);

    // Add click event listener
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        setTheme(newTheme);
        updateThemeIcon(!isDark, themeIcon);
    });

    // Optionally listen for system theme changes, but only if the user hasn't
    // explicitly saved a preference. We keep this behavior but it won't change
    // the initial default (which is forced to light above).
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (!localStorage.getItem('theme') && mq && typeof mq.addEventListener === 'function') {
        mq.addEventListener('change', (e) => {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
            updateThemeIcon(e.matches, themeIcon);
        });
    }
});

/**
 * Sets the theme for the website
 * @param {string} theme - The theme to set ('light' or 'dark')
 * @description
 * This function:
 * 1. Updates the data-theme attribute on the body element
 * 2. Saves the theme preference to localStorage
 */
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

/**
 * Updates the theme toggle icon based on the current theme
 * @param {boolean} isDark - Whether the current theme is dark
 * @param {HTMLElement} iconElement - The icon element to update
 * @description
 * This function:
 * 1. Changes the icon between sun and moon
 * 2. Updates the button's title for accessibility
 * 3. Maintains visual consistency with the current theme
 */
function updateThemeIcon(isDark, iconElement) {
    iconElement.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    const button = iconElement.closest('.theme-toggle');
    button.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}