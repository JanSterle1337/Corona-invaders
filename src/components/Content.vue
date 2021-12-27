<template>

    <img class="img" src='../assets/corona2.png' ref="imgCorona">
    <img class="img" src='../assets/sanitizer2.png' ref="imgSanitizer" style="transform: rotate(90deg);">
    <canvas  
    @click = "isClicked"
    id="canvas">
    </canvas>

    <div @keyup.space="moveLeft">Nekineki</div>

</template>

<script>


export default {
    name: 'Content',
    data() {
        return {
            tipka: null,
            requestID: true,
            vueCanvas: null,
            painting: false,
            canvas: null,
            ctx: null,
            balls: [],
            gravity: 0.25,
            friction: 0.98,
            coronaImg: "",
            ball: {
                bounce: 0,
                radius: 0,
                x: 0,
                y: 0,
                velX: 0/*(Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1) */,
                velY: 0 /*(Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1) */,
            },
            sanitizers: [],
            sanitizer: {
                radius: 10,
                x: 0,
                y: 0,
                velX: 0,
                velY: 0
            },
            weapon: {
                x: 400,
                y: 720,
                width:  40,
                height: 70,
            }
            
        }
    },


    methods: { 
        
        moveLeft(event) {
            if (this.tipka === 97) {
               
                this.weapon.x = this.weapon.x-10;
            }
    
        },

        moveRight() {
            if (this.tipka === 100) {
                this.weapon.x = this.weapon.x+10;
            }
        },

        moveSanitizer() {
            for (let i = 0; i < this.sanitizers.length; i++) {
                this.sanitizers[i].y += this.sanitizers[i].velY; 
            }
        },
        isClicked(event) {
       /*     console.log("Ko kliknemo x: ", event.clientX);
            console.log("Ko kliknemo y: ",event.clientY);
        */
          
            let cordX = event.clientX;
            let cordY = event.clientY-120; 
            console.log("X: ", cordX, "Y: ", cordY);


            let bulletStartingPointX = this.weapon.x + (this.weapon.width/2);
            let bulletStartingPointY = this.weapon.y - (this.weapon.height/2);


            
            console.log("Weapon x: ", this.weapon.x, "Weapon y: ", this.weapon.y);
            console.log("Bullet x: ", bulletStartingPointX, "Bullet y: ", bulletStartingPointY);
            console.log("Vrednost tipke: ", this.tipka);
            

            
            this.shootSanitizer();
            /*
            let xLength = Math.abs(this.ball.x-event.clientX);
            let yLength = Math.abs(this.ball.y-event.clientY+97);

            console.log(event);
            let squaredLength = Math.sqrt((xLength * xLength) + (yLength * yLength));
            console.log(squaredLength);
            if (squaredLength < this.ball.radius) {
                console.log("JE MANJSEEEEEE");
                this.requestID = !this.requestID;
                if (this.requestID == true) {
                    this.loop();
                }
            } */

        },

        shootSanitizer() {
            
            console.log("spawn");
            this.initSanitizers(1);
        }, 

        loop() {

            
            if (this.requestID == false) return;            
            window.requestAnimationFrame(this.loop);
            for (let i = 0; i < this.balls.length; i++) {
                this.balls[i].velY += this.gravity;
                this.balls[i].x += this.balls[i].velX;
                this.balls[i].y += this.balls[i].velY;
            }


            this.moveLeft();
            this.moveRight();
            this.moveSanitizer();
            this.colission();
            this.ballToBallColission();
            this.draw();
            this.drawSanitizer();
            this.drawWeapon();
            
        },

    


        init() {
    
            this.canvas = document.getElementById("canvas");
            this.ctx = this.canvas.getContext("2d"); 
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight-120;

            /*
            this.ball = {
                bounce: 0.75, // energy lost on bounce (25%)
                radius: 30,
                x: this.canvas.width / 2,
                y: this.ball.radius,
                velX: (Math.random() * 7 + 5) * (Math.floor(Math.random() * 2) || -1),
                velY: (Math.random() * 7 + 5) * (Math.floor(Math.random() * 2) || -1)
            } */

            

            this.initBalls(5);
            this.initWeapon();
            this.loop();
            /*  this.update();  */
             
    
          
            
        },
        
        initBalls(n) {
            for (let i = 0; i < n; i++) {
                this.ball = {
                bounce: 0.75, // energy lost on bounce (25%)
                radius: 30,
                x: this.canvas.width / 2,
                y: this.ball.radius,
                velX: (Math.random() * 7 + 5) * (Math.floor(Math.random() * 2) || -1),
                velY: (Math.random() * 7 + 5) * (Math.floor(Math.random() * 2) || -1)
                }
                this.balls.push(this.ball);
            }
        },

        initSanitizers(n) {

            for (let i = 0; i < n; i++) {
                this.sanitizer = {
                radius: 10,
                x: this.weapon.x + (this.weapon.width/2),
                y: this.weapon.y - (this.weapon.height/2),
                velX: 0,
                velY: -5,
                }
                this.sanitizers.push(this.sanitizer);
                console.log(this.sanitizers);
            }
        
            
        },

        initWeapon() {
            this.weapon.y = this.canvas.height-70;
        },
        drawSanitizer() {
            for (let i = 0; i < this.sanitizers.length; i++) {
                this.ctx.beginPath();
                this.ctx.fillStyle = "red";
                this.ctx.arc(
                    this.sanitizers[i].x,
                    this.sanitizers[i].y,
                    this.sanitizers[i].radius,
                    0,
                    Math.PI * 2
                );

                this.ctx.fill();
            }
        },

        drawWeapon() {
            this.ctx.beginPath();
            this.ctx.fillStyle = "gray",
            this.ctx.rect(this.weapon.x,this.weapon.y,this.weapon.width,this.weapon.height);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.drawImage(
                this.$refs.imgSanitizer,
                this.weapon.x,this.weapon.y,
                40,70
            );
            this.ctx.fill();
        },

        draw() {
            /*this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); */
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
            for (let i = 0; i < this.balls.length; i++) {
                this.ctx.beginPath();
                this.ctx.fillStyle = "blue";
                this.ctx.arc(
                    this.balls[i].x,
                    this.balls[i].y,
                    this.balls[i].radius,
                    0,
                    Math.PI * 2
                )
                this.ctx.fill(); 

                this.ctx.beginPath();
                this.ctx.drawImage(
                this.$refs.imgCorona,
                this.balls[i].x-30,this.balls[i].y-30,
                60,60
                );
                this.ctx.fill();  /*Pobrisi ce pride do ksnih erroru*/
            }

            
            
            
        },

    /*
     update() {
        window.requestAnimationFrame(this.update);
        
        console.log("X: ", this.ball.x, "Y: ", this.ball.y); 
        this.ball.velY += this.gravity;
        this.ball.x += this.ball.velX;
        this.ball.y += this.ball.velY;
        this.colission();
        this.draw();

        },
    */  

    ballOverlap(obj1,obj2) {
        let xLength = Math.abs(obj1.x - obj2.x);
        let yLength = Math.abs(obj1.y - obj2.y);
        let distanceSquared = Math.sqrt(xLength*xLength + yLength*yLength);
        if (distanceSquared <= obj1.radius + obj2.radius) {
            return true;
        } else {
            return false;
        }
    },

    distanceSquared(obj1,obj2) {
        let xLength = Math.abs(obj1.x - obj2.x);
        let yLength = Math.abs(obj1.y - obj2.y);
        let distanceSquared = Math.sqrt(xLength*xLength + yLength*yLength);
        return distanceSquared;
    },

    ballToBallColission() {
        for (let i = 0; i < this.balls.length-1; i++) {
            for (let j = i+1; j < this.balls.length; j++) {
                if (this.ballOverlap(this.balls[i],this.balls[j])) {


/*
                    let squaredDistance = this.distanceSquared(this.balls[i],this.balls[j]);
                    let overlap = (squaredDistance - this.balls[i].radius - this.balls[j].radius) / 2;

                    let moveX = (overlap * (this.balls[i].x - this.balls[j].x) / squaredDistance);
                    let moveY = (overlap * (this.balls[i].y - this.balls[j].y) / squaredDistance);

                    this.balls[i].x = (this.balls[i].x - moveX);
                    this.balls[i].y = (this.balls[i].y - moveY);

                    this.balls[j].x = (this.balls[j].x + moveX);
                    this.balls[j].y = (this.balls[j].y + moveY);
                   
                  

                    let normal = 
                        {
                            x: (this.balls[j].x - this.balls[i].x) / squaredDistance,
                            y: (this.balls[j].x - this.balls[i].x) / squaredDistance
                        };
                    

                    let tangent = 
                         {
                             x: -normal.y,
                             y: normal.x
                         };

                    let dotProductTangent1 = this.balls[i].velX * tangent.x + this.balls[i].velY * tangent.y;
                    let dotProductTangent2 = this.balls[j].velX * tangent.x + this.balls[j].velY * tangent.y;

                    let dotProductNormal1 = this.balls[i].velX * normal.x + this.balls[i].velY * normal.y;
                    let dotProductNormal2 = this.balls[j].velX * normal.x + this.balls[j].velY * normal.y;

                    let m1 = 

                    this.balls[i].velX = (tangent.x * dotProductTangent1 + normal.x * 0.7);
                    this.balls[i].velY = (tangent.y * dotProductTangent1 + normal.y * 0.7);

                    this.balls[j].velX = (tangent.x * dotProductTangent2 + normal.x * 0.7);
                    this.balls[j].velY = (tangent.y * dotProductTangent2 + normal.y * 0.7);
                    
                    */
                }
            } 
        } 
        
    },

    colission() {
            //collision with bottom

            for (let i = 0; i < this.balls.length; i++) {
                if (this.balls[i].y - this.balls[i].radius >= this.canvas.height) {
                this.balls[i].velY = -this.balls[i].velY * this.balls[i].bounce;
            
                this.balls[i].y =  this.canvas.height-(this.balls[i].radius)*2;   
                }
            //colission with top
                if (this.balls[i].y - this.balls[i].radius <= 0) {
                    this.balls[i].velY = -this.balls[i].velY;
                    this.balls[i].y = 0+this.balls[i].radius;
                }
                //colission with left
                if (this.balls[i].x - this.balls[i].radius <= 0) {
                    this.balls[i].velX = -this.balls[i].velX * this.balls[i].bounce;
                    this.balls[i].x = 0+this.balls[i].radius;
                }
                //collision with left
                if (this.balls[i].x + this.balls[i].radius >= this.canvas.width) {
                    this.balls[i].velX = -this.balls[i].velX * this.balls[i].bounce;
                    this.balls[i].x = this.canvas.width-this.balls[i].radius;
                }
            }


            for (let i = 0; i < this.sanitizers.length; i++) {
                if (this.sanitizers[i].y - this.sanitizers[i].radius <= 0) {
                    this.sanitizers.splice(i,1);
                }
            }

            
       }
 
    
    },


    mounted() {
    window.addEventListener("keypress", e => {
        this.tipka = e.keyCode;
        console.log(e.keyCode);
    }),
    window.addEventListener("keyup", e => {
        if (e.keyCode === this.tipka) {
            this.tipka = null;
        }
    });
    this.init();        
    }   
}
</script>

<style>
    #canvas {
        border: 1px solid black;
        background: white;
        
    }

    .img {
        display:none;
    }
</style>