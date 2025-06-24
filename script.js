// DOM Elements
const searchInput = document.querySelector('.search-input');
const searchArrow = document.querySelector('.search-arrow');
const tabs = document.querySelectorAll('.tab');
const navBtns = document.querySelectorAll('.nav-btn');
const designTypes = document.querySelectorAll('.design-type');
const categoryCards = document.querySelectorAll('.category-card');
const designCards = document.querySelectorAll('.design-card');
const createBtn = document.querySelector('.create-btn');
const proBtnElement = document.querySelector('.pro-btn');
const menuToggle = document.querySelector('.menu-toggle');

// State Management
let selectedTab = 'templates';
let searchQuery = '';

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadInitialData();
});

// Event Listeners
function initializeEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keypress', handleSearchKeyPress);
    searchArrow.addEventListener('click', executeSearch);

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', handleTabSwitch);
    });

    // Navigation buttons
    navBtns.forEach(btn => {
        btn.addEventListener('click', handleNavigation);
    });

    // Design type selection
    designTypes.forEach(type => {
        type.addEventListener('click', handleDesignTypeSelection);
    });

    // Category card interactions
    categoryCards.forEach(card => {
        card.addEventListener('click', handleCategorySelection);
        card.addEventListener('mouseenter', handleCardHover);
        card.addEventListener('mouseleave', handleCardLeave);
    });

    // Design card interactions
    designCards.forEach(card => {
        card.addEventListener('click', handleDesignCardClick);
    });

    // Header buttons
    createBtn.addEventListener('click', handleCreateNew);
    proBtnElement.addEventListener('click', handleProUpgrade);
    menuToggle.addEventListener('click', handleMenuToggle);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Search Functions
function handleSearch(event) {
    searchQuery = event.target.value;
    debounceSearch();
}

function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        executeSearch();
    }
}

function executeSearch() {
    if (searchQuery.trim()) {
        console.log('Searching for:', searchQuery);
        // Simulate search API call
        showSearchResults(searchQuery);
    }
}

let searchTimeout;
function debounceSearch() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        if (searchQuery.trim()) {
            showSearchSuggestions(searchQuery);
        }
    }, 300);
}

function showSearchResults(query) {
    // Simulate search results
    const resultsData = generateMockSearchResults(query);
    displaySearchResults(resultsData);
}

function showSearchSuggestions(query) {
    // Mock suggestions based on query
    const suggestions = [
        'Resume templates',
        'Business cards',
        'Social media posts',
        'Flyers',
        'Presentations'
    ].filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase())
    );
    
    console.log('Suggestions:', suggestions);
}

// Tab Management
function handleTabSwitch(event) {
    const clickedTab = event.currentTarget;
    const tabText = clickedTab.textContent.trim();
    
    // Remove active class from all tabs
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked tab
    clickedTab.classList.add('active');
    
    // Update selected tab state
    if (tabText.includes('Your designs')) {
        selectedTab = 'designs';
        showUserDesigns();
    } else if (tabText.includes('Templates')) {
        selectedTab = 'templates';
        showTemplates();
    } else if (tabText.includes('Canva AI')) {
        selectedTab = 'ai';
        showCanvaAI();
    }
}

// Navigation Functions
function handleNavigation(event) {
    const clickedBtn = event.currentTarget;
    
    // Remove active class from all nav buttons
    navBtns.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    clickedBtn.classList.add('active');
    
    // Handle navigation based on icon
    const icon = clickedBtn.querySelector('i');
    if (icon.classList.contains('fa-home')) {
        navigateToHome();
    } else if (icon.classList.contains('fa-folder-open')) {
        navigateToProjects();
    } else if (icon.classList.contains('fa-image')) {
        navigateToImages();
    } else if (icon.classList.contains('fa-palette')) {
        navigateToBrand();
    } else if (icon.classList.contains('fa-th')) {
        navigateToApps();
    } else if (icon.classList.contains('fa-cog')) {
        navigateToSettings();
    }
}

// Design Type Selection
function handleDesignTypeSelection(event) {
    const designType = event.currentTarget;
    const typeName = designType.querySelector('span').textContent;
    
    // Add selection animation
    designType.style.transform = 'scale(0.95)';
    setTimeout(() => {
        designType.style.transform = 'translateY(-2px)';
    }, 100);
    
    console.log('Selected design type:', typeName);
    openDesignEditor(typeName);
}

// Category Card Interactions
function handleCategorySelection(event) {
    const card = event.currentTarget;
    const categoryTitle = card.querySelector('h3').textContent;
    
    console.log('Selected category:', categoryTitle);
    showCategoryTemplates(categoryTitle);
}

function handleCardHover(event) {
    const card = event.currentTarget;
    const arrow = card.querySelector('i');
    arrow.style.transform = 'translateX(4px)';
}

function handleCardLeave(event) {
    const card = event.currentTarget;
    const arrow = card.querySelector('i');
    arrow.style.transform = 'translateX(0)';
}

