<template>
  <b-container>
    <b-card style="width: 40%;">
      <template v-slot:header>
        <card-header
          :title="getCurrencyDetails(base_currency)['currency']"
          :currency="base_currency"
          :value="base_amount"
          :currencyOptions="supported_currencies"
          :onvaluechange="baseAmountChanged"
          :oncurrencychange="baseCurrencyChanged"
        ></card-header>
      </template>
      <b-row>
        <b-col>
          <currency-item
            v-for="(rate, key, index) in rates"
            :key="rate + index"
            :currency="getCurrencyDetails(key)"
            :base_currency="base_currency"
            :base_amount="base_amount"
            :rate="rate"
            @removeCurrency="removeCurrency"
          ></currency-item>
          <div class="currency-item__action">
            <b-button
              v-if="!showAddCurrency"
              @click="toggleAddCurrency"
              class="currency-item__action-add"
              href="#"
            >(+) Add More Currencies</b-button>
            <div v-if="showAddCurrency" class="currency-item__action-add-form">
              <b-form-select
                class="currency-item__action-add-select"
                v-model="selectedCurrencyToAdd"
                :options="options"
              ></b-form-select>
              <b-button
                class="currency-item__action-add-submit"
                @click="addCurrency(selectedCurrencyToAdd)"
                href="#"
              >submit</b-button>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import { currencies } from "@/currencies";
import cardHeader from "@/components/card-header/card-header";
import currencyItem from "@/components/currency-item/currency-item";
import { mapState } from "vuex";

export default {
  name: "home",
  data: function() {
    return {
      showAddCurrency: false,
      selectedCurrencyToAdd: ""
    };
  },
  created: function() {
    this.$store.dispatch("getRates");
  },
  components: {
    cardHeader,
    currencyItem
  },
  computed: {
    options: () => currencies.map(currency => currency.abbreviation),
    ...mapState({
      rates: state => state.rates,
      base_currency: state => state.base_currency,
      base_amount: state => state.base_amount,
      supported_currencies: state => state.supported_currencies
    })
  },
  methods: {
    toggleAddCurrency: function() {
      this.showAddCurrency = !this.showAddCurrency;
    },
    getCurrencyDetails: function(abr) {
      return currencies.filter(currency => currency.abbreviation == abr)[0];
    },
    baseAmountChanged: function(value) {
      this.$store.commit("updateBaseAmount", +value);
    },
    baseCurrencyChanged: function(currency) {
      this.$store.commit("updateBaseCurrency", currency);
      this.$store.dispatch("getRates");
    },
    removeCurrency: function(currency) {
      this.$store.commit("removeCurrency", currency);
      this.$store.dispatch("getRates");
    },
    addCurrency: function(currency) {
      if (currency) {
        this.$store.commit("addCurrency", currency);
        this.$store.dispatch("getRates");
        this.selectedCurrencyToAdd = "";
        this.showAddCurrency = false;
      }
      return;
    }
  }
};
</script>
<style>
ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.currency-item__action-add {
  width: 100%;
}
.currency-item__action-add-form {
  display: flex;
}
.currency-item__action-add-select {
  flex: 2 1 1;
}
.currency-item__action-add-submit {
  flex: 1 1 1;
  margin-left: 10px;
}
</style>
