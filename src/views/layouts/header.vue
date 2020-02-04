<template>
  <el-header height="100px" class="header">
    <div class="first-nav-container">
      <el-menu :default-active="activeFirstMenu"
               background-color="#2a76e8"
               text-color="#94c1f9"
               active-text-color="#fff"
               :router="true" mode="horizontal" @select="onMenuSelect">
        <el-menu-item v-for="(item, index) in navList" :key="index" :index="item.path" :route="item">
          <span>{{item.label}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="second-nav-container">
      <el-menu :default-active="activeSecondMenu"
               background-color="#fff"
               text-color="#333"
               active-text-color="#000"
               :router="true" mode="horizontal" @select="onMenuSelect">
        <el-menu-item v-for="(item, index) in currentNavList" :key="index" :index="item.path" :route="item">
          <span>{{item.label}}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-header>
</template>

<script>
  import * as _ from 'lodash';

  export default {
    name: 'LayoutHeader',
    data() {
      const username = this.$store.state.auth.currentUser ? this.$store.state.auth.currentUser.username : '';
      const navList = [
        {
          path: '/my-site',
          name: 'mySite',
          label: '我的地盘',
          subList: [
            { path: '/home', name: 'home', label: '首页' },
            { path: '/schedule', name: 'schedule', label: '日程' },
          ],
        },
        {
          path: '/product',
          name: 'product',
          label: '产品',
          subList: [
            { path: '/computer', name: 'computer', label: '电脑' },
            { path: '/phone', name: 'phone', label: '手机' },
          ],
        },
      ];
  
      return {
        username,
        navList,
        currentNavList: [],
      };
    },
    methods: {
      onMenuSelect(index) {
        const currentRouter = _.find(this.navList, item => item.path === index);
        if (currentRouter) {
          this.currentNavList = currentRouter.subList;
        }
      },
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
        
        return `/${_.split(route.path, '/')[1]}`;
      },
  
      activeSecondMenu() {
        const route = this.$route;
        const { meta, path } = route;
  
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return `/${_.split(route.path, '/')[2]}`;
      },
    },
  }
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    color: #333;
    padding: 0;
  }
  
  .first-nav-container {
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
  
  .second-nav-container {
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
</style>
