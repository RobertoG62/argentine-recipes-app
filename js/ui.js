/* ======================================
   UI Layer — DOM Rendering
   ====================================== */

const UI = (() => {
    const CATEGORY_ICONS = {
        // Hebrew
        'הכל': 'fa-utensils',
        'בשרים': 'fa-fire',
        'מאפים': 'fa-bread-slice',
        'קינוחים': 'fa-cookie',
        'משקאות': 'fa-mug-hot',
        'תוספות': 'fa-leaf',
        // English
        'All': 'fa-utensils',
        'Meats': 'fa-fire',
        'Pastries': 'fa-bread-slice',
        'Desserts': 'fa-cookie',
        'Beverages': 'fa-mug-hot',
        'Sides': 'fa-leaf',
    };

    function buildWhatsAppUrl(recipe) {
        const ingredientLines = recipe.ingredients
            .map(ing => `▢ ${ing.quantity} ${ing.unit} ${ing.name}`)
            .join('\n');
        const recipeUrl = window.location.href;
        const listTitle = i18n.t('whatsapp.shoppingListTitle');
        const fullRecipeLabel = i18n.t('whatsapp.fullRecipe');
        const message = `*${listTitle} ${recipe.title}*\n\n${ingredientLines}\n\n${fullRecipeLabel} ${recipeUrl}`;
        return `https://wa.me/?text=${encodeURIComponent(message)}`;
    }

    function getDifficultyBadge(difficulty) {
        const map = {
            // Hebrew
            'קל': 'badge-easy',
            'בינוני': 'badge-medium',
            'מאתגר': 'badge-hard',
            // English
            'Easy': 'badge-easy',
            'Medium': 'badge-medium',
            'Challenging': 'badge-hard',
        };
        return map[difficulty] || 'badge-medium';
    }

    // --- Category Filter Pills ---
    function renderFilters(categories, activeCategory, onCategoryClick) {
        const container = document.getElementById('category-filters');
        container.innerHTML = categories.map(cat => `
            <button class="category-pill ${cat === activeCategory ? 'active' : ''}" data-category="${cat}">
                <i class="fas ${CATEGORY_ICONS[cat] || 'fa-tag'}"></i>
                <span>${cat}</span>
            </button>
        `).join('');

        container.querySelectorAll('.category-pill').forEach(btn => {
            btn.addEventListener('click', () => onCategoryClick(btn.dataset.category));
        });
    }

    // --- Recipe Cards Grid ---
    function renderCards(recipes) {
        const grid = document.getElementById('recipe-grid');
        const empty = document.getElementById('empty-state');
        const loading = document.getElementById('loading-state');

        loading.classList.add('hidden');

        if (recipes.length === 0) {
            grid.classList.add('hidden');
            empty.classList.remove('hidden');
            return;
        }

        empty.classList.add('hidden');
        grid.classList.remove('hidden');
        grid.innerHTML = recipes.map(recipe => `
            <article class="recipe-card card-lift" data-id="${recipe.id}">
                <div class="recipe-card-image-wrapper">
                    <div class="img-placeholder"><i class="fas fa-utensils"></i></div>
                    <img
                        src="${recipe.image}"
                        alt="${recipe.title}"
                        class="recipe-card-image"
                        loading="lazy"
                        onload="this.classList.add('loaded')"
                        onerror="this.style.display='none'"
                    >
                </div>
                <div class="p-4">
                    <h3 class="font-bold text-lg mb-0.5 text-ar-charcoal">${recipe.title}</h3>
                    ${recipe.originalName ? `<p class="text-ar-gold-dark text-xs italic mb-2 font-playfair">${recipe.originalName}</p>` : ''}
                    <p class="text-ar-text-secondary text-sm line-clamp-2 mb-3">${recipe.description}</p>
                    <div class="flex items-center justify-between text-xs text-ar-text-secondary">
                        <div class="flex items-center gap-3">
                            <span><i class="far fa-clock ${i18n.getLanguage() === 'he' ? 'ml-1' : 'mr-1'}"></i>${recipe.prepTime + recipe.cookTime} ${i18n.t('card.minutes')}</span>
                            <span><i class="fas fa-users ${i18n.getLanguage() === 'he' ? 'ml-1' : 'mr-1'}"></i>${recipe.servings} ${i18n.t('card.servings')}</span>
                        </div>
                        <span class="px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyBadge(recipe.difficulty)}">
                            ${recipe.difficulty}
                        </span>
                    </div>
                </div>
            </article>
        `).join('');

        grid.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', () => {
                location.hash = `#/recipe/${card.dataset.id}`;
            });
        });
    }

    // --- Result Count ---
    function renderResultCount(count, total) {
        const el = document.getElementById('result-count');
        if (count === total) {
            el.classList.add('hidden');
        } else {
            el.classList.remove('hidden');
            const showing = i18n.t('results.showing');
            el.textContent = i18n.getLanguage() === 'he'
                ? `${count} ${showing} ${total}`
                : `${count} ${showing} ${total}`;
        }
    }

    // --- Recipe Detail View ---
    function renderRecipeDetail(recipe) {
        const container = document.getElementById('recipe-view');
        container.innerHTML = `
            <div class="view-fade-in">
                <!-- Hero Image -->
                <div class="recipe-hero" style="background-image: url('${recipe.image}')">
                    <div class="relative z-10 w-full p-6 md:p-10 max-w-4xl mx-auto">
                        <span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-ar-gold text-white mb-3">
                            <i class="fas ${CATEGORY_ICONS[recipe.category] || 'fa-tag'} ml-1"></i>
                            ${recipe.category}
                        </span>
                        <h1 class="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                            ${recipe.title}
                        </h1>
                        ${recipe.originalName ? `<p class="text-ar-gold-light text-base md:text-lg italic font-playfair mt-1">${recipe.originalName}</p>` : ''}
                        <p class="text-gray-300 mt-2 text-base md:text-lg max-w-xl">${recipe.description}</p>
                    </div>
                </div>

                <div class="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
                    <!-- Meta Bar -->
                    <div class="glass rounded-xl p-4 flex justify-center gap-0 mb-8">
                        <div class="meta-item">
                            <i class="far fa-clock text-ar-gold"></i>
                            <span class="font-bold text-ar-charcoal">${recipe.prepTime} ${i18n.t('card.minutes')}</span>
                            <span class="text-xs text-ar-text-secondary">${i18n.t('detail.prepTime')}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-fire text-ar-gold"></i>
                            <span class="font-bold text-ar-charcoal">${recipe.cookTime} ${i18n.t('card.minutes')}</span>
                            <span class="text-xs text-ar-text-secondary">${i18n.t('detail.cookTime')}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-users text-ar-gold"></i>
                            <span class="font-bold text-ar-charcoal">${recipe.servings}</span>
                            <span class="text-xs text-ar-text-secondary">${i18n.t('detail.servings')}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-gauge text-ar-gold"></i>
                            <span class="font-bold text-ar-charcoal">${recipe.difficulty}</span>
                            <span class="text-xs text-ar-text-secondary">${i18n.t('detail.difficultyLevel')}</span>
                        </div>
                    </div>

                    <!-- Ingredients -->
                    <div class="glass gold-border-right rounded-xl p-6 mb-8">
                        <h2 class="font-bold text-xl mb-4 text-ar-charcoal flex items-center gap-2">
                            <i class="fas fa-list text-ar-gold"></i>
                            ${i18n.t('detail.ingredients')}
                            <span class="text-sm font-normal text-ar-text-secondary">(${recipe.ingredients.length})</span>
                        </h2>
                        <div>
                            ${recipe.ingredients.map(ing => `
                                <div class="ingredient-row">
                                    <span class="text-ar-gold"><i class="fas fa-check text-xs"></i></span>
                                    <span><strong>${ing.quantity} ${ing.unit}</strong> ${ing.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- WhatsApp Share -->
                    <a href="${buildWhatsAppUrl(recipe)}" target="_blank" rel="noopener noreferrer" class="whatsapp-share-btn">
                        <i class="fab fa-whatsapp"></i>
                        ${i18n.t('detail.shareWhatsApp')}
                    </a>

                    <!-- Instructions -->
                    <div class="mb-8">
                        <h2 class="font-bold text-xl mb-6 text-ar-charcoal flex items-center gap-2">
                            <i class="fas fa-list-ol text-ar-gold"></i>
                            ${i18n.t('detail.instructions')}
                        </h2>
                        <div class="space-y-4">
                            ${recipe.instructions.map((step, i) => `
                                <div class="flex gap-4 items-start">
                                    <div class="step-number">${i + 1}</div>
                                    <p class="text-ar-charcoal pt-1 leading-relaxed">${step}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-2 mb-8">
                        ${recipe.tags.map(tag => `
                            <span class="tag-pill">
                                <i class="fas fa-hashtag text-xs"></i>
                                ${tag}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // --- Show/Hide Views ---
    function showHome() {
        document.getElementById('home-view').classList.remove('hidden');
        document.getElementById('recipe-view').classList.add('hidden');
        document.getElementById('back-btn').classList.add('hidden');
        document.getElementById('back-btn').classList.remove('flex');
    }

    function showRecipeView() {
        document.getElementById('home-view').classList.add('hidden');
        document.getElementById('recipe-view').classList.remove('hidden');
        document.getElementById('back-btn').classList.remove('hidden');
        document.getElementById('back-btn').classList.add('flex');
        window.scrollTo(0, 0);
    }

    function showLoading() {
        document.getElementById('loading-state').classList.remove('hidden');
        document.getElementById('recipe-grid').classList.add('hidden');
        document.getElementById('empty-state').classList.add('hidden');
    }

    return {
        renderFilters,
        renderCards,
        renderResultCount,
        renderRecipeDetail,
        showHome,
        showRecipeView,
        showLoading,
    };
})();
