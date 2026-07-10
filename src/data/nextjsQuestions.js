export const nextjsQuestions = {
  // Next.js Fundamentals
  'What Next.js adds on top of React': [
    'What are the main features Next.js provides on top of bare React?',
    'When would you choose Next.js over a plain Vite React setup?',
  ],
  'App Router vs Pages Router — differences': [
    'What are the key architectural differences between the App Router and the Pages Router?',
    'Can you use both App Router and Pages Router in the same project?',
  ],
  'File-system based routing': [
    'How does Next.js map the file system to URL routes?',
    'How do you create an index route vs a named route in the App Router?',
  ],
  'next dev / next build / next start lifecycle': [
    'What does `next build` do, and what artifacts does it produce?',
    'What is the difference between running `next start` vs `next dev`?',
  ],
  'Static assets and the public directory': [
    'How do you reference a file in the `public` directory from your code?',
    'What is the difference between assets in `public` and assets imported in your JS/CSS?',
  ],

  // Routing (App Router)
  'app/ directory conventions': [
    'What are the reserved file names in the app/ directory and what does each do?',
    'What is the difference between page.tsx and route.ts in the App Router?',
  ],
  'page.tsx, layout.tsx, template.tsx': [
    'What is the difference between layout.tsx and template.tsx?',
    'How does a root layout differ from a nested layout?',
  ],
  'Nested layouts and shared UI': [
    'How do nested layouts persist state across navigations?',
    'How does Next.js decide which layouts to re-render when navigating?',
  ],
  'Dynamic segments ([id])': [
    'How do you access dynamic route params in a Server Component?',
    'What is the difference between `params` and `searchParams` props?',
  ],
  'Catch-all and optional catch-all segments ([...slug], [[...slug]])': [
    'What is the difference between `[...slug]` and `[[...slug]]`?',
    'How would you use a catch-all route to build a CMS-style URL structure?',
  ],
  'Route groups ((group))': [
    'What do route groups do and why don\'t they affect the URL path?',
    'How would you use a route group to apply a layout only to certain routes?',
  ],
  'Parallel routes (@slot)': [
    'What are parallel routes and when are they useful (e.g. dashboards)?',
    'How does Next.js handle navigation to a parallel route that has no match (default.tsx)?',
  ],
  'Intercepting routes': [
    'What do intercepting routes let you do (e.g. photo gallery modals)?',
    'How do the (.) (..) (...) conventions work for intercepting routes?',
  ],
  'loading.tsx and Suspense boundaries per route': [
    'How does loading.tsx automatically create a Suspense boundary for a route segment?',
    'How is loading.tsx different from wrapping your own component in Suspense?',
  ],
  'error.tsx and not-found.tsx': [
    'What does error.tsx catch and what can it NOT catch?',
    'How do you trigger the not-found UI programmatically from a Server Component?',
  ],
  'Route handlers (route.ts) for APIs': [
    'How do you create an API endpoint in the App Router?',
    'Can a route.ts and a page.tsx coexist at the same URL path?',
  ],

  // Routing (Pages Router)
  'pages/ directory conventions': [
    'How does Pages Router file naming differ from App Router?',
    'What is the _app.js file responsible for?',
  ],
  'getStaticProps, getStaticPaths': [
    'What does getStaticProps do, and when does it run?',
    'How does getStaticPaths tell Next.js which dynamic pages to pre-render?',
    'What does `fallback: true/false/blocking` do in getStaticPaths?',
  ],
  'getServerSideProps': [
    'When does getServerSideProps run and what are its performance trade-offs?',
    'What context object does getServerSideProps receive?',
  ],
  'API routes (pages/api)': [
    'How do you create an API route in the Pages Router?',
    'How do request and response work in a Pages Router API route?',
  ],

  // Rendering Strategies
  'Static Site Generation (SSG)': [
    'What is SSG and what types of pages benefit most from it?',
    'How do you make a Next.js page statically generated in the App Router?',
  ],
  'Server-Side Rendering (SSR)': [
    'What are the trade-offs of SSR vs SSG?',
    'How do you opt a route into SSR in the App Router?',
  ],
  'Incremental Static Regeneration (ISR)': [
    'What is ISR and how does it improve on pure SSG?',
    'How do you configure revalidation time for ISR in the App Router?',
  ],
  'Choosing the right strategy per route': [
    'How do you decide between SSG, SSR, and ISR for a given page?',
    'Can you mix rendering strategies within a single Next.js app?',
  ],
  'Streaming SSR with Suspense': [
    'How does streaming SSR work in Next.js and what does it require in your component tree?',
    'What is the user experience benefit of streaming vs waiting for all data?',
  ],
  'Partial Prerendering (overview)': [
    'What is Partial Prerendering in Next.js?',
    'How does Partial Prerendering combine static and dynamic content on the same page?',
  ],

  // Server & Client Components
  'Server Components by default in App Router': [
    'Why are components Server Components by default in the App Router?',
    'What can a Server Component do that a Client Component cannot?',
  ],
  '"use client" directive and when to use it': [
    'What triggers the need for "use client" on a component?',
    'Does "use client" affect the component\'s children automatically?',
  ],
  'Passing data from Server to Client Components (serializable props)': [
    'What types of props can you pass from a Server Component to a Client Component?',
    'Why can\'t you pass a function or a class instance as a prop from Server to Client?',
  ],
  'Composing Server and Client Components': [
    'Can you import a Server Component inside a Client Component? What is the workaround?',
    'How do you pass a Server Component as `children` to a Client Component?',
  ],
  'Avoiding unnecessary client bundle size': [
    'How does the App Router help keep client-side JavaScript smaller?',
    'What is the risk of marking a large component tree with "use client" near the root?',
  ],

  // Data Fetching
  'fetch() with automatic caching in Server Components': [
    'How does Next.js extend the native fetch API for caching?',
    'What happens if you use the same fetch URL in two different Server Components on the same request?',
  ],
  'Cache options: force-cache, no-store, revalidate': [
    'What does `cache: "no-store"` mean for a fetch call?',
    'What does `next: { revalidate: 60 }` do?',
  ],
  'revalidatePath and revalidateTag': [
    'What does revalidatePath do, and when would you call it?',
    'How do you tag a fetch request and then invalidate all requests with that tag?',
  ],
  'Fetching in parallel vs sequential (waterfalls)': [
    'How do you fetch multiple pieces of data in parallel in a Server Component?',
    'What is a data waterfall and how do Next.js layouts help prevent them?',
  ],
  'Using ORMs / databases directly in Server Components': [
    'What is the benefit of querying a database directly in a Server Component vs going through an API?',
    'What security considerations apply when doing direct DB access in Server Components?',
  ],

  // Server Actions & Mutations
  '"use server" directive': [
    'What does "use server" declare, and where can you use it?',
    'How are Server Actions different from API Route Handlers?',
  ],
  'Defining and calling Server Actions': [
    'How do you call a Server Action from a Client Component?',
    'What happens under the hood when a Server Action is invoked?',
  ],
  'Progressive enhancement with forms': [
    'How do Server Actions work with forms for progressive enhancement?',
    'What happens when a form with a Server Action submits without JavaScript enabled?',
  ],
  'Revalidating data after a mutation': [
    'How do you refresh the UI after a Server Action completes a mutation?',
    'What is the difference between revalidatePath and revalidateTag in a Server Action?',
  ],
  'Security considerations for Server Actions': [
    'What security risks exist with Server Actions and how does Next.js mitigate them?',
    'How would you add authorization checks inside a Server Action?',
  ],

  // API Routes / Route Handlers
  'Defining GET/POST/etc. handlers': [
    'How do you export multiple HTTP method handlers from a single route.ts file?',
    'What is the signature of a Route Handler function?',
  ],
  'Request and Response objects (Web standard APIs)': [
    'What is the NextRequest object and how does it extend the standard Request?',
    'How do you read JSON from a POST request body in a Route Handler?',
  ],
  'Streaming responses': [
    'How do you stream a response from a Route Handler?',
    'What is ReadableStream used for in a streaming API response?',
  ],

  // Middleware
  'middleware.ts and the Edge runtime': [
    'What runtime does middleware.ts run in, and what does that limit you to?',
    'At what point in the request lifecycle does middleware execute?',
  ],
  'Request rewriting and redirecting': [
    'What is the difference between a rewrite and a redirect in middleware?',
    'How do you redirect all unauthenticated requests to a login page using middleware?',
  ],
  'Auth checks in middleware': [
    'What are the trade-offs of doing auth in middleware vs in individual Server Components?',
    'What edge-compatible auth libraries work well with Next.js middleware?',
  ],
  'Matching specific paths (config.matcher)': [
    'How do you restrict middleware to run only on specific paths?',
    'How do you exclude static files and API routes from middleware matching?',
  ],

  // Layouts, Metadata & SEO
  'Metadata API (static and generateMetadata)': [
    'How do you set page-level metadata in the App Router?',
    'How does generateMetadata let you generate dynamic metadata based on route params?',
  ],
  'Open Graph and Twitter card metadata': [
    'How do you add Open Graph image metadata in the App Router?',
    'How do you generate a dynamic OG image per page using next/og?',
  ],
  'sitemap.xml and robots.txt generation': [
    'How do you generate a dynamic sitemap in Next.js App Router?',
    'How do you add a robots.txt file to a Next.js project?',
  ],

  // Image, Font & Script Optimization
  'next/image — lazy loading, responsive sizing, optimization': [
    'What does the next/image component do that a plain <img> tag doesn\'t?',
    'What is the `priority` prop and when should you use it?',
    'How do you configure remote image domains in next.config.js?',
  ],
  'next/font — self-hosted fonts, layout shift prevention': [
    'How does next/font prevent Cumulative Layout Shift from custom fonts?',
    'How does next/font eliminate a separate request to Google Fonts?',
  ],
  'next/script — loading strategies (beforeInteractive, afterInteractive, lazyOnload)': [
    'What is the difference between beforeInteractive and afterInteractive strategies for next/script?',
    'When would you use lazyOnload for a third-party script?',
  ],

  // Linking & Navigation
  'next/link and client-side navigation': [
    'How does next/link differ from a plain <a> tag?',
    'What does next/link prefetch by default and when does it trigger?',
  ],
  'useRouter and useParams / useSearchParams (App Router)': [
    'How do you programmatically navigate in the App Router?',
    'How does useSearchParams work and what Suspense requirement does it have?',
  ],
  'Programmatic navigation (router.push, replace)': [
    'What is the difference between router.push and router.replace?',
    'How do you navigate to a route with query parameters programmatically?',
  ],

  // Caching Model
  'Request memoization (fetch dedupe)': [
    'What is request memoization in Next.js and how long does it last?',
    'How does memoization help when you fetch the same URL in multiple Server Components during one request?',
  ],
  'Data cache (persistent across requests)': [
    'How is the Data Cache different from request memoization?',
    'How do you opt out of the Data Cache for a specific fetch?',
  ],
  'Full route cache (static rendering output)': [
    'What is the Full Route Cache and what does it store?',
    'How do dynamic functions (cookies, headers) affect whether a route is statically cached?',
  ],
  'Router cache (client-side navigation cache)': [
    'What is the Router Cache and how long does it persist?',
    'How do you programmatically invalidate the Router Cache?',
  ],
  'Invalidating caches (revalidateTag/revalidatePath, router.refresh)': [
    'What is the difference between revalidateTag and revalidatePath?',
    'How does router.refresh() update the page without a full navigation?',
  ],
  'Opting out of caching': [
    'What are all the ways to opt a route or fetch out of caching in the App Router?',
    'How does using `cookies()` or `headers()` inside a Server Component affect caching?',
  ],

  // Environment & Configuration
  'next.config.js/ts options overview': [
    'What are the most commonly used next.config.js options?',
    'How do you enable experimental features in next.config.js?',
  ],
  'Environment variables (.env.local, NEXT_PUBLIC_ prefix)': [
    'What is the difference between a NEXT_PUBLIC_ env variable and a regular one?',
    'How do you access environment variables in a Server Component vs a Client Component?',
  ],
  'Runtime configuration (Node.js runtime vs Edge runtime)': [
    'What are the constraints of the Edge runtime compared to Node.js runtime?',
    'How do you set the runtime for a specific route segment?',
  ],
  'Redirects and rewrites config': [
    'How do you configure permanent redirects in next.config.js?',
    'How do rewrites differ from redirects in terms of URL visibility?',
  ],

  // Authentication & Authorization
  'Session/cookie-based auth patterns': [
    'How would you implement session-based authentication in a Next.js App Router app?',
    'How do you read a cookie in a Server Component vs a Client Component?',
  ],
  'Auth libraries overview (NextAuth.js / Auth.js)': [
    'What does Auth.js (NextAuth) handle for you out of the box?',
    'How do you protect a route using Auth.js with the App Router?',
  ],
  'Protecting routes with middleware': [
    'What is the advantage of protecting routes in middleware over in individual page components?',
    'How do you share auth session data from middleware to Server Components?',
  ],
  'Reading auth state in Server vs Client Components': [
    'How do you read the current user\'s session in a Server Component?',
    'How does a Client Component get auth state without a round-trip to the server?',
  ],

  // Deployment & Performance
  'Deploying to Vercel vs self-hosting (Node server / Docker)': [
    'What does Vercel add beyond a Node.js server for a Next.js app?',
    'How do you deploy a Next.js app as a Docker container with a Node.js server?',
    'What features don\'t work (or require extra setup) when self-hosting?',
  ],
  'Edge vs Node.js runtime trade-offs': [
    'What are the performance benefits of Edge runtime, and what APIs are missing?',
    'When would you run a route on the Edge vs on a standard Node.js server?',
  ],
  'Analyzing bundle size (next/bundle-analyzer)': [
    'How do you set up @next/bundle-analyzer and what does the output show?',
    'What are typical culprits for large client bundle sizes in a Next.js app?',
  ],
  'Core Web Vitals and Next.js': [
    'Which Next.js features most directly improve LCP, CLS, and INP?',
    'How do you measure Core Web Vitals in a Next.js app using the Speed Insights or built-in analytics?',
  ],
  'Incremental adoption strategies for App Router migration': [
    'How do you incrementally migrate a Pages Router app to the App Router?',
    'What are the most common breaking changes to watch out for when migrating?',
  ],

  // Testing in Next.js
  'Unit testing components (Jest/Vitest + RTL)': [
    'How do you set up Jest or Vitest for a Next.js project?',
    'What next-specific mocks do you need (e.g. next/navigation, next/image)?',
  ],
  'Testing Server Components (constraints & strategies)': [
    'Why is testing Server Components harder than testing Client Components?',
    'What strategies exist for testing Server Component data fetching logic?',
  ],
  'End-to-end testing (Playwright/Cypress)': [
    'How do you set up Playwright for a Next.js App Router project?',
    'How do you handle authentication state in E2E tests for protected routes?',
  ],
  'Mocking fetch and Server Actions in tests': [
    'How do you mock a Server Action in a component test?',
    'How do you use MSW with Next.js for mocking fetch calls in tests?',
  ],
};
