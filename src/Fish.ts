import * as PIXI from "pixi.js"
import { Game } from "./game"


export class Fish extends PIXI.Sprite {
    xspeed = 0
    yspeed = 0
    controller: Gamepad
    constructor(texture: PIXI.Texture) {
        super(texture)
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
        window.addEventListener("gamepadconnected", () => this.controllerAxes())
        this.scale.set(-1,1)
        this.x = 300

    }
   public update() {
        this.x += this.xspeed 
        this.y += this.yspeed 
        if(this.controller){
            this.controllerAxes()
        }
    }

    private shoot(){
        console.log("shooooot!")
    }
    controllerAxes(){
            this.controller = navigator.getGamepads()[0]; 
            if(this.controller?.axes[1] >= 0.3 || this.controller?.axes[1] <= -0.3 || this.controller?.axes[0] <= -0.3 || this.controller?.axes[0] >= 0.3) {
            this.yspeed = this.controller?.axes[1] * 7
            this.xspeed = this.controller?.axes[0] * 7
            console.log(this.controller?.axes)
            }
            else{
              
            }
    }
    
    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                this.shoot()
                break;
            case "A":
            case "ARROWLEFT":
                this.xspeed = -7
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 7
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -7
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 7
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }
}