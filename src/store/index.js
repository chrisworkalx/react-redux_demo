// import { createStore } from 'redux';
// import incrementReducer from './reducers/index';

// const store = createStore(incrementReducer);

// export default store;
import { persistStore, persistReducer } from 'redux-persist'; //解决redux数据刷新页面数据丢失问题（使用redux-persist持久化数据存储）


//  存储机制，可换成其他机制，当前使用sessionStorage机制
import storageSession from 'redux-persist/lib/storage/session'
// import storage from 'redux-persist/lib/storage'; //localStorage机制
//import { AsyncStorage } from 'react-native'; //react-native




import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';
import defaultReducer from './reducers/index';
import createSagaMiddleware from 'redux-saga'
import { watchIncrementAsync } from '../sagas/index'
import AllActions from './actions';



// 数据对象
const storageConfig = {
    key: 'root', // 必须有的
    storage: storageSession, // 缓存机制
    blacklist: ['name', 'age'] // reducer 里不持久化的数据,除此外均为持久化数据
}
// 或者
// const storageConfig = {
//     key: 'root', // 必须有的
//     storage:storageSession, // 缓存机制
//     whitelist: ['name','age'] // reducer 里持久化的数据,除此外均为不持久化数据
// }
const myPersistReducer = persistReducer(storageConfig, defaultReducer);
const sagaMiddleware = createSagaMiddleware();
// const store = createStore(defaultReducer, applyMiddleware(sagaMiddleware, thunk));
const store = createStore(myPersistReducer, applyMiddleware(sagaMiddleware, thunk));
sagaMiddleware.run(watchIncrementAsync)
console.log(store.getState(), '=====store.getState()')
console.log(store, '🔥=====store');
const { dispatch } = store;
console.log(AllActions, '===AllActions');

var combineArr = Object.keys(AllActions).map(key => {
    return { ...AllActions[key] }
});

var combineObj = combineArr.reduce((prev, next) => {
    // console.log(prev, '==prev');
    // console.log(next, '===next')
    return {
        ...prev,
        ...next
    }

}, {});
console.log(combineObj, '==combineObj')

export const combineActions = bindActionCreators(combineObj, dispatch);
export const persistor = persistStore(store)
// console.log(combineActions, '=====????combineActions')
export default store;
