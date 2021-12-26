<template>
  <canvas  
  @click = "isClicked"
  id="canvas"></canvas>
</template>

<script>
export default {
    name: 'Content',
    data() {
        return {
            vueCanvas: null,
            painting: false,
            canvas: null,
            ctx: null,
            balls: [],
            gravity: 0.25,
            friction: 0.98,
            ball: {
                bounce: 0.75,
                radius: 30,
                x: 500,
                y: 500,
                velX: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1),
                velY: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1)
            }
            
        }
    },
    methods: { /*
        startPainting() {
            this.painting = true;
            console.log(this.painting);
            this.draw(e);
        },
        finishedPainting() {
            this.painting = false;
            console.log(this.painting);
            this.ctx.beginPath();
        },
            *//*
        draw(e) {

            if (!this.painting) {
                return
            } else {
                
                this.ctx.lineWidth = 5;
                this.ctx.lineCap = "round";
                console.log(e.clientX,e.clientY-110); 
                this.ctx.lineTo(e.clientX, e.clientY-120);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx-moveTo(e.clientX, e.clientY-120);
            }
            
        },
    */

    isClicked(event) {
        console.log("x: ", event.clientX);
        console.log("y: ",event.clientY);
    },

    init() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d"); 
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight-120;
        this.update();
       },

    draw() {
           /*this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); */
           this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
           this.ball.x = 500;
           this.ball.y = 500;

           this.ctx.beginPath();
           this.ctx.fillStyle = "red";

           this.ctx.arc(
               this.ball.x,
               this.ball.y,
               this.ball.radius,
               0,
               Math.PI * 2
           )
           this.ctx.fill();
        },

    
     update() {
        window.requestAnimationFrame(this.update);
        this.ball.y += this.gravity;
        this.ball.x += this.ball.velX;
        this.ball.y += this.ball.velY;
        this.draw();
    } 
 
    
    },
    mounted() {
       this.init();    
    }   
}
</script>

<style>
    #canvas {
        border: 1px solid black;
        background: white;
        
    }
</style>