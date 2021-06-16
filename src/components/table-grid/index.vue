<template>
  <div>
    <!-- :header-cell-style="{background:'rgb(230, 230, 230)'}" -->
    <el-table :height="height" :data="tableData" ref="tableList" v-loading="loading" element-loading-text="拼命加载中" :border="true" :size="size" @selection-change="selectionChange">

      <el-table-column v-if="selection" prop="id" label="选择" width="50" align="center" type="selection">
      </el-table-column>

      <el-table-column v-for="(item ,index) in tableColumn" :key="index" :prop="item.columnName" :label="item.title" :width="item.width" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="item.columnType=='image'" @click="clickTableCli(item.columnName,scope.row)" style="margin-left: 10px">
            <i :class="item.icon"></i>
            <img :src="scope.row[item.columnName]" width="40" height="20" />
          </span>
          <span v-if="item.columnType=='switch'" style="margin-left: 10px">
            <i :class="item.icon"></i>
            <el-switch v-model="scope.row[item.columnName]" @change="clickTableCli(item.columnName,scope.row)" active-value="1" inactive-value="0" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
          </span>
          <span v-else style="margin-left: 10px">
            <i :class="item.icon"></i>
            {{ scope.row[item.columnName]}}
          </span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" :width="tableBtnColWidth" align="center" v-if="tableBtnList.length > 0">
        <template slot-scope="scope">
          <el-button v-for="(opera ,index) in tableBtnList" :type="btnType" :key="index" @click="handleClick(opera,scope.row)" :size="size">
            <i :class="opera.icon"></i>{{opera.value}}
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageObj.pageIndex" :page-sizes="pageObj.pageList" layout="total, sizes, prev, pager, next, jumper" :total="pageObj.total">
    </el-pagination> -->
  </div>
</template>

<script>
import { tableBtnArray, elementConfig } from "@/static/js/tableConfig";
import { getArrByKey, findMethod } from "@/static/js/utils";
export default {
  props: {
    //是否显示table 选择框
    selection: {
      type: Boolean,
      default: () => false,
    },

    // loading状态
    loading: {
      type: Boolean,
      default: () => true,
    },

    // table表格高度
    height: {
      type: String,
    },
    // 操作列的宽度
    tableBtnColWidth: {
      type: String,
      default: () => "185",
    },

    tableData: {
      type: Array,
      default: () => [],
    },

    /**
     * {
     * columnName:string
     * title：string,
     * columnType:text|switch|image,
     * icon: string,
     * width:string
     * }
     */
    tableColumn: {
      type: Array,
      default: () => [],
    },

    // table操作按钮
    tableBtn: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      size: elementConfig.size,
      pageObj: {
        pageList: [],
        total: 0,
        pageSize: 10,
        pageIndex: 1,
      },
    };
  },

  computed: {
    tableBtnList() {
      return getArrByKey(tableBtnArray, this.tableBtn);
    },
  },

  methods: {
    // 复选框值变化触发
    selectionChange(item) {
      findMethod(this, "selectionChange")(item);
    },

    // 点击表格触发
    handleClick(opera, item) {
      if (!opera.method) {
        opera.method = opera.label + "Handle";
      }
      findMethod(this, opera.method)(item);
    },

    handleSizeChange(val) {
      this.pageObj.pageSize = val;
      this.queryMethod();
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      this.pageObj.pageIndex = val;
      this.queryMethod();
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>