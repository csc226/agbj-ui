<template>
    <div id="pieChart">

    </div>
</template>
<script>
import pieChart from "./main.js";
export default {
    name: 'agPieChart',
    components: {

    },
    mixins: [],
    props: {
        fontJson:String,
        px: { type: Number, default: -500 }, //相机x轴偏移
        py: { type: Number, default: 700 }, // 相机y轴偏移
        pz: { type: Number, default: 1500 }, //相机z轴偏移
        enableAxis: { type: Boolean, default: false }, //是否开启坐标系
        backgroundColor: { type: Number, default: 0x000000 },//背景颜色
        backgroundAlpha: { type: Boolean, default: false },//背景是否透明
        enableZoom: { type: Boolean, default: false }, //是否缩放
        enableRotate: { type: Boolean, default: false }, //是否旋转
        throbAuto: { type: Boolean, default: false }, //是否自动跳动
        bodyRotateAuto: { type: Boolean, default: false }, //是否自动旋转
        deep: { type: Number, default: 50 }, //饼图深度
        radius: { type: Number, default: 360 },//饼图半径
        symbolSize: { type: Number, default: 20 },//标记大小
        symbolColor: { type: Number, default: 0xffffff },//标记颜色 为空时和饼图颜色一致
        fontSize: { type: Number, default: 80 },//label文字大小
        lineColor: null,
        baseShow: { type: Boolean, default: true },
        baseRadius: { type: Number, default: 380 },
        baseDeep: { type: Number, default: 20 },
        baseColor: { type: Number, default: 0x0000ff },
        shadowShow: { type: Boolean, default: true },
        shadowRadius: { type: Number, default: 420 },
        shadowOpacity: { type: Number, default: 0.2 },
        shadowColor: { type: Number, default: 0xffffff },
        series: Array,
    },
    data() {
        return {

        }
    },
    computed: {
        base() {
            return {
                show: this.baseShow,
                radius: this.baseRadius,
                deep: this.baseDeep,
                color: this.baseColor
            }
        },
        shadow() {
            return {
                show: this.shadowShow,
                radius: this.shadowRadius,
                color: this.shadowColor,
                opacity: this.shadowOpacity,// 透明度 0-1
            }
        }
    },
    watch: {

    },
    mounted() {
        this.$nextTick(() => {
            let options = {
                selector: 'pieChart',  //元素id
                px: this.px, //相机x轴偏移
                py: this.py, // 相机y轴偏移
                pz: this.pz, //相机z轴偏移
                enableAxis: this.enableAxis, //是否开启坐标系
                backgroundColor: this.backgroundColor,//背景颜色
                backgroundAlpha: this.backgroundAlpha,//背景是否透明
                enableZoom: this.enableZoom, //是否缩放
                enableRotate: this.enableRotate, //是否旋转
                throbAuto: this.throbAuto, //是否自动跳动
                bodyRotateAuto: this.bodyRotateAuto, //是否自动旋转
                deep: this.deep, //饼图深度
                radius: this.radius,//饼图半径
                symbolSize: this.symbolSize,//标记大小
                symbolColor: this.symbolColor,//标记颜色 为空时和饼图颜色一致
                fontSize: this.fontSize,//label文字大小
                lineColor: null,
                base: this.base,
                shadow: this.shadow,
                series: this.series,
                fontJson:this.fontJson
            }
            let chart = new pieChart(options);
            chart.pie();
        })
    },
    methods: {

    }
};
</script>
<style scoped>
#pieChart {
    width: 100%;
    height: 300px;
}
</style>