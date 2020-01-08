<template>
  <div class="cont">
    <routerBtn :routerdata="routerdata"></routerBtn>
    <router-view></router-view>
  </div>
</template>

<script>
  import routerBtn from 'components/router-btn/router-btn'

  export default {
    name: 'detail',
    data(){
      return{
        routerdata: [
          { label: '事故信息', path: 'information' },
          { label: '卷宗档案', path: 'dossiers' }
        ]
      }
    },
    mounted(){

    },
    methods:{

    },
    components:{
      routerBtn
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";

  .cont {
    margin: 0;
    padding: 0;
  }

</style>
