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
        <el-table-column fixed="right" width="200" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.taskStatus !== 'RUNNING'"
              type="text"
              @click="startTask(scope.row.taskId)"
              >启动</el-button
            >
            <el-button v-else type="text" @click="stopTask(scope.row.taskId)"
              >停止</el-button
            >
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
import API from "@/apiService/api/task";
import TableDialog from "./TableDialog";

const STATUS = {
  RUNNING: 1,
  STOP: 0,
};
export default {
  name: "SolutionTable",
  components: {
    TableDialog,
  },
  data() {
    return {
      isEditing: false,
      visible: false,
      formInfo: {},
      cols: [
        { prop: "taskId", label: "任务ID", show: true, width: "180" },
        { prop: "productId", label: "产品ID", show: true, width: "180" },
        {
          prop: "solutionNames",
          label: "方案",
          show: true,
          formater: this.colFormatter,
        },
        { prop: "taskStatus", label: "状态", show: true, width: "180" },
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
    stopTask(taskId) {
      API.getStop({ taskId }).then((resp) => {
        this.getData();
        this.$message({
          message: "停止成功",
          type: resp.success ? "success" : "error",
        });
      });
    },
    startTask(taskId) {
      API.getStart({ taskId }).then((resp) => {
        this.getData();
        this.$message({
          message: "启动成功",
          type: resp.success ? "success" : "error",
        });
      });
    },
    colFormatter(data, row) {
      if (row.property === "solutionNames") {
        return data.solutionNames.join(":");
      }
    },

    initialData() {
      this.rowSelected = [];
    },
    getData() {
      API.getList()
        .then((resp) => {
          //console.log(data);
          //console.log(resp.data);
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
          API.deleteByTaskId({ taskId: data.taskId }).then((resp) => {
            if (resp.code === "0") {
              this.getData();
              this.$message({
                type: "success",
                message: "删除成功",
              });
            }
          });
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

    // 编辑按钮
    editOracleSetting(info) {
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
