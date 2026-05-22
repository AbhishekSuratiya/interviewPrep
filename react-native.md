# React Native Advanced Concepts (Extensive Guide)

A deep-dive roadmap for senior-level React Native interviews, covering internals, architecture, performance, and the native ecosystem.

---

## 🏗️ 1. Deep Dive: New Architecture (New Arch)
- [ ] **JSI (JavaScript Interface)**:
    - [ ] How JSI removes the need for JSON serialization over the bridge.
    - [ ] Direct references to C++ objects from JavaScript.
    - [ ] Sync/Async execution via JSI.
- [ ] **Fabric Rendering System**:
    - [ ] Improved UI responsiveness and priority-based rendering.
    - [ ] Synchronous layout calculation.
    - [ ] C++ state sharing between JS and Native.
- [ ] **TurboModules**:
    - [ ] Lazy loading of native modules (on-demand initialization).
    - [ ] Strongly typed interfaces using **Codegen**.
    - [ ] Writing custom TurboModules in **Swift** or **Kotlin** when JS performance hits a ceiling.
    - [ ] Identifying when to drop to native (CPU-intensive crypto, image processing, Bluetooth).
- [ ] **Codegen**:
    - [ ] Generating C++ and Java/Obj-C code from JS specifications.
    - [ ] Reducing runtime errors through compile-time checks.
- [ ] **Yoga Engine**:
    - [ ] Understanding the Flexbox implementation in C++.
    - [ ] How it handles cross-platform layout differences.
- [ ] **Bridge vs. Fabric**:
    - [ ] Deep comparison: Old Bridge (JSON serialization, async-only) vs New Architecture (JSI, sync calls, shared C++ layer).
    - [ ] Migration path from Bridge to Fabric in a production app.
    - [ ] Impact on performance, debugging, and third-party library compatibility.

## ⚡ 2. Advanced Performance & Optimization
- [ ] **Frame Rate Optimization**:
    - [ ] Maintaining locked **60 FPS** (or **120 FPS** on ProMotion displays) across all views.
    - [ ] Identifying JS thread vs UI thread jank using profiling tools.
    - [ ] Common causes of frame drops: large re-renders, synchronous bridge calls, heavy JS computation.
    - [ ] Using `InteractionManager.runAfterInteractions()` to defer non-critical work.
- [ ] **Threading Model Mastery**:
    - [ ] Identifying bottlenecks: Is it the JS Thread or the UI Thread?
    - [ ] Dealing with "Bridge Congestion" (excessive serialization).
    - [ ] Understanding the Shadow Thread and its role in layout.
- [ ] **Memory Management**:
    - [ ] Identifying memory leaks in `Image` caching.
    - [ ] Understanding `FinalizationRegistry` and garbage collection in JS.
    - [ ] Detached views and listener leaks.
    - [ ] Debugging **native-layer memory leaks** and JS-thread hangs specifically.
- [ ] **List Optimization (List Mastery)**:
    - [ ] `FlatList` props: `windowSize`, `maxToRenderPerBatch`, `initialNumToRender`.
    - [ ] `getItemLayout` for fixed-height items to avoid dynamic measurement.
    - [ ] Using **FlashList (Shopify)** as a high-performance alternative to `FlatList`.
    - [ ] Optimizing large datasets (10,000+ items) — cell recycling, blank area minimization.
    - [ ] `keyExtractor` best practices and avoiding index-based keys.
- [ ] **Startup Optimization (TTI — Time to Interactive)**:
    - [ ] **KPI Target**: App launch to "ready" state in under **1.5 seconds** on mid-range devices.
    - [ ] **Hermes Binary**: Pre-compiled bytecode for faster app start.
    - [ ] Bundle size reduction (Tree shaking, ProGuard/R8).
    - [ ] Inline requires and delayed module loading.
    - [ ] Measuring TTI: `performance.now()`, Flipper startup plugin, native timestamps.
- [ ] **Profiling Tools (Jank Killing)**:
    - [ ] **Perf Monitor**: Monitoring FPS, RAM usage, and bridge traffic.
    - [ ] **Flipper**: Advanced network inspection, layout tree, and custom plugins.
    - [ ] **React DevTools**: Identifying unnecessary re-renders, profiling component trees.
    - [ ] **Systrace / Xcode Instruments / Android Profiler**: Deep native profiling.
    - [ ] Interpreting flame charts to pinpoint bottleneck functions.

## 🔄 3. Real-Time Data & State Integrity
- [ ] **Server State Management**:
    - [ ] **TanStack Query (React Query)**: Queries, mutations, query invalidation, stale-while-revalidate.
    - [ ] **SWR**: Stale-while-revalidate pattern, deduplication, focus revalidation.
    - [ ] Choosing between TanStack Query vs SWR vs custom solutions.
