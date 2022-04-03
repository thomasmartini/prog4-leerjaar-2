# PixiJS Startproject from scratch

Je kan vanaf scratch beginnen met een leeg **PixiJS Typescript** project in een lege map op je computer. Installeer eerst:

- [NodeJS](https://nodejs.org/en/)
- [Visual Studio Code](https://code.visualstudio.com)

Maak vervolgens een leeg project aan:

```bash
npm init -y
```

Vervolgens installeer je de game libraries:

```bash
npm install pixi.js
npm install typescript -D
npm install parcel -D
```
[Parcel](https://parceljs.org) is de library waarmee we de game modules samenvoegen, typescript compileren, en een dev server starten.

Maak vervolgens een `src` map waarin je `index.html` en `app.ts` plaatst. ⚠️ Let op! Je kan de `.ts` file rechtstreeks in de html laden met:
```html
<script defer type="module" src="./app.ts"></script>
```

In app.ts kan je vervolgens PIXI als volgt gebruiken:

```javascript
import * as PIXI from 'pixi.js'
import ship from "./ship.png"

let app = new PIXI.Application({ width: 640, height: 360 })
document.body.appendChild(app.view)

let sprite = PIXI.Sprite.from(ship)
app.stage.addChild(sprite)
```

Om je development leven makkelijk te maken kan je deze `watch` en `build` scripts handmatig toevoegen aan `package.json`

```json
"scripts": {
    "start": "parcel src/index.html --dist-dir docs",
    "build": "parcel build src/index.html --dist-dir docs --public-url ./"
}
```
Dit zorgt ervoor dat je `npm run start` en `npm run build` kan gebruiken.

<br>
<br>
<br>

# Typescript config

Kopieer het `.tsconfig.json` bestand uit deze repository voor de juiste typescript setup.

<br>
<br>
<br>

### 😭 Parcel image import Bug

Er zit een foutmelding in parcel bij het laden van een `png`. Je kan dit negeren, of om de foutmelding te verwijderen kan je `//@ts-ignore` boven de PNG import zetten. Je kan ook een `global.d.ts` bestand in je root neerzetten, met daarin: `declare module "*.png"`. Doe dit ook voor `jpg`.



<br>
<br>
<br>

# Links

- [PixiJS Examples](https://pixijs.io/examples/) en [Getting started](https://pixijs.io/guides/basics/getting-started.html)
- [PixiJS install instructions](https://github.com/pixijs/pixijs)
- [NodeJS](https://nodejs.org/en/) en [Typescript](https://www.typescriptlang.org)
- [Visual Studio Code](https://code.visualstudio.com)
- [Parcel development tool](https://parceljs.org)