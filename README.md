# treeLearning

App mobile offline-first (React Native + Expo) per la formazione tecnologica inclusiva, dai neofiti al livello PRO.

## Struttura
- `src/domain/` – logica pura (quiz a rotazione, streak, tipi). Testata con `npm test`.
- `src/data/` – contenuti JSON offline (`content/content.json`) e salvataggio progressi (AsyncStorage).
- `src/presentation/` – componenti e schermate accessibili (testi grandi, alto contrasto, pulsanti grandi).
- `.github/workflows/build-apk.yml` – ad ogni push su `main`/`master` compila l'APK e lo pubblica come Artifact.

## Comandi
`npm install`, `npm start`, `npm run typecheck`, `npm test`.

Per aggiungere contenuti modifica `content.json`: ogni capitolo ha `steps`, `realLife` (analogia) e `quiz`
(tipi `choice`, `truefalse`, `order`).
