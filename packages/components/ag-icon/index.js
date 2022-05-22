import agIcon from './src/index.vue'

agIcon.install=function(Vue){
    Vue.component(agIcon.name,agIcon)
}
export default agIcon;