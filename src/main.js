import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//中央事件总线 $bus
Vue.prototype.$bus = new Vue()

//使用图片懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('@/assets/img/common/placeholder.png')  //图片在加载过程中显示的图片

})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
