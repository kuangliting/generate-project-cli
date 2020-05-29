<template>
  <div class="pt-editOracle">
    <el-dialog
      :visible="visible"
      :close-on-click-modal="false"
      :before-close="handleClose"
      width="600px"
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
          <el-form-item prop="solutionName" label="名称">
            <el-input
              v-model="form.solutionName"
              placeholder="请输入方案名称"
              :style="style"
              :disabled="isEditing"
            ></el-input>
          </el-form-item>

          <el-form-item prop="freeMarkerFilepath " label="数据处理">
            <el-input
              v-model="form.freeMarkerFilepath"
              placeholder="通过上传获取数据路径"
              :readonly="true"
              style="margin-right:10px;width:200px"
            ></el-input>
            <el-upload
              style="display:inline-block;tont-size:40px;"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :before-upload="beforeUpload"
              readonly
              name="freeMarkerFilepath"
            >
              <i
                class="el-icon-upload"
                style="font-size:25px;position:relative;top:4px;"
              ></i>
              <span slot="tip" class="el-upload__tip">只能上传.ftl文件</span>
            </el-upload>
          </el-form-item>
          <el-form-item prop="pushType" label="推送类型">
            <el-select v-model="form.pushType" placeholder="选择">
              <el-option
                v-for="p in pushTypeList"
                :key="p"
                :label="p"
                :value="p"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="httpHeaders" label="Headers">
            <div style="margin-bottom:10px;" v-show="headerList.length">
              <div
                v-for="h in headerList"
                :key="h.key"
                style="display:inline-block;margin-left:8px;"
              >
                {{ `${h.key} : ${h.value}` }}
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  @click="deleteHeader(h)"
                ></el-button>
              </div>
            </div>
            <div>
              <el-input
                v-model="header.key"
                placeholder="key"
                style="width:100px;margin-right:10px;"
              ></el-input>
              <el-input
                v-model="header.value"
                placeholder="value"
                style="width:190px;margin-right:10px;"
              ></el-input>
              <el-button
                type="primary"
                @click="addHeader"
                :disabled="!verifyHeader(header)"
                >新 增</el-button
              >
            </div>
          </el-form-item>
          <el-form-item prop="url" label="地址">
            <el-input
              placeholder="请输入地址"
              v-model="form.url"
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

import API from "@/apiService/api/solution";

const PUSH_TYPE_LIST = ["HTTP", "DAHUA", "TAOAN", "TSC1400", "DATAHUB"];
let validateIp = (rule, value, callback) => {
  let reg = /^(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})){3}$/g;
  if (!reg.test(value)) {
    callback(new Error("所输入的ip不符要求"));
  } else {
    callback();
  }
};
export default {
  name: "solutionDialog",
  components: {},
  props: ["visible", "formInfo", "isEditing"],
  data() {
    return {
      uploadUrl: `${window.config}/solution/fileUpload`,
      pushTypeList: PUSH_TYPE_LIST,
      form: {},
      headerList: [],
      header: {},
      style: {
        width: "300px",
      },
      oracleRules: {
        solutionName: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur",
          },
        ],
        freeMarkerFilepath: [
          {
            required: true,
            message: "数据处理不能为空",
            trigger: "blur",
          },
        ],
        // httpHeaders: [
        //   {
        //     required: true,
        //     message: "Headers不能为空",
        //     //trigger: "blur",
        //     // validate
        //   },
        // ],
        pushType: [
          {
            required: true,
            message: "推送类型不能为空",
            trigger: "blur",
          },
        ],
        url: [
          {
            required: true,
            message: "url地址不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    formInfo(v) {
      this.form = deepCopy(v);
      if (v.httpHeaders) {
        this.headerList = deepCopy(v.httpHeaders);
      }
    },
  },
  methods: {
    uploadSuccess(resp) {
      if (resp.code === "0" && resp.success) {
        this.$message({
          type: "success",
          message: "上传成功",
        });
        this.$set(this.form, "freeMarkerFilepath", resp.data);
        //  console.log( this.form)
        //  console.log( resp.data)
      } else {
        this.$message({
          type: "error",
          message: resp.msg,
        });
      }
    },
    // uploadChange() {
    //   console.log("uploadChange");
    //   console.log(arguments);
    // },
    beforeUpload(file) {
      //console.log(file);
      const vertifyReg = /\.ftl$/;
      if (!vertifyReg.test(file.name)) {
        this.$message({
          type: "error",
          message: "您上传的文件无效，请上传.ftl的文件",
        });
        return false;
      }
      return true;
    },

    verifyHeader(header) {
      let key = header.key;
      let value = header.value;
      if (key === undefined || value === undefined) {
        return false;
      } else if (key.trim() === "" || value.trim() === "") {
        return false;
      } else {
        return true;
      }
    },
    deleteHeader(header) {
      this.headerList.splice(this.headerList.indexOf(header), 1);
      this.form.httpHeaders = deepCopy(this.headerList);
      // this.$refs.form.validate((valid) => {
      //   console.log(valid);
      // });
    },
    addHeader() {
      let { key, value } = this.header;
      this.headerList.push({ key, value });
      this.form.httpHeaders = deepCopy(this.headerList);
      // this.form.httpHeaders = JSON.stringify(this.headerList);
      this.header = {};
    },
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
      let method = this.isEditing ? API.solutionPut : API.solutionPost;
      method(params)
        .then((data) => {
          let type = null;
          let message = null;
          if (data.code === "0") {
            this.headerList = [];
            this.header = {};
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
