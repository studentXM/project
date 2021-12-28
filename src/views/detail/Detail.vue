<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navBar" />
    <scroll class="detail-content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />

    <detail-bottom-bar @addCart="addCart" />

  </div>
</template>
<script>
  import {
    getDetail,
    Goods,
    Shop,
    GoodsParam,
    getRecommend
  } from '@/network/detail.js'

  import DetailNavBar from '@/views/detail/childComps/DetailNavBar'
  import DetailSwiper from '@/views/detail/childComps/DetailSwiper'
  import DetailBaseInfo from '@/views/detail/childComps/DetailBaseInfo'
  import DetailShopInfo from '@/views/detail/childComps/DetailShopInfo'
  import DetailGoodsInfo from '@/views/detail/childComps/DetailGoodsInfo'
  import DetailParamInfo from '@/views/detail/childComps/DetailParamInfo'
  import DetailCommentInfo from '@/views/detail/childComps/DetailCommentInfo'
  import DetailBottomBar from '@/views/detail/childComps/DetailBottomBar'

  import Scroll from '@/components/common/scroll/Scroll'
  import GoodsList from '@/components/content/goods/GoodsList'
  import BackTop from '@/components/content/backTop/BackTop'
  // import GoodsList from '@/components/content/goods/GoodsList'

  import {
    debounce
  } from '@/common/utils.js'

  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTop: null,
        currentIndex: 0,
        isShowBackTop: false, //是否显示回到顶部的图标
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop
    },
    created() {
      this.getDetail();
      this.getRecommend();
      this.getThemeTop = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs)
      }, 500)
    },
    //这里虽然有数据了但是渲染到每个DOM上是需要时间的，不会立马就有数据
    mounted() {

    },
    //updated是更新渲染完成之后去调用
    updated() {

    },
    methods: {
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 600)
      },
      getDetail() {
        //根据iid请求详情的数据
        //保存iid
        this.iid = this.$route.params.iid
        getDetail(this.iid).then(res => {
          // console.log(res)
          //1.获取数据
          const data = res.result

          //2.轮播图信息
          this.topImages = data.itemInfo.topImages

          //3.获取商品信息数据
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          //4.获取店铺信息数据
          this.shop = new Shop(data.shopInfo)

          //5.保存商品的详情数据
          this.detailInfo = data.detailInfo
          // console.log(this.detailInfo)

          //6.保存商品参数的数据
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          //7.保存商品评论的数据
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }

          //$nextClick 将数据渲染到DOM后，将会调用一个￥nextClick的函数，这个函数要求我们传递一个回调函数作为参数
          this.$nextTick(() => {
            //但是这里图片还未被完全渲染出来（目前获取的offsetTop是不包含图片的）
            //一般offsetTop值不对的时候都是图片造成的问题
            // this.themeTopYs = []
            // this.themeTopYs.push(0)
            // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            // console.log(this.themeTopYs)
          })
        })
      },
      getRecommend() {
        //请求详情数据
        getRecommend().then((res) => {
          // console.log(res)
          this.recommends = res.data.list;
        })
      },
      imageLoad() {
        this.$refs.scroll.refresh();
        this.getThemeTop();

      },
      titleClick(index) {
        // console.log(index)
        //实际上这里的themeTopYs就是对应组件的offsetTop的值
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      contentScroll(position) {

        //[0, 12876, 13636, 13832]
        //0-12876 index=0
        //12876-13636 index=1
        //13636-13832 index=2
        //超过13832 index=3
        const positionY = -position.y
        let length = this.themeTopYs.length;

        // console.log(positionY)
        for (let i = 0; i < length - 1; i++) {

          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i;
            this.$refs.navBar.currentIndex = this.currentIndex
          }
        }
        this.isShowBackTop = (-position.y) > 1000 ? true : false
      },
      addCart() {
        //获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        //添加到购物车(通过vuex去管理)
        // console.log(product)
        // this.$store.commit('addCart',product)

        this.$store.dispatch('addCart', product)

      }
    },
    mounted() {
      const scrollRefersh = debounce(this.$refs.scroll.refresh, 500)
      this.$bus.$on('detailItemImage', () => {
        scrollRefersh()
      })
    },
  }
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .detail-content {
    background-color: #fff;
    height: calc(100% - 44px - 49px);
  }
</style>
