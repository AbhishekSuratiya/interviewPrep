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
- [ ] **Codegen**:
    - [ ] Generating C++ and Java/Obj-C code from JS specifications.
    - [ ] Reducing runtime errors through compile-time checks.
- [ ] **Yoga Engine**:
    - [ ] Understanding the Flexbox implementation in C++.
    - [ ] How it handles cross-platform layout differences.

## ⚡ 2. Advanced Performance & Optimization
- [ ] **Threading Model Mastery**:
    - [ ] Identifying bottlenecks: Is it the JS Thread or the UI Thread?
    - [ ] Dealing with "Bridge Congestion" (excessive serialization).
- [ ] **Memory Management**:
    - [ ] Identifying memory leaks in `Image` caching.
    - [ ] Understanding `FinalizationRegistry` and garbage collection in JS.
    - [ ] Detached views and listener leaks.
- [ ] **List Optimization**:
    - [ ] `FlatList` props: `windowSize`, `maxToRenderPerBatch`, `initialNumToRender`.
    - [ ] `getItemLayout` for fixed-height items to avoid dynamic measurement.
    - [ ] Using `FlashList` (Shopify) as a high-performance alternative to `FlatList`.
- [ ] **Startup Optimization**:
    - [ ] **Hermes Binary**: Pre-compiled bytecode for faster app start.
    - [ ] Bundle size reduction (Tree shaking, ProGuard/R8).
    - [ ] Inline requires and delayed module loading.
- [ ] **Profiling Tools**:
    - [ ] **Perf Monitor**: Monitoring FPS, RAM usage, and bridge traffic.
    - [ ] **Flipper**: Advanced network inspection, layout tree, and custom plugins.
    - [ ] **Systrace / Xcode Instruments**: Deep native profiling.

## 🎬 3. Animations & Gestures (Advanced)
- [ ] **Reanimated (v2/v3)**:
    - [ ] **Worklets**: Running JS functions on the UI thread.
    - [ ] **Shared Values**: Reactive values that sync between threads.
    - [ ] **Shared Element Transitions**: Animating components across screens.
- [ ] **Gestures (Gesture Handler)**:
    - [ ] Discrete vs Continuous gestures.
    - [ ] **Gesture Composition**: Simultaneously, Race, and Sequence.
    - [ ] Interacting with native scrolling systems.
- [ ] **LayoutAnimation**:
    - [ ] Why it's performant (runs entirely on native) but has limitations (no per-property control).
- [ ] **Lottie & Skia**:
    - [ ] Integrating **React Native Skia** for high-performance 2D graphics.

## 🛡️ 4. Security & Data Persistence
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

## 🔌 5. Native Modules & Bridging (Deep Dive)
- [ ] **Native Modules Implementation**:
    - [ ] **Android**: JNI (Java Native Interface) and `@ReactMethod` annotation.
    - [ ] **iOS**: Objective-C Macros (`RCT_EXPORT_MODULE`, `RCT_EXPORT_METHOD`).
- [ ] **Event Emitting**:
    - [ ] Sending events from Native back to JS (DeviceEventEmitter).
- [ ] **Native UI Components**:
    - [ ] Creating custom native views and wrapping them for JS usage.
- [ ] **Threading in Native Modules**:
    - [ ] Offloading heavy work from the main UI thread to background queues.

## 🗺️ 6. Navigation & Deep Linking
- [ ] **React Navigation Architecture**:
    - [ ] State persistence and restoration.
    - [ ] Customizing transitions and header behavior.
- [ ] **Deep Linking & Universal Links**:
    - [ ] Handling links when the app is closed (cold start) vs backgrounded.
    - [ ] Branch.io vs Firebase Dynamic Links integration.
- [ ] **Native Stack**:
    - [ ] Using `react-native-screens` for true native primitives.

## 🛠️ 7. DevOps & CI/CD for Mobile
- [ ] **Fastlane**:
    - [ ] **Match**: Centralized code signing for the whole team.
    - [ ] **Supply/Deliver**: Automated metadata and screenshot uploads to stores.
- [ ] **EAS (Expo Application Services)**:
    - [ ] **EAS Build**: Cloud-based managed builds.
    - [ ] **EAS Submit**: Automated store submission pipelines.
    - [ ] **EAS Update**: Dynamically updating JS code without store approval.
- [ ] **Environment Management**:
    - [ ] Handling `.env` across JS, Java, and Swift.

## 🧪 8. Advanced Testing
- [ ] **Detox (E2E)**:
    - [ ] Dealing with flakiness and synchronization issues.
    - [ ] Mocking network responses in E2E tests.
- [ ] **Visual Regression Testing**:
    - [ ] Using tools like Applitools or custom snapshot comparisons.
- [ ] **Component Testing**:
    - [ ] Testing hooks and animations with React Native Testing Library.

## 🌟 9. Modern Mobile Patterns
- [ ] **Offline-First Architecture**:
    - [ ] Optimistic UI updates.
    - [ ] Background sync using `Headless JS` (Android) or Background Tasks (iOS).
- [ ] **Micro-Frontends in Mobile**:
    - [ ] Using **Module Federation** or multiple bundles.
- [ ] **Feature Flagging**:
    - [ ] Integrating Firebase Remote Config or LaunchDarkly.
