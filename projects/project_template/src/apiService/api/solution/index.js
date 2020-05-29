import request from '@/utils/request';
    
/**
 *  必填:false  solution  描述:数据方案参数
 **/
export function solutionPost(data) {
    return request({
        url: '/solution',
        method: 'post',
        data
    })
}        

/**
 *  必填:true  solutionEdit  描述:编辑数据方案参数
 **/
export function solutionPut(data) {
    return request({
        url: '/solution',
        method: 'put',
        data
    })
}        

/**
 *  必填:true  freeMarkerFilepath:file  描述:freemarker模板
 **/
export function postCheck(data) {
    return request({
        url: '/solution/check',
        method: 'post',
        data
    })
}        

/**
 *  必填:true  freeMarkerFilepath:file  描述:freemarker模板
 **/
export function postFileUpload(data) {
    return request({
        url: '/solution/fileUpload',
        method: 'post',
        data
    })
}        

/**
 *  必填:false  page:integer  描述:页码（从1开始）
 *  必填:false  size:integer  描述:每页条数
 *  必填:true  openPage:boolean  描述:是否开启分页(默认开启)
 **/
export function getList(query) {
    return request({
        url: '/solution/list',
        method: 'get',
        params: query
    })
}        

/**
 *  必填:true  solutionName:string  描述:方案名称
 **/
export function deleteBySolutionName(data) {
    return request({
        url: `/solution/${data.solutionName}`,
        method: 'delete',
        data
    })
}        

export default {
  solutionPost,
  solutionPut,
  postCheck,
  postFileUpload,
  getList,
  deleteBySolutionName,
};
