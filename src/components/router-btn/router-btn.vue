<template>
  <div v-if="routerdata.length">
    <router-link v-for="(item,index) in routerdata" class="router-btn" tag="a" :to="{name:item.path}" :key="index">{{item.label}}</router-link>
  </div>
</template>

<script>
  export default {
    name: 'router-btn',
    props: {
      routerdata: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";

  .router-btn {
    color: $cl-txt;
    /*font-size: 0.154rem;
    padding: 0.046rem 0.35rem;*/
   	font-size:16px;
    padding:4.5px 35px;
    line-height:32px;
    margin-right: 0.21rem;
    text-align: center;
    border: 1px solid #0C6CF2;
    background-color: rgba(83, 147, 200, 0.3);
    &.active,&:hover {
      background-color: #0C6CF2;
    }

  }
  @media screen and (max-width: 1366px) {
	    .router-btn{
	    	font-size:12px;
	    }
	}

</style>
