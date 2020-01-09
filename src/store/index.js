// import { createStore } from 'redux';
// import incrementReducer from './reducers/index';

// const store = createStore(incrementReducer);

// export default store;

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import defaultReducer from './reducers/index';
import createSagaMiddleware from 'redux-saga'
import { watchIncrementAsync } from '../sagas/index'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(defaultReducer, applyMiddleware(sagaMiddleware,thunk));
sagaMiddleware.run(watchIncrementAsync)
console.log(store.getState(), '=====store.getState()')
export default store;
