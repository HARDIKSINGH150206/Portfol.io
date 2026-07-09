# 01_EXECUTION_PLAN.md

## Phase 1: Project Setup
- Create Next.js App Router project.
- Use TypeScript.
- Install Tailwind CSS.
- Install required packages:
  - framer-motion
  - lucide-react
  - leaflet
  - react-leaflet

## Phase 2: Base UI
Create:
- `Navbar.tsx`
- `Hero.tsx`
- `SectionHeader.tsx`
- `Footer.tsx`

Set global dark theme in `globals.css`.

## Phase 3: GitHub Pinned Projects
Create API route:

```text
app/api/github/pinned/route.ts
```

Fetch pinned repositories from GitHub GraphQL.

Return:
- name
- description
- url
- homepageUrl
- stargazerCount
- forkCount
- primaryLanguage
- repositoryTopics
- updatedAt

Create:
- `Projects.tsx`
- `ProjectCard.tsx`

Render only API data.

## Phase 4: Coding Activity
Create:
- `CodingActivity.tsx`

Show:
- GitHub contribution card.
- GitHub streak card.
- LeetCode stats card.
- Fallback if LeetCode fails.

## Phase 5: Static Sections
Create:
- `About.tsx`
- `Skills.tsx`
- `Hackathons.tsx`
- `Resume.tsx`

## Phase 6: Contact Section
Create:
- `Contact.tsx`
- `LocationMap.tsx`

Rules:
- Do not request geolocation on page load.
- Add button: “Show my location on map”.
- If allowed, show marker.
- If denied, show fallback message.

## Phase 7: Polish
- Add responsive design.
- Add subtle card hover effects.
- Add smooth scrolling.
- Add loading states.
- Add error states.

## Phase 8: Testing
Run:

```bash
npm run lint
npm run build
```

Fix all errors before final output.
