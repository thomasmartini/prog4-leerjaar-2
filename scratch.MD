# PixiJS Startproject from scratch

Je kan helemaal vanaf scratch beginnen met een **PixiJS Typescript** project in een lege map op je computer. Zorg wel dat je [NodeJS](https://nodejs.org/en/) hebt geïnstalleerd. Je maakt vervolgens een leeg project aan:

```bash
npm init -y
```

Vervolgens installeer je de game libraries:

```bash
npm install pixi.js
npm install typescript -D
npm install parcel -D
npm install @types/pixi.js
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

### 😭 Parcel PNG import Bug

Er zit een foutmelding in parcel bij het laden van een `png`. Je kan dit negeren, of om de foutmelding te verwijderen kan je `//@ts-ignore` boven de PNG import zetten. Je kan ook een `global.d.ts` bestand in je root neerzetten, met daarin: `declare module "*.png"`



<br>
<br>
<br>

# Links

- [PixiJS Examples](https://pixijs.io/examples/)
- [PixiJS getting started](https://pixijs.io/guides/basics/getting-started.html)
- [PixiJS install instructions](https://github.com/pixijs/pixijs)
- [NodeJS install](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org)
- [Dit project zelf opzetten from scratch](./scratch.MD)
- [Parcel development tool](https://parceljs.org)