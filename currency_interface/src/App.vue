<template>
  <div>
    <form @submit.prevent>
      <h4>Input dates</h4>
      <input v-bind:value="dateStart"
             @input="dateStart = $event.target.value"
             class="datein"
             type="text"
             placeholder="Start date YYYY-MM-DD"
      >
      <input v-bind:value="dateEnd"
             @input="dateEnd = $event.target.value"
             class="datein"
             type="text"
             placeholder="End date YYYY-MM-DD"
      >
      <button class="btn"
              @click="getCurrencyRate"
      >Get currency rate</button>
    </form>
    <select v-model="currencyName" @change="changeName">
    <option v-for="curr in currency.currency" v-bind:key="curr" >{{ curr.SymbolName }}</option>
    </select>
    <p>Rate on the start date: {{ currencyRate.dateStart }}</p>
    <p>Rate on the end date: {{ currencyRate.dateEnd }}</p>
    <p>Rate change: {{ currencyRate.change }}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      currency: '',
      currencyRate: '',
      currencyName: '',
      dateStart: '',
      dateEnd: '',
      errors: ''
    }
  },
  created () {
    var url1 = 'http://127.0.0.1:5000/api/v1.0/availabeCurrency'
    axios.get(url1)
      .then(response => {
        this.currency = response.data
        console.log(response)
      })
  },
  methods: {
    getCurrencyRate () {
      var url = 'http://127.0.0.1:5000/api/v1.0/get_range?date_start=' + this.dateStart + '&date_end=' + this.dateEnd + '&currency_symbol=' + this.currencyName
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
    }

  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
form {
  display: flex;
  flex-direction: column;
}
.datein{
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 10px;
}
.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>
