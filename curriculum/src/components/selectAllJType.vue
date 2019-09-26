<template>
    <div id="QuestMain" class="QuestMain1">
        <div id="QuestBox">
            <img id="selectImgBg" :src="data.selectAllJImg">
            <p class="quest-text" :class="{colorfff:data.selectAllJSubtitleTitleColor == '1',paddcss5v:data.selectAllJTitle == ''}" v-text="data.selectAllJTitle"></p>
            <p class="quest-info common-info" :class="{colorfff:data.selectAllJSubtitleTitleColor == '1',paddcss45v:data.selectAllJSubtitleTitle == '' }"  v-text="data.selectAllJSubtitleTitle"></p>
            <div class="select-img-main sm-img-main simgnobor" v-if="data.selectAllJSImg">
                <div class="white-r">
                    <img id="selectImgs" :src="data.selectAllJSImg" >
                </div>
            </div>
            <ul id="selectBox" class="optionall-menu">
                <li v-for="(datas,index) in data.selectAllJMenu">
                    <div  class="answer-btn answer-css animated" :class="{yes:datas.isAnswer == '1' ,no:datas.isAnswer == '0'}" v-text="datas.answerText"></div>
                    <div class="explain-main" :class="{colorfff:data.selectAllJSubtitleTitleColor == '1'}" v-html="Trim(datas.selectTextNote)"></div>
                </li>

        </ul>

    </div>
</div>
        </template>
<script>
import $ from 'jquery'
export default {
    props:{
        data:""
    },
    data(){
        return {
            nowyes:0
        }
    },
    mounted:function(){
        $(".select-img-main").height($(".select-img-main").width());
        $("#selectBox li").on("touchstart",function(){
            $(".explain-main").hide().removeClass("explain-show");
            $(this).find(".explain-main").show().addClass("explain-show");
            var answerBtn = $(this).find(".answer-btn");
            if(answerBtn.hasClass("yes")){
                answerBtn.addClass("true-css");
            }else if(answerBtn.hasClass("no")){
                answerBtn.addClass("false-css")
            }
        })
    },
    methods:{
        Trim(str) {
            return str.replace(/\n|\r\n/g,"<br/>");
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

.optionall-menu{
    width: 70%;
    margin: 8% auto 0;
    position: relative;
}
.optionall-menu li .answer-btn{
    width: 100%;
    margin-top: 5%;
    padding: 4% 2%;
    border: 1px solid #cbcbcb;
    font-size: 4.5vw;
    background: #ffffff;
    word-break: break-all;
    border-radius: 4px;
}

.optionall-menu li .true-css{
    color: #ffffff;
    background: #286b36;
    border: 1px solid #286b36;
}
.optionall-menu li .false-css{
    color: #ffffff;
    background: #bf374b;
    border: 1px solid #bf374b;
}
.optionall-menu li .true-css:before{
    content: "√";
    padding-right: .5em;
    font-family: "iconfont";
    vertical-align: middle;
    display: inline-block;
    }
.optionall-menu li .false-css:before{
    content: "×";
    padding-right: .5em;
    font-family: "iconfont";
    vertical-align: middle;
    display: inline-block;
    margin-top:-2%;
    }
.none{
    display: none;
}
.optionall-menu li .explain-main{
    border: 0 solid transparent;
    font-size: 4.5vw;
    color: #304449;
    opacity:0;
    display:none;
    margin-top:3%;
}

.optionall-menu li .colorfff{
    color: #fff;
}

.explain-show{
    animation: shows 0.5s linear 0s forwards;
    -webkit-animation: shows 0.5s linear 0s forwards;
}
@keyframes shows{
    0%{opacity:0}
    100%{opacity:1}
}
@-webkit-keyframes shows{
    0%{opacity:0}
    100%{opacity:1}
}
</style>