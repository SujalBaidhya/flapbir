class Obstacles{
    constructor(){
        this.width=60
        this.height1=Math.floor(Math.random()*(450-30))+30
        this.gap=120
        this.height2=600-this.height1-this.gap
        this.x=window.innerWidth-10
        this.y1=0
        this.y2=600-this.height2
        this.upimage=new Image()
        this.upimage.src="./pngs/pipe-green inverted.png"
        this.downimage=new Image()
        this.downimage.src="./pngs/pipe-green.png"
        this.passed=false;
        this.speed=2
    }
    draw(ctx){
        ctx.drawImage(this.upimage,this.x, this.y1, this.width, this.height1);
        ctx.drawImage(this.downimage, this.x,this.y2, this.width, this.height2);
    }
    get bottom1(){
        return this.height1+this.y1
    }
    get top2(){
        return this.y2
    }
    get left(){
        return this.x
    }
    get right(){
        return this.x+this.width
    }
    update(){
        this.x-=this.speed
    }
}
export default Obstacles