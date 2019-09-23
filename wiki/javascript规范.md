
# JavaScript 编码规范


## 1 前言


本文档的目标是使 JavaScript 代码风格保持一致，容易被理解和被维护。


## 2 代码风格






### 2.2 结构



#### 2.2.1 缩进


##### [强制] 使用 `4` 或 `2` 个空格做为一个缩进层级。



##### [强制] `switch` 下的 `case` 和 `default` 必须增加一个缩进层级。

示例：

```javascript
// good
switch (variable) {

    case '1':
        // do……
        break;

    case '2':
        // do……
        break;

    default:
        // do……

}

// bad
switch (variable) {

case '1':
    // do……
    break;

case '2':
    // do……
    break;

default:
    // do……

}
```

#### 2.2.2 空格



##### [强制] 二元运算符两侧必须有一个空格，一元运算符与操作对象之间不允许有空格。

示例：

```javascript
var a = !arr.length;
a++;
a = b + c;
```

##### [强制] 用作代码块起始的左花括号 `{` 前必须有一个空格。

示例：

```javascript
// good
if (condition) {
}

while (condition) {
}

function funcName() {
}

// bad
if (condition){
}

while (condition){
}

function funcName(){
}
```

##### [强制] `if / else / for / while / function / switch / do / try / catch / finally` 关键字后，必须有一个空格。

示例：

```javascript
// good
if (condition) {
}

while (condition) {
}

(function () {
})();

// bad
if(condition) {
}

while(condition) {
}

(function() {
})();
```

##### [强制] 在对象创建时，属性中的 `:` 之后必须有空格，`:` 之前不允许有空格。

示例：

```javascript
// good
var obj = {
    a: 1,
    b: 2,
    c: 3
};

// bad
var obj = {
    a : 1,
    b:2,
    c :3
};
```

##### [强制] 函数声明、具名函数表达式、函数调用中，函数名和 `(` 之间不允许有空格。

示例：

```javascript
// good
function funcName() {
}

var funcName = function funcName() {
};

funcName();

// bad
function funcName () {
}

var funcName = function funcName () {
};

funcName ();
```

##### [强制] `,` 和 `;` 前不允许有空格。

示例：

```javascript
// good
callFunc(a, b);

// bad
callFunc(a , b) ;
```

##### [强制] 在函数调用、函数声明、括号表达式、属性访问、`if / for / while / switch / catch` 等语句中，`()` 和 `[]` 内紧贴括号部分不允许有空格。

示例：

```javascript
// good

callFunc(param1, param2, param3);

save(this.list[this.indexes[i]]);

needIncream && (variable += increament);

if (num > list.length) {
}

while (len--) {
}


// bad

callFunc( param1, param2, param3 );

save( this.list[ this.indexes[ i ] ] );

needIncreament && ( variable += increament );

if ( num > list.length ) {
}

while ( len-- ) {
}
```

##### [强制] 单行声明的数组与对象，如果包含元素，`{}` 和 `[]` 内紧贴括号部分不允许包含空格。

解释：

声明包含元素的数组与对象，只有当内部元素的形式较为简单时，才允许写在一行。元素复杂的情况，还是应该换行书写。


示例：

```javascript
// good
var arr1 = [];
var arr2 = [1, 2, 3];
var obj1 = {};
var obj2 = {name: 'obj'};
var obj3 = {
    name: 'obj',
    age: 20,
    sex: 1
};

// bad
var arr1 = [ ];
var arr2 = [ 1, 2, 3 ];
var obj1 = { };
var obj2 = { name: 'obj' };
var obj3 = {name: 'obj', age: 20, sex: 1};
```

##### [强制] 行尾不得有多余的空格。



##### [强制] 运算符处换行时，运算符必须在新行的行首。

示例：

```javascript
// good
if (user.isAuthenticated()
    && user.isInRole('admin')
    && user.hasAuthority('add-admin')
    || user.hasAuthority('delete-admin')
) {
    // Code
}

var result = number1 + number2 + number3
    + number4 + number5;


// bad
if (user.isAuthenticated() &&
    user.isInRole('admin') &&
    user.hasAuthority('add-admin') ||
    user.hasAuthority('delete-admin')) {
    // Code
}

var result = number1 + number2 + number3 +
    number4 + number5;
```

##### [强制] 在函数声明、函数表达式、函数调用、对象创建、数组创建、for 语句等场景中，不允许在 `,` 或 `;` 前换行。

示例：

```javascript
// good
var obj = {
    a: 1,
    b: 2,
    c: 3
};

foo(
    aVeryVeryLongArgument,
    anotherVeryLongArgument,
    callback
);


// bad
var obj = {
    a: 1
    , b: 2
    , c: 3
};

foo(
    aVeryVeryLongArgument
    , anotherVeryLongArgument
    , callback
);
```

##### [建议] 不同行为或逻辑的语句集，使用空行隔开，更易阅读。

示例：

```javascript
// 仅为按逻辑换行的示例，不代表 setStyle 的最优实现
function setStyle(element, property, value) {
    if (element == null) {
        return;
    }

    element.style[property] = value;
}
```



#### 2.2.4 语句


##### [强制] 不得省略语句结束的分号。

##### [强制] 在 `if / else / for / do / while` 语句中，即使只有一行，也不得省略块 `{……}`。

示例：

```javascript
// good
if (condition) {
    callFunc();
}

// bad
if (condition) callFunc();
if (condition)
    callFunc();
```

##### [强制] 函数定义结束不允许添加分号。

示例：

```javascript
// good
function funcName() {
}

// bad
function funcName() {
};

// 如果是函数表达式，分号是不允许省略的。var funcName = function () {
};
```


