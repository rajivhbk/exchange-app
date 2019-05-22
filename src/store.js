import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { base_url } from "@/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rates: {},
    base_currency: "USD",
    base_amount: 10,
    supported_currencies: [
      "USD",
      "CAD",
      "IDR",
      "GBP",
      "CHF",
      "SGD",
      "INR",
      "MYR",
      "JPY",
      "KRW"
    ]
  },
  mutations: {
    setRates: function(state, rates) {
      state.rates = Object.assign({}, rates);
    },
    removeCurrency: function(state, currency) {
      let index = state.supported_currencies.indexOf(currency);
      let supported_currencies = state.supported_currencies.slice();
      supported_currencies.splice(index, 1);
      state.supported_currencies = supported_currencies;
    },
    addCurrency: function(state, currency) {
      state.supported_currencies.push(currency);
    },
    updateBaseAmount: function(state, value) {
      state.base_amount = value;
    },
    updateBaseCurrency: function(state, currency) {
      state.base_currency = currency;
    }
  },
  actions: {
    getRates: function({ commit, state }) {
      let currencies = state.supported_currencies
        .filter(currency => currency !== state.base_currency)
        .join(",");
      const url = `${base_url}?base=${
        state.base_currency
      }&&symbols=${currencies}`;
      if (state.supported_currencies.length > 1) {
        axios
          .get(url)
          .then(response => {
            commit("setRates", response.data.rates);
          })
          .catch(() => {
            // handle error
            return;
          });
      } else {
        commit("setRates", {});
      }
    }
  }
});
