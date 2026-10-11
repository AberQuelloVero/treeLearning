# treeLearning

App mobile offline-first (React Native + Expo) per la formazione tecnologica inclusiva, dai neofiti al livello PRO.

## Struttura
- `src/domain/` – logica pura (quiz a rotazione, streak, tipi). Testata con `npm test`.
- `src/data/` – contenuti JSON offline (`content/content.json`) e salvataggio progressi (AsyncStorage).
- `src/presentation/` – componenti e schermate accessibili (testi grandi, alto contrasto, pulsanti grandi).
- `.github/workflows/build-apk.yml` – compila l'APK per le PR, i push su `main`/`master` e l'avvio manuale; l'Artifact è disponibile nell'esecuzione GitHub Actions.

### Approvazione APK
Ogni compilazione attende l'approvazione tramite l'ambiente GitHub `apk-approval`.
Per abilitarla, crea l'ambiente in **Settings → Environments → New environment** e configura almeno un **Required reviewer**. Dopo l'approvazione, il workflow compila e pubblica l'APK come Artifact, anche per le pull request.

### Argomenti e quiz
La schermata iniziale permette di scegliere una delle nove categorie di alfabetizzazione digitale oppure avviare un quiz generale che combina le domande di tutte le categorie e dei livelli.

## Comandi
`npm install`, `npm start`, `npm run typecheck`, `npm test`.

Per aggiungere contenuti modifica `content.json`: ogni capitolo ha `steps`, `realLife` (analogia) e `quiz`
(tipi `choice`, `truefalse`, `order`).
