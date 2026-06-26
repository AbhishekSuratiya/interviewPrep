import { enrich } from './enrich.mjs';

const map = {
  'complete-flow': {
    analogy: "From tap to pixels is an assembly line: your JS writes the order (JSX), Yoga measures where each part goes, Fabric assembles native views, and the GPU paints them — with touches flowing back up the line in reverse.",
    keyPoints: [
      "Native boots → Hermes loads the JS bundle → React renders your tree.",
      "JSX → element tree → Fabric shadow tree → Yoga layout (C++).",
      "Commit phase turns shadow nodes into real native views.",
      "GPU (RenderThread / Core Animation) composites pixels.",
      "Touches flow back: OS → Gesture Handler → React event → your handler.",
    ],
  },
  'jsi-detail': {
    analogy: "JSI is a direct phone line between JS and C++, replacing the old 'mail a letter and wait' bridge: JS holds the native object directly and calls it synchronously, with no envelope (JSON) to pack and unpack.",
    keyPoints: [
      "Exposes a C++ API directly to the JS engine.",
      "JS can hold direct references to C++ objects (HostObjects).",
      "Calls are synchronous — no async bridge queue, no JSON.",
      "Engine-agnostic (Hermes, V8, JSC).",
      "Foundation for TurboModules, Fabric, and Reanimated worklets.",
    ],
  },
  'fabric-detail': {
    analogy: "Fabric is a renderer with a shared blueprint: instead of mailing layout data across a bridge, JS and the UI thread read the same C++ shadow tree — so layout is synchronous and gestures can jump the queue.",
    keyPoints: [
      "New renderer replacing the old UIManager.",
      "Synchronous layout via a shared C++ shadow tree.",
      "Priority-based: gestures/animations beat data updates.",
      "No bridge serialization for layout — uses shared pointers.",
      "Brings Concurrent features (Suspense, transitions) to native.",
    ],
  },
  'turbomodules-detail': {
    analogy: "TurboModules are appliances that only power on when you use them: instead of booting every native module at startup, each one lazily initializes on first call — and Codegen wires the types so JS and native can't disagree.",
    keyPoints: [
      "Replace the old NativeModules bridge.",
      "Lazy-loaded — initialize only when first called (faster startup).",
      "JSI-based: direct calls, can return synchronously.",
      "Codegen turns a TS spec into typed C++/Java/ObjC glue.",
      "Type mismatches caught at build time, not runtime.",
    ],
  },
  'hermes-engine': {
    analogy: "Hermes is like shipping a pre-cooked meal instead of raw ingredients: it compiles JS to bytecode at build time, so the app just heats it up (loads + runs) instead of parsing JS on every launch.",
    keyPoints: [
      "JS engine purpose-built for React Native.",
      "Ahead-of-time bytecode → much faster startup.",
      "Lower, more compact memory footprint for mobile.",
      "Supports Chrome DevTools debugging + CPU profiling.",
      "Default engine since RN 0.70 on both platforms.",
    ],
  },
  'yoga-layout': {
    analogy: "Yoga is a cross-platform ruler: a C++ Flexbox engine that measures every view's size and position the same way on iOS and Android, off the main thread.",
    keyPoints: [
      "C++ implementation of CSS Flexbox.",
      "Runs off-thread; commits computed layout to native.",
      "Ensures iOS/Android layout consistency.",
      "flexDirection defaults to 'column' (unlike the web's 'row').",
      "No CSS Grid; values are unitless density-independent points.",
    ],
  },
  'new-arch-deep-dive': {
    analogy: "The New Architecture is a factory upgrade: the slow conveyor belt (JSON bridge) is replaced by direct hand-offs (JSI), work is sorted by urgency (Fabric lanes), and machines power on only when needed (TurboModules).",
    keyPoints: [
      "Replaces the async JSON bridge with direct, synchronous JSI calls.",
      "Four threads: JS, Render (Fabric), Background (Yoga), UI.",
      "Fabric uses priority lanes: input > animation > data.",
      "TurboModules lazy-load native modules to speed startup.",
      "Net win: a concurrent, synchronous, on-demand model — not just 'faster'.",
    ],
  },
  'storage-overview': {
    analogy: "Picking RN storage is like picking where to keep things at home: a sticky note for preferences (MMKV), a safe for valuables (Keychain), a filing cabinet for records (SQLite), and the garage for big boxes (file system).",
    keyPoints: [
      "Simple key-value, non-sensitive → MMKV (fast, sync).",
      "Secrets/tokens → Keychain/Keystore (OS-encrypted).",
      "Relational/large data → WatermelonDB or SQLite.",
      "Large files/media → file system; store the path in MMKV.",
      "Never put auth tokens in AsyncStorage.",
    ],
  },
  'asyncstorage': {
    analogy: "AsyncStorage is a basic notebook you mail back and forth (async) with everything written as plain text: fine for small non-secret notes, but slow and unencrypted for anything serious.",
    keyPoints: [
      "Async, Promise-based, unencrypted string key-value store.",
      "Must JSON.stringify/parse objects yourself.",
      "Good for simple preferences and onboarding flags.",
      "~50x slower than MMKV; not for large or sensitive data.",
      "Use multiSet/multiGet to batch operations.",
    ],
  },
  'mmkv': {
    analogy: "MMKV is the express lane for key-value storage: JSI makes reads/writes synchronous and instant (no await), with optional AES encryption built in.",
    keyPoints: [
      "JSI-backed — synchronous reads/writes (no await).",
      "30–50x faster than AsyncStorage.",
      "Built-in AES-256 encryption and multiple instances.",
      "Stores strings, numbers, booleans natively.",
      "Change listeners let you sync MMKV with React state.",
    ],
  },
  'watermelondb': {
    analogy: "WatermelonDB is a lazy, reactive filing system on top of SQLite: it only pulls the records you actually look at, and screens auto-update when the underlying data changes.",
    keyPoints: [
      "Relational store (SQLite) tuned for React Native.",
      "Observable — components re-render when the DB changes.",
      "Lazy loading scales to thousands of records.",
      "Built for offline-first with server sync.",
      "Use for posts/messages/threads and complex queries.",
    ],
  },
  'keychain-storage': {
    analogy: "Keychain/Keystore is the device's built-in safe, backed by a hardware vault (Secure Enclave): the right place for tokens and passwords, optionally locked behind Face ID/fingerprint.",
    keyPoints: [
      "OS-level encryption (iOS Keychain / Android Keystore).",
      "Hardware-backed; supports biometric-gated access.",
      "Use for auth tokens, passwords, API/encryption keys.",
      "iOS Keychain can survive reinstall — clear on first launch.",
      "Never store secrets in AsyncStorage/MMKV-plain instead.",
    ],
  },
  'flashlist': {
    analogy: "FlatList rebuilds each row as it scrolls past (wasteful); FlashList reuses a small pool of rows like a paternoster lift — the same native views cycle through, so scrolling stays smooth.",
    keyPoints: [
      "Recycles native views (like RecyclerView/UICollectionView).",
      "Much less JS + native work while scrolling vs FlatList.",
      "Drop-in API; only adds required estimatedItemSize.",
      "overrideItemLayout handles variable-height rows.",
      "Pair with React.memo'd rows and FastImage for best results.",
    ],
  },
  'react-native-fast-image': {
    analogy: "The built-in Image re-downloads the same picture every time; FastImage is a cached photo album backed by native libraries (Glide/SDWebImage) — seen-it-before images appear instantly.",
    keyPoints: [
      "Disk + memory caching (survives restarts) via Glide/SDWebImage.",
      "Priority queuing loads visible images first.",
      "Progressive JPEG and prefetching support.",
      "cacheControl.immutable for hashed CDN URLs.",
      "Essential for any image-heavy feed.",
    ],
  },
  'reanimated-v3': {
    analogy: "Reanimated runs your animation on the UI thread directly (via worklets), like a self-driving car that keeps going even if the navigator (JS thread) is busy — so you stay at 60fps no matter what.",
    keyPoints: [
      "Worklets are JS functions that run on the UI thread.",
      "SharedValues are shared across JS/UI threads via JSI.",
      "Animates at 60–120fps even if the JS thread is blocked.",
      "Integrates with Gesture Handler for gesture-driven motion.",
      "Core APIs: useSharedValue, useAnimatedStyle, withSpring/withTiming.",
    ],
  },
  'zustand-rn': {
    analogy: "Zustand + MMKV is the RN sweet spot: Zustand is a lightweight shared whiteboard for state, and MMKV is the instant notebook that persists it — together replacing the heavier Redux + redux-persist combo.",
    keyPoints: [
      "Zustand: fast global state, no Provider, atomic selectors.",
      "MMKV: synchronous persistence, 30x faster than AsyncStorage.",
      "Use zustand persist middleware with an MMKV adapter.",
      "Auto-hydrates state on app launch.",
      "Simpler/faster than Redux + redux-persist for most RN apps.",
    ],
  },
  'deep-link-types': {
    analogy: "Deep links are different kinds of doorbells: a custom scheme (myapp://) is a private buzzer that fails if nobody's home; Universal/App Links are a real street address (https://) that opens the app if installed, or the website if not.",
    keyPoints: [
      "Custom schemes (myapp://): easy, but warn/fail if app missing.",
      "Universal/App Links (https://): open app or fall back to web.",
      "Universal/App Links need AASA (iOS) / assetlinks.json (Android).",
      "HTTPS links can't be impersonated by other apps (more secure).",
      "Deferred deep links survive install (Branch/Firebase Dynamic Links).",
    ],
  },
  'universal-links': {
    analogy: "Universal/App Links are a notarized address: you publish a verification file on your domain, and the OS checks it at install so only your app can claim those https links.",
    keyPoints: [
      "iOS: AASA file at /.well-known/apple-app-site-association.",
      "Android: assetlinks.json at /.well-known/ with cert fingerprint.",
      "Android intent filter needs autoVerify=true.",
      "Seamless open-in-app with web fallback.",
      "Cannot be hijacked by other apps (unlike custom schemes).",
    ],
  },
  'ssl-pinning': {
    analogy: "SSL pinning is recognizing your contact's actual face, not just any ID badge: even a 'valid' certificate from a trusted CA is rejected unless it matches the one you bundled — defeating man-in-the-middle proxies.",
    keyPoints: [
      "Validates the server cert against a copy bundled in the app.",
      "Stops MITM even with a compromised/rogue trusted CA.",
      "Public-key pinning survives cert rotation; cert pinning doesn't.",
      "Always pin a backup key so rotation doesn't brick users.",
      "Use react-native-ssl-pinning / OkHttp (Android) / TrustKit (iOS).",
    ],
  },
  'code-obfuscation': {
    analogy: "Obfuscation and tamper checks are like scrambling the blueprints and adding alarm sensors: they don't make breaking in impossible, but they raise the effort enough to deter most attackers.",
    keyPoints: [
      "ProGuard/R8 minify + obfuscate Android bytecode.",
      "Hermes bytecode is harder to read than raw JS.",
      "Detect jailbreak/root (JailMonkey) to gate sensitive features.",
      "Add tamper/anti-debugging checks for high-value apps.",
      "Keep truly sensitive logic on the server — clients are inspectable.",
    ],
  },
  'navigation-types': {
    analogy: "Navigators are different ways to move through an app: a Stack is a pile of cards you push/pop, Tabs are channels you flip between, a Drawer slides in from the side — and you nest them for real flows.",
    keyPoints: [
      "Native Stack uses platform transitions and is fastest.",
      "Bottom/Top Tabs and Drawer cover the common patterns.",
      "Nest navigators (Tab inside Stack) for complex flows.",
      "Gate auth by conditionally rendering Auth vs Main stacks.",
      "Prefer Native Stack over JS Stack for performance.",
    ],
  },
  'perf-complete': {
    analogy: "RN performance is tuning a car across systems: a fast start (Hermes), a clear engine (less JS work/re-renders), smooth wheels (recycled lists, native-driver animations), and not overloading the trunk (memory).",
    keyPoints: [
      "Startup: Hermes bytecode, inline requires, lazy modules.",
      "JS thread: memoize, batch updates, offload heavy work.",
      "UI thread: FlashList recycling, fixed sizes, useNativeDriver.",
      "Defer non-critical work with InteractionManager.",
      "Memory: clean up listeners/timers, cap image cache, paginate.",
    ],
  },
  'fastlane-eas': {
    analogy: "Fastlane/EAS is an assembly line for releases: it handles the fiddly signing, building, and store submission automatically, so shipping isn't a manual ritual one person knows.",
    keyPoints: [
      "Fastlane automates signing, beta distribution, and store submission.",
      "EAS Build does cloud native builds without local Xcode/Studio.",
      "Fastlane Match shares certs via an encrypted git repo.",
      "Version strategy: user-facing version + monotonic build number.",
      "Support per-environment builds (dev/staging/prod).",
    ],
  },
  'ota-updates': {
    analogy: "OTA updates are patching the software without recalling the car: you push new JS straight to users (no store review), and roll back instantly if a patch misbehaves — but native parts still need a real release.",
    keyPoints: [
      "Push new JS/asset bundles without app-store review.",
      "Native code changes still require a full store release.",
      "CodePush and EAS Update are the main options.",
      "Support phased rollout and instant rollback.",
      "Respect store rules — OTA can't change the app's core purpose.",
    ],
  },
  'offline-sync': {
    analogy: "Offline sync is a mailroom outbox: actions taken with no signal queue up locally, then get delivered in order when you reconnect — with rules for what happens if two letters conflict.",
    keyPoints: [
      "Outbox pattern: queue mutations locally, replay on reconnect.",
      "Read from the local DB as the source of truth, not the API.",
      "Conflict strategies: last-write-wins, first-write-wins, merge, CRDTs.",
      "Use optimistic UI for instant feedback.",
      "Flush the queue when NetInfo reports reconnection.",
    ],
  },
  'network-monitoring': {
    analogy: "NetInfo is a signal-bars meter that also checks if the bars actually reach the internet — important in places (captive WiFi, subways) where you're 'connected' but going nowhere.",
    keyPoints: [
      "Provides isConnected, isInternetReachable, type, and details.",
      "isConnected ≠ isInternetReachable (captive portals).",
      "Consider a custom reachability ping to your own server.",
      "Adapt behavior on slow networks (smaller pages, lower-res images).",
      "Show offline banners and flush queues on reconnect.",
    ],
  },
  'writing-native-modules': {
    analogy: "Writing a TurboModule is like ordering a custom part from a single spec sheet: you write one TypeScript spec, Codegen machines the matching iOS and Android brackets, and you bolt in the platform implementation.",
    keyPoints: [
      "Flow: TS spec → Codegen → native impl (Kotlin/Swift) → use in JS.",
      "The TS spec is the single source of truth for both platforms.",
      "Codegen eliminates old NativeModules type-mismatch bugs.",
      "Can return values synchronously (via JSI).",
      "Use event emitters for async device callbacks.",
    ],
  },
  'native-ui-components': {
    analogy: "A Fabric Native Component is wrapping a native gadget (camera view, signature pad) in a React-shaped frame: JS sets props and listens for events while the real native view does the drawing.",
    keyPoints: [
      "Render actual native views (vs TurboModules' functions/data).",
      "Props defined in TS; Codegen generates the bridge.",
      "Uses Fabric's synchronous layout system.",
      "Manage the embedded SDK view's lifecycle (pause/resume).",
      "Expose imperative methods via refs (play/pause/clear).",
    ],
  },
  'nx-turbo-monorepo': {
    analogy: "A monorepo is one toolbox shared by the mobile app, web app, and backend: platform-agnostic tools (types, logic, API client) live in shared drawers, while platform-specific tools stay with each app.",
    keyPoints: [
      "Share types, business logic, API clients, design tokens, schemas.",
      "Nx (rich plugins) or Turborepo (simpler) orchestrate builds.",
      "Metro needs watchFolders + resolver config for symlinked packages.",
      "Don't share UI markup directly — RN and web primitives differ.",
      "Share headless hooks; wrap them per platform.",
    ],
  },
  'detox-e2e': {
    analogy: "Detox is a robot tester that can see inside React Native: because it knows when the JS thread is idle, it waits for the app to settle before tapping — no guesswork sleeps, far fewer flaky tests.",
    keyPoints: [
      "Gray-box E2E — aware of the RN runtime's idle state.",
      "Auto-waits for JS/animations, reducing flakiness.",
      "Runs on real simulators/emulators or devices.",
      "Pattern: matchers (by.id/text) + actions + expectations.",
      "Mock network and reloadReactNative() between tests for stability.",
    ],
  },
  'rn-unit-testing': {
    analogy: "React Native Testing Library tests like a user, not an X-ray: query by role/text and assert what's on screen. Native modules don't exist in Jest, so you mock them at the edges.",
    keyPoints: [
      "RNTL mirrors RTL: test behavior, query by role/text/label.",
      "Native modules must be mocked in the Jest environment.",
      "jest-native adds matchers (toHaveStyle, toBeDisabled).",
      "Test accessibility roles for inclusive UIs.",
      "Mock Platform.OS to cover iOS/Android branches.",
    ],
  },
  'crash-reporting': {
    analogy: "Crash reporting is a flight recorder for your app: when it goes down, symbolicated stack traces plus breadcrumbs (the last actions/requests) tell you exactly what happened on a device you can't hold.",
    keyPoints: [
      "Capture BOTH JS and native crashes (Sentry/Bugsnag).",
      "Upload dSYMs (iOS) and ProGuard maps (Android) to symbolicate.",
      "Breadcrumbs record navigation/network/actions before a crash.",
      "Tag crashes by app + OTA release version.",
      "Strip sensitive data in beforeSend; alert on crash-rate spikes.",
    ],
  },
};

enrich(new URL('../data/react-native.json', import.meta.url).pathname, map);
