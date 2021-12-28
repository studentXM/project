<template>
  <div id="home">
    <!-- <h2>首页</h2> -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"
      class="tabControl" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contnetScroll" :pull-up-load="true"
      @loadMore="loadMore">
      <home-swiper :banners="banners" @swipperImageLoad="swipperImageLoad" />
      <recommen-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="goods[currentType].list" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />

  </div>
</template>
<script>
  import HomeSwiper from '@/views/home/childComps/HomeSwiper'
  import RecommenView from '@/views/home/childComps/RecommenView'
  import FeatureView from '@/views/home/childComps/FeatureView'

  import NavBar from '@/components/common/navbar/NavBar'
  import TabControl from '@/components/content/tabControl/TabControl'
  import GoodsList from '@/components/content/goods/GoodsList'
  import Scroll from '@/components/common/scroll/Scroll'
  import BackTop from '@/components/content/backTop/BackTop'

  import {
    debounce
  } from '@/common/utils.js'

  import {
    getHomeMulidata,
    getHomeGoods
  } from '@/network/home.js'

  export default {
    name: 'Home',
    data() {
      return {
        // result: null
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0,
            list: []
          }, //流行
          'new': {
            page: 0,
            list: []
          }, //新款
          'sell': {
            page: 0,
            list: []
          }, //精选
        },
        currentType: 'pop', //首页首次请求的是pop数据
        isShowBackTop: false, //是否显示回到顶部的图标
        tabOffsetTop: 0, //保存 tabcontrol offsetTop的值，用它来判断什么时候执行的吸顶效果
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    components: {
      HomeSwiper,
      RecommenView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      //Hook函数中一般只做调用，不做业务逻辑处理
      this.getHomeMulidata()
      //请求商品数据(流行)
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      //监听item里面图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 500) //这里的返回值就是防抖函数
      this.$bus.$on('homeItemImage', () => {
        // this.$refs.scroll.refresh()
        refresh() //在这里执行新生成的函数，而这个函数并不会被频繁的调用
      })
    },
    destroyed() {
      console.log('Home destroyed')
    },
    activated() {
      // this.$refs.scroll.getScroll()
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      //离开时保存Home positionY的位置
      this.saveY = this.$refs.scroll.getScrollY()

    },
    methods: {
      /**
       * 事件监听相关的函数
       * 
       */
      tabClick(index) {
        console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
        }

        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index

      },
      backClick() {
        //回到顶部
        // this.$refs.scroll.scroll.scrollTo(0,0,500);
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contnetScroll(position) {
        // console.log(position)
        this.isShowBackTop = (-position.y) > 1000 ? true : false

        this.isTabFixed = (-position.y) > this.tabOffsetTop ? true : false
      },
      loadMore() {
        //上拉加载更多
        // console.log('上拉加载更多')
        this.getHomeGoods(this.currentType)

        // console.log(this.getHomeGoods(this.currentType))
      },
      swipperImageLoad() {
        //console.log(this.$refs.tabControl.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop

      },
      /**
       * 网络请求相关的函数
       */
      //这里才是处理业务逻辑的地方
      getHomeMulidata() {
        getHomeMulidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          //扩展运算符... 先将list数据取出来，然后一个个push到一个新数组
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //完成下拉加载更多
          this.$refs.scroll.finishPullUp()

        })
      }
    },
  }
</script>
<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /* position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 9; */
  }

  .content {
    /* height: 300px; */
    /* height: calc(100% - 93px); */
    overflow: hidden;
    /* margin-top: 44px; */
    position: absolute;
    right: 0px;
    left: 0px;
    bottom: 49px;
    top: 44px;
  }

  .tabControl {
    position: relative;
    z-index: 9;
  }
</style>