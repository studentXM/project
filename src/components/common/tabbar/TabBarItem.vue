<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'TabBarItem',
        props: {
            path: String,
            activeColor: {
                type: String,
                default: 'red'
            }
        },
        data() {
            return {
            }
        },
        computed: {
            isActive() {
                return this.$route.path.includes(this.path) //当前活跃的路由是否包含传递过来的path 

            },
            activeStyle() {
                return this.isActive ? { color: this.activeColor } : {}
            }
        },
        methods: {
            itemClick() {
                this.$router.replace('/location').catch(err => { console.log(err) })
                this.$router.replace(this.path)
            }
        },
    }
</script>
<style>
    .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px;
        /* line-height: 49px; */
        font-size: 13px;
    }

    .tab-bar-item img {
        width: 24px;
        height: 24px;
        margin-top: 3px;
        vertical-align: middle;
        margin-top: 2px;
    }

    /* .active{
        color: red;
    } */
</style>