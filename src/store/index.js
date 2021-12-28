import { createStore } from 'vuex'

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
    }

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
      
    } 
  },

  actions: {
    
  },

  modules: {

  }
})
