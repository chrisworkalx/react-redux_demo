import React, { Component } from 'react';
import { of, Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';

//通过of创建一个observable对象
function f1() {
    let observable = of(1, 2, 3);
    observable.subscribe({ next: num => console.log(num) });
}

//Observable.create创建一个observable对象
function f2() {
    const observable = Observable.create(observer => {
        try {
            observer.next(1);
            observer.next(2);
            observer.next(3);
        } catch (e) {
            observer.error(e);
        }
        observer.complete();
    });
    const observer = {
        next: num => console.log(num),
        error: e => console.log(e),
        complete: () => console.log('complete!!!')
    }
    observable.subscribe(observer);
}

//异步发出请求
function f3() {
    const observable = Observable.create(observer => {
        try {
            let time = 0;
            observer.next(1);
            observer.next(2);
            observer.next(3);
            const intervalId = setInterval(() => {
                console.log(`wait ${++time}s`);
            }, 900)
            setTimeout(() => { observer.next(4); clearInterval(intervalId) }, 2000);
        } catch (e) {
            observer.error(e);
        }
        // observer.complete(); // 注意不能立即调用complete函数，不然会终止消息传输
        setTimeout(() => observer.complete(), 3000)
    });
    const observer = {
        next: num => console.log(num),
        error: e => console.log(e),
        complete: () => console.log('complete!!!')
    }
    observable.subscribe(observer);
}

//初识unsubscribe
function f4() {
    const obs = Observable.create(observer => {
        observer.next(1);
        setTimeout(() => observer.next(2), 2000); // 等待两秒才发送下一个值
    });
 
    let suber = obs.subscribe({
        next: x => console.log("接收到：", x),
    });
 
    setTimeout(() => suber.unsubscribe(), 2000); // 在一秒后取消订阅
}

//自定义订阅函数
function f5() {
    function subscribe(observer) {
        var intervalID = setInterval(() => {
            observer.next('launch.....');
        }, 1000);
 
        return {
            unsubscribe: () => {
                clearInterval(intervalID);
                console.log('结束了')
            }
        }
    }
 
    var subscription = subscribe({ next: (x) => console.log(x) });
    setTimeout(() => subscription.unsubscribe(), 5000);
}


// 在这里，以map这个操作符为例，它可以接收可观察对象发送的值，
// 并将其转换另外的形式，并以一个可观察对象发送这些新值，
// 现在，我们来写一段有趣的代码：将原来的可观察对象发送的值全部转换为“hello world”，
// 并订阅这个操作符返回的新的可观察对象，并输出值，代码如下
function f6() {
    const observable = of(1, 2, 3);
    const opt = map(num => 'hello world');
    const newObservable = opt(observable);
    newObservable.subscribe(data => console.log(data));
    // observable.subscribe(data => console.log(data));
    // newObservable.subscribe({next: n => console.log(n)});
}

function f7() {
    const observable = of(1, 2, 3);
    const readTap = tap(n => console.log(n, '=====n??'))
    const opt = map(num => '哈哈，你懂的');
    const newObservable = opt(readTap(observable));
    newObservable.subscribe(data => console.log(data));
}

//上面的形式可以像下面这么通过管道链接处理
function f8() {
    const observable = of(1, 2, 3);
    const newObservable = observable.pipe(
        // map(v => '你是谁？'), //map会首先过滤of中的输出值，比如该map函数会将所有的of输出值改变成'你是谁'
        map(v => {
            // console.log(v, '====v');
            return v % 2 == 0;
        }),
        tap(a => console.log(a, '===a??')) //这个函数最初是为了打印of中要输出的字段
    )
    newObservable.subscribe({
        next: data => console.log(data),
        error: e => alert(e),
        complete: () => alert('处理完了函数ok！！')
    });
}
class MyObservable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'angular7_study'
        }
        this.observerClick = this.observerClick.bind(this);
    }
    observerClick() {
        f1();
    }

    observerClick2 = () => {
        f2();
    }

    observerClick3 = () => {
        f3();
    }

    observerClick4 = () => {
        f4();
    }

    observerClick5 = () => {
        f5();
    }

    observerClick6 = () => {
        f6();
    }

    observerClick7 = () => {
        f7();
    }

    observerClick8 = () => {
        f8();
    }
    render() {
        const { name } = this.state;
        return (
            <>
                <h1>{name}</h1>
                <button onClick={this.observerClick}>点击触发f1</button>
                <br/>
                <button onClick={this.observerClick2}>点击触发f2</button>
                <br/>
                <button onClick={this.observerClick3}>点击触发f3</button>
                <br/>
                <button onClick={this.observerClick4}>点击触发f4</button>
                <br/>
                <button onClick={this.observerClick5}>点击触发f5</button>
                <br/>
                <button onClick={this.observerClick6}>点击触发f6</button>
                <br/>
                <button onClick={this.observerClick7}>点击触发f7</button>
                <br/>
                <button onClick={this.observerClick8}>点击触发f8</button>
            </>
        )
    }
}

export default MyObservable;