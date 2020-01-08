import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index' //vuex

import statistics from '../pages/statistics/statistics'
import managelist from '../pages/managelist/managelist'
import detail from '../pages/managelist/detail'
import information from '../pages/managelist/detailinfo/information'
import dossiers from '../pages/managelist/detailinfo/dossiers'
import accidentlist from '../pages/managelist/accidentlist'
import customreports from '../pages/customreports/customreports'
import onelyreport from '../pages/customreports/onely-report'
import statisticsreport from '../pages/customreports/statistics-report'
import home from '../pages/home/home'
import dataSource from '../pages/dataSource/dataSource'

Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/', //路由默认跳转
			redirect: 'statistics'
		},
		{
			path: '/statistics',
			name: 'statistics',
			component: statistics,
			meta: {
				title: '事故统计'
			}
		},
		{
			path: '/home',
			name: 'home',
			component: home,
			redirect: 'home/managelist',
			children: [{
					path: 'managelist',
					name: 'managelist',
					component: managelist,
					meta: {
						title: '事故调查处理'
					},
					redirect: 'managelist/accidentlist',
					children: [{
							path: 'accidentlist',
							name: 'accidentlist',
							component: accidentlist
						},
						{
							path: 'detail',
							name: 'detail',
							component: detail,
							redirect: 'detail/information',
							children: [{
									path: 'information/:baseId/:infoId',
									name: 'information',
									component: information,
									meta: {
										title: '事故信息'
									}
								},
								{
									path: 'dossiers/:baseId/:infoId',
									name: 'dossiers',
									component: dossiers,
									meta: {
										title: '卷宗档案'
									}
								}
							]
						}
					]
				},
				{
					path: 'customreports',
					name: 'customreports',
					component: customreports,
					meta: {
						title: '自定义报表'
					},
					redirect: 'customreports/statisticsreport',
					children: [{
							path: 'onelyreport',
							name: 'onelyreport',
							component: onelyreport,
							meta: {
								title: '单一自定义报表'
							}
						},
						{
							path: 'statisticsreport',
							name: 'statisticsreport',
							component: statisticsreport,
							meta: {
								title: '统计自定义报表'
							}
						}
					]
				},
				{
					path: 'dataSource',
					name: 'dataSource',
					component: dataSource,
					meta: {
						title: '直报系统数据导入'
					},
				}
			]
		}

	],
	linkActiveClass: 'active'
})

const arrFor = (need, userArr) => {
	let allJurisdiction = {
		'statistics': '8988943b67402ef101674e265fba0052', //事故统计
		'accidentlist': '8988943b67402ef101674e2b6e130054', //事故调查处理
		'information': '8988943b67402ef101674e2b6e130054', //事故调查处理(事故信息)
		'dossiers': '8988943b67402ef101674e2b6e130054', //事故调查处理(卷宗档案)
		'onelyreport': '8988943b67402ef101674e2baeb20056', //自定义报表(单一自定义)
		'statisticsreport': '8988943b67402ef101674e2baeb20056', //自定义报表(统计自定义)
		'dataSource': '8988943b67402ef101674e2bff510058' //直报系统数据导入
	}
	let flag = false;
	/*userArr.forEach((item, i) => {
		if(item.permissionId == allJurisdiction[need]) {
			flag = true;
			console.log('这是路由跳转',item)
			return ;
		}
	})*/
	for(let i = 0;i< userArr.length;i++){
		if(userArr[i].permissionId == allJurisdiction[need]) {
			flag = true;
			//console.log('这是路由跳转',userArr[i])
			break;
		}
	}
	return flag;
}

/* 路由拦截器 */
router.beforeEach((to, from, next) => {
	//当前登录人有的权限 'null'=>null
	//先加载路由在加载app
	//console.log(store.state.isLocal)
	//console.log(to,from)
	//
	if(store.state.isLocal) {
		next()
	} else {
		let userJurisdiction = JSON.parse(sessionStorage.getItem('permission')) ? JSON.parse(sessionStorage.getItem('permission')) : []
		var bool = arrFor(to.name, userJurisdiction)
		//console.log(bool)
		if(bool) {
			next()
		} else {
			next(false)
		}
	}
})

export default router