// Design Card Functions
function handleDesignCardClick(event) {
    const card = event.currentTarget;
    const designTitle = card.querySelector('h3').textContent;
    
    console.log('Opening design:', designTitle);
    openDesignForEditing(designTitle);
}

// Header Button Functions
function handleCreateNew() {
    console.log('Creating new design');
    showCreateNewModal();
}

function handleProUpgrade() {
    console.log('Upgrading to Pro');
    showProUpgradeModal();
}

function handleMenuToggle() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('mobile-hidden');
}

// Keyboard Shortcuts
function handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + K for search
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        searchInput.focus();
    }
    
    // Escape to clear search
    if (event.key === 'Escape') {
        searchInput.value = '';
        searchQuery = '';
        searchInput.blur();
    }
    
    // Ctrl/Cmd + N for new design
    if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault();
        handleCreateNew();
    }
}

// Data Loading Functions
function loadInitialData() {
    loadRecentDesigns();
    loadTemplateCategories();
    loadUserPreferences();
}

function loadRecentDesigns() {
    // Simulate loading recent designs from storage
    const recentDesigns = getRecentDesignsFromStorage();
    updateRecentDesignsDisplay(recentDesigns);
}

function loadTemplateCategories() {
    // Simulate loading template categories
    const categories = getTemplateCategoriesFromStorage();
    updateCategoriesDisplay(categories);
}

function loadUserPreferences() {
    // Load user preferences from localStorage
    const preferences = getUserPreferences();
    applyUserPreferences(preferences);
}

// Navigation Functions
function navigateToHome() {
    console.log('Navigating to Home');
    showHomeContent();
}

function navigateToProjects() {
    console.log('Navigating to Projects');
    showProjectsContent();
}

function navigateToImages() {
    console.log('Navigating to Images');
    showImagesContent();
}

function navigateToBrand() {
    console.log('Navigating to Brand');
    showBrandContent();
}

function navigateToApps() {
    console.log('Navigating to Apps');
    showAppsContent();
}

function navigateToSettings() {
    console.log('Navigating to Settings');
    showSettingsModal();
}

// Content Display Functions
function showUserDesigns() {
    console.log('Showing user designs');
    // Hide templates, show user designs
    updateContentForUserDesigns();
}

function showTemplates() {
    console.log('Showing templates');
    // Show template categories and search
    updateContentForTemplates();
}

function showCanvaAI() {
    console.log('Showing Canva AI');
    // Show AI-powered design suggestions
    updateContentForCanvaAI();
}

