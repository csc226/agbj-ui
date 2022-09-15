<template>
    <div class="drawImgBox">
        <div class="item-tr" v-if="manShow">
            <div class="item-title">男性占比：<strong>{{this.manNum?this.manNum:100-this.womanNum}}</strong>%</div> <canvas :id="manId" height="48"></canvas>
        </div>
        <div class="item-tr" v-if="womanShow">
            <div class="item-title">女性占比：<strong>{{this.womanNum?this.womanNum:100-this.manNum}}</strong>%</div> <canvas :id="womanId"
                height="48"></canvas>
        </div>

    </div>
</template>
<script>
import drawImg from './drawImgColor.js';
import man from "./man.svg";
import woman from "./woman.svg";
export default {
    name: "agDrawImageColor",
    props: {
        manNum:[Number, String],//0 - 100
        womanNum:[Number, String],//0 - 100
        manShow: { type: Boolean, default: true },
        womanShow: { type: Boolean, default: true },
        manId: { type: String, default: "man" },
        womanId: { type: String, default: "woman" },
    },
    data() {
        return {
            // manNum:75, //0 - 100
        }
    },
    mounted() {
        this.drawImage()
    },
    methods: {
        drawImage() {
            if (this.manShow) {
                let drawMan = new drawImg(this.manId, "197, 128, 128", man, 38, 0, 'rl');
                const percent=this.manNum?this.manNum:100-this.womanNum;
                drawMan.colorChange(percent);
            }
            if (this.womanShow) {
                let drawWoman = new drawImg(this.womanId, "197, 128, 128", woman, 88, 0, 'rl');
                const percent=this.womanNum?this.womanNum:100-this.manNum;
                drawWoman.colorChange(percent);
            }
        }
    },
}
</script>
<style scoped>
.item-tr {
    display: flex;
    align-items: center;
    height: 4.8rem;
}

.item-title {
    font-size: 1.6rem;
}

canvas {
    margin: 1rem;
}

strong {
    font-size: 2rem;
}
</style>