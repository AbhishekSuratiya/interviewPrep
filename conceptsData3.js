// Part 3: ES6+, Browser & Performance, Advanced Patterns, Advanced APIs, Security
Object.assign(conceptsData, {
    // ===== ES6+ ADVANCED FEATURES =====
    "Destructuring": {
        explanation: "Extract values from arrays or properties from objects into distinct variables. Supports defaults, renaming, nested destructuring, and rest patterns.",
        code: `const { name, age = 25 } = { name: 'Abhishek', age: 28 };\nconst [first, ...rest] = [1, 2, 3, 4];\n// Nested\nconst { address: { city } } = { address: { city: 'Delhi' } };`
    },
    "Spread & Rest Operators": {
        explanation: "Spread (...) expands iterables into individual elements. Rest (...) collects remaining elements into an array. Spread is used for copying, merging. Rest is used in function params and destructuring.",
        code: `// Spread\nconst merged = { ...obj1, ...obj2 };\nconst arr = [...arr1, ...arr2];\n\n// Rest\nfunction sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3); // 6`
    },
    "Optional Chaining": {
        explanation: "The ?. operator short-circuits to undefined if a reference is null/undefined instead of throwing. Works with properties, methods, and array indexing.",
        code: `const user = { address: { city: 'Delhi' } };\nconsole.log(user?.address?.city);    // 'Delhi'\nconsole.log(user?.phone?.number);    // undefined (no error)\nconsole.log(user?.getName?.());      // undefined`
    },
    "Nullish Coalescing": {
        explanation: "The ?? operator returns the right-hand operand when the left is null or undefined (NOT for falsy values like 0, '', false). Unlike ||, it preserves intentional falsy values.",
        code: `const count = 0;\nconsole.log(count || 10);  // 10 (wrong! 0 is falsy)\nconsole.log(count ?? 10);  // 0  (correct! 0 is not null/undefined)\n\nconst name = null ?? 'Anonymous'; // 'Anonymous'`
    },
    "Dynamic Imports": {
        explanation: "import() returns a Promise that resolves to the module. Enables code-splitting and lazy loading. The module is fetched only when import() is called at runtime.",
        code: `// Load a module on demand\nbutton.onclick = async () => {\n  const { Chart } = await import('./chart.js');\n  new Chart(canvas).render();\n};`
    },
    "Modules (import/export)": {
        explanation: "ES Modules: named exports (multiple per file), default export (one per file). Statically analyzed for tree shaking. Use import/export at top level. Runs in strict mode by default.",
        code: `// math.js\nexport const add = (a, b) => a + b;\nexport default class Calculator {}\n\n// app.js\nimport Calculator, { add } from './math.js';`
    },
    "Template Literals": {
        explanation: "Backtick strings supporting multi-line text and ${expression} interpolation. Can embed any JS expression inside ${}. Much cleaner than string concatenation.",
        code: `const name = 'Abhishek';\nconst greeting = \`Hello, \${name}!\nWelcome to JS.\`;\nconsole.log(greeting);`
    },
    "Tagged Templates": {
        explanation: "A function that processes a template literal. Receives an array of string parts and the interpolated values. Used for CSS-in-JS (styled-components), i18n, sanitization, and DSLs.",
        code: `function highlight(strings, ...values) {\n  return strings.reduce((result, str, i) =>\n    result + str + (values[i] ? '<b>' + values[i] + '</b>' : ''), '');\n}\nconst name = 'Abhishek';\nhighlight\`Hello \${name}, welcome!\`;`
    },

    // ===== BROWSER & PERFORMANCE =====
    "DOM Manipulation": {
        explanation: "Interacting with the Document Object Model. Modern methods: querySelector, createElement, append, remove, classList. Batch DOM changes to avoid layout thrashing. Use DocumentFragment for bulk inserts.",
        code: `const el = document.createElement('div');\nel.textContent = 'Hello';\nel.classList.add('card');\ndocument.getElementById('app').append(el);`
    },
    "Event Delegation": {
        explanation: "Instead of attaching listeners to every child element, attach ONE listener to the parent. Events bubble up, so the parent catches them. Use e.target to identify the clicked child. React uses this internally.",
        code: `document.getElementById('list').addEventListener('click', (e) => {\n  if (e.target.matches('li')) {\n    console.log('Clicked:', e.target.textContent);\n  }\n});`
    },
    "Event Bubbling & Capturing": {
        explanation: "Events propagate in 3 phases: 1) Capturing (top→target), 2) Target, 3) Bubbling (target→top). By default, listeners fire during bubbling. Use { capture: true } for capturing. stopPropagation() stops the flow.",
        code: `// Bubbling (default)\nchild.addEventListener('click', () => console.log('child'));\nparent.addEventListener('click', () => console.log('parent'));\n// Click child → 'child', 'parent'\n\n// Capturing\nparent.addEventListener('click', () => console.log('parent'), true);\n// Click child → 'parent', 'child'`
    },
    "Intersection Observer": {
        explanation: "Asynchronously observes when an element enters or exits the viewport (or a parent). Used for lazy loading images, infinite scroll, and triggering animations on scroll.",
        code: `const observer = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.classList.add('visible');\n      observer.unobserve(entry.target);\n    }\n  });\n}, { threshold: 0.5 });\nobserver.observe(document.querySelector('.card'));`
    },
    "Mutation Observer": {
        explanation: "Watches for changes in the DOM tree: attribute changes, child additions/removals, text content changes. Replaces deprecated Mutation Events. Fires asynchronously in microtask queue.",
        code: `const observer = new MutationObserver((mutations) => {\n  mutations.forEach(m => console.log(m.type, m.target));\n});\nobserver.observe(document.body, {\n  childList: true, subtree: true, attributes: true\n});`
    },
    "Reflow & Repaint": {
        explanation: "Reflow: recalculates layout (position, size) of elements—expensive. Repaint: redraws pixels without layout change—cheaper. Reading layout props (offsetHeight) after writing forces synchronous reflow (layout thrashing).",
        code: `// BAD: Layout thrashing\nfor (const el of elements) {\n  el.style.width = container.offsetWidth + 'px'; // read+write in loop\n}\n\n// GOOD: Batch reads, then writes\nconst width = container.offsetWidth;\nfor (const el of elements) {\n  el.style.width = width + 'px';\n}`
    },
    "Lazy Loading": {
        explanation: "Deferring the loading of non-critical resources until they are needed. Images: loading='lazy' attribute. JS: dynamic imports. Routes: React.lazy(). Reduces initial bundle size and speeds up first paint.",
        code: `<!-- Native image lazy loading -->\n<img src="photo.jpg" loading="lazy" alt="Photo" />\n\n// React route lazy loading\nconst Dashboard = React.lazy(() => import('./Dashboard'));`
    },
    "Code Splitting": {
        explanation: "Breaking your bundle into smaller chunks loaded on demand. Webpack/Vite automatically split on dynamic import(). Route-based splitting is the most impactful. Reduces initial load time significantly.",
        code: `// Route-based splitting\nconst Home = React.lazy(() => import('./Home'));\nconst About = React.lazy(() => import('./About'));\n\n// Webpack magic comments\nimport(/* webpackChunkName: 'chart' */ './Chart');`
    },
    "Tree Shaking": {
        explanation: "Dead code elimination during bundling. Bundlers (Webpack, Rollup, Vite) analyze ES module imports to determine which exports are used and remove unused ones. Only works with static import/export.",
        code: `// utils.js\nexport const used = () => 'I stay';\nexport const unused = () => 'I get removed';\n\n// app.js\nimport { used } from './utils'; // 'unused' is tree-shaken`
    },
    "Caching": {
        explanation: "HTTP Cache: Cache-Control, ETag headers. Browser Cache: Service Worker + Cache API for offline. Memory Cache: Memoization in JS. CDN caching for static assets. Stale-while-revalidate pattern.",
        code: `// Service Worker caching\nself.addEventListener('fetch', (event) => {\n  event.respondWith(\n    caches.match(event.request)\n      .then(cached => cached || fetch(event.request))\n  );\n});`
    },
    "Memory Leaks": {
        explanation: "Memory that is allocated but never freed. Common causes: 1) Forgotten timers/intervals, 2) Detached DOM nodes with references, 3) Closures holding large objects, 4) Event listeners not removed, 5) Global variables.",
        code: `// Leak: forgotten interval\nconst data = loadHugeData();\nsetInterval(() => console.log(data), 1000);\n\n// Fix: clear it\nconst id = setInterval(() => {}, 1000);\nclearInterval(id); // Clean up`
    },

    // ===== ADVANCED PATTERNS =====
    "Module Pattern": {
        explanation: "Uses IIFE + closures to create private and public members. Encapsulates implementation details. Was the standard pattern before ES6 modules. Still relevant for understanding legacy code.",
        code: `const Counter = (function() {\n  let count = 0; // Private\n  return {\n    increment() { count++; },\n    getCount() { return count; }\n  };\n})();\nCounter.increment();\nCounter.getCount(); // 1`
    },
    "Revealing Module Pattern": {
        explanation: "A variant where all functions are defined privately and only references to public functions are returned. Provides consistent syntax and makes it clear which members are public.",
        code: `const Calculator = (function() {\n  function add(a, b) { return a + b; }\n  function subtract(a, b) { return a - b; }\n  return { add, subtract }; // Reveal public API\n})();`
    },
    "Observer Pattern": {
        explanation: "Defines a one-to-many relationship: when the subject changes state, all observers are notified. Foundation for event systems, RxJS, and React's state management. Also called Listener pattern.",
        code: `class EventEmitter {\n  #listeners = {};\n  on(event, fn) {\n    (this.#listeners[event] ??= []).push(fn);\n  }\n  emit(event, data) {\n    this.#listeners[event]?.forEach(fn => fn(data));\n  }\n}`
    },
    "Singleton Pattern": {
        explanation: "Ensures a class has only one instance and provides global access. Useful for configuration, logging, DB connections. In JS modules, every module is cached after first import—a natural singleton.",
        code: `class Database {\n  static #instance;\n  static getInstance() {\n    if (!this.#instance) this.#instance = new Database();\n    return this.#instance;\n  }\n}\nconst db1 = Database.getInstance();\nconst db2 = Database.getInstance();\nconsole.log(db1 === db2); // true`
    },
    "Factory Pattern": {
        explanation: "A function that creates and returns objects without using 'new'. Decouples object creation from usage. Allows returning different types based on input. Avoids complex constructor logic.",
        code: `function createUser(type) {\n  if (type === 'admin') return { role: 'admin', perms: ['all'] };\n  if (type === 'user') return { role: 'user', perms: ['read'] };\n  throw new Error('Unknown type');\n}\nconst admin = createUser('admin');`
    },
    "Pub/Sub Pattern": {
        explanation: "Publishers emit events without knowing who subscribes. Subscribers listen without knowing the publisher. Decoupled communication via an event bus/channel. Used in Redux, Node EventEmitter, messaging systems.",
        code: `const PubSub = {\n  events: {},\n  subscribe(event, fn) {\n    (this.events[event] ??= []).push(fn);\n  },\n  publish(event, data) {\n    this.events[event]?.forEach(fn => fn(data));\n  }\n};\nPubSub.subscribe('login', user => console.log(user));`
    },
    "Proxy Pattern": {
        explanation: "An intermediary object that controls access to another object. Can intercept and redefine operations like get, set, delete. Used for validation, logging, caching, and reactive systems (Vue, MobX).",
        code: `const handler = {\n  get(target, prop) {\n    console.log('Accessing:', prop);\n    return target[prop];\n  },\n  set(target, prop, value) {\n    if (typeof value !== 'string') throw new TypeError('Must be string');\n    target[prop] = value;\n    return true;\n  }\n};\nconst obj = new Proxy({}, handler);`
    },

    // ===== ADVANCED APIs =====
    "Proxy": {
        explanation: "ES6 Proxy wraps an object and intercepts fundamental operations (get, set, has, deleteProperty, etc.). Enables metaprogramming: validation, observation, virtual properties, and negative array indices.",
        code: `const arr = new Proxy([1, 2, 3], {\n  get(target, prop) {\n    const idx = Number(prop);\n    if (idx < 0) return target[target.length + idx];\n    return target[prop];\n  }\n});\nconsole.log(arr[-1]); // 3`
    },
    "Reflect": {
        explanation: "A built-in object providing static methods for interceptable JS operations. Mirrors Proxy trap methods. Provides a clean, functional way to perform object operations instead of using operators.",
        code: `const obj = { x: 1 };\nReflect.set(obj, 'y', 2);\nReflect.has(obj, 'x');          // true\nReflect.ownKeys(obj);           // ['x', 'y']\nReflect.deleteProperty(obj, 'x');`
    },
    "Intl API": {
        explanation: "Built-in internationalization API for formatting numbers, dates, currencies, and strings according to locale. No external libraries needed. Handles plural rules, relative time, and list formatting.",
        code: `new Intl.NumberFormat('en-IN', {\n  style: 'currency', currency: 'INR'\n}).format(1234567); // '₹12,34,567.00'\n\nnew Intl.DateTimeFormat('en-US', {\n  dateStyle: 'full'\n}).format(new Date()); // 'Thursday, May 8, 2026'`
    },
    "WebSocket": {
        explanation: "Full-duplex communication protocol over a single TCP connection. Unlike HTTP (request-response), both client and server can send messages anytime. Used for chat, real-time data, gaming, live notifications.",
        code: `const ws = new WebSocket('wss://example.com/ws');\nws.onopen = () => ws.send('Hello Server');\nws.onmessage = (e) => console.log('Received:', e.data);\nws.onclose = () => console.log('Disconnected');\nws.onerror = (e) => console.error('Error:', e);`
    },
    "Service Workers": {
        explanation: "A script that runs in the background, separate from the web page. Acts as a proxy between the browser and network. Enables offline support, push notifications, and background sync. Has its own lifecycle (install, activate, fetch).",
        code: `// Register\nnavigator.serviceWorker.register('/sw.js');\n\n// sw.js\nself.addEventListener('install', e => {\n  e.waitUntil(caches.open('v1').then(c => c.addAll(['/'])));\n});\nself.addEventListener('fetch', e => {\n  e.respondWith(caches.match(e.request) || fetch(e.request));\n});`
    },
    "IndexedDB": {
        explanation: "A low-level, transactional, NoSQL database in the browser for storing large amounts of structured data (including files/blobs). Asynchronous API. Survives page refreshes. Much more powerful than localStorage.",
        code: `const request = indexedDB.open('MyDB', 1);\nrequest.onupgradeneeded = (e) => {\n  const db = e.target.result;\n  db.createObjectStore('users', { keyPath: 'id' });\n};\nrequest.onsuccess = (e) => {\n  const db = e.target.result;\n  const tx = db.transaction('users', 'readwrite');\n  tx.objectStore('users').add({ id: 1, name: 'Abhishek' });\n};`
    },

    // ===== SECURITY & OPTIMIZATION =====
    "XSS (Cross-Site Scripting)": {
        explanation: "Attacker injects malicious scripts into web pages viewed by others. Types: Stored (persisted in DB), Reflected (via URL params), DOM-based (client-side manipulation). Prevention: sanitize inputs, escape outputs, use CSP, use textContent over innerHTML.",
        code: `// VULNERABLE\nelement.innerHTML = userInput; // XSS!\n\n// SAFE\nelement.textContent = userInput; // Escaped\n\n// React is safe by default:\n<div>{userInput}</div> // Auto-escaped\n// Unless: dangerouslySetInnerHTML`
    },
    "CSRF (Cross-Site Request Forgery)": {
        explanation: "Attacker tricks an authenticated user into making unwanted requests to a site they're logged into. Prevention: CSRF tokens, SameSite cookie attribute, checking Origin/Referer headers.",
        code: `// Server generates a unique token per session\n<form>\n  <input type="hidden" name="_csrf" value="random-token-here" />\n  <button type="submit">Transfer</button>\n</form>\n\n// Server validates the token on each request`
    },
    "CORS (Cross-Origin Resource Sharing)": {
        explanation: "A security mechanism that allows/restricts resources on a web page to be requested from another domain. The server sets Access-Control-Allow-Origin headers. Preflight OPTIONS requests check permissions for non-simple requests.",
        code: `// Server response headers\nAccess-Control-Allow-Origin: https://myapp.com\nAccess-Control-Allow-Methods: GET, POST\nAccess-Control-Allow-Headers: Content-Type\n\n// Fetch with credentials\nfetch(url, { credentials: 'include' });`
    },
    "CSP (Content Security Policy)": {
        explanation: "An HTTP header that tells the browser which sources of content are trusted. Prevents XSS by blocking inline scripts and restricting script sources. Configured via meta tag or HTTP header.",
        code: `// HTTP Header\nContent-Security-Policy: default-src 'self'; script-src 'self' cdn.example.com; style-src 'self' 'unsafe-inline'\n\n// Meta tag\n<meta http-equiv="Content-Security-Policy" content="default-src 'self'">`
    },
    "Rate Limiting Concepts": {
        explanation: "Controlling how many requests a client can make in a time window. Algorithms: Fixed Window, Sliding Window, Token Bucket, Leaky Bucket. Implemented server-side. Returns 429 Too Many Requests when exceeded.",
        code: `// Simple in-memory rate limiter\nconst requests = new Map();\nfunction rateLimit(ip, limit = 100, window = 60000) {\n  const now = Date.now();\n  const record = requests.get(ip) || { count: 0, start: now };\n  if (now - record.start > window) record = { count: 0, start: now };\n  if (++record.count > limit) throw new Error('429');\n  requests.set(ip, record);\n}`
    },
    "Performance Optimization": {
        explanation: "Key areas: Critical Rendering Path (minimize render-blocking resources), bundle size (code split, tree shake), runtime (avoid layout thrashing, debounce events), network (compress, cache, CDN), images (WebP, lazy load).",
        code: `// Preload critical resources\n<link rel="preload" href="font.woff2" as="font" crossorigin>\n\n// Defer non-critical JS\n<script src="analytics.js" defer></script>\n\n// Compress with gzip/brotli (server config)`
    },
    "Bundle Optimization": {
        explanation: "Techniques: minification (Terser), compression (Brotli/gzip), code splitting, tree shaking, analyzing bundle with webpack-bundle-analyzer, using lighter alternatives (date-fns over moment), dynamic imports.",
        code: `// webpack.config.js\nmodule.exports = {\n  optimization: {\n    minimize: true,\n    splitChunks: { chunks: 'all' },\n    usedExports: true // tree shaking\n  }\n};`
    },
});
