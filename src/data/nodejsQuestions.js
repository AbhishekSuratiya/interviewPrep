// Interview questions + answers per Node.js checklist topic.
// Keyed by the exact topic string used in checklistTopics.js (section id: 'nodejs').
export const nodejsQuestions = {
  'Node.js architecture: V8 + libuv': [
    { q: 'How do V8 and libuv divide responsibilities in Node.js?', a: 'V8 executes JavaScript — parsing, compiling, and running your code, and managing the JS heap/garbage collection. libuv is a separate C library providing the event loop, a thread pool for offloading blocking operations (file I/O, some crypto), and cross-platform async I/O primitives. Node.js is the glue binding these together with core APIs (fs, http, etc.) built on top of libuv.' },
    { q: 'Why can Node handle thousands of concurrent connections with a single thread?', a: 'Because network I/O is handled by the OS\'s native async mechanisms (epoll on Linux, kqueue on macOS, IOCP on Windows) via libuv, not by dedicating a thread per connection — the single JS thread just registers callbacks and moves on, only running JS again when the OS/libuv signals that data is ready, letting one thread juggle many in-flight connections efficiently.' },
  ],
  'Event loop phases (timers, poll, check, close)': [
    { q: 'What are the main phases of the Node.js event loop, in order?', a: 'timers (due setTimeout/setInterval callbacks), pending callbacks (certain system callbacks), poll (retrieve new I/O events, run their callbacks), check (setImmediate callbacks), and close callbacks (like socket close events) — the loop cycles through these phases repeatedly, and process.nextTick/Promise microtasks drain fully between every phase and callback.' },
    { q: 'Why does setImmediate fire before setTimeout(fn, 0) when both are scheduled inside an I/O callback?', a: 'Because the poll phase (where I/O callbacks run) is immediately followed by the check phase (where setImmediate callbacks run) in the event loop\'s fixed phase order — so anything scheduled with setImmediate during an I/O callback executes in that very next check phase, before the timers phase (setTimeout) is reached again on the following loop iteration.' },
  ],
  'process.nextTick vs Promise microtasks': [
    { q: 'What is the difference between process.nextTick and Promise-based microtasks in terms of priority?', a: 'Both are microtasks that run before the event loop proceeds to the next phase, but process.nextTick\'s queue is drained completely before the Promise microtask queue is processed — meaning nextTick callbacks always run strictly before Promise .then() callbacks, even if the Promise was scheduled first.' },
    { q: 'Why can recursive process.nextTick calls starve the event loop?', a: 'Because the nextTick queue must be fully emptied before the event loop can proceed to any other phase — if a nextTick callback keeps scheduling more nextTick callbacks, the queue never actually empties, so timers, I/O, and everything else in the event loop never get a chance to run at all.' },
  ],
  'Non-blocking I/O model': [
    { q: 'What does "non-blocking I/O" mean in the context of Node.js?', a: 'It means initiating an I/O operation (file read, network request) returns control to the JS thread immediately rather than waiting for the operation to complete — a callback (or Promise) is registered and invoked later once the OS/libuv signals the operation finished, letting the single thread handle other work in the meantime instead of sitting idle.' },
    { q: 'Why is non-blocking I/O well-suited for I/O-bound workloads but not CPU-bound ones?', a: 'I/O-bound workloads spend most of their time waiting on external systems (disk, network, database) rather than computing — non-blocking I/O lets Node handle many such waits concurrently on one thread. CPU-bound work keeps the single JS thread actively busy computing, which blocks everything else regardless of I/O model, since there\'s no "waiting" to offload — that requires worker_threads or a separate process instead.' },
  ],
  'Single-threaded JS execution vs multi-threaded libuv thread pool': [
    { q: 'Is Node.js truly single-threaded?', a: 'JavaScript execution itself is single-threaded — only one JS callback runs at a time, never in parallel with another. But Node as a whole uses multiple OS threads under the hood: libuv\'s thread pool (default 4 threads) handles blocking operations like file I/O and some crypto/zlib work, running genuinely in parallel with the main JS thread.' },
    { q: 'What kinds of operations use the libuv thread pool by default?', a: 'File system operations (most fs functions), some crypto functions (pbkdf2, scrypt), zlib compression, and DNS lookups via dns.lookup() (though dns.resolve() uses the OS\'s async resolver instead) — these are dispatched to the thread pool since the underlying OS APIs for them are often blocking, unlike network sockets which have native async OS support.' },
  ],
  'CommonJS vs ES Modules in Node': [
    { q: 'How does Node determine whether a file is CommonJS or an ES Module?', a: 'By file extension (.cjs is always CommonJS, .mjs is always ESM) or, for plain .js files, by the nearest enclosing package.json\'s "type" field ("module" for ESM, or the default "commonjs" if omitted/set to "commonjs").' },
    { q: 'What is a key interop limitation between the two module systems?', a: 'An ESM file can import a CommonJS module fairly seamlessly (getting module.exports as the default export). But a CommonJS file cannot synchronously require() an ESM module at all — since ESM resolution is inherently asynchronous — you\'d need a dynamic import() call (which returns a Promise) instead.' },
  ],
  'require() resolution algorithm': [
    { q: 'How does Node resolve a bare module specifier like require("lodash")?', a: 'Node looks for a node_modules folder starting in the current directory, and if not found there, walks up through each parent directory\'s node_modules until found (or reaches the filesystem root, in which case it throws MODULE_NOT_FOUND) — this is why a package installed at the project root is resolvable from any nested file within the project.' },
    { q: 'How does require() caching affect module behavior?', a: 'Node caches the exported value of a module the first time it\'s required, keyed by resolved file path — subsequent require() calls for the same file return the exact same cached export object rather than re-executing the module, which is why module-level state (like a singleton instance) persists and is shared across every file that requires it.' },
  ],

  'Error-first callback convention': [
    { q: 'What is the error-first callback convention in Node.js?', a: 'A convention where an async function\'s callback is always called with the error (or null, if none) as its first argument, followed by the actual result — fn(args, (err, result) => {...}) — letting callers consistently check for an error before using the result, a pattern predating Promises in Node\'s core APIs.' },
    { q: 'What is a common bug pattern when handling error-first callbacks?', a: 'Forgetting to check the error argument before using the result — if err is truthy but the code proceeds to use result anyway (which may be undefined or invalid), it can cause confusing downstream failures instead of a clear, immediate error-handling path.' },
  ],
  'util.promisify and native .promises APIs': [
    { q: 'What does util.promisify do?', a: 'It converts an error-first callback-style function into one that returns a Promise instead — the returned function resolves with the callback\'s success value or rejects with the error, letting you use async/await with legacy callback-based APIs without manually wrapping them in a `new Promise()` each time.' },
    { q: 'Why would you prefer fs.promises.readFile over util.promisify(fs.readFile)?', a: 'Many core Node modules now ship an official, already-promisified namespace (fs.promises, dns.promises) maintained directly by Node itself — using these avoids the small overhead and potential edge-case mismatches of manually promisifying the callback version yourself, and is the officially recommended, more idiomatic approach.' },
  ],
  'Readable, Writable, Duplex, and Transform streams': [
    { q: 'What are the four core stream types in Node and what does each represent?', a: 'Readable (a source of data you read from, like fs.createReadStream), Writable (a destination you write data to, like fs.createWriteStream), Duplex (both readable and writable, like a TCP socket), and Transform (a Duplex stream that modifies data as it passes through, like zlib.createGzip()).' },
    { q: 'Why are streams preferred over loading an entire file into memory for large data?', a: 'Streams process data in small chunks as it becomes available, keeping memory usage roughly constant regardless of the total data size — loading an entire large file into memory at once (e.g. via readFileSync) can exhaust available memory and is far less efficient for genuinely large files or continuous data sources.' },
  ],
  'Backpressure and stream.pipeline()': [
    { q: 'What is backpressure in the context of Node streams?', a: 'It\'s the mechanism preventing a fast data producer from overwhelming a slower consumer — when a Writable stream\'s internal buffer is full, its write() method returns false, signaling the producer to pause until a "drain" event fires indicating the buffer has room again.' },
    { q: 'Why is stream.pipeline() preferred over manually chaining .pipe() calls?', a: 'pipeline() automatically forwards errors from any stream in the chain and ensures all streams are properly cleaned up (destroyed) if any one of them errors or completes — manually piped streams require you to hand-write this error propagation and cleanup logic yourself, which is easy to get wrong or forget entirely, leading to resource leaks on error.' },
  ],
  'EventEmitter pattern and memory leak risks': [
    { q: 'How does the EventEmitter pattern differ from a Promise for handling async results?', a: 'A Promise represents a single eventual result that settles exactly once. An EventEmitter can fire the same named event any number of times over its lifetime, making it suited for genuinely repeating occurrences (a stream\'s repeated "data" events) rather than a one-time async result.' },
    { q: 'What causes a "MaxListenersExceededWarning" and why does it matter?', a: 'It fires when more than the default limit (10) of listeners are registered for a single event on one emitter — usually indicating listeners are being added repeatedly (e.g. inside a function called on every request) without ever being removed, which is a memory leak pattern; the warning exists specifically to help catch this before it silently degrades performance/memory over time.' },
  ],
  'Async iterators and for await...of with streams': [
    { q: 'How do async iterators let you consume a Readable stream with for await...of?', a: 'Node\'s Readable streams implement the async iterator protocol (Symbol.asyncIterator), so you can write `for await (const chunk of readableStream) { ... }` to process each chunk as it arrives, sequentially, with backpressure automatically respected — a much more readable alternative to manually attaching "data"/"end" event listeners.' },
    { q: 'What happens if an error occurs while iterating a stream with for await...of?', a: 'The error is thrown at the point of iteration, so it can be caught with a regular try/catch wrapping the loop — Node also handles cleanup of the underlying stream automatically in this case, unlike manually-wired event listeners where you\'d need to explicitly handle the stream\'s "error" event yourself.' },
  ],

  'fs module: sync, callback, and promise variants': [
    { q: 'When is it acceptable to use a synchronous fs method like readFileSync?', a: 'In short-lived scripts or at application startup (reading a config file before the server starts accepting requests) where there\'s no concurrent request handling to block — it should be avoided inside request-handling code in a running server, since it would freeze the single event loop thread for every concurrent request during the read.' },
    { q: 'What is the benefit of require("fs/promises") over the callback-based fs API?', a: 'It gives you Promise-returning versions of every fs function, letting you use async/await for cleaner, more linear-reading code with standard try/catch error handling, instead of nested error-first callbacks.' },
  ],
  'http/https module and creating a raw server': [
    { q: 'What does http.createServer(handler) actually do?', a: 'It creates a server object that, on receiving each incoming request, invokes your handler function with (req, res) — req is a Readable stream representing the incoming request, and res is a Writable stream you use to construct and send the response; every framework (Express, Fastify) is ultimately built as a layer on top of this same primitive.' },
    { q: 'What is the key difference between the http and https modules?', a: 'https requires TLS certificate/key configuration to encrypt traffic (createServer takes an options object with cert/key), while http serves plain unencrypted traffic — otherwise their core request/response handling API is nearly identical.' },
  ],
  'path and os modules': [
    { q: 'Why should you always use path.join() instead of manually concatenating path strings?', a: 'Because path separators differ across operating systems (backslash on Windows, forward slash on POSIX systems) — manual string concatenation with hardcoded separators breaks cross-platform compatibility, while path.join() automatically uses the correct separator for the current platform.' },
    { q: 'What kind of information does the os module expose?', a: 'System-level information like os.platform() (the OS type), os.cpus() (core count/details, often used to size a worker pool), os.totalmem()/os.freemem() (memory stats), and os.homedir() — useful for adapting behavior to the runtime environment or reporting system health.' },
  ],
  'Buffer and binary data handling': [
    { q: 'Why does Node need a separate Buffer type instead of using regular JS strings for binary data?', a: 'JavaScript strings are UTF-16 text and weren\'t designed to represent arbitrary raw binary data (like image bytes or network packets) — Buffer provides a fixed-size, raw-byte data structure suited for file I/O, network protocols, and binary processing, distinct from the encoding-specific nature of strings.' },
    { q: 'How do you convert between a Buffer and a string?', a: 'buffer.toString(encoding) converts a Buffer to a string using the specified encoding (utf8, base64, hex, etc.), and Buffer.from(str, encoding) converts a string back into a Buffer using that encoding — many fs/network APIs return a Buffer by default unless you explicitly pass an encoding option.' },
  ],
  'child_process: spawn, exec, fork': [
    { q: 'What is the difference between spawn, exec, and fork in the child_process module?', a: 'spawn launches a new process and streams its stdout/stderr incrementally, suited for long-running processes or large output. exec also launches a process but buffers all output into memory and returns it in a single callback, suited for short commands with modest output. fork is a specialized spawn specifically for launching another Node.js process, setting up an IPC channel for structured message passing between parent and child.' },
    { q: 'Why would you use fork over spawn for running background Node.js work?', a: 'fork sets up a built-in message-passing communication channel (child.send()/process.on(\'message\')) between the parent and child Node processes, letting you exchange structured JS objects easily — spawn only gives you raw stdio streams, requiring you to implement your own serialization protocol over stdin/stdout if you need structured communication.' },
  ],
  'crypto module basics (hashing, HMAC)': [
    { q: 'What is the difference between a hash and an HMAC in Node\'s crypto module?', a: 'A hash (crypto.createHash) produces a fixed-size digest from input data with no secret key involved, useful for checksums/integrity verification but not for authentication (anyone can compute the same hash). An HMAC (crypto.createHmac) combines a hash function with a secret key, producing a digest that also proves the sender possessed that secret key, making it suitable for verifying message authenticity, not just integrity.' },
    { q: 'Why should you never use crypto.createHash for hashing passwords?', a: 'Generic hash functions (SHA-256, etc.) are designed to be extremely fast, which makes them poorly suited for password storage — an attacker with a stolen hash database can brute-force guess passwords very quickly. Password-specific hashing algorithms like bcrypt or argon2 are deliberately slow and include salting, making brute-force attacks impractically expensive.' },
  ],
  'net module and raw TCP sockets (overview)': [
    { q: 'What does the net module provide, and when would you use it directly instead of http?', a: 'The net module provides low-level TCP socket creation and server functionality (net.createServer, net.connect) — you\'d use it directly when building a custom protocol that isn\'t HTTP (a custom binary protocol, a chat server with a proprietary message format) rather than a standard request/response web API, where http/https is the appropriate higher-level abstraction instead.' },
  ],

  'Express middleware pipeline and next()': [
    { q: 'What is the middleware signature in Express and what does next() do?', a: 'Middleware functions have the signature (req, res, next) — they can inspect/modify req and res, end the request-response cycle directly (res.send/res.json), or call next() to pass control to the next matching middleware/route handler in the chain; forgetting to call next() (when not ending the response) causes the request to hang indefinitely.' },
    { q: 'How does the order of app.use() calls affect request handling?', a: 'Middleware runs in the exact order it was registered for a matching request — earlier-registered middleware always executes before later-registered middleware, which is why things like body-parsing or auth-checking middleware must be registered before the route handlers that depend on their effects (like req.body being populated).' },
  ],
  'Router-level vs application-level middleware': [
    { q: 'What is the difference between application-level and router-level middleware in Express?', a: 'Application-level middleware is attached directly to the app instance via app.use()/app.METHOD() and applies to matching requests across the whole app. Router-level middleware is attached to an express.Router() instance instead, letting you group related routes and their shared middleware into a modular, mountable sub-application (e.g. app.use(\'/api/users\', userRouter)).' },
  ],
  'REST API design conventions': [
    { q: 'What makes a URL "RESTful" according to convention?', a: 'It represents a resource as a noun (/orders/:id) rather than an action verb, relying on the HTTP method (GET/POST/PUT/PATCH/DELETE) to convey the actual action being performed on that resource, rather than encoding the action into the URL path itself (like /getOrder or /deleteOrder).' },
    { q: 'Why does PUT being idempotent matter for API design?', a: 'Idempotent means making the same request multiple times produces the same result as making it once — this matters because clients (or intermediate proxies) can safely retry a PUT request after a network failure without worrying about unintended duplicate side effects, unlike a non-idempotent POST, where a retried request could create a duplicate resource.' },
  ],
  'Error-handling middleware (4-arg signature)': [
    { q: 'How does Express identify a function as error-handling middleware?', a: 'By its parameter count — a middleware function with exactly 4 parameters, (err, req, res, next), is treated by Express as error-handling middleware, invoked when next(err) is called or (in Express 5) when an async route handler\'s promise rejects.' },
    { q: 'What is a common mistake when writing async route handlers in Express 4?', a: 'Forgetting that Express 4 doesn\'t automatically catch rejected promises from async route handlers — an unhandled rejection inside an async handler silently leaves the request hanging with no response, unless you explicitly wrap the handler to catch the rejection and call next(err) yourself, or upgrade to Express 5 which handles this automatically.' },
  ],
  'Request validation with Zod/Joi': [
    { q: 'Why should request validation happen before business logic runs?', a: 'Validating input early lets you reject malformed/malicious requests immediately with a clear 400 error, rather than letting bad data propagate deeper into the application where it could cause confusing failures, security issues, or corrupted data — validating at the boundary is both safer and produces clearer error messages for the client.' },
    { q: 'What advantage does Zod offer specifically in a TypeScript Node project?', a: 'Zod lets you define a schema once and derive both the runtime validation logic and a static TypeScript type from that same schema (via z.infer<typeof schema>) — keeping your compile-time types and runtime validation guaranteed to stay in sync, rather than maintaining a separate TypeScript interface that could silently drift from the actual validation rules.' },
  ],
  'CORS configuration in Express': [
    { q: 'What does the cors middleware in Express actually do?', a: 'It automatically sets the appropriate Access-Control-Allow-Origin (and related) response headers based on your configuration, handling the browser\'s CORS preflight OPTIONS requests correctly — without it, you\'d need to manually set these headers and handle preflight requests yourself for every cross-origin request your API needs to support.' },
    { q: 'Why is setting Access-Control-Allow-Origin: * risky for an authenticated API?', a: 'The wildcard allows any origin to make requests and read responses — combined with credentialed requests (cookies/auth headers), this could let a malicious site read another user\'s authenticated data if credentials were also allowed (though browsers block combining "*" with credentialed requests specifically); for authenticated APIs, you should explicitly allowlist only the specific trusted origins.' },
  ],
  'File uploads (multer) and streaming large payloads': [
    { q: 'What does multer add to Express for handling file uploads?', a: 'multer is middleware that parses multipart/form-data requests (the format used for file uploads), making uploaded files available on req.file/req.files and regular form fields on req.body — Express\'s built-in body parsers don\'t handle multipart form data on their own.' },
    { q: 'Why should very large file uploads be streamed to disk/storage rather than buffered fully in memory?', a: 'Buffering an entire large upload in memory before processing it risks exhausting available memory under concurrent uploads, potentially crashing the server — streaming the incoming data directly to disk or cloud storage as it arrives keeps memory usage bounded regardless of file size or concurrent upload count.' },
  ],

  'Connecting to SQL databases (pg, mysql2)': [
    { q: 'Why use a driver like pg or mysql2 instead of manually implementing the database wire protocol?', a: 'These drivers implement the low-level binary wire protocol for talking to Postgres/MySQL, handle connection management, and expose a clean, promise/callback-based JS API for queries — reimplementing this protocol yourself would be a huge, error-prone undertaking with no benefit over using a well-tested existing driver.' },
    { q: 'Why should you always use parameterized queries with these drivers rather than string interpolation?', a: 'Parameterized queries (passing values as separate arguments rather than interpolating them into the SQL string) ensure the database driver treats those values strictly as data, never as executable SQL syntax — this is the standard, effective defense against SQL injection, regardless of what characters the input contains.' },
  ],
  'ORMs/query builders: Prisma, TypeORM, Knex': [
    { q: 'What is the difference between an ORM (Prisma/TypeORM) and a query builder (Knex)?', a: 'An ORM maps database tables to JS/TS classes or types, letting you interact with data as objects (with relations, validation, and often auto-generated types) rather than writing raw SQL. A query builder provides a fluent JS API for constructing SQL queries programmatically, giving you more direct control over the actual SQL generated, without the full object-relational mapping abstraction layer.' },
    { q: 'What is a common trade-off of using an ORM for complex queries?', a: 'ORMs excel at straightforward CRUD operations but can generate inefficient SQL (like N+1 query patterns) for complex joins/aggregations unless you\'re careful with eager-loading/include options — for genuinely complex reporting-style queries, dropping down to raw SQL or a query builder sometimes produces more predictable, efficient results.' },
  ],
  'Connection pooling': [
    { q: 'Why does a Node API use a connection pool instead of opening a new database connection per request?', a: 'Opening a new database connection has meaningful overhead (TCP handshake, authentication) — a pool maintains a set of already-established, reusable connections that requests borrow and return, avoiding that per-request connection setup cost and limiting the total number of concurrent connections to a database, which has its own connection limits.' },
    { q: 'What happens if your connection pool size is too small under high traffic?', a: 'Requests needing a database connection have to wait for one to become available, increasing response latency (or timing out entirely) even though the database itself might not be under heavy load — pool size needs to be tuned based on expected concurrency and the database\'s own connection limits.' },
  ],
  'Migrations and schema management': [
    { q: 'What problem do database migrations solve?', a: 'They provide a versioned, repeatable, and reviewable way to evolve a database schema over time (adding columns, tables, indexes) across all environments (dev, staging, production) consistently — without migrations, schema changes would need to be applied manually and inconsistently, risking drift between environments.' },
    { q: 'Why is it risky to run a destructive migration (like dropping a column) without a rollback plan?', a: 'If the migration turns out to be wrong or the deployment needs to be reverted, a destructive change (dropped column, deleted table) can\'t simply be undone by rolling back the application code — the data is already gone. This is why teams often use a two-step approach for destructive changes (deprecate/stop using a column first, remove it in a later separate migration) to keep a safe rollback window.' },
  ],
  'MongoDB with Mongoose (overview)': [
    { q: 'What does Mongoose add on top of the native MongoDB Node driver?', a: 'Mongoose provides schema definition and validation (MongoDB itself is schemaless by default), a model layer with instance/static methods, middleware hooks (pre/post save, etc.), and query building conveniences — giving structure and validation to an otherwise flexible, schemaless database.' },
    { q: 'What is a common performance pitfall when using Mongoose\'s populate() for references?', a: 'populate() performs additional queries to resolve referenced documents, and using it carelessly (populating deeply nested or unnecessary references) can turn what looks like one query into many, similar to the N+1 query problem in SQL ORMs — it should be used selectively for only the references actually needed by that specific operation.' },
  ],
  'Transactions and consistency in Node data layers': [
    { q: 'When would you need a database transaction in a Node application?', a: 'Whenever an operation involves multiple related writes that must all succeed or all fail together to keep data consistent — e.g. deducting money from one account and crediting another in a transfer; without a transaction, a failure partway through could leave the data in an inconsistent, partially-applied state.' },
    { q: 'How do you typically manage a transaction with an async Node database client?', a: 'Acquire a dedicated connection/client from the pool for the transaction\'s duration, begin the transaction, perform all the related operations using that same connection, and commit or roll back based on success/failure — wrapped in a try/catch so any error triggers a rollback rather than leaving the transaction open or partially applied.' },
  ],

  'Session vs JWT-based auth in Node APIs': [
    { q: 'What are the operational trade-offs between session-based and JWT-based authentication in a Node backend?', a: 'Session-based auth requires server-side session storage (in-memory, Redis, or a database) that\'s checked on every request, but sessions can be instantly revoked by deleting the record. JWT-based auth is stateless (the token itself carries the claims, verified via signature, no server-side lookup needed), scaling more easily across multiple server instances, but is harder to revoke before its natural expiration since the server doesn\'t track issued tokens by default.' },
  ],
  'Password hashing with bcrypt/argon2': [
    { q: 'Why can\'t you just store a SHA-256 hash of a user\'s password?', a: 'Generic hash functions like SHA-256 are designed to be extremely fast, which makes brute-forcing a stolen hash database computationally cheap for an attacker with modern hardware — bcrypt and argon2 are deliberately slow and configurable (tunable work factor) and incorporate salting automatically, making brute-force attacks impractically expensive even with a stolen hash database.' },
    { q: 'What role does a "salt" play in password hashing, and do bcrypt/argon2 handle it for you?', a: 'A salt is random data mixed into the password before hashing, ensuring two users with the identical password get completely different stored hashes — preventing precomputed "rainbow table" attacks. Both bcrypt and argon2 automatically generate and embed a unique salt as part of their output, so you don\'t need to manage it separately.' },
  ],
  'helmet and secure HTTP headers': [
    { q: 'What does the helmet middleware do for an Express app?', a: 'It sets a collection of security-related HTTP response headers with sensible secure defaults in a single line (app.use(helmet())) — including protections against clickjacking (X-Frame-Options), MIME-sniffing attacks (X-Content-Type-Options), and a baseline Content-Security-Policy — saving you from manually configuring each header individually.' },
  ],
  'Rate limiting (express-rate-limit)': [
    { q: 'Why is rate limiting important for a public-facing Node API?', a: 'Without rate limiting, a single client (malicious or misconfigured) can send an excessive volume of requests, potentially overwhelming the server, exhausting shared resources (database connections), or enabling brute-force attacks on auth endpoints — rate limiting caps how many requests a given client (by IP or API key) can make within a time window, protecting the service from abuse.' },
  ],
  'Preventing SQL/NoSQL injection with parameterized queries': [
    { q: 'How do parameterized queries prevent SQL injection at the code level?', a: 'They separate the fixed SQL query structure from the actual data values, which are bound in as parameters at execution time rather than concatenated into the query string — the database driver treats parameter values strictly as data, never as executable SQL syntax, regardless of what characters or SQL keywords the input contains.' },
    { q: 'Can NoSQL databases like MongoDB also be vulnerable to injection?', a: 'Yes — if user input is passed directly into a MongoDB query object without validation (e.g. allowing an operator like $gt to be injected via a JSON body), an attacker can manipulate the query logic itself; validating and sanitizing input types (ensuring a field is genuinely a string/number, not an unexpected object) mitigates this.' },
  ],
  'Environment variables and secrets management': [
    { q: 'Why should secrets never be hardcoded or committed to source control?', a: 'Committed secrets remain visible in git history indefinitely even if later removed from the latest commit, and anyone with repository access (or who gains it later) can extract them — secrets should be injected via environment variables (from a .env file locally, git-ignored) or a dedicated secrets manager in production, never hardcoded in source.' },
  ],
  'npm audit and dependency supply-chain security': [
    { q: 'What does npm audit check for, and what are its limitations?', a: 'It checks your installed dependency tree against a database of known vulnerabilities, flagging packages with disclosed security issues and suggesting fixes/updates — its limitation is it only catches already-known, disclosed vulnerabilities, not novel or as-yet-undisclosed supply-chain risks (like a compromised package publishing malicious code in a new version).' },
  ],

  'Unit testing with Jest/Vitest': [
    { q: 'What makes a good unit test for a Node.js function?', a: 'It tests the function in isolation (mocking external dependencies like database calls or network requests), asserts on specific expected behavior/output for given inputs, runs fast, and is deterministic (same result every run) — it shouldn\'t depend on external state like a real database or network connection.' },
  ],
  'Integration testing API routes (supertest)': [
    { q: 'What does supertest let you do that a plain unit test cannot?', a: 'It lets you make actual HTTP-like requests against your Express app (without needing to bind to a real network port) and assert on the full response — status code, headers, body — testing the complete request pipeline (middleware, routing, handler logic) together, rather than testing an isolated function in a vacuum.' },
  ],
  'Mocking database calls and external services': [
    { q: 'Why mock the database in a unit test rather than hitting a real test database?', a: 'Mocking keeps unit tests fast, deterministic, and independent of external infrastructure availability — hitting a real database (even a test one) introduces setup/teardown complexity, shared-state risks between test runs, and slower execution; integration tests are the appropriate place to verify real database interaction, not every unit test.' },
  ],
  'Test doubles: stubs, spies, mocks in a Node context': [
    { q: 'How would you use a spy to test that a Node service correctly called an external email-sending function without actually sending an email?', a: 'Replace the email-sending function with a spy (a wrapped version that records calls without performing the real side effect), invoke the code under test, and then assert the spy was called with the expected arguments — this verifies the calling code\'s behavior is correct without needing an actual email to be sent during the test run.' },
  ],

  'cluster module for multi-core scaling': [
    { q: 'How does the cluster module let a Node app use multiple CPU cores?', a: 'It forks multiple worker processes (each a full, independent Node process) that all share the same listening port, with the OS or the cluster master distributing incoming connections across them — since each worker is a separate process, they run genuinely in parallel across cores, unlike a single Node process which only uses one core for its JS execution.' },
    { q: 'What is a limitation of cluster mode for stateful applications?', a: 'Each cluster worker has its own separate memory space — in-memory state (like a local cache or session store) isn\'t automatically shared between workers, so a request handled by one worker won\'t see in-memory state set by another; shared state needs an external store like Redis instead.' },
  ],
  'worker_threads for CPU-bound work': [
    { q: 'When would you reach for worker_threads instead of cluster?', a: 'When you need to offload a specific CPU-intensive computation (image processing, complex calculations) without blocking the main event loop, while still being part of the same process (with the option to share memory via SharedArrayBuffer) — cluster is for scaling overall request-handling capacity across cores, not for offloading one expensive task from within a single request\'s handling.' },
  ],
  'Process management with PM2': [
    { q: 'What core problems does PM2 solve that a raw `node server.js` process doesn\'t handle?', a: 'Automatic restart on crash (a raw process just exits and stays down), built-in clustering across CPU cores without manually managing the cluster module, zero-downtime reloads during deploys, and log aggregation/basic monitoring — turning a fragile single process into a more resilient, observable production service.' },
  ],
  'Graceful shutdown handling (SIGTERM/SIGINT)': [
    { q: 'Why does a Node service need explicit graceful shutdown handling?', a: 'Without it, receiving a termination signal (like SIGTERM during a deploy or container restart) kills the process immediately, potentially cutting off in-flight requests or leaving database connections/transactions in a bad state — graceful shutdown listens for these signals, stops accepting new connections, waits for in-flight requests to finish (with a timeout), and then closes resources cleanly before exiting.' },
    { q: 'How would you implement a basic graceful shutdown in an Express app?', a: 'Listen for process.on(\'SIGTERM\', ...), call server.close() (which stops accepting new connections but lets existing ones finish), close database connections/pools once server.close()\'s callback fires, and force-exit after a timeout if shutdown takes too long, to avoid hanging indefinitely on a stuck connection.' },
  ],
  'Logging strategies (pino, winston) and log levels': [
    { q: 'Why use a structured logging library like pino or winston instead of console.log?', a: 'They produce structured (typically JSON) log output that log aggregation tools can efficiently parse/filter/search, support log levels (debug/info/warn/error) for filtering by severity, and often include performance optimizations (pino is specifically built for very low overhead) — console.log produces unstructured text that\'s much harder to search/filter at scale in production.' },
  ],
  'Health checks and readiness/liveness probes': [
    { q: 'What is the difference between a liveness probe and a readiness probe?', a: 'A liveness probe checks whether the process is alive/responsive at all — failing it typically causes an orchestrator (like Kubernetes) to restart the container. A readiness probe checks whether the app is actually ready to serve traffic (e.g. its database connection is established) — failing it removes the instance from load-balancing rotation without necessarily restarting it, useful during startup or temporary dependency outages.' },
  ],
  'Debugging with --inspect and Chrome DevTools': [
    { q: 'How do you attach Chrome DevTools to a running Node process for debugging?', a: 'Start the process with `node --inspect server.js` (or --inspect-brk to pause immediately at the first line), then open chrome://inspect in Chrome, which detects the debugging port and lets you attach — giving you real breakpoints, step-through debugging, and live variable inspection against the actual running process.' },
  ],
  'Memory leak detection and heap snapshots': [
    { q: 'How would you diagnose a Node service whose memory usage grows steadily over time?', a: 'Run the process with --inspect, take a heap snapshot early on, let it run under normal load for a while, then take a second snapshot and compare them in Chrome DevTools\' Memory tab — the comparison view shows which object types grew unexpectedly, and tracing the retaining path for those objects usually reveals the actual leak (an unbounded cache, accumulating EventEmitter listeners, or a closure holding onto large objects longer than needed).' },
  ],

  'Dockerizing a Node application': [
    { q: 'What is a common technique to keep a production Node Docker image small?', a: 'Using a multi-stage build — one stage installs dependencies and runs the build with full dev tooling, and a separate, minimal final stage (a slim Node base image) copies over only the production node_modules and build output, excluding devDependencies and build tools from the final shipped image.' },
    { q: 'Why should node_modules typically be excluded via .dockerignore rather than copied from the host?', a: 'Copying a locally-installed node_modules (which may include OS-specific native binaries or dev dependencies) into the image can cause it to work locally but fail or behave inconsistently inside the container — it\'s more reliable to run npm install/ci fresh inside the Docker build itself, producing dependencies matching the container\'s actual OS/architecture.' },
  ],
  'Environment-based configuration (.env, config per stage)': [
    { q: 'How would you manage different database URLs for development, staging, and production in a Node app?', a: 'Read configuration from environment variables (process.env.DATABASE_URL) rather than hardcoding values, with different values injected per environment — a .env file (git-ignored) for local development, and the platform\'s environment variable injection (or a secrets manager) for staging/production — validating required variables are present at startup to fail fast if misconfigured.' },
  ],
  'CI/CD pipelines for Node services': [
    { q: 'What are the typical stages of a CI/CD pipeline for a Node backend service?', a: 'Install dependencies, lint/type-check, run unit and integration tests, build (if using TypeScript or a bundler), build and push a Docker image, and deploy (often to staging first, with a manual or automated gate before production) — each stage typically gates the next, failing fast on cheaper checks before running more expensive ones.' },
  ],
  'Serverless Node (AWS Lambda, Vercel Functions) considerations': [
    { q: 'What are key differences to consider when writing Node code for a serverless function versus a long-running server?', a: 'Serverless functions have cold-start latency (the runtime needs to initialize on first invocation after idle), have execution time limits, don\'t maintain persistent in-memory state between invocations reliably (each invocation might be a fresh instance), and connection pooling to databases needs special handling since a new function instance may not reuse an existing pool the way a long-running server process would.' },
  ],
  'Zero-downtime deploys and rolling restarts': [
    { q: 'How does a rolling restart achieve zero-downtime deployment?', a: 'Instead of stopping all instances and starting new ones simultaneously (causing a gap with no available instances), a rolling restart replaces instances one (or a few) at a time — each new instance must pass its readiness check before the next old instance is terminated, ensuring there\'s always at least some capacity serving traffic throughout the deployment.' },
  ],

  'Monolith vs microservices with Node': [
    { q: 'What are the trade-offs of splitting a Node monolith into microservices?', a: 'Microservices allow independent scaling, deployment, and technology choices per service, and limit the blast radius of a single service\'s failure — but they introduce network communication overhead, distributed system complexity (partial failures, eventual consistency), and operational overhead (more services to deploy/monitor) compared to a single, simpler monolith codebase.' },
  ],
  'Message queues (RabbitMQ, SQS) for async processing': [
    { q: 'Why would you use a message queue instead of directly calling a function for a background task?', a: 'A message queue decouples the producer (which just publishes a message) from the consumer (which processes it whenever it can), providing durability (messages persist if the consumer is temporarily down), load leveling (a burst of requests doesn\'t overwhelm the consumer, since messages queue up), and retry mechanisms for failed processing — direct function calls have none of these resilience properties.' },
  ],
  'Building a GraphQL API with Node (Apollo Server)': [
    { q: 'What role does a resolver play in a GraphQL server built with Apollo Server?', a: 'A resolver is a function responsible for fetching the actual data for a specific field in the GraphQL schema — when a client sends a query, Apollo Server calls the appropriate resolver for each requested field, letting each field\'s data come from a different source (a database, another API) independently, based on exactly what the client asked for.' },
  ],
  'API gateway patterns': [
    { q: 'What problem does an API gateway solve in a microservices architecture?', a: 'It provides a single, unified entry point for clients, handling cross-cutting concerns (authentication, rate limiting, request routing to the correct backend service, response aggregation) centrally — without a gateway, clients would need to know about and directly call many individual services, and cross-cutting concerns would need to be duplicated across each one.' },
  ],
  'Caching with Redis in a Node backend': [
    { q: 'What is a common pattern for using Redis to cache database query results in a Node API?', a: 'The cache-aside pattern: on a read request, first check Redis for a cached result using a key derived from the query; if present (a cache hit), return it directly; if absent (a miss), query the actual database, store the result in Redis with an expiration/TTL, and return it — subsequent identical requests within the TTL window are served instantly from Redis without hitting the database.' },
  ],
};
