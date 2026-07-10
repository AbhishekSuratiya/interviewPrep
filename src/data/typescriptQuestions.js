export const typescriptQuestions = {
  // TypeScript Fundamentals
  'What TypeScript is and how it relates to JavaScript': [
    'How does TypeScript relate to JavaScript — is it a superset, a subset, or something else?',
    'What does TypeScript actually produce when you compile it?',
    'What problems does TypeScript solve that JSDoc comments cannot?',
  ],
  'Structural typing ("duck typing") vs nominal typing': [
    'What is structural typing? Give an example of two unrelated types that are assignable to each other.',
    'How is structural typing different from nominal typing (e.g. Java/C#)?',
    'When can structural typing cause unexpected compatibility between types you intended to be distinct?',
  ],
  'The compiler (tsc) and compilation targets': [
    'What does the `target` option in tsconfig.json control?',
    'What is the difference between `tsc` emitting JS files vs using a bundler like esbuild for that step?',
  ],
  'tsconfig.json — key options overview': [
    'What does `strict` enable, and what sub-flags does it turn on?',
    'What is the difference between `include`, `exclude`, and `files` in tsconfig?',
    'What does `moduleResolution` control and when would you set it to "bundler"?',
  ],
  'Type inference vs explicit annotation': [
    'When does TypeScript infer a type, and when do you need to annotate explicitly?',
    'What is the difference between let x = 5 (inferred as number) and const x = 5 (inferred as literal 5)?',
  ],
  'strict mode and its sub-flags (strictNullChecks, noImplicitAny, etc.)': [
    'What does strictNullChecks change about how you handle potentially-null values?',
    'What does noImplicitAny prevent, and why is it important for large codebases?',
    'What does strictPropertyInitialization enforce on class properties?',
  ],
  'Type erasure at runtime': [
    'What happens to TypeScript types at runtime?',
    'If types are erased, how do you do runtime validation of external data like API responses?',
  ],
  'Declaration files (.d.ts)': [
    'What is a .d.ts file and what does it contain?',
    'When would you write your own .d.ts file vs rely on @types packages?',
  ],
  'Ambient declarations and declare': [
    'What does the `declare` keyword do, and when do you need it?',
    'What is the difference between `declare module` and `declare global`?',
  ],

  // Basic & Primitive Types
  'any vs unknown vs never': [
    'What is the difference between `any` and `unknown`?',
    'When does TypeScript infer the type `never`, and how can you use it for exhaustiveness checking?',
    'Why is `unknown` safer than `any` for typing external data?',
  ],
  'Literal types (string/number/boolean literals)': [
    'What is a literal type, and when is it useful?',
    'How do you widen a literal type back to its base type (e.g. "hello" back to string)?',
  ],
  'Tuples and fixed-length tuples': [
    'How is a TypeScript tuple different from a regular array type?',
    'How do you type a function that returns multiple values as a tuple?',
    'What are labeled tuple elements and why are they useful?',
  ],
  'Enums (numeric, string) and const enums': [
    'What is the difference between a numeric enum and a string enum?',
    'What does `const enum` do differently at compile time, and what are its drawbacks?',
    'Why do some teams prefer union types of string literals over enums?',
  ],
  'Type assertions (as, angle-bracket) and non-null assertion (!)': [
    'When is a type assertion appropriate, and when is it dangerous?',
    'What does the non-null assertion operator `!` do, and what can go wrong with it?',
    'How do you do a "double assertion" to cast between unrelated types, and why is that a red flag?',
  ],

  // Object Types & Interfaces
  'interface declarations': [
    'What can an interface do that a type alias cannot (and vice versa)?',
    'When would you choose interface over type and why?',
  ],
  'Index signatures': [
    'How do you type an object with unknown string keys but values of a known type?',
    'What is the downside of index signatures for type safety?',
  ],
  'Extending interfaces (extends)': [
    'How does interface extension differ from intersection types?',
    'Can you extend multiple interfaces? What happens if they have conflicting property types?',
  ],
  'Declaration merging with interfaces': [
    'What is declaration merging and when does it apply?',
    'How would you augment the Window interface to add a custom global property?',
  ],
  'type aliases vs interfaces — differences and when to use each': [
    'What are the practical differences between type aliases and interfaces in TypeScript?',
    'Which one supports declaration merging, and which supports computed types better?',
  ],
  'Intersection types (&)': [
    'What does an intersection type represent, and how is it different from interface extension?',
    'What happens when you intersect two types that have a property with conflicting types?',
  ],
  'Union types (|) and narrowing': [
    'What is a union type, and how do you narrow it inside an if block?',
    'How does TypeScript use control flow analysis to narrow union types?',
  ],

  // Functions (TS)
  'Typing function parameters and return values': [
    'When does TypeScript infer the return type vs when should you annotate it explicitly?',
    'How do you type a function that accepts either a string or number?',
  ],
  'Function overloads': [
    'What problem do function overloads solve?',
    'How do you declare and implement function overloads in TypeScript?',
    'What is the implementation signature and can callers see it?',
  ],
  'Typing callbacks and higher-order functions': [
    'How do you type a callback parameter in a function signature?',
    'What is the difference between `() => void` and `() => undefined` in TypeScript?',
  ],
  'Call signatures on object/interface types': [
    'How do you type an object that is both callable and has properties?',
    'What is a call signature and how does it differ from a method signature?',
  ],

  // Classes (TS)
  'Access modifiers: public, private, protected': [
    'How do TypeScript access modifiers differ from JavaScript private class fields (#)?',
    'What does `protected` allow that `private` does not?',
  ],
  'Abstract classes and methods': [
    'What is an abstract class and when would you use it over an interface?',
    'Can you instantiate an abstract class directly?',
  ],
  'implements vs extends': [
    'What is the difference between `implements` and `extends` in a TypeScript class?',
    'Can a class implement multiple interfaces and extend a class at the same time?',
  ],
  'Parameter properties (constructor shorthand)': [
    'What do parameter properties in a constructor do, and how do they reduce boilerplate?',
  ],

  // Generics
  'Generic functions': [
    'Write a generic identity function in TypeScript.',
    'How does TypeScript infer generic type parameters from arguments?',
  ],
  'Generic constraints (extends)': [
    'How do you constrain a generic type parameter to only accept objects with a specific property?',
    'What does `T extends keyof U` mean?',
  ],
  'Default generic parameters': [
    'How do you provide a default type for a generic parameter?',
    'When are default generic parameters useful?',
  ],
  'keyof and typeof operators with generics': [
    'What does `keyof T` produce?',
    'How would you type a function that takes an object and one of its keys, returning the value?',
    'What is the difference between TypeScript\'s `typeof` and JavaScript\'s `typeof`?',
  ],
  'Inferring generics from arguments': [
    'How does TypeScript infer the generic parameter when you call a function without explicit annotation?',
    'What happens when TypeScript cannot infer a generic and falls back to the constraint or unknown?',
  ],

  // Advanced Types
  'Discriminated unions (tagged unions)': [
    'What is a discriminated union and what makes it work for type narrowing?',
    'Design a discriminated union for a result type that can be Success or Failure.',
  ],
  'Type guards (typeof, instanceof, in)': [
    'How does the `in` operator work as a type guard?',
    'When does instanceof not work reliably as a type guard?',
  ],
  'User-defined type guards (is predicates)': [
    'What is an `is` predicate type guard and how does it differ from a regular boolean-returning function?',
    'Write a type guard for checking if a value is a non-null string.',
  ],
  'Conditional types (T extends U ? X : Y)': [
    'What are conditional types and when are they useful?',
    'What does `T extends string ? "yes" : "no"` evaluate to when T is `string | number`?',
  ],
  'infer keyword in conditional types': [
    'What does the `infer` keyword do inside a conditional type?',
    'Write a type that extracts the return type of a function using infer.',
  ],
  'Mapped types': [
    'What is a mapped type and how does it work?',
    'Write a mapped type that makes all properties of T optional.',
    'How do you use a mapped type to transform value types while keeping keys?',
  ],
  'Template literal types': [
    'What can you do with template literal types that you couldn\'t do with plain string types?',
    'Give an example of a template literal type generating event handler names from event names.',
  ],
  'Distributive conditional types': [
    'When does a conditional type distribute over a union, and when does it not?',
    'How do you prevent a conditional type from distributing over a union?',
  ],
  'satisfies operator': [
    'What does the `satisfies` operator do, and how does it differ from a type annotation?',
    'Give a practical example where `satisfies` catches an error that a cast would not.',
  ],
  'Branded / nominal types (opaque types) pattern': [
    'Why would you want nominal typing in a structurally-typed language?',
    'How do you implement a branded type in TypeScript and where would you use it?',
  ],

  // Utility Types
  'Partial, Required, Readonly': [
    'When would you use Partial<T> in a function parameter?',
    'What does Required<T> do to optional properties?',
  ],
  'Pick and Omit': [
    'How are Pick and Omit complementary? When do you prefer one over the other?',
    'How does Omit<T, K> work under the hood using mapped types?',
  ],
  'Record': [
    'What does Record<K, V> produce?',
    'How does Record differ from an index signature for typing a dictionary?',
  ],
  'Exclude and Extract': [
    'How do Exclude and Extract work on union types?',
    'Give an example of using Exclude to remove certain values from a union.',
  ],
  'ReturnType, Parameters, ConstructorParameters, InstanceType': [
    'How do you get the return type of a function type you don\'t control using ReturnType?',
    'How would you use Parameters<T> to build a middleware wrapper type?',
  ],
  'Awaited': [
    'What does the Awaited utility type do?',
    'How does Awaited handle a Promise<Promise<string>>?',
  ],
  'Writing custom utility types': [
    'Write a DeepReadonly<T> utility type.',
    'Write a type that extracts all keys of T whose values are of type string.',
  ],

  // Modules & Namespaces
  'import type and export type': [
    'What is the difference between `import type` and a regular `import`?',
    'Why does `isolatedModules` require type-only imports to use `import type`?',
  ],
  'Module augmentation': [
    'How do you add new methods to an existing library\'s exported type?',
    'What is the difference between module augmentation and declaration merging?',
  ],
  'Ambient modules for untyped packages': [
    'How do you declare types for an npm package that has no @types package?',
    'What does `declare module "some-module" { ... }` do?',
  ],

  // Type Narrowing & Control Flow
  'Control flow based type narrowing': [
    'How does TypeScript know that a variable is a string after an `if (typeof x === "string")` check?',
    'What is control flow analysis?',
  ],
  'Discriminated union narrowing': [
    'How do you narrow a discriminated union using a switch on its discriminant?',
    'What happens to the type in a switch default arm when all cases are covered?',
  ],
  'Assertion functions (asserts)': [
    'What is an assertion function and how does it differ from a type guard?',
    'How does `asserts value is string` narrow the type in the caller after the call?',
  ],
  'Exhaustiveness checking with never': [
    'How do you use `never` to ensure a switch covers all cases of a discriminated union?',
    'What happens to the type of the default case when all union members are handled?',
  ],

  // Working with DOM & External JS
  'DOM typings (lib.dom.d.ts)': [
    'How does TypeScript type DOM APIs, and how do you enable/disable dom types?',
    'Why does querySelector return Element | null instead of a specific element type?',
  ],
  'Using @types packages (DefinitelyTyped)': [
    'What is DefinitelyTyped and how do @types packages integrate with your project?',
    'What do you do when an @types package\'s version doesn\'t match the library\'s version?',
  ],
  'JSON typing and unknown for API responses': [
    'Why should you type an API response as `unknown` rather than the expected shape directly?',
    'How would you validate and narrow an `unknown` API response to a known type safely?',
  ],
  'Type-safe fetch wrappers': [
    'Write a typed fetch wrapper that accepts a response type generic.',
    'How do you handle error responses in a fully typed fetch wrapper?',
  ],

  // React + TypeScript
  'Typing function components and props': [
    'How do you type a React function component in TypeScript?',
    'What is the difference between `React.FC<Props>` and just annotating the return type as `JSX.Element`?',
  ],
  'Typing children (ReactNode vs JSX.Element)': [
    'What is the difference between ReactNode, ReactElement, and JSX.Element?',
    'When would you type children as ReactNode vs as a specific element type?',
  ],
  'Typing useState, useRef, useReducer': [
    'When do you need to explicitly annotate the generic for useState vs letting it infer?',
    'How do you type a ref that starts as null but will hold a DOM element?',
    'How do you type a useReducer with multiple action types using a discriminated union?',
  ],
  'Generic components': [
    'How do you write a generic React component (e.g. a typed list component)?',
    'How do you add a generic constraint to a component\'s props?',
  ],
  'Typing custom hooks': [
    'When should a custom hook explicitly annotate its return type?',
    'How do you type a hook that returns a tuple (value, setter)?',
  ],
  'Typing context (createContext)': [
    'How do you type createContext properly when the initial value might not match the runtime value?',
    'How do you avoid providing a dummy initial value for a context that always has a Provider?',
  ],
  'Forwarding refs with TypeScript (forwardRef typing)': [
    'How do you type a component that uses forwardRef?',
    'What are the generic parameters of forwardRef and what do they represent?',
  ],

  // Tooling & Ecosystem
  'ESLint with typescript-eslint': [
    'What additional rules does typescript-eslint enable over standard ESLint?',
    'What is the difference between type-aware linting rules and regular syntactic rules?',
  ],
  'Project references and monorepos': [
    'What are TypeScript project references and how do they improve build times in a monorepo?',
    'What does the `composite` flag in tsconfig enable?',
  ],
  'Migrating a JS codebase to TS incrementally': [
    'What is the recommended incremental strategy for adding TypeScript to an existing JS project?',
    'What does `allowJs` enable during migration?',
    'What is `checkJs` and how does it give you TypeScript benefits in plain JS files?',
  ],

  // Common Pitfalls & Best Practices
  'Avoiding any — using unknown instead': [
    'Why is `unknown` safer than `any`, and what do you have to do before using an `unknown` value?',
    'In what situations is `any` still acceptable or pragmatic?',
  ],
  'Overusing type assertions': [
    'Why is `as SomeType` dangerous, and what safer alternatives exist?',
    'When does a type assertion hide a real bug from the compiler?',
  ],
  'Excess property checks on object literals': [
    'What is an excess property check and when does TypeScript apply it?',
    'Why does TypeScript catch `{ name: "a", extra: 1 }` when assigned to `{ name: string }` inline but not when assigned via a variable?',
  ],
  'Widening vs narrowing literal types (as const)': [
    'What does `as const` do to a literal value or object?',
    'When would you use `as const` on an array to prevent widening to `string[]`?',
  ],
  'Keeping types close to runtime validation (zod, io-ts) for external data': [
    'Why is it important to validate external data at runtime even when TypeScript types say it\'s safe?',
    'How does a library like Zod let you derive a TypeScript type from a schema?',
  ],
};
