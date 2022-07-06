<template>
  <div id="app" :class="['fd-main-body', { 'fd-pt0': !showHeader }]">
    <div class="fd-top-menu" v-if="showHeader">
      <ul id="navbar" class="fd-navbar-nav">
        <li
          @click="menuClick(item)"
          :class="{ active: active === item.key }"
          v-for="item in menuList"
          :key="item.key"
        >
          <router-link :to="'/' + item.key">
            <label>{{ item.name }}</label></router-link
          >
        </li>
        <!-- <li
          @click="active = 'calibrationMana'"
          :class="{ active: active === 'calibrationMana' }"
        >
          <router-link to="/mana/calibrationMana">
            <label>校准品管理</label></router-link
          >
        </li> -->
      </ul>
      <!-- <div class="fd-right-info">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-user el-icon--left"></i>
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="fd-exit-dropdown">

            <el-dropdown-item command="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div> -->
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showHeader: false,
      username: "UserName",
      // 展示菜单时菜单列表内容
      menuList: [
        {
          name: "仪器安装注册记录",
          key: "deviceRegister"
        }
        // ,
        // {
        //   name: "仪器安装注册记录",
        //   key: "123"
        // }
      ],
      active: "deviceRegister"
    };
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        this.showHeader =
          val.name !== "login" && val.name !== "NotFound" && val.name;
        // if (oldVal.name === "login") {
        // this.getLocalStorage();
        // }
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    this.showHeader =
      this.$route.name !== "login" &&
      this.$route.name !== "NotFound" &&
      this.$route.name;
    // this.getLocalStorage();
  },
  mounted() {
    this.menuList.forEach((menu) => {
      if (this.$route.path.indexOf(menu.key) !== -1) {
        this.active = menu.key;
      }
    });
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    /** 右侧下拉菜单点击事件
    val： goback 后台管理
          editPassword 修改密码
          exit 退出登录 **/
    handleCommand(val) {},
    // localStorage
    getLocalStorage() {
      this.username = window.localStorage.getItem("username");
    },
    /**
     * 菜单点击事件
     *
     * @param {object} menu 选中的菜单
     * */
    menuClick(menu) {
      console.log("$route", this.$route);
      this.active = menu.key;
      /* const newPath = this.$router.resolve({ path: "/" + menu.key });
      window.open(newPath.href);*/
      this.$router.push("/" + menu.key);
    }
  }
};
</script>

<style lang="less">

@import "./assets/css/index.less";
.fd-exit-dropdown {
  z-index: 15 !important;
}
.fd-main-body {
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 64px;
  background: @body-background;

  .fd-top-menu {
    width: 100%;
    height: 64px;
    background: @header-background url("~@/assets/images/header/logo.png") 35px
      center no-repeat;
    background-size: 150px;
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 214px;
    padding-right: 25px;
    z-index: 1;
    text-align: left;
    line-height: 64px;
    .fd-navbar-nav {
      padding-left: 50px;
      // height: 100%;
      // width: 100%;
      display: inline-block;
      line-height: 64px;
      li {
        display: inline-block;
        // width: 180px;
        margin: 0 10px;
        line-height: 62px;
        color: white;
        vertical-align: middle;
        padding: 0 10px;
        padding-bottom: 3px;
        label {
          color: white;
        }
        &:hover{
          label{
            color:rgb(181, 190, 219);
          }
          cursor: pointer;
          padding-bottom: 0;
          line-height: 62px;
          background-color: rgb(54, 79, 164);
          border-bottom: 3px solid white;
        }
        &.active {
          label{
            color:rgb(181, 190, 219);
          }
          cursor: pointer;
          padding-bottom: 0;
          line-height: 62px;
          border-bottom: 3px solid white;
        }
      }
      // li:focus,
      // li:hover,
      // li {
      //   color: #c0cafc !important;
      //   border-bottom: 4px solid #c0cafc !important;
      // }
    }
    .fd-left-menu {
      display: inline-block;
      border-left: 1px solid #fff;
      height: 15px;
      line-height: 15px;
      font-size: 0;

      span {
        display: inline-block;
        font-size: 16px;
        width: 85px;
        color: #999999;
        text-align: center;
        cursor: pointer;

        &.active {
          color: @primary-color;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
    .fd-right-info {
      float: right;
      height: 100%;
      line-height: 64px;
      font-size: 0;

      .fd-icon-export {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("~@/assets/images/icon/export.png") center no-repeat;
        background-size: 16px;
        vertical-align: middle;
        margin-right: 10px;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  .el-dropdown {
    color: #9eadbc;
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
