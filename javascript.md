# JavaScript Advanced Concepts for Interview Preparation

This document serves as a comprehensive roadmap for mastering advanced JavaScript concepts, categorized by core areas of the language and its ecosystem.

## 🧠 Core Language Internals
- [ ] **Execution Context**: Global, Function, and Eval contexts; Creation and Execution phases.
- [ ] **Call Stack**: LIFO structure for function execution tracking.
- [ ] **Memory Heap**: Unstructured memory used for storing objects and functions.
- [ ] **Scope Chain**: How JS looks up variables in nested scopes.
- [ ] **Lexical Scope**: Scope defined at the time of writing (author-time).
- [ ] **Hoisting**: Variable and function declarations moved to the top of their scope.
- [ ] **Temporal Dead Zone (TDZ)**: Period between block entry and variable initialization (let/const).
- [ ] **Closures**: Functions bundled with their lexical environment.
- [ ] **this Keyword**: Dynamic binding based on call-site and context (Global, Object, Call/Apply/Bind, Arrow).
- [ ] **Strict Mode**: `'use strict';` for catching common errors and preventing "unsafe" actions.
- [ ] **Event Loop**: Orchestrating execution of synchronous and asynchronous code.
- [ ] **Microtasks vs Macrotasks**: Priority queues (Promises vs SetTimeout/Interval).
- [ ] **Garbage Collection**: Mark-and-sweep algorithm and memory management.

## ⚙️ Functions
- [ ] **Higher Order Functions**: Functions that take or return other functions.
- [ ] **Callback Functions**: Functions passed as arguments to be executed later.
- [ ] **First Class Functions**: Functions treated as first-class citizens (assigned to variables, etc.).
- [ ] **Pure Functions**: Deterministic functions with no side effects.
- [ ] **Currying**: Transforming a function with multiple arguments into a sequence of functions.
- [ ] **Function Composition**: Combining multiple functions to produce a new function.
- [ ] **IIFE**: Immediately Invoked Function Expressions.
- [ ] **Debouncing**: Limiting the rate of function execution after a delay.
- [ ] **Throttling**: Limiting function execution to once every interval.
- [ ] **Memoization**: Caching results of expensive function calls.
- [ ] **Generator Functions**: Functions that can be paused and resumed (`yield`).
- [ ] **Iterators & Iterables**: Protocols for custom iteration behavior.
- [ ] **Recursion**: Functions calling themselves with a base case.

## ⏳ Async JavaScript
- [ ] **Callbacks**: The traditional way of handling async operations.
- [ ] **Promises**: Objects representing the eventual completion/failure of an async operation.
- [ ] **Promise Chaining**: Handling sequential async operations.
- [ ] **Promise APIs**: `Promise.all()`, `Promise.race()`, `Promise.allSettled()`, `Promise.any()`.
- [ ] **Async/Await**: Syntactic sugar over Promises for cleaner async code.
- [ ] **Error Handling**: `try/catch` blocks and `.catch()` for async flows.
- [ ] **Fetch API**: Modern interface for making network requests.
- [ ] **AbortController**: Signaling the cancellation of one or more Web requests.
- [ ] **Async Iterators**: `for await...of` loops for async data streams.
- [ ] **Web Workers**: Running scripts in background threads for multi-threading.

## 🏗️ Objects & OOP
- [ ] **Prototype & Prototype Chain**: Mechanism by which objects inherit features from one another.
- [ ] **Prototypal Inheritance**: Linking objects to other objects for property sharing.
- [ ] **Constructor Functions**: Legacy way of creating object instances.
- [ ] **Classes**: Syntactic sugar for prototypal inheritance.
- [ ] **Encapsulation**: Hiding internal state using private fields (`#`).
- [ ] **Inheritance**: Extending classes using `extends` and `super()`.
- [ ] **Polymorphism**: Overriding methods in subclasses.
- [ ] **Static Methods**: Methods called on the class itself, not instances.
- [ ] **Getters & Setters**: Intercepting property access and assignment.
- [ ] **Object Descriptors**: `configurable`, `enumerable`, `writable`, `value`.
- [ ] **Object.create**: Creating a new object with a specified prototype.
- [ ] **Object.freeze / seal**: Preventing modifications to objects.
- [ ] **Deep vs Shallow Copy**: `Object.assign`/Spread vs `structuredClone` or custom recursion.

## 📊 Advanced Data Handling
- [ ] **Map**: Key-value pairs where keys can be any type.
- [ ] **WeakMap**: Map with weakly held object keys (garbage collectable).
- [ ] **Set**: Collection of unique values.
- [ ] **WeakSet**: Set with weakly held objects.
- [ ] **Symbol**: Unique and immutable primitive used for object property keys.
- [ ] **BigInt**: Handling integers larger than 2^53 - 1.
- [ ] **Typed Arrays**: Handling raw binary data (Int8Array, Float64Array).
- [ ] **ArrayBuffer**: Generic, fixed-length raw binary data buffer.

