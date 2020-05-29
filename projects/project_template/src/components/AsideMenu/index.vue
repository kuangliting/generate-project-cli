<template>
  <div class="pt-nav">
    <!-- logo -->
    <div class="pt-nav__logo">
      <img class="logo" src="@/assets/img/logo.png" alt="商汤" />
      <div style="text-align:left;margin-left:23px;">
        <h3>接口适配网关 <span style="font-size:14px;">v2.0</span></h3>
        <h2>推送工具</h2>
      </div>
    </div>
    <!-- tabs -->
    <div class="pt-nav__tabs">
      <el-menu router :default-active="activeTab">
        <el-menu-item
          v-for="(tab, index) in tabs"
          :index="tab.to"
          :key="index"
          :disabled="tab.disabled"
        >
          <i :class="tab.icon"></i>
          <span>{{ tab.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "AsideMenu",
  components: {},
  data() {
    return {
      tabs: [
        // {
        //   name: "database",
        //   icon: "el-icon-upload",
        //   to: "/database",
        //   disabled: false,
        // },
        {
          name: "产品 ",
          icon: "el-icon-s-platform",
          to: "/product",
          disabled: false,
        },
        {
          name: "方案 ",
          icon: "el-icon-s-cooperation",
          to: "/solution",
          disabled: false,
        },
        {
          name: "任务 ",
          icon: "el-icon-s-flag",
          to: "/task",
          disabled: false,
        },
      ],
      activeTab: "",
    };
  },
  watch: {
    $route() {
      this.tabFresh();
    },
  },
  computed: {},
  mounted() {
    this.tabFresh();
  },
  methods: {
    tabFresh() {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].to === this.$route.path) {
          this.activeTab = this.tabs[i].to;
          break;
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "./index";
@include b(nav) {
  padding-top: 20px;
  // logo 区域
  @include e(logo) {
    margin-top: 10px;
    text-align: center;
    // 图片
    .logo {
      width: 70%;
    }
    .toolname {
      // font-size: 18px;
      // font-weight: 400;
    }
  }
  // @include e(tabs){
  //   // background: blue;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: left;
  //   .tab{
  //     padding:5px 30px;

  //     height:$--tab-height;
  //     line-height:$--tab-height;
  //     &:hover{
  //       cursor: pointer;
  //       background: $--tab-bg-color-hover;
  //     }
  //     .icon{

  //       font-size: 16px;
  //     }
  //     .name{
  //       display:inline-block;
  //       padding-left:10px;
  //       width:75%;
  //       font-size:16px;
  //     }
  //     .line{
  //       width:100%;
  //       padding-left:10px;
  //       transition:all .3s;
  //       @include when(active){
  //         width: 100%;
  //         height:3px;
  //         background: $--line-color-active;
  //         animation: line .5s
  //       }
  //     }
  //   }
  // }
  // @include keyframes(line){
  //   from {
  //     width: 0px;
  //     opacity: 0;
  //   }
  //   to {
  //     width: 90%;
  //     opacity: 1;
  //   }
  // }
  .el-menu {
    border: 0;
    background-color: $--aside-bg-color;
  }

  .el-submenu .el-menu-item {
    min-width: 180px;
  }
}
</style>
