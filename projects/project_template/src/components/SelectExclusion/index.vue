<template>
  <div id="SelectExclusion">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="ruleForm">
      <el-row v-for="(key,index) in queryColumn " :key="index">
        <el-col :span="7">
          <el-form-item
            :label="''"
            :className="'queryColumnSelectValue['+index+']'"
            :prop="'queryColumnSelectValue['+index+']'"
          >
            <el-select
              v-model="ruleForm.queryColumnSelectValue[index]"
              @change="changeColumn($event,  index)"
            >
              <el-option
                v-for="(item, _index) of  key  "
                :key="_index"
                :label="item.desc"
                :value="item.columnName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="1">
          <el-form-item
            :label="''"
            :className="'queryColumnSelectInput['+index+']'"
            :prop="'queryColumnSelectInput['+index+']'"
          > 
            <el-input :placeholder="placeholder" v-model.trim ="ruleForm.queryColumnSelectInput[index]"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1" :offset="1">
          <i v-if="index === 0" class="el-icon-circle-plus-outline" @click="addQueryColumn(true )"></i>
          <i
            v-else-if="index!==0"
            class="el-icon-remove-outline"
            @click="addQueryColumn(false ,index )"
          ></i>
        </el-col>
      </el-row>
      <!-- <el-row >
        <el-col :span="24">
          <el-form-item prop="picServer" label="图片服务器地址" v-if="true">
            <el-input v-model="ruleForm.picServer"></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
    </el-form>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      ruleForm: {
        queryColumnSelectValue: [], // select 选择框input值
        queryColumnSelectInput: [], // input框值
        picServer: ""
      }, // 表单作用域
      queryColumn: [], // 查询列默认1条  控制查询列select数量
      addCount: 0,
      delectQueryColumn: [], //
      rules: {
        "queryColumnSelectValue[0]": [
          {
            required: true,
            validator: (rule, value, callback, source, options) => {
              this.$emit("showError", false);

              if (value === "" || typeof value === "undefined") {
                callback(new Error("请选择字段"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        "queryColumnSelectInput[0]": [
          {
            required: true,
            validator: (rule, value, callback, source, options) => {
              // 若是左侧select 选择身份证则对身份证验证
              this.$emit("showError", false);

              let _key = Object.keys(source);
              let _index = _key[0].substr(-2, 1);

              // if (this.ruleForm.queryColumnSelectValue[_index] === "id") {
              //   // 身份证验证
              //   let regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
              //   if (value && regIdCard.test(value.trim()) === false) {
              //     callback(new Error("身份证输入不合法"));
              //   } else if (typeof value === "undefined") {
              //     callback(new Error("请输入身份证"));
              //   }
              // }
              if (
                (value && value.trim()  === "") ||
                typeof value === "undefined"  
              ) {
                callback(new Error("请输入字段值"));
              } else {
                callback();
              }
            },
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  props: {
    msg: String,
    queryColumnDeep: {
      // 父组件字段值 举个栗子
      /* * * 
      *[
        { columnName: "id", desc: "身份证" },
        { columnName: "name", desc: "姓名" },
        { columnName: "fullPath", desc: "图片地址url" },
        { columnName: "picPath", desc: "图片Path" },
        { columnName: "imageBase64", desc: "图片Base64编码" }
      ]
       */
    },
    placeholder: String,
    visible: {
      type: Boolean,
      default: () => false
    }
  },
  watch: {
    visible(nV) {
      if (nV) {
        this.init();
      } else {
        // this.resetForm()
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.queryColumn = [];
      this.queryColumnDeepOrigin = JSON.parse(
        JSON.stringify(this.queryColumnDeep)
      );

      this.queryColumn.push([...this.queryColumnDeepOrigin]);
      // 增加自定义规则
      for (let k = 1; k <= this.queryColumnDeepOrigin.length - 1; k++) {
        this.$set(
          this.rules,
          `queryColumnSelectValue[${k}]`,
          this.rules["queryColumnSelectValue[0]"]
        );
        this.$set(
          this.rules,
          `queryColumnSelectInput[${k}]`,
          this.rules["queryColumnSelectInput[0]"]
        );
      }
      this.$nextTick(() => {
        // 重置验证
        this.$refs["ruleForm"].resetFields();
      });
    },
    // 重置表单
    resetForm(formName = "ruleForm") {
      for (let p in this[formName]) {
        if (Array.isArray(this[formName][p])) {
          this[formName][p] = [];
        } else if (typeof this[formName][p] === "object") {
          this[formName][p] = {};
        } else {
          this[formName][p] = "";
        }
      }
      // 删除规则
    },
    submitForm(formName = "ruleForm", callback) {
      // 父组件调用提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提交给父组件
          this.validateInput(); // 上传值到父组件
        } else { 
          this.validateInput(); // 上传值到父组件 
          console.warn("error submit!!");
          return false;
        }
      });
    },

    addQueryColumn(v, index = 0) {
      // oracle 查询列添加选择框
      if (v) {
        // 控制添加列
        if (this.queryColumn.length >= this.queryColumnDeepOrigin.length) {
          return;
        }
        let temp = [];
        let _ = null;
        if (this.ruleForm.queryColumnSelectValue.length !== 0) {
          for (let k = 0; k <= this.queryColumnDeepOrigin.length - 1; k++) {
            _ = this.queryColumnDeepOrigin[k];
            if (!this.ruleForm.queryColumnSelectValue.includes(_.columnName)) {
              temp.push(_);
            }
          }
          this.queryColumn.push([...temp]);
        } else {
          this.queryColumn.push([...this.queryColumnDeepOrigin]);
        }
        this.$nextTick(() => {
          this.$refs["ruleForm"].validate();
        });
      } else {
        // 删除
        this.ruleForm.queryColumnSelectValue.splice(index, 1);
        this.ruleForm.queryColumnSelectInput.splice(index, 1);
        this.queryColumn.splice(index, 1);

        // 一次验证所有表单
        this.$refs["ruleForm"].validate();
        this.changeColumn("addQueryColumn");
      }
      this.$emit("showError", false);
    },

    changeColumn(value, index) {
      this.$emit("showError", false);

      if (value !== "addQueryColumn") {
        this.ruleForm.queryColumnSelectValue[index] = value;
        let tempSelect = [...this.ruleForm.queryColumnSelectValue]; // 克隆当前选择值
      }
      // @params : (value , index)
      if (!this.delectQueryColumn.includes(value)) {
        this.delectQueryColumn.push(value);
      }
      // 每次重置
      this.queryColumn.forEach((e, i) => {
        this.queryColumn[i] = JSON.parse(
          JSON.stringify(this.queryColumnDeepOrigin)
        );
      });
      /* * * *
       * 根据select选择值, 过滤每个selectOrigin 的值 ,select的长度和 this.queryColumn的长度一致
       */

      this.queryColumn.forEach((e, i) => {
        // 每次删除对应下标的值
        let tempSelect = [...this.ruleForm.queryColumnSelectValue]; // 克隆当前选择值
        tempSelect.splice(i, 1);
        for (let k = e.length - 1; k >= 0; k--) {
          let _e = e[k];
          if (tempSelect.includes(_e.columnName)) {
            e.splice(k, 1);
          }
        }
      });

      // 手动验证input
      /* * * * 单个表单验证 暂时有bug  改为删除和增加一次性验证  */
      for (let p in this.ruleForm.queryColumnSelectValue) {
        if (typeof this.ruleForm.queryColumnSelectValue[p] !== "undefined") {
          // 手动验证所有的select 对应的input的值
          this.$refs["ruleForm"].validateField(`queryColumnSelectInput[${p}]`);
        }
        // 如果用户选择了 picPath 出现 图片服务器地址
      }
     
      let showIsPicServer = this.ruleForm.queryColumnSelectValue.includes('picPath');
       // 通知父组件
      if(showIsPicServer) {
        this.$emit("showIsPicServer", true);
      }else{
         this.$emit("showIsPicServer", false);
      } 
    },

    validateInput(value, $event) {
      // 上传值到父组件
      // 返回父组件对象数据 {key:value}
      let emitObject = {};
        for (let index in this.ruleForm.queryColumnSelectValue) {
        let key = this.ruleForm.queryColumnSelectValue[index]; 
        let value =
          typeof this.ruleForm.queryColumnSelectInput[index] === "undefined"
            ? null
            : this.ruleForm.queryColumnSelectInput[index].trim();

        emitObject[key] = value === null  ? null: value.trim();
      }
      // 无论子组件是否验证通过都发送给父组件数据 
      this.$emit("selectExclusion", emitObject, this.queryColumn.length === this.ruleForm.queryColumnSelectValue.length);
    }
  }
};
</script>


 
<style scoped  lang='scss'>
#SelectExclusion {
  /deep/ .el-form-item .el-input__inner,
  /deep/ .el-form-item .el-input__inner:focus,
  /deep/ .el-form-item .el-textarea__inner,
  /deep/ .el-form-item .el-textarea__inner:focus {
    border-color: #dcdfe6;
  }

  /deep/ .el-form-item.is-error .el-input__inner,
  /deep/ .el-form-item.is-error .el-input__inner:focus,
  /deep/ .el-form-item.is-error .el-textarea__inner,
  /deep/ .el-form-item.is-error .el-textarea__inner:focus,
  /deep/ .el-message-box__input input.invalid,
  /deep/ .el-message-box__input input.invalid:focus {
    border-color: #f56c6c;
  }
  /deep/ .el-form-item--small.el-form-item {
  }
  /deep/ .el-form-item__content > .el-form-item__error {
    top: 100%;
    left: 0px;
  }
}
</style>
