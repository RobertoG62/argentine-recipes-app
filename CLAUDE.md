# CLAUDE.md — Argentine Recipes App

> Project-level rules for `d:\claude\argentine-recipes-app\`.
> Inherits from workspace root `CLAUDE.md`. Rules here override the parent where they conflict.

---

## Project Overview

A **mobile-first, RTL Hebrew web application** showcasing authentic Argentine recipes. Static site with no backend — all recipe data lives in a local `recipes.json` file. The brand narrative is **"המטבח הארגנטינאי"** (The Argentine Kitchen) — authoritative, warm, food-photography-driven.

## Architecture & Tech Stack

- **Framework**: Single-page static site (HTML + Tailwind CSS CDN + vanilla JS). No build step.
- **Styling**: Tailwind CSS v4 via CDN. Custom design tokens defined inline.
- **Icons**: Font Awesome 6.x (CDN).
- **Fonts**: Heebo (body text), Playfair Display (display headings) via Google Fonts.
- **Data**: Local `data/recipes.json` fetched via `fetch()` at startup.
- **Routing**: Hash-based client-side routing (`#/`, `#/recipe/:id`). No server-side routing.
- **Deployment target**: GitHub Pages.

## Design System — Argentine Palette

All components MUST use these tokens exclusively. Do not introduce colors outside this palette.

### Primary Palette
| Token | Hex | Usage |
|---|---|---|
| `ar-gold` | `#C9A84C` | Primary accent, CTAs, active states, borders |
| `ar-cream` | `#FAFAFA` | Page background, card backgrounds |
| `ar-charcoal` | `#1A1A1A` | Primary text, headings, nav |
| `ar-navy` | `#0A1628` | Hero sections, dark backgrounds, footer |

### Extended Palette
| Token | Hex | Usage |
|---|---|---|
| `ar-warm-gray` | `#F5F0EB` | Alternate card/section background |
| `ar-gold-light` | `#E8D9A0` | Hover states, subtle highlights |
| `ar-gold-dark` | `#A68A3C` | Active/pressed states |
| `ar-text-secondary` | `#6B7280` | Secondary text, metadata |
| `ar-border` | `#E5E1DC` | Card borders, dividers |
| `ar-success` | `#16A34A` | Difficulty "easy" badge |
| `ar-warning` | `#D97706` | Difficulty "medium" badge |
| `ar-danger` | `#DC2626` | Difficulty "hard" badge |

## RTL Support

The site's primary language is **Hebrew (RTL)**. All HTML MUST use `dir="rtl"` and `lang="he"`.

When building components:
- Use logical CSS properties or Tailwind RTL utilities
- Text alignment defaults to natural RTL flow
- Icons that imply direction (arrows, back buttons) MUST be mirrored for RTL

## Data Rules

- All recipe content (titles, descriptions, ingredients, instructions) MUST be in Hebrew
- The `recipes.json` schema is defined in `PRODUCT_REQUIREMENTS.md` — do not deviate
- Images use Unsplash URLs for V1
- Recipe IDs are kebab-case English slugs (e.g., `asado-argentino`, `empanadas-carne`)

## Key Conventions

- The site brands itself as **"המטבח הארגנטינאי"**
- Content tone: warm expert — "Your Argentine grandmother's kitchen" energy
- All cooking measurements use metric system (grams, ml, Celsius)
- Prep/cook times in minutes
- Category names in Hebrew: בשרים, מאפים, קינוחים, משקאות, תוספות

## File Structure

```
argentine-recipes-app/
├── index.html           # Single page application entry
├── css/
│   └── style.css        # Custom styles beyond Tailwind
├── js/
│   ├── app.js           # App init, router, orchestration
│   ├── data.js          # Fetch recipes.json, search/filter logic
│   └── ui.js            # DOM rendering (cards, detail view, filters)
├── data/
│   └── recipes.json     # All recipe data (Hebrew)
├── CLAUDE.md            # This file
├── PRODUCT_REQUIREMENTS.md
├── .gitignore
└── README.md
```
