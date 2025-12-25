# Copilot instructions for Newarsip (INDOARSIP)

Purpose: Short, actionable guidance so an AI coding agent can be productive immediately in this repository.

## Quick start (commands) ✅
- Dev server: `npm run dev` → Vite server (configured in `vite.config.js`, port 3000)
- Build: `npm run build`
- Preview production build: `npm run preview`

## Big picture (what this app *is*) 🔎
- Single-page React app created with Vite. Entry points: `src/main.jsx` → `src/App.jsx`.
- Views are controlled by a string state in `App.jsx`: `'login'`, `'dashboard'`, `'input-box'`, `'data-box'` (no React Router).
- State is currently local to the app via custom hooks in `src/hooks/` (no global Redux or Context provider used yet).

## Key components & files (where to look first) 📁
- App flow & view switches: `src/App.jsx`
- Authentication: `src/hooks/useAuth.js` and `src/components/Auth/LoginScreen.jsx` (demo creds hard-coded)
- Box / Bantex domain logic: `src/hooks/useBoxes.js` and UI in `src/components/Box/InputBoxView.jsx` + `DataBoxView.jsx`
- Layout & navigation: `src/components/Layout/MainLayout.jsx`, `Sidebar.jsx`, `Header.jsx`
- Constants: `src/constants/colors.js` (colors, `DIVISI_LIST`, `INITIAL_BOXES`)
- Helpers: `src/utils/formatters.js`, `src/utils/validators.js`
- Styling: Tailwind utility classes (`src/index.css` + `tailwind.config.js`) and icons via `lucide-react`.

## Concrete patterns & conventions to follow 🎯
- Naming: Components use PascalCase filenames; hooks use `useXxx.js` and export readably named functions.
- Exports: Some components are default exports (e.g., `InputBoxView`), others are named exports (e.g., `LoginScreen`)—match the original import style when editing.
- UI strings are in Indonesian and date formatting uses the `id-ID` locale (see `formatDate` & `getCurrentDate`).
- Validation: `validatePeriodeFormat` enforces a pattern like `I/2023` — regex in `src/utils/validators.js`.
- Business rule: Each box can contain up to **6 bantex** — enforced in `useBoxes.saveBantex` and used in `InputBoxView` logic.

## Notable implementation details / gotchas ⚠️
- Auth is local/demo-only: `useAuth.handleLogin` checks `administrator/123` and `user/user` and sets `userRole`. If adding real auth, update both hook and UI flows.
- No backend integration yet — `submitBox`, `approveBox`, and `rejectBox` mutate local state; if you add network calls, keep UI optimistic updates consistent with these functions.
- Views are switched by `setView('...')` in `App.jsx` — adding routing requires refactor to use React Router or similar.
- Port is hard-configured in `vite.config.js` (port 3000 + `open: true`).

## When adding features or integration points 🔌
- Prefer adding network calls inside hooks (e.g., `useBoxes`, `useAuth`) so components stay presentational.
- Add loading & error state properties to hooks before calling from components.
- Update `src/constants` when adding domain lists (e.g., new `DIVISI`) and reuse them across forms.

## Testing & linting notes 🧪
- No tests are present currently. If adding tests, follow component-level testing (Jest + React Testing Library recommended).
- ESLint config files exist in subfolders (`app/`, `newarsip-react/`)—run linters from the package containing the code you modify or add a root-level ESLint config.

## Useful examples to reference in PRs ✍️
- Add API for submit: replace `submitBox(newBox)` in `useBoxes` with POST to backend and keep `submitBox` as a wrapper that updates local state on success.
- Add server-side auth: replace logic in `useAuth.handleLogin` with `fetch`/`axios` call and return `{ success, role }` consistently.
- Keep UI colours centralized: change `COLORS.primary` in `src/constants/colors.js` instead of editing inline Tailwind styles.

---
If anything above is unclear or you want the file to emphasize other workflows (CI, storybook, tests), tell me which area to expand and I will iterate. ✅
