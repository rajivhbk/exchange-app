<template>
  <div class="card-header">
    <div class="card-header__left">
      <div class="title">{{title}}</div>
      <b-form-select
        :value="currency"
        :value-field="currency"
        :options="currencyOptions"
        @change="oncurrencychange"
      ></b-form-select>
    </div>
    <div class="card-header__right">
      <b-form-input type="number" :value="value" placeholder="Enter value" @change="onvaluechange"></b-form-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "card-header",
  props: {
    title: {
      type: String,
      required: true,
      default: "United States Dollar"
    },
    currency: {
      type: String
    },
    currencyOptions: {
      type: Array
    },
    value: {
      type: Number
    },
    onvaluechange: {
      type: Function,
      required: true
    },
    oncurrencychange: {
      type: Function,
      required: true
    }
  }
};
</script>
<style>
.card-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.card-header__left {
  flex: 1 0 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 20px 0 5px;
}
.card-header__left .title {
  padding-left: 10px;
}
.card-header__right {
  flex: 1 0 20%;
  align-self: flex-end;
}
</style>