- [ ] **Background-to-Foreground Refetching**:
    - [ ] Using `AppState` listener to detect foreground/background transitions.
    - [ ] Engineering "Mission Critical" data refetch (Balance, Transactions, Recipients) within **200ms** of foregrounding.
    - [ ] `focusManager` in TanStack Query for automatic refetching on app focus.
    - [ ] Polling strategies for near-real-time data without WebSockets.
- [ ] **Optimistic UI (Instant-Success Patterns)**:
    - [ ] Implement instant UI feedback for payments and profile updates before server round-trip.
    - [ ] Rollback strategies on server failure (undo optimistic update).
    - [ ] `onMutate` / `onError` / `onSettled` hooks in TanStack Query for optimistic updates.
    - [ ] Handling race conditions between optimistic state and server response.
- [ ] **Cache Strategy (Zero-Spinner Experience)**:
    - [ ] Designing a local caching layer that eliminates loading spinners for returning users.
    - [ ] **MMKV** for key-value persistence (JSI-based, 30x faster than AsyncStorage).
    - [ ] Persisted queries with `persistQueryClient` (TanStack Query + MMKV).
    - [ ] Cache invalidation strategies: time-based, event-based, manual.
    - [ ] Stale data indicators vs loading spinners — UX patterns.

## 🎬 4. Animations & Gestures (Advanced)
- [ ] **Reanimated (v2/v3) — The Big Three (1/3)**:
    - [ ] **Worklets**: Running JS functions on the UI thread.
    - [ ] **Shared Values**: Reactive values that sync between threads.
    - [ ] **Shared Element Transitions**: Animating components across screens.
    - [ ] **Physics-Based Animations**: Spring, decay, and gravity-driven motion using `withSpring`, `withDecay`.
    - [ ] **Interruptible Animations**: Allowing users to interrupt/redirect animations mid-flight.
    - [ ] **Declarative Animation Patterns**: Ensuring all animations run exclusively on the UI thread (never on JS thread).
- [ ] **Gestures (Gesture Handler) — The Big Three (2/3)**:
    - [ ] Discrete vs Continuous gestures.
    - [ ] **Gesture Composition**: Simultaneously, Race, and Sequence.
    - [ ] Interacting with native scrolling systems.
    - [ ] **"Native-feel" Interactions**: Swipe-to-action, pinch-to-zoom, pull-to-refresh that respond instantly to touch.
    - [ ] Combining Gesture Handler with Reanimated for gesture-driven animations.
- [ ] **LayoutAnimation**:
    - [ ] Why it's performant (runs entirely on native) but has limitations (no per-property control).
- [ ] **Lottie & Skia**:
    - [ ] Integrating **React Native Skia** for high-performance 2D graphics.

## 🛡️ 5. Security & Data Persistence
- [ ] **Data Encryption**:
    - [ ] Securely storing sensitive data: `react-native-keychain` (iOS) and Keystore (Android).
    - [ ] SSL Pinning to prevent Man-in-the-Middle (MITM) attacks.
- [ ] **Persistence Strategies**:
    - [ ] **MMKV**: Why it's 30x faster than `AsyncStorage` (using JSI and memory mapping).
    - [ ] **SQLite**: Handling relational data with `react-native-quick-sqlite`.
    - [ ] **WatermelonDB**: High-performance, offline-first database.
- [ ] **Biometrics**:
    - [ ] Implementing FaceID / TouchID / Fingerprint authentication.
- [ ] **Code Obfuscation**:
    - [ ] Using ProGuard/R8 and Jscrambler to protect business logic.

## 🔌 6. Native Modules & Bridging (Deep Dive)
- [ ] **Native Modules Implementation**:
    - [ ] **Android**: JNI (Java Native Interface) and `@ReactMethod` annotation.
    - [ ] **iOS**: Objective-C Macros (`RCT_EXPORT_MODULE`, `RCT_EXPORT_METHOD`).
- [ ] **Event Emitting**:
    - [ ] Sending events from Native back to JS (DeviceEventEmitter).
- [ ] **Native UI Components**:
    - [ ] Creating custom native views and wrapping them for JS usage.
- [ ] **Threading in Native Modules**:
    - [ ] Offloading heavy work from the main UI thread to background queues.
- [ ] **Custom TurboModules (Swift / Kotlin)**:
    - [ ] When to write a TurboModule: crypto operations, hardware access, CPU-intensive tasks.
    - [ ] Step-by-step: Creating a TurboModule in **Swift** with Codegen spec.
    - [ ] Step-by-step: Creating a TurboModule in **Kotlin** with Codegen spec.
    - [ ] Benchmarking: JS implementation vs Native TurboModule performance comparison.

## 🗺️ 7. Navigation & Deep Linking
- [ ] **React Navigation Architecture**:
    - [ ] State persistence and restoration.
    - [ ] Customizing transitions and header behavior.
