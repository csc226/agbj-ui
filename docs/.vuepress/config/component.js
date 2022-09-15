'use static'
import Icon from '@packages/components/ag-icon/src/index.vue';
import Button from '@packages/components/ag-button/src/index.vue';
import Distribute from '@packages/components/distribute/src/index.vue';
import PieChart from '@packages/components/pieChart/src/index.vue';
import DrawImageColor from '@packages/components/drawImageColor/src/index.vue';

const components = [
    { name: Icon.name, component: Icon },
    { name: Button.name, component: Button },
    { name: Distribute.name, component: Distribute },
    { name: PieChart.name, component: PieChart },
    { name: DrawImageColor.name, component: DrawImageColor }
]
export default components