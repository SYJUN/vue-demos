<template>
  <el-header class="header">
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>{{username}}</span>
  </el-header>
</template>

<script>
export default {
  name: 'LayoutHeader',
  data() {
    const username = this.$store.state.auth.currentUser ? this.$store.state.auth.currentUser.username : '';

    return {
      username,
    };
  },
}
</script>

<style lang="scss" scoped>
.header {
  // width: 100%;
  // display: block;
  text-align: right; 
  font-size: 12px;
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
</style>
