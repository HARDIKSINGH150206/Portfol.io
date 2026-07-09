# AGENTS.md

## Project Name
Hardik Singh Portfolio Website

## Main Goal
Build a minimal, premium, dark-themed developer portfolio for Hardik Singh.
The website must automatically sync pinned GitHub repositories into the Projects section and display coding activity from GitHub and LeetCode.

## Read These Documents First
Before writing code, read these files in order:
1. `docs/00_BLUEPRINT.md`
2. `docs/01_EXECUTION_PLAN.md`
3. `docs/02_ROADMAP.md`
4. `docs/03_FEATURE_SPEC.md`
5. `docs/04_UI_UX_GUIDE.md`
6. `docs/05_API_CONTRACTS.md`
7. `docs/06_ENV_SETUP.md`
8. `docs/07_TESTING_CHECKLIST.md`
9. `docs/08_DEPLOYMENT.md`

## Tech Stack
Use:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- GitHub GraphQL API
- LeetCode API with fallback handling
- React Leaflet / Leaflet
- Vercel deployment

## Non-Negotiable Rules
- Do not expose `GITHUB_TOKEN` on the frontend.
- Fetch GitHub pinned repositories through a backend API route.
- Projects section must show only pinned GitHub repositories.
- If GitHub or LeetCode API fails, show fallback UI.
- Do not request viewer location automatically.
- Ask for location only after the user clicks “Show my location on map”.
- Do not store viewer location.
- Keep the UI minimal, dark, clean, and synchronized.
- No heavy animations.
- No unnecessary database.
- No login system.
- No admin panel for MVP.

## Build Order
1. Set up project structure.
2. Add global theme and layout.
3. Build Navbar and Hero.
4. Build reusable section/card components.
5. Implement GitHub pinned projects API.
6. Render Projects section from API.
7. Add Coding Activity section.
8. Add Skills section.
9. Add Hackathons section.
10. Add Resume section.
11. Add Contact section with optional map.
12. Add responsive polish.
13. Add error states.
14. Test and prepare for deployment.

## Verification Before Finishing
Run:
```bash
npm run lint
npm run build
```

The project is complete only if:
- Build succeeds.
- Website is responsive.
- GitHub pinned projects load dynamically.
- API tokens are not exposed.
- Contact map does not ask permission on page load.
- UI matches the minimal dark design system.
