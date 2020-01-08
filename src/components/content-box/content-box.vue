<template>
  <div class="content-box">
    <span class="title" :class="{titleHide:titleHide}">
    	<i class="l"></i>
    	{{title}}
    	<i class="r"></i>
    </span>
    <div class="content-wrap">
      <i class="l"></i>
      <i class="r"></i>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'content-box',
    props: {
      title: {
        type: String,
        default: ''
      },
      titleHide:{
        type: Boolean,
        default: true
      }
    },
    methods:{

    },
    mounted(){

    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";

  .content-box {
    width: 100%;
    height: auto;
    display: inline-block;
    text-align: center;
    position: relative;
    padding: 0 1px;
    box-sizing: border-box;
    .title {
      height: 32px;
      line-height: 32px;
      font-size: 16px;
      display: inline-block;
      padding: 0 5px;
      background-color: #024aa6;
      position: relative;
      z-index: 10;
      &::before, &::after {
        content: "";
        display: inline-block;
        width: 50px;
        height: 3px;
        background-color: #00deff;
        box-shadow: 0 0 15px #00deff;
        position: absolute;
        top: 50%;
        margin-top: -1px;
      }
      &::before {
        left: calc(100% + 60px);
      }
      &::after {
        right: calc(100% + 60px);
      }
      i {
        width: 12px;
        height: 100%;
        display: inline-block;
        position: absolute;
        background-repeat: no-repeat;
        background-size: auto;
      }
      .l {
        top: 0;
        left: -12px;
        background-image: url('../../assets/images/title-l.png');
        background-position: left bottom;
      }
      .r {
        bottom: 0;
        right: -12px;
        background-image: url('../../assets/images/title-r.png'); //设置title样式
        background-position: right top;
      }
    }
    .titleHide {
    	display: none;
      visibility: hidden;
    }
    .content-wrap {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      box-sizing: border-box;
      color:#fff;
      height: 100%;
      /*padding: .2rem 0;*/
      text-align: left;
      position: relative;
      /*border: 1px solid #0161a0;*/
      /*background-color: rgba(4, 47, 121, 0.4);*/
     /* i::before, i::after {
        content: "";
        display: inline-block;
        width: 2px;
        height: 2px;
        position: absolute;
        background-color: #00a2ff;
      }
      .l::before {
        top: -2px;
        left: -2px;
        border-right: 0;
        border-bottom: 0;
      }
      .l::after {
        bottom: -2px;
        left: -2px;
        border-right: 0;
        border-top: 0;
      }
      .r::before {
        top: -2px;
        right: -2px;
        border-left: 0;
        border-bottom: 0;
      }
      .r::after {
        bottom: -2px;
        right: -2px;
        border-left: 0;
        border-top: 0;
      }*/
    }
  }
</style>
