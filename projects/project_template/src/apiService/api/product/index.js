import request from '@/utils/request';

/**
 *  必填:true  productDataAdd  描述:数据源参数
 **/
export function productPost(data) {
    return request({
        url: '/product',
        method: 'post',
        data
    })
}

/**
 *  必填:true  productDataEdit  描述:数据源修改参数
 **/
export function productPut(data) {
    return request({
        url: '/product',
        method: 'put',
        data
    })
}

export function getList(query) {
    return request({
        url: '/product/list',
        method: 'get',
        params: query
    })
}

/**
 *  必填:true  productType:string  描述:产品数据来源类型
 **/
export function getShow(query) {
    return request({
        url: '/product/show',
        method: 'get',
        params: query
    })
}

/**
 *  必填:true  productId:integer  描述:产品Id
 **/
export function deleteByProductId(data) {
    return request({
        url: `/product/${data.productId}`,
        method: 'delete',
        data
    })
}

export default {
    productPost,
    productPut,
    getList,
    getShow,
    deleteByProductId,
};