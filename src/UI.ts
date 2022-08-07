import * as PIXI from 'pixi.js'

export class UI extends PIXI.Container {

    scoreField:PIXI.Text
    nameField:PIXI.Text
    score:number = 0
    lastScore = localStorage.getItem('lastscore')

    public constructor(){
        super()
        const style = new PIXI.TextStyle({
            fontFamily: 'ArcadeFont',
            fontSize: 40,
            fontWeight: 'bold',
            fill: ['#ffffff']
        })
    
        this.scoreField = new PIXI.Text(`Score : 0`, style)
        this.addChild(this.scoreField)
        this.scoreField.x = 10
        this.scoreField.y = 10

    }
    public addScore(n:number) {
        this.score += n
        this.scoreField.text = `Score : ${this.score}`
    }
    public gameOver(){
        this.scoreField.x = 450 - this.width
        this.scoreField.y = 250 - this.height
        this.scoreField.text = `Game Over: Score : ${this.score}`
        if(this.score > JSON.parse(this.lastScore)){
            localStorage.setItem('lastscore', JSON.stringify(this.score))
        } 
    }
    public highScore(){   
        if(this.lastScore) {
        this.scoreField.x = 620
        this.scoreField.y = 10
        this.scoreField.text = `Highscore : ${this.lastScore}`
    }
}
}