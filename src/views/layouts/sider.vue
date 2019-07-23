<template>
  <el-container style="width: 200px; flex: initial;">
    <el-aside width="200px" style="background-color: #fff;">
      <el-menu :default-active="activeMenu" :router="true">
        <el-menu-item v-for="(item, index) in navList" :key="index" :index="item.path" :route="item">
          <i :class="item.icon"></i> <span>{{item.label}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: 'SiderNav',
  data() {
    const navList = [
      { path: '/home1', name: 'home1', label: '首页1', icon: 'el-icon-menu' },
      { path: '/dashboard1', name: 'dashboard1', label: '报表1', icon: 'el-icon-tickets' },
      { path: '/home2', name: 'home2', label: '首页2', icon: 'el-icon-menu' },
      { path: '/dashboard2', name: 'dashboard2', label: '报表2', icon: 'el-icon-tickets' },
      { path: '/home3', name: 'home3', label: '首页3', icon: 'el-icon-menu' },
      { path: '/dashboard3', name: 'dashboard3', label: '报表3', icon: 'el-icon-tickets' },
      { path: '/home', name: 'home', label: '首页', icon: 'el-icon-menu' },
      { path: '/dashboard', name: 'dashboard', label: '报表', icon: 'el-icon-tickets' },
    ];
    return {
      navList,
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  border-right: solid 1px #e6e6e6;
  overflow-x: hidden;
}

.el-menu {
  border-right: none;
}
</style>
