# 05_API_CONTRACTS.md

## API: GitHub Pinned Repositories
Endpoint:
```text
GET /api/github/pinned
```

Environment variables:

```env
GITHUB_TOKEN=
GITHUB_USERNAME=
```

Response:

```json
[
  {
    "name": "project-name",
    "description": "Project description",
    "url": "https://github.com/user/repo",
    "homepageUrl": "https://demo.com",
    "stargazerCount": 0,
    "forkCount": 0,
    "updatedAt": "2026-01-01T00:00:00Z",
    "primaryLanguage": {
      "name": "TypeScript",
      "color": "#3178c6"
    },
    "topics": ["nextjs", "tailwind", "portfolio"]
  }
]
```

Error response:

```json
{ "error": "Unable to load GitHub pinned repositories." }
```

## API: LeetCode Stats
Endpoint:

```text
GET /api/leetcode
```

Environment variables:

```env
LEETCODE_USERNAME=
```

Response:

```json
{
  "totalSolved": 0,
  "easySolved": 0,
  "mediumSolved": 0,
  "hardSolved": 0,
  "streak": 0
}
```

If LeetCode fails, return safe fallback:

```json
{ "error": "LeetCode stats temporarily unavailable." }
```
