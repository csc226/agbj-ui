'use static'
import components from './config/component';
export default ({ Vue }) => {
    components.forEach(({ name,component }) => {
        // console.log(name,component)
        Vue.component(name,component)
    })
}