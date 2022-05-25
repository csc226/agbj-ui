---
title: Distribute 组件
---

# Distribute 线性分布组件

### 基础用法
:::demo

```html
<template>
    <ag-distribute :data="data"></ag-distribute>
</template>
<script>
    export default {

        data() {
            return {
                data: [{
                        num: 30,
                        color: "#FFF8E6",
                        min: 0,
                    },
                    {
                        num: 24,
                        color: "#FFE399",
                        min: 10,
                    },
                    {
                        num: 45,
                        color: "#FECD4D",
                        min: 20,
                    },
                    {
                        num: 23,
                        color: "#FEB800",
                        min: 50,
                    },
                ],
            };
        },
    };
</script>
```

:::
### 设置文字大小
:::demo 可以通过num-size设置文字大小，通过num-color 设置文字的颜色，通过num-top 设置文字的位置

```html
<template>
    <ag-distribute :data="data" num-color="red" num-size="20" num-top="-34"></ag-distribute>
</template>
<script>
    export default {

        data() {
            return {
                data: [{
                        num: 30,
                        color: "#FFF8E6",
                        min: 0,
                    },
                    {
                        num: 24,
                        color: "#FFE399",
                        min: 10,
                    },
                    {
                        num: 45,
                        color: "#FECD4D",
                        min: 20,
                    },
                    {
                        num: 23,
                        color: "#FEB800",
                        min: 50,
                    },
                ],
            };
        },
    };
</script>
```

:::
### 设置边界文字大小
:::demo 可以通过min-size设置文字大小，通过min-color 设置文字的颜色，通过min-top 设置文字的位置

```html
<template>
    <ag-distribute :data="data" min-color="red" min-size="20" min-top="24"></ag-distribute>
</template>
<script>
    export default {

        data() {
            return {
                data: [{
                        num: 30,
                        color: "#FFF8E6",
                        min: 0,
                    },
                    {
                        num: 24,
                        color: "#FFE399",
                        min: 10,
                    },
                    {
                        num: 45,
                        color: "#FECD4D",
                        min: 20,
                    },
                    {
                        num: 23,
                        color: "#FEB800",
                        min: 50,
                    },
                ],
            };
        },
    };
</script>
```

:::

### 设置色块的高度以及边线的样式和边距
:::demo 可以通过heght设置色块的高度，通过boder-color 设置边线的颜色，通过border-style 设置边线的样式，通过border-width设置边线的粗细，通过padding设置边距

```html
<template>
    <ag-distribute :data="data" height="18" border-color="red" border-style="dashed" border-width="2" padding="4"></ag-distribute>
</template>
<script>
    export default {

        data() {
            return {
                data: [{
                        num: 30,
                        color: "#FFF8E6",
                        min: 0,
                    },
                    {
                        num: 24,
                        color: "#FFE399",
                        min: 10,
                    },
                    {
                        num: 45,
                        color: "#FECD4D",
                        min: 20,
                    },
                    {
                        num: 23,
                        color: "#FEB800",
                        min: 50,
                    },
                ],
            };
        },
    };
</script>
```

:::


### distribute 属性

|参数|说明| 类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|data| [显示的数据](#data属性)| Array | -|- |
|fontUnit | 尺寸单位 |String | px/rem|px |
|numSize | 数值的文字大小 | Number/String| -| 16|
|numColor |数值的文字颜色 |String |- | #333|
|numTop |数值的文字位置（上下方向） | Number/String|- |-25 |
|minSize | 边界数值的文字大小|Number/String | -| 14|
|minColor | 边界数值的文字颜色|String | -|#333 |
|minTop |边界数值的文字位置（上下方向） |Number/String |- | 22 |
|borderStyle | 边线的样式| String| none/solid/dashed/double/dotted| solid|
|borderColor | 边线的颜色|String |- | #33|
|borderWidth | 边线的颜色|Number/String | -| 1|
|height |色块的高度 |Number/String | -| 1|
|padding |边线和色块之间的距离 |Number/String | -| 1|

### data属性
|参数|说明| 类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|num|数值| String/Number | -|- |
|color|色值| String | -|- |
|min|边界值| String | -|- |