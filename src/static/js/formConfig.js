'use strict'


// 系统定义校验规则
export const formRuleArray = {
  input: [{
    required: true,
    message: "不能为空",
    trigger: "blur"
  }],

  select: [{
    required: true,
    message: "此项不能为空，请选择",
    trigger: "change"
  }],

  textarea: [{
    required: true,
    message: "此项不能为空",
    trigger: "change"
  }],

  email: [{
      required: true,
      message: '请输入邮箱地址',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change']
    }
  ],

  radio: [{
    required: true,
    message: '此项不能为空，请选择',
    trigger: 'blur'
  }],

  timePicker: [{
    required: true,
    message: '此项不能为空，请选择',
    trigger: 'change'
  }],

  daterange: [{
    required: true,
    message: '此项不能为空，请选择',
    trigger: 'change'
  }],

  checkbox: [{
    type: 'array',
    required: true,
    message: '请至少选择一个',
    trigger: 'change'
  }],

  number: [{
    required: true,
    message: '此项不能为空',
    trigger: 'blur'
  }]
}
