<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <!-- <h2 slot="center">购物车</h2> -->
      <div slot="center">购物车({{carts}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list />

    <!-- 底部汇总 -->
    <cart-bottom-bar/>
    
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'

  import CartList from '@/views/cart/CartList'
  import CartBottomBar from '@/views/cart/CartBottomBar'

  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters({
        carts: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: white;
    /* font-weight: bold; */
  }
</style>