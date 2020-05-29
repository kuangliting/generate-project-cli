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
          :rules="oracleRules"
          :model="form"
        >
          <el-form-item prop="productType" label="产品类型">
            <el-select v-model="form.productType" placeholder="请选择">
              <el-option
                v-for="(p, index) in productTypeList"
                :key="index"
                :label="p"
                :value="p"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="ip" label="IP">
            <el-input
              v-model="form.ip"
              placeholder="请输入IP"
              :style="style"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="dataType"
            label="数据类型"
            v-if="productTypeCnf[form.productType]"
          >
            <el-select v-model="form.dataType" placeholder="请选择">
              <el-option
                v-for="p in dataType"
                :key="p.value"
                :label="p.label"
                :value="p.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="version"
            label="版本"
            v-if="productTypeCnf[form.productType]"
          >
            <el-input
              placeholder="请输入版本"
              v-model="form.version"
              :style="style"
            ></el-input>
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

import API from "@/apiService/api/product";
const DATA_TYPE = [
  { label: "FACE", value: 1 },
  { label: "BODY", value: 2 },
  { label: "VEHICLE", value: 3 },
  { label: "NON_M0TOR_VEHICLE", value: 4 },
];
const PRODUCT_TYPE_LIST = [
  "SENSECITY_KAFKA",
  "SENSEFACE_KAFKA",
  "VIPER_KAFKA",
  "SENSELINK",
];
const PRODUCT_TYPE = {
  SENSECITY_KAFKA: false,
  SENSEFACE_KAFKA: false,
  VIPER_KAFKA: true,
  SENSELINK: true,
};
let validateIp = (rule, value, callback) => {
  let reg = /^(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})){3}$/g;
  if (!reg.test(value)) {
    callback(new Error("所输入的ip不符要求"));
  } else {
    callback();
  }
};
export default {
  name: "TableDialog",
  components: {},
  props: ["visible", "formInfo", "isEditing"],
  data() {
    let validatePort = (rule, value, callback) => {
      if (!(value > 0) || !(value <= 65535)) {
        callback(new Error("请输入0-65535范围内的数字"));
      } else {
        callback();
      }
    };
    return {
      productTypeList: PRODUCT_TYPE_LIST,
      productTypeCnf: PRODUCT_TYPE,
      dataType: DATA_TYPE,
      form: {},
      style: {
        width: "200px",
      },

      oracleRules: {
        productType: [
          {
            required: true,
            message: "产品类型不能为空",
            trigger: "blur",
          },
        ],
        ip: [
          {
            required: true,
            trigger: "blur",
            validator: validateIp,
          },
        ],
        dataType: [
          {
            required: true,
            message: "数据类型不能为空",
            trigger: "blur",
          },
          { validator: validatePort, trigger: "blur" },
        ],
        version: [
          {
            required: true,
            message: "版本不能为空",
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
  },
  methods: {
    // 关闭表单
    handleClose() {
      this.resetForm();
      this.$emit("close");
    },
    developing() {
      this.$message({
        message: "功能开发中",
        type: "warning",
      });
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
      let method = this.isEditing ? API.productPut : API.productPost;
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
