---
title: 3D饼图
permalink: /fonts
---

## pieChart 3D饼图
##### 3D饼图 主要依赖于threejs实现，通过配置项可以快速生成3D饼图。

### 基础用法
::: demo
``` html
<template>
   <ag-pieChart :series="series" :fontJson="$withBase('/fonts/Microsoft _YaHei_Regular.json')"></ag-pieChart>
</template>
<script>
export default {
    data() {
        return {
            series: [
                    {
                        type: 'pie', //固定不变
                        data: [{
                            name: '手机',
                            value: 45,
                            itemStyle: {
                                color: 0xFF00ff
                            },
                            nameStyle: {
                                color: 0xff00ff,
                                fontSize: 80,
                            },
                            valueStyle: {
                                color: 0xff00ff,
                                fontSize: 80,
                            },
                            line: {
                                show: false,
                                color: 0xff00ff,
                            },
                        }, { name: '电脑', value: 25 },
                        { name: '平板', value: 13 },
                        { name: '电视', value: 18 },
                        { name: '大屏', value: 18 }
                        ]
                        // data:[45,25,18,34]
                    }
                ]
        }
    },
    mounted() {
        
    },
    methods: {

    }
};
</script>
<style scoped>
#pieChart {
    width: 100%;
    height: 100vh;
}
</style>
```

:::


### pieChart属性
|参数|说明| 类型|可选值|默认值|
|:-|:-|:-|:-|:-|
| px | 相机x轴偏移 | Number | -- | -500 |
| py | 相机y轴偏移 | Number | -- | 700 |
| pz | 相机z轴偏移 | Number | -- | 1500 |
| enableAxis | 是否开启坐标系 | Boolean | -- | false |
| backgroundColor | 背景颜色 | 十六进制数值 | -- | 0x000000 |
| backgroundAlpha | 背景是否透明 | Boolean | -- | false |
| enableZoom | 是否缩放 | Boolean | -- | false |
| throbAuto | 背景是否透明 | Boolean | -- | false |
| backgroundAlpha | 是否自动跳动 | Boolean | -- | false |
| deep | 饼图深度 | Number | -- | 50 |
| radius | 饼图半径 | Number | -- | 360 |
| symbolSize | 标记大小 | Number | -- | 20 |
| symbolColor | 标记颜色 为空时和饼图颜色一致 | 十六进制数值 | -- | 0xffffff|
| fontSize | label文字大小 | Number | -- | 80 |
| baseShow | 底盘是否显示 | Boolean | -- | true |
| baseRadius | 底盘半径 | Number | -- | 380 |
| baseDeep | 底盘深度 | Number | -- | 20 |
| baseColor | 底盘颜色 | 十六进制数值 | -- | 0x0000ff |
| shadowShow | 阴影是否显示 | Boolean | -- | true |
| shadowRadius | 阴影半径 | Number | -- | 380 |
| shadowOpacity | 阴影深度 | Number | -- | 20 |
| shadowColor | 阴影颜色 | 十六进制数值 | -- | 0x0000ff |
| series | 数据 | array | -- | -- |

### series属性

