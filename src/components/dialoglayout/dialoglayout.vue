<template>
  <div class="container-box dialog-wrap">
    <el-dialog :title="dTitle" :visible.sync="isshow" :width="width" center>
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script>
  import ContentBox from '../content-box/content-box'

  export default {
    name: 'dialoglayout',
    components: {
      ContentBox
    },
    data() {
      return {
        isshow: false
      }
    },
    props: {
      showvalue: {
        type: Boolean,
        default() {
          return false
        }
      },
      dTitle: {
        type: String,
        default() {
          return '提示'
        }
      },
      width: {
        type: String,
        default() {
          return '30%'
        }
      },
      type: {
        type: [String, Array]
      }
    },
    watch: {
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";

  .container-box {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    .btn-save {
      margin-right: 1rem;
      background-color: rgba(11, 187, 255, 0.7);
      color: white;
      padding: .2rem 1rem;
      border: 1px solid #0C6CF2;
    }
    .btn-cancle {
      margin-right: 1rem;
      background-color: #061D37;
      color: white;
      padding: .2rem 1rem;
      border: 1px solid #0C6CF2;
      &:hover {
        background-color: rgba(11, 187, 255, 0.7);
      }
    }
  }
</style>
