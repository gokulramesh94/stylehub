<template>
    <div class="loader-wrapper">
        <Image :source="loader" altText="Loading..."/>
    </div>
</template>

<script>
import Image from "./Image.vue"
import{Images} from "../constants";
    export default {
        name: 'Loader',
        components:{
            Image,
        },
        data(){
            return{
                loader: Images.LOADER,
            }
        }
    }
</script>

<style lang="scss" scoped>
.loader-wrapper{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 10%;    
}
</style>