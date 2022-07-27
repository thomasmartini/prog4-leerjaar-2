import * as PIXI from "pixi.js"
import fishImage from "./images/fish.png"
import bgImage from "./images/water.jpg"
import bubbleImage from "./images/bubble.png"
import deadImage from "./images/bones.png"
import sharkImage from "./images/shark.png"
import { Fish } from "./Fish"
import { Bubble } from "./Bubble"
import { Enemy } from "./enemy"
import { UI } from './UI'

export class Game {
    pixi: PIXI.Application 
    background:PIXI.Sprite
    bones:PIXI.Sprite
    loader:PIXI.Loader
    fish : Fish[] = []   
    bubbles : Bubble[] = []
    enemies: Enemy[] = []
    enemyTimer: number = 0
    enemyCooldown: number = 100
    EnemySpeed: number = 0
    interface: UI 
    defeatCount: number = 0
    mylistener:EventListener


    public constructor() {
        this.pixi = new PIXI.Application({ width: 900, height: 500 })
        document.body.appendChild(this.pixi.view)
    
        this.loader = new PIXI.Loader()
        this.loader
            .add("fishTexture", fishImage)
            .add("deadTexture", deadImage)
            .add("backgroundTexture", bgImage)
            .add("bubbleTexture", bubbleImage)
            .add("sharkTexture", sharkImage)

        this.loader.load(() => this.doneLoading())
    }
    private doneLoading(){
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!)
        this.pixi.stage.addChild(this.background,)
        let fish = new Fish((this.loader.resources["sharkTexture"].texture!))
        this.fish.push(fish) 
        this.pixi.stage.addChild(fish)
        

        for(let i = 0; i<10; i++){          

            let bubble = new Bubble(this.loader.resources["bubbleTexture"].texture!)
            this.bubbles.push(bubble)
            this.pixi.stage.addChild(bubble)
        }
        let enemy = new Enemy((this.loader.resources["fishTexture"].texture!),this)
        this.enemies.push(enemy)
        this.pixi.stage.addChild(enemy)
        this.interface = new UI()
        this.pixi.stage.addChild(this.interface)
       this.pixi.ticker.add(() => this.update())
    }
    private createNewEnemy(){
        let enemy = new Enemy((this.loader.resources["fishTexture"].texture!),this)
        this.enemies.push(enemy)
        this.pixi.stage.addChild(enemy)
        this.enemyTimer = 0
    }
    public deleteEnemy(enemy: Enemy){
        this.enemies = this.enemies.filter(f => f != enemy)
        enemy.destroy()
        console.log(this.enemyCooldown)
    }
   
    private update() {
       
        for(let bubble of this.bubbles){
            bubble.update()
        }
        for (let fishie of this.fish){
           fishie.update()
        }
        this.enemyTimer += 1 
        if (this.enemyTimer >= this.enemyCooldown){
            this.createNewEnemy()
        }
        for(let enemy of this.enemies){
            enemy.update(this.EnemySpeed)
            if(enemy.x > 1100){
                this.deleteEnemy(enemy)
                this.defeatCount += 1
              }
        }
        if(this.defeatCount == 10){
            this.gameOver()
            console.log("game over")

        }
        this.checkCollisions()
    }
    private gameOver(){
        this.interface.scoreField.text = "gameOver"
        this.pixi.stop()
    }

    private checkCollisions() { {
            for (let enemy of this.enemies) {
                if(this.collision(this.fish[0], enemy)){
                    this.deleteEnemy(enemy)
                    if(this.EnemySpeed < 6){
                        this.EnemySpeed += 0.1
                    }
                    if(this.enemyCooldown > 40){
                    this.enemyCooldown -= 1 
                    }
                   this.interface.addScore(10)
                    break
                }
            }
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