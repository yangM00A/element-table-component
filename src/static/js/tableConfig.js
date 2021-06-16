'use strict'


// 查询按钮集合(这个是查询旁边的按钮)sourcesArray
export const queryBtnArray = [{
    label: "query",
    value: "查询",
    icon: "el-icon-search",
    type: "primary",
  },
  {
    label: "add",
    value: "新增",
    icon: "el-icon-plus",
    type: "primary",
  },
]

// 所有操作按钮集合 (operateBtnArray)
export const tableBtnArray = [{
    label: "view",
    value: "详情",
    method: "viewInfo",
    icon: 'el-icon-info'
  },
  {
    label: "edit",
    value: "编辑",
    icon: 'el-icon-edit'
  },
  {
    label: "disable",
    value: "禁用",
    btnType: 'danger',
    icon: 'el-icon-warning'
  },
  {
    label: "delete",
    value: "删除",
    icon: 'el-icon-delete'
  },
]

// 页面元素配置
export const elementConfig = {
  //element 表格，按钮大小配置  medium | small | mini
  size: 'mini',
  buttonSize: 'mini',
  // echarts 字体大小配置
  echartsCfg: {
    fontSize_h1: 18,
    fontSize_h2: 14,
    fontSize_h3: 12
  }
}
