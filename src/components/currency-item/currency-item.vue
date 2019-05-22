<template>
  <div class="currency-item">
    <b-card no-body>
      <b-row no-gutters>
        <b-col sm="10" class="currency-item__detail">
          <b-row>
            <b-col sm="12">
              <b-row class="text-left">
                <b-col sm="6">{{ currency.abbreviation }}</b-col>
                <b-col sm="6" class="text-right">{{ convertCurrency(base_amount, rate) }}</b-col>
              </b-row>
            </b-col>
            <b-col sm="12" class="text-left">{{ currency.currency }}</b-col>
            <b-col
              sm="12"
              class="text-left"
            >1 {{ base_currency }} = {{ currency.abbreviation }} {{ rate.toFixed(2) }}</b-col>
          </b-row>
        </b-col>
        <b-col sm="2" class="currency-item__actions">
          <span class="currency-item__actions-delete" @click="removeCurrency(currency.abbreviation)">(-)</span>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<script>
export default {
  name: "currency-item",
  props: {
    currency: {
      type: Object
    },
    base_currency: {
      type: String
    },
    base_amount: {
      type: Number
    },
    rate: {
      type: Number
    }
  },
  methods: {
    convertCurrency: function(amount, rate) {
      return (amount * rate).toFixed(2);
    },
    removeCurrency: function(currency) {
        this.$emit('removeCurrency', currency);
    }
  }
};
</script>
<style>
.currency-item {
  padding: 10px 0;
}
.currency-item__actions {
  border-left: 1px solid rgba(0, 0, 0, 0.125);
}
.currency-item__detail {
  padding: 10px !important;
}
.currency-item__actions {
  display: flex;
  justify-content: center;
  align-items: center;
}
.currency-item__actions-delete {
    cursor: pointer;
}
</style>


