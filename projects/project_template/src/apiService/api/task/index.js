import request from '@/utils/request';
    
/**
 *  必填:true  taskAdd  描述:任务参数
 **/
export function taskPost(data) {
    return request({
        url: '/task',
        method: 'post',
        data
    })
}        

/**
 *  必填:false  page:integer  描述:页码（从1开始）
 *  必填:false  size:integer  描述:每页条数
 *  必填:true  openPage:boolean  描述:是否开启分页(默认不开启)
 **/
export function getList(query) {
    return request({
        url: '/task/list',
        method: 'get',
        params: query
    })
}        

/**
 *  必填:true  taskId:integer  描述:任务ID
 **/
export function getStart(query) {
    return request({
        url: '/task/start',
        method: 'get',
        params: query
    })
}        

/**
 *  必填:true  taskId:integer  描述:任务ID
 **/
export function getStop(query) {
    return request({
        url: '/task/stop',
        method: 'get',
        params: query
    })
}        

/**
 *  必填:true  taskEdit  描述:修改任务参数
 **/
export function putUpdate(data) {
    return request({
        url: '/task/update',
        method: 'put',
        data
    })
}        

/**
 *  必填:true  taskId:integer  描述:任务ID
 **/
export function deleteByTaskId(data) {
    return request({
        url: `/task/${data.taskId}`,
        method: 'delete',
        data
    })
}        

export default {
  taskPost,
  getList,
  getStart,
  getStop,
  putUpdate,
  deleteByTaskId,
};
