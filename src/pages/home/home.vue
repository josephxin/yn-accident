<template>
	<div class="cont-wrap">
		<contentBox style="height: auto">
			<!--style="margin: 0 .2rem"-->
			<div>
				<div class="header_router">
					<div class="el-fragment-wrap">
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item :to="{ path: '/'}">事故管理</el-breadcrumb-item>
							<el-breadcrumb-item v-for="(item,index) in routerpath" :to="{ path:item.path}" :key='index'>{{item.label}}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<div v-if="$route.name=='information' || $route.name=='dossiers'">
						<button class="btn btn-save opacity" @click="getAccidentDynamicData"><em
              class="iconfont icon-shigubaogaotiaochayuchuli"></em>事故动态
            </button>
					</div>
					<div v-else-if="$route.name!='onelyreport' && $route.name!='statisticsreport' && $route.name!='dataSource'">
            <button class="btn btn-save opacity" @click="exportExecle"><em class="iconfont icon-daochu"></em>导出</button>
          </div>
				</div>
				<!--margin: 0.2rem 0-->
				<hr style="border: none;border-top: 1px solid #0C6CF2;width: 100%;margin: 15px 0">
			</div>
			
			<dialog-accident-dynamic :list="accidentList"></dialog-accident-dynamic>
			
			<router-view ref="execleChildren"></router-view>
		</contentBox>
	</div>
</template>

<script type="text/javascript">
	import { mapState } from "vuex";
	import theme from 'components/theme/theme'
	import contentBox from 'components/content-box/content-box'
	import dialogAccidentDynamic from 'components/dialoglayout/dialogAccidentDynamic'

	export default {
		name: 'home',
		components: {
			theme,
			contentBox,
			dialogAccidentDynamic,
		},
		data() {
			return {
				routerpath: []
			}
		},
		computed: {
			...mapState(['accidentList']),
		},
		watch: {
			'$route': {
				handler: function(val, oldVal) {
					//this.$debug && console.log('lu you:', val)
					if(val.matched) {
						this.changeRouterShow(val.matched)
					}
				},
				// 深度观察监听
				deep: true
			}
		},
		methods: {
			changeRouterShow(arr) {
				this.routerpath = []
				arr.forEach(item => {
					let obj = {}
					if(item.meta.title) {
						obj.path = item.path
						obj.label = item.meta.title
						this.routerpath.push(obj)
					}
				})
			},
			exportExecle() {
				if(this.$route.name == 'accidentlist') {
					//事故处理列表
					this.$refs.execleChildren.$children[0].exportExecleAjax()
					//this.$debug && console.log(this.$refs.execleChildren,)
				}
			},
			getAccidentDynamicData() {
				//this.$debug && console.log(this.$route);
				this.$root.dialogAccidentDynamic = true
				let baseId = this.$route.params.baseId
				this.$xhr.selectSg({
					'accidentId': baseId
				}).then(data => {
					//this.$debug && console.log('getAccidentDynamicData', data)
					if(data.code == 0) {
						this.$store.commit('changeAccidentList', data.content)
					} else {
						this.$message(data.message)
					}
				}).catch(err => {
					this.$debug && console.log(err)
				})
			},
		},
		mounted() {
			//this.$debug && console.log(this.$route)
			this.changeRouterShow(this.$route.matched)
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/lib-variable";
	@import "~assets/css/lib-mixin";
	.cont-wrap {
		/*padding: 0;*/
		/*margin: .14rem;*/
		padding: 20px 30px;
		height: 100%;
		background-color: rgba(4, 47, 121, 0.4);
		.btn-save {
			cursor: pointer;
			padding: 0 0.20rem;
			/*line-height: .3rem;*/
			line-height: .29rem;
			em {
				margin-right: 4px;
			}
		}
		.header_router {
			display: flex;
			justify-content: space-between;
			align-items: center
		}
	}
@media screen and (max-width: 1366px) {
	.cont-wrap{
		padding: 20px;
	}
}
</style>