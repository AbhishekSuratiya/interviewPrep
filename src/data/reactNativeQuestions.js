// Interview questions per React Native checklist topic.
// Keyed by the exact topic string used in checklistTopics.js (section id: 'react-native').
export const reactNativeQuestions = {
  'How React Native differs from React DOM (native components, no HTML/CSS)': [
    'How does React Native rendering differ from React DOM under the hood?',
    'Why can\'t you use <div> or <span> in React Native?',
    'What happens to a React Native component tree at render time — where does it end up?',
    'Can you share business logic between a React web app and a React Native app? What can\'t be shared?',
  ],
  'The New Architecture: Fabric renderer and TurboModules': [
    'What problems does the New Architecture solve compared to the old bridge?',
    'What is Fabric and how does it change the rendering pipeline?',
    'What are TurboModules and how do they differ from legacy native modules?',
    'How does the New Architecture enable synchronous native calls?',
  ],
  'JavaScript engine (Hermes) and the JS thread': [
    'What is Hermes and why did React Native move to it as the default engine?',
    'How does Hermes improve app startup time?',
    'What runs on the JS thread, and what happens if you block it?',
    'What is bytecode precompilation and why does it matter for Hermes?',
  ],
  'Bridge vs JSI (JavaScript Interface) communication': [
    'How did the old bridge communicate between JS and native code, and what were its limitations?',
    'What is JSI and how does it remove the need for serialization?',
    'Why was the bridge asynchronous, and why does that matter for certain use cases?',
    'How does JSI enable synchronous native method calls from JS?',
  ],
  'Metro bundler basics': [
    'What is Metro and how does it differ from Webpack?',
    'How does Metro\'s fast refresh work?',
    'How would you configure Metro to resolve custom file extensions or aliases?',
    'What is the Metro cache and when would you clear it?',
  ],
  'Expo vs bare React Native workflow': [
    'What are the trade-offs between the Expo managed workflow and a bare React Native project?',
    'What is a config plugin, and when would you need one in Expo?',
    'When would you need to eject from Expo, and what does that involve today (prebuild)?',
    'Can you use native modules that aren\'t in the Expo SDK while staying in the managed workflow?',
  ],
  'Platform-specific code (Platform.OS, .ios.js/.android.js files)': [
    'What are the different ways to write platform-specific code in React Native?',
    'When would you use Platform.select vs separate .ios.js/.android.js files?',
    'How does Metro decide which platform-specific file to bundle?',
    'How do you handle a third API surface like web (react-native-web) alongside iOS/Android?',
  ],

  'View, Text, Image': [
    'Why must all text in React Native be wrapped in a <Text> component?',
    'What are the different ways to load images (local, remote, base64) and how does caching differ?',
    'What layout behavior does View have by default (flex direction, etc.)?',
    'How do you handle image resizing and aspect ratio across different screen densities?',
  ],
  'ScrollView vs FlatList vs SectionList': [
    'When would you choose ScrollView over FlatList, and why is that choice dangerous for long lists?',
    'How does FlatList virtualization work internally?',
    'What is SectionList best suited for, and how do sticky headers work?',
    'What performance problems arise from nesting a FlatList inside a ScrollView?',
  ],
  'TextInput and keyboard handling': [
    'How do you control a TextInput\'s value and avoid unnecessary re-renders while typing?',
    'What keyboard types and return key behaviors can you configure?',
    'How do you manage focus between multiple TextInputs (e.g. moving to the next field)?',
    'How would you debounce input for a search-as-you-type field in RN?',
  ],
  'Pressable, TouchableOpacity, TouchableHighlight': [
    'What are the differences between Pressable, TouchableOpacity, and TouchableHighlight?',
    'Why is Pressable generally recommended over the legacy Touchable* components?',
    'How do you implement custom press states (e.g. scale/opacity) using Pressable?',
    'How do hitSlop and pressRetentionOffset affect touch targets?',
  ],
  'Modal': [
    'How does the built-in Modal component render relative to the rest of the app?',
    'What are the limitations of React Native\'s Modal component (animations, nesting, Android behavior)?',
    'How would you implement a custom bottom sheet instead of using Modal?',
    'How do you handle safe areas and status bar behavior inside a Modal?',
  ],
  'SafeAreaView and safe area handling': [
    'What problem does SafeAreaView solve, and on which platforms does it matter most?',
    'What are the limitations of the built-in SafeAreaView, and why do people use react-native-safe-area-context instead?',
    'How do you handle safe area insets for a component that isn\'t at the root of the screen?',
    'How does safe area handling interact with a custom-styled StatusBar?',
  ],
  'ActivityIndicator and loading states': [
    'How would you design a consistent loading UI approach across a large RN app?',
    'What\'s the difference between showing an ActivityIndicator vs a skeleton screen, and when do you prefer each?',
    'How do you avoid flicker when a loading state is very short-lived?',
  ],
  'StatusBar control': [
    'How do you control status bar style (light/dark content) per screen?',
    'How does StatusBar behavior differ between iOS and Android?',
    'How would you animate the status bar style transition when navigating between light and dark screens?',
  ],

  'StyleSheet.create and style objects': [
    'What performance benefit does StyleSheet.create provide over plain style objects?',
    'How are styles actually validated and resolved at runtime in React Native?',
    'Can you dynamically merge multiple StyleSheet objects, and what\'s the correct pattern for conditional styles?',
    'What CSS features are NOT supported in React Native styling?',
  ],
  'Flexbox layout in React Native (differences from web)': [
    'What is the default flexDirection in React Native, and how does it differ from web CSS?',
    'How do flex, flexGrow, flexShrink, and flexBasis interact in RN layouts?',
    'How would you center a component both vertically and horizontally using Flexbox?',
    'How does percentage-based sizing behave differently in RN vs the web?',
  ],
  'Dimensions API and responsive layouts': [
    'What\'s the difference between the Dimensions API and the useWindowDimensions hook?',
    'How do you handle layout changes on device rotation?',
    'How would you build a responsive grid that adapts to different screen widths?',
    'Why is useWindowDimensions preferred over Dimensions.get for reactive layouts?',
  ],
  'Platform-specific styling': [
    'How do you apply different shadow styles for iOS (shadow*) vs Android (elevation)?',
    'How does Platform.select work for style objects?',
    'How do you handle font family differences between iOS and Android?',
  ],
  'Handling different screen sizes and densities': [
    'How does React Native\'s density-independent pixel system work?',
    'How would you provide different image assets for different pixel densities (@2x, @3x)?',
    'How do you design a layout that works well on both small phones and tablets?',
  ],
  'Dark mode / Appearance API': [
    'How do you detect and react to the system color scheme using the Appearance API or useColorScheme?',
    'How would you architect a theming system that supports live dark/light switching?',
    'How do you handle a user override of the system-level appearance setting?',
  ],
  'Custom fonts': [
    'How do you link and load custom fonts in a bare RN project vs an Expo project?',
    'Why might a custom font fail to render on Android but work on iOS (or vice versa)?',
    'How do you handle font loading before rendering the app (avoiding a flash of default font)?',
  ],

  'React Navigation — stack, tab, and drawer navigators': [
    'How do you decide between a stack, tab, and drawer navigator for a given flow?',
    'How does React Navigation manage its own internal state, and how would you persist it?',
    'How do you nest a tab navigator inside a stack navigator (or vice versa) and what pitfalls come up?',
    'What\'s the performance impact of deeply nested navigators, and how do you mitigate it?',
  ],
  'Passing params between screens': [
    'What are the different ways to pass data between screens in React Navigation?',
    'How do you type navigation params safely with TypeScript?',
    'How would you pass a large object or callback function as a param, and why is that discouraged?',
    'How do you update params on a screen that\'s already mounted (e.g. from a child screen)?',
  ],
  'Nested navigators': [
    'How does navigating to a screen inside a nested navigator work (e.g. navigate("Tab", { screen: "Detail" }))?',
    'How do you handle deep linking into a deeply nested navigator structure?',
    'What issues can arise with screen re-mounting in nested navigators?',
  ],
  'Deep linking configuration': [
    'How do you configure a linking config to map URLs to screens in React Navigation?',
    'How do universal links (iOS) and app links (Android) differ, and how do you set both up?',
    'How would you test deep linking during development?',
    'How do you handle deep links that arrive while the app is already running vs cold-starting?',
  ],
  'Navigation lifecycle (focus/blur events)': [
    'How do you run code when a screen comes into focus vs when the component mounts?',
    'What\'s the difference between useFocusEffect and useEffect for screen lifecycle logic?',
    'How would you pause a video or timer when a screen loses focus?',
  ],
  'Type-safe navigation with TypeScript': [
    'How do you define a ParamList type and use it to type useNavigation and useRoute?',
    'How do you type nested navigators\' param lists together?',
    'How would you catch a typo in a screen name at compile time instead of runtime?',
  ],
  'Modal and full-screen navigation patterns': [
    'How do you present a screen as a modal using React Navigation\'s presentation options?',
    'How do you handle swipe-to-dismiss gestures for modal screens on iOS?',
    'How would you build a full-screen image viewer that overlays the current navigation stack?',
  ],

  'FlatList optimization props (keyExtractor, getItemLayout, windowSize)': [
    'What does keyExtractor do and why is a stable, unique key important for FlatList performance?',
    'How does getItemLayout let FlatList skip measurement, and when can you use it?',
    'How do windowSize, maxToRenderPerBatch, and initialNumToRender affect rendering performance and trade-offs?',
    'What does removeClippedSubviews do and when might it cause visual bugs?',
  ],
  'FlashList as a high-performance alternative': [
    'How does FlashList achieve better performance than FlatList?',
    'What is estimatedItemSize in FlashList and why does it matter?',
    'What migration considerations are there when switching from FlatList to FlashList?',
  ],
  'Avoiding unnecessary re-renders in list items': [
    'How do you use React.memo effectively for FlatList row components?',
    'Why is passing inline functions/objects as props to list items a performance problem?',
    'How would you use useCallback and useMemo to stabilize props passed into a list renderItem?',
  ],
  'Virtualization concepts': [
    'What does "virtualization" mean in the context of long lists?',
    'What happens to off-screen items in a virtualized list?',
    'What are common pitfalls when list items have variable/dynamic heights?',
  ],
  'Image caching and optimization': [
    'How does React Native\'s built-in Image caching work, and what are its limitations?',
    'Why might you reach for react-native-fast-image or expo-image instead of the core Image component?',
    'How would you preload images before displaying a list to avoid pop-in?',
  ],
  'Reducing bridge/JSI traffic': [
    'What kinds of operations generate heavy cross-thread traffic in React Native?',
    'How would you batch multiple native calls to reduce overhead?',
    'How does the New Architecture reduce the cost of frequent JS-native communication?',
  ],
  'Using the Hermes engine and bytecode precompilation': [
    'How does precompiling to Hermes bytecode improve cold start time?',
    'What trade-offs exist between Hermes and JavaScriptCore for a given app?',
    'How would you verify whether Hermes is enabled and being used effectively in a build?',
  ],
  'Profiling with Flipper / React DevTools': [
    'How would you use Flipper to diagnose a janky scroll or slow screen transition?',
    'What information does the React DevTools profiler give you that\'s RN-specific?',
    'How do you profile native-side performance (e.g. Xcode Instruments, Android Profiler) alongside JS profiling?',
  ],

  'Animated API (Animated.Value, timing, spring)': [
    'What\'s the difference between Animated.timing and Animated.spring?',
    'How does Animated.Value work, and why shouldn\'t you read it directly during render?',
    'How would you sequence or parallelize multiple animations with the Animated API?',
    'What is interpolate used for in the Animated API?',
  ],
  'useNativeDriver and running animations on the UI thread': [
    'What does useNativeDriver actually do, and why does it improve animation performance?',
    'What kinds of style properties can\'t be animated with useNativeDriver?',
    'What happens if you try to animate layout properties (e.g. width/height) with the native driver?',
  ],
  'react-native-reanimated — worklets and shared values': [
    'What is a worklet in Reanimated, and why does it run on the UI thread instead of the JS thread?',
    'How do shared values differ from React state for driving animations?',
    'How would you synchronize a gesture (e.g. drag) with an animation using Reanimated?',
    'What\'s the difference between Reanimated 2/3\'s worklet model and the old Animated API?',
  ],
  'react-native-gesture-handler basics': [
    'Why was react-native-gesture-handler created instead of relying on the built-in PanResponder?',
    'How do you compose multiple gestures (e.g. simultaneous pan and pinch)?',
    'How does gesture-handler interact with React Navigation\'s swipe-to-go-back gesture?',
  ],
  'PanResponder (legacy gesture handling)': [
    'How does PanResponder differ from react-native-gesture-handler in terms of thread execution?',
    'What are the main lifecycle callbacks of PanResponder and what do they do?',
    'Why might PanResponder-based gestures feel less smooth than gesture-handler based ones?',
  ],
  'LayoutAnimation': [
    'What does LayoutAnimation do, and how does it differ from the Animated API?',
    'What are the limitations of LayoutAnimation, especially on Android?',
    'When would you use LayoutAnimation vs Reanimated\'s layout animations?',
  ],
  'Building custom transitions': [
    'How would you build a custom shared-element transition between two screens?',
    'How do you coordinate a custom transition with React Navigation\'s screen lifecycle?',
    'What are the performance considerations when building complex custom transitions?',
  ],

  'Linking native modules (iOS/Android)': [
    'What does "linking" a native module actually involve on iOS (CocoaPods) vs Android (Gradle)?',
    'How does autolinking work in modern React Native?',
    'What issues typically arise after installing a native module, and how do you debug them?',
  ],
  'Writing a simple native module (concept)': [
    'At a high level, how would you expose a native function to JavaScript via a TurboModule?',
    'What is a Codegen spec and what role does it play in writing typed native modules?',
    'When is writing a native module the right call vs finding/wrapping an existing library?',
  ],
  'Permissions handling (camera, location, notifications)': [
    'How do you request runtime permissions on iOS vs Android in React Native?',
    'What\'s the correct UX pattern for handling a denied permission gracefully?',
    'How do you configure the required permission usage descriptions in Info.plist / AndroidManifest.xml?',
  ],
  'Device APIs: Camera, Geolocation, Sensors': [
    'What libraries would you use to access the camera, GPS, and accelerometer in React Native?',
    'How do you handle battery/performance concerns when continuously polling sensors like GPS?',
    'How would you test camera or geolocation features without a physical device?',
  ],
  'AsyncStorage / MMKV for local persistence': [
    'What are the performance and API differences between AsyncStorage and MMKV?',
    'Why is AsyncStorage asynchronous, and what problems can that cause for app-launch-critical data?',
    'How would you securely store sensitive data (tokens) instead of using plain AsyncStorage?',
  ],
  'Push notifications (overview)': [
    'How do push notifications get delivered to a React Native app (APNs/FCM at a high level)?',
    'What\'s the difference between local and remote notifications?',
    'How do you handle a notification tap to deep-link into a specific screen?',
  ],
  'Deep linking and universal links': [
    'What\'s the difference between a custom URL scheme and a universal/app link?',
    'What server-side configuration is required to support universal links (apple-app-site-association)?',
    'How do you handle a deep link received while the app is in the background vs terminated?',
  ],
  'Biometric auth (Face ID / fingerprint) overview': [
    'How would you integrate Face ID/Touch ID or Android biometric prompts in React Native?',
    'How do you handle devices that don\'t support biometrics or have none enrolled?',
    'How does biometric auth typically combine with token storage for a "quick unlock" flow?',
  ],

  'fetch in React Native': [
    'How does the built-in fetch implementation in React Native differ from the browser\'s?',
    'How would you implement request timeouts, since fetch doesn\'t support them natively?',
    'How do you handle authentication headers and token refresh centrally for all requests?',
  ],
  'Handling offline state and retries': [
    'How would you detect network connectivity changes in React Native?',
    'How do you design a retry strategy (exponential backoff) for failed network requests?',
    'How would you queue mutations made while offline and sync them once connectivity returns?',
  ],
  'WebSockets in RN': [
    'How do you manage a WebSocket connection\'s lifecycle relative to app foreground/background state?',
    'How would you handle reconnection logic after a dropped WebSocket connection?',
    'How do you keep a WebSocket-driven UI in sync with React state without excessive re-renders?',
  ],
  'GraphQL clients in RN (overview)': [
    'What considerations are specific to using Apollo Client or urql in a React Native app vs web?',
    'How would you implement offline caching/persistence for GraphQL queries in RN?',
    'How do you handle GraphQL subscriptions over WebSockets in a mobile app with backgrounding?',
  ],
  'Background fetch / background tasks (overview)': [
    'What are the platform restrictions on background execution time on iOS vs Android?',
    'How would you implement a periodic background sync (e.g. for offline data)?',
    'What library would you use for background tasks, and what are its limitations?',
  ],
  'File system access (react-native-fs or Expo FileSystem)': [
    'How do you read/write files to the app\'s sandboxed file system in React Native?',
    'How would you download and cache a large file (e.g. a video) locally?',
    'What are the differences in file system access between Expo\'s FileSystem module and react-native-fs?',
  ],

  'Same core patterns as React (Context, Redux, Zustand)': [
    'Do the trade-offs between Context, Redux, and Zustand change at all when moving from web to React Native?',
    'How would you decide which state management approach fits a mobile app\'s needs?',
    'What RN-specific concerns (e.g. app backgrounding) affect how you design global state?',
  ],
  'Persisting state across app restarts': [
    'How would you persist Redux or Zustand state to disk and rehydrate it on app launch?',
    'What are the trade-offs of using redux-persist with AsyncStorage vs MMKV?',
    'How do you handle migrations when your persisted state shape changes between app versions?',
  ],
  'Handling app state changes (AppState: active/background)': [
    'How do you use the AppState API to detect when the app moves to background/foreground?',
    'What are common use cases for reacting to AppState changes (e.g. pausing timers, refetching data)?',
    'How would you re-authenticate or refresh a session when the app returns to foreground after a long time?',
  ],
  'Syncing state with native storage': [
    'How would you keep JS-side state in sync with data written by a native module?',
    'What patterns exist for two-way sync between React state and native persistent storage?',
  ],

  'Controlled TextInput patterns': [
    'What are the trade-offs of a fully controlled TextInput vs an uncontrolled one in RN?',
    'How would you build a formatted input (e.g. currency or phone number) that stays controlled?',
    'How do you avoid cursor-jumping bugs when programmatically formatting a controlled TextInput\'s value?',
  ],
  'KeyboardAvoidingView': [
    'How does KeyboardAvoidingView behave differently on iOS vs Android, and why?',
    'What\'s the difference between the "padding", "height", and "position" behavior props?',
    'What alternatives exist to KeyboardAvoidingView for tricky keyboard-overlap layouts?',
  ],
  'Dismissing the keyboard': [
    'What are the different ways to dismiss the keyboard programmatically in React Native?',
    'How would you dismiss the keyboard when the user taps outside a TextInput?',
    'How does keyboardShouldPersistTaps on a ScrollView interact with keyboard dismissal?',
  ],
  'Input validation patterns': [
    'How would you architect form validation (e.g. with Formik/React Hook Form) in a React Native app?',
    'How do you show validation errors without causing layout shift or excessive re-renders?',
    'How would you implement async validation (e.g. checking username availability) in a mobile form?',
  ],
  'Multiline text input and auto-grow': [
    'How do you configure a TextInput to support multiline entry and grow with content?',
    'What issues commonly arise with auto-growing TextInputs on Android?',
  ],
  'Secure text entry (passwords)': [
    'How do you enable secure text entry for password fields in React Native?',
    'How would you implement a "show/hide password" toggle?',
    'What considerations are there for autofill and password manager integration on mobile?',
  ],

  'Unit testing with Jest': [
    'How is Jest configured differently for a React Native project vs a plain JS project (e.g. preset)?',
    'How would you unit test a custom hook that depends on native modules?',
    'How do you mock timers and animations in Jest tests for RN components?',
  ],
  'Component testing with React Native Testing Library': [
    'What\'s the philosophy behind React Native Testing Library, and how does it differ from Enzyme-style testing?',
    'How would you test that a component responds correctly to a press event?',
    'How do you query for elements by accessibility role/label in RNTL tests?',
  ],
  'Mocking native modules in tests': [
    'How would you mock a native module (e.g. AsyncStorage or a camera library) in Jest tests?',
    'What is a jest.mock setup file typically used for in an RN project?',
    'How do you handle third-party native modules that don\'t ship their own Jest mocks?',
  ],
  'End-to-end testing (Detox, Maestro)': [
    'How does Detox achieve gray-box E2E testing, and how does that differ from Maestro\'s black-box approach?',
    'What are the trade-offs between Detox and Maestro in terms of setup complexity and speed?',
    'How would you set up E2E tests to run in CI for both iOS and Android builds?',
  ],
  'Testing navigation flows': [
    'How would you test that navigating from one screen to another passes the correct params?',
    'How do you mock React Navigation\'s navigation object in component tests?',
    'How would you write an E2E test that verifies a full multi-screen user flow?',
  ],

  'iOS build process (Xcode, provisioning profiles, signing)': [
    'What is a provisioning profile and how does it relate to code signing?',
    'What\'s the difference between a development, ad-hoc, and App Store distribution build?',
    'How would you debug a "no matching provisioning profile" build error?',
  ],
  'Android build process (Gradle, keystores)': [
    'What role does a keystore play in signing an Android release build?',
    'How do Gradle build variants/flavors let you configure dev/staging/prod builds?',
    'How would you generate a signed release APK/AAB from a React Native project?',
  ],
  'EAS Build (Expo Application Services) overview': [
    'How does EAS Build differ from building locally with Xcode/Android Studio?',
    'How would you configure separate build profiles for development, preview, and production in eas.json?',
    'How do EAS Build and EAS Submit fit together in a release pipeline?',
  ],
  'App Store and Play Store submission basics': [
    'What are the key steps and common rejection reasons when submitting an iOS app to the App Store?',
    'What\'s the difference between an internal test track, closed testing, and production release on Play Store?',
    'How would you handle app review requirements around privacy labels/data safety forms?',
  ],
  'Code signing and certificates': [
    'What\'s the difference between a development certificate and a distribution certificate on iOS?',
    'How do you manage code signing across a team without sharing private keys insecurely?',
    'How does Android app signing (upload key vs app signing key) work with Play App Signing?',
  ],
  'CodePush / OTA updates (concept)': [
    'What kinds of changes can be shipped via an OTA update (CodePush/EAS Update), and what kinds can\'t?',
    'How do OTA update mechanisms avoid breaking apps that are mid-update or on an incompatible native version?',
    'What rollback strategy would you use if an OTA update introduces a critical bug?',
  ],
  'Environment configuration per build (dev/staging/prod)': [
    'How would you manage different API URLs/keys for dev, staging, and production builds?',
    'What\'s the difference between build-time environment variables and runtime configuration in RN?',
    'How do you prevent accidentally shipping a debug/staging config to production?',
  ],
  'Fastlane for automation (overview)': [
    'What kinds of tasks does Fastlane typically automate in a React Native release pipeline?',
    'How would you set up a Fastlane lane to build and upload to TestFlight/Play Console?',
    'How does Fastlane fit alongside CI systems like GitHub Actions or Bitrise?',
  ],

  'React Native Debugger / Flipper': [
    'What debugging capabilities does Flipper provide beyond basic console logging?',
    'How would you inspect network requests or layout in a running RN app during development?',
    'What are the current recommended debugging tools now that the standalone RN Debugger is less common?',
  ],
  'Remote JS debugging vs on-device debugging': [
    'What are the performance and accuracy trade-offs of remote JS debugging vs on-device debugging with Hermes?',
    'Why can remote debugging in Chrome produce different behavior than what happens on-device?',
    'How do you debug a Hermes-specific issue that only reproduces on-device?',
  ],
  'Hermes debugger': [
    'How do you attach a debugger to a Hermes-powered app?',
    'What debugging features does Hermes support via Chrome DevTools protocol?',
  ],
  'Inspecting native logs (Xcode console, Logcat)': [
    'How would you view native-level crash logs or console output on iOS vs Android?',
    'How do you correlate a JS-side error with what shows up in native logs?',
    'What tools would you use to symbolicate a native crash report?',
  ],
  'Fast Refresh': [
    'How does Fast Refresh preserve component state across edits, and when does it fall back to a full reload?',
    'What kinds of code changes cause Fast Refresh to fail or reset state unexpectedly?',
  ],
  'Common red-box/yellow-box errors': [
    'What\'s the difference between a red-box (fatal) and yellow-box (warning) in React Native?',
    'How would you debug a "Invariant Violation" error?',
    'What are common causes of "Cannot read property of undefined" crashes specific to RN component lifecycles?',
  ],

  'Old bridge architecture vs New Architecture (Fabric + TurboModules)': [
    'What were the main bottlenecks of the old bridge architecture?',
    'How do Fabric and TurboModules together address those bottlenecks?',
    'What migration challenges exist for large apps moving to the New Architecture?',
  ],
  'JSI (JavaScript Interface) benefits': [
    'How does JSI allow JS to hold direct references to native objects?',
    'Why does JSI eliminate the need for JSON serialization between JS and native?',
    'What new capabilities does JSI unlock that weren\'t possible with the bridge?',
  ],
  'Codegen for typed native modules': [
    'What role does Codegen play in the New Architecture\'s TurboModules/Fabric components?',
    'How do you define a TypeScript/Flow spec that Codegen uses to generate native interfaces?',
    'What type safety benefits does Codegen provide over the old manual bridging approach?',
  ],
  'Synchronous native calls vs async bridge messages': [
    'Why were all bridge calls historically asynchronous, and what problems did that cause?',
    'What kinds of native calls benefit most from being synchronous (e.g. measuring layout)?',
    'What are the risks of making native calls synchronous (e.g. blocking the JS thread)?',
  ],
  'Threading model: JS thread, UI thread, native modules thread': [
    'What runs on the JS thread, the UI (main) thread, and the native modules thread respectively?',
    'What happens to the UI if the JS thread is blocked by a long synchronous computation?',
    'How does Reanimated\'s UI-thread worklet model interact with this threading model?',
  ],

  'Managed vs bare workflow': [
    'What capabilities are unique to Expo\'s managed workflow vs a bare workflow project?',
    'What does "prebuild" do, and how does it relate to ejecting from managed workflow?',
    'How would you decide upfront whether a project needs the bare workflow?',
  ],
  'Expo Router (file-based navigation)': [
    'How does Expo Router\'s file-based routing map files to screens and URLs?',
    'How do dynamic routes and nested layouts work in Expo Router?',
    'How does Expo Router integrate with deep linking compared to manually configuring React Navigation?',
  ],
  'Expo SDK modules overview (Camera, Notifications, FileSystem, etc.)': [
    'How do you decide between using an Expo SDK module vs a community native module?',
    'What happens when an Expo SDK module doesn\'t support a native feature you need?',
    'How do Expo SDK modules stay compatible across Expo SDK version upgrades?',
  ],
  'EAS Build and EAS Submit': [
    'How do EAS Build and EAS Submit automate the full release pipeline?',
    'How would you configure credentials management (signing) with EAS Build?',
    'What\'s the difference between a development build and a production build in EAS?',
  ],
  'Config plugins for native customization': [
    'What is a config plugin and what problem does it solve in the managed workflow?',
    'How would you write a custom config plugin to modify native project files?',
    'How do config plugins get applied during the prebuild step?',
  ],
  'Over-the-air updates with EAS Update': [
    'How does EAS Update deliver JS/asset updates without an app store review?',
    'How do you target specific update channels (e.g. staging vs production) with EAS Update?',
    'What update strategies (e.g. rollout percentage) does EAS Update support for safer releases?',
  ],

  'iOS vs Android UI/UX conventions': [
    'What are some key navigation pattern differences between iOS and Android (e.g. back button, tab bar placement)?',
    'How do modal presentation and dismissal gestures typically differ between platforms?',
    'How would you decide when to adapt a component\'s look-and-feel per platform vs keep it consistent?',
  ],
  'Handling platform-specific permissions differences': [
    'How do permission request flows and system dialogs differ between iOS and Android?',
    'How would you handle a permission that behaves differently across Android OS versions (e.g. granular media permissions)?',
    'What\'s the correct way to guide a user to app settings when a permission is permanently denied?',
  ],
  'Adaptive icons and splash screens': [
    'What is an Android adaptive icon and how does it differ from a standard app icon?',
    'How would you configure a splash screen that works consistently across iOS and Android?',
    'How do you avoid a flash of unstyled content between the splash screen and the first rendered screen?',
  ],
  'Accessibility on mobile (VoiceOver, TalkBack)': [
    'How do you make a custom component accessible to VoiceOver and TalkBack?',
    'What accessibility props (accessibilityLabel, accessibilityRole, accessible) matter most in RN?',
    'How would you test a screen\'s accessibility without a physical device using a screen reader?',
  ],
  'Handling notches, safe areas, and gesture navigation bars': [
    'How do you ensure content isn\'t obscured by a notch, home indicator, or Android gesture bar?',
    'How does edge-to-edge layout on Android affect your handling of safe areas?',
    'How would you handle a full-screen video/image that should ignore safe area insets while other content respects them?',
  ],
  'App size optimization (Hermes bytecode, asset optimization)': [
    'What techniques reduce final app bundle size in React Native (Hermes bytecode, image compression, unused code)?',
    'How would you analyze what\'s contributing most to app size?',
    'What\'s the trade-off between bundling all assets vs downloading some on demand?',
  ],
};
