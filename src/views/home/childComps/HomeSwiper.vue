<template>
    <swiper>
        <swiper-item v-for="(item,index) in banners" :key="item.index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>
        </swiper-item>
    </swiper>
</template>
<script>
    import { Swiper, SwiperItem } from '@/components/common/swiper'
    export default {
        name: 'HomeSwiper',
        props:{
            banners:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data() {
            return {
                isLoad:false //记录是否已经发出去一次事件
            }
        },
        components:{
            Swiper,
            SwiperItem,
        },
        methods: {
            imageLoad(){
                if(!this.isLoad) 
                    this.$emit('swipperImageLoad') //首次触发事件
                    this.isLoad=true   //发出后立刻true，下次发的时候就不会触发了
            }
        },
    }
</script>
<style>

</style>