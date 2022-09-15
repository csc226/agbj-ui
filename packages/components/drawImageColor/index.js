import DrawImageColor from './src/index.vue'
DrawImageColor.install = function (vue){
    vue.component(DrawImageColor.name,DrawImageColor)
}
export default DrawImageColor;