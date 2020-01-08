<template>
  <div class="cont">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'managelist',
    data() {
      return {
        routerdata: [
          { label: '今日', path: 'today' },
          { label: '本周', path: 'currentweek' },
          { label: '本月', path: 'currentmonth' }
        ],
        routerpath: []
      }
    },
    methods: {},
    components: {
    }

  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";

  .cont {
    /*margin: .14rem;*/
    padding: 0;
  }
</style>
