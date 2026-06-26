import { enrich } from './enrich.mjs';

const map = {
  'ts-vs-js': {
    analogy: "TypeScript is JavaScript with a spell-checker that runs before you publish: it catches 'you passed a string where a number goes' at compile time, then strips all the type notes away and ships plain JS.",
    keyPoints: [
      "A statically-typed superset of JS — all JS is valid TS.",
      "Catches type errors at compile time, not in production.",
      "Type inference means you don't annotate everything.",
      "Types are fully erased — zero runtime overhead.",
      "Adoptable gradually (allowJs); huge tooling/autocomplete wins.",
    ],
  },
  'type-annotations': {
    analogy: "interface vs type is like a blueprint vs a label: a blueprint (interface) can be extended and added to over time; a label (type) can describe anything — unions, tuples, functions — but is final once written.",
    keyPoints: [
      "Both describe object shapes; TS uses structural ('duck') typing.",
      "interface can be extended and declaration-merged.",
      "type can express unions, intersections, tuples, function types.",
      "Use interface for public/extendable API shapes.",
      "Use type for unions, intersections, and computed types.",
    ],
  },
  'primitive-special-types': {
    analogy: "any is taking the batteries out of the smoke detector — silence, but no safety. unknown is the smoke detector that makes you prove it's safe (narrow) before you proceed.",
    keyPoints: [
      "any disables checking and infects everything it touches — avoid it.",
      "unknown is the safe any: you must narrow before using it.",
      "never = a value that can't exist (used for exhaustiveness checks).",
      "void = a function returns nothing meaningful.",
      "Literal types pin a value to exact options ('light' | 'dark').",
    ],
  },
  'generics-basics': {
    analogy: "Generics are a one-size-fits-all container that remembers what you put in: put in a number, get a number back — type safety preserved, no need for a separate box per type.",
    keyPoints: [
      "<T> is a type placeholder resolved at the call site.",
      "Preserves the input→output type relationship (vs any).",
      "Constrain with extends (<T extends { length: number }>).",
      "keyof constraints make property access type-safe.",
      "Support defaults (<T = string>) and multiple params (<T, U>).",
    ],
  },
  'generics-advanced': {
    analogy: "infer is a fill-in-the-blank for types: 'if T looks like Promise<___>, capture the blank as U'. ReturnType/Parameters use it to read types straight off your existing functions, so they never drift out of sync.",
    keyPoints: [
      "ReturnType<T> / Parameters<T> derive types from functions.",
      "infer captures a type from inside a pattern in a conditional type.",
      "Awaited<T> unwraps a (possibly nested) Promise.",
      "Lets types stay in sync with implementation automatically.",
      "Backbone of library typings (tRPC, Prisma).",
    ],
  },
  'built-in-utilities': {
    analogy: "Utility types are photo filters for types: Partial makes everything optional, Pick crops to a few fields, Omit removes some — all from one original, so there's a single source of truth.",
    keyPoints: [
      "Partial/Required toggle optionality; Readonly prevents mutation.",
      "Pick selects fields; Omit removes fields.",
      "Record<K,V> builds a typed dictionary.",
      "Exclude/Extract/NonNullable manipulate union members.",
      "Compose them (Partial<Pick<User,…>>) instead of redefining types.",
    ],
  },
  'readonly-immutability': {
    analogy: "Without 'as const', TS rounds your value up to a vague type ('prod' becomes just string). 'as const' freezes it to the exact literal, so you can derive precise unions straight from the data.",
    keyPoints: [
      "Readonly<T> makes top-level props immutable (deep needs DeepReadonly).",
      "'as const' freezes a value to its narrowest literal type.",
      "Derive unions from objects: typeof OBJ[keyof typeof OBJ].",
      "ReadonlyArray blocks mutating methods (push/splice).",
      "Single source of truth — add a value, the union updates.",
    ],
  },
  'type-guards': {
    analogy: "Narrowing is a series of doors that TS watches you walk through: after 'if (typeof x === string)', it knows x is a string in that room. A discriminated union puts a labeled tag on each door so the switch is exhaustive.",
    keyPoints: [
      "Built-in narrowing: typeof, instanceof, the 'in' operator.",
      "Discriminated unions: a shared literal 'kind' field + switch.",
      "Custom guards return `value is Type` (type predicates).",
      "Assertion functions (`asserts x is T`) narrow for the rest of the scope.",
      "A `never` default case enforces exhaustive handling at compile time.",
    ],
  },
  'assertion-functions': {
    analogy: "'satisfies' is a fitting room that checks the outfit fits the dress code WITHOUT swapping your clothes for a generic uniform: the value is validated but keeps its exact literal types.",
    keyPoints: [
      "satisfies validates a value against a type without widening it.",
      "Type annotation widens (loses literals); satisfies keeps them.",
      "Great for config objects, route maps, palettes.",
      "Assertion functions narrow permanently after the call (vs guards: only in the if).",
      "Combine both for validated-yet-precise config.",
    ],
  },
  'ts-class-features': {
    analogy: "TS 'private' is a 'Staff Only' sign (a polite compile-time warning, removed at runtime); JS '#private' is a locked door (truly inaccessible even in plain JS).",
    keyPoints: [
      "Modifiers: public (default), protected, private (compile-time only).",
      "'#' fields are runtime-private (hidden from JSON/Reflect).",
      "Parameter properties declare + assign in the constructor in one line.",
      "abstract classes define a contract and can't be instantiated.",
      "Classes can be generic (Stack<T>) and implement interfaces.",
    ],
  },
  'ts-decorators': {
    analogy: "Decorators are stamps you press onto a class or method at definition time (@Injectable, @Log) that add behavior or metadata — like a notary stamp that frameworks later read.",
    keyPoints: [
      "Functions that modify classes/methods/properties/params at define-time.",
      "Power Angular DI, NestJS, TypeORM, validation.",
      "Method decorators can wrap behavior (logging, timing).",
      "With reflect-metadata they attach readable metadata.",
      "Two APIs exist: legacy (experimentalDecorators) and TS 5.0 standard.",
    ],
  },
  'tsconfig': {
    analogy: "tsconfig.json is the control panel for the compiler: it sets how strict the inspector is, which JS version to output, and how imports are resolved. 'strict: true' is the master safety switch you always leave on.",
    keyPoints: [
      "strict: true enables the full suite of safety checks — always on.",
      "target/module/moduleResolution control output and import resolution.",
      "paths sets import aliases (@/ → src/).",
      "noUncheckedIndexedAccess makes index access T | undefined.",
      "incremental + skipLibCheck speed up builds.",
    ],
  },
  'declaration-files': {
    analogy: ".d.ts files are type-only instruction manuals with no working parts: they tell TS the shape of JS libraries or let you bolt extra typed properties onto existing things (like req.user on Express).",
    keyPoints: [
      "Contain types only — no runtime code.",
      "@types/* packages provide types for untyped JS libraries.",
      "Module augmentation adds types to an existing module.",
      "Global augmentation extends Window/global namespace.",
      "declaration: true auto-generates .d.ts for your library.",
    ],
  },
  'builder-pattern': {
    analogy: "A fluent builder is ordering at a sandwich counter: each step (.where().limit()) adds to your order and hands the counter back to you. A type-safe builder won't let you say 'done' (build()) until the required ingredients are in.",
    keyPoints: [
      "Each method returns `this` to enable chaining.",
      "Accumulates configuration step by step.",
      "Type-safe builders track set fields via generic state.",
      "build() can be gated to require fields at compile time.",
      "Used by query builders, AWS CDK, SDK configs.",
    ],
  },
  'discriminated-union-patterns': {
    analogy: "The Result pattern is returning a labeled box that says either 'success: here's the data' or 'failure: here's why' — instead of throwing an unlabeled error nobody is forced to catch.",
    keyPoints: [
      "Errors become values: Result<T,E> = Ok<T> | Err<E>.",
      "Callers must handle both branches — errors can't be forgotten.",
      "Throws are untyped in TS; Result makes failures explicit.",
      "Pairs perfectly with discriminated-union narrowing.",
      "Libraries: neverthrow, ts-results (Rust-inspired).",
    ],
  },
  'conditional-types': {
    analogy: "A conditional type is an if/else at the type level: 'T extends string ? X : Y'. Over a union it's applied to each member separately — like running the check on every item in a list.",
    keyPoints: [
      "T extends U ? X : Y — type-level ternary, evaluated at compile time.",
      "Distributive over unions when T is 'naked'.",
      "Wrap in a tuple ([T] extends [U]) to disable distribution.",
      "infer extracts a captured type from the matched pattern.",
      "Underlies ReturnType, Parameters, Awaited.",
    ],
  },
  'mapped-types': {
    analogy: "A mapped type is .map() for an object's keys: walk every property and transform it. Template literal types are string math on top — turning 'name' into 'getName'.",
    keyPoints: [
      "{ [K in keyof T]: … } transforms every property.",
      "Modifiers +?/-? and +readonly/-readonly add or strip flags.",
      "Key remapping with 'as' renames or filters keys.",
      "Template literal types build/transform string keys.",
      "Filter with `as (cond ? K : never)` to drop properties.",
    ],
  },
  'ts-declaration-merging': {
    analogy: "Declaration merging is two people adding pages to the same binder labeled 'Window' — TS staples them into one. It's how you bolt typed extras (req.user) onto libraries you don't own.",
    keyPoints: [
      "Same-name interfaces merge their property sets.",
      "Module augmentation adds types to an existing module.",
      "Global augmentation extends the global namespace.",
      "Only works inside module files (with import/export).",
      "Use carefully when augmenting built-ins like Array.",
    ],
  },
  'type-performance': {
    analogy: "Overly clever recursive types are like an inspector who re-checks every nested box infinitely — the build crawls or errors out ('excessively deep'). Bound the recursion and cache named types to keep it fast.",
    keyPoints: [
      "Deep recursive/conditional types can blow up compile time.",
      "Symptoms: 'instantiation excessively deep', slow IDE, slow tsc.",
      "Add depth bounds to recursive types.",
      "Prefer interface over complex type aliases (interfaces cache).",
      "Diagnose with tsc --generateTrace and @typescript/analyze-trace.",
    ],
  },
  'ts-project-references': {
    analogy: "Project references split a giant codebase into separately-built rooms: change one room and only it gets rebuilt (via its .d.ts), instead of repainting the whole house every time.",
    keyPoints: [
      "Split a codebase into multiple referenced tsconfig projects.",
      "composite: true + declaration: true are required.",
      "Imports go through built .d.ts — no full re-check.",
      "Build with `tsc --build` for incremental rebuilds.",
      "Turborepo/Nx use this for fast TS monorepos.",
    ],
  },
};

enrich(new URL('../data/typescript.json', import.meta.url).pathname, map);
