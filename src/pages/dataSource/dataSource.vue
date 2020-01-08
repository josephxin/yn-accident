<template>
	<div class="data_source">
		<div class="data_source_upload">
			<span>上传文件:</span>
			<span class="dsu_name">{{fileName}}</span>

			<el-upload ref="upload" class="upload-file" :action="uploadUrl" :accept="accept" :auto-upload="false" :show-file-list="false" :before-upload="beforeFileUpload" :on-success="handleFileSuccess" :on-progress="handleProgress" :on-change="handleChange" :with-credentials="true" :on-error="handleError">
				<el-button class="btn" slot="trigger" size="small">
					<i class="iconfont icon-xuanzewenjian"></i>
					<span>选择文件</span>
				</el-button>
				<el-button class="btn" style="margin-left: .1rem;" size="small" @click="submitUpload">
					<i class="iconfont icon-xuanzewenjian1"></i>
					<span>上传</span>
				</el-button>
			</el-upload>
		</div>
		<div class="data_source_exhibition">
			<p>请上传EXCEL格式的文件，其他格式文件会上传失败!</p>
			<div>导入记录</div>
			<hr style="border: none;border-top: 1px solid #0C6CF2;display: block;width: 100%;">
		</div>
		<div class="table-wrap table_data_source">
			<el-table :data="tableData" stripe  header-align="center" border>
				<el-table-column type="index" :index='xuhao' label="序号" align="center" width="70" :resizable="false"></el-table-column>

				<el-table-column :prop="item.prop" :label="item.label" :width="item.width" :resizable="false" v-for="(item,i) in tableProp" header-align="center" align="center" :key="i"></el-table-column>

				<el-table-column label="状态" align="center" width="200" :resizable="false">
					<template slot-scope="props">
						<span :class="{'error-column': props.row.status!='2' && props.row.status!='5'}">{{props.row.statusText}}</span>
					</template>
				</el-table-column>

				<el-table-column label="操作" align="center" width="70" :resizable="false">
					<template slot-scope="scope">
						<span class="caozuo" @click="handleEdit(scope.$index, scope.row)">{{JSON.stringify(scope.row) !='{}' ? '删除': ''}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="footer-wrap">
			<el-pagination layout="prev, pager, next, jumper, total" @current-change="handleCurrentChange" :current-page.sync="contentData.pageNum" :page-size="contentData.pageSize" :total="contentData.totalCount">
				<!--slot-->
				<!--<span class="sure">确定</span>-->
			</el-pagination>
		</div>
	</div>
</template>
<script>
	//import { baseURL } from '@/assets/js/config'
	import { BIloading } from '@/assets/js/tools'

	export default {
		components: {},
		data() {
			return {
				uploadUrl: window.baseURL + '/uploadExcel/uploadBack',
				accept: '.xls,.xlsx',
				documentType: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
				fileName: '',
				fileList: [],
				tableData: [],
				tableProp: [{
					prop: "fileName",
					label: "文件名称",
					width: ''
				}, {
					prop: "creator",
					label: "上传人",
					width: ''
				}, {
					prop: "uploadTime",
					label: "上传时间",
					width: 300
				}, {
					prop: "exportTime",
					label: "导入时间",
					width: 300
				}],
				contentData: {
					pageNum: 1, //当前页数，支持 .sync 修饰符
					pageSize: 10, //每页显示条目个数，支持 .sync 修饰符
					totalCount: 1, //总数
				},
				reallyIndex:0
			}
		},
		computed: {

		},
		watch: {

		},
		methods: {
			xuhao(index){
				if(index >= this.reallyIndex){
					return '';
				}else{
					return index + 1
				}
			},
			submitUpload() {
				if(this.fileName) {
					this.$refs.upload.submit();
					//BIloading.show()
				} else {
					this.$message('请选择文件')
				}
			},
			handleChange(file, fileList) {
				console.log('选择文件', file, fileList);
				if(fileList.length > 0) {
					this.fileName = file.name;
				}
				//每次选择文件都会触发，为了上传文件之前做判断，只上传最后一个文件
				this.fileList = fileList;
			},
			handleProgress(e, file, fileList) {
				console.log('文件上传时', e, file, fileList);
				
			},
			handleFileSuccess(res, file) {
				//console.log('文件上传成功',res, file);
				//BIloading.hidde()
				if(res && res.code == 200) {
					this.$message.success('上传成功!');
				} else {
					this.$refs.upload.abort(file);
					BIloading.hidde()
					this.fileName = '';
					this.$refs.upload.clearFiles();
					this.$message.error(res.message);
				}
				//获取列表接口
				this.getPageList()
				this.fileName = '';
				this.$refs.upload.clearFiles();
				BIloading.hidde()
			},
			handleError(err, file, fileList){
				console.log('文件上传失败',err,file,fileList)
				this.$refs.upload.abort(file);
				BIloading.hidde()
			},
			beforeFileUpload(file) {
				//只上传文件列表中最后一个文件
				if(file.uid != this.fileList[this.fileList.length - 1].uid) {
					return false;
				}
				var reg = /[^\.]+/;
				var houzhu =  file.name.replace(reg,'')
				var isSupport = this.documentType.indexOf(file.type) != -1;
				let flag = true
				if(!isSupport || (houzhu !='.xls' && houzhu != '.xlsx')) {
					flag = false
					this.$message.error('上传文件的格式只支持excel');
					this.$refs.upload.abort(file);
					BIloading.hidde()
				}else{
					BIloading.show()
				}
				return flag;
			},
			//删除操作
			handleEdit(indx, row) {
				//console.log(indx, row)
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					lockScroll: false,
				}).then(() => {
					//调接口
					this.$xhr.deleteDataSource({
						id: row.id
					}).then(res => {
						this.$debug && console.log('数据源-文件删除', res)
						if(res.code == 0) {
							this.getPageList()
						}
					})
				}).catch(() => {
					this.$message.info('取消删除!');
				});

			},
			//当前页
			handleCurrentChange(val) {
				//console.log("当前页", val)
				this.contentData.pageNum = val
				this.getPageList()
			},
			getPageList() {
				this.$xhr.pageList({
					pageNum: this.contentData.pageNum,
					pageSize: this.contentData.pageSize
				}).then(res => {
					this.$debug && console.log('数据源-文件列表', res)
					if(res.code == 0) {
						let list = res.content.list ? res.content.list : []
						list.forEach((item, index) => {
							let status = item.status
							switch(status) {
								case '0':
									item.statusText = '文件上传失败'
									break;
								case '1':
									item.statusText = '文件上传成功，读取失败'
									break;
								case '2':
									item.statusText = '文件上传成功，待导入'
									break;
								case '3':
									item.statusText = '读取失败'
									break;
								case '4':
									item.statusText = '读取成功，导入失败'
									break;
								case '5':
									item.statusText = '导入成功'
									break;
							}
						})
						this.tableData = list
						this.contentData.totalCount = res.content.totalCount
						
						this.reallyIndex=this.tableData.length
						if(this.tableData.length < 10 && this.tableData.length >0){
							var index = 10-this.tableData.length;
							for(var i = 0; i<index;i++){
								var obj = {}
								this.tableData.push(obj)
							}
						}
					}
				})
			},
		},
		created() {
			this.getPageList()
		},
		mounted() {

		},
		beforeDestroy() {

		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/lib-variable";
	@import "~assets/css/lib-mixin";
	.error-column {
		color: #FF4D51;
	}
	
	.data_source {
		/*margin: 0 .2rem;*/
		.data_source_upload {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			>span {
				/*font-size: .15rem;*/
				font-size:.16rem;
			}
			.btn_choice,
			.btn_upload {
				padding: 0 .2rem;
				height: .32rem;
			}
			.btn_choice {
				margin-right: .2rem;
			}
			.dsu_name {
				min-width: 2.6rem;
				max-width: 8.6rem;
				height: .32rem;
				line-height: .32rem;
				padding: 0 .1rem;
				border-radius: .07rem;
				background: rgba(11, 187, 255, 0.3);
				margin-left: .1rem;
				margin-right: .2rem;
				color: #F0F2F7;
				@include no-wrap;
			}
		}
		.data_source_exhibition {
			>p {
				margin-left: .8rem;
				color: #FF4D51;
				font-size: .12rem;
			}
			>div {
				/*margin-top: .2rem;
				margin-bottom: .1rem;*/
				margin: 15px 0;
				font-size:.16rem;
			}
		}
		.table-wrap {
			margin-top: .2rem;
			/*border: 1px solid #2158ab;*/
		}
		.caozuo {
			cursor: pointer;
			color: #EBB161
		}
		.footer-wrap {
			color: #b8d7ff;
			margin-top: 0.21rem;
			display: flex;
			justify-content: flex-end;
			text-align: center;
			line-height: 0.35rem
		}
	}
	
	
	@media screen and (max-width: 1366px) {
	    .data_source{
	    	.data_source_upload{
	    		>span {
					font-size:12px;
				}	
	    	}
	    	.data_source_exhibition {
				>div {
					font-size:12px;
				}
			}
	    }
	}
</style>