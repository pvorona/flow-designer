import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { calculateGeometry } from './calculateGeometry'

const flow = {
  type: 'flow',
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
  flow,
  componentsById: {
    1: { type: 'task' },
    2: { type: 'task' },
    3: { type: 'condition', leftId: 4, rightId: 5 },
    4: { type: 'condition', leftId: 7, rightId: 8 },
    5: { type: 'task' },
    6: { type: 'task' },
    7: { type: 'task' },
    8: { type: 'condition', leftId: 9, rightId: 10 },
    9: { type: 'condition', leftId: 15, rightId: 16 },
    10: { type: 'condition', leftId: 11, rightId: 12 },
    11: { type: 'task' },
    12: { type: 'condition', leftId: 13, rightId: 14 },
    13: { type: 'task' },
    14: { type: 'task' },
    15: { type: 'task' },
    16: { type: 'task' },
  },
  geometry: calculateGeometry(flow),
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
