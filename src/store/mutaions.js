export default {
    addCounter(state, payload) {
        payload.count += 1
    },
    addToCart(state, payload) {
        payload.count = 1
        //商品在添加到购物车的时候默认选中
        payload.checked = true
        state.cartList.push(payload)
    }
}
