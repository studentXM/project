<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg" alt="" :class="{check:isChecked}">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    border: 1px solid #aaa;
  }

  .check {
    border-radius: 50%;
    border-color: red;
    background-color: red;
  }
</style>