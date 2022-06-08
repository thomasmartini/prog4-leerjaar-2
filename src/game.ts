import * as PIXI from "pixi.js"
import fishImage from "./images/fish.png"
import bgImage from "./images/water.jpg"
import bubbleImage from "./images/bubble.png"

export class Game {
    spritesFish : PIXI.Sprite[] = []
    spritesBubbles: PIXI.Sprite[] = []
    pixi: PIXI.Application
    style : PIXI.TextStyle
    fish: PIXI.Sprite
    graphics: PIXI.Graphics
    bubble:PIXI.Sprite
    basictext: PIXI.Text
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
        let randomY = Math.floor(Math.random() * 500 - this.fish.height)
        return randomY
    }
    doneLoading(){
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!)
        this.pixi.stage.addChild(this.background)

        for (let i = 0; i<10; i++) {
            this.fish = new PIXI.Sprite(this.loader.resources["fishTexture"].texture!)
            this.fish.x = this.randomNumberX()
            this.fish.y = this.randomNumberY()
            this.pixi.stage.addChild(this.fish)
            this.spritesFish.push(this.fish)

            this.bubble = new PIXI.Sprite(this.loader.resources["bubbleTexture"].texture!)
            this.bubble.x = this.randomNumberX()
            this.bubble.y = this.randomNumberY()
            this.pixi.stage.addChild(this.bubble)          
            this.spritesBubbles.push(this.bubble)
            this.pixi.ticker.add((delta) => this.update(delta))

        }
        this.style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',})

            this.basictext = new PIXI.Text('wow cool fish ', this.style)
            this.basictext.x = 350
            this.basictext.y = 250
            this.pixi.stage.addChild(this.basictext)

            this.graphics = new PIXI.Graphics()

            this.graphics.beginFill(0xDE3249);
            this.graphics.drawRect(50, 50, 100, 100);
            this.graphics.endFill();

            this.pixi.stage.addChild(this.graphics)
    }
   
    update(delta : number) {
        for(let sprite of this.spritesFish){
            sprite.x -= 1 * delta
            if(sprite.x <= 0 - sprite.width){
                sprite.x = 900
                sprite.y = this.randomNumberY()
            }
        }
        for(let sprite of this.spritesBubbles){
            sprite.y -= 1 * delta
            if(sprite.y <= 0 - sprite.height){
                sprite.x = this.randomNumberX()
                sprite.y = 500 + sprite.height
            }
        }
    }
}


new Game()