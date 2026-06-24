# Task Manager

A simple, focused task management web app built with Next.js (App Router)
and Tailwind CSS. All data is stored in the browser's `localStorage` —
no backend or database required.

## Features

- **Create** tasks with a title, optional description, and priority
  (High / Medium / Low)
- **Read** tasks, filtered by All / Active / Completed, sorted by
  completion status, then priority, then most recently created
- **Update** a task's title inline, or toggle it complete/incomplete
- **Delete** individual tasks, or bulk-clear all completed tasks
- Live counters for total / active / completed tasks
- Persists across browser refreshes via `localStorage` — no sign-in,
  no server

## Tech stack

- [Next.js](https://nextjs.org/) (App Router)
- React (hooks-based state, no external state library)
- Tailwind CSS
- Browser `localStorage` for persistence

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Project structure

See ARCHITECTURE.md for a full breakdown of the component structure and
how state/localStorage are handled.

```
app/          Routes, root layout, global styles
hooks/        useTasks — all CRUD logic + localStorage syncing
lib/          storage.js (localStorage wrapper), taskUtils.js (sort/filter/id helpers)
components/   Header, AddTaskForm, FilterTabs, TaskRow, PriorityBadge
```

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Import the repository at vercel.com/new.
3. Leave the default settings (Next.js is auto-detected) and deploy.

No environment variables or external services are required — everything
runs client-side.

## Notes on data storage

Tasks are stored under the `taskmanager_tasks` key in `localStorage`.
This means:
- Data is local to one browser, on one device. It will not sync between
  devices or browsers.
- Clearing your browser's site data/cache for this app will delete all
  saved tasks.
- No personal data ever leaves your browser — there's no backend to
  send it to.
