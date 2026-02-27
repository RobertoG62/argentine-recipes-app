/* ======================================
   App — Router, Init, Orchestration
   ====================================== */

(async function App() {
    let debounceTimer = null;

    // --- Initialize ---
    UI.showLoading();

    try {
        await RecipeData.fetchRecipes();
    } catch (err) {
        document.getElementById('loading-state').innerHTML = `
            <div class="text-center">
                <div class="text-5xl mb-4 text-ar-danger"><i class="fas fa-exclamation-triangle"></i></div>
                <p class="text-ar-charcoal font-bold mb-2">שגיאה בטעינת המתכונים</p>
                <button onclick="location.reload()" class="px-4 py-2 bg-ar-gold text-white rounded-lg hover:bg-ar-gold-dark transition-colors">
                    נסו שוב
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
        RecipeData.filterRecipes('', 'הכל');
        renderHome();
    });

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
