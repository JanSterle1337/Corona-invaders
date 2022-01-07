<template>
    <div class="user-stats">
        <h1>User stats:</h1>
        <div class="content">
            <div class="table-outer-wrapper">
                <table>
                    <tr class="header-tr">
                        <td>ID</td>
                        <td>Date</td>
                        <td>Hit ratio</td>
                    </tr>

                    <tr v-for="game in this.stats" :key ="game">
                        <td v-for="stat in game" :key ="stat">
                            {{ stat }}
                        </td>
                    </tr>
                </table>
            </div>
            <div class="graph-outer-wrapper">
                <div class="graph-wrapper">
                    <line-chart 
                    :data="graphData" 
                    suffix="%"
                    xtitle="id"
                    ytitle="hit ratio"
                    :colors="['#1B58FF', '#1B58FF']"
                    :discrete="false"
            
                    ></line-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'UserStats',
    components: {},
    data() {
        return {
            stats: [],
            graphData: [
                
            ],
        }
    },

    methods: {
       neki() {
           
           
           for(let i = 0; i < this.stats.length; i++) {
             this.graphData[i] = [i,parseInt(this.stats[i].hitRatio)];
           }

           console.log("GraphData: ", this.graphData);
       },
    },
 

   
    async created() {
        /*
        console.log("created");
        const response = await axios.get("http://localhost:3000/score");
        this.stats = response.data;
        

        for(let i = 0; i < this.stats.length; i++) {
             this.graphData[i] = [i,parseInt(this.stats[i].hitRatio)];
           }

           console.log("GraphData: ", this.graphData);
           */ 

        this.graphData = await this.$store.dispatch('getData');
        console.log("from created: ", this.graphData);
        this.stats = this.$store.state.stats;
    }
}
</script>

<style>

    table {
        border: 2px solid gray;
        border-collapse: collapse;
        width: 60%;
        height: 100%;
    
    }

    tr {
         border: 1px solid gray;
         border-collapse: collapse;
         
    }

    td {
         border: 1px solid gray;
         border-collapse: collapse;
         padding: 8px;
         font-size: 18px;
    
    }

    .header-tr {
        height: 60px;
        font-size: 25px;
        font-weight: bold;
        background: rgb(34, 148, 255);
    }

    .graph-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        justify-items: center;
        width: 90%;
    }

    .graph-outer-wrapper {
        display: flex; 
        justify-content: center;
        width: 50%;
    }


    .content {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-top: 30px;
    }

    .table-outer-wrapper {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
</style>