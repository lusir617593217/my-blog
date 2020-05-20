// 引入 redux 模块
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
// 引入中间件
import promiseMiddleware from 'redux-promise'
import thunkMiddleware from 'redux-thunk'

import collapsed from './reducer/collapsed'
import listData from './reducer/listData'
import routerValue from './reducer/routerValue'

// state 的初始状态
// const initState = {
//   collapsed: false,
//   listData: [],
//   routerValue: ''
// }

// reduce：建立 action 与 state 的连接，也是唯一修改 state 的地方
// const reducer = (state = initState, action) => {
//   const newState = { ...state }

//   switch (action.type) {
//     case 'change_collapsed':
//       newState.collapsed = action.collapsed
//       return newState

//     case 'get_list_data':
//       newState.listData = action.listData
//       return newState

//     case 'router_value':
//       newState.routerValue = action.routerValue
//       return newState

//     default:
//       return state
//   }
// }

// 拆分单独的 reducer
const reducer = combineReducers({
  collapsed,
  listData,
  routerValue
})

// 创建 store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(promiseMiddleware, thunkMiddleware)
))

// 导出 store
export default store
