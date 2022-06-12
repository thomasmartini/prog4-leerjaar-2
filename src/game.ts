import * as PIXI from "pixi.js"
import fishImage from "./images/fish.png"
import bgImage from "./images/water.jpg"
import bubbleImage from "./images/bubble.png"
import deadImage from "./images/bones.png"
import { Fish } from "./Fish"
import { Bubble } from "./Bubble"

export class Game {
    pixi: PIXI.Application 
    background:PIXI.Sprite
    bones:PIXI.Sprite
    loader:PIXI.Loader
    fishies : Fish[] = []    
    bubbles : Bubble[] = []

    constructor() {
        this.pixi = new PIXI.Application({ width: 900, height: 500 })
        document.body.appendChild(this.pixi.view)

        

        this.loader = new PIXI.Loader()
        this.loader
            .add("fishTexture", fishImage)
            .add("deadTexture", deadImage)
            .add("backgroundTexture", bgImage)
            .add("bubbleTexture", bubbleImage)

        this.loader.load(() => this.doneLoading())
    }
    doneLoading(){
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!)
        this.pixi.stage.addChild(this.background,)
        for(let i = 0; i<10; i++){
            let fish = new Fish((this.loader.resources["fishTexture"].texture!),(this.loader.resources["deadTexture"].texture!)) 
            this.fishies.push(fish)
            this.pixi.stage.addChild(fish)

            let bubble = new Bubble(this.loader.resources["bubbleTexture"].texture!)
            this.bubbles.push(bubble)
            this.pixi.stage.addChild(bubble)
        }
        
       this.pixi.ticker.add((delta) => this.update(delta))
    }
   
    update(delta:number) {
        for(let fish of this.fishies){
           fish.update(delta)
        }
        for(let bubble of this.bubbles){
            bubble.update(delta)
        }
    }
}

new Game()