<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :isChecked="isSelectAll" @click.native="allClick" />
      <span>全选</span>
    </div>

    <div class="totalPrice">
      合计：{{totalPrice}}
    </div>

    <div class="calculate">
      去计算:{{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from '@/components/content/checkButton/CheckButton'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      //价格汇总
      totalPrice() {
        return "￥" + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          //reduce意思是上一次回调的值，也就是上一次价格*数量的值
          return preValue + item.price * item.count
        }, 0)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        //购物车没有商品的情况下也不让它选中
        if (this.cartList.length === 0) return false
        return !(this.cartList.filter(item => !item.checked).length)
      }
    },
    methods: {
      allClick() {
        // console.log('------------')
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        }else{
          this.cartList.forEach(item => item.checked = true)
        }
      }
    },
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    /* border: 1px solid red; */
    position: relative;
    display: flex;
  }

  .check-content {
    display: flex;
    /* align-items: center; */
    position: relative;
    top: 6px;
    padding: 3px;
  }

  .check-button {
    width: 20px;
    height: 20px;
  }

  .totalPrice {
    line-height: 40px;
  }

  .calculate {
    /* border: 1px solid red; */
    background-color: red;
    line-height: 30px;
    margin-left: 100px;
    padding: 5px;
    color: white;
    font-size: 13px;

  }
</style>