## ⚡ ES6+ Advanced Features
- [ ] **Destructuring**: Extracting data from arrays or objects into distinct variables.
- [ ] **Spread & Rest Operators**: Expanding or condensing collections.
- [ ] **Optional Chaining**: `?.` for safe deep property access.
- [ ] **Nullish Coalescing**: `??` for providing defaults (only for null/undefined).
- [ ] **Dynamic Imports**: `import()` for on-demand module loading.
- [ ] **Modules (import/export)**: Standardized module system in JS.
- [ ] **Template Literals**: Multi-line strings and interpolation.
- [ ] **Tagged Templates**: Parsing template literals with a function.

## 🌐 Browser & Performance
- [ ] **DOM Manipulation**: Efficiently interacting with the document structure.
- [ ] **Event Delegation**: Attaching a single listener to a parent for multiple children.
- [ ] **Event Bubbling & Capturing**: Phases of event propagation.
- [ ] **Intersection Observer**: Detecting when an element enters/leaves the viewport.
- [ ] **Mutation Observer**: Watching for changes in the DOM tree.
- [ ] **Reflow & Repaint**: Understanding layout recalculation and painting.
- [ ] **Lazy Loading**: Loading resources only when needed.
- [ ] **Code Splitting**: Breaking bundles into smaller chunks.
- [ ] **Tree Shaking**: Removing unused code during the build process.
- [ ] **Caching**: Browser cache, Service Workers, and HTTP headers.
- [ ] **Memory Leaks**: Identifying and preventing detached DOM nodes or uncleared timers.

## 📐 Advanced Patterns
- [ ] **Module Pattern**: Encapsulating private and public members.
- [ ] **Revealing Module Pattern**: Variant of module pattern for cleaner syntax.
- [ ] **Observer Pattern**: One-to-many dependency notification.
- [ ] **Singleton Pattern**: Ensuring a class has only one instance.
- [ ] **Factory Pattern**: Creating objects without specifying the exact class.
- [ ] **Pub/Sub Pattern**: Decoupled messaging between components.
- [ ] **Proxy Pattern**: Intercepting and customizing operations on objects.

## 🔌 Advanced APIs
- [ ] **Proxy**: Defining custom behavior for fundamental operations.
- [ ] **Reflect**: Static methods for interceptable JavaScript operations.
- [ ] **Intl API**: Internationalization for numbers, dates, and currency.
- [ ] **WebSocket**: Full-duplex communication over a single TCP connection.
- [ ] **Service Workers**: Proxies between the browser and network for offline support.
- [ ] **IndexedDB**: Transactional, client-side storage for large amounts of structured data.

## 🛡️ Security & Optimization
- [ ] **XSS (Cross-Site Scripting)**: Preventing malicious script injection.
- [ ] **CSRF (Cross-Site Request Forgery)**: Protecting against unauthorized commands from a trusted user.
- [ ] **CORS (Cross-Origin Resource Sharing)**: Managing cross-origin requests.
- [ ] **CSP (Content Security Policy)**: Extra security layer to detect/mitigate attacks.
- [ ] **Rate Limiting Concepts**: Controlling the frequency of incoming requests.
- [ ] **Performance Optimization**: Critical Rendering Path, bundle size, and runtime efficiency.
- [ ] **Bundle Optimization**: Minification, compression, and modern formats.

## ⚛️ React-Relevant JS Concepts
*Focus heavily on these for React/React Native roles:*

- [ ] **Closures**: Crucial for understanding `useEffect` stale closures and hooks.
- [ ] **Event Loop**: Understanding how state updates and effects are scheduled.
- [ ] **Async JS**: Handling API calls and side effects in components.
- [ ] **Debouncing/Throttling**: Optimizing search inputs and scroll events.
- [ ] **Prototype**: Understanding how React's class components (legacy) work.
- [ ] **this**: Binding in class components and why arrow functions are preferred.
- [ ] **Memoization**: `React.memo`, `useMemo`, and `useCallback`.
- [ ] **Shallow vs Deep Comparison**: How React decides to re-render.
- [ ] **Immutability**: Why we never mutate state directly.
- [ ] **Reference vs Value**: Understanding object/array references in dependency arrays.
- [ ] **Garbage Collection**: Preventing leaks in long-running React apps.
- [ ] **Module System**: How ESM works with bundlers like Webpack/Vite.
- [ ] **Proxy**: How state management libraries like MobX or Valtio work.
- [ ] **Event Delegation**: How React's Synthetic Event system works under the hood.
