<template>
  <div class="pt-oracleSetting">
    <div style="margin:20px;">
      <el-button type="primary" @click="add">新建</el-button>
      <el-button type="primary" @click="jsonDisplay">数据结构展示</el-button>
    </div>
    <div class="pt-oracleSetting__main">
      <el-table stripe border :data="data">
        <template v-for="(col, index) of cols">
          <el-table-column
            v-if="col.show"
            :key="index"
            :prop="col.prop"
            :label="col.label"
            :width="col.width"
            align="center"
          ></el-table-column>
        </template>
        <el-table-column fixed="right" width="185" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editOracleSetting(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <table-dialog
      :isEditing="isEditing"
      :visible="visible"
      :formInfo="formInfo"
      @close="close"
      @refresh="getData"
    ></table-dialog>
    <json-dialog :visible="jsonVisible" @close="jsonClose"></json-dialog>
  </div>
</template>

<script>
import API from "@/apiService/api/product";
import TableDialog from "./TableDialog";
import JsonDialog from "./JsonDialog";

export default {
  name: "ProductTable",
  components: {
    TableDialog,
    JsonDialog,
  },
  data() {
    return {
      isEditing: false,
      visible: false,
      jsonVisible: false,
      formInfo: {},
      cols: [
        { prop: "productId", label: "产品ID", show: true, width: "120" },
        { prop: "dataType", label: "数据类型", show: true },
        { prop: "ip", label: "IP", show: true },
        { prop: "productType", label: "产品类型", show: true },
        {
          prop: "version",
          label: "版本",
          width: "160",
          show: true,
        },
      ],
      data: [],
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
    jsonDisplay() {
      //console.log('sssh');
      this.jsonVisible = true;
    },
    jsonClose() {
      this.jsonVisible = false;
    },
    getData() {
      API.getList()
        .then((data) => {
          // console.log(data);
          this.data = data.data;
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
          API.deleteByProductId({ productId: data.productId }).then((resp) => {
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
