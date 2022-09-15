import Vue from "vue";
import agButton from "./components/ag-button";
import agIcon from "./components/ag-icon";
import Distribute from "./components/distribute";
import PieChart from "./components/pieChart";
import DrawImageColor from "./components/drawImageColor";

const components=[
    agIcon,
    agButton,
    Distribute,
    PieChart,
    DrawImageColor,
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
    agButton,
    DrawImageColor,
}
// import pieChart from "./components/pieChart/src/main.js"
// Vue.prototype.$pieChart = pieChart;