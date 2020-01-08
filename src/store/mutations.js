import * as types from './mutation-types'

export default {
  [types.SET_THEME](state, cls) {
    state.themeCls = cls
  },
  [types.SET_STATUS](state, cls) {
    state.status = cls
  },
  [types.SET_SPARAMS](state, valdata) {
    state.statisicsGolistparam = valdata
  },
  changeAccidentList(state, data){
  	state.accidentList = data
  },
  changeIsLocal(state, bool){
  	state.isLocal = bool
  },
  changeToken(state,str){
  	state.token = str
  }
}
