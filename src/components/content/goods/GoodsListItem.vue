<template>
  <div class="goods-item" @click="itemClick">
    <!-- <img :src="showImages" alt="" @load="imageLoad"> -->
    <img v-lazy="showImages" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      showImages() {
        //逻辑或，前面没有，取后面
        return this.goodsItem.image || this.goodsItem.show.img

      }
    },
    methods: {
      imageLoad() {
        //监听每一种图片，每加载完成后就刷新一下scrollHeight的滚动高度
        if (this.$route.path.indexOf('/home')) {
          this.$bus.$emit('homeItemImage') //首页监听全局事件
        } else if (this.$route.path.indexOf('/detail')) {
          this.$bus.$emit('detailItemImage') //详情页监听全局事件
        }
        
      },
      itemClick() {
        //跳转到详情页
        this.$router.push('/detail/' + this.goodsItem.iid)
        // this.$router.push({
        //     path:'/detail',
        //     query:{
        //         iid:this.goodsItem.iid //query的方式传递路由参数
        //     }
        // })
      }
    },
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 49%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>