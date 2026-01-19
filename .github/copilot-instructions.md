# AI Coding Guidelines for Wedding Invitation Project

## Project Overview
This is a static bilingual (Spanish/Italian) wedding invitation website with two pages:
- `index.html`: Language selection → guest code entry → personalized landing
- `invitation.html`: Detailed invitation with sections (date, details, photos, etc.)

No build process required; serve static files with Live Server in VS Code.

## Architecture & Data Flow
- **Guest Authentication**: Codes stored in `codes.js` array of `{code, name}` objects
- **Language Handling**: Auto-detect from "y" (Spanish) or "e" (Italian) in guest input
- **Plural Logic**: Detect couples via "y"/"e" tokens for singular/plural invitations
- **State Passing**: URL parameters (`?lang=es&name=Guest`) between pages
- **Translations**: `T` objects in `script.js` and `invitation.js` with ES/IT strings

## Key Patterns & Conventions

### Guest Code Management
Edit `codes.js` to add guests:
```javascript
const CODES = [
  { code: "mauro", name: "Mauro" },
  { code: "oliviero e manuela", name: "Oliviero e Manuela" },
  // ...
];
```
- Codes normalized (lowercase, trimmed, single spaces) for matching
- Names displayed as-is; codes used for input validation

### Translation Structure
Use nested `T` objects with functions for dynamic content:
```javascript
const T = {
  es: {
    singular: (name) => `${name}, estás cordialmente invitado...`,
    plural: (name) => `${name}, están cordialmente invitados...`,
  },
  it: { /* Italian equivalents */ }
};
```

### Language Auto-Detection
```javascript
function autoLangFromText(text) {
  if (containsToken(text, 'e')) return 'it';
  if (containsToken(text, 'y')) return 'es';
  return lang; // fallback
}
```

### Styling
- Custom Montserrat font loaded from `assets/fonts/`
- CSS variables for color scheme (`--paper`, `--ink`, `--accent`)
- Responsive design with `min()` functions and flexbox

## Development Workflow
1. **Serve locally**: Use VS Code Live Server extension on `index.html`
2. **Add guests**: Edit `codes.js` array
3. **Update content**: Modify HTML in `invitation.html`, texts in JS files
4. **Replace assets**: Swap images in `assets/` (maintain filenames)
5. **Test flow**: Language → Code → Landing → Invitation page

## File Organization
- `script.js`: Index page logic, code validation, translations
- `invitation.js`: Invitation page setup, menu, back button
- `style.css`: Shared styles, custom properties, responsive layout
- `assets/`: Images, fonts, `save.ics` calendar file

## Common Tasks
- **Add new guest**: Append to `CODES` array in `codes.js`
- **Change invitation text**: Edit `introText` in `invitation.html` or `T` objects
- **Update date**: Modify calendar link in `invitation.html`
- **Add section**: Follow existing `<section class="invite-section">` pattern</content>
<parameter name="filePath">/Users/stephany/Desktop/invitacion-simple-v4/.github/copilot-instructions.md