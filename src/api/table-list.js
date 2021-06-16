import http from "@/http";


/**
 * table 查询条件和配置
 * @param {Stirng} tableId 
 * @returns 
 */
export function getTableConfig(tableId) {
  return http.get(`/query/${tableId}`)
}

/**
 * table 分页查询
 * @param {String} tableId 
 * @param {Object} param 
 * @returns 
 */
export const queryPage = (tableId, param) => http.post(`/query/${tableId}`, param)
