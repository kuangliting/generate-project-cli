<template>
  <div id="app">
    <el-container>
      <el-aside >
        <aside-menu></aside-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from '@/components/AsideMenu';

export default {
  name: 'app',
  components: {
    AsideMenu,
  },
};
</script>

<style lang='scss' scoped>
  #app{
    height:100%;
      .el-container{
      height:100%;
      .el-aside{
        width: $--aside-width !important;
        background: $--aside-bg-color;
      }
      .el-main{
        padding: 0; 
      }
    }
  }
</style>
