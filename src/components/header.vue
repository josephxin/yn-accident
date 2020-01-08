<template>
  <div class="header-wrap">
    <div class="header-title-wrap">
      <i class="iconfont icon-shiguchuli"></i>
      <span>事故管理</span>
    </div>
    <div class="mask"></div>
    <div>
      <ul>
        <!-- tag="li" 可以设定 router-link生成什么样的页面元素 -->
        <router-link v-for="(item,index) in navdata" class="item" tag="li" :to="{name:item.url}" :key='index'>
          <i v-if="item.icon" :class='item.icon'></i>{{item.label}}
        </router-link>
      </ul>
    </div>

  </div>

</template>

<script type="text/javascript">

  export default {
    // name:'header',
    props: {
      navdata: {
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

  .header-wrap {
  	display: flex;
    width: 100%;
    /*height: 0.42rem;
    line-height: 0.42rem;*/
   	height: .40rem;
    line-height: .40rem;
    
    font-size: 0.18rem;
    background-color: #052260;
    .header-title-wrap {
    	display:flex;
    	justify-content: center;
    	align-items: center;
      cursor: default;
      width: 1.68rem;
      text-align: center;
      background-color: #083899;
      i{
      	margin-right: .1rem;
      }
    }
    .mask {
      height: 0;
      border-top: .42rem solid #083899;
      border-right: .35rem solid transparent;
    }
    .icon-shiguchuli{
    	font-size:.3rem;
    }
    ul {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      li {
        color: $cl-txt;
        padding: 0 .2rem;
        cursor: pointer;
        font-size:0.18rem;
        &.active,&:hover {
          color: #EBB161
        }
      }
    }
  }
@media screen and (max-width: 1366px) {
   .header-wrap{
   		height: 30px;
   		line-height: 30px;
   }
}
</style>

