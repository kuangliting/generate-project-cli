<template>
  <div class="pt-oracleSetting">
    <div style="margin:20px;">
      <el-button type="primary" @click="add">新建</el-button>
    </div>
    <div class="pt-oracleSetting__main">
      <el-table stripe border :data="data.content">
        <template v-for="(col, index) of cols">
          <el-table-column
            v-if="col.show"
            :key="index"
            :prop="col.prop"
            :label="col.label"
            :width="col.width"
            :formatter="col.formatter"
            align="center"
          ></el-table-column>
        </template>
        <el-table-column fixed="right" width="120" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editOracleSetting(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pt-oracleSetting__pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pagination.pageSizes"
      :page-size="10"
      layout="sizes, prev, pager, next"
      :total="data.totalElements"
    ></el-pagination>
    <table-dialog
      :isEditing="isEditing"
      :visible="visible"
      :formInfo="formInfo"
      @close="close"
      @refresh="getData"
    ></table-dialog>
  </div>
</template>

<script>
import API from "@/apiService/api/solution";
import TableDialog from "./TableDialog";
const PUSH_TYPE_LIST = ["HTTP", "DAHUA", "TAOAN", "TSC1400", "DATAHUB"];

export default {
  name: "SolutionTable",
  components: {
    TableDialog,
  },
  data() {
    return {
      pushTypeList: PUSH_TYPE_LIST,
      isEditing: false,
      visible: false,
      formInfo: {},
      cols: [
        { prop: "solutionName", label: "名称", show: true, width: "150" },
        {
          prop: "freeMarkerFilepath",
          label: "数据处理",
          show: true,
          width: "250",
        },
        { prop: "pushType", label: "推送类型", show: true, width: "100" },
        {
          prop: "httpHeaders",
          label: "Header",
          show: true,
          formatter: this.colFormatter,
        },
        {
          prop: "url",
          label: "地址",
          show: true,
        },
      ],
      data: {
        content: [],
        totalElements: 0,
      },
      rowSelected: [],
      pagination: {
        page: 1,
        size: 10,
        pageSizes: [10, 15, 20],
      },
    };
  },
  watch: {
    type(newVal, oldVal) {
      this.initialData();
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    colFormatter(data, row) {
      if (row.property === "httpHeaders") {
        return data.httpHeaders
          .map((hp) => {
            return `${hp.key}:${hp.value}`;
          })
          .join(",");
      }
    },
    developing() {
      this.$message({
        message: "功能开发中",
        type: "warning",
      });
    },
    initialData() {
      this.rowSelected = [];
    },
    getData() {
      API.getList()
        .then((resp) => {
          this.data.content = resp.data.data;
          this.data.totalElements = resp.data.count;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 单条删除
    remove(data) {
      this.$confirm("确定删除此条记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          API.deleteBySolutionName({ solutionName: data.solutionName }).then(
            (resp) => {
              if (resp.code === "0") {
                this.getData();
                this.$message({
                  type: "success",
                  message: "删除成功",
                });
              }
            }
          );
        })
        .catch((err) => {});
    },
    // 改变每页显示条数
    handleSizeChange(val) {
      this.getData();
    },
    // 改变当前页
    handleCurrentChange(val) {
      this.getData();
    },
    // 选中时执行的操作
    itemSelected(selection) {
      let arr = [];
      for (let item of selection) {
        arr.push(item.id);
      }
      this.rowSelected = arr;
    },
    // 编辑按钮
    editOracleSetting(info) {
      // this.$emit("editSetting", info);
      this.formInfo = info;
      this.isEditing = true;
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    add() {
      this.isEditing = false;
      this.formInfo = {};
      this.visible = true;
    },
  },
};
</script>
