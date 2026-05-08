// Part 2: Async JS, Objects & OOP, Advanced Data Handling
Object.assign(conceptsData, {
    // ===== ASYNC JAVASCRIPT =====
    "Callbacks": {
        explanation: "Functions passed as arguments to be executed after an async operation completes. The traditional async pattern. Deep nesting creates 'Callback Hell' (Pyramid of Doom), which Promises solve.",
        code: `fs.readFile('a.txt', (err, a) => {\n  fs.readFile('b.txt', (err, b) => {\n    fs.readFile('c.txt', (err, c) => {\n      console.log(a + b + c); // Callback Hell\n    });\n  });\n});`
    },
    "Promises": {
        explanation: "An object representing the eventual completion or failure of an async operation. States: Pending → Fulfilled or Rejected. Provides .then(), .catch(), .finally() for chaining.",
        code: `const p = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('Done!'), 1000);\n});\np.then(val => console.log(val))\n .catch(err => console.error(err))\n .finally(() => console.log('Cleanup'));`
    },
    "Promise Chaining": {
        explanation: "Each .then() returns a new Promise, allowing sequential async operations. The value returned from one .then() is passed to the next. Errors propagate down to the nearest .catch().",
        code: `fetch('/api/user')\n  .then(res => res.json())\n  .then(user => fetch('/api/posts/' + user.id))\n  .then(res => res.json())\n  .then(posts => console.log(posts))\n  .catch(err => console.error(err));`
    },
    "Promise APIs": {
        explanation: "Promise.all → resolves when ALL resolve, rejects on first rejection. Promise.race → resolves/rejects with the first settled. Promise.allSettled → waits for all, never rejects. Promise.any → resolves with first fulfillment.",
        code: `const p1 = fetch('/api/a');\nconst p2 = fetch('/api/b');\n\nPromise.all([p1, p2]).then(([a, b]) => {});\nPromise.race([p1, p2]).then(first => {});\nPromise.allSettled([p1, p2]).then(results => {});\nPromise.any([p1, p2]).then(firstSuccess => {});`
    },
    "Async/Await": {
        explanation: "Syntactic sugar over Promises. 'async' functions always return a Promise. 'await' pauses execution until the Promise settles. Use try/catch for error handling. Makes async code look synchronous.",
        code: `async function loadUser() {\n  try {\n    const res = await fetch('/api/user');\n    const user = await res.json();\n    return user;\n  } catch (err) {\n    console.error('Failed:', err);\n  }\n}`
    },
    "Error Handling": {
        explanation: "Sync errors: try/catch/finally. Async errors: .catch() for Promises, try/catch with async/await. Unhandled rejections crash Node.js. Always handle errors at the boundary.",
        code: `// Async/Await\nasync function safeFetch(url) {\n  try {\n    const res = await fetch(url);\n    if (!res.ok) throw new Error(res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Fetch failed:', err.message);\n    return null;\n  }\n}`
    },
    "Fetch API": {
        explanation: "Modern browser API for making HTTP requests. Returns a Promise. Replaces XMLHttpRequest. Does NOT reject on HTTP error status (404, 500)—you must check response.ok manually.",
        code: `const res = await fetch('/api/data', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'Abhishek' }),\n});\nif (!res.ok) throw new Error('HTTP ' + res.status);\nconst data = await res.json();`
    },
    "AbortController": {
        explanation: "Allows you to cancel one or more fetch requests. Create an AbortController, pass its signal to fetch, then call abort() to cancel. Essential for React useEffect cleanup.",
        code: `const controller = new AbortController();\nfetch('/api/data', { signal: controller.signal })\n  .then(res => res.json())\n  .catch(err => {\n    if (err.name === 'AbortError') console.log('Cancelled');\n  });\n\n// Cancel the request\ncontroller.abort();`
    },
    "Async Iterators": {
        explanation: "Allow iterating over async data sources using 'for await...of'. The iterable must implement Symbol.asyncIterator. Useful for streaming data, paginated APIs, and WebSocket messages.",
        code: `async function* fetchPages(url) {\n  let page = 1;\n  while (true) {\n    const res = await fetch(url + '?page=' + page++);\n    const data = await res.json();\n    if (!data.length) return;\n    yield data;\n  }\n}\nfor await (const page of fetchPages('/api')) { console.log(page); }`
    },
    "Web Workers": {
        explanation: "Run scripts in background threads, separate from the main UI thread. Communication via postMessage/onmessage. Cannot access DOM. Ideal for CPU-intensive tasks like image processing or data parsing.",
        code: `// main.js\nconst worker = new Worker('worker.js');\nworker.postMessage({ data: largeArray });\nworker.onmessage = (e) => console.log(e.data);\n\n// worker.js\nself.onmessage = (e) => {\n  const result = heavyComputation(e.data);\n  self.postMessage(result);\n};`
    },

    // ===== OBJECTS & OOP =====
    "Prototype & Prototype Chain": {
        explanation: "Every object has a hidden [[Prototype]] linking to another object. When a property is accessed, JS walks up the chain until found or null. Object.prototype is the top of the chain.",
        code: `const animal = { eats: true };\nconst dog = Object.create(animal);\ndog.barks = true;\nconsole.log(dog.eats);  // true (from prototype)\nconsole.log(dog.barks); // true (own property)`
    },
    "Prototype": {
        explanation: "Every object has a hidden [[Prototype]] linking to another object. When a property is accessed, JS walks up the chain until found or null. Object.prototype is the top of the chain.",
        code: `function Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function() {\n  return 'Hi, ' + this.name;\n};\nconst p = new Person('Abhishek');\np.greet(); // 'Hi, Abhishek'`
    },
    "Prototypal Inheritance": {
        explanation: "Objects inherit directly from other objects via the prototype chain. Unlike classical inheritance (Java/C++), there are no classes—only objects linking to other objects. ES6 classes are syntactic sugar over this.",
        code: `const base = { type: 'vehicle', describe() { return this.type; } };\nconst car = Object.create(base);\ncar.type = 'car';\nconsole.log(car.describe()); // 'car'`
    },
    "Constructor Functions": {
        explanation: "Functions invoked with 'new' that create object instances. 'new' creates a blank object, sets its prototype, binds 'this', and returns it. Convention: capitalize the function name.",
        code: `function Car(make, year) {\n  this.make = make;\n  this.year = year;\n}\nCar.prototype.info = function() {\n  return this.make + ' ' + this.year;\n};\nconst c = new Car('Tesla', 2024);`
    },
    "Classes": {
        explanation: "ES6 syntactic sugar over prototypal inheritance. Provides constructor, methods, static methods, getters/setters, and 'extends' for inheritance. Under the hood, it's still prototype-based.",
        code: `class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return this.name + ' makes a sound'; }\n}\nclass Dog extends Animal {\n  speak() { return this.name + ' barks'; }\n}\nnew Dog('Rex').speak(); // 'Rex barks'`
    },
    "Encapsulation": {
        explanation: "Hiding internal state and requiring interaction through public methods. ES2022 introduced private fields (#) and private methods. Before that, closures or conventions (_prefix) were used.",
        code: `class BankAccount {\n  #balance = 0;\n  deposit(amount) { this.#balance += amount; }\n  get balance() { return this.#balance; }\n}\nconst acc = new BankAccount();\nacc.deposit(100);\n// acc.#balance; // SyntaxError: private field`
    },
    "Inheritance": {
        explanation: "Creating new classes from existing ones using 'extends'. The child class inherits all methods and can override them. Use 'super()' to call the parent constructor and 'super.method()' for parent methods.",
        code: `class Shape {\n  constructor(color) { this.color = color; }\n  area() { return 0; }\n}\nclass Circle extends Shape {\n  constructor(color, r) { super(color); this.r = r; }\n  area() { return Math.PI * this.r ** 2; }\n}`
    },
    "Polymorphism": {
        explanation: "The ability of different classes to respond to the same method call in different ways. Achieved by overriding methods in subclasses. JS supports runtime polymorphism through the prototype chain.",
        code: `class Shape { area() { return 0; } }\nclass Circle extends Shape { area() { return Math.PI * this.r ** 2; } }\nclass Rect extends Shape { area() { return this.w * this.h; } }\n\n[new Circle(), new Rect()].forEach(s => console.log(s.area()));`
    },
    "Static Methods": {
        explanation: "Methods called on the class itself, not on instances. Used for utility functions related to the class. Defined with the 'static' keyword. Cannot access instance properties via 'this'.",
        code: `class MathUtils {\n  static add(a, b) { return a + b; }\n  static random(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n  }\n}\nMathUtils.add(2, 3); // 5`
    },
    "Getters & Setters": {
        explanation: "Special methods that intercept property access (get) and assignment (set). Defined with 'get' and 'set' keywords. Allow computed properties and validation without explicit method calls.",
        code: `class User {\n  #name;\n  constructor(name) { this.#name = name; }\n  get name() { return this.#name.toUpperCase(); }\n  set name(val) {\n    if (val.length < 2) throw new Error('Too short');\n    this.#name = val;\n  }\n}`
    },
    "Object Descriptors": {
        explanation: "Every object property has a descriptor with: value, writable (can change?), enumerable (shows in for...in?), configurable (can delete/redefine?). Use Object.defineProperty to set them.",
        code: `const obj = {};\nObject.defineProperty(obj, 'id', {\n  value: 42,\n  writable: false,\n  enumerable: true,\n  configurable: false\n});\nobj.id = 99; // Silently fails (strict: TypeError)`
    },
    "Object.create": {
        explanation: "Creates a new object with the specified prototype. More explicit than 'new'. Allows true prototypal inheritance without constructor functions. Pass null for a dictionary with no prototype.",
        code: `const proto = { greet() { return 'Hi ' + this.name; } };\nconst obj = Object.create(proto);\nobj.name = 'Abhishek';\nobj.greet(); // 'Hi Abhishek'`
    },
    "Object.freeze / seal": {
        explanation: "freeze: Makes object fully immutable—no add, delete, or modify properties. seal: Allows modifying existing properties but not adding/deleting. Both are SHALLOW—nested objects are still mutable.",
        code: `const obj = { a: 1, nested: { b: 2 } };\nObject.freeze(obj);\nobj.a = 99;        // Silently fails\nobj.nested.b = 99; // WORKS! (shallow freeze)\n\n// Deep freeze:\nfunction deepFreeze(o) {\n  Object.freeze(o);\n  Object.values(o).forEach(v => typeof v === 'object' && deepFreeze(v));\n}`
    },
    "Deep vs Shallow Copy": {
        explanation: "Shallow copy: copies top-level properties; nested objects are still references (spread, Object.assign). Deep copy: recursively copies everything (structuredClone, JSON parse/stringify, custom recursion).",
        code: `const orig = { a: 1, nested: { b: 2 } };\n\n// Shallow\nconst shallow = { ...orig };\nshallow.nested.b = 99; // Mutates original!\n\n// Deep\nconst deep = structuredClone(orig);\ndeep.nested.b = 99; // Original unchanged`
    },

    // ===== ADVANCED DATA HANDLING =====
    "Map": {
        explanation: "Key-value collection where keys can be ANY type (objects, functions, etc.). Maintains insertion order. Better than plain objects for frequent add/delete operations. Has .size property.",
        code: `const map = new Map();\nconst objKey = { id: 1 };\nmap.set(objKey, 'user data');\nmap.set('name', 'Abhishek');\nconsole.log(map.get(objKey)); // 'user data'\nconsole.log(map.size); // 2`
    },
    "WeakMap": {
        explanation: "Like Map but keys MUST be objects and are weakly held—they can be garbage collected if no other references exist. Not iterable, no .size. Used for private data and caching without causing memory leaks.",
        code: `const cache = new WeakMap();\nfunction process(obj) {\n  if (cache.has(obj)) return cache.get(obj);\n  const result = expensiveCalc(obj);\n  cache.set(obj, result);\n  return result;\n}\n// When obj is GC'd, cache entry is auto-removed`
    },
    "Set": {
        explanation: "A collection of unique values. Automatically deduplicates. Maintains insertion order. Useful for removing duplicates from arrays and fast existence checks.",
        code: `const set = new Set([1, 2, 2, 3, 3]);\nconsole.log([...set]); // [1, 2, 3]\nset.add(4);\nset.has(2); // true\nset.delete(1);\nconsole.log(set.size); // 3`
    },
    "WeakSet": {
        explanation: "Like Set but only holds objects, weakly. Objects can be garbage collected. Not iterable. Used for tagging objects (e.g., tracking which DOM nodes have been processed).",
        code: `const visited = new WeakSet();\nfunction processNode(node) {\n  if (visited.has(node)) return; // Already done\n  visited.add(node);\n  // process...\n}`
    },
    "Symbol": {
        explanation: "A unique, immutable primitive used as object property keys. Every Symbol() is unique. Prevents property name collisions. Well-known symbols (Symbol.iterator, Symbol.toPrimitive) customize object behavior.",
        code: `const id = Symbol('id');\nconst user = { [id]: 123, name: 'Abhishek' };\nconsole.log(user[id]); // 123\nconsole.log(Object.keys(user)); // ['name'] - Symbol hidden`
    },
    "BigInt": {
        explanation: "A numeric primitive for integers larger than Number.MAX_SAFE_INTEGER (2^53 - 1). Created with 'n' suffix or BigInt(). Cannot mix with regular numbers without explicit conversion.",
        code: `const big = 9007199254740991n + 1n;\nconsole.log(big); // 9007199254740992n\n// Cannot mix: big + 1 // TypeError\nconsole.log(big + BigInt(1)); // Works`
    },
    "Typed Arrays": {
        explanation: "Array-like views over raw binary data (ArrayBuffer). Types include Int8Array, Uint8Array, Float32Array, Float64Array. Used in WebGL, WebAudio, file processing, and network protocols.",
        code: `const buffer = new ArrayBuffer(8);\nconst view = new Float64Array(buffer);\nview[0] = 3.14;\nconsole.log(view[0]); // 3.14`
    },
    "ArrayBuffer": {
        explanation: "A fixed-length, raw binary data buffer. Cannot be directly read/written—must use a TypedArray or DataView. Foundation for file I/O, WebSockets binary data, and image manipulation.",
        code: `const buf = new ArrayBuffer(16); // 16 bytes\nconst int32 = new Int32Array(buf); // 4 elements (4 bytes each)\nint32[0] = 42;\nconst dv = new DataView(buf);\nconsole.log(dv.getInt32(0)); // 42`
    },
});
