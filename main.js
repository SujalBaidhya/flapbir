import Bird from "./bird.js"
import Obstacles from "./obstacle.js"
const canvas=document.getElementById("canvas")
const ctx=canvas.getContext("2d")
canvas.width=window.innerWidth-10
canvas.height=600
const bird= new Bird(canvas.height/2)
let obstacles=[]
let gmo=new Image()
let highScore = localStorage.getItem("highScore") || 0
let gap=1500
let lastTime=0
let counter=0
highScore = Number(highScore)
gmo.src="./pngs/game_over_PNG38-3669910976.png"
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth - 10
})
function jump(event){
     if(event.key==" "){
        event.preventDefault(); 
        if(bird.status=="start"){
            counter=0
            lastTime=0
            gap=1500
            obstacles=[]
            bird.reset()
            bird.status="playing"
        }
        else if(bird.status=="playing"){
            bird.diry=-2
        }
        else if(bird.status=="restart"){
            bird.reset()
            counter=0
            lastTime=0
            gap=1500
            counter=0
            obstacles=[]
            bird.status="playing"
        }
        // bird.update()   
    }
}
function obsdraw(){
    for(let i=obstacles.length-1;i>=0;i--){
        obstacles[i].update()
        obstacles[i].draw(ctx)
        if(obstacles[i].right<0){
            obstacles.splice(i,1)
        }
    }
}
function drawStartScreen(){
    ctx.font = "50px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText("Press SPACE to Start", canvas.width/2, canvas.height/2)
}
function drawRestartText(){
    ctx.font = "40px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText("Press SPACE to Play Again", canvas.width/2, canvas.height/2 + 170)
}
function collide(){
    for(let i=obstacles.length-1;i>=0;i--){
    if(bird.top<=obstacles[i].bottom1||bird.bottom>=obstacles[i].top2){
       if(bird.right>obstacles[i].left&&bird.left<obstacles[i].right){
        bird.isDead=true
        bird.status="restart"
    }
    }
    }
}
function score(){
    ctx.font = "40px Arial Narrow"
    ctx.fillStyle="white"
    ctx.fillText(`Score:${bird.score}`,70,50)
    ctx.fillText(`Best: ${highScore}`, 70, 95)
    for(let i=0;i<obstacles.length;i++){
        if(!obstacles[i].passed&&bird.left>obstacles[i].right){
        bird.score++
        obstacles[i].passed=true
    }}
}
document.body.addEventListener("keyup",jump)
function gameloop(time){
    if(bird.isDead){
        if (bird.score > highScore) {
            highScore = bird.score
            localStorage.setItem("highScore", highScore)
        }
        ctx.drawImage(gmo,canvas.width/2-150,canvas.height/2-150,300,300)
        drawRestartText()
        requestAnimationFrame(gameloop)
        return
    }
    ctx.clearRect(0,0,canvas.width,canvas.height)
     if (bird.status == "start") {
        obstacles=[]
        // lastTime=0
        drawStartScreen()
        requestAnimationFrame(gameloop)
        return
    }
   if(bird.status=="playing"){ const adder=time-lastTime
    lastTime=time
    counter+=adder
    if(counter>gap){
        obstacles.push(new Obstacles())
        counter=0
        if(gap>900){
            gap-=20
        }
    }
    bird.update()
    bird.draw(ctx)
    obsdraw()
    collide()
    score()}
    // console.log(bird.isDead)
    requestAnimationFrame(gameloop)
}
gameloop(lastTime)