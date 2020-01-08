<template>
  <div class="cont">
    <div class="content-wrap">
      <routerBtn :routerdata="routerdata"></routerBtn>
      <!--<div>
          <button class="btn-save" v-if="$route.name=='onelyreport'"><i class="el-icon-document"></i>报表格式</button>
          <button class="btn-save"><i class="el-icon-search"></i>查询</button>
          <button class="btn-add"><i class="el-icon-refresh"></i>重置</button>
        </div>-->
      <div>
        <button class="btn-save opacity btn" @click="exportTableExcel" :disabled="disState"
                :class="{'no-btn':disState}"><em class="iconfont icon-daochu"></em>导出
        </button>
      </div>
    </div>
    <router-view ref="childReport"></router-view>
  </div>
</template>

<script>
  import routerBtn from 'components/router-btn/router-btn'

  export default {
    name: 'customreports',
    data() {
      return {
        routerdata: [
          {
            label: '统计自定义报表',
            path: 'statisticsreport'
          },
          {
	          label: '单一自定义报表',
	          path: 'onelyreport'
	        },
        ],
        disState: true, //无法点击
      }
    },
    components: {
      routerBtn
    },
    methods: {
      exportTableExcel() {
        //this.$debug && console.log(this.$route.name)
        if (this.$route.name == 'onelyreport') {
          //单一点击导出的时候需要在次请求一次接口
          this.$refs.childReport.exportTableData()  //在子级导出了
        } else if (this.$route.name == 'statisticsreport') {
        	//console.log(this.$refs.childReport)
        	this.$refs.childReport.exportTableData()
        	
        	//以前前端写的不兼容ie
//        var dom = document.querySelector('.el-table__fixed');
//        //因为在下载成execl的时候是有两个table的需要删除一个在往元素中添加
//        dom.remove();
//        //this.$debug && console.log(this.$refs.childReport.$refs.tableExecl.$el.innerHTML)
//        var HTML = this.$refs.childReport.$refs.tableExecl.$el.innerHTML;
//        //具体数据的加载 headerData
//        this.execlDownload(HTML, dom)
        }
      },
      base(s) {
        return window.btoa(unescape(encodeURIComponent(s)))
      },
      execlDownload(html, dom) {
        var worksheet = 'Sheet1';
        var uri = 'data:application/vnd.ms-excel;base64,';
        var template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
								<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
								<x:Name>${worksheet}</x:Name>
								<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->        </head><body>${html}</body></html>`;
        //下载模板
        window.location.href = uri + this.base(template);

        //添加删除的table
        if (dom) {
          setTimeout(() => {
            var parentDom = document.querySelector('.el-table');
            var childrenDom = document.querySelector('.el-table__column-resize-proxy');
            parentDom.insertBefore(dom, childrenDom)
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";

  .cont {
    /*margin: 0.2rem;*/
    .content-wrap {
      display: flex;
      justify-content: space-between;
    }
    .btn-add {
      cursor: pointer;
      background-color: rgba(11, 187, 255, 0.4);
      color: white;
      padding: .028rem 0.14rem;
      border: 1px solid #0C6CF2
    }
    .btn-save {
      margin-right: .14rem;
      cursor: pointer;
      /*padding: .028rem 0.28rem;*/
     padding:4px 28px;
    }
    .no-btn {
      cursor: not-allowed;
    }
  }
</style>
