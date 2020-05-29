<template>
    <div class='pt-userCtrl'>
      <div v-if='showCtrl'>
        <span class='pt-userCtrl__name'>{{this.username}}</span>
          <el-dropdown>
            <i class='el-icon-arrow-down'></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >
                <div @click='doLogout'>
                  <i class='el-icon-bell'></i>
                  <span class='pt-userCtrl__logout'>退出登陆</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import * as login from '@/store/modules/login';
  export default {
    name: 'UserCtrl',
    components: {},
    data () {
      return {
        username: '',
        showCtrl: false
      };
    },
    watch: {},
    computed: {},
    mounted () {
      this.getUserInfo();
    },
    methods: {
      ...mapActions(login.MODULE_PATH, [
        login.actionTypes.DO_LOGOUT,
      ]),
      getUserInfo() {
        const username = localStorage.getItem("username");
        if(username) {
          this.username = username;
          this.showCtrl = true;
        } else {
          this.showCtrl = false;
        }
      },
      doLogout() {
        this[login.actionTypes.DO_LOGOUT]().then((data) => {
          localStorage.removeItem("username");
          if (data.code === 0) {
            this.$message({
              type: 'success',
              message: data.message,
            });
            this.showCtrl = false;
            this.$router.push('/home');
          } else {
            this.$message({
              type: 'error',
              message: data.message,
            });
          }
        }).catch((err) => {
          console.error(err);
        });
      }
    },
  };
</script>

<style lang='scss' >
  @include b(userCtrl){
    // position: relative;
    height: 20px;
    line-height: 20px;
    @include e(name){
      padding-right:4px;
      color: #52A6FF;
    }
    @include e(logout){
      margin-left:4px;
    }
    // @include e(triangle){
    //   @include css-triangle(#000, down);
    //   top:50%;
    //   right:0;
    // }
  }
</style>