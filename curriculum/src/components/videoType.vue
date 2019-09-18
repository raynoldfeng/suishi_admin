<template>
    <div id="QuestMain">
        <p class="quest-text" v-text="data.videoTitle"></p>
        <div class="video_main">
            <video :src="data.videoUrl" v-if="isplay == true" autoplay play controls="controls"/>
        </div>
    </div>
</template>
<script>
    export default{
        props:{
            data:"",
            page:"",
            nowPage:""
        },
        data(){
            return{
                isplay:false
            }
        },
        watch:{
            nowPage(){
                if(this.nowPage == this.page){
                    this.isplay = true
                }else{
                    this.isplay = false
                }
            }
        },
        methods:{

        },
        mounted:function(){

        }
    }
</script>
<style>
.video_main{
    width: 100%;
    margin-top: 40%;
}
.video_main video{
    width: 100%;
}
</style>