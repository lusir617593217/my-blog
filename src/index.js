import React from 'react';
import ReactDOM from 'react-dom';
// 引入路由组件
import Router from './routers'
import '../src/index.css'
import { Provider } from 'react-redux'
import store from './store'

// 引入 antd 库样式
import 'antd/dist/antd.css'

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);

// serviceWorker.unregister();
