import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import store from './store'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
     <App />
  </Provider>,
);

// import ReactDOM from 'react-dom'
// import './index.css'
// import App from './App'
// import store from './store'
// import { Provider } from 'react-redux'



// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// )
