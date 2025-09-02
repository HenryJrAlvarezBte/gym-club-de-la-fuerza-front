# Microfrontend Integration Guide

This project exposes the React Native web build as a microfrontend. It now supports an ESM module build that exports `mount(element)` and `unmount()`.

- Build (UMS/ESM): `npm run build:web-mf` — outputs to `dist-mf/microfrontend.mjs`.
- Host requirements: The host must provide `react` and `react-dom` as ESM imports (same major versions) to avoid duplicate React instances.

Embedding example (ESM host):

```html
<script type="module">
  import React from 'https://unpkg.com/react@19/esm/react.production.min.js';
  import ReactDOM from 'https://unpkg.com/react-dom@19/esm/react-dom.production.min.js';
  import('/dist-mf/microfrontend.mjs').then((mf) => {
    mf.mount(document.getElementById('micro-root'));
  });
</script>
```

Notes:
- This is intended for web hosting (react-native-web). Native mobile apps (iOS/Android) should continue using the existing Expo entrypoints.
- Some React Native components (e.g., `react-native-webview`) may have limitations in web; ensure features degrade gracefully.
- If the host uses Module Federation, prefer sharing `react`/`react-dom` as ESM; this reduces runtime duplication.

Troubleshooting:
- If you see React errors about hooks or invalid hooks call, ensure only a single React copy is loaded.
- If styling looks off, verify `react-native-web` alias and ensure CSS is loaded.
