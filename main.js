import Bird from "./bird.js"
import Obstacles from "./obstacle.js"
const canvas=document.getElementById("canvas")
const ctx=canvas.getContext("2d")
canvas.width=window.innerWidth-10
canvas.height=600
const bird= new Bird(canvas.height/2)
let obstacles=[]
let gmo=new Image()
gmo.src="./pngs/game_over_PNG38-3669910976.png"
function jump(event){
     if(event.key==" "){
        event.preventDefault(); 
        bird.diry=-2
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
function collide(){
    for(let i=obstacles.length-1;i>=0;i--){
    if(bird.top<=obstacles[i].bottom1||bird.bottom>=obstacles[i].top2){
       if(bird.right>obstacles[i].left&&bird.left<obstacles[i].right){
         bird.isDead=true}
    }
    }
}
function score(){
    ctx.font = "40px Arial Narrow"
    ctx.Style="white"
    ctx.fillText(`Score:${bird.score}`,10,50)
    for(let i=0;i<obstacles.length;i++){
        if(!obstacles[i].passed&&bird.left>obstacles[i].right){
        bird.score++
        obstacles[i].passed=true
    }}
}
document.body.addEventListener("keyup",jump)
function gameloop(){
    if(bird.isDead){
        ctx.drawImage(gmo,canvas.width/2-150,canvas.height/2-150,300,300)
        return
    }
    ctx.clearRect(0,0,canvas.width,canvas.height)
    bird.update()
    bird.draw(ctx)
    obsdraw()
    collide()
    score()
    // console.log(bird.isDead)
    requestAnimationFrame(gameloop)
}
gameloop()
setInterval(()=>{
obstacles.push(new Obstacles(bird.score%10+1))
},1500)
