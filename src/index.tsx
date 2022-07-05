import ReactDOM from 'react-dom'
import MyRouter from './router'
import { Provider } from 'react-redux';
import store from 'store';
import './base.less';	// 引入antd的样式

ReactDOM.render(
  <Provider store={store}>
    <MyRouter />
  </Provider>,
  document.getElementById("root")
)