<template>
  <div>
    <tableSearch :formItme="formItemArr"></tableSearch>
    <table-grid :tableData="tableData" :tableColumn="tableColumn" :tableBtn="tableBtn" :loading="loading" tableBtnColWidth='300'></table-grid>
  </div>
</template>

<script>
import tableSearch from "../../components/table-search";
export default {
  components: { tableSearch },
  data() {
    return {
      loading: false,

      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],

      tableColumn: [
        {
          columnName: "name",
          title: "名称",
        },
        {
          columnName: "date",
          title: "时间",
        },
        {
          columnName: "address",
          title: "地址",
        },
      ],

      tableBtn: ["info", "edit", "delete"],

      formItemArr: [
        {
          label: "任务名称",
          required: true,
          model: "taskName",
        },
        {
          label: "时间范围",
          required: true,
          model: "timeFrame",
          type: "daterange",
          style: "width:220px",
        },
        {
          label: "定时类型",
          type: "select",
          options: [
            { label: "周期任务", value: "周期任务" },
            { label: "临时任务", value: "临时任务" },
          ],
          required: true,
          model: "taskType",
        },
        {
          label: "启停状态",
          type: "switch",
          model: "status",
        },
      ],
    };
  },

  methods: {
    editHandle(data) {
      console.log(data);
    },
    infoHandle(data) {
      console.log(data);
    },
    deleteHandle(data) {
      console.log(data);
    },
  },
};
</script>

<style>
</style>