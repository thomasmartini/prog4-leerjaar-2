import * as PIXI from "pixi.js"

export class Background extends PIXI.TilingSprite {

    public constructor(texture: PIXI.Texture, w:number, h:number) {
        super(texture, w, h)
    }

    public update() {
        this.tilePosition.x += 3
    }
}