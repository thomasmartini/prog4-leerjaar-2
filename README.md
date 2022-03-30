# PixiJS Startproject

Dit is een startproject voor het werken met ***PixiJS en Typescript***. Installeer eerst

- [NodeJS](https://nodejs.org/en/)
- [Visual Studio Code](https://code.visualstudio.com)

 Je kan daarna deze repository downloaden en vervolgens installeren met:

```bash
npm install
```

Daarna kan je aan de slag met ontwikkelen in development mode:

```bash
npm run start
```

Als je de game wil publiceren kan je een `build` uitvoeren. 

```bash
npm run build
```

## Installatie voorbeeld

[Bekijk dit filmpje voor het snel opzetten van dit voorbeeldproject op je eigen computer](https://youtu.be/uuPprdiFKXI).



<br>
<br>
<br>

## Voorbeeldcode

Toon het Pixi Canvas en een Sprite:

```javascript
import * as PIXI from 'pixi.js'
import fish from "./images/fish.png"

let app = new PIXI.Application({ width: 800, height: 450 })
document.body.appendChild(app.view)

let sprite = PIXI.Sprite.from(fish)
app.stage.addChild(sprite)
```
<br>
<br>
<br>

# Links

- [📺 Installatie instructies Youtube](https://youtu.be/uuPprdiFKXI)
- [PixiJS Examples](https://pixijs.io/examples/) en [Getting started](https://pixijs.io/guides/basics/getting-started.html)
- [NodeJS](https://nodejs.org/en/) en [Visual Studio Code](https://code.visualstudio.com)
- [Advanced: dit project zelf opzetten from scratch](./scratch.MD)