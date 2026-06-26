import { enrich } from './enrich.mjs';

const map = {
  'promises-deep': {
    analogy: "Promise callbacks are VIP guests (microtasks) always served before regular guests (macrotasks like setTimeout). Combinators set the party rules: all = cancel if anyone fails to arrive; allSettled = wait for everyone regardless.",
    keyPoints: [
      "States settle once: pending → fulfilled/rejected, permanently.",
      ".then/.catch/.finally run as microtasks (before setTimeout).",
      "Each .then returns a new promise; return values/promises to chain.",
      "Combinators: all (fail-fast), allSettled (all outcomes), race, any.",
      "await schedules its continuation as a microtask; forEach won't await.",
    ],
  },
  'race-conditions': {
    analogy: "An out-of-order fetch race is like mailing two letters and getting replies back swapped: the reply to 'a' lands after 'ab' and overwrites the right answer. Cancel the stale one, or ignore all but the latest.",
    keyPoints: [
      "Bugs from async results arriving in an order you don't control.",
      "Classic case: per-keystroke search where a stale response overwrites fresh.",
      "Fix with AbortController — cancel the previous request.",
      "Or tag requests with a monotonic id and drop non-latest responses.",
      "In React, abort/ignore inside the useEffect cleanup.",
    ],
  },
  'web-workers': {
    analogy: "A Web Worker is a back-office assistant at a separate desk (thread): hand them heavy paperwork via notes (postMessage) so the front desk (UI) never freezes — but they can't touch the storefront (DOM).",
    keyPoints: [
      "Run CPU-heavy JS on a background thread; no DOM access.",
      "Communicate via postMessage (structured clone).",
      "Transfer ArrayBuffers to avoid the copy cost.",
      "Use for >50ms CPU work (parsing, crypto, ML) — not I/O.",
      "Types: Dedicated, Shared, and Service Workers.",
    ],
  },
  'worklets': {
    analogy: "Worklets are tiny specialists embedded in the browser's pipeline: a Paint worklet draws a background, an Audio worklet processes sound in real time — small, restricted, and run many times per frame.",
    keyPoints: [
      "Lightweight scripts that run inside the rendering/audio pipeline.",
      "Paint, Animation, and Audio worklets each target a pipeline stage.",
      "No DOM access; must be fast and near-stateless.",
      "Audio Worklet is the right tool for real-time Web Audio DSP.",
      "They illustrate pushing work off the main thread for 60fps.",
    ],
  },
  'websockets-polling': {
    analogy: "Choosing a real-time transport is choosing how you get updates: keep asking 'anything new?' (polling), keep a one-way news ticker open (SSE), or hold a two-way phone call (WebSocket).",
    keyPoints: [
      "Short polling: simple but wasteful; latency up to the interval.",
      "Long polling: near-real-time over HTTP, ties up connections.",
      "SSE: one-way server→client stream, auto-reconnect, HTTP-friendly.",
      "WebSocket: full-duplex, low overhead — chat, collaboration, trading.",
      "Stateful sockets need sticky sessions / a pub-sub backplane to scale.",
    ],
  },
  'webhooks': {
    analogy: "A webhook is the provider calling YOU when something happens, instead of you repeatedly calling to ask: register a URL and they POST events to it — but verify it's really them and expect duplicates.",
    keyPoints: [
      "Push-based: the provider POSTs events to your URL.",
      "Verify authenticity with an HMAC signature over the raw body.",
      "Make processing idempotent — the same event can arrive twice.",
      "ACK fast (2xx), then process asynchronously.",
      "Ordering isn't guaranteed; base logic on current state.",
    ],
  },
  'push-notifications': {
    analogy: "Push is the platform's delivery service waking your app even when it's closed: you get a delivery token, hand it to your server, and the server sends messages through the platform's push service.",
    keyPoints: [
      "Web: Service Worker + Push API + a VAPID subscription.",
      "Mobile: FCM (Android) and APNs (iOS), often via FCM.",
      "Ask permission in-context, never on page load.",
      "Store and refresh tokens; prune dead subscriptions (410 Gone).",
      "Handle foreground vs background and deep-link on tap.",
    ],
  },
  'service-workers': {
    analogy: "A Service Worker is a programmable receptionist between your app and the network: it intercepts every request, can serve cached copies offline, and receive push — but a buggy one can trap users on stale files.",
    keyPoints: [
      "A network proxy script that intercepts fetch — the basis of PWAs.",
      "Lifecycle: install (precache) → activate (cleanup) → control.",
      "HTTPS only; no DOM; keep no in-memory state.",
      "Strategies: cache-first, network-first, stale-while-revalidate.",
      "Version caches and ship a kill-switch to avoid stale-app lockout.",
    ],
  },
  'auth': {
    analogy: "Auth is building security: authentication checks your ID at the door (who are you?), authorization is which floors your badge opens (what can you do?). Frontend checks are courtesy signs; the real locks are on the server.",
    keyPoints: [
      "Sessions (stateful, easy to revoke) vs JWTs (stateless, scale well).",
      "Keep access tokens short-lived; refresh with a long-lived token.",
      "localStorage is XSS-exposed; httpOnly cookies need CSRF defense.",
      "JWTs are signed, not encrypted — never put secrets in them.",
      "For SPAs/mobile use OAuth Authorization Code + PKCE.",
    ],
  },
  'api-keys': {
    analogy: "Anything shipped to the browser is printed on the outside of the box — view-source and devtools read it. Secret keys must live on a server; the client calls YOUR backend, which holds the secret.",
    keyPoints: [
      "Anything in the client bundle/app is PUBLIC.",
      "Secret keys live server-side; the client calls your backend proxy.",
      "Publishable keys can be client-side but must be origin/scope-locked.",
      "Mobile binaries can't hide secrets — restrict + use short-lived tokens.",
      "Never commit keys; rotate on leak; rate-limit the proxy.",
    ],
  },
  'ssl-pinning': {
    analogy: "SSL pinning is recognizing a friend's actual face, not just any ID badge: the app trusts only the certificate/key you embedded, rejecting even 'valid' CA-signed certs from a man-in-the-middle.",
    keyPoints: [
      "Trust only a pinned cert/public key, defeating rogue-CA MITM.",
      "Primarily a mobile concern (not standard web).",
      "Public-key (SPKI) pinning survives cert renewal; cert pinning doesn't.",
      "Always pin a backup key so rotation doesn't brick installed apps.",
      "Defense-in-depth on top of TLS, not a replacement.",
    ],
  },
  'redux-thunk': {
    analogy: "Redux is synchronous by nature; a thunk is a permission slip that lets an action be a FUNCTION instead of a plain object — so it can do async work (fetch) and dispatch several actions over time.",
    keyPoints: [
      "Middleware that lets action creators return functions.",
      "A thunk receives (dispatch, getState) for async logic.",
      "Classic pattern: dispatch pending → fulfilled/rejected.",
      "RTK's createAsyncThunk auto-generates that lifecycle.",
      "Thunks for side effects; RTK Query for server cache; sagas for complex orchestration.",
    ],
  },
  'core-web-vitals': {
    analogy: "Core Web Vitals are a health checkup for your page: LCP = how fast the main content shows, CLS = how much things jump around, INP = how snappy it feels when tapped.",
    keyPoints: [
      "LCP <2.5s: preload hero image, WebP/AVIF, fast TTFB.",
      "INP <200ms: break long JS tasks, offload to workers.",
      "CLS <0.1: size images, reserve space, control font swap.",
      "Optimize for field data (CrUX/PageSpeed), not your fast machine.",
      "Enforce budgets in CI (Lighthouse CI).",
    ],
  },
  'code-splitting': {
    analogy: "Code splitting is packing one bag per activity instead of one giant suitcase: users download only the screen they're on, and the rest loads on demand.",
    keyPoints: [
      "Break the bundle into chunks loaded on demand via import().",
      "React.lazy + Suspense splits at the component level.",
      "Route-based splitting is the highest-impact move.",
      "Split heavy, infrequent libraries into their own chunks.",
      "Prefetch the next likely chunk on hover/idle.",
    ],
  },
  'monorepos': {
    analogy: "A monorepo is one repo holding many packages that share tooling and can change atomically. Turborepo/Nx are the smart build managers that rebuild only what changed and cache the rest.",
    keyPoints: [
      "One repo, many packages, shared tooling, atomic cross-package changes.",
      "Workspaces (pnpm/yarn) link local packages.",
      "Turborepo/Nx run a task graph and cache outputs (local + remote).",
      "'affected' commands run tasks only for changed packages.",
      "Remote caching across CI is the biggest time win.",
    ],
  },
  'accessibility': {
    analogy: "Accessibility is building ramps alongside the stairs from the start: semantic HTML and keyboard support come free, ARIA fills the gaps, and a screen-reader pass catches what automated tools (only ~40%) miss.",
    keyPoints: [
      "Semantic HTML first; reach for ARIA only when needed.",
      "Every interactive element must be keyboard-operable with visible focus.",
      "Manage focus in modals; return focus to the trigger on close.",
      "WCAG AA contrast: 4.5:1 normal text, 3:1 large text.",
      "Automated tools catch ~40% — test with a real screen reader.",
    ],
  },
  'memory-leaks': {
    analogy: "A leak is leaving sticky notes (references) pointing at things you no longer need, so the janitor (GC) can't throw them out: forgotten timers, listeners, and subscriptions pile up until the app crashes.",
    keyPoints: [
      "GC can't collect what's still reachable — leaks are stray references.",
      "Usual suspects: uncleared intervals, listeners, detached DOM, growing caches.",
      "In React, every subscribing effect must clean up in its return.",
      "Diagnose with DevTools heap snapshots (compare two over time).",
      "Use AbortController/clearInterval/unsubscribe; WeakMap for GC-friendly caches.",
    ],
  },
  'micro-frontends': {
    analogy: "Micro-frontends are a food court: each team runs its own stall (app), independently deployed, sharing the seating (shell). Great for many teams, but you pay in coordination overhead.",
    keyPoints: [
      "Independently built/deployed, team-owned UI pieces.",
      "Module Federation loads remotes at runtime; share React as a singleton.",
      "Solves an ORGANIZATIONAL scaling problem, at real technical cost.",
      "Watch version skew, design consistency, and auth/state sharing.",
      "For a single team, a modular monorepo is usually better.",
    ],
  },
  'caching': {
    analogy: "Caching is keeping copies closer to whoever needs them — browser, CDN, app, server — to cut latency. The hard part isn't storing; it's knowing when a copy is stale (invalidation).",
    keyPoints: [
      "Layers: HTTP, CDN/edge, Service Worker, in-app data, memory, server.",
      "Static assets: long max-age + content-hashed filenames; HTML no-cache.",
      "ETag/304 avoids re-downloading unchanged data.",
      "Invalidate via TTL, explicit purge, or events.",
      "Never cache private/authenticated data in shared caches.",
    ],
  },
  'serverless-lambda': {
    analogy: "Serverless is renting a kitchen by the dish instead of owning a restaurant: functions spin up on demand, scale automatically, and bill per call — but the first order after a quiet spell waits for the kitchen to warm up (cold start).",
    keyPoints: [
      "Functions run on demand, auto-scale, and bill per invocation.",
      "Great for API-key proxies, webhooks, BFF endpoints, and cron jobs.",
      "Cold starts add first-hit latency (mitigate: small bundles, provisioned/edge).",
      "Stateless and ephemeral — persist to a DB; reuse clients across warm calls.",
      "Limits on duration/memory/payload; watch DB concurrency.",
    ],
  },
  'testing': {
    analogy: "A good test suite is shaped like a trophy: lots of integration tests in the middle (best confidence per effort), fewer unit and E2E. Coverage % tells you what ran, not whether bugs would be caught.",
    keyPoints: [
      "Testing trophy: weight integration tests heaviest.",
      "Test behavior, not implementation; query by role/text.",
      "Mock at the network boundary with MSW.",
      "Keep a thin layer of E2E for critical journeys.",
      "Coverage ≠ confidence; fix flaky async waits (findBy over sleeps).",
    ],
  },
  'ai-integration': {
    analogy: "Adding an LLM is integrating an unreliable, slow, costly oracle: route it through your backend (keep the key secret), stream tokens so it feels fast, and validate/guard its output because it can be wrong.",
    keyPoints: [
      "Never call the model provider from the client — proxy via your backend.",
      "Stream tokens (SSE/ReadableStream) — the single biggest UX win.",
      "Allow cancellation (AbortController) and show partial output.",
      "Treat output as non-deterministic: validate, cite, never auto-run destructive actions.",
      "Control cost/latency: tight context (RAG), caching, smaller models for simple tasks.",
    ],
  },
  'design-patterns': {
    analogy: "Design patterns are named recipes for recurring problems: Observer (a newsletter), Strategy (swappable drill bits), Compound Components (a LEGO set). The skill is picking the one that fits with the least added complexity.",
    keyPoints: [
      "Observer/Pub-Sub backs event systems, Redux, RxJS.",
      "Strategy swaps algorithms via a map instead of if/switch.",
      "Compound Components share state across related parts via Context.",
      "HOCs/Render Props are mostly replaced by hooks in modern React.",
      "Prefer composition over inheritance; hooks over HOCs.",
    ],
  },
  'typescript-advanced': {
    analogy: "Advanced TypeScript is using the type system to make illegal states impossible: discriminated unions instead of loose booleans, generics for reuse, and mapped/conditional types to compute types from types.",
    keyPoints: [
      "Generics + constraints build reusable, type-safe APIs.",
      "Discriminated unions model state cleanly (vs multiple booleans).",
      "Conditional + mapped types power the built-in utilities.",
      "Know the utility types cold (Pick/Omit/Record/ReturnType/Awaited).",
      "satisfies validates without widening; make illegal states unrepresentable.",
    ],
  },
  'graphql': {
    analogy: "REST is a fixed-menu restaurant (the server decides the dish shape); GraphQL is à la carte (the client asks for exactly the fields it needs). Each wins in different situations — and both need a plan for caching and N+1.",
    keyPoints: [
      "REST: simple, HTTP-cacheable, universal; can over/under-fetch.",
      "GraphQL: client-selected fields, one endpoint, typed schema.",
      "GraphQL's N+1 problem is solved with DataLoader batching.",
      "GraphQL caching is harder (POST) — use persisted queries.",
      "Many diverse clients → GraphQL; simple/stable → REST or a BFF.",
    ],
  },
  'i18n': {
    analogy: "i18n is designing the app so language is a setting, not hard-coded: extract every string, let a library handle plurals and date/number formats, and lay out with logical properties so RTL just works.",
    keyPoints: [
      "i18n = build for many locales; l10n = the actual translations.",
      "Never hardcode user-visible strings — use message keys.",
      "Pluralization and date/number formatting need ICU/Intl, not manual code.",
      "RTL: use CSS logical properties + dir=rtl from the start.",
      "Lazy-load only the active locale; test with a pseudo-locale.",
    ],
  },
  'cicd-frontend': {
    analogy: "Frontend CI/CD turns a deploy from 'push and pray' into a controlled, reversible event: PR checks gate quality, preview URLs catch issues early, canary/flags limit blast radius, and rollback is one click.",
    keyPoints: [
      "PR checks: lint, type-check, tests, bundle-size, a11y, security.",
      "Preview deploys per PR for real reviewer feedback.",
      "Canary/blue-green rollouts with auto-rollback on error spikes.",
      "Feature flags decouple deploy from release (and act as a kill-switch).",
      "Fast rollback (CDN repoint) plus observability (Sentry, RUM).",
    ],
  },
};

enrich(new URL('../data/senior.json', import.meta.url).pathname, map);
