<template>
  <div class="player-settings">
      <form @submit.prevent="updateSettings">
        <div class="row-alignment">
            <p>enemies:</p>
            <input type="number" name="enemies" v-model="settings.enemies">
            
        </div>
        <p class="error" v-if="enemiesError"> {{ errorCheckers[0] }}</p>

        <div class="row-alignment">
            <p>gravity:</p>
            <input type="number" name="gravity" v-model="settings.gravity">
            
        </div>
        <p class="error" v-if="gravityError"> {{ errorCheckers[1] }}</p>

        <div class="row-alignment">
            <p>sanitizer speed:</p>
            <input type="number" name="sanitizerSpeed" v-model="settings.sanitizerSpeed">
            
        </div>
        <p class="error" v-if="sanitizerError"> {{ errorCheckers[2] }}</p>
        <div class="row-alignment">
            <p>Bullets speed:</p>
            <input type="number" name="bulletsSpeed" v-model="settings.bulletsSpeed">
            
        </div>

        <p class="error" v-if="sanitizerError"> {{ errorCheckers[3] }}</p>
        <div class = "column-alignment">
            <button class="confirm">Confirm</button>
            <p class="green" v-if="changesMade">Settings have been changed</p>
        </div>
      </form>
  </div>
</template>

<script>
export default {
    name: 'PlayerSettings',
    data() {
        return {
            settings: {
                 enemies: 0,
                 gravity: 0,
                 sanitizerSpeed: 0,
                 bulletsSpeed: 0,
            },
            errorCheckers: [
                "There must be a least one enemy but less than 20",
                "Gravity must be bigger than 2 but smaller than 25",
                "The sanitizer speed must be bigger than 1 but smaller than 15",
                "The bullets speed must be between -2 and -10"
                ],
            enemiesError: false,
            gravityError: false,
            sanitizerError: false,
            bulletsError: false,
            changesMade: false,
        }
    },

    methods: {
        updateSettings() {

            //erro checks
            if (this.settings.enemies >= 1 && this.settings.enemies <= 20) {
                this.enemiesError = false;
            } else {
                this.enemiesError = true
            }

            if (this.settings.gravity >= 2 && this.settings.gravity <= 25) {
                this.gravityError = false;
            } else {
                this.gravityError = true;
            }

            if (this.settings.sanitizerSpeed >= 1 && this.settings.sanitizerSpeed <= 15) {
                this.sanitizerError = false;
            } else {
                this.sanitizerError = true;
            }

            if (this.settings.bulletsSpeed <= -2 && this.settings.bulletsSpeed >= -10) {
                this.bulletsError = false;
            } else {
                this.bulletsError = true;
            }

            if (this.enemiesError == false && this.gravityError== false && this.sanitizerError == false && this.bulletsError == false) {

                this.settings.gravity = this.settings.gravity / 100;
                this.$store.commit('updateSettings',this.settings);

                this.changesMade = true;
                
            } else {
                this.changesMade = false;
            }
        }
    },

    created() {
        this.settings.enemies = this.$store.state.settings.coronaSpawned;
        this.settings.gravity = this.$store.state.settings.gravity * 100;
        this.settings.sanitizerSpeed = this.$store.state.settings.sanitizerSpeed;
        this.settings.bulletsSpeed = this.$store.state.settings.bulletsSpeed;
        console.log("Enemies: ", this.enemies);
        console.log("Gravity: ", this.gravity);
        console.log("sanitizerSpeed: ", this.sanitizerSpeed);
    }
}
</script>

<style scoped>

    .player-settings {
        display: flex;
        width: 50%;
        background: #EEEEEE;
        height: 50%;
        border-radius: 20px;
        text-align: center;
        padding: 40px;
        font-size: 28px;
        font-weight: bold;
        margin: 10px;
        align-items: center;
        justify-content:space-evenly;
       
    }

    .row-alignment {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    input {
        height: 40px; 
       
        border-radius: 20px;
        outline: none;
        border: 1px solid #F5F5F5;
        text-align: center;
        font-size: 20px;
        width: 150px;
        align-items: center;
        width: 50%;
        align-self: center;
    }

    p {
        align-items: center;
        align-self: center;
        width: 50%;
    }

    .error {
        color: red;
        font-size: 15px;
    }

    .green {
        color: rgb(34, 148, 255);
        font-size: 15px;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .confirm {
        border: 0px;
        outline: none;
        height: 50px;
        width: 120px;
        background: rgb(92, 175, 253);
        border-radius: 20px;
        color: white;
        font-size: 15px;
        font-weight: bold;
        align-self: center;
    }

    .confirm:hover {
        transition: 0.8s;
        background: rgb(34, 148, 255);
        color: #2c3e50;
    }

    .column-alignment {
        display: flex;
        flex-direction: column;
    }

</style>