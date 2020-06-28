<template>
  <div>
    <el-table stripe border :data="data">
      <template v-for="(col, index) of cols">
        <el-table-column
          v-if="col.show"
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          align="center"
        />
      </template>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'MyTable',
  data() {
    return {
      data: [
        { name: '砂进口的', age: 253 }
      ],
      cols: [
        { prop: 'name', label: '名称', show: true }
      ]
    }
  },
  methods: {
    remove(row) {}
  }
}
</script>
