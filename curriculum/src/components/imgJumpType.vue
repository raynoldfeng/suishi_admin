<template>
    <div id="QuestMain" class="QuestMain1">
        <div id="QuestBox">
            <div class="img-main">
                <img id="selectImgBg" :src="data.ImgJumpTypeBg">
            </div>
            <p class="quest-text" :class="{color-fff:data.ImgJumpTypeTitleColor == '1'}" v-text="data.ImgJumpTypeTitle"></p>
            <p class="quest-info common-info" :class="{color-fff:data.ImgJumpTypeTitleColor == '1'}" v-text="data.ImgJumpTypeInfo"></p>
            <div class="tp-startBtn-main">
                <div class="tp-start-btn" @click="jumpEvent" v-if="data.ImgJumpBtnText != ''"  v-text="data.ImgJumpBtnText"></div>
            </div>

        </div>
    </div>
</template>
<script>
import $ from 'jquery'
    export default{
        props:{
            data:"",
            page:0
        },
    data(){
        return {
            nowyes:0
        }
    },
    mounted:function(){
        console.log(this.page)
    },
    methods:{
        Trim(str) {
            return str.replace(/\n|\r\n/g,"<br/>");
        },
        jumpEvent(){
            this.$emit("isJump",this.page+1);
        }
    }
    }
</script>
        <style>
        .quest-info{
            position: relative;
            z-index: 1;
            color: #999999;
        }
        .tp-start-btn{
            min-width: 30%;
            display: inline-block;
            background: #019ccb;
            margin: 0 auto 0;
            padding: 2% 4%;
            color: #ffffff;
            font-size: 4vw;
            position: relative;
        }
        .tp-startBtn-main{
            width: 100%;
            position: absolute;
            top: 65%;
        }
        </style>