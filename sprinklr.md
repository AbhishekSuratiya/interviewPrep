# 🏢 Sprinklr Frontend Interview Guide

## 📝 Setting Expectations with the Candidates

Thank you for your interest in joining our frontend team at Sprinklr! We want you to have clarity on what to expect from the interview process, so you can best prepare for success.

## 🚀 The Interview Process – At a Glance

Our interviews are hands-on and coding-focused. We’re looking for frontend engineers who are comfortable building and solving problems in real-world scenarios.

The rounds will assess your **JavaScript**, **TypeScript**, **React**, **GraphQL**, and **web fundamentals** knowledge, along with problem-solving skills, coding fluency, and your approach to system design.

You can expect live coding rounds where you will be asked to write and explain code in real time. We’ll also discuss your past projects, design approaches, and collaboration experience to understand your practical engineering skills.

🧑🏻‍💻 Have a look at a sample question to understand the kind of questions you can expect in the coding rounds: **charming-wing**

## 💡 What We’re Looking For

- Strong fundamentals in **JavaScript**, **React**, and modern frontend frameworks.
- Ability to code and think critically in real-time problem-solving scenarios.
- Experience with architecture and design patterns for scalable frontend systems.
- Good understanding of **GraphQL**, performance optimization, and frontend tooling is a bonus!

## 🛠 Things to Keep in Mind

- There are no algorithm/data structure-heavy questions like LeetCode puzzles. We focus on practical coding and real-world problem-solving.
- Be ready to write code during the interview – this could be solving a bug, implementing a feature, or improving an existing system.
- Think of this as a collaborative discussion – we’re looking for clarity of thought, coding skills, and how you approach problems, not just correctness.
- Please test your coding environment, internet connection, and any screen-sharing setup beforehand to ensure a smooth interview.
- Please log in and have active accounts on platforms like **CodeSandbox** and **StackBlitz** beforehand. This will help avoid delays and save time during the interview.

---

## 🎯 Topics You Should Learn & Master

Based on the expectations above, here is an exhaustive list of topics you should focus on to ace the interview:

<br>

### 1. **Core JavaScript & Web Fundamentals**

- **Execution Context, Call Stack, & Memory Heap**
- **Event Loop, Task Queue, & Microtasks**
- **Promises, Async/Await, & Error Handling**
- **Closures, Lexical Environment, & Scope Chain**
- **Hoisting & Temporal Dead Zone (TDZ)**
- **`this` Context & Explicit Binding (`call`, `apply`, `bind`)**
- **Prototypal Inheritance & Object-Oriented JS (Classes vs. Prototypes)**
- **Garbage Collection & Memory Leak Prevention**
- **Iterators, Generators, & Symbols**
- **Strict Mode (`"use strict"`)**
- **DOM Manipulation, Traversal, Layout Thrashing, & Reflow/Repaint**
- **Event Delegation, Bubbling, Capturing, & Custom Events**
- **ES6+ Features (Destructuring, Spread/Rest, Modules, Sets, WeakSets, Maps, WeakMaps)**
- **Web Storage (LocalStorage, SessionStorage, Cookies, IndexedDB)**
- **Network Requests (Fetch API, XMLHttpRequest, CORS, Same-Origin Policy)**
- **Web Workers & Service Workers (Caching Strategies)**
- **Web APIs (Intersection Observer, Resize Observer, Mutation Observer)**
- **Web Components & Shadow DOM**

<br>

### 2. **TypeScript Mastery**

- **Interfaces vs. Types (When to use which)**
- **Generics & Advanced Utility Types (`Partial`, `Pick`, `Omit`, `Record`, `ReturnType`, `Awaited`)**
- **Type Narrowing, Type Guards, & Type Predicates (`is` operator)**
- **Type Assertions & `unknown` vs. `any` vs. `never`**
- **Enums (Numeric, String) vs. Const Enums vs. Union Types**
- **Mapped Types & Conditional Types (`infer` keyword)**
- **Tuples, Arrays, & Index Signatures**
- **Function Overloading & Decorators**
- **Strict Mode Configuration (`tsconfig.json` best practices)**
- **Declaration Files (`.d.ts`) & Module Resolution**
- **Readonly & Immutable Data Patterns**

