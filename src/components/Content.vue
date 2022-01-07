<template>
    <div class="Content">
        <div class="game">
            <img class="img" src='../assets/corona2.png' ref="imgCorona">
            <img class="img" src='../assets/sanitizer2.png' ref="imgSanitizer" style="transform: rotate(90deg);">
            <canvas  
            @click = "isClicked"
            id="canvas">
            </canvas>
        </div>
    </div>
    

</template>

<script>

import axios from "axios";

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
            gravity: 0.01,
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
            if (this.tipka === 97 && this.weapon.x >= 0) {
               
                this.weapon.x = this.weapon.x-10;
            }
    
        },

        moveRight() {
            if (this.tipka === 100 && (this.weapon.x <= this.canvas.width - this.weapon.width)) {
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


            /*
            console.log("Weapon x: ", this.weapon.x, "Weapon y: ", this.weapon.y);
            console.log("Bullet x: ", bulletStartingPointX, "Bullet y: ", bulletStartingPointY);
            console.log("Vrednost tipke: ", this.tipka);
            console.log("Canvas x: ", this.canvas.width, "Canvas y: ", this.canvas.height)
        */
            console.log(this.$store.state.settings);
            
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
            this.sanitizerToBallCollision();
            this.weapontoWallsColission();
            this.draw();
            this.drawSanitizer();
            this.drawWeapon();
            
        },

    


        init() {
    
            this.canvas = document.getElementById("canvas");
            this.ctx = this.canvas.getContext("2d"); 
            this.canvas.width = window.innerWidth / 3 * 2;
            this.canvas.height = window.innerHeight-120;
            this.gravity = this.$store.state.settings.gravity;
            /*
            this.ball = {
                bounce: 0.75, // energy lost on bounce (25%)
                radius: 30,
                x: this.canvas.width / 2,
                y: this.ball.radius,
                velX: (Math.random() * 7 + 5) * (Math.floor(Math.random() * 2) || -1),
                velY: (Math.random() * 7 + 5) * (Math.floor(Math.random() * 2) || -1)
            } */

            

            this.initBalls(this.$store.state.settings.coronaSpawned);
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
                velY: (Math.random() * 1 + 1) * (Math.floor(Math.random() * 2) || -1)
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
                this.$store.state.bullets +=1;
                console.log(this.$store.state.bullets);
                console.log(this.sanitizers);
            }
        
            
        },

        initWeapon() {
            this.weapon.y = this.canvas.height-70;
        },
        drawSanitizer() {
            for (let i = 0; i < this.sanitizers.length; i++) {
                this.ctx.beginPath();
                this.ctx.fillStyle = "lightblue";
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


    weapontoWallsColission() {
        if (this.weapon.x - (this.weapon.width / 2) <= 0) {
            this.weapon.x += 5;
        }
    },
    
    sanitizerToBallCollision() {
        for (let i = 0; i < this.sanitizers.length; i++) {
            for (let j = 0; j < this.balls.length; j++) {
                if (this.ballOverlap(this.sanitizers[i], this.balls[j])) {
                     this.sanitizers.splice(i,1);
                     this.balls.splice(j,1);
                     this.$store.commit('increaseBulletsHit');
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
                    this.$store.commit('increaseBulletsMiss');
                }
            }

            
       },

       resetData() {
        this.$store.commit('resetLiveStats');
       },

       pushData() {

           let scoreID = Math.floor(Math.random() * 10000);

           let current = new Date();
           let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
           let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
           let dateTime = cDate + ' ' + cTime;


            let all = this.$store.state.bullets;
            let missed = this.$store.state.bulletsMiss;
            let hit = this.$store.state.bulletsHit;
            let ratio = hit * 100 / all; 
            ratio = ratio.toPrecision(2);




           axios.post('http://localhost:3000/score', {
               id: scoreID,
               datePlayed: dateTime,
               hitRatio: ratio,
           })
           .then (function (response) {
               console.log(response)
           })
           .catch(function (error) {
               console.log(error);
           })
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

    }, 

    

    unmounted() {
        this.requestID = false;
        this.pushData();
        this.resetData();
    },
    
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

    .Content {
        display: flex;
        flex-direction: row;
    }


    .stats {
        background: gray;
        width: 100%;
    }
</style>