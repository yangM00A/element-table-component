'use strict'
import { formRuleArray } from "./formConfig";

/**
 * 组合表单校验规则
 * @date 2021年6月16日
 * @param {any} formItemArr 自定义规则
 * @returns {any} 组合规则
 */
export function handleRule(formItemArr) {
  let rules = {};
  formItemArr.forEach((element) => {
    if (element.required) {
      //必填
      if (element.rules === undefined) {
        // 没有校验规则，使用默认的规则
        element.rules = formRuleArray[element.type == undefined ? "input" : element.type];
      }
      rules[element.model] = element.rules;
    }
  });
  return rules;
}
