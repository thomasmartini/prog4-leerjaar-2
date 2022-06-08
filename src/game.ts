import * as PIXI from "pixi.js"
import fishImage from "./images/fish.png"
import bgImage from "./images/water.jpg"
import bubbleImage from "./images/bubble.png"

export class Game {

    pixi: PIXI.Application
    fish:PIXI.Sprite
    bubble:PIXI.Sprite
    anotherFish:PIXI.Sprite
    anotherBubble:PIXI.Sprite
    background:PIXI.Sprite
    loader:PIXI.Loader

    constructor() {
        this.pixi = new PIXI.Application({ width: 900, height: 500 })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("fishTexture", fishImage)
            .add("backgroundTexture", bgImage)
            .add("bubbleTexture", bubbleImage)

        this.loader.load(() => this.doneLoading())
    }
    
    randomNumberX(){
        let randomX = Math.floor(Math.random() * 900)
        return randomX
    }
    randomNumberY(){
        let randomY = Math.floor(Math.random() * 500)
        return randomY
    }

    doneLoading() {
        console.log("all textures loaded!")
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!)
        this.pixi.stage.addChild(this.background)

        this.fish = new PIXI.Sprite(this.loader.resources["fishTexture"].texture!)
        this.fish.x = this.randomNumberX()
        this.fish.y = this.randomNumberY()
        this.pixi.stage.addChild(this.fish)

        this.anotherFish = new PIXI.Sprite(this.loader.resources["fishTexture"].texture!)
        this.anotherFish.x = this.randomNumberX()
        this.anotherFish.y = this.randomNumberY()
        this.pixi.stage.addChild(this.anotherFish)

        this.bubble = new PIXI.Sprite(this.loader.resources["bubbleTexture"].texture!)
        this.bubble.x = this.randomNumberX()
        this.bubble.y = this.randomNumberY()
        this.pixi.stage.addChild(this.bubble)

        this.anotherBubble = new PIXI.Sprite(this.loader.resources["bubbleTexture"].texture!)
        this.anotherBubble.x = this.randomNumberX()
        this.anotherBubble.y = this.randomNumberY()
        this.pixi.stage.addChild(this.anotherBubble)

        this.pixi.ticker.add((delta) => this.update(delta))
        
    }

    update(delta : number) {
        this.fish.x -= 2
        this.bubble.y -= 1.5
        this.anotherBubble.y -= 1.5
        this.anotherFish.x -= 3

        if(this.fish.x <= -100) {
            this.fish.x = 900
            this.fish.y = this.randomNumberY()
        }
        if(this.anotherFish.x <= -100) {
            this.anotherFish.x = 900
            this.anotherFish.y = this.randomNumberY()
        }
        if(this.bubble.y <= -40){
            this.bubble.x = this.randomNumberX()
            this.bubble.y = 500
        }
        if(this.anotherBubble.y <= -40){
            this.anotherBubble.x = this.randomNumberX()
            this.anotherBubble.y = 500
        }
    }
}

new Game()