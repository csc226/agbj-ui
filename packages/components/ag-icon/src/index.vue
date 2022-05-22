<template>
    <i class="ag-icon" :style="{...style}">
        <slot></slot>
    </i>
</template>
<script>
export default {
    name: 'agIcon',
    props:{
        size:String|Number,
        color:String,
        unit:{
            type:String,
            default:'px'
        }
    },
    data() {
        return {
        
        };
    },
    computed:{
        style(){
            return {
                fontSize:this.size+this.unit,
                color:this.color,
            }
        }
    },
    mounted() {
        
    },

    methods: {
        
    },
};
</script>
<style lang="scss">
@import "../../../theme-chalk/src/agIcon.scss"
</style>

