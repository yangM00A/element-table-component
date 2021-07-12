<template>
  <table-grid ref="tablegridRef" :tableData="tableData" :tableColumn="tableColumn" :tableBtn="tableBtn" :pageObj="pageObj" :loading="loading" :index="index" tableBtnColWidth='300'></table-grid>
</template>

<script>
import { getTabelConfig, getTableList } from "@/api/table-list";
export default {
  components: {},
  props: {
    //是否显示table 选择框
    selection: {
      type: Boolean,
      default: () => false,
    },
    // 序号
    index: {
      type: Boolean,
      default: () => false,
    },
    tableId: {
      type: String,
      default: () => "",
    },
    tableBtn: {
      type: Array,
      default: () => [],
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

      pageObj: {
        pageSizes: [10, 20, 50, 100],
        total: 0,
        pageSize: 10,
        pageIndex: 1,
      },
    };
  },

  created() {
    this.initTabelData();
  },

  methods: {
    //  初始化table
    initTabelData() {
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
          let tableCfgData = res[0];
          let tableData = res[1];
          // 处理tableColumn
          this.tableColumn = this.handleTableColumn(tableCfgData);
          // 处理tableData
          this.tableData = tableData.data.data;
          // 处理分页属性
          this.handlePage(tableData.data);
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

    // 处理分页
    handlePage(page) {
      this.pageObj.total = page.total;
      this.pageObj.pageIndex = page.pageIndex;
      this.pageObj.pageSize = page.pageSize;

      console.log(this.pageObj);
    },

    // 查询列表
    queryTabelList(page) {
      let param = {
        pageIndex: page.pageIndex,
        pageSize: page.pageSize,
        queryFieldList: [],
      };
      getTableList(this.tableId, param)
        .then((res) => {
          this.tableData = res.data.data;
          this.handlePage({
            pageIndex: res.data.pageIndex,
            pageSize: res.data.pageSize,
            total: res.data.total,
          });
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
</style>