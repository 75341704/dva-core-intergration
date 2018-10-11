// import dva from 'dva';
// import './index.css';
//
// // 1. Initialize
// const app = dva();
//
// // 2. Plugins
// // app.use({});
//
// // 3. Model
// // app.model(require('./models/example'));
//
// // 4. Router
// app.router(require('./router'));
//
// // 5. Start
// app.start('#root');
import React from 'react';

import App from './app';

import { Provider ,connect} from 'react-redux';
import { createStore ,combineReducers } from 'redux';
import ReactDOM from 'react-dom';

const todos=(state={},action) => {
  console.log('reducer: todos is called');
  switch (action.type) {
    case 'ADD_TODO':
      return {}
      break;
  }
  return state;
}
const store=createStore(combineReducers({todos}));
const App2=connect()(App);
ReactDOM.render(
  <Provider store={store} >
  <App2 />
  </Provider>,
  document.getElementById('root')
);//end ReactDOM;
