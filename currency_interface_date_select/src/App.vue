<template>
  <div>
    <h1>Input dates</h1>
    <div>
    <select v-model="dateStart[0]" @change="dateStartYear">
      <option v-for=" year in dateRange[0]" v-bind:key="year" >{{ year }}</option>
    </select>
    <select v-model="dateStart[1]" @change="dateStartMonth">
      <option v-for=" month in dateRange[1]" v-bind:key="month" >{{ month }}</option>
    </select>
    <select v-model="dateStart[2]" @change="dateStartDay">
    <option v-for=" day in dateRange[2]" v-bind:key="day" >{{ day }}</option>
    </select>
    </div>
    <div>
    <select v-model="dateEnd[0]" @change="dateEndYear">
      <option v-for=" year in dateRange[0]" v-bind:key="year" >{{ year }}</option>
    </select>
    <select v-model="dateEnd[1]" @change="dateEndMonth">
      <option v-for=" month in dateRange[1]" v-bind:key="month" >{{ month }}</option>
    </select>
    <select v-model="dateEnd[2]" @change="dateEndDay">
      <option v-for=" day in dateRange[2]" v-bind:key="day" >{{ day }}</option>
    </select>
    </div>
    <div>
    <select v-model="currencyName" @change="changeName">
      <option value="" hidden >Currency symbol</option>
      <option v-for="curr in currency.currency" v-bind:key="curr" >{{ curr.SymbolName }}</option>
    </select>
    </div>
    <button class="btn"
            @click="getCurrencyRate"
    >Get currency rate</button>
    <p>Rate on {{ dateStart.join('-') }}: {{ currencyRate.dateStart }}</p>
    <p>Rate on {{ dateEnd.join('-') }}: {{ currencyRate.dateEnd }}</p>
    <p>Rate change: {{ currencyRate.change }}</p>
  </div>
</template>

<script>
import { generatedate, generateSequence } from './generateDate'
import axios from 'axios'
export default {
  data: function () {
    let day1
    let month1
    let year1
    let year2
    let month2
    let day2
    return {
      currency: '',
      currencyRate: '',
      currencyName: '',
      dateStart: [year1, month1, day1],
      dateEnd: [year2, month2, day2],
      errors: '',
      dateRange: [[...generatedate(1993, 2021)],
        [...generateSequence(1, 12)],
        [...generateSequence(1, 31)]]
    }
  },
  created: function () {
    var url1 = 'http://127.0.0.1:5000/api/v1.0/availabeCurrency'
    axios.get(url1)
      .then(response => {
        this.currency = response.data
        console.log(response)
      })
  },
  methods: {
    getCurrencyRate () {
      var url = 'http://127.0.0.1:5000/api/v1.0/get_range?date_start=' + this.dateStart.join('-') + '&date_end=' + this.dateEnd.join('-') + '&currency_symbol=' + this.currencyName
      axios.get(url)
        .then(response => {
          this.currencyRate = response.data
          console.log(response)
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    changeName (event) {
      this.$emit('update: currencyName', event)
    },
    dateStartYear (event) {
      this.$emit('update: year1', event)
    },
    dateStartMonth (event) {
      this.$emit('update: month1', event)
    },
    dateStartDay (event) {
      this.$emit('update: day1', event)
    },
    dateEndYear (event) {
      this.$emit('update: year2', event)
    },
    dateEndMonth (event) {
      this.$emit('update: month2', event)
    },
    dateEndDay (event) {
      this.$emit('update: day2', event)
    }

  }
}
</script>

<style>
* {
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  box-sizing: border-box;
}
.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: gray;
  color: black;
  border: 1px solid black;
}
div {
  margin: 0 auto;
  display: block;
  text-align: center;
}
select {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}

</style>
