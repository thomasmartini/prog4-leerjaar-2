import * as PIXI from "pixi.js"

export class Enemy extends PIXI.Sprite {
    xspeed = 0
    yspeed = 0
    fishOverspeed: number = 0
    timer: number = 0

    public constructor(texture: PIXI.Texture) {
        super(texture)
        this.y = Math.random() * 450
        this.x = - 140
        this.scale.set(-1,1)
    }
    public update(overspeed:number){
        this.x += (2.5 + overspeed)
        }
    }
