import agButton from './src/index';
agButton.install=function(Vue){
    Vue.component(agButton.name,agButton)
}
export default agButton;