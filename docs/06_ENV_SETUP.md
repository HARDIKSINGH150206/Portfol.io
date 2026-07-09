# 06_ENV_SETUP.md

## Required Environment Variables
Create `.env.local`:

```env
GITHUB_TOKEN=
GITHUB_USERNAME=
LEETCODE_USERNAME=
NEXT_PUBLIC_SITE_URL=
```

## Rules
- Never expose `GITHUB_TOKEN` in frontend components.
- Only use `GITHUB_TOKEN` inside API routes or server-side code.
- Add `.env.local` to `.gitignore`.
- Commit `.env.example`, not `.env.local`.
