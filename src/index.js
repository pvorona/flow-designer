import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { calculateGeometry } from './calculateGeometry'
import { normalize } from './normalize'

const root = {
  type: 'sequence',
  components: [
   {
     type: 'task',
     id: 1,
   }, {
     type: 'task',
     id: 2,
   },
  //    3
  //  4   5
  // 7 8
  {
    type: 'condition',
    id: 3,
    left: {
      type: 'condition',
      id: 4,
      left: {
        type: 'task',
        id: 7,
      },
      right: {
        type: 'condition',
        id: 8,
        left: {
          type: 'condition',
          id: 9,
          left: { type: 'task', id: 15 },
          right: { type: 'task', id: 16 },
        },
        right: {
          type: 'condition',
          id: 10,
          left: { type: 'task', id: 11 },
          right: {
            type: 'condition',
            id: 12,
            left: { id: 13, type: 'task' },
            right: { id: 14, type: 'task' },
          },
        },
      },
    },
    right: {
      type: 'task',
      id: 5,
    },
  },
  // {
  //   type: 'task',
  //   id: 6,
  // }
  ],
}
const initialState = {
  root,
  componentsById: normalize(root),
  geometry: calculateGeometry(root),
}

const store = createStore((a) => a, initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
