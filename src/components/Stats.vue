<template>
    <div class="stats">
        <div class="header">
            <h2>Live statistics</h2>
        </div>
        <div class="stats-wrapper">
           <p>shot: {{ this.$store.state.bullets }}</p> 
           <p>hit: {{ this.$store.state.bulletsHit }}</p> 
           <p>miss: {{ this.$store.state.bulletsMiss }}</p>
            
        	<h3>Hit ratio: {{ missToHitRatio }} %</h3>


        </div>
        
    </div>
    
</template>

<script>


export default {
    name: 'Stats',
    components: {
        
    },
    data() {
        return {
            chartData: [[1, 100], [2, 70]],
        }
    },
    methods: {
    },
    computed: {
        missToHitRatio: function () {


           let all = this.$store.state.bullets;

            if (all === 0) {
                return 100;
            }

           let missed = this.$store.state.bulletsMiss;
           let hit = this.$store.state.bulletsHit;
           let ratio = hit * 100 / all; 
           ratio = ratio.toPrecision(2);
           return ratio;
       }
    }
   
}
</script>

<style>
     .stats {
         background: #E0E0E0;
         display: flex;
         flex-direction: column;
         align-items: center;
     }
     .header {
         height: 10%;
         font-weight: bold;
         color: #424242;
         display: flex;
         align-content: center;
         align-items: center;
     }

     .stats-wrapper {
         border-radius: 20px;
         background: #FAFAFA;
         border: 1px solid #F5F5F5;
         height: 80%;
         width: 90%;
     }
     
</style>