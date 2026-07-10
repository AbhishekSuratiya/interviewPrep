export const javascriptQuestions = {
  // Language Fundamentals & Syntax
  'How JavaScript runs: engines (V8, SpiderMonkey), interpreter + JIT compilation': [
    'Walk me through what happens from the moment you run a JS file to when your first function executes.',
    'What is JIT compilation and how does it differ from ahead-of-time compilation?',
    'What is an "inline cache" in V8 and why does changing object shapes hurt performance?',
    'How does V8\'s "hidden class" optimization work?',
  ],
  'Statements vs expressions': [
    'What is the difference between a statement and an expression in JavaScript?',
    'Why can\'t you use an if-statement where a value is expected (e.g. inside JSX)?',
    'Is `x = 5` a statement or an expression? Does it produce a value?',
  ],
  'Automatic Semicolon Insertion (ASI) and its pitfalls': [
    'In which situations does JavaScript automatically insert a semicolon?',
    'Give a real example where missing a semicolon causes a bug due to ASI.',
    'Why does a return statement followed by a newline and a value silently return undefined?',
  ],
  '"use strict" — strict mode and what it changes': [
    'What does "use strict" enable and what behaviors does it prevent?',
    'How does strict mode affect the value of `this` in a plain function call?',
    'ES modules are always in strict mode — what does that imply when migrating old code?',
  ],
  'Identifiers, reserved words, and naming rules': [
    'What characters are valid in a JavaScript identifier?',
    'Can you use a reserved word as an object key? Why or why not?',
  ],
  'Code blocks and block scoping with { }': [
    'Does a bare block `{ let x = 1; }` create a new scope?',
    'How does block scoping with let/const differ from function scoping with var?',
  ],
  'Labels and labeled statements': [
    'What is a labeled statement used for in JavaScript?',
    'Give an example where a labeled break is cleaner than a flag variable in nested loops.',
  ],

  // Variables & Scope
  'var, let, and const — differences': [
    'Explain the scoping and hoisting differences between var, let, and const.',
    'Can you reassign a const? What about mutating its contents if it\'s an object?',
    'Why is var considered problematic and mostly avoided in modern code?',
  ],
  'Function scope vs block scope': [
    'Why does `var` inside an if-block leak out to the enclosing function?',
    'How do you create block scope intentionally (without an if/for/function)?',
  ],
  'Hoisting of variables and functions': [
    'What exactly gets "hoisted" for a var declaration vs a function declaration?',
    'Why does calling a function expression before its declaration throw but calling a function declaration doesn\'t?',
    'How does class hoisting differ from function hoisting?',
  ],
  'Temporal Dead Zone (TDZ)': [
    'What is the Temporal Dead Zone and when does it apply?',
    'If let is hoisted, why do you still get a ReferenceError when accessing it before its declaration?',
    'Does TDZ apply to function declarations?',
  ],
  'Global scope and the global object (window / globalThis)': [
    'What is `globalThis` and why was it introduced?',
    'How does a `var` declaration at the top level differ from a `let` declaration in terms of the global object?',
  ],
  'Lexical (static) scoping': [
    'What does "lexical scoping" mean, and how does it differ from dynamic scoping?',
    'How does lexical scope determine which variable an arrow function can access?',
  ],
  'Scope chain and variable resolution': [
    'How does JavaScript traverse the scope chain to find a variable?',
    'What happens if a variable is not found anywhere in the scope chain?',
  ],
  'Shadowing and re-declaration rules': [
    'Can you re-declare a let variable in the same scope? What about in a child block?',
    'What is variable shadowing and when might it cause a subtle bug?',
  ],
  'const with objects/arrays (mutability vs reassignment)': [
    'Why can you push into a const array but can\'t reassign it?',
    'How do you truly make an object immutable if const doesn\'t prevent mutation?',
  ],

  // Data Types
  'Primitive types: string, number, boolean, null, undefined, symbol, bigint': [
    'How many primitive types does JavaScript have, and what are they?',
    'Why does `typeof null` return "object" — is null an object?',
    'What is a Symbol and when would you use one?',
  ],
  'Reference types: object, array, function': [
    'How does assignment of an object differ from assignment of a primitive?',
    'What happens when you pass an object to a function — is it pass-by-reference or pass-by-value?',
  ],
  'typeof operator and its quirks (typeof null === "object")': [
    'What does `typeof` return for null, undefined, a function, and an array?',
    'Why is `typeof null === "object"` and how do you check for null safely?',
  ],
  'undefined vs null': [
    'When does JavaScript produce undefined vs when should you use null explicitly?',
    'How does strict equality distinguish undefined and null, and does loose equality?',
  ],
  'The Symbol type and well-known symbols': [
    'Why are Symbols guaranteed unique, and how does that make them useful for object keys?',
    'What does Symbol.iterator do and when would you implement it?',
    'How do well-known symbols like Symbol.toPrimitive allow you to customize built-in behavior?',
  ],
  'BigInt and large integers': [
    'What problem does BigInt solve that regular number can\'t handle?',
    'Can you mix BigInt and regular Number arithmetic? What happens?',
  ],
  'Primitive wrapper objects (String, Number, Boolean)': [
    'Why can you call `.toUpperCase()` on a string primitive if it\'s not an object?',
    'What\'s the difference between `new String("hi")` and `"hi"`?',
  ],
  'Value vs reference (copy vs shared reference)': [
    'If you assign `let b = a` where `a` is an object, and then mutate `b`, does `a` change?',
    'How would you clone an object so that mutating the clone doesn\'t affect the original?',
  ],

  // Type Coercion & Conversion
  'Implicit vs explicit coercion': [
    'What is implicit coercion and when does it happen?',
    'Give an example of implicit coercion that surprises developers.',
  ],
  'Truthy and falsy values': [
    'Which values are falsy in JavaScript? Name all of them.',
    'What are some truthy values that developers mistakenly expect to be falsy?',
  ],
  'Abstract equality (==) vs strict equality (===)': [
    'What does the abstract equality algorithm do differently from strict equality?',
    'When does `null == undefined` return true but `null === undefined` return false?',
    'When might you intentionally use `==` in production code?',
  ],
  'Object.is and SameValueZero': [
    'How does Object.is differ from === for NaN and -0?',
    'Where does JavaScript use SameValueZero comparison internally?',
  ],
  'String, Number, and Boolean conversion rules': [
    'How does JavaScript convert an object to a string when you concatenate it?',
    'What does Number([]) return and why?',
    'What is the result of `Boolean("")`, `Boolean(0)`, `Boolean([])`, `Boolean({})`?',
  ],
  'The + operator: addition vs concatenation': [
    'What is the result of `1 + "2"` vs `1 + 2`? Walk through the coercion.',
    'Why does `[] + {}` produce a string while `{} + []` might produce something different?',
  ],
  'ToPrimitive, valueOf, and toString': [
    'When JavaScript needs a primitive from an object, what is the resolution order?',
    'How would you make a custom object that acts like a number when used in arithmetic?',
  ],
  'NaN and isNaN vs Number.isNaN': [
    'Why does `isNaN("hello")` return true but `Number.isNaN("hello")` return false?',
    'How do you check if a value is actually the NaN value without false positives?',
    'Why is NaN the only value in JavaScript that is not equal to itself?',
  ],
  'parseInt / parseFloat vs Number()': [
    'What is the difference between parseInt("10px") and Number("10px")?',
    'What does parseInt("010") return and why?',
    'When would you use parseInt with an explicit radix?',
  ],

  // Operators
  'Arithmetic operators and operator precedence': [
    'What is the result of `2 + 3 * 4` and why?',
    'How does operator precedence affect nested expressions — how do you verify or override it?',
  ],
  'Logical operators (&&, ||, !) and short-circuiting': [
    'Why does `a && b` return `b` rather than `true` when both are truthy?',
    'How is `||` commonly used for default values, and why was `??` introduced as a better alternative?',
    'Give an example of short-circuit evaluation being used to guard a function call.',
  ],
  'Nullish coalescing operator (??)': [
    'What is the difference between `??` and `||` when the left side is `0` or `""`?',
    'Why was `??` introduced if `||` already handles falsy values?',
  ],
  'Optional chaining (?.)': [
    'What does `obj?.foo?.bar` evaluate to when `obj.foo` is undefined?',
    'Can you use optional chaining with method calls and array access?',
    'What error does optional chaining prevent?',
  ],
  'Spread (...) and rest (...) operators': [
    'What is the difference between using `...` in a function definition vs a function call?',
    'How would you merge two objects using spread? What are the limitations (shallow copy)?',
    'How does the rest parameter differ from the `arguments` object?',
  ],
  'delete, in, instanceof, typeof, void operators': [
    'What does the `in` operator check — own properties or inherited ones?',
    'How does `instanceof` determine membership, and what can fool it?',
    'What does `delete` do on an array element — does it shift remaining elements?',
  ],

  // Control Flow
  'if / else if / else': [
    'What is a guard clause and why can it make code more readable than nested if/else?',
  ],
  'switch statements and fall-through': [
    'What happens when a switch case has no break? Walk through an example.',
    'When would you intentionally use fall-through in a switch?',
    'What comparison does switch use — == or ===?',
  ],
  'for, while, and do...while loops': [
    'What is the difference between while and do...while?',
    'When does a do...while loop guarantee at least one execution?',
  ],
  'for...of and for...in loops': [
    'What does for...in iterate over, and why is it usually a bad choice for arrays?',
    'How does for...of work and what must an object implement to support it?',
  ],
  'Iteration protocols (iterable & iterator)': [
    'What two things must an object implement to be iterable?',
    'How would you make a custom data structure work with for...of?',
    'What is the difference between an iterable and an iterator?',
  ],

  // Functions
  'Function declarations vs function expressions': [
    'How does hoisting behave differently for a function declaration vs a function expression?',
    'When would you choose a function expression over a declaration?',
  ],
  'Arrow functions and lexical this': [
    'Why doesn\'t an arrow function have its own `this`, and how is `this` resolved inside one?',
    'Can you use an arrow function as a constructor? Why or why not?',
    'When would you specifically need a regular function instead of an arrow function?',
  ],
  'Parameters, arguments object, and default parameters': [
    'Why is the `arguments` object not available in arrow functions?',
    'How do default parameters interact with the `arguments` object in non-strict mode?',
    'Can you reference a previous parameter in a default parameter expression?',
  ],
  'First-class functions and higher-order functions': [
    'What does "first-class function" mean in JavaScript?',
    'Give a real-world example of a higher-order function that you use regularly.',
  ],
  'Immediately Invoked Function Expressions (IIFE)': [
    'Why were IIFEs used before ES modules? What problem did they solve?',
    'Is there still a valid use case for IIFEs in modern JavaScript?',
  ],
  'Pure functions and side effects': [
    'What makes a function "pure" and why is purity desirable?',
    'List some common side effects in JavaScript functions.',
  ],
  'Recursion and tail calls': [
    'How does recursion consume the call stack, and what happens if you go too deep?',
    'What is tail-call optimization and does JavaScript actually use it in practice?',
  ],
  'Function currying and partial application': [
    'What is currying, and how does it differ from partial application?',
    'Implement a simple curry function that works for any arity.',
    'When is currying practically useful?',
  ],
  'call, apply, and bind': [
    'How do call, apply, and bind differ from each other?',
    'How does bind create a new function rather than calling the original?',
    'Give an example where bind solves a real `this`-loss problem.',
  ],

  // Closures & Execution Context
  'What a closure is and how it works': [
    'Define a closure in your own words with a code example.',
    'Why does the inner function still have access to the outer function\'s variables after the outer function returns?',
  ],
  'Practical uses of closures (data privacy, factories, memoization)': [
    'How would you use a closure to create a private counter variable?',
    'Implement a simple memoize function using closures.',
    'How are closures used in the module pattern?',
  ],
  'Execution context (global, function, eval)': [
    'What is an execution context and what does it contain?',
    'How does JavaScript create an execution context when a function is called?',
  ],
  'Call stack': [
    'What happens to the call stack when a function calls another function?',
    'What causes a "Maximum call stack size exceeded" error?',
  ],
  'Common closure pitfalls (loops with var, stale values)': [
    'Why does a classic loop-with-var create a closure bug when using setTimeout inside?',
    'How do you fix the loop closure bug — using let, IIFE, or bind?',
    'What is a "stale closure" in the context of React hooks?',
  ],

  // `this` keyword
  'How `this` is determined (call-site binding)': [
    'How does JavaScript determine what `this` refers to at runtime?',
    'What are the four rules that govern `this` binding, in order of precedence?',
  ],
  'Default binding': [
    'What does `this` refer to in a plain function call in strict mode vs non-strict mode?',
  ],
  'Implicit binding': [
    'What is implicit binding and when does it apply?',
    'Give an example of implicit binding being "lost" when a method is assigned to a variable.',
  ],
  'Explicit binding (call, apply, bind)': [
    'How does call differ from apply in terms of argument passing?',
    'Why would you use bind instead of call for an event handler?',
  ],
  'new binding': [
    'What does the `new` keyword do step by step?',
    'How does `new` binding take precedence over explicit binding?',
  ],
  'Arrow functions and lexical this': [
    'In what scenario does using an arrow function for a callback preserve `this` where a regular function would not?',
    'Can you force a different `this` onto an arrow function using call or bind?',
  ],
  'this in event handlers and callbacks': [
    'Why does `this` inside an event listener callback sometimes point to the DOM element?',
    'How do you ensure a class method retains `this` when used as an event listener?',
  ],

  // Objects
  'Object literals and property shorthand': [
    'What is property shorthand syntax and when is it useful?',
    'What is a computed property name and how do you use it?',
  ],
  'Property descriptors (writable, enumerable, configurable)': [
    'What are the three boolean attributes of a property descriptor?',
    'How does Object.defineProperty differ from simple property assignment?',
    'What does making a property non-configurable prevent?',
  ],
  'Object.keys / values / entries / fromEntries': [
    'How do Object.keys, Object.values, and Object.entries differ from for...in?',
    'How would you use Object.fromEntries to transform an object\'s values?',
  ],
  'Object.assign and shallow copy': [
    'What are the limitations of Object.assign for deep nested objects?',
    'How is Object spread `{...obj}` different from Object.assign?',
  ],
  'Object.freeze, seal, and preventExtensions': [
    'What is the difference between freeze, seal, and preventExtensions?',
    'Does Object.freeze deeply freeze nested objects?',
  ],
  'Object destructuring (with defaults, renaming, nesting)': [
    'How do you rename a property while destructuring it?',
    'How do you provide a default value when a destructured property is undefined?',
    'How do you destructure a nested object in a function parameter?',
  ],
  'Shallow vs deep copy (structuredClone)': [
    'When would structuredClone fail (e.g. functions, class instances)?',
    'What is the difference between a shallow copy and a deep copy, with a concrete example?',
    'How did developers deep-clone objects before structuredClone?',
  ],
  'JSON.stringify / JSON.parse and their limitations': [
    'What values does JSON.stringify silently drop or transform?',
    'How does JSON.stringify handle circular references?',
    'How can you use the replacer/reviver parameter to customize serialization?',
  ],

  // Prototypes & Inheritance
  'Prototype chain and [[Prototype]]': [
    'What is the prototype chain, and how does JavaScript use it for property lookup?',
    'What is at the top of every object\'s prototype chain?',
  ],
  '__proto__ vs prototype': [
    'What is the difference between `__proto__` and `.prototype`?',
    'Why is `__proto__` considered legacy and what should you use instead?',
  ],
  'Constructor functions and the `new` operator': [
    'What four things does the `new` operator do when creating an object?',
    'What happens if a constructor function returns a non-primitive object?',
  ],
  'Prototypal inheritance': [
    'How would you implement inheritance using constructor functions and prototype chaining without using `class`?',
    'What is the difference between prototypal and classical inheritance?',
  ],
  'Object.create': [
    'How does Object.create(proto) differ from using `new`?',
    'How would you use Object.create(null) and why?',
  ],
  'hasOwnProperty vs inherited properties': [
    'How do you check if a property belongs to an object itself vs being inherited?',
    'Why is using Object.hasOwn preferred over obj.hasOwnProperty in modern code?',
  ],
  'instanceof and the prototype chain': [
    'How does instanceof work under the hood?',
    'What can break instanceof checks (e.g. across iframes)?',
  ],

  // Classes
  'class syntax and the constructor': [
    'Are JavaScript classes just syntactic sugar? What is under the hood?',
    'What happens if you don\'t define a constructor in a subclass?',
  ],
  'Static methods and static properties': [
    'When would you use a static method vs an instance method?',
    'Can a subclass access static methods of its parent class?',
  ],
  'Class fields (public and private #fields)': [
    'How do private class fields (using #) differ from the convention of underscore-prefixed properties?',
    'What error do you get when you try to access a private field from outside the class?',
  ],
  'Inheritance with extends and super': [
    'When must you call `super()` in a subclass constructor, and what happens if you don\'t?',
    'How do you call a parent class\'s method from a subclass method that overrides it?',
  ],

  // Arrays
  'Mutating methods (push, pop, shift, unshift, splice, sort, reverse, fill, copyWithin)': [
    'Why is sorting an array in place often problematic in React state? How do you avoid it?',
    'How does Array.prototype.sort behave with numbers by default, and why does that surprise people?',
  ],
  'Non-mutating methods (slice, concat, map, filter, reduce, flat, flatMap)': [
    'Implement flatMap using just flat and map.',
    'How does reduce work — walk through a summation example step by step.',
    'What does flat() do and how does depth work?',
  ],
  'Searching (indexOf, lastIndexOf, includes, find, findIndex, findLast)': [
    'Why does `includes` handle NaN correctly but `indexOf` does not?',
    'When would you use find vs findIndex?',
  ],
  'sort and custom comparators': [
    'Write a comparator to sort an array of objects by a string property.',
    'Why does the default sort on `[10, 9, 2, 1, 100]` produce a wrong result?',
  ],
  'Array destructuring': [
    'How do you skip elements when destructuring an array?',
    'How would you swap two variables using array destructuring?',
  ],
  'Immutable array updates (toSorted, toReversed, toSpliced, with)': [
    'What do the new non-mutating array methods (toSorted, toReversed, toSpliced, with) do?',
    'How do they help with React state immutability patterns?',
  ],

  // Strings
  'Template literals and expression interpolation': [
    'What are the benefits of template literals over string concatenation?',
    'How do tagged template literals work, and what is a real-world use case?',
  ],
  'Common methods (slice, substring, substr, split, trim, pad, repeat)': [
    'What is the difference between slice, substring, and the deprecated substr?',
    'How do padStart and padEnd work and where are they commonly used?',
  ],
  'replace and replaceAll (with functions)': [
    'How would you use a function as the second argument to replace to transform each match?',
    'What is the difference between replace with a regex g flag and replaceAll?',
  ],
  'Unicode, code points, and surrogate pairs': [
    'Why does `"😀".length` return 2 in JavaScript?',
    'How do you correctly iterate over a string containing emoji/surrogate pairs?',
    'What does the `u` flag on a regex do for Unicode?',
  ],

  // Collections
  'Map vs plain object (keys, ordering, size)': [
    'What can be a Map key that cannot be a plain object key?',
    'In what order does a Map iterate its entries?',
    'Why is a Map more appropriate than a plain object for a cache keyed by arbitrary values?',
  ],
  'Set — uniqueness and set operations': [
    'How does Set determine uniqueness — by value or reference?',
    'How would you implement a union, intersection, or difference of two Sets?',
  ],
  'WeakMap and WeakSet (garbage collection & use cases)': [
    'Why can\'t you iterate over a WeakMap?',
    'What is a practical use case for WeakMap (e.g. metadata without preventing GC)?',
  ],

  // Iterators & Generators
  'Generator functions (function*) and yield': [
    'What does a generator function return when called?',
    'How does execution flow when you call .next() on a generator?',
  ],
  'Lazy evaluation with generators': [
    'How do generators enable lazy sequences and infinite data?',
    'Implement an infinite counter using a generator.',
  ],
  'Async generators and for await...of': [
    'How does an async generator differ from a regular generator?',
    'When would you use `for await...of` with an async generator?',
  ],

  // Asynchronous JavaScript
  'Promises: states (pending, fulfilled, rejected)': [
    'What are the three states of a Promise and can they transition backwards?',
    'What is the difference between a resolved and a fulfilled promise?',
  ],
  'then, catch, finally': [
    'What does a `.catch()` on a chain that has no rejection do?',
    'Does `finally` receive the resolved value? Does it change the chain\'s value?',
  ],
  'Promise chaining and error propagation': [
    'How does a thrown error inside a .then() propagate to the next .catch()?',
    'What happens when you return a promise inside a .then() handler?',
  ],
  'Promise.all, allSettled, race, any': [
    'How does Promise.all behave if one promise rejects?',
    'What is the difference between Promise.all and Promise.allSettled?',
    'When would you use Promise.race vs Promise.any?',
  ],
  'async / await syntax': [
    'What does an async function always return?',
    'What is the difference between `await Promise.all([a, b])` and `await a; await b;` in terms of performance?',
  ],
  'Error handling with try/catch in async functions': [
    'How do you catch errors from an awaited promise in an async function?',
    'What happens if you forget to await a rejected promise inside a try block?',
  ],
  'Sequential vs parallel awaits': [
    'How do you run two independent async operations in parallel with async/await?',
    'What is the performance difference between sequential and parallel awaits in a real API scenario?',
  ],
  'Microtasks vs macrotasks': [
    'In what order do setTimeout(fn, 0), Promise.resolve().then, and queueMicrotask run?',
    'Why do promise callbacks always run after the current synchronous code, even if resolved immediately?',
  ],
  'AbortController and cancelling async work': [
    'How does AbortController work with the fetch API?',
    'Why can\'t you cancel a native Promise after it starts?',
  ],

  // Event Loop & Concurrency
  'Call stack, Web APIs, callback queue, microtask queue': [
    'Describe the event loop. What is the difference between the callback queue and the microtask queue?',
    'Predict the output order of a snippet mixing setTimeout(0), Promise.resolve().then, and synchronous code.',
  ],
  'How the event loop schedules tasks': [
    'What happens if a microtask callback schedules another microtask — does the browser ever render?',
    'How do Web Workers interact with the main thread\'s event loop?',
  ],
  'setTimeout, setInterval, and clearing timers': [
    'Why is setTimeout(fn, 0) not guaranteed to fire in exactly 0ms?',
    'What is the minimum delay browsers enforce for nested setTimeouts?',
    'How would you implement a reliable repeating timer without setInterval drift?',
  ],
  'requestAnimationFrame and requestIdleCallback': [
    'Why should you use requestAnimationFrame instead of setTimeout for animations?',
    'What is requestIdleCallback used for and what are its limitations?',
  ],

  // ES6+ Features
  'Modules (import/export)': [
    'What is the difference between named and default exports?',
    'What does `import * as ns from "./mod"` give you?',
    'Why does circular dependency handling differ between ESM and CommonJS?',
  ],
  'Dynamic import()': [
    'What does dynamic import() return?',
    'How would you use dynamic import for route-based code splitting?',
  ],
  'CommonJS (require / module.exports) and differences': [
    'What is the key difference between CJS and ESM in terms of when dependencies are resolved?',
    'Why can\'t you use ES module syntax in a .cjs file?',
  ],
  'Tree shaking and side-effect-free modules': [
    'What is tree shaking and what bundler/format requirement enables it?',
    'What does the "sideEffects" field in package.json do?',
  ],

  // Error Handling
  'try / catch / finally': [
    'Does the finally block run even if there is a return inside try?',
    'Can finally override the return value from a try block?',
  ],
  'Custom error classes (extending Error)': [
    'How do you create a custom error class that instanceof works correctly for?',
    'Why might subclassing Error break instanceof in older transpiled code?',
  ],
  'Error.cause': [
    'What is Error.cause and how does it improve error chains?',
    'How would you re-throw an error while preserving the original as the cause?',
  ],
  'Global error handling (window.onerror, unhandledrejection)': [
    'How do you globally catch unhandled promise rejections in a browser?',
    'What information does the `unhandledrejection` event provide?',
  ],

  // Regular Expressions
  'Character classes, anchors, and quantifiers': [
    'What is the difference between `^` inside and outside a character class?',
    'What does `*` vs `+` vs `?` mean as quantifiers?',
    'What is greedy vs lazy matching and how do you switch between them?',
  ],
  'Groups, capturing, and backreferences': [
    'What is the difference between a capturing group and a non-capturing group `(?:...)`?',
    'How do you reference a captured group in the replacement string of replace?',
  ],
  'Flags (g, i, m, s, u, y)': [
    'What does the `g` flag change about exec, match, and test?',
    'What does the `s` (dotAll) flag enable?',
  ],

  // Functional Programming
  'Pure functions and referential transparency': [
    'What makes a function referentially transparent?',
    'Why are pure functions easier to test and reason about?',
  ],
  'Higher-order functions': [
    'Implement a compose function that combines two or more functions right-to-left.',
    'What is the difference between compose and pipe?',
  ],
  'map / filter / reduce composition': [
    'Rewrite a for-loop data transformation as a chain of map, filter, and reduce.',
    'What are the performance trade-offs of chaining multiple array methods?',
  ],

  // Meta-programming
  'Proxy and traps (get, set, has, deleteProperty)': [
    'What is a JavaScript Proxy and when would you use one?',
    'How would you use a Proxy to implement a reactive data store?',
    'What is a Reflect method and how does it relate to Proxy traps?',
  ],
  'Symbols and well-known symbols (Symbol.iterator, Symbol.toPrimitive)': [
    'How do well-known symbols let you hook into language-level behavior?',
    'Implement Symbol.iterator on a custom object to make it work with for...of.',
  ],

  // DOM
  'Selecting elements (getElementById, querySelector, querySelectorAll)': [
    'What is the difference between querySelector and querySelectorAll?',
    'Why is `querySelectorAll` slower than `getElementById` for a simple id lookup?',
  ],
  'Creating, inserting, and removing nodes': [
    'How does appendChild differ from insertBefore?',
    'What is the benefit of using a DocumentFragment for batch DOM insertions?',
  ],
  'Reflow and repaint (performance)': [
    'What triggers a layout reflow vs a repaint, and why is reflow more expensive?',
    'How would you batch DOM reads and writes to avoid layout thrashing?',
  ],
  'Shadow DOM and web components (overview)': [
    'What problem does the Shadow DOM solve?',
    'How do custom elements interact with the rest of the DOM?',
  ],

  // Events
  'Event bubbling, capturing, and propagation': [
    'In what order do capturing and bubbling phases occur?',
    'What is the difference between stopPropagation and stopImmediatePropagation?',
  ],
  'Event delegation': [
    'What is event delegation and why is it more efficient than attaching listeners to each element?',
    'How do you implement a click handler for a dynamically-added list item using event delegation?',
  ],
  'Debouncing and throttling event handlers': [
    'What is the difference between debounce and throttle?',
    'Implement a simple debounce function.',
    'When would you prefer throttle over debounce (e.g. scroll vs search input)?',
  ],

  // Browser & Web APIs
  'localStorage, sessionStorage, and cookies': [
    'What are the differences between localStorage, sessionStorage, and cookies in terms of scope and lifetime?',
    'What are the security risks of storing a JWT in localStorage?',
  ],
  'fetch API and Request/Response': [
    'How do you handle a non-2xx HTTP response with fetch — does it reject the promise?',
    'How would you add default headers to all fetch requests in a fetch wrapper?',
  ],
  'Intersection Observer, Mutation Observer, Resize Observer': [
    'How would you use IntersectionObserver to implement lazy image loading?',
    'What is the benefit of IntersectionObserver over a scroll event listener?',
  ],
  'Web Workers and Service Workers (overview)': [
    'What can a Web Worker do that a Service Worker cannot (and vice versa)?',
    'How does a Service Worker intercept fetch requests?',
  ],

  // Networking & Data
  'CORS and preflight requests': [
    'What is CORS and why does the browser enforce it?',
    'What triggers a CORS preflight request?',
    'Which response headers does the server need to set for CORS to work?',
  ],
  'Aborting requests with AbortController': [
    'How does AbortController integrate with fetch?',
    'How would you abort an in-flight request when a React component unmounts?',
  ],
  'Same-origin policy': [
    'What constitutes the "origin" in the same-origin policy?',
    'What are the different mechanisms (CORS, JSONP, postMessage) for cross-origin communication?',
  ],

  // Memory Management & Performance
  'Garbage collection (mark-and-sweep)': [
    'How does the mark-and-sweep garbage collector determine what to collect?',
    'Can you force garbage collection in JavaScript? Why or why not?',
  ],
  'Memory leaks and common causes': [
    'List four common causes of memory leaks in JavaScript applications.',
    'How would you detect a memory leak using Chrome DevTools?',
  ],
  'Debouncing and throttling': [
    'Implement a throttle function that fires at most once per 200ms.',
    'Where in your app have you applied debounce or throttle and why?',
  ],
  'Memoization': [
    'Implement a generic memoize function using a Map.',
    'What are the risks of memoizing a function that has side effects?',
  ],

  // Dates & Internationalization
  'The Date object and its pitfalls': [
    'Why does `new Date("2023-01-01")` parse as UTC midnight while `new Date("2023/01/01")` parses as local time?',
    'What library would you reach for instead of Date for complex date manipulation and why?',
  ],
  'Intl.DateTimeFormat, NumberFormat, Collator': [
    'How would you format a number as currency in the user\'s locale using the Intl API?',
    'How does Intl.Collator improve locale-sensitive string sorting?',
  ],

  // Security
  'Cross-Site Scripting (XSS) and sanitization': [
    'What is XSS and what are the three main types?',
    'How does using textContent instead of innerHTML help prevent XSS?',
    'What is DOMPurify and when would you use it?',
  ],
  'Cross-Site Request Forgery (CSRF)': [
    'How does a CSRF attack work? Walk through an example.',
    'What does SameSite=Strict on a cookie prevent?',
  ],
  'eval and Function constructor risks': [
    'Why is eval a security risk and an optimization barrier?',
    'What are alternatives to eval for dynamic code evaluation?',
  ],
  'Prototype pollution': [
    'What is prototype pollution and how can it be exploited?',
    'How would you safely merge two plain objects to avoid prototype pollution?',
  ],

  // Tooling & Environment
  'Browser vs Node.js runtimes': [
    'What global APIs exist in a browser but not in Node.js, and vice versa?',
    'How does module resolution differ between browsers and Node.js?',
  ],
  'Transpilers (Babel) and polyfills': [
    'What is the difference between transpilation (Babel) and a polyfill?',
    'What does `@babel/preset-env` do and how does `browserslist` integrate with it?',
  ],
  'Bundlers (Webpack, Vite, esbuild) — concept': [
    'Why did Vite\'s native-ESM dev server become popular over Webpack\'s bundled dev server?',
    'What is a "chunk" in the context of bundlers and code splitting?',
  ],
  'Debugging with DevTools (breakpoints, console, profiling)': [
    'How would you use a conditional breakpoint to pause only when a certain condition is true?',
    'What is the difference between the Performance tab and the Memory tab in DevTools?',
  ],
};
