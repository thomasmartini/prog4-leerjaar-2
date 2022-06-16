import * as PIXI from "pixi.js"

export class Fish extends PIXI.Sprite {
    
    deadTexture : PIXI.Texture
    alive : boolean

    public constructor(texture: PIXI.Texture, deadTexture: PIXI.Texture) {
        super(texture)
        this.deadTexture = deadTexture
        this.alive = true
        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', () => this.fishClicked())
        this.x = this.randomX()
        this.y = this.randomY()
        this.tint = Math.random() * 0xFFFFFF
    }
    private randomX(){
       let random = Math.floor(Math.random() * 900)
        return random
    }
   private randomY(){
        let random = Math.floor(Math.random() * 400)
         return random
     }
   public update(delta:number) {
        if(this.alive == true){
            this.x -= 5
            if(this.x <= 0 - this.texture.width){
                this.resetpos()
            }  
        }
        else{
            
            if(this.y < 500 - 48){
                this.y += 1
            }else{

            }
        }

    }
   private resetpos(){
        this.x = 900
        this.y = this.randomY()
        this.tint = Math.random() * 0xFFFFFF

    }
   private fishClicked() {
        this.texture = this.deadTexture
        this.alive = false 
        this.tint = 0xFFFFFF

    }
}