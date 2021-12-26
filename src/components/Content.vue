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
            requestID: true,
            vueCanvas: null,
            painting: false,
            canvas: null,
            ctx: null,
            balls: [],
            gravity: 0.25,
            friction: 0.98,
            ball: {
                bounce: 0,
                radius: 0,
                x: 0,
                y: 0,
                velX: 0/*(Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1) */,
                velY: 0 /*(Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1) */,
            }
            
        }
    },
    methods: { 
    

        isClicked(event) {
       /*     console.log("Ko kliknemo x: ", event.clientX);
            console.log("Ko kliknemo y: ",event.clientY);
        */
 
            let xLength = Math.abs(this.ball.x-event.clientX);
            let yLength = Math.abs(this.ball.y-event.clientY+97);


            let squaredLength = Math.sqrt((xLength * xLength) + (yLength * yLength));
            console.log(squaredLength);
            if (squaredLength < this.ball.radius) {
                console.log("JE MANJSEEEEEE");
                this.requestID = false;

            }
        },

        init() {
    
            this.canvas = document.getElementById("canvas");
            this.ctx = this.canvas.getContext("2d"); 
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight-120;


            this.ball = {
                bounce: 0.75, // energy lost on bounce (25%)
                radius: 30,
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                velX: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1),
                velY: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1)
            }


            
            this.update();
             
                
          
            
        },

        draw() {
            /*this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); */
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            let r = Math.floor(Math.random() * 255 +1);
            let b = Math.floor(Math.random() * 255 +1);
            let g = Math.floor(Math.random() * 255 +1);
            this.ctx.beginPath();
            this.ctx.fillStyle = `red`;
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
        
        /*console.log("X: ", this.ball.x, "Y: ", this.ball.y); */
        this.ball.velY += this.gravity;
        this.ball.x += this.ball.velX;
        this.ball.y += this.ball.velY;
        this.colission();
        this.draw();

        },
    

    colission() {
            //collision with bottom
            if (this.ball.y - this.ball.radius >= this.canvas.height) {
                this.ball.velY = -this.ball.velY * this.ball.bounce;
            
                this.ball.y =  this.canvas.height-this.ball.radius;
                
            }
            //colission with top
            if (this.ball.y - this.ball.radius <= 0) {
                this.ball.velY = -this.ball.velY;
                this.ball.y = 0+this.ball.radius;
            }
            //colission with left
            if (this.ball.x - this.ball.radius <= 0) {
                this.ball.velX = -this.ball.velX * this.ball.bounce;
                this.ball.x = 0+this.ball.radius;
            }
            //collision with left
            if (this.ball.x + this.ball.radius >= this.canvas.width) {
                this.ball.velX = -this.ball.velX * this.ball.bounce;
                this.ball.x = this.canvas.width-this.ball.radius;
         }
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