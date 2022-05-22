## 快速上手
本节将介绍如何在项目中使用 agbj-ui。
### 使用 vue-cli
你可以使用vue-cli快速搭建一个基于[agbj-ui]()的项目
### 引入agbj-ui
你可以引入整个 agbj-ui，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 agbj-ui。
#### 完整引入
##### 在main.js中写入以下内容
```
import Vue from 'vue'
import App from './App.vue'
import agbj from "agbj-ui"
import "agbj-ui/lib/css/index.css"

Vue.use(agbj)

new Vue({
  render: h => h(App),
}).$mount('#app')
```
##### 以上代码便完成了 agbj-ui 的引入。需要注意的是，样式文件需要单独引入。

#### 按需引入
```
import Vue from 'vue'
import App from './App.vue' 
import {agIcon} from "agbj-ui"
Vue.config.productionTip = false

Vue.use(agIcon)

new Vue({
  render: h => h(App),
}).$mount('#app')
```