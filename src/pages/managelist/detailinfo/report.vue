<template>
	<div class="report">
		<div class="upload-accident">
			<div class="upload-accident-title">{{name}}</div>
			<div class="upload-accident-btn">
				<i class="iconfont icon-shangchuan fl"></i>
				<el-upload class="upload-file opacity fl" :action="uploadUrl" :data="uploadData" :accept="accept" :show-file-list="false" :before-upload="beforeFileUpload" :on-success="handleFileSuccess" :with-credentials="true">
					<span>新增附件上传</span>
				</el-upload>
			</div>
		</div>
		<div class="attachment">
			<div class="upload-accident-title">附件内容：</div>
			<transition-group class="attachment-content" tag="div" name="slide">
				<div class="item fl" v-for="(item, index) in list" :key="item.id">
					<img class="fl" src="../../../assets/images/pdf.png" v-if="item.tag=='pdf'" />
					<img class="fl" src="../../../assets/images/word.png" v-if="item.tag=='word'" />
					<img class="fl" src="../../../assets/images/excel.png" v-if="item.tag=='excel'" />
					<img class="fl" src="../../../assets/images/img.png" v-if="item.tag=='img'" />
					<img class="fl" src="../../../assets/images/audio.png" v-if="item.tag=='audio'" />
					<img class="fl" src="../../../assets/images/video.png" v-if="item.tag=='video'" />
					<div class="item-info fl">
						<p class="item-name" :title="item.name">{{item.name}}</p>
						<p class="item-date">{{item.date}}</p>
						<p class="item-btn">
							<a class="preview opacity" :href="downloadUrl + '?filePath=' + item.url + '&attachmentName=' + item.name" target="_blank">下载</a>
							<span class="delete opacity" @click="deleteFile(item.id, item.url, index)">删除</span></p>
					</div>
				</div>
			</transition-group>
		</div>
	</div>
</template>

<script>
	//import { baseURL } from '@/assets/js/config'

	export default {
		props: {
			list: {
				type: Array
			},
			name: {
				type: String
			},
			type: {
				type: String
			},
			accept: {
				type: String
			},
			uploadData: {
				type: Object
			},
		},
		data() {
			return {
				uploadUrl: window.baseURL + '/fileArchive/upload',
				downloadUrl: window.baseURL + '/fileArchive/download',
				documentType: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf'],
				imgType: [],
				audioType: [],
				videoType: [],
			}
		},
		methods: {
			handleFileSuccess(res, file) {
				//this.$debug && console.log(res, file);
				if(res && res.code == 0) {
					this.$message.success('附件上传成功!');
					//调用父组件获取列表接口
					this.$parent.dossiersList()
				} else {
					this.$message.error('附件上传失败!');
				}
			},
			beforeFileUpload(file) {
				//this.$debug && console.log(file, this.type);
				var isSupport = false;
				var isSize = false;

				switch(this.type) {
					case 'document':
						isSupport = this.documentType.indexOf(file.type) != -1;
						isSize = file.size / 1024 / 1024 <= 20;
						if(!isSupport) {
							this.$message.error('上传文件的格式只支持pdf、word、excel');
						}
						if(!isSize) {
							this.$message.error('上传文件的大小不能超过 20MB');
						}
						break;
					case 'img':
						isSupport = file.type.indexOf('image/') != -1;
						isSize = file.size / 1024 / 1024 <= 20;
						if(!isSupport) {
							this.$message.error('只能上传图片文件');
						}
						if(!isSize) {
							this.$message.error('上传图片的大小不能超过 20MB');
						}
						break;
					case 'audio':
						isSupport = file.type.indexOf('audio/') != -1;
						isSize = file.size / 1024 / 1024 <= 200;
						if(!isSupport) {
							this.$message.error('只能上传音频文件');
						}
						if(!isSize) {
							this.$message.error('上传音频的大小不能超过 200MB');
						}
						break;
					case 'video':
						isSupport = file.type.indexOf('video/') != -1;
						isSize = file.size / 1024 / 1024 <= 500;
						if(!isSupport) {
							this.$message.error('只能上传视频文件');
						}
						if(!isSize) {
							this.$message.error('上传视频的大小不能超过 500MB');
						}
						break;
					default:
						isSupport = true;
						isSize = true;
						break;
				}

				return isSupport && isSize;
			},
			//删除文件
			deleteFile(id, url, index) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					lockScroll: false,
				}).then(() => {
					//调接口
					this.$xhr.deleteFile({
						id: id,
						path: url
					}).then(res => {
						this.$debug && console.log('删除文件:', res)
						if(res == 0 || res == 2) { //2为文件不存在，但数据库也要删除
							//删除成功后，改变视图
							this.list.splice(index, 1)
							this.$message.success('删除成功!');
						} else if(res == 1) {
							this.$message.error('删除失败!');
						}
					})
				}).catch(() => {
					this.$message.info('取消删除!');
				});
			},
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/lib-variable";
	@import "~assets/css/lib-mixin";
	.report {
		padding-top: .25rem;
	}
	
	.upload-accident,
	.attachment {
		display: flex;
	}
	
	.upload-accident {
		.upload-accident-btn {
			flex: 1;
			margin-left: 0.05rem;
			line-height: .24rem;
			color: $cl-brown;
			.upload-file {
				margin-left: 0.05rem;
				cursor: pointer;
				span {
					text-decoration: underline;
				}
			}
		}
	}
	
	.attachment {
		position: relative;
		margin-top: .25rem;
		.attachment-content {
			flex: 1;
			margin-left: 0.05rem;
			.item {
				width: 2.3rem;
				margin-right: .84rem;
				margin-bottom: .26rem;
				img{
					display: block;
					width: .68rem;
				}
				.item-info {
					width: 1.47rem;
					margin-left: 0.15rem;
					padding-top: 0.03rem;
					color: $color-light-blue;
					font-size:.14rem;
					
					.item-date{
						font-size:.14rem;
					}
					.item-name {
						font-size:.14rem;
						@include no-wrap;
					}
					.item-btn {
						.preview {
							color: $cl-brown;
							text-decoration: underline;
							cursor: pointer;
							font-size: .14rem;
						}
						.delete {
							margin-left: .1rem;
							color: $cl-pink;
							text-decoration: underline;
							cursor: pointer;
							font-size: .14rem;
						}
					}
				}
			}
		}
	}
	
	.upload-accident-title {
		width: 2.6rem;
		text-align: right;
		color: $color-light-blue;
	}
</style>