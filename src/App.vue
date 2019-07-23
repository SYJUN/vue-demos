<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import appConfig from './app.config';

export default {
  metaInfo: {
    base: { target: '_blank', href: '/' },
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    },
  },
}
</script>

<style lang="scss" module>
@import "./assets/scss/design/index";

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background: $color-body-bg;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#app {
  @extend .typography-small;
}

// ===
// Base element styles
// ===
a,
a:visited {
  color: $color-link-text;
}

h1 {
  @extend .typography-xxlarge;
}
h2 {
  @extend .typography-xlarge;
}
h3 {
  @extend .typography-large;
}
h4 {
  @extend .typography-medium;
}
h5,
h6 {
  @extend .typography-small;
}

// ===
// Vendor
// ===
#nprogress .bar {
  background: $color-link-text;
}

</style>
