---
title: es6新特性理解
categories:
- web前端
- js
tags:
- js
---

# es6相关特性实现

## promise

### 手写 promise

[参考](https://blog.csdn.net/qq593249106/article/details/83096588) - js手写Promise

```js
// 一个简单的promise实现

function Promise(executor) {
  let self = this
  this.status = 'pending'
  this.value = undefined
  this.reason = undefined

  // 当执行到resolve时 将status 置为 resolve
  function resolve (value) {
    if (self.status === 'pending') {
      this.status = 'resolve'
      this.value = value
    }
  }

  function reject (reason) {
    if (self.status === 'pending') {
      this.status = 'reject'
      this.reason = reason
    }
  }
  executor(resolve, reject)
}

Promise.prototype.then = function (infulfilled, inrejected) {
    if(this.status === 'resolve') {
        infulfilled(this.value)
    }
    if(this.status === 'rejected') {
        inrejected(this.reason)
    }
};

var p = new Promise(function (resolve, reject) {
    resolve('resolve');
});

p.then(function (data) {
    console.log(data);
}, function (err) {
    console.log(err);
});
```

> 存在问题：不支持异步调用

### 手写 promiseall

```js
function promiseAll (promiseArr) {
  let results = []
  return new Promise((resolve, reject) => {
    let i = 0, n = 0
    // 循环执行 promise 对象
    while (n < promiseArr.length) {
      promiseArr[n].then(res => {
        results.push(res)
        i++
        if (i === promiseArr.length) {
          // 当所有的 promise resolve之后 统一 resolve
          resolve(results)
        }
      }).catch(err => {
        reject(err)
      })
      n++
    }
  })
}
```

### 手写 race

```js
Promise.newRace = function (promiseArr) {
  return new Promise((resolve, reject) => {
    let i = 0, n = 0
    while (n < promiseArr.length) {
      promiseArr[n].then(res => {
        // 出现第一个resolve 直接 resolve
        resolve(res)
      }).catch(err => {
        reject(err)
      })
      n++
    }
  })
}
```

### 手写 allSettled

```js
Promise.newAllSettled = function (promiseArr) {
  let results = [];
  return new Promise((resolve, reject) => {
    let i = 0, n = 0;
    // 运行所有的 Promise
    while (n < promiseArr.length) {
      promiseArr[n].then(res => {
        // 当有 Promise 被 resolve 之后，记录 resolve 值和状态，已决 Promise 计数加一
        results.push({value: res, status: 'fulfilled'});
        i++;
        // 全部 Promise 已决，resolve
        if (i === promiseArr.length) {
          resolve(results);
        }
      }).catch(err => {
        // 当有 Promise 被 reject 后，记录 reject 值和状态，并且已决的 Promise 计数加一
        results.push({value: err, status: 'rejected'});
        i++;
        if (i === promiseArr.length) {
          resolve(results);
        }
      });
      n++;
    }
  })
};
```
## await/async

## 操作符

### ...