/* ======================================
   App — Router, Init, Orchestration
   ====================================== */

(async function App() {
    let debounceTimer = null;

    // --- Language Detection & Initialization ---
    const detectedLang = i18n.init();
    applyLanguageSettings(detectedLang);

    // --- Initialize ---
    UI.showLoading();

    try {
        await RecipeData.fetchRecipes(detectedLang);
    } catch (err) {
        console.error('Failed to load recipes:', err);
        document.getElementById('loading-state').innerHTML = `
            <div class="text-center">
                <div class="text-5xl mb-4 text-ar-danger"><i class="fas fa-exclamation-triangle"></i></div>
                <p class="text-ar-charcoal font-bold mb-2">${i18n.t('error.title')}</p>
                <button onclick="location.reload()" class="px-4 py-2 bg-ar-gold text-white rounded-lg hover:bg-ar-gold-dark transition-colors">
                    ${i18n.t('error.retryButton')}
                </button>
            </div>
        `;
        return;
    }

    // --- Render Home ---
    function renderHome() {
        const state = RecipeData.getState();
        UI.renderFilters(state.categories, state.activeCategory, onCategoryClick);
        UI.renderCards(state.filteredRecipes);
        UI.renderResultCount(state.filteredRecipes.length, state.recipes.length);
    }

    // --- Search Handler (debounced) ---
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');

    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const state = RecipeData.getState();
            RecipeData.filterRecipes(searchInput.value, state.activeCategory);
            renderHome();
        }, 200);

        searchClear.classList.toggle('hidden', !searchInput.value);
    });

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.classList.add('hidden');
        const state = RecipeData.getState();
        RecipeData.filterRecipes('', state.activeCategory);
        renderHome();
    });

    // --- Category Click ---
    function onCategoryClick(category) {
        RecipeData.filterRecipes(searchInput.value, category);
        renderHome();
    }

    // --- Clear Filters Button (empty state) ---
    document.getElementById('clear-filters-btn').addEventListener('click', () => {
        searchInput.value = '';
        searchClear.classList.add('hidden');
        RecipeData.filterRecipes('', i18n.t('categories.all'));
        renderHome();
    });

    // --- Language Switcher ---
    async function switchLanguage(lang) {
        // Save preference
        localStorage.setItem('lang', lang);

        // Update i18n
        i18n.setLanguage(lang);

        // Apply language settings (dir, lang, fonts, meta)
        applyLanguageSettings(lang);

        // Reload recipes
        UI.showLoading();
        await RecipeData.switchLanguage(lang);

        // Re-render
        renderHome();

        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update placeholders and static text
        updateStaticText();
    }

    function applyLanguageSettings(lang) {
        const html = document.documentElement;
        html.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
        html.setAttribute('lang', lang === 'he' ? 'he' : 'en');

        // Update meta tags
        document.title = i18n.t('meta.title');
        document.querySelector('meta[name="description"]').content = i18n.t('meta.description');
        document.querySelector('meta[property="og:title"]').content = i18n.t('meta.ogTitle');
        document.querySelector('meta[property="og:description"]').content = i18n.t('meta.ogDescription');
    }

    function updateStaticText() {
        // Update header
        document.querySelector('#header-logo .font-playfair').textContent = i18n.t('header.title');
        document.querySelector('#back-btn span').textContent = i18n.t('header.backToRecipes');

        // Update hero
        const heroTitle = document.querySelector('#hero h1');
        heroTitle.innerHTML = `${i18n.t('hero.mainTitle')} <span class="text-ar-gold">${i18n.t('hero.highlightTitle')}</span>`;
        document.querySelector('#hero p').textContent = i18n.t('hero.subtitle');
        searchInput.placeholder = i18n.t('hero.searchPlaceholder');

        // Update empty state
        document.querySelector('#empty-state h3').textContent = i18n.t('empty.title');
        document.querySelector('#empty-state p').textContent = i18n.t('empty.description');
        document.querySelector('#clear-filters-btn').textContent = i18n.t('empty.clearButton');

        // Update loading state
        document.querySelector('#loading-state p').textContent = i18n.t('loading.message');

        // Update footer
        const footerText = document.querySelector('footer .max-w-6xl p');
        footerText.innerHTML = `
            ${i18n.t('footer.tagline')}
            <span class="text-ar-gold mx-1"><i class="fas fa-heart"></i></span>
        `;
        document.querySelector('footer a span').textContent = i18n.t('footer.backToHub');
    }

    // Language button listeners
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });

    // Initial static text update
    updateStaticText();

    // --- Back Button ---
    document.getElementById('back-btn').addEventListener('click', () => {
        location.hash = '#/';
    });

    // --- Header Glass Effect on Scroll ---
    const header = document.getElementById('app-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('header-glass', window.scrollY > 50);
    }, { passive: true });

    // --- Hash Router ---
    function handleRoute() {
        const hash = location.hash || '#/';

        if (hash.startsWith('#/recipe/')) {
            const id = hash.replace('#/recipe/', '');
            const recipe = RecipeData.getRecipeById(id);
            if (recipe) {
                UI.renderRecipeDetail(recipe);
                UI.showRecipeView();
            } else {
                location.hash = '#/';
            }
        } else {
            UI.showHome();
            renderHome();
        }
    }

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
})();