// Modal Functions
function showCreateNewModal() {
    const modal = createModal('Create New Design', `
        <div class="modal-content">
            <h3>Choose a design type:</h3>
            <div class="modal-design-types">
                <button class="modal-design-btn" onclick="createDesign('presentation')">
                    <i class="fas fa-chart-bar"></i>
                    <span>Presentation</span>
                </button>
                <button class="modal-design-btn" onclick="createDesign('social-media')">
                    <i class="fas fa-share-alt"></i>
                    <span>Social Media Post</span>
                </button>
                <button class="modal-design-btn" onclick="createDesign('flyer')">
                    <i class="fas fa-file-alt"></i>
                    <span>Flyer</span>
                </button>
                <button class="modal-design-btn" onclick="createDesign('resume')">
                    <i class="fas fa-file-alt"></i>
                    <span>Resume</span>
                </button>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function showProUpgradeModal() {
    const modal = createModal('Upgrade to Pro', `
        <div class="modal-content">
            <h3>Unlock Premium Features</h3>
            <ul class="pro-features">
                <li>✓ Unlimited premium templates</li>
                <li>✓ Advanced photo editing tools</li>
                <li>✓ Brand kit and team collaboration</li>
                <li>✓ Priority support</li>
            </ul>
            <button class="pro-upgrade-btn" onclick="upgradeToPro()">
                Start Free Trial
            </button>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function showSettingsModal() {
    const modal = createModal('Settings', `
        <div class="modal-content">
            <div class="settings-section">
                <h4>Account Settings</h4>
                <label>
                    <input type="checkbox" id="notifications"> 
                    Enable notifications
                </label>
                <label>
                    <input type="checkbox" id="autosave" checked> 
                    Auto-save designs
                </label>
            </div>
            <div class="settings-section">
                <h4>Display Settings</h4>
                <label>
                    <input type="checkbox" id="dark-mode"> 
                    Dark mode
                </label>
                <label>
                    <input type="checkbox" id="high-contrast"> 
                    High contrast
                </label>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
}

// Utility Functions
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .modal {
            background: white;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #6b7280;
        }
        
        .modal-body {
            padding: 20px;
        }
        
        .modal-design-types {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-top: 16px;
        }
        
        .modal-design-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 16px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            background: none;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .modal-design-btn:hover {
            border-color: #7c3aed;
            background: #f8fafc;
        }
        
        .modal-design-btn i {
            font-size: 24px;
            margin-bottom: 8px;
            color: #7c3aed;
        }
        
        .pro-features {
            list-style: none;
            margin: 16px 0;
        }
        
        .pro-features li {
            padding: 8px 0;
            color: #16a34a;
        }
        
        .pro-upgrade-btn {
            background: #7c3aed;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            width: 100%;
        }
        
        .settings-section {
            margin-bottom: 24px;
        }
        
        .settings-section h4 {
            margin-bottom: 12px;
            color: #374151;
        }
        
        .settings-section label {
            display: block;
            margin-bottom: 8px;
            cursor: pointer;
        }
        
        .settings-section input {
            margin-right: 8px;
        }
    `;
    
    if (!document.querySelector('#modal-styles')) {
        style.id = 'modal-styles';
        document.head.appendChild(style);
    }
    
    return modal;
}

function closeModal(button) {
    const modal = button.closest('.modal-overlay');
    modal.remove();
}

// Design Creation Functions
function createDesign(type) {
    console.log('Creating design of type:', type);
    closeModal(document.querySelector('.modal-close'));
    
    // Simulate opening design editor
    setTimeout(() => {
        alert(`Opening ${type} editor...`);
    }, 300);
}

function openDesignEditor(designType) {
    console.log('Opening editor for:', designType);
    // Simulate navigation to design editor
    window.location.hash = `#editor/${designType.toLowerCase().replace(/\s+/g, '-')}`;
}

function openDesignForEditing(designTitle) {
    console.log('Opening design for editing:', designTitle);
    // Simulate opening existing design
    window.location.hash = `#editor/existing/${designTitle.toLowerCase().replace(/\s+/g, '-')}`;
}

// Mock Data Functions
function generateMockSearchResults(query) {
    return [
        { title: `${query} Template 1`, type: 'template', premium: false },
        { title: `${query} Template 2`, type: 'template', premium: true },
        { title: `Professional ${query}`, type: 'template', premium: false },
        { title: `Modern ${query} Design`, type: 'template', premium: true }
    ];
}

function getRecentDesignsFromStorage() {
    return JSON.parse(localStorage.getItem('recentDesigns') || '[]');
}

function getTemplateCategoriesFromStorage() {
    return JSON.parse(localStorage.getItem('templateCategories') || '[]');
}

function getUserPreferences() {
    return JSON.parse(localStorage.getItem('userPreferences') || '{}');
}

function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Display Update Functions
function updateRecentDesignsDisplay(designs) {
    // Update the recent designs grid with new data
    console.log('Updating recent designs display');
}

function updateCategoriesDisplay(categories) {
    // Update the categories grid with new data
    console.log('Updating categories display');
}

function applyUserPreferences(preferences) {
    // Apply user preferences to the interface
    if (preferences.darkMode) {
        document.body.classList.add('dark-mode');
    }
    if (preferences.highContrast) {
        document.body.classList.add('high-contrast');
    }
}

// Content Management Functions
function updateContentForUserDesigns() {
    document.querySelector('.whats-new').style.display = 'none';
    document.querySelector('.design-types').style.display = 'none';
    // Show user designs content
}

function updateContentForTemplates() {
    document.querySelector('.whats-new').style.display = 'block';
    document.querySelector('.design-types').style.display = 'grid';
    // Show templates content
}

function updateContentForCanvaAI() {
    // Show AI-powered content
    console.log('Updating content for Canva AI');
}

function showCategoryTemplates(category) {
    console.log('Showing templates for category:', category);
    // Navigate to category-specific templates
}

function showHomeContent() {
    // Show home dashboard content
    console.log('Showing home content');
}

function showProjectsContent() {
    // Show projects/folders content
    console.log('Showing projects content');
}

function showImagesContent() {
    // Show image library content
    console.log('Showing images content');
}

function showBrandContent() {
    // Show brand kit content
    console.log('Showing brand content');
}

function showAppsContent() {
    // Show installed apps content
    console.log('Showing apps content');
}

// Upgrade Functions
function upgradeToPro() {
    console.log('Processing Pro upgrade');
    closeModal(document.querySelector('.modal-close'));
    
    // Simulate upgrade process
    setTimeout(() => {
        alert('Redirecting to payment page...');
    }, 300);
}

// Animation Functions
function addClickAnimation(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = '';
    }, 150);
}

// Error Handling
function handleError(error) {
    console.error('Application error:', error);
    // Show user-friendly error message
}

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize tooltips and other UI enhancements
function initializeUIEnhancements() {
    // Add tooltips to buttons
    const buttons = document.querySelectorAll('button[title]');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', showTooltip);
        button.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const button = event.currentTarget;
    const title = button.getAttribute('title');
    if (title) {
        // Create and show tooltip
        console.log('Showing tooltip:', title);
    }
}

function hideTooltip(event) {
    // Hide tooltip
    console.log('Hiding tooltip');
}

// Export functions for global access
window.closeModal = closeModal;
window.createDesign = createDesign;
window.upgradeToPro = upgradeToPro;

// Initialize UI enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeUIEnhancements();
});