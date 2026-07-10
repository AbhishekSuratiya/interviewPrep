export const reactQuestions = {
  // React Fundamentals
  'What React is — declarative UI and component model': [
    'What does "declarative" mean in the context of React, and how does it differ from imperative DOM manipulation?',
    'What is the component model and why does it improve code organization and reuse?',
  ],
  'JSX syntax and how it compiles (React.createElement / jsx runtime)': [
    'What does JSX compile to, and what are the differences between the classic and automatic JSX transforms?',
    'Why can\'t you use two JSX elements without wrapping them in something?',
    'Can you use React without JSX? What would that look like?',
  ],
  'Elements vs components': [
    'What is the difference between a React element and a React component?',
    'What does React.createElement actually return?',
  ],
  'Rendering to the DOM (createRoot)': [
    'What is the difference between ReactDOM.render (React 17) and createRoot (React 18)?',
    'What does createRoot enable that the old rendering model didn\'t support?',
  ],
  'Function components vs class components': [
    'What are the main reasons function components with hooks replaced class components?',
    'Are there still cases where class components are necessary?',
  ],
  'Component composition and children': [
    'What are the benefits of composing small components over large monolithic ones?',
    'What is the children prop and how does it enable flexible component APIs?',
  ],
  'Conditional rendering patterns': [
    'What are the different patterns for conditional rendering in JSX?',
    'Why can `0 && <Component />` accidentally render a zero, and how do you fix it?',
  ],
  'Rendering lists and the key prop': [
    'What is the purpose of the key prop when rendering lists?',
    'Why is using array index as a key problematic for reorderable lists?',
    'What makes a good key value?',
  ],
  'Controlled vs uncontrolled components': [
    'What is the difference between a controlled and an uncontrolled input?',
    'When would you reach for an uncontrolled component instead of a controlled one?',
  ],

  // Props
  'Passing and typing props': [
    'How do you pass a function as a prop, and what are the performance implications?',
    'How do you type props in TypeScript to avoid runtime errors?',
  ],
  'children prop': [
    'What is the type of the `children` prop, and how can you constrain it?',
    'How do you render `children` conditionally based on whether they were provided?',
  ],
  'Prop drilling and its downsides': [
    'What is prop drilling and what problems does it cause in large component trees?',
    'What are the common solutions to prop drilling?',
  ],
  'Render props pattern': [
    'What is the render props pattern and when is it useful?',
    'How did custom hooks mostly replace render props?',
  ],
  'Composition vs inheritance': [
    'Why does React favor composition over inheritance?',
    'Give an example of using composition to achieve what you might model with inheritance.',
  ],
  'Spreading props': [
    'When is spreading props (`{...props}`) a good idea, and when can it cause problems?',
    'How can prop spreading lead to passing unknown props to DOM elements?',
  ],

  // State
  'useState basics and functional updates': [
    'When do you need to use the functional form of a state setter (setState(prev => ...))?',
    'Why is reading state immediately after calling setState unreliable?',
  ],
  'State batching': [
    'What is state batching and how did it change in React 18?',
    'How does flushSync opt out of batching, and when would you use it?',
  ],
  'Lifting state up': [
    'What does "lifting state up" mean and when do you need to do it?',
    'What are the trade-offs of lifting state too high in the tree?',
  ],
  'Derived state vs redundant state': [
    'What is derived state, and why is storing it in useState an antipattern?',
    'Give an example of state that should be derived rather than stored.',
  ],
  'Immutability when updating state (objects/arrays)': [
    'Why does React require state updates to be immutable (returning a new reference)?',
    'How would you update a nested property in an object that\'s in state?',
    'How would you remove an item from an array in state without mutating it?',
  ],
  'useReducer for complex state logic': [
    'When should you prefer useReducer over useState?',
    'What are the advantages of moving state logic into a reducer?',
  ],
  'Initializing state lazily': [
    'What is the difference between `useState(computeInitialValue())` and `useState(computeInitialValue)`?',
    'When should you use the lazy initializer form of useState?',
  ],

  // Component Lifecycle & Effects
  'useEffect basics: dependency array behavior': [
    'What is the difference between passing no dependency array, an empty array, and an array with values?',
    'When does the effect run in the component lifecycle relative to the browser paint?',
  ],
  'Cleanup functions in useEffect': [
    'When does the cleanup function returned from useEffect run?',
    'Write a useEffect that subscribes to an event and unsubscribes on cleanup.',
  ],
  'useLayoutEffect vs useEffect': [
    'What is the difference between useLayoutEffect and useEffect in terms of timing?',
    'When would you use useLayoutEffect, and what is the risk on SSR?',
  ],
  'Effect dependency pitfalls (stale closures)': [
    'What is a stale closure in the context of a useEffect, and how does it happen?',
    'How does the exhaustive-deps ESLint rule help prevent stale closure bugs?',
    'How do you correctly include a callback in useEffect deps without adding it to every render?',
  ],
  'Data fetching in effects and race conditions': [
    'What is a race condition in useEffect data fetching and how do you fix it?',
    'How do you cancel an in-flight fetch when the component unmounts or deps change?',
  ],
  'useLayoutEffect vs useEffect': [
    'What is the difference between useLayoutEffect and useEffect in terms of when they fire?',
    'Why should useLayoutEffect be used sparingly, and what is the SSR concern?',
  ],

  // Hooks — Core
  'useState': [
    'Explain how React knows to associate a useState call with a particular component instance.',
    'What happens if you conditionally call useState — why does that break things?',
  ],
  'useEffect': [
    'How does React compare dependency array values between renders?',
    'What are the most common useEffect mistakes?',
  ],
  'useContext': [
    'How does useContext work, and what triggers a re-render when context changes?',
    'What happens to consumers when context value changes even if the object reference changes but values are the same?',
  ],
  'useRef and DOM refs': [
    'What are the two main use cases for useRef?',
    'How does a ref differ from state — why doesn\'t changing a ref trigger a re-render?',
  ],
  'useMemo': [
    'What does useMemo do and when should you actually use it?',
    'What are the performance costs of useMemo itself, and when does it not help?',
  ],
  'useCallback': [
    'When does useCallback actually prevent a child re-render?',
    'Why does useCallback need its own dependencies array?',
  ],
  'useReducer': [
    'What is the signature of useReducer and what does dispatch do?',
    'How do you handle async operations with useReducer (e.g. optimistic updates)?',
  ],
  'Rules of Hooks (top-level, same order)': [
    'Why must hooks be called at the top level and not inside conditions or loops?',
    'What would happen internally if you called hooks in a different order between renders?',
  ],
  'Custom hooks — extracting reusable logic': [
    'What makes a function a "custom hook" in React?',
    'Walk through converting a useEffect-based data-fetching pattern into a reusable custom hook.',
  ],

  // Hooks — Advanced & Modern
  'useId for accessible unique ids': [
    'What problem does useId solve that a random id or counter wouldn\'t?',
    'How does useId work correctly in SSR+hydration without mismatch?',
  ],
  'useTransition and concurrent updates': [
    'What does useTransition do and how does it improve perceived responsiveness?',
    'What is the difference between a "transition" update and an "urgent" update?',
  ],
  'useDeferredValue': [
    'How does useDeferredValue differ from useTransition?',
    'When would you use useDeferredValue for improving a search-as-you-type experience?',
  ],
  'useSyncExternalStore': [
    'What problem does useSyncExternalStore solve for external state libraries?',
    'What do the `subscribe` and `getSnapshot` arguments do?',
  ],
  'useImperativeHandle': [
    'When would you use useImperativeHandle, and what does it do to the exposed ref?',
    'How does useImperativeHandle interact with forwardRef?',
  ],
  'use() hook (promises & context, React 19)': [
    'What does the `use()` hook enable that was not possible before in React?',
    'How does `use(promise)` interact with Suspense?',
  ],

  // Context API
  'createContext and Provider/Consumer': [
    'How do you create a context and provide a value to a subtree?',
    'What is the default value of a context and when is it used?',
  ],
  'Avoiding unnecessary re-renders with context': [
    'What causes all consumers of a context to re-render, even if they don\'t use the changed part?',
    'What strategies exist for preventing context from re-rendering all consumers?',
  ],
  'Splitting context by concern': [
    'Why would you split a single large context into multiple smaller ones?',
    'How does separating state context from dispatch context prevent unnecessary renders?',
  ],
  'Combining context with useReducer (mini state management)': [
    'How do you build a simple global state system using context + useReducer?',
    'What are the limitations of this pattern compared to a library like Redux or Zustand?',
  ],
  'Context vs prop drilling vs external state libraries': [
    'When is Context the right tool for state, and when should you reach for an external library?',
    'What are the performance characteristics of Context that make it unsuitable for high-frequency updates?',
  ],

  // Refs & the DOM
  'useRef for mutable values vs DOM refs': [
    'What is the difference between using useRef to hold a DOM node vs using it to hold a mutable value?',
    'Why does mutating a ref not cause a re-render?',
  ],
  'forwardRef': [
    'Why can\'t a parent component pass a ref to a function component without forwardRef?',
    'What does forwardRef do under the hood?',
  ],
  'Callback refs': [
    'What is a callback ref and when would you use it instead of useRef?',
    'How can a callback ref fire multiple times, and how do you handle that?',
  ],
  'Measuring DOM elements (getBoundingClientRect)': [
    'How would you measure a DOM element\'s dimensions after it renders?',
    'Why do you need to do this measurement in a layout effect rather than a regular effect?',
  ],

  // Rendering Behavior & Performance
  'Reconciliation and the virtual DOM diffing algorithm': [
    'What is reconciliation in React and what heuristics does the diffing algorithm use?',
    'What role do keys play in reconciliation?',
  ],
  'Why components re-render': [
    'What are all the reasons a React component re-renders?',
    'Does a parent re-render always cause child re-renders?',
  ],
  'React.memo': [
    'What does React.memo do and what are its limitations?',
    'When does React.memo fail to prevent a re-render despite being used?',
  ],
  'useMemo / useCallback for referential stability': [
    'Why does a callback defined inside a component cause a child memoized with React.memo to re-render?',
    'When is it NOT worth using useCallback or useMemo?',
  ],
  'React Compiler / automatic memoization (overview)': [
    'What is the React Compiler and how does it differ from manually using useMemo/useCallback?',
    'What assumptions does the compiler make about your code?',
  ],
  'React DevTools Profiler': [
    'How do you use the React DevTools Profiler to find the component causing slow renders?',
    'What does "commit" and "render" mean in the Profiler output?',
  ],
  'Virtualization for long lists (windowing)': [
    'What is list virtualization and why does it improve performance for long lists?',
    'What are the trade-offs between react-window and react-virtual?',
  ],
  'Portals (createPortal) for modals, tooltips, and overlays': [
    'What is a Portal and why would you use one for a modal?',
    'Do events from inside a Portal bubble up through the React component tree or the DOM tree?',
  ],
  'Batching and flushSync': [
    'What is React 18\'s automatic batching and how does it differ from React 17?',
    'When and why would you use flushSync to opt out of batching?',
  ],
  'Keys as a re-mount / reset mechanism': [
    'How can you use the key prop to intentionally reset a component\'s state?',
    'Give a practical example where keying a component solves a difficult state-reset problem.',
  ],

  // Concurrent React & Rendering Model
  'Concurrent rendering overview': [
    'What is concurrent rendering in React 18, and how does it differ from the previous synchronous model?',
    'What does it mean for rendering to be "interruptible"?',
  ],
  'Transitions (startTransition / useTransition)': [
    'How does startTransition improve perceived performance for expensive state updates?',
    'Can you use startTransition around async operations?',
  ],
  'Suspense for data fetching': [
    'How does a component signal to Suspense that it is loading data?',
    'What libraries integrate with Suspense for data fetching?',
  ],
  'Suspense for code-splitting (React.lazy)': [
    'How do you lazily load a component using React.lazy and Suspense?',
    'What happens if the lazy-loaded module throws an error during loading?',
  ],

  // Error Handling
  'Error boundaries (componentDidCatch, getDerivedStateFromError)': [
    'What is an error boundary and why must it be a class component?',
    'What types of errors do error boundaries NOT catch?',
  ],
  'Fallback UI patterns': [
    'How do you design a good fallback UI for an error boundary?',
    'How do you give users a way to retry after an error boundary catches?',
  ],
  'try/catch limitations in render vs effects': [
    'Why can\'t you use try/catch in JSX render to catch rendering errors?',
    'Where CAN you use try/catch effectively in a React component?',
  ],

  // Forms
  'Controlled inputs (value + onChange)': [
    'What makes a controlled input "controlled"?',
    'What happens if you set `value` without providing `onChange`?',
  ],
  'Form validation patterns': [
    'How would you implement real-time validation feedback on a form field?',
    'What is the benefit of using a library like React Hook Form over building form logic from scratch?',
  ],
  'Form libraries overview (React Hook Form, Formik)': [
    'What are the performance differences between React Hook Form and Formik?',
    'Why is React Hook Form\'s uncontrolled input approach more performant for large forms?',
  ],
  'useActionState / form actions (React 19)': [
    'What does useActionState do in React 19?',
    'How do form actions in React 19 enable progressive enhancement?',
  ],

  // Routing
  'Client-side routing concepts': [
    'How does client-side routing work without a full page reload?',
    'How does the History API enable client-side navigation?',
  ],
  'Route matching and nested routes': [
    'How do nested routes in React Router allow shared layout components?',
    'What is an Outlet and how is it used?',
  ],
  'Dynamic route params': [
    'How do you access URL params in a route component?',
    'How do you type route params in TypeScript with React Router?',
  ],
  'Protected/private routes': [
    'How do you implement a protected route that redirects unauthenticated users?',
    'What is the difference between checking auth in a route component vs in a loader?',
  ],
  'Data loaders and route-level data fetching (React Router v6+)': [
    'What does the loader function in React Router v6 data APIs do?',
    'How does route-level data loading differ from fetching inside useEffect?',
  ],

  // Data Fetching & Server State
  'React Query / SWR — core ideas (stale-while-revalidate)': [
    'What does "stale-while-revalidate" mean?',
    'How does React Query manage the loading/error/data lifecycle automatically?',
    'What happens to a query when its component unmounts and then remounts?',
  ],
  'Optimistic updates': [
    'What is an optimistic update and how do you implement one with rollback?',
    'What library built-in support exists for optimistic updates (React Query, SWR)?',
  ],
  'Pagination and infinite scroll patterns': [
    'How do you implement cursor-based pagination with React Query?',
    'What is the useInfiniteQuery hook and what does getNextPageParam do?',
  ],
  'Aborting in-flight requests on unmount': [
    'How do you abort a fetch request when a component unmounts?',
    'How does React Query handle request cancellation for you automatically?',
  ],

  // State Management
  'When to reach for external state management': [
    'How do you decide when to use local state vs context vs an external library?',
    'What signs indicate your app has outgrown built-in React state?',
  ],
  'Redux core concepts (store, actions, reducers)': [
    'Explain the Redux data flow (action → reducer → store → view).',
    'What is the single source of truth principle in Redux?',
  ],
  'Redux Toolkit (slices, createAsyncThunk)': [
    'What problems does Redux Toolkit solve over vanilla Redux?',
    'How does createAsyncThunk handle loading, success, and error states?',
  ],
  'Zustand / Jotai / Recoil — lightweight alternatives (overview)': [
    'How does Zustand differ from Redux in terms of boilerplate and API design?',
    'What is atom-based state (Jotai/Recoil) and when does it shine over a single store?',
  ],
  'Selectors and memoized selectors (reselect)': [
    'What is a selector in Redux, and why do you need memoization?',
    'How does createSelector from reselect memoize computed state?',
  ],

  // Styling in React
  'CSS Modules': [
    'How do CSS Modules solve the global scope problem of regular CSS?',
    'How do you conditionally apply multiple CSS Module classes?',
  ],
  'CSS-in-JS (styled-components, emotion) — concepts': [
    'What are the runtime vs zero-runtime CSS-in-JS trade-offs?',
    'How does styled-components scope styles to a component?',
  ],
  'Theming patterns': [
    'How would you implement a global theming system in React?',
    'How do CSS custom properties compare to JS theme objects for React theming?',
  ],

  // Testing React
  'React Testing Library philosophy (test behavior, not implementation)': [
    'What does "test behavior, not implementation" mean in practice?',
    'What does React Testing Library discourage that Enzyme allowed?',
  ],
  'Querying by role/text/label': [
    'What is the preferred query priority in RTL, and why is getByRole preferred?',
    'How do you query for an element that has no visible text (e.g. an icon button)?',
  ],
  'Firing events and user interactions': [
    'What is the difference between fireEvent and userEvent in RTL?',
    'When should you use userEvent instead of fireEvent?',
  ],
  'Mocking network requests': [
    'How does MSW (Mock Service Worker) differ from mocking fetch directly in tests?',
    'Why is MSW considered a best practice for mocking APIs in React tests?',
  ],
  'Testing hooks in isolation': [
    'How do you test a custom hook outside of a rendered component using renderHook?',
  ],

  // Component Design Patterns
  'Compound components': [
    'What is the compound component pattern and what problem does it solve?',
    'How do you share state between compound components without prop drilling?',
  ],
  'Higher-Order Components (HOC)': [
    'What is a Higher-Order Component and what were its typical use cases?',
    'What are the downsides of HOCs compared to custom hooks?',
  ],
  'Custom hooks as the modern alternative to HOCs': [
    'How does a custom hook solve the same problem as a HOC without the wrapper hell?',
    'What can HOCs do that custom hooks cannot?',
  ],
  'Controlled vs uncontrolled component API design': [
    'When designing a reusable component (e.g. a Select), how do you support both controlled and uncontrolled usage?',
    'What is the "defaultValue" vs "value" pattern?',
  ],
  'Polymorphic components (as prop)': [
    'What is a polymorphic component and how is the `as` prop used?',
    'How do you type a polymorphic component in TypeScript so that it infers correct props for each element type?',
  ],

  // Accessibility
  'Semantic HTML in JSX': [
    'Why is using a <div> with an onClick less accessible than a <button>?',
    'What semantic HTML elements does JSX support that improve accessibility automatically?',
  ],
  'ARIA roles and attributes': [
    'When should you add ARIA roles vs rely on native semantic HTML?',
    'What does "no ARIA is better than bad ARIA" mean?',
  ],
  'Keyboard navigation and focus management': [
    'How do you ensure your custom interactive component is keyboard accessible?',
    'How do you programmatically move focus (e.g. to a modal after it opens)?',
  ],
  'Managing focus with refs (modals, dialogs)': [
    'How do you trap focus inside a modal dialog using React?',
    'How do you return focus to the trigger element when a modal closes?',
  ],

  // Build, Tooling & Ecosystem
  'Strict Mode and its double-invoke behavior in dev': [
    'What does React.StrictMode do and why does it invoke some things twice in development?',
    'What bugs does Strict Mode\'s double-invoke help surface?',
  ],
  'Code splitting with React.lazy + Suspense': [
    'How do you code-split a route component using React.lazy?',
    'What happens if the dynamic import fails (e.g. network error)?',
  ],
  'ESLint rules for React/Hooks': [
    'What does the exhaustive-deps ESLint rule check for?',
    'What does the rules-of-hooks ESLint rule catch?',
  ],

  // Server-Side & Modern React
  'Server Components vs Client Components (concepts)': [
    'What is a React Server Component and what can it NOT do that a client component can?',
    'What are the benefits of React Server Components for bundle size?',
  ],
  'Hydration and hydration mismatches': [
    'What is hydration and how does it connect server-rendered HTML to React?',
    'What causes a hydration mismatch and what does React do when it detects one?',
  ],
  'Streaming SSR': [
    'How does streaming SSR improve Time to First Byte?',
    'How does Suspense interact with streaming SSR to progressively deliver content?',
  ],
  'The "use client" / "use server" directives (concept)': [
    'What does "use client" declare, and where in a file does it go?',
    'What does "use server" enable in a Server Action?',
  ],
};
