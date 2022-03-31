import * as PIXI from 'pixi.js'
import fish from "./images/fish.png"

let app = new PIXI.Application({ width: 800, height: 450 })
document.body.appendChild(app.view)

let sprite = PIXI.Sprite.from(fish)
app.stage.addChild(sprite)