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
La schermata iniziale permette di scegliere una delle nove categorie di alfabetizzazione digitale oppure avviare un quiz generale breve, con una domanda casuale per ogni categoria e livello. Il catalogo offline comprende 54 lezioni e oltre 160 domande; gli errori possono essere riprovati nel quiz.

I contenuti sono elaborati in forma didattica a partire dalle aree del framework europeo DigComp 2.2 e da indicazioni per i cittadini pubblicate da fonti istituzionali. Per approfondire:
- [DigComp 2.2 – Joint Research Centre della Commissione Europea](https://publications.jrc.ec.europa.eu/repository/handle/JRC128415)
- [Competenze digitali per i cittadini – AgID](https://www.agid.gov.it/it/agenzia/competenze-digitali)
- [Vademecum di cybersicurezza di base – Agenzia per la Cybersicurezza Nazionale](https://www.acn.gov.it/portale/documents/20119/967511/Vademecum_Cybersecurity+di+base.pdf)
- [Portale ufficiale SPID](https://www.spid.gov.it/) e [Carta d'Identità Elettronica](https://www.cartaidentita.interno.gov.it/)
- [Linee guida e informazioni sull'accessibilità digitale – AgID](https://accessibilita.agid.gov.it/)

## Comandi
`npm install`, `npm start`, `npm run typecheck`, `npm test`.

Per aggiungere contenuti modifica `content.json`: ogni capitolo ha `steps`, `realLife` (analogia) e `quiz`
(tipi `choice`, `truefalse`, `order`).
