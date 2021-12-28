<template>
    <div class="recommends">
        <div v-for="(item,index) in recommends" :key="item.index" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RecommenView',
        props: {
            recommends: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {

            }
        },
    }
</script>
<style>
    .recommends {
        display: flex;
        text-align: center;
        margin-top: 3px;
        font-size: 12px;
        padding: 10px 0px 20px;
        border-bottom: 8px solid #eee;
    }

    .recommend-item {
        flex: 1;
    }

    .recommend-item img {
        width: 68px;
        height: 68px;
    }
</style>