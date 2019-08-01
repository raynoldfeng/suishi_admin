<template>
    <div id="QuestMain" class="QuestMain1">
        <div id="QuestBox">
            <div class="img-main">
                <img id="selectImgBg" :src="data.selectAllJImg">
            </div>
            <p class="quest-text" v-text="data.selectAllJTitle"></p>
            <p class="quest-info common-info" v-text="data.selectAllJSubtitleTitle"></p>
            <ul id="selectBox" class="optionall-menu">
                <!--<li v-for="(data,index) in data.selectMenu" v-text="data.answerText"   class="answer-css animated" :class="{yes:data.isAnswer == '1' ,no:data.isAnswer == '0'}"></li>-->
            <!--<li class="explain" v-html="Trim(data.imgTextNote)">-->

            <!--</li>-->
                <li v-for="(data,index) in data.selectAllJMenu">
                    <div  class="answer-btn answer-css animated" :class="{yes:data.isAnswer == '1' ,no:data.isAnswer == '0'}" v-text="data.answerText"></div>
                    <div class="explain-main" v-html="Trim(data.selectTextNote)"></div>
                </li>
                <!--<li>-->
                   <!--<div  class="answer-btn answer-css no animated">  不是 </div>-->
                    <!--<div class="explain-main">谁看见爱上的啥快递会看见爱上对话框肯定是发货款收到回复及时的死快点哈肯定会可接受的拉速度</div>-->
                 <!--</li>-->
                 <!--<li >-->
                     <!--<div  class="answer-btn answer-css yes animated">  不是 </div>-->
                     <!--<div class="explain-main">谁看见爱上的啥快递会看见爱上对话框肯定是发货款收到回复及时的死快点哈肯定会可接受的拉速度</div>-->
                 <!--</li>-->
                 <!--<li>-->
                     <!--<div  class="answer-btn answer-css yes animated">  不是 </div>-->
                     <!--<div class="explain-main">谁看见爱上的啥快递会看见爱上对话框肯定是发货款收到回复及时的死快点哈肯定会可接受的拉速度</div>-->
                 <!--</li>-->
                 <!--<li >-->
                     <!--<div  class="answer-btn answer-css no animated">  不是 </div>-->
                     <!--<div class="explain-main">谁看见爱上的啥快递会看见爱上对话框肯定是发货款收到回复及时的死快点哈肯定会可接受的拉速度</div>-->
                 <!--</li>-->
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
        $("#selectBox li").on("touchstart",function(){
            $(".explain-main").hide();
            $(this).find(".explain-main").show();
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


.quest-text{
    margin-top: 10%;
    font-size: 5vw;
    color: #666;
    position: relative;
    z-index: 1;
}
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
    padding: 3% 2%;
    border: 1px solid #cbcbcb;
    font-size: 4vw;
    background: #ffffff;
    word-break: break-all;
}

.optionall-menu li .true-css{
    color: #ffffff;
    background: #286b36;
}
.optionall-menu li .false-css{
    color: #ffffff;
    background: #bf374b;
}
.none{
    display: none;
}
.optionall-menu li .explain-main{
    border: 0 solid transparent;
    font-size: 4vw;
    color: #666;
    display: none;
}

</style>