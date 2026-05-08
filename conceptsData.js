const conceptsData = {
    // ===== CORE LANGUAGE INTERNALS =====
    "Execution Context": {
        explanation: "The environment where JS code is executed. Three types: Global, Function, Eval. Each has a Creation Phase (memory allocation for vars/functions) and Execution Phase (code runs line-by-line). The Variable Environment, Lexical Environment, and 'this' binding are set during creation.",
        code: `var x = 10;\nfunction foo() {\n  var y = 20; // New Function Execution Context\n  console.log(x + y); // 30\n}\nfoo(); // Pushed onto Call Stack`
    },
    "Call Stack": {
        explanation: "A LIFO data structure tracking function calls. When a function is called, its execution context is pushed on top. When it returns, it's popped off. Stack overflow happens during infinite recursion.",
        code: `function first() { second(); }\nfunction second() { third(); }\nfunction third() { console.log('done'); }\nfirst();\n// Stack: Global -> first() -> second() -> third()`
    },
    "Memory Heap": {
        explanation: "An unstructured region of memory where objects, arrays, and functions are dynamically allocated. The stack holds references (pointers) to data stored in the heap.",
        code: `const obj = { name: 'JS' }; // Stored in Heap\nconst arr = [1, 2, 3];     // Stored in Heap\n// 'obj' and 'arr' on stack hold references to heap locations`
    },
    "Scope Chain": {
        explanation: "When a variable is accessed, JS looks in the current scope first, then walks up to parent scopes until global. This chain of scopes is determined by lexical nesting of functions.",
        code: `const global = 'G';\nfunction outer() {\n  const outerVar = 'O';\n  function inner() {\n    console.log(global, outerVar); // Found via scope chain\n  }\n  inner();\n}\nouter();`
    },
    "Lexical Scope": {
        explanation: "Scope is determined at write-time (where functions are defined), not at call-time. A function always has access to variables from the scope in which it was declared.",
        code: `function outer() {\n  const x = 10;\n  function inner() {\n    console.log(x); // 10 - lexically scoped\n  }\n  return inner;\n}\nconst fn = outer();\nfn(); // Still prints 10`
    },
    "Hoisting": {
        explanation: "'var' declarations and function declarations are moved to the top of their scope during compilation. 'var' is initialized as undefined. 'let'/'const' are hoisted but NOT initialized (TDZ). Function expressions are NOT hoisted.",
        code: `console.log(a); // undefined\nvar a = 5;\n\nfoo(); // Works!\nfunction foo() { console.log('hoisted'); }\n\n// bar(); // TypeError: bar is not a function\nvar bar = function() {};`
    },
    "Temporal Dead Zone (TDZ)": {
        explanation: "The period between entering a block scope and the point where a let/const variable is declared. Accessing it in this zone throws a ReferenceError. This exists to catch bugs from using variables before declaration.",
        code: `{\n  // TDZ starts for 'x'\n  console.log(x); // ReferenceError!\n  let x = 10;     // TDZ ends\n}`
    },
    "Closures": {
        explanation: "A closure is a function that retains access to its outer scope's variables even after the outer function has returned. Every function in JS forms a closure. This is the foundation of data privacy, callbacks, and React hooks.",
        code: `function counter() {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    getCount: () => count\n  };\n}\nconst c = counter();\nc.increment(); c.increment();\nconsole.log(c.getCount()); // 2`
    },
    "this keyword": {
        explanation: "'this' depends on HOW a function is called: 1) Global context → window/global. 2) Object method → the object. 3) call/apply/bind → explicitly set. 4) Arrow function → inherits from lexical parent. 5) 'new' keyword → the new instance.",
        code: `const obj = {\n  name: 'Abhishek',\n  greet() { console.log(this.name); },  // 'Abhishek'\n  arrow: () => console.log(this.name),  // undefined (lexical)\n};\nobj.greet();\nobj.arrow();`
    },
    "Strict Mode": {
        explanation: "'use strict' enables a restricted variant of JS. It prevents accidental globals, disallows duplicate params, makes 'this' undefined in plain function calls, and throws errors for silent failures.",
        code: `'use strict';\nx = 10; // ReferenceError: x is not defined\nfunction foo(a, a) {} // SyntaxError: duplicate param\ndelete Object.prototype; // TypeError`
    },
    "Event Loop": {
        explanation: "JS is single-threaded. The Event Loop monitors the Call Stack and Task Queues. When the stack is empty, it first processes all Microtasks (Promises, queueMicrotask), then one Macrotask (setTimeout, setInterval, I/O).",
        code: `console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');\n// Output: 1, 4, 3, 2`
    },
    "Microtasks vs Macrotasks": {
        explanation: "Microtasks (Promise.then, queueMicrotask, MutationObserver) have HIGHER priority than Macrotasks (setTimeout, setInterval, setImmediate, I/O). ALL microtasks are flushed before the next macrotask runs.",
        code: `setTimeout(() => console.log('macro'), 0);\nPromise.resolve().then(() => console.log('micro 1'));\nPromise.resolve().then(() => console.log('micro 2'));\n// Output: micro 1, micro 2, macro`
    },
    "Garbage Collection": {
        explanation: "JS uses Mark-and-Sweep: the GC starts from 'roots' (global, stack), marks all reachable objects, and sweeps (frees) unreachable ones. Common leaks: forgotten timers, detached DOM nodes, closures holding references.",
        code: `let obj = { data: 'large' };\nobj = null; // Now eligible for GC\n\n// Leak example:\nsetInterval(() => {\n  console.log(hugeObject); // hugeObject never GC'd\n}, 1000);`
    },

    // ===== FUNCTIONS =====
    "Higher Order Functions": {
        explanation: "Functions that take other functions as arguments OR return functions. Core to functional programming in JS. Examples: map, filter, reduce, sort, forEach.",
        code: `const nums = [1, 2, 3, 4, 5];\nconst evens = nums.filter(n => n % 2 === 0); // [2, 4]\nconst sum = nums.reduce((acc, n) => acc + n, 0); // 15`
    },
    "Callback Functions": {
        explanation: "A function passed as an argument to another function, to be invoked later. Used heavily in async patterns (event handlers, timers, Node.js APIs). Can lead to 'Callback Hell' when deeply nested.",
        code: `function fetchData(callback) {\n  setTimeout(() => {\n    callback('Data received');\n  }, 1000);\n}\nfetchData(data => console.log(data));`
    },
    "First Class Functions": {
        explanation: "In JS, functions are first-class citizens: they can be assigned to variables, passed as arguments, returned from functions, and stored in data structures. This enables functional programming patterns.",
        code: `const greet = function(name) { return 'Hi ' + name; };\nconst fns = [greet, n => n.toUpperCase()];\nconsole.log(fns[0]('Abhishek')); // 'Hi Abhishek'`
    },
    "Pure Functions": {
        explanation: "A pure function: 1) Always returns the same output for the same input. 2) Has no side effects (no API calls, no DOM changes, no mutations). Essential for predictability, testing, and React rendering.",
        code: `// Pure\nconst add = (a, b) => a + b;\n\n// Impure (side effect)\nlet total = 0;\nconst addToTotal = (x) => { total += x; return total; };`
    },
    "Currying": {
        explanation: "Transforming a function f(a, b, c) into f(a)(b)(c). Each call returns a new function until all arguments are provided. Enables partial application and function reuse.",
        code: `const multiply = a => b => a * b;\nconst double = multiply(2);\nconst triple = multiply(3);\nconsole.log(double(5)); // 10\nconsole.log(triple(5)); // 15`
    },
    "Function Composition": {
        explanation: "Combining two or more functions to produce a new function. The output of one function becomes the input of the next. Reads right-to-left: compose(f, g)(x) = f(g(x)).",
        code: `const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);\nconst add1 = x => x + 1;\nconst double = x => x * 2;\nconst add1ThenDouble = compose(double, add1);\nconsole.log(add1ThenDouble(5)); // 12`
    },
    "IIFE": {
        explanation: "Immediately Invoked Function Expression. A function that runs as soon as it's defined. Used to create private scope and avoid polluting the global namespace. Was essential before ES6 modules.",
        code: `(function() {\n  const secret = 'hidden';\n  console.log(secret); // 'hidden'\n})();\n// console.log(secret); // ReferenceError`
    },
    "Debouncing": {
        explanation: "Delays function execution until after a specified wait time has elapsed since the last call. If called again within the wait period, the timer resets. Ideal for search inputs, window resize handlers.",
        code: `function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\nconst search = debounce(query => fetch('/api?q=' + query), 300);`
    },
    "Throttling": {
        explanation: "Ensures a function executes at most once every specified interval, regardless of how many times it's triggered. Ideal for scroll events, mouse move, and API rate limiting.",
        code: `function throttle(fn, limit) {\n  let inThrottle = false;\n  return function(...args) {\n    if (!inThrottle) {\n      fn.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}`
    },
    "Memoization": {
        explanation: "Caching the results of expensive function calls. When the same inputs occur again, the cached result is returned instead of recomputing. Used in React via useMemo and React.memo.",
        code: `function memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  };\n}`
    },
    "Generator Functions": {
        explanation: "Functions declared with function* that can pause execution with 'yield' and resume later. They return an iterator object. Useful for lazy evaluation, infinite sequences, and async flow control.",
        code: `function* idGenerator() {\n  let id = 0;\n  while (true) yield ++id;\n}\nconst gen = idGenerator();\nconsole.log(gen.next().value); // 1\nconsole.log(gen.next().value); // 2`
    },
    "Iterators & Iterables": {
        explanation: "An Iterable is an object implementing Symbol.iterator, returning an Iterator. An Iterator has a next() method returning { value, done }. Arrays, Strings, Maps, Sets are built-in iterables.",
        code: `const range = {\n  from: 1, to: 3,\n  [Symbol.iterator]() {\n    let current = this.from;\n    return {\n      next: () => current <= this.to\n        ? { value: current++, done: false }\n        : { done: true }\n    };\n  }\n};\nfor (const n of range) console.log(n); // 1, 2, 3`
    },
    "Recursion": {
        explanation: "A function calling itself until a base case is met. Every recursive solution can be converted to iteration. Watch out for stack overflow on large inputs—use tail-call optimization or iteration.",
        code: `function factorial(n) {\n  if (n <= 1) return 1; // Base case\n  return n * factorial(n - 1); // Recursive case\n}\nconsole.log(factorial(5)); // 120`
    },
};
