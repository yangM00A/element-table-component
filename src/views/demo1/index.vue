<template>
  <div>
    <tableHttp :tableId="tableId" :tableBtn="tableBtn" :index="index"></tableHttp>
    <div v-if="show">
      <form-dialog :formItme="formItme" :title="title" :show="show" @closeDialog="closeDialog" @beforeClose="beforeClose"></form-dialog>
    </div>
  </div>
</template>

<script>
import tableHttp from "@/components/table-http";
export default {
  components: {
    tableHttp,
    formDialog: () => import("@/components/form-dialog"),
  },
  data() {
    return {
      index: true,
      tableId: "toiletStatus",
      tableBtn: ["info", "edit", "delete"],

      // 弹窗
      formItme: [
        {
          label: "事件名称",
          required: true,
          model: "event_name",
        },
        {
          label: "持续时间",
          fieldType: "number",
          controlsPosition: "right",
          required: true,
          model: "duration",
          units: "(min)",
          min: 0,
          max: 10,
        },
        {
          label: "条件",
          fieldType: "select",
          options: [
            { label: "大于", value: "大于" },
            { label: "小于", value: "小于" },
            { label: "等于", value: "等于" },
          ],
          required: true,
          model: "set_condition",
        },
        {
          label: "爱好",
          fieldType: "checkbox",
          options: [
            { label: "打球", value: "1" },
            { label: "跑步", value: "2" },
            { label: "阅读", value: "3" },
          ],
          required: true,
          model: "lover",
        },
        {
          label: "性别",
          fieldType: "radio",
          options: [
            { label: "男", value: "0" },
            { label: "女", value: "1" },
          ],
          required: true,
          model: "sex",
        },
        {
          label: "阈值",
          required: true,
          model: "threshold",
        },
        {
          label: "日期时间段",
          fieldType: "datePicker",
          required: true,
          model: "dataRange",
        },
        {
          label: "启用时间段",
          fieldType: "timePicker",
          required: true,
          model: "timeBuckets",
          format: "HH:mm",
        },
        {
          label: "启停状态",
          fieldType: "switch",
          model: "threshold_status",
        },
      ],
      title: "",
      show: false,
      rowData: {},
    };
  },

  methods: {
    addHandle() {
      this.title = "新增";
      this.show = true;
    },

    beforeClose() {
      this.closeDialog();
    },

    closeDialog() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>