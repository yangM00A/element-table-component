<template>
  <div>
    <el-form :inline="inline" :model="formItme" ref="formItme" :size="size">

      <el-form-item v-for=" (item,id) in formItme" :key="id" :label="item.label">

        <el-select v-if="item.fieldType==='select'" v-model="item.value" :placeholder="item.label" :size="size" clearable>
          <el-option v-for="(itemOption,index) in item.options" :key="index" :label="itemOption.label" :value="itemOption.value" align="center">
          </el-option>
        </el-select>

        <el-input v-if="item.fieldType==undefined || item.fieldType==='input'" v-model="item.value" autocomplete="off" :style="item.style"></el-input>

        <!-- <el-input v-if="item.fieldType==undefined || item.fieldType==='input'" v-model="form[item.model]" autocomplete="off" :readonly="item.readonly" :style="item.style"></el-input>

        <el-select v-if="item.fieldType=='select'" v-model="form[item.model]" placeholder="请选择" style="width:164px" @change="clickEvent($event,item)">
          <el-option :label=optionItem.label :value=optionItem.value v-for="(optionItem,index) in item.options" :key="index" align="center"></el-option>
        </el-select>

        <el-input-number v-if="item.fieldType=='number'" v-model="form[item.model]" :min="1" :max="1000000" style="width:164px"></el-input-number>{{item.units}}

        <el-checkbox-group v-if="item.fieldType=='checkbox'" v-model="form[item.model]">
          <el-checkbox v-for="(optionItem,index) in item.options" :key="index" :label="optionItem.value">{{optionItem.label}}</el-checkbox>
        </el-checkbox-group>

        <el-date-picker v-if="item.fieldType=='daterange'" v-model="form[item.model]" :size="size" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :style="item.style==undefined?'width:80%':item.style"></el-date-picker>

        <el-time-picker v-if="item.fieldType=='timePicker'" is-range v-model="form[item.model]" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" format="HH:mm" :style="item.style==undefined?'width:80%':item.style"></el-time-picker>

        <el-time-select v-if="item.fieldType=='timeSelect'" v-model="form[item.model]" :picker-options="{ start: '00:01', step: '00:01', end: '23:59' }" placeholder="选择时间"></el-time-select> -->

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { elementConfig } from "@/static/js/tableConfig";
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
  },
  data() {
    return {
      size: elementConfig.size,
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },

    resetForm(formItme) {
      this.$refs[formItme].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>