- [ ] **Zero-Lag Navigation (1-1 Screen Transition Map)**:
    - [ ] Architect a **1-to-1 screen transition map** (forward and backward) using Native Stack.
    - [ ] Hardware-accelerated transitions with `react-native-screens`.
    - [ ] **Transition Latency KPI**: Zero perceptible lag between screen taps and transition starts.
    - [ ] Pre-loading screens and lazy screen initialization.
    - [ ] Avoiding re-renders on navigation (memoization, `React.memo`, stable callbacks).
- [ ] **react-native-screens — The Big Three (3/3)**:
    - [ ] Using true native screen primitives instead of JS-based views.
    - [ ] `enableScreens()` and how it reduces memory by detaching offscreen views.
    - [ ] Native Stack vs JS Stack: performance comparison and trade-offs.
- [ ] **Deep Linking & Universal Links**:
    - [ ] Handling links when the app is closed (cold start) vs backgrounded.
    - [ ] Branch.io vs Firebase Dynamic Links integration.

## 🛠️ 8. DevOps & CI/CD for Mobile
- [ ] **Fastlane**:
    - [ ] **Match**: Centralized code signing for the whole team.
    - [ ] **Supply/Deliver**: Automated metadata and screenshot uploads to stores.
- [ ] **EAS (Expo Application Services)**:
    - [ ] **EAS Build**: Cloud-based managed builds.
    - [ ] **EAS Submit**: Automated store submission pipelines.
    - [ ] **EAS Update**: Dynamically updating JS code without store approval.
- [ ] **Environment Management**:
    - [ ] Handling `.env` across JS, Java, and Swift.

## 🧪 9. Advanced Testing
- [ ] **Detox (E2E)**:
    - [ ] Dealing with flakiness and synchronization issues.
    - [ ] Mocking network responses in E2E tests.
- [ ] **Visual Regression Testing**:
    - [ ] Using tools like Applitools or custom snapshot comparisons.
- [ ] **Component Testing**:
    - [ ] Testing hooks and animations with React Native Testing Library.

## 🚨 10. Crash Management & Error Tracking
- [ ] **Crash Monitoring Infrastructure**:
    - [ ] Setting up **Sentry** for React Native: JS errors + native crashes.
    - [ ] Setting up **Firebase Crashlytics** as an alternative.
    - [ ] Achieving a **99.9% crash-free rate** — strategies and monitoring.
- [ ] **Native Crash Debugging**:
    - [ ] Debugging native-layer memory leaks (Instruments on iOS, Android Profiler).
    - [ ] Debugging JS-thread hangs and ANRs (Application Not Responding).
    - [ ] Symbolication of native crash reports.
- [ ] **Error Boundaries**:
    - [ ] Implementing React Error Boundaries for graceful degradation.
    - [ ] Fallback UI strategies for different error types.
    - [ ] Reporting caught errors to Sentry/Crashlytics with context.

## 🌟 11. Modern Mobile Patterns
- [ ] **Offline-First Architecture**:
    - [ ] Optimistic UI updates with server reconciliation.
    - [ ] Background sync using `Headless JS` (Android) or Background Tasks (iOS).
    - [ ] Conflict resolution strategies (last-write-wins, CRDT, merge queues).
    - [ ] Building an "Offline-First" portfolio project.
- [ ] **Micro-Frontends in Mobile**:
    - [ ] Using **Module Federation** or multiple bundles.
- [ ] **Feature Flagging**:
    - [ ] Integrating Firebase Remote Config or LaunchDarkly.

## 💰 12. Fintech & Mobile Money Patterns
- [ ] **Sensitive Data Handling**:
    - [ ] Secure display of balances, account numbers, and transaction history.
    - [ ] Screen capture prevention on sensitive screens.
    - [ ] Masking/unmasking patterns for PII.
- [ ] **Payment Flow UX**:
    - [ ] Optimistic payment confirmations with rollback on failure.
    - [ ] Idempotency keys for preventing duplicate transactions.
    - [ ] Transaction status polling and real-time receipt generation.
- [ ] **Compliance & Regulatory**:
    - [ ] KYC/AML flow integration patterns.
    - [ ] Session timeout and auto-lock for financial apps.
    - [ ] Audit logging for user actions.

## 📊 13. Key Performance Indicators (KPI Targets)
- [ ] **TTI (Time to Interactive)**: App launch → "ready" state in under **1.5s** on mid-range devices.
- [ ] **Frame Rate**: Locked **60 FPS** (or 120 FPS on ProMotion) across all lists and complex views.
- [ ] **Transition Latency**: Zero perceptible lag between screen taps and transition starts.
- [ ] **Data Freshness**: Critical financial data verified/refetched within **200ms** of app foregrounding.
- [ ] **Crash-Free Rate**: Achieve and maintain **99.9%** crash-free sessions.
- [ ] **Bundle Size**: Minimize JS bundle to improve OTA update speed and cold-start time.
