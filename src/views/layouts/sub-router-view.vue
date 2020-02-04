<template>
  <section>
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="$route.path" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    data() {
      return {};
    },
  }
</script>

<style lang="scss" scoped>
</style>