// Part 4: React JS Concepts
Object.assign(conceptsData, {
    "Virtual DOM & Reconciliation": {
        explanation: "React maintains a lightweight copy of the real DOM (Virtual DOM). On state changes, a new VDOM tree is created, diffed against the previous one (O(n) heuristic algorithm), and only the changed nodes are updated in the real DOM (reconciliation).",
        code: `// React handles this internally:\n// 1. State changes → new VDOM tree\n// 2. Diff old vs new VDOM\n// 3. Compute minimal set of DOM mutations\n// 4. Batch-apply changes to real DOM`
    },
    "JSX": {
        explanation: "A syntax extension that looks like HTML in JS. Babel compiles JSX to React.createElement() calls (or jsx() in React 17+). Expressions go inside {}. Must return a single root element.",
        code: `// JSX\nconst el = <h1 className="title">Hello {name}</h1>;\n\n// Compiles to:\nconst el = React.createElement('h1', { className: 'title' }, 'Hello ', name);`
    },
    "Components": {
        explanation: "Reusable, isolated pieces of UI. Functional components are plain functions returning JSX. Class components extend React.Component. Modern React uses functional components + hooks exclusively.",
        code: `// Functional (modern)\nfunction Card({ title, children }) {\n  return <div className="card"><h2>{title}</h2>{children}</div>;\n}\n\n// Class (legacy)\nclass Card extends React.Component {\n  render() { return <div>{this.props.title}</div>; }\n}`
    },
    "Props vs State": {
        explanation: "Props: data passed from parent to child (read-only, unidirectional). State: data managed within a component (mutable via setState/useState). Props flow down, events flow up. Never mutate props.",
        code: `function Parent() {\n  const [count, setCount] = useState(0);\n  return <Child count={count} onIncrement={() => setCount(c => c + 1)} />;\n}\nfunction Child({ count, onIncrement }) {\n  return <button onClick={onIncrement}>{count}</button>;\n}`
    },
    "Fragments": {
        explanation: "Let you group multiple elements without adding an extra DOM node. Use <React.Fragment> or shorthand <>...</>. Essential when returning multiple elements from a component.",
        code: `function List() {\n  return (\n    <>\n      <li>Item 1</li>\n      <li>Item 2</li>\n    </>\n  );\n}`
    },
    "Portals": {
        explanation: "Render children into a DOM node outside the parent component's hierarchy. Events still bubble through the React tree (not the DOM tree). Used for modals, tooltips, and overlays.",
        code: `import { createPortal } from 'react-dom';\n\nfunction Modal({ children }) {\n  return createPortal(\n    <div className="modal">{children}</div>,\n    document.getElementById('modal-root')\n  );\n}`
    },
    "Error Boundaries": {
        explanation: "Class components that catch JS errors in their child tree during rendering, lifecycle methods, and constructors. They display a fallback UI instead of crashing. Cannot catch errors in event handlers or async code.",
        code: `class ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() { return { hasError: true }; }\n  componentDidCatch(error, info) { logError(error, info); }\n  render() {\n    if (this.state.hasError) return <h2>Something went wrong.</h2>;\n    return this.props.children;\n  }\n}`
    },
    "useState": {
        explanation: "Hook for adding local state to functional components. Returns [value, setter]. The setter can take a new value or a function (for state based on previous state). State updates are batched and async.",
        code: `const [count, setCount] = useState(0);\n\n// Direct update\nsetCount(5);\n\n// Functional update (safe for multiple calls)\nsetCount(prev => prev + 1);`
    },
    "useEffect": {
        explanation: "Hook for side effects: data fetching, subscriptions, DOM manipulation. Runs after render. Dependency array controls when it runs: [] = mount only, [deps] = when deps change, none = every render. Return a cleanup function.",
        code: `useEffect(() => {\n  const sub = api.subscribe(data => setData(data));\n  return () => sub.unsubscribe(); // Cleanup\n}, [api]); // Re-run when 'api' changes`
    },
    "useContext": {
        explanation: "Hook to consume a Context value without nesting. The component re-renders when the context value changes. Combine with useReducer for a lightweight state management solution.",
        code: `const ThemeCtx = createContext('light');\n\nfunction App() {\n  return <ThemeCtx.Provider value="dark"><Child /></ThemeCtx.Provider>;\n}\n\nfunction Child() {\n  const theme = useContext(ThemeCtx); // 'dark'\n}`
    },
    "useReducer": {
        explanation: "Alternative to useState for complex state logic. Takes a reducer function and initial state. Returns [state, dispatch]. Ideal when next state depends on previous state or when state has multiple sub-values.",
        code: `function reducer(state, action) {\n  switch (action.type) {\n    case 'increment': return { count: state.count + 1 };\n    case 'decrement': return { count: state.count - 1 };\n    default: throw new Error();\n  }\n}\nconst [state, dispatch] = useReducer(reducer, { count: 0 });`
    },
    "useMemo": {
        explanation: "Memoizes the result of an expensive computation. Recalculates only when dependencies change. Returns the memoized VALUE. Use for expensive calculations, not for preventing renders (use React.memo for that).",
        code: `const sortedList = useMemo(() => {\n  return items.sort((a, b) => a.price - b.price);\n}, [items]); // Only re-sorts when items changes`
    },
    "useCallback": {
        explanation: "Memoizes a function reference. Returns the same function instance unless dependencies change. Prevents child components wrapped in React.memo from re-rendering due to new function references.",
        code: `const handleClick = useCallback(() => {\n  setCount(c => c + 1);\n}, []); // Same reference across renders\n\n<MemoizedChild onClick={handleClick} />`
    },
    "useRef": {
        explanation: "Returns a mutable ref object (.current) that persists across renders without causing re-renders. Two uses: 1) Access DOM elements, 2) Store mutable values (like timers, previous state) that don't need to trigger re-renders.",
        code: `const inputRef = useRef(null);\nconst timerRef = useRef(null);\n\nuseEffect(() => {\n  inputRef.current.focus(); // Access DOM\n  timerRef.current = setInterval(() => {}, 1000);\n  return () => clearInterval(timerRef.current);\n}, []);`
    },
    "useLayoutEffect": {
        explanation: "Same as useEffect but fires synchronously AFTER DOM mutations and BEFORE the browser paints. Use for reading/writing DOM layout (measurements, scroll position). Blocks visual updates—use sparingly.",
        code: `useLayoutEffect(() => {\n  const { height } = ref.current.getBoundingClientRect();\n  setHeight(height); // Runs before paint, no flicker\n}, []);`
    },
    "useImperativeHandle": {
        explanation: "Customizes the ref value exposed to parent components when using forwardRef. Limits what the parent can access. Rarely needed—prefer declarative patterns.",
        code: `const FancyInput = forwardRef((props, ref) => {\n  const inputRef = useRef();\n  useImperativeHandle(ref, () => ({\n    focus: () => inputRef.current.focus(),\n    clear: () => { inputRef.current.value = ''; }\n  }));\n  return <input ref={inputRef} />;\n});`
    },
    "Custom Hooks": {
        explanation: "Functions starting with 'use' that encapsulate reusable stateful logic. They can call other hooks. Extract common patterns (data fetching, form handling, event listeners) into shareable hooks.",
        code: `function useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    const stored = localStorage.getItem(key);\n    return stored ? JSON.parse(stored) : initialValue;\n  });\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n  return [value, setValue];\n}`
    },
    "Lifting State Up": {
        explanation: "When multiple components need shared state, move it to their closest common ancestor. The parent holds the state and passes it down as props. Events flow up via callbacks.",
        code: `function Parent() {\n  const [temp, setTemp] = useState('');\n  return (\n    <>\n      <CelsiusInput temp={temp} onChange={setTemp} />\n      <FahrenheitInput temp={temp} onChange={setTemp} />\n    </>\n  );\n}`
    },
    "Context API": {
        explanation: "React's built-in solution for prop drilling. Create a context, wrap the tree with a Provider, consume with useContext. Caution: ALL consumers re-render when the context value changes—split contexts for optimization.",
        code: `const AuthCtx = createContext(null);\n\nfunction App() {\n  const [user, setUser] = useState(null);\n  return (\n    <AuthCtx.Provider value={{ user, setUser }}>\n      <Dashboard />\n    </AuthCtx.Provider>\n  );\n}`
    },
    "Component Lifecycle": {
        explanation: "Mount: component added to DOM (useEffect with []). Update: state/props change (useEffect with [deps]). Unmount: component removed (useEffect cleanup). In class components: componentDidMount, componentDidUpdate, componentWillUnmount.",
        code: `useEffect(() => {\n  console.log('Mounted');\n  return () => console.log('Unmounted');\n}, []);\n\nuseEffect(() => {\n  console.log('Updated: count is', count);\n}, [count]);`
    },
    "Dependency Arrays": {
        explanation: "The second argument to useEffect/useMemo/useCallback. Controls when the hook re-runs. Empty []: run once. [a, b]: run when a or b changes. Omitted: run every render. Uses Object.is for comparison.",
        code: `useEffect(() => { fetchUser(id); }, [id]);\n// Only re-fetches when 'id' changes\n\n// Common bug: missing dependency\nconst [count, setCount] = useState(0);\nuseEffect(() => {\n  setInterval(() => console.log(count), 1000); // Stale closure!\n}, []); // count is missing from deps`
    },
    "Cleanup Functions": {
        explanation: "The function returned from useEffect. Runs before the effect re-runs and on unmount. Essential for: clearing timers, unsubscribing, aborting fetch requests, removing event listeners.",
        code: `useEffect(() => {\n  const controller = new AbortController();\n  fetch(url, { signal: controller.signal })\n    .then(r => r.json())\n    .then(setData);\n  return () => controller.abort(); // Cleanup\n}, [url]);`
    },
    "Batching": {
        explanation: "React groups multiple state updates into a single re-render for performance. In React 18+, automatic batching applies everywhere (event handlers, promises, timeouts). Before v18, only event handlers were batched.",
        code: `function handleClick() {\n  setCount(c => c + 1);\n  setFlag(f => !f);\n  // React 18: ONE re-render (batched)\n}\n\n// Force synchronous update if needed:\nimport { flushSync } from 'react-dom';\nflushSync(() => setCount(c => c + 1));`
    },
    "React.memo": {
        explanation: "HOC that skips re-rendering a component if its props haven't changed (shallow comparison). Pass a custom comparison function as the second argument for deep comparison. Works only for props, not internal state/context.",
        code: `const ExpensiveList = React.memo(function List({ items }) {\n  return items.map(i => <div key={i.id}>{i.name}</div>);\n});\n\n// Custom comparison\nconst Comp = React.memo(MyComp, (prevProps, nextProps) => {\n  return prevProps.id === nextProps.id;\n});`
    },
    "Windowing / Virtualization": {
        explanation: "Only render the visible items in a large list, not all 10,000+ rows. Libraries: react-window, react-virtuoso, TanStack Virtual. Dramatically reduces DOM nodes and improves scrolling performance.",
        code: `import { FixedSizeList } from 'react-window';\n\n<FixedSizeList height={400} width={300} itemCount={10000} itemSize={35}>\n  {({ index, style }) => <div style={style}>Row {index}</div>}\n</FixedSizeList>`
    },
    "Lazy Loading & Suspense": {
        explanation: "React.lazy() dynamically imports a component. Suspense shows a fallback UI while the lazy component loads. Enables route-based and component-based code splitting.",
        code: `const Dashboard = React.lazy(() => import('./Dashboard'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<Spinner />}>\n      <Dashboard />\n    </Suspense>\n  );\n}`
    },
    "Higher-Order Components (HOC)": {
        explanation: "A function that takes a component and returns a new enhanced component. Used for cross-cutting concerns: auth, logging, theming. Largely replaced by hooks but still common in codebases.",
        code: `function withAuth(WrappedComponent) {\n  return function AuthComponent(props) {\n    const user = useAuth();\n    if (!user) return <Navigate to="/login" />;\n    return <WrappedComponent {...props} user={user} />;\n  };\n}\nconst ProtectedPage = withAuth(Dashboard);`
    },
    "Render Props": {
        explanation: "A pattern where a component receives a function as a prop (usually 'render' or 'children') that returns JSX. The component calls this function with its internal state. Replaced by hooks in most cases.",
        code: `function MouseTracker({ render }) {\n  const [pos, setPos] = useState({ x: 0, y: 0 });\n  return (\n    <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>\n      {render(pos)}\n    </div>\n  );\n}\n<MouseTracker render={({ x, y }) => <p>{x}, {y}</p>} />`
    },
    "Compound Components": {
        explanation: "Components that work together sharing implicit state. The parent manages state, children consume it via context. Provides a flexible, declarative API (like HTML select/option).",
        code: `function Tabs({ children }) {\n  const [active, setActive] = useState(0);\n  return <TabsContext.Provider value={{ active, setActive }}>\n    {children}\n  </TabsContext.Provider>;\n}\nTabs.Tab = function Tab({ index, children }) {\n  const { active, setActive } = useContext(TabsContext);\n  return <button onClick={() => setActive(index)}>{children}</button>;\n};`
    },
    "Controlled vs Uncontrolled": {
        explanation: "Controlled: React state drives the input value (via value + onChange). Uncontrolled: DOM manages the input state (via ref). Controlled gives full control; uncontrolled is simpler for basic forms.",
        code: `// Controlled\nconst [val, setVal] = useState('');\n<input value={val} onChange={e => setVal(e.target.value)} />\n\n// Uncontrolled\nconst ref = useRef();\n<input ref={ref} defaultValue="hello" />\n// Read: ref.current.value`
    },
    "Concurrent Rendering": {
        explanation: "React 18's ability to prepare multiple versions of the UI simultaneously. Rendering is interruptible—React can pause, prioritize urgent updates (typing), and resume less urgent ones (search results).",
        code: `// React 18 enables this automatically with createRoot\nimport { createRoot } from 'react-dom/client';\nconst root = createRoot(document.getElementById('root'));\nroot.render(<App />);`
    },
    "Transitions": {
        explanation: "useTransition marks state updates as non-urgent. The UI stays responsive during heavy re-renders. useDeferredValue defers updating a value until urgent work is done.",
        code: `const [isPending, startTransition] = useTransition();\n\nfunction handleSearch(query) {\n  startTransition(() => {\n    setSearchResults(filterHugeList(query)); // Non-urgent\n  });\n}\n// isPending is true while transitioning`
    },
    "Server Components (RSC)": {
        explanation: "Components that render on the server and send HTML (no JS bundle) to the client. Cannot use state/effects. Reduce client-side JS. Used in Next.js 13+ App Router. 'use client' directive marks client components.",
        code: `// Server Component (default in Next.js App Router)\nasync function UserList() {\n  const users = await db.query('SELECT * FROM users');\n  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}\n// No useState, no useEffect — runs on server only`
    },
});
