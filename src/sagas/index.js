// import { delay } from 'redux-saga'
// import * as sagas from 'redux-saga';
// console.dir(sagas, '====sagas')
import { delay, put, takeEvery } from 'redux-saga/effects'
console.log(put, 'put')
console.log(delay, 'delay')
import { increment } from '../store/actions'

export function* incrementAsync() {
  yield delay(2000)
  yield put(increment(3)) //对dispatch进行了二次封装
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}


// 解释下所做的事情，将watchIncrementAsync理解为一个saga，
// 在这个saga中监听了名为INCREMENT_ASYNC的action，
// 当INCREMENT_ASYNC被dispatch时，会调用incrementAsync方法，
// 在该方法中做了异步操作，然后将结果传给名为INCREMENT的action进而更新store。