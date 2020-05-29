<template>
  <div class="json-dialog">
    <el-dialog
      :visible="visible"
      :close-on-click-modal="true"
      :before-close="handleClose"
      width="800px"
      top="3vh"
      v-dialogDrag
    >
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-for="typeName in productTypeList"
          :lazy="true"
          :label="typeName"
          :key="typeName"
          :name="typeName"
        >
          <h3 style="height:300px;" v-if="!jsonData">目前无数据可展示</h3>
          <json-viewer
            v-else
            :value="jsonData"
            :expand-depth="5"
            copyable
            boxed
            sort
          ></json-viewer>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepCopy } from "@/utils/object";
import JsonViewer from "vue-json-viewer";
import API from "@/apiService/api/product";
const PRODUCT_TYPE_LIST = [
  "SENSECITY_KAFKA",
  "SENSEFACE_KAFKA",
  "VIPER_KAFKA",
  "SENSELINK",
];

export default {
  name: "JSONDialog",
  props: ["visible"],
  components: {
    JsonViewer,
  },
  data() {
    return {
      productTypeList: PRODUCT_TYPE_LIST,
      activeName: PRODUCT_TYPE_LIST[0],
      jsonData: null,
    };
  },
  watch: {
    activeName(value) {
      this.fetchData(value);
    },
    visible(value) {
      if (value) {
        this.fetchData(this.activeName);
      }
    },
  },
  methods: {
    // 关闭表单
    fetchData(type) {
      API.getShow({ productType: type }).then((resp) => {
        let jsonObj = {
          name: "dsdsjdsa",
          age: 232,
          href: "http://10.9.334.44/wwekw/jdsjsnr.jpg",
          list: [
            {
              hobby: "drawing",
              number: 200,
              url: "http://www.baidu.com",
            },
            {
              hobby: "drawing",
              number: 200,
              url: "http://www.baidu.com",
            },
          ],
        };
        this.jsonData = resp.data;
        //this.jsonData = jsonObj;
      });
    },
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.json-dialog {
  .el-dialog__header {
    display: none;
  }
}
</style>
