<template>
  <div>
    <el-dialog :title="title" :visible="show" :destroy-on-close="destory" :before-close="beforeClose" :width="width">

      <el-form :inline="inline" :model="form" :rules="rules" ref="form" :size="size">

        <el-form-item v-for="(item,index) in formItme " :key="index" :label=item.label :label-width="formLabelWidth" :prop="item.required==undefined?null:item.model">
          <div v-if="readonly">
            <span :class="item.fieldType !='textarea'?'item_text':'item_textarea'">{{form[item.model]}}{{item.units}}</span>
          </div>
          <div v-else>
            <el-input v-if="item.fieldType==undefined || item.fieldType==='input'" v-model="form[item.model]" autocomplete="off" :readonly="item.readonly" :style="item.style==undefined?'width:165px':item.style"></el-input>

            <el-select v-if="item.fieldType=='select'" v-model="form[item.model]" placeholder="请选择" :style="item.style==undefined?'width:165px':item.style" @change="clickEvent($event,item)">
              <el-option :label=optionItem.label :value=optionItem.value v-for="(optionItem,index) in item.options" :key="index" align="center"></el-option>
            </el-select>

            <el-input-number v-if="item.fieldType=='number'" v-model="form[item.model]" :min="1" :max="1000000" :style="item.style==undefined?'width:165px':item.style"></el-input-number>{{item.units}}

            <el-checkbox-group v-if="item.fieldType=='checkbox'" v-model="form[item.model]">
              <el-checkbox v-for="(optionItem,index) in item.options" :key="index" :label="optionItem.value">{{optionItem.label}}</el-checkbox>
            </el-checkbox-group>

            <el-radio-group v-if="item.fieldType=='radio'" v-model="form[item.model]">
              <el-radio v-for="(optionItem,index) in item.options" :key="index" :label="optionItem.value">{{optionItem.label}}</el-radio>
            </el-radio-group>

            <el-switch v-if="item.fieldType=='switch'" v-model="form[item.model]" active-color="#13ce66" inactive-color="#ff4949" :style="item.style==undefined?'width:165px':item.style"> </el-switch>

            <el-date-picker v-if="item.fieldType=='daterange'" v-model="form[item.model]" :size="size" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :style="item.style==undefined?'width:80%':item.style"></el-date-picker>

            <el-time-picker v-if="item.fieldType=='timePicker'" is-range v-model="form[item.model]" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" format="HH:mm" :style="item.style==undefined?'width:80%':item.style"></el-time-picker>

            <el-time-select v-if="item.fieldType=='timeSelect'" v-model="form[item.model]" :picker-options="{ start: '00:01', step: '00:01', end: '23:59' }" placeholder="选择时间"></el-time-select>

            <el-input v-if="item.fieldType=='textarea'" v-model="form[item.model]" type="textarea" :rows="3" style="width:440px"></el-input>

          </div>

        </el-form-item>
        <slot :formLabelWidth="formLabelWidth" :form=form></slot>
      </el-form>
      <div slot="footer" class="dialog-footer" v-show="!disabled">
        <el-button @click="closeDialog('form')" :size="buttonSize">取 消</el-button>
        <el-button type="primary" @click="saveForm('form')" :size="buttonSize">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { elementConfig } from "@/static/js/tableConfig";
import { handleRule } from "@/static/js/validator_rules.js";
export default {
  props: {
    // 表单项是否可换行
    inline: {
      type: Boolean,
      default: () => true,
    },
    // 表单选项
    formItme: {
      type: Array,
      default: () => [],
    },

    // 数据
    rowData: {
      type: Object,
      default: () => {},
    },
    // 弹窗标题
    title: {
      type: String,
      default: () => "",
    },

    show: {
      type: Boolean,
      default: () => false,
    },

    disabled: {
      type: Boolean,
      default: () => false,
    },

    width: {
      type: String,
      default: () => "650px",
    },

    // item宽度
    formLabelWidth: {
      type: String,
      default: () => "100px",
    },

    // 表单只读
    readonly: {
      type: Boolean,
      default: () => false,
    },
  },

  computed: {
    // 校验规则
    rules() {
      return handleRule(this.formItme);
    },
  },

  data() {
    return {
      size: elementConfig.size,
      buttonSize: elementConfig.buttonSize,
      destory: true,
      form: {},
    };
  },
  methods: {
    clickEvent() {},

    closeDialog(formName) {
      this.$refs[formName].resetFields();
      this.$emit("closeDialog");
    },

    beforeClose() {
      this.$emit("closeDialog");
    },

    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form, 222);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>