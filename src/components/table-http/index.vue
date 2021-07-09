<template>
  <table-grid ref="tablegridRef" :tableData="tableData" :tableColumn="tableColumn" :tableBtn="tableBtn" :loading="loading" tableBtnColWidth='300'></table-grid>
</template>

<script>
import { getTabelConfig, getTableList } from "@/api/table-list";
export default {
  components: {},
  props: {
    tableId: {
      type: String,
      default: () => "",
    },
  },

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

      pageObj: {
        pageList: [],
        total: 0,
        pageSize: 10,
        pageIndex: 1,
      },
    };
  },

  created() {
    this.getTabelData();
  },

  methods: {
    getTabelData() {
      let param = {
        pageIndex: 1,
        pageSize: 10,
        queryFieldList: [],
      };

      let responeAll = Promise.all([
        getTabelConfig(this.tableId),
        getTableList(this.tableId, param),
      ]);

      responeAll
        .then((res) => {
          console.log(res);
          let tabeleCfgData = res[0];
          let tabeleData = res[1];
          // 处理tableColumn
          this.tableColumn = this.handleTableColumn(tabeleCfgData);
          // 处理tableData
          this.tableData = tabeleData.data.data;
        //   this.$refs.tablegridRef.doLayout();
        })
        .catch((err) => {
          console.log("请求失败=>", err);
        });
    },

    // 处理tableColumn
    handleTableColumn(tabeleCfgData) {
      let tableColumn = [];
      tabeleCfgData.data.queryColumns.forEach((element) => {
        if (element.hidden === 0) {
          tableColumn.push({
            columnName: element.columnName,
            title: element.title,
          });
        }
      });
      return tableColumn;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>