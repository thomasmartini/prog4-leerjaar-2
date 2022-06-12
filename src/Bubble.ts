import * as PIXI from "pixi.js"

export class Bubble extends PIXI.Sprite {
    
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = this.randomX()
        this.y = this.randomY()
    }
    randomX(){
       let random = Math.floor(Math.random() * 900)
        return random
    }
    randomY(){
        let random = Math.floor(Math.random() * 400)
         return random
     }
    update(delta:number) {
        this.y -= 2
        if(this.y % 2 === 0){
        this.x -= Math.random() * 0.5
        this.x += Math.random() * 0.5
    }
        if(this.y <= -this.texture.height){
            this.resetpos()
        }
    }
    resetpos(){
        this.x = this.randomX()
        this.y = 500
        this.scale.set(Math.random() * 1)

    }
}