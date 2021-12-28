import { request } from './request.js'
export function getDetail(iid) {
    return request({
        url: 'http://152.136.185.210:7878/api/hy66/detail',
        params: {
            iid
        }
    })
}

export function getRecommend() {
    return request({
        url: 'http://152.136.185.210:7878/api/hy66/recommend'
    })
}

//当返回的接口数据处理再不同的字段时，可以先封装一个函数类，这也是面向对象的一个开发
export class Goods {
    //函数构造器
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.image=itemInfo.image
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns,
        this.services = services
        this.realPrice = itemInfo.lowNowPrice


    }
}

export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.Fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods

    }
}

export class GoodsParam {
    constructor(info, rule) {
        this.Image = info.images ? info.images[0] : '';
        this.info = info.set;
        this.sizes = rule.tables
    }
}
