<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" 
                :key="item.index" 
                class="tab-control-item" 
                :class="{active:index===currentIndex}"
                @click="itemClick(index)">
            <span>
                {{item}}
            </span>
        </div>
    </div>
    
</template>
<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            currentIndex:0
        }
    },
    methods: {
        itemClick(index){
             this.currentIndex = index
             //子组件点击发送到父组件
             this.$emit('tabClick',index)
        }
    },
}
</script>
<style scoped>
    .tab-control{
        display: flex;
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        background-color: #fff;
    }
    .tab-control-item{
        flex: 1;
        height: 44px;
        line-height: 44px;
    }
    .active{
        color: var(--color-high-text);
    }
    .active span{
        
        border-bottom: 3px solid var(--color-high-text);
    }
    .tab-control-item span{
        padding: 5px;
    }

</style>