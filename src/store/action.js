export default {
    addCart(context, payload) {
        // let oldProduct = null;
        // if(state.cartList.length>0){}
        //方法1
        //先遍历购物车中本来有的商品
        // for (let item of state.cartList) {
        //     //如果购物车中存在同一个商品，就把商品赋值给新的变量
        //     if (payload.iid == item.iid) {
        //         oldProduct = item;
        //     }
        // }
        //
        // if (oldProduct != null) {
        //     oldProduct.count += 1;
        // } else {
        //     //为空，就把传进来的对象直接push，并赋值一个count=1
        //     payload.count = 1;
        //     state.cartList.push(payload)
        // }

        // let oldProduct = state.cartList.find(function (item) {
        //     return item.iid === payload.iid
        // })
        //查找数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if (oldProduct) {
            // oldProduct.count += 1;
            context.commit('addCounter', oldProduct)
        } else {
            // payload.count = 1;
            // state.cartList.push(payload)
            context.commit('addToCart', payload)
        }
    }
}