<br>

### 3. **React & React Ecosystem**

- **Virtual DOM, Reconciliation Algorithm, & React Fiber Architecture**
- **Component Lifecycle (Class vs. Functional & Migration)**
- **Hooks Deep Dive (`useState`, `useEffect`, `useRef`, `useReducer`, `useLayoutEffect`, `useTransition`, `useId`)**
- **Performance Optimization Hooks (`useMemo`, `useCallback`)**
- **Custom Hooks Formulation & Best Practices**
- **State Management (Context API, Redux Toolkit, Zustand, Jotai, Recoil)**
- **Controlled vs. Uncontrolled Components**
- **Concurrent Features (React 18/19, Suspense, Transitions)**
- **Server Components (RSC) vs. Client Components**
- **Routing (React Router, Next.js App Router, Loader/Action patterns)**
- **Error Boundaries & Fallback UIs**
- **Portals (`createPortal`) & Refs Forwarding (`forwardRef`, `useImperativeHandle`)**
- **Code Splitting (`React.lazy`) & Streaming**

<br>

### 4. **Frontend Architecture & System Design**

- **Component Patterns (HOCs, Render Props, Compound Components)**
- **Design Patterns (Singleton, Factory, Observer, Module, Facade)**
- **Scalable Directory Structures (Feature-Sliced Design, Atomic Design)**
- **Micro-Frontends & Module Federation**
- **Monorepos (Turborepo, Nx, Lerna)**
- **State Architecture (Local vs. Global vs. Server State vs. URL State)**
- **Performance Optimization (Lazy Loading, Tree Shaking, Virtualization, Debounce/Throttle)**
- **Rendering Strategies (CSR, SSR, SSG, ISR, Partial Prerendering)**
- **Web Vitals Optimization (LCP, CLS, FID, INP, TTFB)**
- **Real-time Communication (WebSockets, Server-Sent Events, Long Polling)**
- **Accessibility (a11y) Best Practices (ARIA, Keyboard Navigation, Focus Management)**
- **Security Basics (XSS, CSRF, Content Security Policy, JWT vs. Cookies)**
- **Caching Strategies (HTTP Cache-Control, ETag, CDN basics)**
- **Progressive Web Apps (PWA) & Offline-First Architecture**
- **Error Tracking & Monitoring (Sentry, Datadog)**

<br>

### 5. **GraphQL & Data Fetching**

- **Schema Design, Resolvers, & Types**
- **Queries, Mutations, & Subscriptions**
- **GraphQL Directives & Fragments**
- **The N+1 Query Problem & DataLoader**
- **Caching Strategies (Apollo Client, Relay, URQL)**
- **Normalized Cache, Cache Invalidation, & Type Policies**
- **Optimistic UI Updates & Rollbacks**
- **Pagination Strategies (Cursor-based vs. Offset-based)**
- **Error Handling (Network vs. Graph Errors, Partial Responses)**
- **Schema Stitching vs. Apollo Federation**
- **GraphQL vs. REST vs. tRPC (Trade-offs)**

<br>

### 6. **Frontend Tooling & Testing**

- **Bundlers & Build Tools (Webpack, Vite, Rollup, esbuild)**
- **Babel, Transpilation, & Polyfills**
- **CSS Preprocessors & Tooling (Sass, PostCSS, TailwindCSS, CSS-in-JS)**
- **Linters & Formatters (ESLint, Prettier, Stylelint)**
- **Git Hooks & Automations (Husky, lint-staged)**
- **Unit Testing (Jest, Vitest) & Snapshot Testing**
- **Component Testing (React Testing Library, Enzyme)**
- **End-to-End Testing (Cypress, Playwright)**
- **Test-Driven Development (TDD) & Code Coverage**
- **Mocking APIs (Mock Service Worker (MSW), Jest Mocks)**
- **CI/CD Pipelines for Frontend Applications (GitHub Actions, GitLab CI)**

<br>

---

We’re excited to get to know you better – all the best! 🌟