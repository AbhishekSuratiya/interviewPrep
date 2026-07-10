export const essentialsQuestions = {
  // Web / React Performance
  'Core Web Vitals: LCP, INP, CLS (and FCP, TTFB)': [
    'What does LCP measure and what are common causes of a poor LCP score?',
    'How is INP different from FID, and why did Google replace FID with INP?',
    'What causes Cumulative Layout Shift and how do you prevent it?',
    'How do TTFB and FCP relate to each other in the critical rendering path?',
  ],
  'Setting and enforcing performance budgets': [
    'What is a performance budget and how do you enforce it in CI?',
    'Which metrics would you put in a budget for a React app, and at what thresholds?',
  ],
  'Critical rendering path and reducing reflow/repaint': [
    'What is the critical rendering path and which steps can you optimize?',
    'What is the difference between a reflow and a repaint — which is more expensive?',
    'How does CSS `will-change` or `transform` prevent reflows during animations?',
  ],
  'Bundle analysis and reducing bundle size': [
    'How would you analyze what is contributing most to a large JS bundle?',
    'What are the most common causes of bloated JavaScript bundles in React apps?',
  ],
  'Code splitting (route-based and component-based)': [
    'What is the difference between route-based and component-based code splitting?',
    'How do you lazily load a heavy component only when it\'s first needed?',
  ],
  'Tree shaking and dead-code elimination': [
    'What is tree shaking and what conditions must be met for it to work?',
    'Why does importing from a barrel file sometimes defeat tree shaking?',
  ],
  'Lazy loading components, routes, and images': [
    'How do you lazy-load an image below the fold without a third-party library?',
    'How does Intersection Observer help with lazy loading?',
  ],
  'React.memo / useMemo / useCallback — and when NOT to use them': [
    'When does React.memo actually prevent a re-render, and when does it fail?',
    'What is the cost of useMemo/useCallback themselves, and when do they cost more than they save?',
    'Give an example of over-memoization that makes code worse without helping performance.',
  ],
  'Fixing unnecessary re-renders (state colocation, context splitting)': [
    'How does colocating state prevent unnecessary re-renders of parent components?',
    'How does splitting a context into read and write contexts reduce consumer re-renders?',
  ],
  'List virtualization / windowing for large lists': [
    'What is list virtualization and how does it improve rendering for 10,000-item lists?',
    'What are the trade-offs of virtualization (e.g. variable-height items, accessibility)?',
  ],
  'Image optimization (WebP/AVIF, responsive images, CDN, lazy)': [
    'How do srcset and sizes attributes work for responsive images?',
    'What is the difference between WebP and AVIF, and which should you prefer?',
    'How does serving images from a CDN with a CDN cache improve performance?',
  ],
  'Resource hints: preload, prefetch, preconnect, dns-prefetch': [
    'What is the difference between preload and prefetch?',
    'When would you use preconnect vs dns-prefetch?',
    'What is the risk of overusing preload?',
  ],
  'HTTP caching, CDN caching, and cache busting': [
    'What is the difference between Cache-Control: max-age and s-maxage?',
    'How does content hashing enable aggressive long-term caching for JS assets?',
    'What does a CDN cache invalidation strategy look like for a React SPA?',
  ],
  'Debounce / throttle for expensive handlers': [
    'What is the difference between debounce and throttle, and when do you use each?',
    'Implement a debounce function. What edge cases should it handle?',
  ],
  'SSR / streaming / RSC to improve TTFB and TTI': [
    'How does SSR improve Time to First Byte compared to a pure client-side SPA?',
    'How does streaming SSR improve the perceived load time over buffered SSR?',
    'How do React Server Components reduce Time to Interactive by reducing client JS?',
  ],
  'Skeletons and perceived-performance techniques': [
    'What is the difference between a spinner and a skeleton loader in terms of perceived performance?',
    'What is optimistic UI and how does it relate to perceived performance?',
  ],
  'Measuring with Lighthouse, WebPageTest, and RUM': [
    'What is the difference between lab data (Lighthouse) and field data (RUM/CrUX)?',
    'How do you set up Real User Monitoring (RUM) to track Core Web Vitals in production?',
  ],

  // React Native Performance
  'New Architecture: JSI, Fabric, TurboModules and why it is faster': [
    'What performance problems did the old bridge architecture have that JSI/Fabric solve?',
    'How does JSI eliminate JSON serialization in native module calls?',
  ],
  'Hermes engine and bytecode precompilation': [
    'How does Hermes bytecode precompilation improve cold start time?',
    'What features of full V8/JSC does Hermes trade off for its mobile-focused optimizations?',
  ],
  'Reducing JS <-> native bridge traffic (legacy architecture)': [
    'What types of operations generate the most bridge traffic?',
    'How does batching and avoiding synchronous-looking async calls reduce bridge overhead?',
  ],
  'FlatList / FlashList tuning (getItemLayout, windowSize, recycling)': [
    'How does getItemLayout allow FlatList to skip measurement, and when can you use it?',
    'How does FlashList\'s recycler differ from FlatList\'s virtualization?',
  ],
  'Avoiding re-renders in list items (memo, stable callbacks)': [
    'Why do inline arrow functions in renderItem cause all visible items to re-render on scroll?',
    'How do you create a stable renderItem function using useCallback?',
  ],
  'Running animations on the UI thread (Reanimated worklets, useNativeDriver)': [
    'Why does running animations on the JS thread cause jank?',
    'How does useNativeDriver offload animation to the UI thread?',
    'How do Reanimated worklets take this further with direct UI-thread execution?',
  ],
  'Image caching and downsizing (FastImage / expo-image)': [
    'What performance problems does FastImage/expo-image solve over the built-in Image?',
    'How do you downsize images before displaying them to reduce memory usage?',
  ],
  'Reducing startup time / TTI (inline requires, RAM bundles, lazy screens)': [
    'What is a RAM bundle and how does it defer parsing of unused modules?',
    'How do inline requires delay module evaluation until first use?',
  ],
  'Detecting and fixing memory leaks': [
    'What are the most common causes of memory leaks in React Native apps?',
    'How do you use Flipper or Xcode Instruments to detect a memory leak?',
  ],
  'Profiling with Flipper, Xcode Instruments, and Android Profiler': [
    'What profiling capabilities does Flipper provide for React Native?',
    'How do you identify which native component is causing a layout performance issue using Xcode Instruments?',
  ],

  // Security
  'OWASP Top 10 awareness': [
    'What are the OWASP Top 10 vulnerabilities and which ones most apply to frontend work?',
    'How does knowing the OWASP Top 10 inform your daily development practices?',
  ],
  'XSS (stored, reflected, DOM-based) and output sanitization (DOMPurify)': [
    'What are the three types of XSS, and how does each differ in how the payload is delivered?',
    'Why is DOMPurify safer than filtering HTML with a regex?',
    'How does React\'s default rendering (JSX) protect against XSS?',
  ],
  'CSRF and defenses (SameSite cookies, anti-CSRF tokens)': [
    'How does a CSRF attack work, and why do SameSite cookies help prevent it?',
    'What is the difference between SameSite=Strict and SameSite=Lax?',
    'How do anti-CSRF tokens work alongside SameSite cookies?',
  ],
  'CORS — how it works and configuring it correctly': [
    'What is the Same-Origin Policy and how does CORS relax it?',
    'What triggers a CORS preflight request?',
    'What are the risks of setting `Access-Control-Allow-Origin: *`?',
  ],
  'Content Security Policy (CSP) and Trusted Types': [
    'What does a Content Security Policy protect against?',
    'How would you configure a strict CSP that allows inline React event handlers?',
    'What are Trusted Types and how do they harden against DOM XSS?',
  ],
  'Auth strategies: sessions vs JWT, refresh tokens, rotation': [
    'What are the trade-offs between session cookies and JWTs for authentication?',
    'What is refresh token rotation and why does it improve security?',
    'How do silent refresh and refresh token rotation work together?',
  ],
  'Token storage: httpOnly cookies vs localStorage trade-offs': [
    'Why is storing JWTs in localStorage a security concern?',
    'How do httpOnly, Secure, and SameSite cookie flags protect auth tokens?',
    'What are the trade-offs of httpOnly cookies vs localStorage for a SPA?',
  ],
  'OAuth 2.0 and OpenID Connect flows (PKCE)': [
    'What is the Authorization Code flow with PKCE, and why is PKCE required for SPAs?',
    'What is the difference between OAuth 2.0 and OpenID Connect?',
    'Why is the Implicit flow deprecated for SPAs?',
  ],
  'HTTPS/TLS, HSTS, and secure headers': [
    'What does HTTP Strict Transport Security (HSTS) do?',
    'What security headers should a production web app set (X-Frame-Options, X-Content-Type, etc.)?',
  ],
  'Dependency/supply-chain security (npm audit, Snyk, Dependabot, lockfiles)': [
    'Why are lockfiles (package-lock.json, yarn.lock) important for supply chain security?',
    'How do npm audit and Dependabot differ in how they surface vulnerabilities?',
  ],
  'Injection awareness (SQL/NoSQL, command)': [
    'How does injection attack the client-side and what is the frontend\'s responsibility?',
    'How does parameterized queries/prepared statements prevent SQL injection at the backend?',
  ],
  'Mobile: secure storage (Keychain / Keystore), Keychain vs AsyncStorage': [
    'Why is AsyncStorage not appropriate for storing auth tokens on mobile?',
    'How does the iOS Keychain / Android Keystore differ from AsyncStorage in terms of security?',
  ],
  'Mobile: SSL/certificate pinning': [
    'What is certificate pinning and what attack does it prevent?',
    'What are the operational trade-offs of pinning certificates in a mobile app?',
  ],

  // Offline, Networking & Data Sync
  'Offline-first architecture and graceful degradation': [
    'What is the difference between offline-first and offline-capable?',
    'How would you design a React Native app to work fully offline?',
  ],
  'Service Workers and caching strategies (cache-first, network-first, SWR)': [
    'What are the main Service Worker caching strategies and when do you use each?',
    'How does the stale-while-revalidate caching strategy balance freshness and speed?',
  ],
  'PWA fundamentals (manifest, installability, app shell)': [
    'What makes a web app installable as a PWA?',
    'What is the app shell architecture and what problem does it solve?',
  ],
  'Local persistence: IndexedDB, SQLite, MMKV, Realm, WatermelonDB': [
    'When would you choose IndexedDB over localStorage?',
    'What makes WatermelonDB or Realm appropriate for large relational datasets in a mobile app?',
  ],
  'Optimistic UI updates and rollback': [
    'Walk through implementing an optimistic delete with a rollback on failure.',
    'How does React Query\'s onMutate / onError / onSettled API support optimistic updates?',
  ],
  'Background sync and offline mutation queues': [
    'How would you queue mutations made while offline and sync them when connectivity returns?',
    'What is the Background Sync API in Service Workers?',
  ],
  'Conflict resolution and data reconciliation (last-write-wins, CRDTs overview)': [
    'What are common conflict resolution strategies for offline-first data sync?',
    'What is a CRDT and when would you need one over last-write-wins?',
  ],
  'Retry with exponential backoff and jitter': [
    'Why add jitter to exponential backoff?',
    'Implement a simple retry with exponential backoff for a fetch call.',
  ],
  'Request deduplication and caching (React Query, SWR, Apollo, RTK Query)': [
    'How does React Query deduplicate simultaneous requests for the same key?',
    'What is the difference between request deduplication and response caching?',
  ],
  'Cache invalidation strategies (the hard problem)': [
    'What are the different cache invalidation strategies and their trade-offs?',
    'How does tag-based invalidation (React Query queryClient.invalidateQueries) work?',
  ],
  'HTTP caching headers (ETag, Cache-Control, Last-Modified)': [
    'What is the difference between ETag and Last-Modified for conditional requests?',
    'What does `Cache-Control: no-cache` actually do (it doesn\'t skip caching)?',
  ],
  'Real-time: WebSockets, Server-Sent Events, long polling': [
    'What are the trade-offs between WebSockets, SSE, and long polling?',
    'When would you choose SSE over WebSockets for real-time updates?',
  ],
  'REST vs GraphQL vs tRPC trade-offs': [
    'What are the main trade-offs between REST and GraphQL for a frontend team?',
    'What does tRPC offer over REST or GraphQL for a TypeScript full-stack app?',
  ],
  'Pagination patterns (offset, cursor, infinite scroll)': [
    'What are the trade-offs between offset-based and cursor-based pagination?',
    'How do you implement infinite scroll with cursor-based pagination?',
  ],

  // Design Patterns & Architecture
  'SOLID principles': [
    'Explain the Single Responsibility Principle with a React component example.',
    'How does the Open/Closed Principle apply to component design?',
    'How does Dependency Inversion apply to how React components consume services?',
  ],
  'DRY, KISS, YAGNI, and separation of concerns': [
    'When does following DRY actually make code worse?',
    'What does YAGNI mean and how does it apply to API design for components?',
  ],
  'Common GoF patterns in FE (Singleton, Factory, Observer, Strategy, Facade, Adapter, Decorator, Proxy)': [
    'What GoF patterns do you recognize in the React ecosystem?',
    'How does the Observer pattern manifest in React state management or event systems?',
    'How does the Facade pattern apply to how you wrap third-party libraries?',
  ],
  'HOC vs render props vs custom hooks (evolution)': [
    'Why did the community move from HOCs to render props to custom hooks?',
    'Are there still valid use cases for HOCs in 2024?',
  ],
  'Compound components and controlled/uncontrolled API design': [
    'What is the compound component pattern and what makes it flexible?',
    'How do you design a component to support both controlled and uncontrolled modes?',
  ],
  'State machines for complex flows (XState)': [
    'When does a state machine outperform ad-hoc state management with booleans?',
    'What is the actor model in XState v5?',
  ],
  'Dependency injection and inversion of control': [
    'How does React\'s Context API implement a form of dependency injection?',
    'How does inverting control (passing behavior as props/callbacks) improve testability?',
  ],
  'Flux / Redux unidirectional data flow; MVC / MVVM': [
    'What problem did the Flux architecture solve over MVC for large front-end apps?',
    'How does unidirectional data flow make debugging easier?',
  ],
  'Monorepo (Nx, Turborepo) vs polyrepo trade-offs': [
    'What are the benefits of a monorepo for a frontend platform team?',
    'What are the main challenges of a monorepo at scale, and how do Nx and Turborepo address them?',
  ],
  'Micro-frontends and module federation': [
    'What problem do micro-frontends solve, and what complexity do they introduce?',
    'What is Webpack Module Federation and how does it enable runtime composition of micro-frontends?',
  ],
  'Designing for testability and maintainability': [
    'How does separating business logic from UI components improve testability?',
    'What makes a codebase "maintainable" and how do you design for it from the start?',
  ],

  // Code Quality, Testing & Git
  'Testing pyramid: unit, integration, e2e': [
    'What is the testing pyramid and how do you decide how many tests at each level?',
    'Why is an inverted pyramid (too many E2E tests) a problem?',
  ],
  'TDD / BDD and writing meaningful tests': [
    'What is the Red-Green-Refactor cycle in TDD?',
    'What makes a test meaningful vs one that only exists for coverage?',
  ],
  'Mocks, stubs, spies, and fakes': [
    'What is the difference between a mock, a stub, a spy, and a fake?',
    'When does over-mocking cause tests to pass but bugs to slip to production?',
  ],
  'Component testing (React Testing Library) philosophy': [
    'What does "test behavior, not implementation" mean in RTL?',
    'Why does RTL discourage testing internal state directly?',
  ],
  'E2E testing (Playwright, Cypress, Detox, Maestro)': [
    'What are the trade-offs between Playwright and Cypress?',
    'How do you manage test data and state in E2E tests to prevent flakiness?',
  ],
  'Visual regression and snapshot testing (pros/cons)': [
    'What is visual regression testing and what tools support it?',
    'What is the main problem with snapshot tests that causes them to become maintenance burdens?',
  ],
  'Linting and formatting (ESLint, Prettier, Biome)': [
    'What is the difference between a linter and a formatter?',
    'How do you integrate ESLint and Prettier without rule conflicts?',
  ],
  'Pre-commit hooks (Husky, lint-staged)': [
    'How does lint-staged improve on running linting over the entire codebase on each commit?',
    'What are the downsides of slow pre-commit hooks and how do you fix them?',
  ],
  'Git workflows (trunk-based, GitFlow, feature branches)': [
    'What is trunk-based development and how does it differ from GitFlow?',
    'What practices make trunk-based development safer with a large team?',
  ],
  'Conventional commits, semantic versioning, and changelogs': [
    'What is the conventional commits specification and how does it enable automated changelogs?',
    'How does semantic versioning (semver) communicate the nature of a change?',
  ],
  'Code review culture and effective PRs': [
    'What makes a code review comment constructive vs demoralizing?',
    'How do you keep PRs small and reviewable?',
  ],
  'Managing and paying down technical debt': [
    'How do you decide when to address technical debt vs ship new features?',
    'How do you make technical debt visible to non-technical stakeholders?',
  ],

  // Observability, Debugging & Profiling
  'Error tracking (Sentry, Bugsnag) and source maps in production': [
    'How do source maps enable readable stack traces in production error tracking?',
    'What information should you attach to a Sentry event to make debugging easier?',
  ],
  'Structured logging and log levels': [
    'What is structured logging and how does it improve log searchability?',
    'How do you decide what log level (debug/info/warn/error) to use for an event?',
  ],
  'Performance monitoring: RUM and APM': [
    'What is the difference between Real User Monitoring (RUM) and synthetic monitoring?',
    'How would you set up RUM to track Core Web Vitals for different user segments?',
  ],
  'Profiling: Chrome DevTools Performance, Memory, and Coverage tabs': [
    'How do you use the Performance tab to identify a long task blocking the main thread?',
    'What does the Memory tab\'s heap snapshot reveal about a leak?',
    'What is the Coverage tab useful for in a production performance audit?',
  ],
  'React Profiler and why-did-you-render': [
    'How do you use the React DevTools Profiler to find which component takes the most time to render?',
    'What does why-did-you-render detect that React Profiler doesn\'t?',
  ],
  'Memory-leak detection (detached DOM nodes, listeners, timers)': [
    'How do you find detached DOM nodes causing a memory leak using Chrome DevTools?',
    'What are the most common event listener and timer memory leak patterns in React?',
  ],
  'Feature flags, gradual rollout, and kill switches': [
    'How do you implement a feature flag system that supports percentage-based rollouts?',
    'What is a kill switch and how does it differ from a feature flag?',
  ],
  'A/B testing and experimentation': [
    'How do you design an A/B test to avoid bias (e.g. sample ratio mismatch)?',
    'How do you manage feature-flag / experiment variants without polluting your codebase?',
  ],

  // Accessibility
  'WCAG and the POUR principles': [
    'What does POUR stand for in the context of WCAG, and what does each principle mean?',
    'What are the three conformance levels of WCAG (A, AA, AAA)?',
  ],
  'Semantic HTML as the foundation': [
    'Why does using semantic HTML elements provide accessibility for free?',
    'Give examples of replacing non-semantic patterns with semantic HTML.',
  ],
  'ARIA roles, states, and properties (and when not to use ARIA)': [
    'What is the first rule of ARIA use?',
    'When should you add aria-live, and what are its values?',
    'What is the difference between aria-labelledby and aria-describedby?',
  ],
  'Keyboard navigation and visible focus management': [
    'What makes a custom interactive widget (e.g. a dropdown menu) keyboard accessible?',
    'Why is `:focus-visible` preferred over `:focus` for focus styles?',
  ],
  'Focus trapping for modals and dialogs': [
    'How do you trap focus inside a modal so keyboard users can\'t tab to content behind it?',
    'How do you restore focus when a modal closes?',
  ],
  'Screen readers: VoiceOver, TalkBack, NVDA/JAWS': [
    'What is the difference between how VoiceOver (iOS/Mac) and TalkBack (Android) interact with your app?',
    'How do you test a component with a screen reader without a physical device?',
  ],
  'Color contrast and not relying on color alone': [
    'What is the WCAG AA minimum contrast ratio for normal and large text?',
    'Give an example of using color as the sole means of conveying information (and the fix).',
  ],
  'Accessible forms, labels, and error messaging': [
    'How do you associate a label with a form control, and what happens if you don\'t?',
    'How do you announce form validation errors to screen reader users?',
  ],
  'Automated a11y testing (axe, Lighthouse) and manual audits': [
    'What percentage of accessibility issues can automated tools like axe catch?',
    'What does a manual accessibility audit involve beyond running automated tools?',
  ],

  // Build, Deploy & DevOps
  'Bundlers: Webpack, Vite, Rollup, esbuild, Metro, Turbopack': [
    'How does Vite\'s native ESM dev server achieve faster HMR than Webpack\'s bundled approach?',
    'When would you choose Rollup over Webpack for a project?',
  ],
  'CI/CD pipelines (GitHub Actions, GitLab CI, etc.)': [
    'What are the typical stages in a frontend CI/CD pipeline?',
    'How do you speed up CI pipelines with caching (node_modules, build artifacts)?',
  ],
  'Docker basics for frontend build/deploy': [
    'How do you multi-stage Docker builds to reduce the size of the final image for a Next.js app?',
    'What goes in a .dockerignore file and why?',
  ],
  'CDN and edge deployment': [
    'What is the benefit of deploying a SPA\'s static assets to a CDN vs a single origin server?',
    'What is the difference between edge compute (CloudFront Functions, Vercel Edge) and a CDN cache?',
  ],
  'Blue-green and canary deployments': [
    'What is the difference between a blue-green and a canary deployment?',
    'How do you roll back a bad canary deployment quickly?',
  ],
  'OTA updates (CodePush, EAS Update)': [
    'What kinds of changes can be shipped via OTA updates, and what requires a store submission?',
    'How do you manage version compatibility between OTA updates and native binary versions?',
  ],
  'Rollbacks and release safety': [
    'What is your strategy for rolling back a frontend release that introduced a critical bug?',
    'How do feature flags enable safer releases and faster rollbacks?',
  ],
  'Monorepo build orchestration and caching (Nx, Turborepo)': [
    'How does Turborepo\'s remote cache speed up builds across team members and CI?',
    'What is the difference between task pipelines in Turborepo and Nx?',
  ],

  // State & Data Management
  'Distinguishing server state, client/UI state, form state, and URL state': [
    'What is server state and why does it need different handling than client UI state?',
    'What belongs in URL state (query params) vs local component state?',
  ],
  'Choosing Context vs Redux vs Zustand vs Jotai vs Recoil': [
    'How do you choose between Context, Zustand, and Redux for a given project?',
    'What makes Jotai\'s atom-based approach different from a single store?',
  ],
  'Server-state libraries (React Query, SWR, RTK Query, Apollo)': [
    'What distinguishes a server-state library from a client state library?',
    'How does RTK Query compare to React Query in terms of integration with Redux?',
  ],
  'Immutability and structural sharing': [
    'What is structural sharing in immutable data updates?',
    'How does Immer enable immutable updates with mutable-looking syntax?',
  ],
  'Avoiding over-globalizing state': [
    'What is the harm of putting all state in a global store?',
    'How do you identify state that should stay local vs state that truly belongs globally?',
  ],

  // System Design (Frontend)
  'Frontend system design interview approach': [
    'How do you structure your answer to a frontend system design question?',
    'What are the key areas to cover when designing a large-scale frontend system?',
  ],
  'Component API and design system architecture': [
    'How do you design a component API that is flexible but not over-engineered?',
    'What are design tokens and how do they enable consistent theming across a design system?',
  ],
  'Rendering strategy selection (CSR vs SSR vs SSG vs ISR)': [
    'How do you choose a rendering strategy for a marketing page vs a dashboard vs a real-time feed?',
    'What are the SEO implications of CSR vs SSR vs SSG?',
  ],
  'Designing for i18n and l10n from the start': [
    'What does internationalizing a React app involve (beyond just translating strings)?',
    'How do you handle right-to-left (RTL) layouts in a component library?',
  ],
  'Handling large data (virtualization, pagination, streaming)': [
    'When would you use server-side pagination vs client-side virtualization?',
    'How does streaming SSR help with pages that have a lot of data to render?',
  ],
  'Real-time collaboration architecture (overview)': [
    'How would you design the client architecture for a collaborative text editor like Notion?',
    'What role do CRDTs or Operational Transforms play in real-time collaboration?',
  ],
  'Cross-cutting concerns: logging, auth, error handling layers': [
    'How do you centralize error handling in a large React app?',
    'How do you inject auth headers into all API calls without modifying each call site?',
  ],

  // Lead & Engineering Practices
  'Technical trade-off analysis and decision-making': [
    'Walk me through how you would decide whether to build or buy a particular feature.',
    'How do you communicate a technical trade-off to a non-technical stakeholder?',
  ],
  'Writing RFCs, design docs, and Architecture Decision Records (ADRs)': [
    'What is the purpose of an RFC or design doc before starting implementation?',
    'What should an ADR record, and why does the "why" matter more than the "what"?',
  ],
  'Estimation and breaking work into deliverable slices': [
    'How do you break a large feature into incremental deliverables that each provide value?',
    'What techniques do you use for more accurate engineering estimation?',
  ],
  'Balancing velocity, quality, and technical debt': [
    'How do you decide when it\'s acceptable to incur technical debt deliberately?',
    'How do you make technical debt visible and ensure it gets addressed?',
  ],
  'Mentoring, pairing, and growing a team': [
    'How do you approach mentoring a junior engineer who is struggling?',
    'How do you create an environment where engineers can safely learn from mistakes?',
  ],
  'Effective code review and feedback culture': [
    'What are the characteristics of a high-quality code review comment?',
    'How do you handle a situation where a reviewer and author disagree on an approach?',
  ],
  'Incident response, on-call, and blameless postmortems': [
    'What does a blameless postmortem focus on, and why is blame counterproductive?',
    'Walk me through how you would handle a production incident from detection to resolution.',
  ],
  'Cross-functional collaboration (product, design, backend, QA)': [
    'How do you handle a situation where design specs conflict with technical constraints?',
    'How do you build a shared understanding of requirements across engineering, product, and design?',
  ],

  // Modern Platform & Trends
  'React Server Components and the server/client boundary': [
    'What mental model do you use to decide where to place the server/client boundary?',
    'What are the performance benefits of React Server Components for a data-heavy page?',
  ],
  'Edge computing and edge functions': [
    'What is the difference between running code at the edge vs in a regional server?',
    'What are the runtime limitations of edge functions (no full Node.js APIs)?',
  ],
  'WebAssembly (WASM) use cases': [
    'What types of tasks benefit from WebAssembly in a web app?',
    'How does WASM integrate with JavaScript in the browser?',
  ],
  'Progressive Web Apps and installable experiences': [
    'What are the technical requirements for a PWA to be installable on iOS vs Android?',
    'What capabilities do PWAs still lack compared to native apps?',
  ],
  'View Transitions API': [
    'What does the View Transitions API enable and how does it work?',
    'How does it integrate with React Router or Next.js for page transition animations?',
  ],
  'AI-assisted development and integrating LLMs into apps': [
    'What are the main patterns for integrating an LLM API into a frontend app?',
    'How do you handle streaming responses from an LLM in a React UI?',
    'What are the UX considerations for AI-powered features (latency, error handling, trust)?',
  ],
  'Signals and fine-grained reactivity (concept)': [
    'What is a "signal" in the context of reactivity frameworks?',
    'How does fine-grained reactivity (Solid.js, Angular signals) differ from React\'s VDOM reconciliation?',
  ],
};
