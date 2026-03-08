/* ======================================
   i18n — Internationalization System
   ====================================== */

const i18n = (() => {
    let currentLang = 'he'; // Default language

    const translations = {
        he: {
            // Meta
            meta: {
                title: 'המטבח הארגנטינאי — מתכונים אותנטיים',
                description: 'המטבח הארגנטינאי — מתכונים אותנטיים מארגנטינה, בעברית. אסאדו, אמפנדות, אלפחורס ועוד.',
                ogTitle: 'המטבח הארגנטינאי',
                ogDescription: 'מתכונים אותנטיים מהלב של בואנוס איירס',
            },

            // Header
            header: {
                title: 'המטבח הארגנטינאי',
                backToRecipes: 'חזרה למתכונים',
            },

            // Hero
            hero: {
                mainTitle: 'המטבח',
                highlightTitle: 'הארגנטינאי',
                subtitle: 'מתכונים אותנטיים מהלב של בואנוס איירס',
                searchPlaceholder: 'חיפוש מתכון...',
            },

            // Categories
            categories: {
                all: 'הכל',
                meats: 'בשרים',
                pastries: 'מאפים',
                desserts: 'קינוחים',
                beverages: 'משקאות',
                sides: 'תוספות',
            },

            // Recipe Card
            card: {
                minutes: 'דק\'',
                servings: 'מנות',
            },

            // Difficulty levels
            difficulty: {
                easy: 'קל',
                medium: 'בינוני',
                hard: 'מאתגר',
            },

            // Recipe Detail
            detail: {
                prepTime: 'הכנה',
                cookTime: 'בישול',
                servings: 'מנות',
                difficultyLevel: 'רמת קושי',
                ingredients: 'מצרכים',
                instructions: 'אופן ההכנה',
                shareWhatsApp: 'שלח רשימת מצרכים ל-WhatsApp',
            },

            // Empty State
            empty: {
                title: 'לא נמצאו מתכונים',
                description: 'נסו לשנות את מילות החיפוש או לבחור קטגוריה אחרת',
                clearButton: 'נקה חיפוש',
            },

            // Loading State
            loading: {
                message: 'טוען מתכונים...',
            },

            // Error State
            error: {
                title: 'שגיאה בטעינת המתכונים',
                retryButton: 'נסו שוב',
            },

            // Footer
            footer: {
                tagline: 'המטבח הארגנטינאי — מתכונים אותנטיים מארגנטינה, בעברית',
                backToHub: 'לעוד מתכוני עולם — חזרה לרכזת המתכונים',
            },

            // Result count
            results: {
                showing: 'מתכונים מתוך',
            },

            // WhatsApp message
            whatsapp: {
                shoppingListTitle: 'רשימת קניות עבור:',
                fullRecipe: 'למתכון המלא:',
            },
        },

        en: {
            // Meta
            meta: {
                title: 'Argentine Cuisine — Authentic Recipes',
                description: 'Argentine Cuisine — Authentic recipes from Argentina. Asado, Empanadas, Alfajores, and more.',
                ogTitle: 'Argentine Cuisine',
                ogDescription: 'Authentic recipes from the heart of Buenos Aires',
            },

            // Header
            header: {
                title: 'Argentine Cuisine',
                backToRecipes: 'Back to Recipes',
            },

            // Hero
            hero: {
                mainTitle: 'Argentine',
                highlightTitle: 'Cuisine',
                subtitle: 'Authentic recipes from the heart of Buenos Aires',
                searchPlaceholder: 'Search recipe...',
            },

            // Categories
            categories: {
                all: 'All',
                meats: 'Meats',
                pastries: 'Pastries',
                desserts: 'Desserts',
                beverages: 'Beverages',
                sides: 'Sides',
            },

            // Recipe Card
            card: {
                minutes: 'min',
                servings: 'servings',
            },

            // Difficulty levels
            difficulty: {
                easy: 'Easy',
                medium: 'Medium',
                hard: 'Challenging',
            },

            // Recipe Detail
            detail: {
                prepTime: 'Prep',
                cookTime: 'Cook',
                servings: 'Servings',
                difficultyLevel: 'Difficulty',
                ingredients: 'Ingredients',
                instructions: 'Instructions',
                shareWhatsApp: 'Share shopping list via WhatsApp',
            },

            // Empty State
            empty: {
                title: 'No recipes found',
                description: 'Try changing your search terms or select a different category',
                clearButton: 'Clear Search',
            },

            // Loading State
            loading: {
                message: 'Loading recipes...',
            },

            // Error State
            error: {
                title: 'Error loading recipes',
                retryButton: 'Try Again',
            },

            // Footer
            footer: {
                tagline: 'Argentine Cuisine — Authentic recipes from Argentina',
                backToHub: 'More world recipes — Back to Recipe Hub',
            },

            // Result count
            results: {
                showing: 'recipes out of',
            },

            // WhatsApp message
            whatsapp: {
                shoppingListTitle: 'Shopping list for:',
                fullRecipe: 'Full recipe:',
            },
        },
    };

    // Get translation by key (dot notation: 'hero.title')
    function t(key) {
        const keys = key.split('.');
        let value = translations[currentLang];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        return value || key;
    }

    // Set language
    function setLanguage(lang) {
        if (!translations[lang]) {
            console.warn(`Language not supported: ${lang}`);
            return;
        }
        currentLang = lang;
    }

    // Get current language
    function getLanguage() {
        return currentLang;
    }

    // Detect browser language
    function detectLanguage() {
        const saved = localStorage.getItem('lang');
        if (saved && translations[saved]) {
            return saved;
        }

        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('he')) {
            return 'he';
        }
        return 'en'; // Default to English if not Hebrew
    }

    // Initialize with detected language
    function init() {
        const lang = detectLanguage();
        setLanguage(lang);
        return lang;
    }

    return { t, setLanguage, getLanguage, detectLanguage, init };
})();
