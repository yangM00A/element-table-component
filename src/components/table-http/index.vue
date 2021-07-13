<template>
  <div>
    <table-search :formItme="formItme" @queryTable="queryTable"></table-search>
    <table-grid :tableData="tableData" :tableColumn="tableColumn" :tableBtn="tableBtn" :pageObj="pageObj" :loading="loading" :index="index" tableBtnColWidth='300'></table-grid>
  </div>
</template>

<script>
import { getTabelConfig, getTableList } from "@/api/table-list";
import tableSearch from "@/components/table-search";
export default {
  components: { tableSearch },
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
      // table参数---start
      loading: true,
      tableData: [],
      tableColumn: [],
      pageObj: {
        pageSizes: [10, 20, 50, 100],
        total: 0,
        pageSize: 10,
        pageIndex: 1,
      },
      // table参数---end
      // query 参数--start
      formItme: [
        {
          label: "厕位编号",
          fieldType: "input",
          model: "status",
        },
        {
          label: "时间范围",
          required: true,
          model: "timeFrame",
          fieldType: "daterange",
          style: "width:220px",
        },
        {
          label: "通知类型",
          fieldType: "select",
          options: [
            { label: "告警通知", value: "告警通知" },
            { label: "系统通知", value: "系统通知" },
          ],
          required: true,
          model: "notify_template",
        },
      ],
      // 查询条件
      queryform: {},
      // query 参数--end
    };
  },

  created() {
    this.initTabelData();
  },

  methods: {
    //  初始化table
    initTabelData() {
      this.loading = true;
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
          let tableCfgData = res[0];
          let tableData = res[1];
          // 处理tableColumn
          this.tableColumn = this.handleTableColumn(tableCfgData);
          // 处理tableData
          this.tableData = tableData.data.data;
          // 处理分页属性
          this.handlePage(tableData.data);
          this.loading = false;
        })
        .catch((err) => {
          console.log("请求失败=>", err);
          this.loading = false;
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

    // 查询列表
    queryTabelList(page) {
      this.loading = true;
      let param = {
        pageIndex: page.pageIndex,
        pageSize: page.pageSize,
        queryFieldList: this.handleQueryParam(),
      };
      getTableList(this.tableId, param)
        .then((res) => {
          this.tableData = res.data.data;
          this.handlePage({
            pageIndex: res.data.pageIndex,
            pageSize: res.data.pageSize,
            total: res.data.total,
          });
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },

    queryTable(fomrData, query) {
      this.queryform = fomrData;
      if (query) {
        this.queryTabelList(this.pageObj);
      }
    },

    // 处理查询条件
    handleQueryParam() {
      let queryFieldList = [];
      for (const key in this.queryform) {
        queryFieldList.push({ field: key, value1: this.queryform[key] });
      }

      return queryFieldList;
    },

    // 处理分页
    handlePage(page) {
      this.pageObj.total = page.total;
      this.pageObj.pageIndex = page.pageIndex;
      this.pageObj.pageSize = page.pageSize;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>