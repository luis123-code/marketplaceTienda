<template>
    <div>
        <div style=" display: flex;margin: 48px 39px;justify-content: space-between;">
                <div style="display: flex; ">
                    <AnimatedText :text="'Eliminar'" /><img style="height: 33px;position: relative;bottom: -11px;right: -12px;" src="../../../static/icons/truck.svg" />
                </div>
            
            
            <div  style=" display: flex; gap: 8px;">
                <img style="height: 40px;border-radius: 7px;"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQthagpgJMldks-g-jqLcpx7e-zKUQm8hc08g&s">
                <div style="padding-top: 12px;">
                    <p style="font-weight: 400;font-size: 15px;line-height: 100%;color: #0000009C;">Admin</p>
                    <p style="font-weight: 400;font-size: 12px;line-height: 100%;color: black;">Luis Zevallos</p>
                </div>
            </div>
        </div>
        <div style="margin: 48px 39px;"> 
            <tableDinamic :nameTableDinamic="isNameTabe"></tableDinamic>
        </div>
    </div>
</template>
<script>
    import tableDinamic from '../../../components/tableDinamic.vue';
    import AnimatedText from '../../../components/animacion/AnimatedText.vue';

    export default{
        name : "eliminarAdmin" ,
        layout: 'redirigir',
        components : {tableDinamic, AnimatedText    },
        data() {
            return {
                isNameTabe : "Eliminar" ,
            }
        },

    }

</script>
<style>
    
</style>