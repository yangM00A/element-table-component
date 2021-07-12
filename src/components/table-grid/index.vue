<template>
  <div>
    <!-- :header-cell-style="{background:'rgb(230, 230, 230)'}" -->
    <el-table :height="height" :data="tableData" ref="tableList" v-loading="loading" element-loading-text="拼命加载中" :border="true" :size="size" @selection-change="selectionChange">

      <el-table-column v-if="selection" prop="id" label="选择" width="50" align="center" type="selection">
      </el-table-column>

      <el-table-column v-if="index" type="index" width="50" align="center"> </el-table-column>

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
          <el-button v-for="(item ,index) in tableBtnList" :type="item.btnType" :key="index" @click="handleClick(item,scope.row)" :size="buttonSize">
            <i :class="item.icon">{{item.value}}</i>
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="pageClass" v-if="pageObj">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageObj.pageIndex" :page-sizes="pageObj.pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="pageObj.total">
      </el-pagination>
    </div>
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
    // 序号
    index: {
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
      default: () => "80vh",
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
     * tableColumn:{
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

    // 分页对象
    pageObj: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      size: elementConfig.size,
      buttonSize: elementConfig.buttonSize,
    };
  },

  computed: {
    // 处理列表操作按钮
    tableBtnList() {
      return getArrByKey(tableBtnArray, this.tableBtn);
    },
  },

  watch: {
    tableData: {
      // 重新渲染列表，解决列表错位
      handler(value) {
        this.$nextTick(() => {
          this.$refs.tableList.doLayout();
        });
      },
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

    // 改变每页条数
    handleSizeChange(pageSize) {
      let pageObj = JSON.parse(JSON.stringify(this.pageObj));
      pageObj.pageSize = pageSize;
      findMethod(this, "queryTabelList")(pageObj);
      console.log(`每页 ${pageSize} 条`);
    },

    // 下一页|上一页|跳页
    handleCurrentChange(pageIndex) {
      let pageObj = JSON.parse(JSON.stringify(this.pageObj));
      pageObj.pageIndex = pageIndex;
      findMethod(this, "queryTabelList")(pageObj);
      console.log(`当前页: ${pageIndex}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.pageClass {
  margin-top: 10px;
  text-align: center;
  height: 50px;
}
</style>