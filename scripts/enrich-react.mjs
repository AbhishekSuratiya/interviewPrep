import { enrich } from './enrich.mjs';

const map = {
  'virtual-dom': {
    analogy: "The Virtual DOM is like editing a draft of a document before printing: React compares the new draft with the old one and only re-prints the lines that actually changed, instead of reprinting the whole page.",
    keyPoints: [
      "React diffs a new Fiber tree against the old one with an O(n) heuristic.",
      "Render phase is async/interruptible; commit phase is synchronous.",
      "Different element type → replace; same type → update props.",
      "Lists need stable keys so React can match items across renders.",
      "Fiber (v16+) splits work into pausable units → enables Concurrent features.",
    ],
  },
  'jsx-deep': {
    analogy: "JSX is a shorthand the way emoji shortcodes are: ':smile:' becomes 😄. '<Button/>' is just sugar that Babel turns into a plain React.createElement(...) object describing what to render.",
    keyPoints: [
      "JSX compiles to React.createElement(type, props, children).",
      "An element is a plain, immutable object — a description, not the rendered DOM.",
      "{ type, props, key, ref } is its shape.",
      "React 17+ auto JSX transform — no need to import React for JSX.",
      "Elements describe WHAT to render; React decides HOW.",
    ],
  },
  'error-boundaries': {
    analogy: "An Error Boundary is a circuit breaker per room: if one appliance shorts out, only that room loses power and shows a fallback, instead of the whole house going dark.",
    keyPoints: [
      "Catch render/lifecycle/constructor errors in their child tree.",
      "Do NOT catch event-handler, async, or SSR errors — handle those manually.",
      "Wrap each independent widget/route in its own boundary for isolation.",
      "react-error-boundary adds a clean functional API with resetKeys.",
      "Always keep a top-level boundary as a last resort.",
    ],
  },
  'usestate': {
    analogy: "useState is a labeled box React keeps for your component between renders: you read what's in it and hand React a new value, and React re-renders to show it.",
    keyPoints: [
      "Returns [value, setter]; updates are async and batched (React 18+).",
      "Use the functional form setX(prev => …) when new state depends on old.",
      "Pass a function for lazy init — it runs only once on mount.",
      "React bails out of re-render if the new value is Object.is-equal.",
      "For objects/arrays you must spread manually — state is immutable.",
    ],
  },
  'useeffect': {
    analogy: "useEffect is a chore you do AFTER the room is painted (rendered): sync with the outside world (fetch, subscribe, timers), and the cleanup function is putting your tools away before you redo the chore or leave.",
    keyPoints: [
      "Runs after paint; deps array controls when it re-runs ([] = mount only).",
      "Cleanup runs before the next effect AND on unmount.",
      "Every value you read inside must be in the deps (exhaustive-deps).",
      "Strict Mode double-invokes in dev to expose missing cleanup.",
      "Use for side effects, not for deriving values during render.",
    ],
  },
  'usecontext': {
    analogy: "Context is a building-wide intercom: instead of passing a message person-to-person (prop drilling), you broadcast it and any room can tune in — but everyone tuned in re-hears it whenever it changes.",
    keyPoints: [
      "Reads a context value without prop drilling.",
      "EVERY consumer re-renders when the value changes — even partial users.",
      "Split contexts by concern (Auth/Theme/Cart) to limit re-renders.",
      "Memoize the Provider value to avoid spurious re-renders.",
      "For high-frequency updates, prefer Zustand/Jotai (atomic subscriptions).",
    ],
  },
  'usereducer': {
    analogy: "useReducer is a vending machine for state: you press a labeled button (dispatch an action) and a pure function decides exactly what comes out (the next state) — predictable and testable.",
    keyPoints: [
      "(state, action) => newState — a pure, testable reducer.",
      "Better than useState when state is complex or transitions are many.",
      "Actions make state changes explicit and auditable.",
      "useReducer + Context ≈ lightweight Redux without the library.",
      "dispatch identity is stable — safe to omit from deps.",
    ],
  },
  'usememo': {
    analogy: "useMemo is keeping the result of a slow calculation on a sticky note: as long as the inputs haven't changed, hand back the note instead of recalculating.",
    keyPoints: [
      "Caches a computed VALUE between renders; recomputes when deps change.",
      "Use for expensive computations and stable object/array references.",
      "Don't use for trivial work — the deps comparison can cost more.",
      "Pair with React.memo when passing memoized props down.",
      "Not a correctness tool — React may discard the cache.",
    ],
  },
  'usecallback': {
    analogy: "useCallback is useMemo for functions: it hands back the SAME function instance between renders, so memoized children don't think they got a new prop and re-render.",
    keyPoints: [
      "useCallback(fn, deps) ≡ useMemo(() => fn, deps).",
      "Returns a stable function reference unless deps change.",
      "Only helps when the child is React.memo'd (shallow prop compare).",
      "Also useful when a function is a useEffect dependency.",
      "Without it, every render makes a new function, breaking memoization.",
    ],
  },
  'useref': {
    analogy: "useRef is a pocket your component carries across renders: you can stash things in it (a DOM node, a timer id, the latest value) and changing what's inside doesn't trigger a re-render.",
    keyPoints: [
      "Returns a mutable { current } that persists across renders.",
      "Changing .current does NOT cause a re-render.",
      "Use for DOM access and mutable instance values (timers, controllers).",
      "The 'latest ref' pattern keeps a fresh value inside stable callbacks.",
      "Mutations are synchronous, unlike setState.",
    ],
  },
  'uselayouteffect': {
    analogy: "useLayoutEffect is measuring and adjusting furniture BEFORE the guests see the room: it runs after the DOM updates but before paint, so you can fix positions without any visible flicker.",
    keyPoints: [
      "Runs synchronously after DOM mutation, before the browser paints.",
      "Blocks paint — use only when you must measure/adjust to avoid flicker.",
      "Default to useEffect (non-blocking) for almost everything.",
      "Common use: tooltip/positioning that reads getBoundingClientRect.",
      "Warns during SSR — guard with an isomorphic effect helper.",
    ],
  },
  'useimperativehandle': {
    analogy: "useImperativeHandle is a remote control with only the buttons you choose: instead of handing the parent your whole DOM node, you expose a tidy API like focus(), clear(), play().",
    keyPoints: [
      "Customizes what a ref exposes to the parent.",
      "Used with forwardRef (or ref-as-prop in React 19).",
      "Expose specific methods, hiding internal implementation.",
      "Great for inputs (focus/clear), players (play/pause), modals (open/close).",
      "Keep deps empty/stable so the handle reference is consistent.",
    ],
  },
  'useid': {
    analogy: "useId is a name-tag machine that prints the SAME tag on both the server and the client, so your accessibility wiring (label↔input) doesn't break during hydration the way random IDs would.",
    keyPoints: [
      "Generates a unique ID stable across SSR and client hydration.",
      "Solves hydration mismatches caused by Math.random()/UUID.",
      "Use for label/input pairing, aria-labelledby, aria-describedby.",
      "Stable across re-renders of the same component.",
      "Don't use it as a list key.",
    ],
  },
  'usetransition': {
    analogy: "useTransition is letting someone with one urgent item skip ahead of your big cart: typing stays instant (urgent) while the heavy re-render waits its turn and can be interrupted.",
    keyPoints: [
      "Returns [isPending, startTransition].",
      "Updates inside startTransition are non-urgent and interruptible.",
      "isPending lets you show a subtle loading state.",
      "Great for filtering big lists, tab switches, page transitions.",
      "Wraps the UPDATER (vs useDeferredValue which wraps the value).",
    ],
  },
  'usedeferredvalue': {
    analogy: "useDeferredValue is showing yesterday's newspaper until today's is printed: the expensive view keeps the slightly-stale value while urgent updates (typing) stay snappy, then catches up.",
    keyPoints: [
      "Returns a deferred copy of a value that lags during urgent updates.",
      "Keeps the UI responsive while expensive renders catch up.",
      "Wraps the VALUE (vs useTransition which wraps the updater).",
      "Use when you don't control where the value comes from (props/store).",
      "Compare value !== deferredValue to show a 'stale' indicator.",
    ],
  },
  'usesyncexternalstore': {
    analogy: "useSyncExternalStore is a single official scoreboard everyone reads: it guarantees every component sees the same external value at once, so no two parts of the UI 'tear' apart with mismatched data.",
    keyPoints: [
      "The correct way to subscribe to external stores in Concurrent React.",
      "Prevents 'tearing' (components seeing different versions mid-render).",
      "Takes subscribe, getSnapshot, and getServerSnapshot.",
      "Redux/Zustand/Jotai use it internally.",
      "Use it directly for browser APIs (online status, visibility).",
    ],
  },
  'usedebugvalue': {
    analogy: "useDebugValue is a name label you stick on a custom hook so it's recognizable in the React DevTools toolbox — purely for your debugging convenience.",
    keyPoints: [
      "Shows a label next to a custom hook in React DevTools.",
      "DevTools-only — zero effect in production.",
      "Pass a formatter as the 2nd arg to defer expensive formatting.",
      "Use inside reusable custom hooks for clarity.",
      "Never affects rendering or behavior.",
    ],
  },
  'react19-actions': {
    analogy: "Actions are an autopilot for form submissions: hand React an async function and it automatically flies the pending spinner, error handling, and optimistic updates for you.",
    keyPoints: [
      "Async functions wired to a form's action prop or startTransition.",
      "React auto-manages pending, error, and optimistic state.",
      "Replaces the manual isLoading + try/catch + setError pattern.",
      "Works with client and server (Next.js Server Actions) mutations.",
      "Pairs with useActionState and useOptimistic.",
    ],
  },
  'useactionstate': {
    analogy: "useActionState bundles the three things every form needs — is it submitting, did it error, what's the result — into one tidy package, instead of juggling three separate useState calls.",
    keyPoints: [
      "Returns [state, formAction, isPending].",
      "The action receives (prevState, formData).",
      "isPending is managed automatically while the action runs.",
      "Errors returned from the action become state.",
      "Works with both client and server actions.",
    ],
  },
  'useoptimistic': {
    analogy: "useOptimistic is showing a 'sent' message the instant you hit send (like chat apps): the UI updates immediately, and if the server later fails, React quietly rolls it back.",
    keyPoints: [
      "Returns [optimisticState, addOptimistic].",
      "Instantly shows a predicted state before the server responds.",
      "Auto-reverts to real state on success or failure.",
      "Creates the 'instant feedback, eventual consistency' UX.",
      "Pairs with Actions / form submissions.",
    ],
  },
  'use-hook': {
    analogy: "use() is the rule-breaker hook: unlike the others it can sit inside ifs and loops. Give it a Promise and the component politely 'pauses' (suspends) until the data arrives.",
    keyPoints: [
      "Can be called conditionally / in loops (unlike other hooks).",
      "use(promise) suspends until it resolves (pairs with Suspense).",
      "use(Context) reads context, even after an early return.",
      "Rejected promises bubble to the nearest Error Boundary.",
      "Enables clean data-reading in modern React.",
    ],
  },
  'useformstatus': {
    analogy: "useFormStatus is a child checking the parent form's pulse directly: a submit button deep inside the form can ask 'are we submitting?' without anyone passing it a prop.",
    keyPoints: [
      "Returns { pending, data, method, action } of the nearest form.",
      "Lets child components read submit state without prop drilling.",
      "Perfect for reusable Submit buttons that self-disable.",
      "Imported from react-dom (not react).",
      "Works automatically inside any <form action={…}>.",
    ],
  },
  'ref-as-prop': {
    analogy: "In React 19, ref grew up: it's now just a normal prop you can pass straight to a function component — no more wrapping everything in forwardRef.",
    keyPoints: [
      "Function components can accept ref as a regular prop.",
      "forwardRef is no longer required (and is now deprecated).",
      "Simplifies component APIs and TypeScript typing.",
      "Usage at the call site is unchanged.",
      "Old forwardRef code still works during migration.",
    ],
  },
  'server-components': {
    analogy: "Server Components are a chef who cooks in the kitchen and sends out finished plates: they run only on the server (with direct DB access), and the browser receives ready HTML with zero JS shipped for them.",
    keyPoints: [
      "Render only on the server — their code never ships to the browser.",
      "Can be async and access DB/filesystem/secrets directly.",
      "Cannot use state, effects, browser APIs, or event handlers.",
      "Default in Next.js App Router; mark interactivity with 'use client'.",
      "Pass data to Client Components via props.",
    ],
  },
  'state-decision': {
    analogy: "Choosing state is like choosing storage: a backpack for what's on you (local useState), a shared shelf for the household (Context), a warehouse for everyone (Zustand/Redux), and a fridge for perishable server data (TanStack Query).",
    keyPoints: [
      "Local → useState/useReducer; shared & simple → Context.",
      "Global, frequent, complex → Zustand or Redux Toolkit.",
      "Server data → TanStack Query/SWR (never store it in Redux).",
      "Form state → React Hook Form; URL state → search params.",
      "Separate server state from UI state, and frequent from rare updates.",
    ],
  },
  'redux-toolkit': {
    analogy: "Redux Toolkit is Redux with the paperwork pre-filled: createSlice writes the actions and reducers for you, and Immer lets you 'mutate' state that's actually updated immutably under the hood.",
    keyPoints: [
      "Official, boilerplate-free way to write Redux.",
      "createSlice auto-generates actions + reducers + types.",
      "Immer lets you write mutating-looking, truly-immutable updates.",
      "createAsyncThunk handles pending/fulfilled/rejected.",
      "RTK Query handles data fetching + caching; best for large/structured apps.",
    ],
  },
  'zustand': {
    analogy: "Zustand is a shared whiteboard anyone can read or write without a Provider wrapper: components subscribe to just the lines they care about, so only they re-render when those change.",
    keyPoints: [
      "Tiny (~1KB) store with no Provider needed.",
      "Selector hooks re-render only on the slice you select.",
      "Middleware: persist, devtools, immer.",
      "Great for small-to-medium global UI state.",
      "Combine with TanStack Query for server state.",
    ],
  },
  'tanstack-query': {
    analogy: "TanStack Query is a smart fridge for server data: it remembers what you fetched, knows when it's stale, restocks in the background, and avoids buying the same thing twice (dedup).",
    keyPoints: [
      "Manages server state: caching, dedup, background refetch, mutations.",
      "Key concepts: queryKey, queryFn, staleTime, gcTime.",
      "Replaces useEffect fetching and manual loading/error state.",
      "Built-in optimistic updates and cache invalidation.",
      "Pairs with Zustand (UI state) — they solve different problems.",
    ],
  },
  'code-splitting': {
    analogy: "Code splitting is packing for a trip one bag per activity instead of one giant suitcase: users only carry (download) the code for the screen they're on, loading the rest on demand.",
    keyPoints: [
      "Breaks one big bundle into chunks loaded on demand.",
      "React.lazy + Suspense splits at the component level.",
      "Route-based splitting is the highest-impact strategy.",
      "Also split heavy libraries (charts, editors) into their own chunk.",
      "Prefetch the next likely chunk on hover to hide load latency.",
    ],
  },
  'rendering-performance': {
    analogy: "Fixing React perf is like fixing a noisy office: first find WHO is talking too much (Profiler), then quiet unnecessary re-renders (memo) and only show the rows on screen (virtualization).",
    keyPoints: [
      "Over-rendering is the most common React perf problem.",
      "Tools: React.memo, useCallback, useMemo, key stability.",
      "Virtualize long lists (react-window) — render only visible rows.",
      "ALWAYS measure with the Profiler before optimizing.",
      "Memoization only helps if props are actually stable.",
    ],
  },
  'web-vitals-optimization': {
    analogy: "Core Web Vitals are a health check for your page: LCP = how fast the main content appears, CLS = how much the page jumps around, INP = how snappy it feels when tapped.",
    keyPoints: [
      "LCP <2.5s: preload hero image, WebP, fetchpriority, CDN.",
      "CLS <0.1: set image width/height, reserve space, font-display: swap.",
      "INP <200ms: break long tasks (scheduler.yield), workers, startTransition.",
      "They're a Google SEO ranking factor.",
      "Measure real users with the web-vitals library.",
    ],
  },
  'xss-deep': {
    analogy: "XSS is a forged note that the page reads aloud as code. React's default is to treat everything as plain text; dangerouslySetInnerHTML removes that safety net, so you must sanitize first.",
    keyPoints: [
      "Three types: Stored, Reflected, DOM-based.",
      "React auto-escapes {expressions} by default.",
      "dangerouslySetInnerHTML bypasses escaping — sanitize with DOMPurify.",
      "Sanitize on both save and render (defense in depth).",
      "Add a Content-Security-Policy as a last line of defense.",
    ],
  },
  'csrf-deep': {
    analogy: "CSRF is a stranger mailing a withdrawal slip using your pre-signed signature (your cookie): the bank sees your signature and complies. Defenses prove the request really came from your app.",
    keyPoints: [
      "Tricks the browser into sending authenticated requests cross-site.",
      "Cookies are sent automatically, making forged requests look legit.",
      "Defenses: SameSite=Strict/Lax cookies + CSRF tokens.",
      "Custom headers (X-Requested-With) can't be set cross-origin without CORS.",
      "Tokens in the Authorization header (not cookies) are immune to CSRF.",
    ],
  },
  'content-security-policy': {
    analogy: "CSP is a guest list for your page's bouncer: even if an attacker sneaks a script in, the browser checks the list and refuses to run anything not from an approved source.",
    keyPoints: [
      "An HTTP header whitelisting trusted content sources.",
      "Blocks injected scripts from executing even if XSS occurs.",
      "Directives: script-src, style-src, img-src, connect-src, frame-ancestors.",
      "Nonce/hash approach allows only specifically-trusted inline scripts.",
      "Use Report-Only mode to test before enforcing.",
    ],
  },
  'auth-security': {
    analogy: "Token storage is choosing where to keep your house key: in your hand (memory — safest, lost on refresh) vs a tamper-proof lockbox the browser holds (httpOnly cookie). Either way, the real lock is on the server.",
    keyPoints: [
      "localStorage is XSS-readable; httpOnly cookies aren't (but need CSRF defense).",
      "SPA best practice: access token in memory + refresh token in httpOnly cookie.",
      "Keep access tokens short-lived (≈15 min).",
      "Frontend role checks are UX only — enforce authz on the server.",
      "Route guards prevent navigation, not API access.",
    ],
  },
  'env-config': {
    analogy: "Client env vars are printed on the outside of the package (the JS bundle) — anyone can read them. So only put non-secrets there (a URL is fine), and keep real secrets server-side.",
    keyPoints: [
      "Only VITE_/REACT_APP_/NEXT_PUBLIC_ vars reach the client bundle.",
      "Anything in the client bundle is PUBLIC — never put secrets there.",
      "Secrets live in server env / CI-CD secret stores.",
      ".env.local is gitignored for local dev overrides.",
      "If a secret is committed, rotate it immediately and purge history.",
    ],
  },
  'scheduler-priority': {
    analogy: "React's scheduler is an ER triage nurse: a typing keystroke is a critical patient seen instantly, while a background data re-render waits and can be bumped when something more urgent arrives.",
    keyPoints: [
      "Each update gets a priority 'lane' (Sync, InputContinuous, Default, Transition, Idle).",
      "Higher-priority work preempts lower-priority renders.",
      "User input (SyncLane) beats data updates and transitions.",
      "The scheduler yields between work units to stay responsive.",
      "useTransition/useDeferredValue/Suspense all build on lanes.",
    ],
  },
  'react-compiler': {
    analogy: "React Compiler is an autopilot for memoization: instead of hand-placing useMemo/useCallback everywhere, you write plain components and the compiler inserts the optimal memoization at build time.",
    keyPoints: [
      "Build-time compiler that auto-memoizes components.",
      "Removes most manual useMemo/useCallback/React.memo.",
      "Requires pure components that follow the Rules of Hooks.",
      "Available with React 19 via a Babel plugin.",
      "Migrate gradually; verify with the Profiler before deleting manual memo.",
    ],
  },
  'compound-components': {
    analogy: "Compound Components are like LEGO sets: the box (parent) holds the shared studs (Context/state) and you snap together pieces (<Select.Option>) however you like — you control layout, the kit controls behavior.",
    keyPoints: [
      "Related sub-components share implicit state via Context.",
      "Parent manages behavior; consumer controls layout/markup.",
      "Powers Radix UI, Headless UI, React Select.",
      "Core principle: separate behavior from presentation (headless).",
      "Radix's asChild prop lets consumers supply their own element.",
    ],
  },
  'micro-frontends': {
    analogy: "Micro-frontends are a food court: each stall (team) runs independently with its own kitchen, but they share the seating and entrance (shell). Great for many teams, but you pay for the extra coordination.",
    keyPoints: [
      "Independent teams own independent UI sections, deployed separately.",
      "Module Federation loads remote bundles at runtime.",
      "Share React as a singleton to avoid duplicate copies.",
      "Costs: version coordination, shared state, latency, testing surface.",
      "For small teams, a modular monorepo is usually simpler.",
    ],
  },
  'custom-hooks-advanced': {
    analogy: "Advanced custom hooks are like well-designed kitchen appliances: they hide complex machinery (state, cleanup, race handling) behind one or two simple buttons (a clean API).",
    keyPoints: [
      "Encapsulate complex stateful logic behind a clean API.",
      "Principles: single responsibility, proper cleanup, TS generics.",
      "useEventCallback: stable reference that always calls the latest fn.",
      "useControllable: supports controlled and uncontrolled usage.",
      "A real useFetch is basically TanStack Query — prefer the library.",
    ],
  },
  'ssr-internals': {
    analogy: "Streaming SSR is serving a meal course by course instead of waiting for everything at once: the browser shows the ready parts immediately while slower sections stream in behind a Suspense placeholder.",
    keyPoints: [
      "renderToString blocks until the whole tree renders.",
      "renderToPipeableStream streams HTML chunks progressively.",
      "Hydration attaches event handlers to server HTML.",
      "Suspense enables selective/progressive hydration.",
      "Hydration mismatches come from non-deterministic render (dates, random, window).",
    ],
  },
  'incremental-static-regen': {
    analogy: "ISR is a bakery that sells the loaf already on the shelf (fast/static) but quietly bakes a fresh one in the background once it's gone stale — so customers get speed and reasonable freshness.",
    keyPoints: [
      "Combines static speed with periodic background freshness.",
      "revalidate seconds = how long a page stays cached before regenerating.",
      "First request after expiry serves stale while regenerating.",
      "On-demand: revalidatePath/revalidateTag via a webhook when data changes.",
      "Tag-based invalidation gives granular cache control.",
    ],
  },
  'aria-patterns': {
    analogy: "ARIA is the labeling and wiring that lets a screen reader 'see' your custom widgets: roles say what something is, states say what it's doing, and focus management guides the keyboard user through it.",
    keyPoints: [
      "Composite widgets need roving tabindex / aria-activedescendant for keyboard nav.",
      "ARIA live regions announce dynamic content to screen readers.",
      "Trap focus in modals; return focus to the trigger on close.",
      "Keyboard: arrows navigate, Escape closes, Enter/Space activate.",
      "Follow the WAI-ARIA Authoring Practices Guide; test with real screen readers.",
    ],
  },
  'testing-patterns': {
    analogy: "Good React tests act like a real user, not an X-ray: they click and read the screen (by role/text) rather than poking at internal state — so they keep passing through refactors that don't change behavior.",
    keyPoints: [
      "Test behavior, not implementation details.",
      "Query by role/text; avoid testId and internal state.",
      "Mock the network at the boundary with MSW, not the fetch module.",
      "Avoid over-mocking and testing third-party components.",
      "Add Playwright for a few critical end-to-end journeys.",
    ],
  },
  'playwright-e2e': {
    analogy: "Playwright is a robot that drives real browsers like a user — clicking, typing, navigating across Chrome/Firefox/WebKit — to verify the whole app actually works end to end.",
    keyPoints: [
      "Modern cross-browser E2E (Chromium, Firefox, WebKit) with mobile emulation.",
      "Accessibility-aware locators (getByRole/Label/Text).",
      "Built-in network interception and parallel execution.",
      "Share auth via storageState so tests don't re-login.",
      "Use trace/screenshot on failure for fast debugging.",
    ],
  },
};

enrich(new URL('../data/react.json', import.meta.url).pathname, map);
