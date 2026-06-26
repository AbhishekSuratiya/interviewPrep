import { enrich } from './enrich.mjs';

const map = {
  'execution-context': {
    analogy: "Think of an execution context as a fresh desk the JS engine sets up before running code: it lays out a notebook for variables, a phone book of scope references, and a sticky note saying who 'this' is — then it starts working line by line.",
    keyPoints: [
      "Three kinds: Global, Function, and (rarely) Eval.",
      "Two phases — Creation (allocate memory for vars/functions, set scope & 'this'), then Execution (run line by line).",
      "In creation, var becomes undefined while let/const stay uninitialized (the TDZ).",
      "Every function call creates a new context that gets pushed on the call stack.",
      "'this' is decided here by HOW a function is called, not where it was written.",
    ],
  },
  'call-stack': {
    analogy: "The call stack is a stack of plates: each function call adds a plate on top, and you can only take the top one off. Pile on too many (deep recursion) and the stack 'overflows'.",
    keyPoints: [
      "LIFO — the last function called is the first to return.",
      "Synchronous: only one frame runs at a time, so long tasks freeze the UI.",
      "'Maximum call stack size exceeded' = recursion with a missing or wrong base case.",
      "Fix deep recursion by going iterative (explicit stack) or trampolining.",
      "V8's stack holds roughly 10–15k frames.",
    ],
  },
  'event-loop': {
    analogy: "The event loop is a bouncer who only lets the next task onto the dance floor when it's empty. All the VIP microtasks (Promises) get in first, then exactly ONE regular macrotask (setTimeout), then VIPs again.",
    keyPoints: [
      "Order: run all sync code → drain ALL microtasks → run ONE macrotask → repeat.",
      "Microtasks: Promise.then, queueMicrotask, MutationObserver.",
      "Macrotasks: setTimeout, setInterval, I/O, message events.",
      "setTimeout(fn, 0) is NOT immediate — it runs after sync code and all microtasks.",
      "A flood of microtasks can starve macrotasks and block rendering.",
    ],
  },
  'closures': {
    analogy: "A closure is a backpack a function carries: even after it leaves the room where it was created, it still holds the variables it packed — and those update live, not as a photocopy.",
    keyPoints: [
      "A function plus the LIVE references to its outer scope's variables.",
      "References are live, not copies — that's how counters and private state work.",
      "Powers private state (module pattern), React hooks, currying, memoization.",
      "Classic bug: var in a loop shares one variable (3,3,3) — fix with let.",
      "Stale-closure bug in React: an effect captures old state — fix via deps or functional updates.",
    ],
  },
  'scope-chain': {
    analogy: "Looking up a variable is like asking for something at home: check your room first, then the living room, then the whole house — outward until you find it or hit the front door (global).",
    keyPoints: [
      "JS checks local scope first, then walks outward to parents, then global.",
      "Lexical: scope is fixed by WHERE code is written, not where it's called.",
      "Not found anywhere → ReferenceError (or an accidental global in sloppy mode).",
      "Inner scopes can read outer variables; outer scopes can't read inner ones.",
      "This outward-walk is exactly what makes closures possible.",
    ],
  },
  'hoisting': {
    analogy: "Hoisting is the engine reading the guest list before the party starts: it already 'knows' every var and function name. var guests get a blank name tag (undefined); let/const guests exist but aren't allowed in until their line (the TDZ).",
    keyPoints: [
      "Function declarations are fully hoisted — callable before their line.",
      "var is hoisted and initialized to undefined.",
      "let/const are hoisted but sit in the Temporal Dead Zone until declared.",
      "Function expressions and arrow functions are NOT hoisted (only the variable is).",
      "Prefer let/const so you get a clear error instead of a silent undefined.",
    ],
  },
  'promises': {
    analogy: "A Promise is a restaurant buzzer: you get it immediately (pending), and later it either lights up 'food ready' (fulfilled) or 'order failed' (rejected). Once it goes off, it never changes again.",
    keyPoints: [
      "States: pending → fulfilled OR rejected, and settling is permanent.",
      ".then/.catch/.finally each return a NEW promise — that's how chaining works.",
      "Always return inside .then or the next step receives undefined.",
      "Always handle errors (.catch / try-catch) — unhandled rejections crash Node.",
      "Combinators: all (fail-fast), allSettled (all results), race, any.",
    ],
  },
  'abort-controller': {
    analogy: "AbortController is the cancel button on a download: hand fetch the 'signal' wire, and pressing abort() instantly stops the request and throws an AbortError.",
    keyPoints: [
      "Pass controller.signal to fetch; call controller.abort() to cancel.",
      "Cancelled requests throw AbortError — catch and ignore it.",
      "Essential in React useEffect cleanup to cancel stale requests.",
      "AbortSignal.timeout(ms) auto-cancels after a delay (no manual timer).",
      "One controller can cancel several requests at once.",
    ],
  },
  'async-await': {
    analogy: "async/await is Promises in plain clothes: 'await' is like pausing a video to wait for a download — but the rest of the app keeps playing, it doesn't freeze the thread.",
    keyPoints: [
      "async functions always return a Promise.",
      "await pauses only THIS function, not the whole thread.",
      "Use try/catch for errors instead of .catch.",
      "Awaiting in a loop is sequential (slow) — use Promise.all for parallel work.",
      "No performance penalty vs Promises — it compiles down to them.",
    ],
  },
  'closures-fn': {
    analogy: "Same backpack idea: a function and the scope it was born in travel together. The module pattern uses this to keep things private inside the bag and hand out only a few public zippers.",
    keyPoints: [
      "Closure = a function bundled with its birth scope (lexical environment).",
      "Holds live references, enabling private state without classes.",
      "Module pattern: an IIFE returns only the public API; the rest stays hidden.",
      "Every React hook (useState/useEffect/useCallback) relies on closures.",
      "Return copies, not internal references, to keep state truly private.",
    ],
  },
  'debouncing': {
    analogy: "Debounce is an elevator door: every new person who steps in resets the 'closing' timer, so the doors only close once there's a gap with nobody entering.",
    keyPoints: [
      "Runs the function only after X ms of SILENCE since the last call.",
      "Each new call resets the timer.",
      "Ideal for search inputs, window resize, and autosave.",
      "Debounce = wait for a pause; throttle = at most once per interval.",
      "In React, keep the timer in useRef/useCallback so it survives re-renders.",
    ],
  },
  'memoization': {
    analogy: "Memoization is keeping the answers to homework you've already solved: same question → hand back the saved answer instead of redoing the work.",
    keyPoints: [
      "Cache results keyed by inputs — trades memory for CPU.",
      "Identical arguments return the cached result instantly.",
      "Backs React's useMemo (values), useCallback (functions), React.memo (renders).",
      "The cache key must uniquely represent the inputs.",
      "Use a WeakMap for object keys so entries auto-clean when keys are GC'd.",
    ],
  },
  'prototype-chain': {
    analogy: "Prototypes are a family inheritance line: if you don't own a trait, you ask your parent, then grandparent, up the chain — until someone has it or you reach the end (null).",
    keyPoints: [
      "Every object has a hidden [[Prototype]] link to another object.",
      "Property lookup walks UP the chain until found or null.",
      "The top is Object.prototype, whose prototype is null.",
      "ES6 classes are syntax sugar over prototypes.",
      "Own properties shadow inherited ones — check with hasOwnProperty/Object.hasOwn.",
    ],
  },
  'destructuring': {
    analogy: "Destructuring is unpacking a grocery bag straight onto labeled shelves in one line, instead of pulling out each item separately.",
    keyPoints: [
      "Pull values from arrays/objects into variables in a single statement.",
      "Supports defaults, renaming, nesting, rest (...), and skipping.",
      "Used everywhere in React for props, state, and hook returns.",
      "Pure syntax sugar — no runtime cost.",
      "Destructuring a null/undefined nested path throws — guard with `?? {}`.",
    ],
  },
  'optional-chaining': {
    analogy: "?. is a careful stepping-stone walk across a stream: if a stone is missing (null/undefined), you stop safely and return undefined instead of falling in (throwing).",
    keyPoints: [
      "obj?.a?.b returns undefined if any link is null/undefined — no TypeError.",
      "Works for properties, methods (obj?.fn()), and indexes (arr?.[0]).",
      "Pair with ?? to supply a fallback value.",
      "Don't overuse it — it can hide real bugs where a value shouldn't be null.",
      "Strong types + boundary validation reduce the need for defensive ?.",
    ],
  },
  'event-delegation': {
    analogy: "Instead of giving every kid in a classroom their own teacher, put ONE teacher at the door who handles whoever walks through — even new students who arrive later.",
    keyPoints: [
      "Attach ONE listener to a parent; use event.target to find the child.",
      "Relies on event bubbling from child up to ancestors.",
      "Saves memory (1 vs N listeners) and handles dynamically added elements.",
      "Use event.target.closest(selector) to catch clicks on nested children.",
      "Watch out: a child's stopPropagation() blocks delegation.",
    ],
  },
  'custom-events': {
    analogy: "CustomEvents are a building's PA system: one module announces 'cart updated' over the speakers, and any listening module reacts — without any of them knowing each other directly.",
    keyPoints: [
      "new CustomEvent(name, { detail, bubbles }) + dispatchEvent to broadcast.",
      "detail carries your payload; bubbles:true lets it travel up the DOM.",
      "composed:true crosses shadow DOM boundaries (web components).",
      "Decouples modules — the publisher doesn't know its listeners.",
      "Always removeEventListener in cleanup to avoid leaks.",
    ],
  },
  'xss': {
    analogy: "XSS is a stranger slipping a malicious note into your form that the page then 'reads aloud' as code. The defense: always treat user input as plain text, never as HTML or script.",
    keyPoints: [
      "Three types: Stored, Reflected, and DOM-based XSS.",
      "Never set innerHTML from user input — use textContent.",
      "React auto-escapes {value}; dangerouslySetInnerHTML bypasses that.",
      "Sanitize untrusted HTML with DOMPurify before rendering.",
      "Add a Content-Security-Policy header as defense-in-depth.",
    ],
  },
  'performance-optimization': {
    analogy: "Web performance is like shipping a package fast: send less stuff (smaller bundle), send it the short way (CDN/caching), and don't make the recipient reassemble it on a slow phone (avoid heavy main-thread work).",
    keyPoints: [
      "Layers: critical rendering path, bundle size, runtime, network, images.",
      "Code-split and lazy-load routes; tree-shake; compress with brotli.",
      "Avoid layout thrash — batch DOM reads, then writes.",
      "Optimize images: WebP/AVIF, responsive srcset, lazy loading.",
      "Targets: LCP <2.5s, INP <200ms, CLS <0.1.",
    ],
  },
  'module-pattern': {
    analogy: "An IIFE module is a vending machine: all the machinery is sealed inside (private), and you interact only through the buttons it exposes (the returned public API).",
    keyPoints: [
      "An IIFE creates a private scope; only the returned object is public.",
      "Variables prefixed with _ stay private via closure.",
      "Revealing Module Pattern: define privately, expose a clean public API.",
      "ES Modules (import/export) are the modern equivalent.",
      "Great for singletons; use classes when you need many instances or inheritance.",
    ],
  },
  'observer-pattern': {
    analogy: "Pub/Sub is a newsletter: subscribers sign up, the publisher sends an issue to everyone on the list, and it never needs to know who they personally are.",
    keyPoints: [
      "Subjects emit events; many listeners subscribe and react.",
      "Decouples the event source from its consumers.",
      "Backs Node's EventEmitter, Redux subscriptions, and RxJS.",
      "on() should return an unsubscribe function.",
      "Always unsubscribe in cleanup to prevent memory leaks.",
    ],
  },
  'strategy-pattern': {
    analogy: "Strategy is swapping the bit on one drill: same handle (caller), different bit (algorithm) chosen at runtime — instead of a giant if/switch deciding everything.",
    keyPoints: [
      "Store interchangeable algorithms as functions in a map/object.",
      "The caller picks the strategy by key at runtime.",
      "Replaces large if/switch chains.",
      "Adding a behavior = one new entry, no edits to existing code (open/closed).",
      "Each strategy is independently testable.",
    ],
  },
  'proxy-pattern': {
    analogy: "A Proxy is a receptionist in front of an object: every read or write goes through them first, so they can validate, log, or block it before passing it on.",
    keyPoints: [
      "Proxy wraps an object and intercepts operations via traps (get/set/has/…).",
      "Reflect provides the default behavior to delegate to inside traps.",
      "Powers Vue 3's reactivity system.",
      "Use for validation, audit logging, read-only facades, lazy init.",
      "The set trap can intercept brand-new properties (a plain setter can't).",
    ],
  },
  'garbage-collection': {
    analogy: "GC is a janitor who throws out anything no longer reachable from the 'roots'. If even one sticky note (reference) still points to an object, it stays — that lingering note is how leaks happen.",
    keyPoints: [
      "V8 is generational: young space (frequent, fast) + old space (rare, mark-sweep-compact).",
      "An object survives if reachable from any root (globals, stack, etc.).",
      "Leaks come from unwanted references: listeners, timers, closures, growing maps.",
      "WeakMap/WeakRef let GC collect once only the weak reference remains.",
      "Diagnose with DevTools heap snapshots; hunt for detached DOM.",
    ],
  },
  'weakref-finalizationregistry': {
    analogy: "A WeakRef is keeping a phone number for someone who may move without telling you — when you call (.deref()) they might be gone. FinalizationRegistry is a postcard that arrives after they've moved out, so you can tidy up.",
    keyPoints: [
      "WeakRef holds an object without preventing GC; .deref() may return undefined.",
      "FinalizationRegistry runs a cleanup callback after an object is collected.",
      "GC timing is non-deterministic — never rely on it for critical cleanup.",
      "Good for best-effort caches that should yield memory under pressure.",
      "WeakMap when the KEY's lifecycle matters; WeakRef when the VALUE may be collected.",
    ],
  },
  'generator-functions': {
    analogy: "A generator is a series you watch one episode at a time: yield pauses on a cliffhanger, next() resumes — and it only produces the next episode when you ask, so an 'infinite series' never blows up memory.",
    keyPoints: [
      "function* + yield pauses/resumes; returns an iterator and iterable.",
      "Lazy — values are computed only on demand (infinite sequences are fine).",
      "next(value) can pass data back INTO the generator.",
      "Compose lazy map/filter/take pipelines with O(1) memory.",
      "Async generators (for await…of) are ideal for streaming data.",
    ],
  },
  'concurrent-patterns': {
    analogy: "Production async is like running a call center: don't let everyone dial at once (rate limit), back off and retry busy lines with random spacing (jitter), and stop calling a dead number for a while (circuit breaker).",
    keyPoints: [
      "Cap concurrency / rate-limit so you don't overwhelm a service.",
      "Retry with exponential backoff + jitter to avoid thundering herds.",
      "Circuit breaker: after N failures, fail fast and let the service recover.",
      "Timeout-wrap with Promise.race (pair with AbortController to truly cancel).",
      "Bulkhead: isolate one failing operation from the rest.",
    ],
  },
  'observable-pattern': {
    analogy: "A Promise is a single text message; an Observable is a live group chat: many messages over time, you can leave (unsubscribe), and nothing is sent until someone joins (lazy).",
    keyPoints: [
      "Observables emit many values over time, are lazy, and cancellable.",
      "Composable via operators: map, filter, debounce, merge…",
      "Cold = fresh per subscriber; Hot = shared; Subject = both.",
      "throttleTime/debounceTime/distinctUntilChanged tame floods of events.",
      "Always unsubscribe (or takeUntilDestroyed) to avoid leaks.",
    ],
  },
  'web-worker-fundamentals': {
    analogy: "A Web Worker is a second chef in a back kitchen: they do the heavy chopping (CPU work) off the main counter so the front (UI) keeps serving customers — but they can't touch the dining room (DOM).",
    keyPoints: [
      "Runs JS on a separate thread; communicates via postMessage (structured clone).",
      "No DOM/window access; can use fetch, IndexedDB, crypto, OffscreenCanvas.",
      "Use for CPU-bound work (parsing, crypto, ML) — not I/O, which is already async.",
      "Transfer ArrayBuffers (postMessage(buf,[buf])) to skip the copy cost.",
      "SharedArrayBuffer + Atomics give true shared memory (needs COOP/COEP headers).",
    ],
  },
  'conditional-mapped-types': {
    analogy: "These are formulas for types: a conditional type is an if/else for types, a mapped type is a for-loop over an object's keys — together they compute new types from existing ones.",
    keyPoints: [
      "Conditional: T extends U ? X : Y (use infer to extract inner types).",
      "Mapped: { [K in keyof T]: … } transforms each property.",
      "Built-ins like Partial, Pick, Exclude are made from these primitives.",
      "Template literal types build string unions (e.g. `on${Capitalize<T>}`).",
      "All erased at runtime — zero overhead, pure build-time safety.",
    ],
  },
  'decorators-metadata': {
    analogy: "Decorators are stickers you slap on a class or method at definition time (@Injectable, @Get) that tools later scan to wire everything up — like luggage tags a baggage system reads to route your bag.",
    keyPoints: [
      "Functions applied to classes/methods/properties/params at define-time.",
      "With reflect-metadata, they attach metadata that runtime code reads.",
      "Power NestJS DI, TypeORM entities, and class-validator.",
      "Method decorators can transparently wrap behavior (logging, timing).",
      "They're the mechanism behind IoC containers and schema inference.",
    ],
  },
  'test-architecture': {
    analogy: "Good testing is layered like a pyramid: lots of cheap, fast unit/integration tests at the base and a few slow end-to-end tests on top. Coverage % tells you what ran — not whether a test would actually catch a bug.",
    keyPoints: [
      "Testing Trophy: mostly integration, some unit, few e2e, minimal snapshots.",
      "Mutation testing (Stryker) checks whether tests catch injected bugs.",
      "Property-based testing (fast-check) auto-generates tricky edge cases.",
      "Contract testing (Pact) verifies consumer/provider API agreements.",
      "Test behavior, not implementation; coverage ≠ correctness.",
    ],
  },
  'intersection-observer': {
    analogy: "IntersectionObserver is a motion sensor for the viewport: instead of constantly measuring 'is it visible yet?' on every scroll (expensive), the browser just taps you when an element crosses into view.",
    keyPoints: [
      "Async visibility detection — replaces scroll + getBoundingClientRect loops.",
      "Runs off the main thread, so no layout thrash.",
      "Options: root, rootMargin (preload early), threshold (0–1 visible).",
      "Uses: lazy images, infinite scroll, ad/analytics viewability.",
      "Always unobserve/disconnect when done.",
    ],
  },
  'mutation-observer': {
    analogy: "MutationObserver is a security camera on the DOM: it records added/removed nodes and attribute changes, then hands you the batched footage — far cheaper than re-checking the room every second.",
    keyPoints: [
      "Watches DOM changes: childList, attributes, characterData, subtree.",
      "Fires asynchronously, batched as microtasks (not once per change).",
      "Uses: detect injected third-party DOM, autosave, accessibility tooling.",
      "attributeFilter limits which attributes you watch.",
      "Always disconnect() when finished to avoid overhead and leaks.",
    ],
  },
  'v8-optimization': {
    analogy: "V8 'hidden classes' are like filing each object into a known shape-drawer for instant lookup. Keep objects the same shape and they stay fast; add or delete properties in odd orders and V8 reshuffles drawers (deopt).",
    keyPoints: [
      "V8 builds a hidden class (shape) per object structure.",
      "Same property order = fixed-offset access = fast (monomorphic).",
      "Mixing shapes/types at a call site → polymorphic/megamorphic → slow.",
      "Avoid delete (set to null) and conditional property adds in hot paths.",
      "TypedArrays give stable numeric shapes for hot loops.",
    ],
  },
  'compilation-pipeline': {
    analogy: "V8 is a translator that first does a quick rough draft (Ignition bytecode) to start fast, then — for sentences you repeat a lot (hot functions) — writes a polished optimized version (TurboFan native code). Change the meaning and it tears that up (deopt).",
    keyPoints: [
      "Pipeline: Parse → AST → Ignition bytecode → (hot) TurboFan native code.",
      "Ignition = fast startup; TurboFan = optimized hot paths.",
      "Optimization is speculative — it assumes observed types stay stable.",
      "Type/shape changes trigger deoptimization back to bytecode.",
      "Warm up before benchmarking — early runs are interpreted.",
    ],
  },
};

enrich(new URL('../data/javascript.json', import.meta.url).pathname, map);
