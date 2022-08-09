import * as PIXI from "pixi.js"

export class Fish extends PIXI.Sprite {
    xspeed = 0
    yspeed = 0
    controller: Gamepad
    public constructor(texture: PIXI.Texture) {
        super(texture)
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
        window.addEventListener("gamepadconnected", () => this.controllerAxes())
        this.scale.set(-1,1)
        this.x = 300
        this.y = 300
    }
   public update() {
        this.x += this.xspeed 
        this.y += this.yspeed
        if(this.controller){
            this.controllerAxes()
        }
    }

    private controllerAxes(){
            this.controller = navigator.getGamepads()[0]; 
            if(this.controller?.axes[1] >= 0.2 || this.controller?.axes[1] <= -0.2 || this.controller?.axes[0] <= -0.2 || this.controller?.axes[0] >= 0.2) {
            this.yspeed = this.controller?.axes[1] * 6
            this.xspeed = this.controller?.axes[0] * 6
            }
    }
    
    private onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.xspeed = -6
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 6
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -6
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 6
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