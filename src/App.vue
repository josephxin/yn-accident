<template>
	<div id="app" ref="app">
		<HeaderWrap :navdata="navdata" v-if="login"></HeaderWrap>
		<router-view v-if="login" />
		<div class="error" v-if="!login">
			<div class="error_conter">
				当前用户没有权限获取菜单
			</div>
		</div>
	</div>
</template>

<script>
	import HeaderWrap from 'components/header.vue'
	import { mapGetters,mapState } from 'vuex'
	import contentBox from 'components/content-box/content-box'
	import divline from 'components/divline'
	import { BIloading2} from '@/assets/js/tools'

	export default {
		name: 'app',
		//导入getters取得state放入计算属性中
		computed: {
			...mapGetters(['themeCls']),
			...mapState(['isLocal','token'])
		},

		data() {
			return {
				navdata: [],
				routerpath: [],
				login: false
			}
		},
		created() {
			BIloading2.show()
			this.windowResizeHandler();
			window.addEventListener('resize', this.windowResizeHandler, false);
			window.addEventListener("orientationchange", this.windowResizeHandler, false);
			var iframeUrl = decodeURIComponent(window.location.href); //到时打开解码
			if(iframeUrl.indexOf("?") > -1 && iframeUrl.indexOf('token') > -1) { //权限 在本地看没有权限接口
				var token = '';
				if(iframeUrl.split('token=')[1].indexOf('#/') > -1) {
					token = iframeUrl.split('token=')[1].split('#/')[0];
				} else {
					token = iframeUrl.split('token=')[1];
				}
				localStorage.setItem("token", token)
				this.$store.commit('changeIsLocal', false) //判断不是本地环境有token  传入fasle
				//this.$store.commit('changeToken',token)
				//调接口
				this.$xhr.getSgYnPingtaiLogin({
					"token": token
				}).then(res => {
					//res.status //res.code== '200'
					//console.log('登录成功后的',res)
					//console.log('处理后的数据',JSON.parse(res.data).data)
					if(res && res.code== '200') {
						//console.log(res) //JSON.parse(res.data).data
						let resData = JSON.parse(res.data).data
						sessionStorage.setItem('permission', JSON.stringify(resData.permission))
						sessionStorage.setItem('loginData', JSON.stringify(resData))
						if(resData.permission && resData.permission.length>0) {
							this.login = true
							var arr = [];
							resData.permission.map((item, i) => {
								switch(item.permissionId) {
									case "8988943b67402ef101674e265fba0052":
										arr[0] = {
											label: '事故统计',
											url: 'statistics'
										};
										break;
									case "8988943b67402ef101674e2b6e130054":
										arr[1] = {
											label: '事故调查处理',
											url: 'managelist'
										};
										break;
									case "8988943b67402ef101674e2baeb20056":
										arr[2] = {
											label: '自定义报表',
											url: 'customreports'
										};
										break;
									case "8988943b67402ef101674e2bff510058":
										arr[3] = {
											label: '直报系统数据导入',
											url: 'dataSource'
										};
										break;
									default:
										break;
								}

							})
							this.navdata = this.removeEmptyArrayEle(arr)
							//console.log(this.navdata)
							this.$router.push({
								name: this.navdata[0].url
							})
						} else {
							//console.log(res)
							this.login = false
						}
					} else {
						this.login = false
						console.error(res.message)
					}
					setTimeout(() => {
						BIloading2.hidde()
					}, 1000)
				})
				
			} else {
				BIloading2.hidde()
				//本地查看  打包时需要注释掉啊。。。
				this.login = true
				this.$store.commit('changeIsLocal', true)//是本地环境传入true
				this.navdata = [
					{
						label: '事故统计',
						url: 'statistics'
					},
					{
						label: '事故调查处理',
						url: 'managelist'
					},
					{
						label: '自定义报表',
						url: 'customreports'
					},
					{
						label: '直报系统数据导入',
						url: 'dataSource'
					}
				]
				this.$router.push({
					name: this.navdata[0].url
				})
			}
		},
		mounted() {

		},
		watch: {

		},
		methods: {
			removeEmptyArrayEle(arr) { //去除数组中的空的数值
				for(var i = 0; i < arr.length; i++) {
					if(arr[i] == undefined) {
						arr.splice(i, 1);
						i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
						// 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
					}
				}
				return arr;
			},
			windowResizeHandler() {
				const fullWidth = 1920;
				const domElement = document.querySelector('html');

				let innerWidth = window.innerWidth < 1500 ? 1500 : window.innerWidth;
				const scale = innerWidth / fullWidth;

				window._scaler = scale;
				window._scale = scale;
				domElement.style.fontSize = Math.round(100 * scale) + "px";
				window._fontSize = Math.round(100 * scale);
				//console.log(scale, domElement.style.fontSize);
			}
			// setTheme() {
			//   const target = this.$refs.app
			//   const localStorageCls = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'red'
			//   target.className = this.themeCls ? 'theme-' + this.themeCls
			//     : `theme-${localStorageCls}`
			// },
		},
		components: {
			HeaderWrap,
			contentBox,
			divline
		}
	}
</script>

<style lang="scss" scoped>
	@import "assets/css/lib-variable";
	@import "assets/css/lib-mixin";
	#app {
		min-height: 100%;
		overflow: hidden;
		.error {
			width: 700px;
			height: 500px;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			.error_conter {
				text-align: center;
				font-size: 18px;
				margin-top: 80px;
				color: #FFFFFF;
			}
		}
	}
</style>