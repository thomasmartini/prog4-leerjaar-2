import * as PIXI from 'pixi.js'
import fishImage from "./images/fish.png"
import bubbleImage from "./images/bubble.png"

// create a pixi canvas
const pixi = new PIXI.Application({ width: 800, height: 450 })
document.body.appendChild(pixi.view)

// preload all our textures
const loader = new PIXI.Loader()
loader.add('fishTexture', fishImage)
      .add('bubbleTexture', bubbleImage)
loader.load(()=>loadCompleted())

// after loading is complete, create a fish sprite
function loadCompleted() {
    let fish = new PIXI.Sprite(loader.resources["fishTexture"].texture!)
    pixi.stage.addChild(fish)
}