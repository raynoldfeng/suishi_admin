<template>
    <div id="QuestMain">
        <div id="titlePage" :style="{'margin-top':marginTop}">
            <p class="tp-title" v-text="data.courseTitle">

            </p>
            <div class="tp-logo-main">
                <div class="white-r">
                    <img :src="data.authorImg">
                </div>
            </div>
            <p class="tp-info tp-info-title" v-html="data.authorInfo">

            </p>
            <p class="tp-info" v-html="Trim(data.courseInfo)">

            </p>
            <div class="tp-start-btn" @click="startEvent">
                start
            </div>
        </div>
    </div>
</template>
<script>
    export default{
    props:{
        data:""
    },
        data(){
            return{
                marginTop:0
            }
        },
        methods:{
            startEvent(){
                this.$emit("isStart",true);
            },
            Trim(str) {
                return str.replace(/\n|\r\n/g,"<br/>");
            },
        },
        mounted:function(){
            this.marginTop = "-"+document.getElementById("titlePage").clientHeight/2 + "px";
            $(".tp-logo-main").height($(".tp-logo-main").width());
        }
    }
</script>
<style>
    #titlePage{
        position: absolute;
        width: 100%;
        top: 42%;
    }
    .tp-title{
        font-size: 6vw;
        color: #666666;
        width: 90%;
        margin: 0 auto 0;
        word-break: break-all ;
        text-align: center;
    }
    .tp-logo-main{
        width: 22%;
        margin: 14% auto 6%;
        border-radius:100%;
        padding: 2%;
        border:1px solid #999999;
    }
    .tp-logo-main img{
        width: 100%;
        border-radius: 100%;
    }
    .tp-info{
        width: 80%;
        margin: 2% auto 0;
        text-align: center;
        color: #acafb2;
        font-size: 4vw;
    }
    .tp-info-title{
        font-size: 5vw;
        color: #333333;
    }
    .tp-start-btn{
        min-width: 30%;
        display: inline-block;
        background: #019ccb;
        margin: 10% auto 0;
        padding: 2% 4%;
        color: #ffffff;
        font-size: 4vw;
    }
</style>