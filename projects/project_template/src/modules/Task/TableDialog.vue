<template>
  <div class="pt-editOracle">
    <el-dialog
      :visible="visible"
      :close-on-click-modal="false"
      :before-close="handleClose"
      width="500px"
      top="5vh"
      v-dialogDrag
    >
      <template slot="title">
        <div class="pt-editOracle__title">
          <span>{{ isEditing ? "编辑" : "新增" }} </span>
        </div>
      </template>
      <div class="pt-editOracle__main">
        <el-form
          label-width="130px"
          ref="form"
          :rules="formRules"
          :model="form"
        >
          <el-form-item prop="productId" label="产品ID">
            <el-select v-model="form.productId" placeholder="请输入产品ID">
              <el-option
                v-for="p in productIdList"
                :key="p"
                :label="p"
                :value="p"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="solutionNames" label="方案">
            <el-select
              v-model="form.solutionNames"
              multiple
              placeholder="请输入方案"
            >
              <el-option
                v-for="p in solutionNameList"
                :key="p"
                :label="p"
                :value="p"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="verifyForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepCopy } from "@/utils/object";
import productAPI from "@/apiService/api/product";
import solutionAPI from "@/apiService/api/solution";
import API from "@/apiService/api/task";

export default {
  name: "taskDialog",
  components: {},
  props: ["visible", "formInfo", "isEditing"],
  data() {
    return {
      productIdList: [],
      solutionNameList: [],
      form: {},
      style: {
        width: "300px",
      },
      formRules: {
        productId: [
          {
            required: true,
            message: "产品ID不能为空",
            trigger: "blur",
          },
        ],
        solutionNames: [
          {
            required: true,
            message: "方案不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    formInfo(v) {
      this.form = deepCopy(v);
    },
    visible(val) {
      if (val) {
        this.getProductID();
        this.getSolutionName();
      }
    },
  },
  methods: {
    getProductID() {
      productAPI.getList().then((resp) => {
        this.productIdList = resp.data.map((d) => {
          return d.productId;
        });
      });
    },
    getSolutionName() {
      solutionAPI.getList().then((resp) => {
        this.solutionNameList = resp.data.data.map((d) => {
          return d.solutionName;
        });
      });
    },
    // 关闭表单
    handleClose() {
      this.resetForm();
      this.$emit("close");
    },

    // 验证表单
    verifyForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitForm();
        } else {
          return false;
        }
      });
    },
    submitForm() {
      let params = {
        ...this.form,
      };
      let method = this.isEditing ? API.putUpdate : API.taskPost;
      method(params)
        .then((data) => {
          let type = null;
          let message = null;
          if (data.code === "0") {
            this.handleClose();
            this.$emit("refresh");
            message = this.isEditing ? "编辑成功" : "新增成功";
            this.$message({
              type: "success",
              message,
            });
          } else {
            this.$message({
              type: "error",
              message: data.msg,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 重置表单
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
