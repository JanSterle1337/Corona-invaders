<template>
  <div class="corona-stats">
    <div class="params">
        Nc ni tuki kr me je nejki zajebavou slo api za korwno
        <column-chart :data="specificData">
        
        </column-chart>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'CoronaStats',
    components: {},
    data() {
      sloData: [];
      Slovenia: []
      specificData: [
        ['ce',0],
        ['foreign',0],
        ['kk',0],
        ['kp',0],
        ['kr',0],
        ['slj',0],
      ]
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
      /*
      this.countryData = await this.$store.dispatch('getCoronaData');
      this.coronaData = this.$store.state.coronaData.dates; //basiclly ceu object

      console.log("Corona data::: ", this.coronaData['2022-01-07']); 
      console.log("Specificna: ", this.coronaData['2022-01-07'].countries.Slovenia);
      let date = "";
      for(let propertyName in this.coronaData) {
        date = propertyName;
      }

       this.countryData = this.coronaData[date];
*/    this.sloData = await this.$store.dispatch('getSloData');
      console.log(this.sloData);
      for (let i = 0; i < this.sloData.length-2; i++) {
        if (i+1 === this.sloData.length-2) {
           this.Slovenia = this.sloData[i];
        }
      }

  
      this.specificData[0][1] = this.Slovenia.statePerRegion.ce;
      this.specificData[1][1] = this.Slovenia.statePerRegion.foreign;
      this.specificData[2][1] = this.Slovenia.statePerRegion.kk;
      this.specificData[3][1] = this.Slovenia.statePerRegion.kp;
      this.specificData[4][1] = this.Slovenia.statePerRegion.kr;
      this.specificData[5][1] = this.Slovenia.statePerRegion.lj;
      
    }

}
</script>

<style>

</style>