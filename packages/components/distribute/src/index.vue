<template>
    <div class="dyNL-box">
        <div class="dyNL-content" ref="content">
            <div class="dyNL-border-box" :style="{...borderSty}">
                <div class="dyNL-item" v-for="(item, idx) in data" :key="'NL_' + idx" :style="{
                    width: nlTotal == 0 ? '25%' : ((String(item.num).replace(/\D/g,'')) / nlTotal) * 100 + '%',
                    background: item.color,
                }">
                    <div class="dyNL-text" ref="num" :style="{...numStyle}">{{ item.num }}</div>
                    <div class="dyNL-size" ref="min" :style="{...minStyle}">{{ item.min }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "agDistribute",

    props: {
        data: {
            type: Array, default: () => [
                {
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
            ]
        },
        fontUnit:{type:String,default:'px'},
        numSize:Number,
        numColor:String,
        numTop:Number,
        minSize:Number,
        minColor:String,
        minTop:Number,
        borderStyle:String,
        borderColor:String,
        borderWidth:Number
    },
    computed: {
        borderSty(){
            return {
                borderWidth:this.borderWidth,
                borderStyle:this.borderStyle,
                borderColor:this.borderColor,
            }
        },
        numStyle(){
            return {
                fontSize:this.numSize+this.fontUnit,
                color:this.numColor,
                top:this.numTop,
            }
        },
        minStyle(){
            return {
                fontSize:this.minSize+this.fontUnit,
                color:this.minColor,
                top:this.minTop,
            }
        }
    },
    data() {
        return {
            nlTotal: Number,
        };
    },

    watch: {
        data: {
            handler(newVal, oldVal) {
                this.nlTotal = this.sumFn();
            },
            deep: true,
            immediate: true,
        }
    },

    created() {
    },

    mounted() { 
        this.$nextTick(()=>{
            window.addEventListener('resize',()=>{
                this.contentMargin()
            })
            this.contentMargin()
        })
    },

    methods: {
        contentMargin(){
            const top=this.$refs.num[0].offsetTop;
            const bottom=this.$refs.min[0].offsetTop;
            console.log(top)
            console.log(bottom)
            this.$refs.content.style.marginTop=Math.abs(top)+'px';
            this.$refs.content.style.marginBottom=Math.abs(bottom)+'px';
        },
        sumFn() {
            let sum = 0;
            for (let val of this.data) {
                //console.log(val);
                let num=val.num;
                String(num).replace(/\D/g,'')
                sum += Number(String(num).replace(/\D/g,''));
            }
            // console.log(sum);
            return sum;
        },
    }
};
</script>

<style lang="scss">
@import '../../../theme-chalk/src/distribute.scss';
</style>