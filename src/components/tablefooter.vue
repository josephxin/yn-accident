<template>
    <div>
      <ul>
        <li v-for="num in nums">{{num}}</li>
      </ul>
    </div>
</template>

<script>
  export default {
    name: 'tablefooter',
    data(){
      return{
        nums:10
      }
    },
    props:{
      pagenum:{
        type:Number,
        default(){
          return 0
        },
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";
  div{
    margin: 0;
    padding: 0;
    width: 100%;
    ul li{
      list-style: none;
      margin: 0 .4rem;
      border: 1px solid #0C6CF2;
      padding: 0 0.4rem;
      float: left;
      &:hover{
        border-color: #EBB161;
        color: #EBB161;
      }
    }
  }

</style>
