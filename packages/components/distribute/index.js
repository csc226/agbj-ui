import Distribute from './src/index'
Distribute.install=function(vue){
    vue.component(Distribute.name,Distribute)
}
export default Distribute;