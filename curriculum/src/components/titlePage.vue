<template>
    <div id="QuestMain">
        <div id="titlePage" :style="{'margin-top':marginTop}">
            <p class="tp-title">
                asdasdasddd
            </p>
            <div class="tp-logo-main">
                <img src="https://mohivecontents-jp.crossknowledge.com/staticcoursecontent/en-gb/bsfi633/medias/B554A3D7-CB55-4709-92AC-082054EDC144/Q3_B554A3D7-CB55-4709-92AC-082054EDC144.jpg">
            </div>
            <p class="tp-info">
                Pascal Quiry
            </p>
            <p class="tp-info">
                Professor at HEC where he holds the BNP Paribas chair, co-author of
            </p>
            <div class="tp-start-btn" @click="startEvent">
                start
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                marginTop:0
            }
        },
        methods:{
            startEvent(){
                this.$emit("isStart",true);
            }
        },
        mounted:function(){
            this.marginTop = "-"+document.getElementById("titlePage").clientHeight/2 + "px";
        }
    }
</script>
<style>
    #titlePage{
        position: absolute;
        width: 100%;
        top: 50%;
    }
    .tp-title{
        font-size: 9vw;
        color: #666666;
        width: 90%;
        margin: 5% auto 0;
        word-break: break-all ;
        text-align: center;
    }
    .tp-logo-main{
        width: 15%;
        margin: 10% auto 6%;
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
        font-size: 5vw;
    }
    .tp-start-btn{
        min-width: 30%;
        display: inline-block;
        background: #019ccb;
        margin: 10% auto 0;
        padding: 2% 4%;
        color: #ffffff;
    }
</style>