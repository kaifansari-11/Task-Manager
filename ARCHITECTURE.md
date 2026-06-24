# Application Architecture & State Management

## Component Structure

The app uses Next.js's App Router with a small, single-responsibility
component tree. Nothing fancy — each file does one job.

```
app/
  layout.js        Root HTML shell, fonts, page metadata
  page.js           Composition root for the "/" route (see note below)
  globals.css       Tailwind import + light/dark theme variables

hooks/
  useTasks.js       All state, CRUD logic, and localStorage syncing

lib/
  storage.js        Thin, isolated wrapper around window.localStorage
  taskUtils.js       Pure helpers: id generation, sorting, filtering, time formatting

components/
  Header.js          Title + live total/active/done counters (presentational)
  AddTaskForm.js     Create: controlled form for title/description/priority
  FilterTabs.js      Read-filter: All / Active / Completed tabs + "Clear completed"
  TaskRow.js          Update + Delete UI for a single task (inline title edit,
                       checkbox toggle, delete button)
  PriorityBadge.js   Small presentational pill (HIGH/MED/LOW)
```

**Note on file naming:** `app/page.js` must be lowercase exactly. Next.js's
App Router resolves routes by exact, case-sensitive filename. On Windows,
a file saved as `Page.js` still works locally because the Windows
filesystem ignores case — but Vercel builds on Linux, where `Page.js` and
`page.js` are different files. Next.js looks specifically for `page.js`,
so a capitalized filename would not be picked up as the route component
and the deployed site would not render the app correctly. This is the one
required fix before deploying.

### Data flow

```
app/page.js  ──uses──>  hooks/useTasks.js  ──uses──>  lib/storage.js (localStorage)
     │                         │                  └──>  lib/taskUtils.js (sort/filter/id)
     │
     ├─> Header           (display-only props)
     ├─> AddTaskForm       (calls addTask)
     ├─> FilterTabs        (calls setFilter / clearCompleted)
     └─> TaskRow (×N)      (calls toggleComplete / updateTask / deleteTask)
                  └─> PriorityBadge (display-only)
```

`app/page.js` never touches localStorage or task arrays directly — it only
calls functions returned by `useTasks()` and passes data down as props.

## State Management & LocalStorage

### `lib/storage.js` — the persistence layer
A small wrapper around `window.localStorage` with two guards:
- **SSR safety:** every function checks `typeof window === "undefined"`
  first, since Next.js renders this code on the server too, where
  `window` doesn't exist.
- **Corruption safety:** `loadTasks()` is wrapped in try/catch and checks
  `Array.isArray()` on the parsed result, falling back to `[]` if the
  stored value is missing or unreadable.

### `lib/taskUtils.js` — pure helpers
`generateId`, `sortTasks`, `filterTasks`, and `relativeTime` are all pure
functions with no side effects, used by the hook and components. Keeping
them separate from the hook makes the sorting/filtering logic easy to
read and reuse on its own.

### `hooks/useTasks.js` — the single source of truth
This is where all CRUD operations and persistence live:

- **Initial load:** `tasks` starts as `[]` so the first client render
  matches the server render exactly (no hydration mismatch). A
  `useEffect` that runs once on mount calls `loadTasks()` and flips a
  `hydrated` flag to `true`.
- **Hydration flag:** `app/page.js` checks `hydrated` and shows a
  skeleton loading state until it's `true`, avoiding a flash of an
  empty "no tasks" message before the real data has loaded.
- **Auto-save:** a second `useEffect`, guarded by `if (hydrated)`,
  fires `saveTasks(tasks)` every time `tasks` changes — so every Create,
  Update, Delete, toggle, or bulk-clear automatically persists without
  any CRUD function needing to call `saveTasks` itself.
- **CRUD operations exposed:** `addTask`, `updateTask`, `deleteTask`,
  `toggleComplete`, and `clearCompleted` (bulk delete of completed
  tasks), all wrapped in `useCallback` for stable references.
- **Derived data:** `total`, `activeCount`, `completedCount`, and the
  filtered + sorted `tasks` array (via `filterTasks` + `sortTasks`) are
  recomputed from the raw list on every render and returned alongside
  the CRUD functions, so `app/page.js` and its children never need to
  know about sorting/filtering logic themselves.

### Why a custom hook instead of Context or a state library?
For a single-page app with one consumer (`app/page.js`) passing data down
one level to a handful of components, a custom hook gives the same
separation of concerns as Context/Redux/Zustand would, with far less
boilerplate. If the component tree grew deeper (tasks needed by
far-apart components without prop drilling), wrapping this hook's value
in a Context provider would be a natural next step without changing any
of the logic inside `useTasks`.

## Known limitations / possible next steps
- Editing a task in place (`TaskRow`) currently only supports the title.
  Description and priority can be set when a task is created but not
  edited afterward — extending `updateTask` to cover those is a
  straightforward follow-up if needed.
- All data is local to one browser/device — there's no backend, so
  tasks won't sync across devices or survive clearing browser storage.
