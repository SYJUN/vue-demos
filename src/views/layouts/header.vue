<template>
  <el-header height="115px" class="header">
    <div class="first-nav-container">
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-blue header-title">
            <h1 title="多米亿"><a href="#">多米亿</a></h1>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content menu-center">
            <el-menu
              :default-active="activeFirstMenu"
              mode="horizontal"
              @select="onMenuSelect"
              background-color="#0E63E4"
              text-color="#fff"
              active-text-color="#ffd04b"
              :router="true"
            >
              <el-menu-item
                v-for="(item, index) in navList"
                :key="index"
                :index="item.path"
                :route="item"
                >{{ item.label }}</el-menu-item
              >
            </el-menu>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-blue header-right">
            <el-dropdown>
                <span>{{ username }} <i class="el-icon-caret-bottom"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>更改密码 </el-dropdown-item>
                  <el-dropdown-item @click.native="onLogOut()">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="second-nav-container">
      <el-menu :router="true" mode="horizontal">
        <el-menu-item
          :class="{ 'is-sub-active': item.path === activeSecondMenu }"
          v-for="(item, index) in currentNavList"
          :key="index"
          :index="item.path"
          :route="item"
        >
          <span>{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-header>
</template>

<script>
import * as _ from "lodash";
import { mapActions } from 'vuex';

export default {
  name: "LayoutHeader",
  data() {
    const { auth } = this.$store.state;
    const username = auth.currentUser ? auth.currentUser.username : '';
    const navList = [
      {
        path: "/my-site",
        name: "mySite",
        label: "我的地盘",
        subList: [
          { path: "/home", name: "home", label: "首页" },
          { path: "/schedule", name: "schedule", label: "日程" }
        ]
      },
      {
        path: "/product",
        name: "product",
        label: "产品",
        subList: [
          { path: "/computer", name: "computer", label: "电脑" },
          { path: "/phone", name: "phone", label: "手机" }
        ]
      }
    ];

    return {
      username,
      navList,
      currentNavList: []
    };
  },
  methods: {
    ...mapActions('auth', ['logOut']),
    onMenuSelect(index) {
      const currentRouter = _.find(this.navList, item => item.path === index);
      if (currentRouter) {
        this.currentNavList = currentRouter.subList;
      }
    },
    onLogOut() {
      this.logOut().then(() => {
        this.$router.push('/login');
      });
    }
  },
  computed: {
    activeFirstMenu() {
      const route = this.$route;
      const { meta, path } = route;

      const currentRouter = _.find(this.navList, item => _.startsWith(route.path, item.path));
      if (currentRouter) {
        this.currentNavList = currentRouter.subList;
      }

      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }

      return `/${_.split(path, "/")[1]}`;
    },

    activeSecondMenu() {
      const route = this.$route;
      const { meta, path } = route;

      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return `/${_.split(path, "/")[2]}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  color: #333;
  padding: 0;
  background-color: #99a9bf
}

.first-nav-container {
  width: 100%;
  height: 55px;
  line-height: 55px;
}
.menu-center{
  display: flex;
  justify-content: center;
  background-color: #0e63e4
}

/* 二级菜单 */
.second-nav-container {
  width: 100%;
  height: 55px;
  line-height: 55px;
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-bottom: 1px solid #ddd;

  .el-menu--horizontal {
    > .el-menu-item {
      border: none;
      
      &.is-active {
        border: none;
        color: unset;
      }
      
      &.is-sub-active{
        font-weight: bold;
        color: #303133;
      }
    }
  }
}

.header-right {
  text-align: right;
  font-size: 12px;
  height: 55px !important;

  span {
    color: #fff;
  }
}

.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-blue {
  background: #0e63e4;
  color: #fff;
  line-height: 55px;
}
.header-title h1 {
  max-width: 150px;
  margin: 0;
  overflow: hidden;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
  text-align: center;
}
.header-title h1 a {
  color: #fff;
  text-decoration: none;
  line-height: 55px;
}

.el-menu.el-menu--horizontal {
  border-bottom: 1px solid transparent;
  & > .el-menu-item {
    height: 55px;
    line-height: 55px;
  }
}
.grid-content .el-menu--horizontal > .el-menu-item.is-active {
  background-color: #024edb !important;
  font-weight: bold;
  color: #fff !important;
  border-bottom-color: #024edb !important;
}
.grid-content {
  border-radius: 0px;
  min-height: 55px;
}
</style>
