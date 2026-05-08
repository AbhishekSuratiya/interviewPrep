// Part 5: React Native Concepts + React-Relevant JS Concepts
Object.assign(conceptsData, {
    // ===== REACT NATIVE =====
    "JSI (JavaScript Interface)": {
        explanation: "The backbone of RN's New Architecture. JSI allows the JS engine to hold direct references to C++ host objects and invoke methods synchronously—no JSON serialization, no async bridge. Enables TurboModules and Fabric.",
        code: `// Conceptually, JSI enables:\nconst result = nativeModule.compute(data); // Synchronous!\n// Old Bridge: JS → JSON.stringify → Bridge → Native → JSON.parse → JS\n// JSI:        JS → C++ direct call → result`
    },
    "Fabric Rendering System": {
        explanation: "The new rendering system replacing the old UI Manager. Fabric renders on the UI thread synchronously, supports priority-based updates, and shares immutable state trees in C++ between JS and Native threads.",
        code: `// Fabric benefits:\n// 1. Synchronous layout (no bridge delay)\n// 2. Priority rendering (gestures > data updates)\n// 3. Shared C++ shadow tree between threads`
    },
    "TurboModules": {
        explanation: "Next-gen native modules that are lazy-loaded (initialized only when first called, not at startup). Use Codegen for type-safe JS↔Native interfaces. Significantly improve app startup time.",
        code: `// TurboModules are auto-generated from specs\n// spec: NativeCalendar.js\nimport type { TurboModule } from 'react-native';\nexport interface Spec extends TurboModule {\n  getEvents(date: string): Promise<Event[]>;\n}`
    },
    "Codegen": {
        explanation: "A build-time tool that generates native (C++, Java, ObjC) code from JavaScript/TypeScript type definitions. Ensures type safety between JS and native layers. Eliminates runtime type mismatches.",
        code: `// Define a spec file:\n// NativeCalculator.ts\nimport { TurboModuleRegistry } from 'react-native';\nexport interface Spec extends TurboModule {\n  multiply(a: number, b: number): number;\n}\nexport default TurboModuleRegistry.get<Spec>('Calculator');`
    },
    "Yoga Engine": {
        explanation: "A cross-platform layout engine written in C++ that implements Flexbox. Used by React Native to calculate layout on a background thread. Handles platform differences in layout behavior.",
        code: `// Yoga translates these styles to native layout:\n<View style={{\n  flexDirection: 'row',\n  justifyContent: 'space-between',\n  alignItems: 'center',\n  flex: 1\n}} />`
    },
    "Threading Model Mastery": {
        explanation: "RN has 3+ threads: 1) JS Thread (runs your code), 2) Main/UI Thread (renders native UI), 3) Shadow Thread (layout calculations). With New Arch, JSI allows direct JS↔UI communication.",
        code: `// Check which thread is blocking:\n// Perf Monitor shows JS FPS and UI FPS\n// Low JS FPS → heavy JS computation\n// Low UI FPS → heavy native rendering/layout`
    },
    "Memory Management": {
        explanation: "Monitor with Flipper/Xcode Instruments. Common leaks: unremoved event listeners, uncancelled timers, large images in cache, navigation keeping unmounted screens in memory.",
        code: `useEffect(() => {\n  const listener = AppState.addEventListener('change', handler);\n  return () => listener.remove(); // MUST clean up!\n}, []);\n\n// Image cache leak fix:\nImage.getSize(uri, () => {}, () => {}); // Handle errors`
    },
    "List Optimization": {
        explanation: "FlatList renders only visible items. Key props: windowSize (render window multiplier), maxToRenderPerBatch, initialNumToRender, getItemLayout (skip measurement for fixed-height). FlashList by Shopify is faster.",
        code: `<FlatList\n  data={items}\n  renderItem={renderItem}\n  keyExtractor={item => item.id}\n  getItemLayout={(_, index) => ({\n    length: 80, offset: 80 * index, index\n  })}\n  windowSize={5}\n  maxToRenderPerBatch={10}\n  removeClippedSubviews={true}\n/>`
    },
    "Startup Optimization": {
        explanation: "Use Hermes engine (pre-compiled bytecode). Enable inline requires (lazy module loading). Reduce bundle size with ProGuard/R8. Minimize initial imports. Use RAM bundles for large apps.",
        code: `// Enable Hermes in android/app/build.gradle\nproject.ext.react = [\n  enableHermes: true\n]\n\n// Inline requires in metro.config.js\nmodule.exports = {\n  transformer: { getTransformOptions: () => ({\n    transform: { inlineRequires: true }\n  })}\n};`
    },
    "Reanimated (v2/v3)": {
        explanation: "Runs animations on the UI thread via Worklets (small JS functions compiled to run on UI thread). SharedValues sync between threads without bridge. Enables 60fps animations even when JS thread is busy.",
        code: `import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';\n\nconst offset = useSharedValue(0);\nconst animatedStyle = useAnimatedStyle(() => ({\n  transform: [{ translateX: withSpring(offset.value) }]\n}));\n// offset.value = 100; // Triggers smooth animation`
    },
    "Gestures (Gesture Handler)": {
        explanation: "react-native-gesture-handler provides native-driven gesture recognition. Supports Tap, Pan, Pinch, Rotation, Fling, LongPress. Gesture composition: Simultaneous, Exclusive, Race.",
        code: `import { Gesture, GestureDetector } from 'react-native-gesture-handler';\n\nconst pan = Gesture.Pan()\n  .onUpdate(e => { offset.value = e.translationX; })\n  .onEnd(() => { offset.value = withSpring(0); });\n\n<GestureDetector gesture={pan}>\n  <Animated.View style={animatedStyle} />\n</GestureDetector>`
    },
    "LayoutAnimation": {
        explanation: "Animate layout changes globally with a single call. Runs entirely on the native thread (performant). Limited: can't control individual properties or chain animations. Good for simple show/hide, list reorder.",
        code: `import { LayoutAnimation } from 'react-native';\n\nfunction toggleExpanded() {\n  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);\n  setExpanded(prev => !prev);\n}`
    },
    "Lottie & Skia": {
        explanation: "Lottie renders After Effects animations exported as JSON. React Native Skia provides a high-performance 2D graphics API (shaders, gradients, paths, image filters) using the Skia engine (same as Chrome/Android).",
        code: `// Lottie\nimport LottieView from 'lottie-react-native';\n<LottieView source={require('./anim.json')} autoPlay loop />\n\n// Skia\nimport { Canvas, Circle } from '@shopify/react-native-skia';\n<Canvas><Circle cx={100} cy={100} r={50} color="cyan" /></Canvas>`
    },
    "Data Encryption": {
        explanation: "Store sensitive data in platform-specific secure storage: iOS Keychain (react-native-keychain) or Android Keystore. Implement SSL Pinning to prevent MITM attacks. Never store tokens in AsyncStorage.",
        code: `import * as Keychain from 'react-native-keychain';\n\n// Save\nawait Keychain.setGenericPassword('user', 'token123');\n\n// Retrieve\nconst creds = await Keychain.getGenericPassword();\nconsole.log(creds.password); // 'token123'`
    },
    "MMKV": {
        explanation: "Ultra-fast key-value storage using JSI (no bridge). 30x faster than AsyncStorage. Supports encryption, multiple instances, and synchronous reads/writes. Created by Tencent's WeChat team.",
        code: `import { MMKV } from 'react-native-mmkv';\nconst storage = new MMKV();\n\nstorage.set('user.name', 'Abhishek');\nstorage.set('user.age', 28);\n\nconst name = storage.getString('user.name');\nconst age = storage.getNumber('user.age');`
    },
    "Native Modules Implementation": {
        explanation: "Expose native platform APIs to JS. Android: Create a Java/Kotlin class extending ReactContextBaseJavaModule, annotate methods with @ReactMethod. iOS: Create ObjC/Swift class, use RCT_EXPORT_MODULE and RCT_EXPORT_METHOD macros.",
        code: `// Android (Java)\n@ReactMethod\npublic void showToast(String message) {\n  Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_SHORT).show();\n}\n\n// iOS (ObjC)\nRCT_EXPORT_METHOD(showToast:(NSString *)message) {\n  // Show native toast\n}`
    },
    "Event Emitting": {
        explanation: "Send events from native code to JS. Android: use RCTDeviceEventEmitter. iOS: use sendEventWithName. JS listens with DeviceEventEmitter or NativeEventEmitter.",
        code: `// JS Side\nimport { NativeEventEmitter, NativeModules } from 'react-native';\nconst emitter = new NativeEventEmitter(NativeModules.MyModule);\n\nuseEffect(() => {\n  const sub = emitter.addListener('onDataReceived', data => {\n    console.log(data);\n  });\n  return () => sub.remove();\n}, []);`
    },
    "React Navigation Architecture": {
        explanation: "The standard navigation library for RN. Stack (push/pop screens), Tab (bottom/top tabs), Drawer (side menu). Supports deep linking, auth flows, nested navigators, and custom transitions.",
        code: `const Stack = createNativeStackNavigator();\n\nfunction App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator>\n        <Stack.Screen name="Home" component={HomeScreen} />\n        <Stack.Screen name="Profile" component={ProfileScreen} />\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}`
    },
    "Deep Linking & Universal Links": {
        explanation: "Allow external URLs to open specific screens in your app. Cold start (app closed) vs warm start (app backgrounded) have different handling. Configure in AndroidManifest.xml and Apple Associated Domains.",
        code: `// React Navigation deep linking config\nconst linking = {\n  prefixes: ['myapp://', 'https://myapp.com'],\n  config: {\n    screens: {\n      Home: '',\n      Profile: 'user/:id',\n    }\n  }\n};\n<NavigationContainer linking={linking}>...</NavigationContainer>`
    },
    "Detox (E2E)": {
        explanation: "End-to-end testing framework for RN by Wix. Tests run on real devices/simulators. Handles synchronization automatically (waits for animations, network). Supports iOS and Android.",
        code: `describe('Login', () => {\n  it('should login successfully', async () => {\n    await element(by.id('email')).typeText('test@test.com');\n    await element(by.id('password')).typeText('password');\n    await element(by.id('loginBtn')).tap();\n    await expect(element(by.id('welcome'))).toBeVisible();\n  });\n});`
    },
    "Offline-First Architecture": {
        explanation: "Design apps to work without network. Optimistic UI updates (show success immediately, sync later). Queue failed requests. Use WatermelonDB/MMKV for local persistence. Sync with server when online.",
        code: `// Optimistic update pattern\nfunction likePost(postId) {\n  // 1. Update UI immediately\n  setLiked(true);\n  // 2. Sync with server\n  api.likePost(postId).catch(() => {\n    setLiked(false); // Revert on failure\n    showError('Failed to like');\n  });\n}`
    },
    "Feature Flagging": {
        explanation: "Toggle features on/off without deploying. Use Firebase Remote Config, LaunchDarkly, or custom solutions. Enables A/B testing, gradual rollouts, and instant kill-switches for broken features.",
        code: `// Firebase Remote Config\nimport remoteConfig from '@react-native-firebase/remote-config';\n\nawait remoteConfig().fetchAndActivate();\nconst showNewUI = remoteConfig().getValue('new_ui_enabled').asBoolean();\n\nreturn showNewUI ? <NewDashboard /> : <OldDashboard />;`
    },

    // ===== REACT-RELEVANT JS (extras) =====
    "Shallow vs Deep Comparison": {
        explanation: "Shallow: compares top-level references only (Object.is for each prop). React.memo and PureComponent use shallow comparison. Deep: recursively compares all nested values. Expensive, rarely needed.",
        code: `// Shallow (React default)\nconst prev = { items: [1, 2] };\nconst next = { items: [1, 2] };\nprev.items === next.items; // false (different reference)\n\n// That's why we need:\nconst items = useMemo(() => [1, 2], []);`
    },
    "Immutability": {
        explanation: "Never mutate state directly in React. Always create new objects/arrays. Mutations don't trigger re-renders because React uses reference comparison. Use spread, map, filter, or libraries like Immer.",
        code: `// WRONG\nstate.items.push(newItem); // Mutation!\nsetState(state);\n\n// CORRECT\nsetState(prev => ({\n  ...prev,\n  items: [...prev.items, newItem]\n}));`
    },
    "Reference vs Value": {
        explanation: "Primitives (string, number, boolean) are compared by VALUE. Objects, arrays, and functions are compared by REFERENCE. Two identical-looking objects are !== because they point to different memory. Critical for dependency arrays.",
        code: `// Value comparison\n'hello' === 'hello'; // true\n42 === 42;           // true\n\n// Reference comparison\n{} === {};     // false!\n[] === [];     // false!\n\n// React consequence:\nuseEffect(() => {}, [{ id: 1 }]); // Runs EVERY render!`
    },
    "Debouncing/Throttling": {
        explanation: "Debounce: wait until user stops typing for X ms before executing (search input). Throttle: execute at most once every X ms (scroll handler). In React, combine with useCallback and useRef for stable references.",
        code: `// Debounced search in React\nconst [query, setQuery] = useState('');\nconst debouncedSearch = useMemo(\n  () => debounce((q) => fetchResults(q), 300),\n  []\n);\nuseEffect(() => { debouncedSearch(query); }, [query]);\nuseEffect(() => () => debouncedSearch.cancel(), []);`
    },
    "Module System": {
        explanation: "ESM (import/export) is the standard. CommonJS (require/module.exports) is Node.js legacy. ESM is statically analyzed (enables tree shaking). Bundlers (Webpack, Vite, Metro) resolve and bundle modules.",
        code: `// ESM (modern)\nimport { useState } from 'react';\nexport default function App() {}\n\n// CommonJS (Node/legacy)\nconst React = require('react');\nmodule.exports = App;`
    },
    "Async JS": {
        explanation: "JavaScript handles async operations via the Event Loop. Callbacks → Promises → Async/Await. In React, side effects are handled in useEffect. Always clean up subscriptions and abort fetch requests.",
        code: `useEffect(() => {\n  const controller = new AbortController();\n  async function load() {\n    const res = await fetch(url, { signal: controller.signal });\n    setData(await res.json());\n  }\n  load();\n  return () => controller.abort();\n}, [url]);`
    },
    "this": {
        explanation: "In React class components, 'this' refers to the component instance. Event handlers lose 'this' binding unless you use arrow functions or bind in the constructor. Arrow functions inherit 'this' from the enclosing scope.",
        code: `class MyComponent extends React.Component {\n  constructor() {\n    super();\n    this.handleClick = this.handleClick.bind(this); // Old way\n  }\n  handleClick() { console.log(this.state); }\n  \n  // Modern: arrow function auto-binds\n  handleClick2 = () => { console.log(this.state); }\n}`
    },
});

// ===== LOOKUP FUNCTION =====
function getConceptData(conceptName) {
    const query = conceptName.toLowerCase().trim()
        .replace(/[:\(\)]/g, '').trim();

    // Try exact match first
    let key = Object.keys(conceptsData).find(k => k.toLowerCase() === query);

    // Then partial match
    if (!key) {
        key = Object.keys(conceptsData).find(k =>
            query.includes(k.toLowerCase()) || k.toLowerCase().includes(query)
        );
    }

    if (key) return conceptsData[key];

    return {
        explanation: `Detailed explanation for "<strong>${conceptName}</strong>" is being prepared. Check back soon!`,
        code: `// Documentation for "${conceptName}" coming soon.`
    };
}
