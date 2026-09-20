# RE:MEMBER

RE:MEMBER turns local digital traces into a quiet, editorial life story. It is a frontend-only WebRush hackathon experience: explore selected receipts, trace lightweight relationships, and inspect evidence behind generated chapters and insights.

## Run

`npm install` then `npm run dev`. Production checks: `npm run build` and `npm run lint`.

## Architecture and data

The React + Vite + TypeScript app loads the small household CSV only after **Uncover my life** is selected. A compact, safe Spotify excerpt is derived from organizer data at build time and embedded as a few normalized records, so the 21 MB Spotify history is neither downloaded nor placed in the JavaScript bundle. The small CSV is parsed directly in the browser; scoring and story generation remain entirely in the browser.

`src/data/engine.ts` normalizes safe fields, filters incomplete Spotify plays, selects a small display sample, scores temporal/tag relationships, and derives chapters and evidence. The app does not use `india_transactions.csv`: its sensitive fields do not support a safe single-person story.

## Experience

- Searchable/filterable receipt explorer with keyboard-operable relationship tracing
- SVG constellation, generated life chapters, and expandable evidence cards
- Loading, empty, and error states; responsive layouts and reduced-motion support
- Semantic sections, live result counts, visible keyboard focus, and safe React text rendering

## Privacy, security, and scope

No backend, APIs, database, telemetry, secrets, or uploads are used. No card numbers, DOBs, street addresses, customer IDs, names, or precise coordinates are rendered or derived. Data stays in the visitor's browser and is used only for the current page session. No HTML injection APIs are used.
