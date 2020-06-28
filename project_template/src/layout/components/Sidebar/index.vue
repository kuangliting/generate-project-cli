<template>
  <div :class="{'has-logo':false}">

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { constantRoutes } from '@/router'
export default {
  components: { SidebarItem },
  data() {
    return {
      permission_routes: constantRoutes
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),

    activeMenu() {
      const route = this.$route
      const { meta, path } = route

      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },

    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
