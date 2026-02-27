# PRODUCT_REQUIREMENTS.md — Argentine Recipes App V1

## 1. Project Definition

### Overview

A fully static, mobile-first web application for browsing authentic Argentine recipes, localized entirely in Hebrew. Runs in the browser (HTML/CSS/Vanilla JS) with zero backend dependencies. All recipe data stored in a local JSON file and rendered dynamically via client-side JavaScript.

**Brand Name**: המטבח הארגנטינאי (The Argentine Kitchen)

### Goals

1. Present 10 authentic Argentine recipes in Hebrew with professional presentation
2. Provide intuitive search and category filtering
3. Deliver a luxury minimalist visual experience optimized for mobile
4. Deploy to GitHub Pages with zero build step

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (semantic, RTL) |
| Styling | Tailwind CSS v4 (CDN) + custom CSS |
| Logic | Vanilla JavaScript (ES2020+) |
| Data | Local `recipes.json` |
| Fonts | Google Fonts (Heebo + Playfair Display) |
| Icons | Font Awesome 6.x (CDN) |
| Deployment | GitHub Pages |

---

## 2. Data Model

### Recipe JSON Schema

```json
{
  "id": "string (kebab-case slug)",
  "title": "string (Hebrew)",
  "description": "string (Hebrew, 1-2 sentences)",
  "category": "string (בשרים | מאפים | קינוחים | משקאות | תוספות)",
  "image": "string (Unsplash URL)",
  "prepTime": "number (minutes)",
  "cookTime": "number (minutes)",
  "servings": "number",
  "difficulty": "string (קל | בינוני | מאתגר)",
  "ingredients": [{ "name": "string", "quantity": "string", "unit": "string" }],
  "instructions": ["string (Hebrew step)"],
  "tags": ["string (Hebrew)"]
}
```

### Categories

| Hebrew | English (ref) | Icon |
|--------|--------------|------|
| בשרים | Meats | `fa-fire` |
| מאפים | Baked Goods | `fa-bread-slice` |
| קינוחים | Desserts | `fa-cookie` |
| משקאות | Beverages | `fa-mug-hot` |
| תוספות | Sides & Sauces | `fa-leaf` |

### V1 Recipes (10)

| ID | Hebrew Title | Category | Difficulty |
|---|---|---|---|
| `asado-argentino` | אסאדו ארגנטינאי | בשרים | בינוני |
| `empanadas-carne` | אמפנדות בשר | מאפים | בינוני |
| `chimichurri` | צ'ימיצ'ורי | תוספות | קל |
| `alfajores` | אלפחורס | קינוחים | בינוני |
| `dulce-de-leche` | דולסה דה לצ'ה | קינוחים | קל |
| `milanesa` | מילנסה ארגנטינאית | בשרים | קל |
| `choripan` | צ'וריפן | בשרים | קל |
| `provoleta` | פרובולטה | תוספות | קל |
| `mate` | מאטה | משקאות | קל |
| `locro` | לוקרו | בשרים | מאתגר |

---

## 3. UI Specification

### Views

| Route | View | Content |
|-------|------|---------|
| `#/` | Home | Hero + search + category pills + recipe grid |
| `#/recipe/:id` | Detail | Hero image + meta bar + ingredients + instructions + tags |

### Responsive Breakpoints

| Width | Columns | Notes |
|-------|---------|-------|
| < 480px | 1 | Full-width cards |
| 480-767px | 2 | Slight padding increase |
| 768-1023px | 2-3 | Centered search |
| >= 1024px | 3 | Max-width 1200px container |

### Components

- **Header**: Sticky, glass effect on scroll, logo + back button (detail view)
- **Hero**: Gradient overlay, title, subtitle, search input
- **Category Pills**: Horizontal scroll, single-select, gold active state
- **Recipe Cards**: Image (16:9), title, description (2-line clamp), meta row, card-lift hover
- **Recipe Detail**: Hero image with gradient, meta bar (4 items), ingredients card, numbered instructions, tag pills
- **Footer**: Dark (`ar-navy`), brand credit

---

## 4. Feature Priority

### V1 (This Release)
- 10 recipes in `recipes.json`
- Home page with recipe card grid
- Category filter pills
- Text search bar (debounced 200ms)
- Recipe detail page
- Hash-based routing
- Mobile-first responsive
- RTL Hebrew
- Luxury minimalist design
- GitHub Pages deployment

### V2 (Deferred)
- Favorites (localStorage)
- Ingredient scaling
- Print view
- Dark mode
- PWA/offline
- Switch from Tailwind CSS CDN to Tailwind CLI for production builds (smaller bundle, no browser console warning)

---

*Created: 2026-02-27 | Stack: Vanilla HTML/JS + Tailwind CSS CDN*
