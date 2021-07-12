<template>
  <el-form :inline="inline" :model="queryform" ref="queryform" :size="size">
    <el-form-item v-for=" (item,id) in formItme" :key="id" :label="item.label">

      <el-input v-if="item.fieldType==undefined || item.fieldType==='input'" v-model="queryform[item.model]" :placeholder="item.label" autocomplete="off" :style="item.style==undefined?'width:150px':item.style"></el-input>

      <el-select v-if="item.fieldType==='select'" v-model="queryform[item.model]" :placeholder="item.label" :size="size" :style="item.style==undefined?'width:150px':item.style" clearable>
        <el-option v-for="(itemOption,index) in item.options" :key="index" :label="itemOption.label" :value="itemOption.value">
        </el-option>
      </el-select>

      <el-input-number v-if="item.fieldType=='number'" v-model="queryform[item.model]" :min="1" :max="1000000" :style="item.style==undefined?'width:150px':item.style"></el-input-number>{{item.units}}

      <el-date-picker v-if="item.fieldType=='daterange'" v-model="queryform[item.model]" :size="size" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :style="item.style==undefined?'width:150px':item.style"></el-date-picker>

      <el-time-picker v-if="item.fieldType=='timePicker'" is-range v-model="queryform[item.model]" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" format="HH:mm" :style="item.style==undefined?'width:150px':item.style"></el-time-picker>

      <el-time-select v-if="item.fieldType=='timeSelect'" v-model="queryform[item.model]" :picker-options="{ start: '00:01', step: '00:01', end: '23:59' }" placeholder="选择时间" :style="item.style==undefined?'width:150px':item.style"></el-time-select>

    </el-form-item>

    <el-form-item>
      <el-button @click="queryTable(true)">查询</el-button>
      <el-button @click="resetForm('queryform')">重置</el-button>
      <el-button type="primary" @click="add">新增</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { elementConfig } from "@/static/js/tableConfig";
import { getArrByKey, findMethod } from "@/static/js/utils";
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
      queryform: {},
    };
  },

  watch: {
    queryform: {
      handler(values) {
        this.queryTable(false);
      },
      deep: true,
    },
  },

  methods: {
    queryTable(query) {
      this.$emit("queryTable", this.queryform, query);
    },

    resetForm(queryform) {
      this.queryform = {};
    },

    add() {
      findMethod(this, "addHandle")();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>