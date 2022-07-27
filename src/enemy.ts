import * as PIXI from "pixi.js"
import { Game } from "./game"

export class Enemy extends PIXI.Sprite {
    xspeed = 0
    yspeed = 0
    fishOverspeed: number = 0
    timer: number = 0
    game:Game
    constructor(texture: PIXI.Texture, game:Game) {
        super(texture)
        this.game = game
        this.y = Math.random() * 450
        this.x = - 140
    }
    update(overspeed:number){
        this.x += (2.5 + overspeed)
        console.log(overspeed)

        }

    }
