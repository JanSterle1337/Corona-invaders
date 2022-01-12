<template>
  <div class="corona-stats">
    <div class="params">
      <h1>Statistike za dan:  {{ todayDate }}</h1>
        
        <column-chart :data="[['active',active],['closedToDate', closedToDate],['confirmedToDate',confirmedToDate],['confirmedToday',confirmedToday]]"
                       width="500px" height="500px">
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
      return {
        sloData: [],
        Slovenia: [],
        active: 0,
        closedToDate: 0,
        confirmedToDate: 0,
        confirmedToday: 0,
        isShown: false,
        todayDate: "",
      }
     
    },

    methods: {

      showGraph() {
        this.isShown = !this.isShown;
        console.log(this.isShown);
      }

    },

    async created() {

      console.log(this.specificData);
      this.sloData = await this.$store.dispatch('getSloData');
      let casesData = this.sloData[this.sloData.length-2].cases;
      this.todayDate = this.sloData[this.sloData.length-2].day + ". " + this.sloData[this.sloData.length-2].month   + ". " + this.sloData[this.sloData.length-2].year; 
      console.log(casesData.active);
      this.active = casesData.active;
      this.closedToDate = casesData.closedToDate;
      this.confirmedToDate = casesData.confirmedToDate;
      this.confirmedToday = casesData.confirmedToday;
      
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
       /*
*/  /*  this.sloData = await this.$store.dispatch('getSloData');
      console.log(this.sloData);
      for (let i = 0; i < this.sloData.length-2; i++) {
        if (i+1 === this.sloData.length-2) {
           this.Slovenia = this.sloData[i];
        }
      }

  
      this.specificData[0][0] = this.Slovenia.statePerRegion.ce;
      this.specificData[1][0] = this.Slovenia.statePerRegion.foreign;
      this.specificData[2][0] = this.Slovenia.statePerRegion.kk;
      this.specificData[3][0] = this.Slovenia.statePerRegion.kp;
      this.specificData[4][0] = this.Slovenia.statePerRegion.kr;
      this.specificData[5][0] = this.Slovenia.statePerRegion.lj;
      */
    }

}
</script>

<style>

</style>