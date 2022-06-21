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
    fish : Fish[] = []   
    bubbles : Bubble[] = []
    mylistener:EventListener


    public constructor() {
        this.pixi = new PIXI.Application({ width: 900, height: 500 })
        document.body.appendChild(this.pixi.view)
        this.mylistener = (e:Event) => this.logMessage(e)
        window.addEventListener('click', this.mylistener)
    
        this.loader = new PIXI.Loader()
        this.loader
            .add("fishTexture", fishImage)
            .add("deadTexture", deadImage)
            .add("backgroundTexture", bgImage)
            .add("bubbleTexture", bubbleImage)

        this.loader.load(() => this.doneLoading())
    }
    private doneLoading(){
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!)
        this.pixi.stage.addChild(this.background,)
        let fish = new Fish((this.loader.resources["fishTexture"].texture!))
        this.fish.push(fish) 
        this.pixi.stage.addChild(fish)

        for(let i = 0; i<10; i++){          

            let bubble = new Bubble(this.loader.resources["bubbleTexture"].texture!)
            this.bubbles.push(bubble)
            this.pixi.stage.addChild(bubble)
        }
        
       this.pixi.ticker.add(() => this.update())
    }
    logMessage(e:Event){
        console.log("click event was called, now removing the listener!")
        window.removeEventListener("click", this.mylistener)
    }
   
    private update() {
       
        for(let bubble of this.bubbles){
            bubble.update()
            if(this.collision(this.fish[0], bubble)){
                console.log("player touches enemy 💀")
            }
        }
        for (let fishie of this.fish){
           fishie.update()
        }


    }
    collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}

new Game()