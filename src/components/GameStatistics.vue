<template>
    <div class="game-statistics"> 
        <h1>Welcome to analytics section</h1>
        <button @click="toggleUserStats" class="active">show user stats</button>
        <button @click="toggleCoronaStats" class="active">show corona stats</button>
        <UserStats  v-if=" userCompIsOpened" class="UserStats" />
        <br>
        <CoronaStats v-if="coronaCompIsOpened" class="CoronaStats" />
    </div>
</template>

<script>

import UserStats from '../components/userStats/UserStats.vue';
import CoronaStats from '../components/coronaStats/CoronaStats.vue';

export default {
    name: 'GameStatistics',
    components: {
        UserStats, CoronaStats,
    },
    data() {
        return {
            userCompIsOpened: false,
            coronaCompIsOpened: false,
        }
    },
    methods: {
       toggleUserStats() {
           this.userCompIsOpened = !this.userCompIsOpened;
       },

       toggleCoronaStats() {
           this.coronaCompIsOpened = !this.coronaCompIsOpened;
       }
    }
}
</script>

<style>
    
    .active {
        width: 150px;
        height: 50px;
        margin: 20px;
        outline: none;
        background: white;
        border: 2px solid rgb(34, 148, 255);
        border-radius: 25px;
        font-size: 15px;
        font-weight: bold;
        
    }

    .active:hover {
        background: rgb(34, 148, 255);
        transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    }

    .game-statistics {
        height: 100%;
        width: 100%;
        display: flex;
        align-content: center;
        flex-direction: column;
        align-items: center;
    }

    .UserStats {
        width: 100%;
    }

    
</style>