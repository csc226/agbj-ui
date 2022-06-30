import Vue from "vue";
import agButton from "./components/ag-button";
import agIcon from "./components/ag-icon";
import Distribute from "./components/distribute";
import pieChart from "./components/pieChart";

const components=[
    agIcon,
    agButton,
    Distribute,
    PieChart,
]
const install=function(Vue){
    if(install.installed) return;
    components.forEach(component=>{
        Vue.component(component.name,component)
    })
}
if(typeof window!='undefined'&&window.Vue){
    install(window.Vue)
}
export default {
    version: '1.0.0',
    install,
    Distribute,
    PieChart,
    agIcon,
    agButton
}
import pieChart from "./components/pieChart/src"
Vue.prototype.$pieChart = pieChart;