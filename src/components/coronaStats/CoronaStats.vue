<template>
  <div class="corona-stats">
    <h1>Statistike za dan:  {{ todayDate }}</h1>
    <div class="params">
      <div class="column-chart-wrapper">
        <column-chart :data="[['active',active],['closedToDate', closedToDate],['confirmedToDate',confirmedToDate],['confirmedToday',confirmedToday]]"
                       width="500px" height="500px">
        </column-chart>
      </div>  
      <div class="pie-chart-wrapper">
        <h2>tested positive percantage: {{ positivePercantage }} %</h2>
        <pie-chart
        :data="[['tested',tested],['testedPositive',testedPositive]]" class="pie">
        </pie-chart>
       </div>
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
        tested: 0,
        testedPositive: 0,
      }
     
    },

    computed: {
      positivePercantage() {
        return (this.testedPositive * 100 /  this.tested).toFixed(2);
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

      this.tested = this.sloData[this.sloData.length-2].performedTests;
      this.testedPositive = this.sloData[this.sloData.length-2].positiveTests;
      
      
    }

}
</script>

<style>

  .params {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }

  .pie-chart-wrapper {
    margin: 20px;
  }

  .column-chart-wrapper {
    margin: 20px;
  }

 
</style>