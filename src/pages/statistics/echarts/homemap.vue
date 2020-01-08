<template>
	<div class="content-class">
		<div class="chart-wrap" ref="mapContainer"></div>
		<div class="bg"></div>
		<div class="total"><span>总数</span><span>10</span></div>
		<div class="legend-show">
			<div class="legend-item" v-for="(item, index) in tags">
				<span :style="`background-color:${Accidentcolors[index]}`"></span>
				<span>{{item}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import MapChart from './map'

	export default {
		name: '',
		props: {
			mapSet: {
				type: Object,
				default: function() {
					return {}
				}
			},
			curTotal: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				levelMap: {
					large: 2, // 重大
					major: 1, // 较大事故
					more: 3, // 特别事故
					commonly: 0 // 一般事故
				},
				seriesData: [],
				mapName: [],
				tags: ['一般', '较大', '重大', '特别重大'],
				Accidentcolors: ['#4effe8', '#f0fb3f', '#ff7011', '#ff006c'],

			}
		},
		methods: {
			updateMapData(val, flag) { // flag:0,查询;1,点击(不需要变更地图)
				this.$debug && console.log('查询')
				let me = this
				let _data = val.mapData.data
				let len = _data.length
				let OnData = []
				for(let i = 0; i < len; i++) {
					let t = _data[i]
					if(t.name) {
						OnData.push({
							name: t.name,
							value: t.value ? t.value : 0
						})
					}
				}

				me.map.seriesData = OnData
				let _markData = val.markData
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
							large: t.large,
							// accidentId: t.accidentId
						})
					}
				}
				me.map.markData = markData
				let name = ''
				switch(val.mapData.area) {
					case null:
						name = '云南省'
						break
					case '全市':
						name = '云南省'
						break
					case 'allcity':
						name = '云南省'
						//            name = '云南省all'
						break
					default:
						name = val.mapData.area
				}
				me.total = val.total
				// me.preMonth = val.preMonth
				me.map.render(name)
				me.map.resize()
			},
			initChart() {
				let me = this
				me.map = new MapChart({
					_domElement: me.$refs.mapContainer,
					colors: me.Accidentcolors,
					tipCallBack: function(d) {
						if(d.componentType === 'markPoint') {
							this.$debug && console.log('dddd', d)
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
				})
				me.map.on('click', (d) => {
					// 返回给父组件的方法showDetail,返回参数包含accidentId,startDate,endDate
					if(d.componentType === 'series') {
						me.$emit('showDetail', d)
					}
				})
			}
		},
		mounted() {
			this.initChart()
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
			right: 15%;
			top: 15%;
			color: #00f9ff;
		}
		.total span:first-child {
			font-size: 1.2rem;
		}
		.total span:last-child {
			font-size: 4rem;
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
			width: 80%;
			height: 80%;
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
		bottom: 5%;
		left: 50%;
		transform: translate(-50%, 0);
		display: flex;
		align-items: center;
		width: 40%;
		margin: 0 auto;
		height: 0.16rem;
		z-index: 0;
	}
	
	.legend-item {
		flex: 1;
		height: 1rem;
		display: flex;
	}
	
	.legend-item span {
		display: block;
		line-height: 1rem;
	}
	
	.legend-item span:nth-child(2) {
		flex: 1;
	}
	
	.legend-item span:nth-child(1) {
		width: 1rem;
		height: 1rem;
		margin-right: 0.1rem;
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