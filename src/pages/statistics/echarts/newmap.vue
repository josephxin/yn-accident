<template>
	<div class="content-class">
		<div class="chart-wrap" ref="mapContainer"></div>
		<div class="bg"></div>
		<div class="total"><span>总数</span><span>{{accidentNum}}</span></div>
		<div class="legend-show">
			<div class="legend-item" v-for="(item, index) in tags">
				<span :style="`background-color:${Accidentcolors[index]}`"></span>
				<span>{{item}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		name: 'newmap',
		props: {
			mapSet: {
				type: Object,
				default() {
					return {}
				}
			},
			accidentNum: {
				type: Number,
				default() {
					return 0
				}
			}
		},
		data() {
			return {
				tags: ['一般', '较大', '重大', '特别重大'],
				Accidentcolors: ['#4effe8', '#f0fb3f', '#ff7011', '#ff006c'],
				levelMap: {
					large: 2, // 重大
					major: 1, // 较大事故
					more: 3, // 特别事故
					commonly: 0 // 一般事故
				},
				option: {},
				result: {},
				myChart: null,
				isInit: true,
				windowSize: document.documentElement.clientWidth,
			}
		},
		computed: {
			chageSize() {
				window.addEventListener('resize', () => {
					this.windowSize = document.documentElement.clientWidth
				})
				return this.windowSize
			}
		},
		watch: {
			mapSet: {
				handler: function(val, oldVal) {
					this.$nextTick(() => {
						//this.$debug && console.log(this.isInit)
						if(this.isInit) {
							this.isInit = false
							this.initoption()
						}
						this.changeDataOption()
					})
				},
				deep: true //增加deep 观察对象的子对象变化
			},
			chageSize: {
				handler: function(val, oldVal) {
					this.myChart && this.myChart.resize();
				}
			},
		},
		methods: {
			initoption() {
				this.myChart = this.$echarts.init(this.$refs.mapContainer)
				this.myChart.on('click', params => {
					//this.$debug && console.log(params)
					if(params.componentType == 'series') {
						let pdata = params.data
						if(pdata) {
							this.$emit('mapcallback', pdata)
						}
					}
				})
			},
			changeDataOption() {
				let tooltip = {
						trigger: 'item',
						backgroundColor: 'rgba(16, 11, 64, 0.8)',
						padding: 15,
						formatter: function(d) {
							if(d.componentType === 'markPoint') {
								let m = d.data.msg
								let html = ''
								if(m.more) {
									html += `<br>特别重大事故:&nbsp;&nbsp;&nbsp;${`${m.more} 起`.fontsize(4).fontcolor('#f0fb3f')}`
								}
								if(m.large) {
									html += `<br>重大事故:&nbsp;&nbsp;&nbsp;${`${m.large} 起`.fontsize(4).fontcolor('#f0fb3f')}`
								}
								if(m.major) {
									html += `<br>较大事故:&nbsp;&nbsp;&nbsp;${`${m.major} 起`.fontsize(4).fontcolor('#f0fb3f')}`
								}
								if(m.commonly) {
									html += `<br>一般事故:&nbsp;&nbsp;&nbsp;${`${m.commonly} 起`.fontsize(4).fontcolor('#f0fb3f')}`
								}
								if(html) {
									return `${m.name}${html}`
								}
							}
						}
					},
					visualMap = {
						min: 0,
						max: 1000,
						calculable: true,
						hoverLink: true,
						inRange: {
							color: ['#00f7ff', '#0034CE'],
						},
						left: '19%',
						bottom: '1%',
						itemWidth: 10,
						itemHeight: 80,
						align: 'left',
						textStyle: {
							color: '#12ffff'
						}
					},
					series = [{
						type: 'map',
						mapType: 'map',
						roam: true, //地图是否可以缩放
						aspectScale:1.5,
						zoom:1,
						label: {
							show: true,
							normal: {
								show: true,
								color: 'rgba(255, 255, 255, 1)',
								fontSize: 12,
								position:'bottom',
								formatter:(params) => {
									/*if(params.name.length > 4){
										return  "\n\n\n" + params.name.substring(0,4) + "\n" + params.name.substring(4)
									}else {
										return "\n" + params.name
									}*/
									return "\n\n" + params.name
								},
							},
							emphasis: {
								show: true,
								color: 'rgba(255, 255, 255, 1)',
								fontSize: 15
							}
						},
						itemStyle: {
							normal: {
								areaColor: '#00f7ff',
								borderColor: '#0153D4',
								borderWidth: 1
							},
							emphasis: {
								areaColor: '#ff7011'
							}
						},
						layoutCenter: ['50%', '45%'],
						layoutSize:name === '云南省' ? '100%' : 'auto',
						//layoutCenter: ['50%', '50%'],
						//layoutSize:'100%',
						data: [],
						markPoint: {
							itemStyle: {
								normal: {
									shadowBlur: 10,
									shadowColor: '#333',
									opacity: 1
								},
								emphasis: {
									shadowBlur: 10,
									shadowColor: '#333',
									opacity: 1
								}
							},
							symbol: 'circle',
							symbolSize: 10,
							symbolOffset: [0, '-100%'],
							data: []
						},
						silent: false
					}]
				this.option = {
					tooltip: tooltip,
					visualMap: visualMap,
					series: series
				}
				let name = this.mapSet.mapData.area
				let jsonNameMap = {
					'云南省': 'yunnan',
					'临沧市': '530900',
					'丽江市': '530700',
					'保山市': '530500',
					'大理白族自治州': '532900',
					'德宏傣族景颇族自治州': '533100',
					'怒江傈僳族自治州': '533300',
					'文山壮族苗族自治州': '532600',
					'昆明市': '530100',
					'昭通市': '530600',
					'普洱市': '530800',
					'曲靖市': '530300',
					'楚雄彝族自治州': '532300',
					'玉溪市': '530400',
					'红河哈尼族彝族自治州': '532500',
					'西双版纳傣族自治州': '532800',
					'迪庆藏族自治州': '533400',
					'all': 'yunnan'
				}
				axios.get(`./static/json/${jsonNameMap[name]}.json`).then(res => {
					//console.log(res)
					this.$echarts.registerMap('map', res.data)
					this.result = res.data

					let max = Math.max(...this.mapSet.mapData.data.map(t => {
						return t.value
					}))
					let min = Math.min(...this.mapSet.mapData.data.map(t => {
						return t.value
					}))
					let visualMap = this.option.visualMap,
						series = this.option.series[0]

					visualMap.min = min
					visualMap.max = max

					let s = this.mapSet.mapData.data
					let len = s.length
					for(let i = 0; i < len; i++) {
						let m = s[i]
						series.data.push({
							name: m.name,
							value: m.value,
							areacode: m.code,
							rank: m.rank,
							msg: m
						})
					}
					let point = this.option.series[0].markPoint
					point.data = []
					let _markData = this.mapSet.markData
					let markLen = _markData.length
					let markData = []
					for(let i = 0; i < markLen; i++) {
						let t = _markData[i]
						if(t.name) {
							markData.push({
								name: t.name,
								// coord: t.coord,
								value: t.value,
								level: this.levelMap[t.maxType],
								commonly: t.commonly,
								_data: t._data,
								more: t.more,
								major: t.major,
								large: t.large
							})
						}
					}

					for(let i = 0; i < markLen; i++) {
						let m = markData[i]
						let area = this.result.features.find(t => {
							return t.properties.name === m.name
						})
						point.data.push({
							name: m.name,
							coord: area ? area.properties.cp : [],
							msg: m,
							itemStyle: {
								normal: {
									color: this.Accidentcolors[m.level]
								},
								emphasis: {
									shadowColor: this.Accidentcolors[m.level]
								}
							}
						})
					}
					// 第二个参数，是否不跟之前设置的option进行合并，默认为false，即合并。
					//console.log(this.option)
					this.myChart.setOption(this.option, {
						notMerge: true
					})
				})
			}
		},
		mounted() {
			//解决修改代码时，地图消失的问题
			this.$nextTick(() => {
				if(JSON.stringify(this.mapSet)!='{}'){
					this.initoption()
					this.changeDataOption()
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/lib-variable";
	@import "~assets/css/lib-mixin";
	.content-class {
		height: 100%;
		width: 100%;
		position: relative;
		overflow: hidden;
		.total {
			position: absolute;
			/*right: 0;
			top: 15%;*/
			right:0;
    		top: 3%;
			color: #00f9ff;
			/*z-index: 3;*/
		}
		.total span:first-child {
			font-size: .24rem;
			margin-right: .2rem;
		}
		.total span:last-child {
			font-size: .56rem;
			letter-spacing: 4px;
		}
		.chart-wrap {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 2;
		}
		.bg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-image: url('../../../assets/images/circle-big.png'), url('../../../assets/images/circle-small.png');
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
		}
	}
	
	.legend-show {
		position: absolute;
		bottom: 15px;
		left: 50%;
		transform: translate(-50%, 0);
		display: flex;
		align-items: center;
		width: 40%;
		height: 0.0224rem;
		margin: 0 auto;
		z-index: 0;
	}
	
	.legend-item {
		flex: 1;
		height: .14rem;
		display: flex;
	}
	
	.legend-item span {
		display: block;
		line-height: .14rem;
	}
	
	.legend-item span:nth-child(2) {
		flex: 1;
	}
	
	.legend-item span:nth-child(1) {
		width: .14rem;
		height: .14rem;
		margin-right: 0.014rem;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		border-radius: 50%;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		border: 1px solid #fff;
		display: inline-block;
	}
</style>