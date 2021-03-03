<template>
  <div id="vue-admin-beautiful">
    <a-config-provider>
      <router-view />
    </a-config-provider>
  </div>
</template>
<script>

  export default {
    name: 'App',
    data() {
      return {}
    },
  }
</script>
<style lang="less">
  @import '~@/styles/vab.less';
</style>
