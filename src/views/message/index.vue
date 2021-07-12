<template>
  <div>
    <tableHttp :tableId="tableId" :tableBtn="tableBtn" :index="index"></tableHttp>
    <form-dialog :formItme="formItme" :title="title" :show="show" @closeDialog="closeDialog" @beforeClose="beforeClose"></form-dialog>
  </div>
</template>

<script>
import tableHttp from "@/components/table-http";
export default {
  components: {
    tableHttp,
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
          required: true,
          model: "duration",
          units: "(min)",
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
          label: "阈值",
          required: true,
          model: "threshold",
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