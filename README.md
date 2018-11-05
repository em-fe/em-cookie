# em-cookie
cookie的相关操作

[![em-cookie](https://img.shields.io/npm/v/em-cookie.svg?style=flat-square)](https://www.npmjs.org/package/em-cookie)
[![NPM downloads](http://img.shields.io/npm/dm/em-cookie.svg?style=flat-square)](https://npmjs.org/package/em-cookie)
[![Package Quality](http://npm.packagequality.com/shield/em-cookie.svg)](http://packagequality.com/#?package=em-cookie)
[![NPM downloads](https://img.shields.io/npm/dt/em-cookie.svg?style=flat-square)](https://npmjs.org/package/em-cookie)

## 为什么用？

 * 减少项目之间重复的代码
 * 公共方法抽离
 * 使用方便
 * 模块化，用哪个，引哪个
 * 易于维护

## 怎么用？
在vue中可以使用，像挂载其他ui库一样。
 ```js
 import cookie from 'em-cookie';
 Vue.use(VueCookie);
 // 普通用法
 console.log(window.$cookie.get('aaa'));
 // vue 用法
 console.log(this.$cookie.get('aaa'));
 ```

### set 方法
 > 1.0.7 版本之前必须设置时间

##### 参数

 `window.$cookie.set(key, value, expireValue, path, domain, secure);`

|属性|说明|类型|是否必须|默认|
|---|---|----|-------|---|
|key|存储的键值|String|是|无|
|value|存储内容|String|是|无|
|expireValue|过期时间。可用值: 年(y)，月(m)，日(d)，时(h)，分(min)，秒(s)|[String,Number]|否`1.0.7` 之前必传`|1d(一天)|
|path|存储的作用路径|String|否|`/`|
|domain|存储的作用的 domain|String|否|`document.domain`|
|secure|Cookie 只能通过安全协议传输为 https 。在 Chrome 52之前，此标记可能会显示来自 http 域的 Cookie 。|Boolean|否|无|

### get 方法

 `window.$cookie.get(key);`

|属性|说明|类型|是否必须|默认|
|---|---|----|-------|---|
|key|获取的键值|String|是|无|

### remove 方法

 `window.$cookie.remove(key, path, domain);`

|属性|说明|类型|是否必须|默认|
|---|---|----|-------|---|
|key|获取的键值|String|是|无|
|path|存储的作用路径|String|否|`1.0.7` 开始默认`/`|
|domain|存储的作用的 domain|String|否|`1.0.7` 开始默认`document.domain`|

## 安装

  * npm

  `npm install em-cookie`

  * yarn

  `yarn add em-cookie`
