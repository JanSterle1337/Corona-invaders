<template>
  <div class="corona-stats">
    <div class="params">
      <select>
          <option v-for="country in coronaData" :key ="country.name">
              
          </option>
      </select>
      <button @click="probej">Klikne me</button>

      <column-chart
        :data="[['Sun',32],['Mon',35]]"
      ></column-chart>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'CoronaStats',
    components: {},
    data() {
      coronaData: [];

      countryData: [];
      countrySet: [ ]
    },

    methods: {

      /*
      probej() {
        console.log("helloo");
        let i = 0;
        for(let country in this.coronaData['2022-01-07'].countries) {
          
            if (Object.prototype.hasOwnProperty.call(this.coronaData['2022-01-07'].countries,country)) {
              console.log(country);
              console.log(this.countrySet);
            }
            i++;
        }
      } */
    },

    async created() {
      this.countryData = await this.$store.dispatch('getCoronaData');
      this.coronaData = this.$store.state.coronaData.dates; //basiclly ceu object

      console.log("Corona data::: ", this.coronaData['2022-01-07']); 
      console.log("Specificna: ", this.coronaData['2022-01-07'].countries.Slovenia);
      let date = "";
      for(let propertyName in this.coronaData) {
        date = propertyName;
      }

       this.countryData = this.coronaData[date];
      

    }

}
</script>

<style>

</style>