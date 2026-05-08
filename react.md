# React JS Advanced Concepts for Interview Preparation

This document outlines the essential and advanced React concepts required for high-level frontend roles, specifically focusing on modern functional components and the React ecosystem.

## ⚛️ Core Fundamentals
- [ ] **Virtual DOM & Reconciliation**: How React updates the UI efficiently using the Diffing Algorithm.
- [ ] **JSX**: Syntax extension and how it compiles to `React.createElement`.
- [ ] **Components**: Functional vs Class components (understanding the shift).
- [ ] **Props vs State**: Unidirectional data flow and internal component memory.
- [ ] **Fragments**: Grouping elements without adding extra nodes to the DOM.
- [ ] **Portals**: Rendering children into a DOM node that exists outside the hierarchy.
- [ ] **Error Boundaries**: Catching JavaScript errors anywhere in their child component tree.
- [ ] **Strict Mode**: Tool for highlighting potential problems in an application.

## 🎣 Hooks (The Heart of Modern React)
- [ ] **useState**: Managing local state in functional components.
- [ ] **useEffect**: Handling side effects (subscriptions, data fetching, DOM manual changes).
- [ ] **useContext**: Consuming context without nesting.
- [ ] **useReducer**: Alternative to `useState` for complex state logic.
- [ ] **useMemo**: Memoizing expensive calculations.
- [ ] **useCallback**: Memoizing callback functions to prevent unnecessary re-renders.
- [ ] **useRef**: Accessing DOM elements and persisting values across renders without re-rendering.
- [ ] **useLayoutEffect**: Similar to `useEffect` but fires synchronously after all DOM mutations.
- [ ] **useImperativeHandle**: Customizing the instance value that is exposed to parent components when using `ref`.
- [ ] **Custom Hooks**: Extracting component logic into reusable functions.

## 🗃️ State Management
- [ ] **Lifting State Up**: Sharing state between components by moving it to their closest common ancestor.
- [ ] **Context API**: Managing global state without "prop drilling".
- [ ] **External Libraries**: Understanding the use cases for Redux (Toolkit), Zustand, Recoil, or MobX.
- [ ] **Server State**: Managing async data with TanStack Query (React Query) or SWR.
- [ ] **Form State**: Controlled vs Uncontrolled components and libraries like React Hook Form.

## 🔄 Lifecycle & Synchronization
- [ ] **Component Lifecycle**: Mount, Update, and Unmount phases in the context of Hooks.
- [ ] **Dependency Arrays**: Understanding how `useEffect`, `useMemo`, and `useCallback` track changes.
- [ ] **Cleanup Functions**: Preventing memory leaks in `useEffect`.
- [ ] **Batching**: How React groups multiple state updates into a single re-render (Automatic Batching in v18).

## 🚀 Performance Optimization
- [ ] **React.memo**: Higher-order component for preventing functional component re-renders.
- [ ] **Windowing / Virtualization**: Rendering only visible items in large lists (React Window/Virtual).
- [ ] **Lazy Loading & Suspense**: Code-splitting with `React.lazy` and handling loading states.
- [ ] **Profiling**: Using React DevTools to identify performance bottlenecks.
- [ ] **Optimizing Context**: Preventing unnecessary re-renders when using Context API.
- [ ] **Debouncing & Throttling in React**: Implementing rate-limiting for inputs and events.

## 📐 Design Patterns
- [ ] **Higher-Order Components (HOC)**: Reusing component logic (older but still relevant).
- [ ] **Render Props**: Sharing code between components using a prop whose value is a function.
- [ ] **Compound Components**: Components that work together to form a UI (e.g., Select and Option).
- [ ] **Container/Presentational Pattern**: Separating logic from UI (Standard vs Modern approaches).
- [ ] **Controlled vs Uncontrolled**: Managing form inputs.

## 🛣️ Navigation & Routing
- [ ] **React Router**: Dynamic routing, Nested routes, and Protected routes.
- [ ] **Loaders & Actions**: Data fetching and mutations in React Router 6.4+.
- [ ] **Navigation Hooks**: `useNavigate`, `useLocation`, `useParams`.

## 🧪 Testing
- [ ] **Jest**: Test runner and assertion library.
- [ ] **React Testing Library (RTL)**: Testing components from the user's perspective.
- [ ] **Mocking**: Using MSW (Mock Service Worker) for API mocking.
- [ ] **Unit vs Integration vs E2E**: Understanding the testing pyramid in frontend.

## 🌟 Modern React (v18+)
- [ ] **Concurrent Rendering**: How React can interrupt and resume rendering.
- [ ] **Transitions**: `useTransition` and `useDeferredValue` for non-urgent updates.
- [ ] **Suspense for Data Fetching**: Declarative loading states for async operations.
- [ ] **Server Components (RSC)**: Understanding the shift towards server-side rendering in frameworks like Next.js.
- [ ] **Streaming SSR**: Delivering HTML in chunks for faster perceived performance.

## 🛠️ Ecosystem & Tooling
- [ ] **Next.js / Remix**: Meta-frameworks for production-ready React apps.
- [ ] **Vite**: Modern build tool for fast development.
- [ ] **Tailwind CSS / Styled Components**: Styling solutions in the React ecosystem.
- [ ] **TypeScript with React**: Typing props, state, hooks, and events.
