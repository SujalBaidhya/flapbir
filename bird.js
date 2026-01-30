const birdup = document.getElementById("up")
const birdmid = document.getElementById("mid")
const birddown = document.getElementById("down")
const birds = [birdup, birdmid, birddown]
var i=0
var delay=0
class Bird {
    constructor(y) {
        this.position = {
            x: 200,
            y: y
        }
        this.diry = 1
        this.gravity = 0.03
        this.size = {
            width: 30,
            height: 30
        }
        this.isDead = false
        this.score = 0
        this.status="start"
    }
    get top() {
        return this.position.y
    }
    get right() {
        return this.position.x + this.size.width
    }
    get left() {
        return this.position.x
    }
    get bottom() {
        return this.position.y + this.size.height
    }
    reset(){
        this.score=0
        this.isDead=false
        this.position.y=300
        this.diry=1
    }
    draw(ctx) {
        delay++
        if (delay > 30) {
            i++
            if (i > 2) {
                i = 0
            }
            delay = 0
        }
        ctx.drawImage(birds[i], this.position.x, this.position.y, this.size.width, this.size.height)
    }
    collision() {
        if (this.bottom > canvas.height || this.top < 0) {
            this.isDead = true
            this.status="restart"
        }
    }
    update() {
        this.collision()
        if (!this.isDead) {
            this.diry += this.gravity
            this.position.y += this.diry
        }
    }
}
export default Bird