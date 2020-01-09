import { deprecate } from 'core-decorators'

class Dog {
    @readonly //作用在类的属性上
    @writeDogBark
    bark() {
        return 'wang!wang!'
    }
}
function readonly(target, key, descriptor) {
    // console.log(target, '---target')
    // console.log(key, '---key')
    // console.log(descriptor, '---descriptor')
    descriptor.writable = false
    return descriptor
}
function writeDogBark(target, key, descriptor) {
    target[key] = function () {
        return 'are you ok?';
    }
    return target;
}

@doge2 //作用在类上
class Dog2 { } //相当于给类绑定一个属性 且实例不可以调用该属性或方法
// 这里的 `target` 是类本身
function doge2(target) {
    target.isDoge = true //属性定义在static上只有类可以访问
}

//decorator 也可以是 factory function  因为是修饰类本身的
function doge3(isDoge) {
    return function (target) {
        target.isDoge = isDoge //只有类本身可以访问
    }
}

@doge3('哈喽')
class Dog3 { }



function enumerable(isEnumerable) {
    return function (target, key, descriptor) {
        descriptor.enumerable = isEnumerable //动态给类的属性不可遍历
        descriptor.writable = isEnumerable //动态给类的属性不可修改
    }
}

class Dog4 {
    @enumerable(false)
    eat() {
        console.log('dog4调用eat方法，此方法不可变更重写！')
    }
}


// 引入第三方装饰器
class DogT {
    @deprecate   //针对peeInRoom方法生效
    peeInRoom() { }

    @deprecate('I am a good dog.') //针对方法peeInBed有效
    peeInBed() { }
}


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function classDecorator(constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.newProperty = "new property";
            _this.hello = "override";
            return _this;
        }
        return class_1;
    }(constructor));
}
var Greeter = /** @class */ (function () {
    function Greeter(m) {
        this.property = "property";
        this.hello = m;
    }
    Greeter = __decorate([
        classDecorator
    ], Greeter);
    return Greeter;
}());


export {
    Dog,
    Dog2,
    Dog3,
    Dog4,
    DogT,
    Greeter
};