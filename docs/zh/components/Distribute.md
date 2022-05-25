---
title: Distribute 组件
---

# Distribute 组件

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
### distribute 属性

|参数|说明| 类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|data| [显示的数据](#data属性)| Array | -|- |
|fontUnit | |String | px/rem|px |
|numSize | | Number| -| 16|
|numColor | |String |- | #333|
|numTop | | Number|- |-25 |
|minSize | |Number | -| 14|
|minColor | |String | -|#333 |
|minTop | |Number |- | 22 |
|borderStyle | | String| none/solid/dashed/double/dotted| solid|
|borderColor | |String |- | #33|
|borderWidth | |String | -| 1|
### data属性
|参数|说明| 类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|num|数值| String/Number | -|- |
|color|16进制颜色值| String | -|- |
|min|边界值| String | -|- |