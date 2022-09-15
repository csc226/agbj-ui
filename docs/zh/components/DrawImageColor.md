---
title: 男女占比图
---

## 男女占比图  
#### 男女占比图，通过数字和图片相结合的方式进行显示，可单独显示男性占比或女性占比；
### 基础用法
::: demo 男性占比 45%， womanNum数据省略
``` html
<template>
   <ag-DrawImageColor :manNum="45" ></ag-DrawImageColor>
</template>
```
:::

### manNum数据省略
::: demo 女性占比 45%
``` html
<template>
   <ag-DrawImageColor :womanNum="45" :manId="'man2'" :womanId="'woman2'"></ag-DrawImageColor>
</template>
```
:::
### 男女数据同时存在
::: demo 女性占比 45% 男性占比 42%
``` html
<template>
   <ag-DrawImageColor :manNum="42" :womanNum="45" :manId="'man3'" :womanId="'woman3'"></ag-DrawImageColor>
</template>
```
:::
### 单独显示男性占比
::: demo  男性占比 42%
``` html
<template>
   <ag-DrawImageColor :manNum="42"  :manId="'man4'" :womanShow="false" ></ag-DrawImageColor>
</template>
```
:::
### 单独显示女性占比
::: demo  女性占比 42%
``` html
<template>
   <ag-DrawImageColor :manNum="42"  :womanId="'woman4'" :manShow="false" ></ag-DrawImageColor>
</template>
```
:::

### pieChart属性
|参数|说明| 类型|可选值|默认值|
|:-|:-|:-|:-|:-|
| manNum | 男性占比，如果没有值则等于100-womanNum| Number/String | 0 - 100 | 如果womanNum 没有值，则必填 |
| womanNum | 女性占比，如果没有值则等于100-manNum | Number/String | 0 - 100 | 如果manNum 没有值，则必填 |
| manShow | 是否显示男性 | Boolean| false/true | true |
| womanShow | 是否显示女性 | Boolean| false/true | true |
| manId | 男性显示图id<br/>一个页面有多组件的时候使用| String| -- | man |
| womanId | 女性显示图id<br/>一个页面有多组件的时候使用 | String| -- | woman |

