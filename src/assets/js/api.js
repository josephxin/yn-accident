import { TIMEOUT, ERR_OK, STATUS } from './config'
import axios from 'axios'
import qs from 'qs'
import { handleChinese, BIloading } from '@/assets/js/tools'
import store from '../../store'
// axios 配置   prod  测试的ip   dev  开发的ip
const instance = axios.create({
	//timeout: TIMEOUT,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	},
	withCredentials:true  
})
// 请求拦截器
instance
	.interceptors
	.request
	.use((config) => {
		config.showLoading == 'show' && BIloading.show()
		/*if(config.url != window.baseUrl1 + '/auth/token'){
			if(store.state.token){
				config.headers.common["token"] = store.state.token
			}
		}*/
		if(config.method === 'post') {
			//config.data = qs.stringify(config.data)
			return config
		}
		// 采用完全自定义的方式书写 get 的请求时，将 post请求中放在 data 里面的数据，放到 params当中
		if(config.method === 'get' && config.data && Object.keys(config.data).length) {
			
			config.params = qs.parse(config.data)
			return config
		}

		if(config.method === 'get') {
			return config
		}
	}, (error) => {
		return Promise.reject(error)
	})
// 添加响应拦截器
instance
	.interceptors
	.response
	.use((response) => {
		//console.log(response);
		response.config.showLoading == 'show' && BIloading.hidde()
		if(response[STATUS] === ERR_OK) {
			return response
		} else {
			//   window.top.location.href = 'http://220.163.82.253:9200/jzpt/index.html#/login'
			// 接口异常返回
			const flag = parseInt(response[STATUS])
			const msg = flag === 201 ? '201 error: Missing parameter' : flag === 202 ? '202 error: Parameter is malformed' : flag === 500 ? '500 error: Background error' : flag === '501' ? '501 error: No data' : flag === '502' ? '502 error: Session expired' : 'Unknown error'
			console.error('接口异常返回', msg)
			if(flag == 401){
				window.top.location.href = 'http://220.163.82.253:9200/jzpt/index.html#/login'
			}
			return Promise.reject(response)
		}
	}, (err) => {
		BIloading.hidde()
		console.error('Request failed')
		return Promise.reject(err)
	})

const api = {
	post(config) {
		return new Promise((resolve, reject) => {
			instance
				.post(`${config.url}`, config.params, {
					showLoading: config.showLoading || 'show'
				})
				.then(res => resolve(res.data))
				.catch(err => reject(err))
		})
	},
	get(config) {
		return new Promise((resolve, reject) => {
			instance
				.get(`${config.url}`, {
					params: config.params,
					showLoading: config.showLoading || 'show'
				})
				.then((res => resolve(res.data)))
				.catch(err => reject(err))
		})
	}
}
export default api