import * as PIXI from "pixi.js"
import fishImage from "./images/fish.png"
import bgImage from "./images/water.jpg"
import bubbleImage from "./images/bubble.png"
import deadImage from "./images/bones.png"
import sharkImage from "./images/shark.png"
import restart from "./images/restart.png"
import { Fish } from "./Fish"
import { Bubble } from "./Bubble"
import { Enemy } from "./enemy"
import { UI } from './UI'
import { Background } from "./background"

export class Game {
    pixi: PIXI.Application 
    background:Background
    bones:PIXI.Sprite
    loader:PIXI.Loader
    fish : Fish 
    bubbles : Bubble[] = []
    enemies: Enemy[] = []
    gameOverButton: PIXI.Sprite
    enemyTimer: number = 0
    enemyCooldown: number = 100
    EnemySpeed: number = 0
    interface: UI
    highScore: UI
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
            .add("restartButton", restart)

        this.loader.load(() => this.doneLoading())
    }
    private doneLoading(){
        this.addBackground()
        this.fish = new Fish((this.loader.resources["sharkTexture"].texture!))
        this.pixi.stage.addChild(this.fish)
        

        for(let i = 0; i<10; i++){          

            let bubble = new Bubble(this.loader.resources["bubbleTexture"].texture!)
            this.bubbles.push(bubble)
            this.pixi.stage.addChild(bubble)
        }
        let enemy = new Enemy((this.loader.resources["fishTexture"].texture!))
        this.enemies.push(enemy)
        this.pixi.stage.addChild(enemy)

        this.interface = new UI()
        this.pixi.stage.addChild(this.interface)

        this.highScore = new UI()
        this.highScore.highScore()
        this.pixi.stage.addChild(this.highScore)

        this.pixi.ticker.add(() => this.update())
    }
   private addBackground() {
        this.background = new Background(this.loader.resources["backgroundTexture"].texture!, this.pixi.screen.width, this.pixi.screen.height)
        this.pixi.stage.addChild(this.background)
        console.log(window.screen.width)
    }
    private createNewEnemy(){
        let enemy = new Enemy((this.loader.resources["fishTexture"].texture!))
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
        this.background.update() 
        this.fish.update()  
        for(let bubble of this.bubbles){
            bubble.update()
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
        this.interface.gameOver()
        this.pixi.stop()
        this.gameOverButton = new PIXI.Sprite((this.loader.resources["restartButton"].texture!))// jouw eigen sprite hier
        this.gameOverButton.width = 100
        this.gameOverButton.height = 50
        this.gameOverButton.x = 430
        this.gameOverButton.y = 250
        this.gameOverButton.interactive = true
        this.gameOverButton.buttonMode = true
        this.gameOverButton.on('pointerdown', () => this.resetGame())
        this.pixi.stage.addChild(this.gameOverButton)
    }
    private resetGame(){
                this.gameOverButton.destroy() 
                for (let enemy of this.enemies) {
                    enemy.destroy()
                }
                this.enemies = []
                this.defeatCount = 0

                this.interface.destroy()
                this.interface = new UI()

                this.highScore.destroy()
                this.highScore = new UI()
                this.highScore.highScore()
                this.pixi.stage.addChild(this.highScore)

                this.fish.x = 300
                this.fish.y = 300

                this.pixi.stage.addChild(this.interface)
                this.pixi.start()
            }
    private checkCollisions() { {
            for (let enemy of this.enemies) {
                if(this.collision(this.fish, enemy)){
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
   private collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}

new Game()