// Part 6: Advanced React & React 19 Ecosystem
Object.assign(conceptsData, {
    "Strict Mode": {
        explanation: "A tool for highlighting potential problems in an application. It doesn't render any UI but activates extra checks: 1) Identifies components with unsafe lifecycles, 2) Warns about legacy string ref usage, 3) Detects unexpected side effects by double-invoking renders/effects (in dev).",
        code: `<React.StrictMode>\n  <App />\n</React.StrictMode>`
    },
    "External Libraries": {
        explanation: "State management beyond Context API. Redux Toolkit: standard for large apps with strict structure. Zustand: minimal, hook-based, high performance. MobX: reactive/observable based. Recoil/Jotai: atomic state. Choose based on complexity and team preference.",
        code: `// Zustand example\nimport { create } from 'zustand';\nconst useStore = create((set) => ({\n  count: 0,\n  inc: () => set((state) => ({ count: state.count + 1 })),\n}));`
    },
    "Server State": {
        explanation: "Managing async data fetching, caching, and synchronization. TanStack Query (React Query) handles: caching, deduplication, background fetching, pagination, and mutations. Removes the need for complex useEffect data fetching logic.",
        code: `const { data, isLoading } = useQuery({\n  queryKey: ['user', id],\n  queryFn: () => fetchUser(id),\n});`
    },
    "Form State": {
        explanation: "Handling complex forms efficiently. React Hook Form uses uncontrolled components with refs to minimize re-renders, while still providing validation and state management. Better performance than pure controlled components for large forms.",
        code: `const { register, handleSubmit } = useForm();\nconst onSubmit = data => console.log(data);\n\n<form onSubmit={handleSubmit(onSubmit)}>\n  <input {...register('name')} />\n  <button type="submit">Submit</button>\n</form>`
    },
    "Profiling": {
        explanation: "Using React DevTools Profiler to measure component performance. It records every render and shows: 1) Which components rendered, 2) Why they rendered (props/state/context change), 3) How long they took. Helps identify 'bottleneck' components.",
        code: `// Tip: Use 'Record why each component rendered' in DevTools settings.\n// In code, use <Profiler> for programmatic measurement:\n<Profiler id="App" onRender={onRenderCallback}>\n  <App />\n</Profiler>`
    },
    "Optimizing Context": {
        explanation: "Preventing unnecessary re-renders when using Context API. Strategies: 1) Split context into multiple smaller contexts, 2) Wrap children in React.memo, 3) Use useMemo for the value object passed to the Provider.",
        code: `const value = useMemo(() => ({ user, setUser }), [user]);\nreturn <UserCtx.Provider value={value}>{children}</UserCtx.Provider>;`
    },
    "Debouncing & Throttling in React": {
        explanation: "Limiting execution frequency of event handlers. Debounce: wait for silence (search input). Throttle: execute at fixed intervals (scroll). Use useMemo or useCallback with lodash/underscore to keep function reference stable.",
        code: `const debouncedSearch = useMemo(\n  () => debounce((q) => fetch(q), 300),\n  []\n);\n<input onChange={(e) => debouncedSearch(e.target.value)} />`
    },
    "Container/Presentational Pattern": {
        explanation: "Separating logic from UI. Container: manages data fetching and state. Presentational: receives data via props and renders UI. While hooks have made this less necessary, it's still useful for testing and decoupling logic from view.",
        code: `// Container\nfunction UserContainer() {\n  const user = useUser();\n  return <UserView user={user} />;\n}\n\n// Presentational\nfunction UserView({ user }) {\n  return <div>{user.name}</div>;\n}`
    },
    "React Router": {
        explanation: "The standard for routing in React. v6.4+ introduced Data APIs: Loaders (fetch data before render), Actions (handle mutations), and Hooks (useLoaderData, useNavigation). Enables better UX by fetching data earlier.",
        code: `// Loader example\nexport async function loader({ params }) {\n  return fetchUser(params.id);\n}\n\nfunction User() {\n  const user = useLoaderData();\n  return <h1>{user.name}</h1>;\n}`
    },
    "Testing": {
        explanation: "Jest (runner) + React Testing Library (RTL). RTL encourages testing from the user perspective (queries by role/text). MSW (Mock Service Worker) is used to intercept and mock network requests at the network level.",
        code: `test('renders welcome message', () => {\n  render(<Welcome />);\n  const linkElement = screen.getByText(/welcome/i);\n  expect(linkElement).toBeInTheDocument();\n});`
    },
    "Suspense for Data Fetching": {
        explanation: "A way to wait for data fetching without manual 'isLoading' states. The component 'suspends' until the promise resolves, and the nearest <Suspense> boundary shows a fallback. Works with frameworks like Next.js and libraries like Relay.",
        code: `<Suspense fallback={<Skeleton />}>\n  <UserProfile id={123} />\n</Suspense>`
    },
    "Streaming SSR": {
        explanation: "Sending HTML chunks to the browser as they are generated on the server. Non-critical parts wrapped in <Suspense> are streamed later. Improves TTFB (Time to First Byte) and perceived performance.",
        code: `// Layout remains static, while heavy data chunks stream in\n<Layout>\n  <Suspense fallback={<Loader />}>\n    <HeavyDataComponent />\n  </Suspense>\n</Layout>`
    },
    "TypeScript with React": {
        explanation: "Adding static types to React. Common types: React.FC (not recommended anymore), React.ReactNode (children), React.CSSProperties, and React.ChangeEvent<HTMLInputElement> for form events.",
        code: `interface Props {\n  title: string;\n  onSave: (id: number) => void;\n}\n\nfunction Button({ title, onSave }: Props) {\n  return <button onClick={() => onSave(1)}>{title}</button>;\n}`
    },
    "Actions": {
        explanation: "React 19 feature to handle data mutations and state transitions. Actions work with 'useTransition' to provide automatic pending states and error handling during async operations. Simplifies form submissions and button clicks.",
        code: `function UpdateName() {\n  const [isPending, startTransition] = useTransition();\n  const update = (formData) => {\n    startTransition(async () => {\n      await updateName(formData.get('name'));\n    });\n  };\n  return <form action={update}>...</form>;\n}`
    },
    "The `use` Hook": {
        explanation: "A new React 19 hook that can be called inside loops and conditionals. It accepts a Promise or a Context and 'unwraps' it. If the promise isn't resolved, it suspends the component.",
        code: `function Message({ messagePromise }) {\n  const message = use(messagePromise);\n  const theme = use(ThemeContext);\n  return <div style={{ color: theme.color }}>{message}</div>;\n}`
    },
    "useOptimistic": {
        explanation: "React 19 hook for optimistic UI updates. It lets you show a different state while an async action (like a server request) is in progress, and automatically reverts if the action fails.",
        code: `const [optimisticMessages, addOptimisticMessage] = useOptimistic(\n  messages,\n  (state, newMessage) => [...state, { text: newMessage, sending: true }]\n);`
    },
    "useFormStatus & useFormState": {
        explanation: "React 19 hooks for forms. useFormStatus gives access to pending status, data, and method of the parent <form>. useFormState helps manage form state based on the result of a form action.",
        code: `function SubmitButton() {\n  const { pending } = useFormStatus();\n  return <button disabled={pending}>Submit</button>;\n}`
    },
    "Ref as a Prop": {
        explanation: "In React 19, 'ref' is passed as a regular prop to functional components. The need for 'forwardRef' is eliminated, simplifying component definition and ref forwarding logic.",
        code: `// No forwardRef needed!\nfunction MyInput({ ref, label }) {\n  return <label>{label}<input ref={ref} /></label>;\n}`
    },
    'Server Actions': {
        explanation: "Client-side components calling server-side functions directly. Functions marked with 'use server' can be invoked like regular async functions. Handles serialization and HTTP transport automatically.",
        code: `// server-action.js\n'use server';\nexport async function updateItem(id, data) { ... }\n\n// client-component.js\n<button onClick={() => updateItem(id, data)}>Update</button>`
    },
    'useNavigate': {
        explanation: "A hook from React Router that returns a function for programmatic navigation. Replaces useHistory from v5. Supports relative paths, state passing, and replacing entries in the history stack.",
        code: `const navigate = useNavigate();\nconst handleClick = () => navigate('/profile', { state: { fromHome: true } });`
    },
    'useLocation': {
        explanation: "A hook from React Router that returns the current location object. Contains the pathname, search (query string), hash, and state. Useful for tracking page views or reading state passed from navigate().",
        code: `const location = useLocation();\nuseEffect(() => {\n  console.log('Path changed to:', location.pathname);\n}, [location]);`
    },
    'useParams': {
        explanation: "A hook from React Router that returns an object of key/value pairs of dynamic params from the current URL that were matched by the <Route path>. Path segments starting with : are captured.",
        code: `// Route: /user/:id\nconst { id } = useParams();\nconsole.log('User ID:', id);`
    },
    'Jest': {
        explanation: "A JavaScript testing framework designed to ensure correctness of any JavaScript codebase. Features: zero configuration, snapshots, isolated tests, and great assertion library. The default runner for React apps.",
        code: `test('adds 1 + 2 to equal 3', () => {\n  expect(sum(1, 2)).toBe(3);\n});`
    },
    'React Testing Library': {
        explanation: "A library for testing React components by querying the DOM in a way that resembles how users find elements. Encourages accessible testing practices and avoids testing implementation details.",
        code: `import { render, screen } from '@testing-library/react';\nrender(<MyComponent />);\nconst element = screen.getByRole('button', { name: /submit/i });`
    },
    'Next.js': {
        explanation: "A React framework for building full-stack web applications. Provides server-side rendering (SSR), static site generation (SSG), file-based routing, and built-in optimization for images and fonts.",
        code: `// File-based routing: app/page.tsx\nexport default function Home() {\n  return <h1>Welcome to Next.js</h1>;\n}`
    },
    'Vite': {
        explanation: "A modern, ultra-fast build tool that uses native ES modules in dev and Rollup for production. Provides near-instant Hot Module Replacement (HMR) and pre-bundles dependencies with esbuild.",
        code: `// vite.config.js\nimport { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()],\n});`
    },
    'Tailwind CSS': {
        explanation: "A utility-first CSS framework for rapidly building custom user interfaces. Instead of writing custom CSS, you apply pre-defined classes directly in your JSX. Highly customizable and optimized for production bundle size.",
        code: `<div class="p-4 bg-blue-500 hover:bg-blue-600 transition-colors">\n  <h1 class="text-white text-2xl font-bold">Hello Tailwind</h1>\n</div>`
    },
    'Atomic Design': {
        explanation: "A methodology for creating design systems. Components are categorized into: Atoms (basic tags), Molecules (groups of atoms), Organisms (complex sections), Templates (page-level layout), and Pages (actual instances).",
        code: `// Atoms: Button, Input\n// Molecules: SearchBar (Input + Button)\n// Organisms: Header (Logo + Nav + SearchBar)`
    },
    'Feature-based Folder Structure': {
        explanation: "Organizing code by feature (e.g., 'auth', 'cart', 'profile') rather than by type (e.g., 'components', 'hooks'). Each feature folder contains its own components, hooks, types, and api calls. Makes scaling large apps easier.",
        code: `src/\n  features/\n    auth/\n      components/\n      hooks/\n      api.ts\n      types.ts\n    cart/`
    },
    'Micro-Frontends with React': {
        explanation: "An architectural style where independently deliverable frontend applications are composed into a greater whole. Uses Webpack Module Federation to share components and dependencies between apps at runtime.",
        code: `// Container App (Host)\nimport('app2/Widget').then(Widget => <Widget />);`
    },
    'Monorepos for React': {
        explanation: "Managing multiple packages or apps in a single repository. Tools like Turborepo, Nx, or Lerna handle shared dependencies, build caching, and cross-package linking. Ideal for large-scale enterprise projects.",
        code: `apps/\n  web-app/\n  admin-panel/\npackages/\n  ui-library/\n  utils/`
    }
});
