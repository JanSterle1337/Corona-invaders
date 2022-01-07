import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {

    updateChart: true,
    bullets: 0,
    gameOver: false,
    bulletsHit: 0,
    bulletsMiss: 0,
   
    settings: {
      coronaSpawned: 10,
      gravity: 0.10,
      sanitizerSpeed: 5,
    },
    stats: [],
    graphData: [],

    coronaData: [],
  },

  mutations: {
    increaseBulletsHit(state) {
      state.bulletsHit += 1;
      state.updateChart = false;
    },

    increaseBulletsMiss(state) {
      state.bulletsMiss += 1;
      state.updateChart = true;
    },

    updateSettings(state,data) {
      state.settings.coronaSpawned = data.enemies;
      state.settings.gravity = data.gravity;
      state.settings.sanitizerSpeed = data.sanitizerSpeed;
      console.log("Iz mutacije",data);
      console.log("Iz stata: ", state.settings);
      
    },

    resetLiveStats(state) {
      this.state.bullets = 0;
      this.state.bulletsHit = 0;
      this.state.bulletsMiss = 0;
      console.log("Iz reset live statov");
    }
    
    

  },

  actions: {
    async getData() {
      const response = await axios.get("http://localhost:3000/score");
        this.state.stats = response.data;
        

        for(let i = 0; i < this.state.stats.length; i++) {
             this.state.graphData[i] = [i,parseInt(this.state.stats[i].hitRatio)];
           }

           console.log("GraphData: ", this.state.graphData);
           return this.state.graphData;
    },

    async getCoronaData() {
      const response = await axios.get("https://api.covid19tracking.narrativa.com/api/2022-01-07");
      this.state.coronaData = response.data;

      return this.state.coronaData;
    }
  },

  modules: {

  }
})
