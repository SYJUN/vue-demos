<template>
  <el-container ref="container" class="container">
<!--    <sider-nav />-->

    <el-container direction="vertical">
      <LayoutHeader />
      <el-main class="main">
        <app-main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import SiderNav from './sider';
import LayoutHeader from './header';
import AppMain from './AppMain';

export default {
  components: {
    // SiderNav,
    LayoutHeader,
    AppMain
  },
  data() {
    return {
      clientHeight: '',
    };
  },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight = document.documentElement.clientHeight;
    let timer = null;
    window.addEventListener('resize', () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        this.clientHeight = document.documentElement.clientHeight;
      }, 300);
    });
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight() {
      this.changeFixed(this.clientHeight);
    },
  },
  methods: {
    changeFixed(clientHeight) {
      this.$refs.container.$el.style.height = clientHeight - 20 + 'px';
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  overflow: hidden;
}

.main {
  // height: calc(100% - 60px);
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #ededed;
}
</style>
