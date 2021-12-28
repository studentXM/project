import { request } from './request'

export function getHomeMulidata() {
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type,page){
    return request({
        url:'http://152.136.185.210:7878/api/hy66/home/data',
        params:{
            type,
            page
        }
    })
}
