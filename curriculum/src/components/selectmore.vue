<template>
    <div id="QuestMain">
        <div id="selectmore">
            <p class="sm-q-title">
                sdasdasdasdfg
            </p>
            <p class="operation-text">kjghkdfjuishfuiashdjkah</p>
            <div class="sm-question-menu">
                <div  class="sm-question-main">
                    <img id="questionImgLeft" src="https://mohivecontents-jp.crossknowledge.com/staticcoursecontent/en-gb/bsfi633/medias/D3F52562-7A6B-465B-B309-A38D94056795/Q3_D3F52562-7A6B-465B-B309-A38D94056795.jpg">
                    <div class="sm-q-box">
                        <ul class="sm-option-menu" id="questionLeft">
                            <li class="answer-css no animated">
                                不是
                            </li>
                            <li class="answer-css yes animated">
                                是根据皮亚诺的五条公理用非形式化的方法叙述如
                            </li>
                            <li class="answer-css no animated">
                                不知道
                            </li>
                            <li class="explain">
                                根据皮亚诺的五条公理用非形式化的方法叙述如下: ①1是自然数; ②每一个确定的自然数 a,都有一个确定的后继数a'
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="sm-question-main">
                    <img id="questionImgRight" src="https://mohivecontents-jp.crossknowledge.com/staticcoursecontent/en-gb/bsfi633/medias/D3F52562-7A6B-465B-B309-A38D94056795/Q3_D3F52562-7A6B-465B-B309-A38D94056795.jpg">
                    <div class="sm-q-box">
                    <ul class="sm-option-menu" id="questionRight">
                        <li class="answer-css no animated">
                            不是
                        </li>
                        <li class="answer-css yes animated">
                            是
                        </li>
                        <li class="answer-css yes animated">
                            不知道
                        </li>
                        <li class="explain">
                            根据皮亚诺的五条公理用非形式化的方法叙述如下: ①1是自然数; ②每一个确定的自然数 a,都有一个确定的后继数a'
                        </li>
                    </ul>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
    export default{
        data(){
            return {
                allyes:2,
                nowyes:0
            }
        },
        methods:{
            questionPosition(){
                for(var i = 0 ; i<$("#questionLeft li").length;i++){

                    if(i == 0){
                        $("#questionLeft li").eq(i).css("top",0);
                    }else{
                        $("#questionLeft li").eq(i).css("top",($("#questionLeft li").eq(i-1).height()+(parseInt($("#questionLeft li").eq(i-1).css("paddingTop"))*2)+3)+parseInt($("#questionLeft li").eq(i-1).css("top"))+parseInt($(document).outerHeight(true))*0.02);
//                    console.log( $("#questionLeft li").eq(i-1).css("top"));
//                    console.log( (i*$("#questionLeft li").eq(i-1).height()+parseInt($("#questionLeft li").eq(i-1).css("paddingTop"))*2)+3)
                    }

                }
                for(var i = 0 ; i<$("#questionRight li").length;i++){
                    //    $("#questionRight li").eq(i).css("top",i*0.09*parseInt($(document).outerHeight(true)));
                    if(i == 0){
                        $("#questionRight li").eq(i).css("top",0);
                    }else{
                        $("#questionRight li").eq(i).css("top",($("#questionRight li").eq(i-1).height()+(parseInt($("#questionRight li").eq(i-1).css("paddingTop"))*2)+3)+parseInt($("#questionRight li").eq(i-1).css("top"))+parseInt($(document).outerHeight(true))*0.02);
                    }
                }
            },
            clickEvent(){
                var self = this;
                $("#questionLeft .yes").on("touchstart",function(){
                    $(this).addClass("true-css");
                    $("#questionLeft .answer-css").hide();
                    $(this).show();
                    $(this).animate({top:0},800);
                    $("#questionLeft .explain").show();
                    var yesLens = $("#questionLeft .yes").length;
                    $("#questionLeft .explain").animate({top:yesLens*($("#questionLeft .yes").eq(yesLens-1).height()+(parseInt($("#questionLeft .yes").eq(yesLens-1).css("paddingTop"))*2)+3)+parseInt($(document).outerHeight(true))*0.02,opacity:1},1000)

                });

                $("#questionRight .yes").on("touchstart",function(){
                    $("#questionRight .explain").show();
                    if($(this).hasClass("true-css")){
                        return;
                    }else{

                        $(this).addClass("true-css");
                        self.nowyes++;
                        if(self.nowyes == self.allyes){
                            $("#questionRight .answer-css").hide();
                            $("#questionRight .yes").show();
                            for(let i = 0; i<$("#questionRight .yes").length; i++){
                                if(i == 0){
                                    $("#questionRight .yes").eq(i).animate({top:0},800)
                                }else{
                                    $("#questionRight .yes").eq(i).animate({top:($("#questionRight .yes").eq(i-1).height()+(parseInt($("#questionRight .yes").eq(i-1).css("paddingTop"))*2)+3)+parseInt($(document).outerHeight(true))*0.02},800)
                                }
                            }
                            $("#questionRight .explain").show();
                            var yesLens = $("#questionRight .yes").length;
//                        $(this).animate({top:0},800);
                            $("#questionRight .explain").animate({top:yesLens*($("#questionRight .yes").eq(yesLens-1).height()+(parseInt($("#questionRight .yes").eq(yesLens-1).css("paddingTop"))*2)+3)+parseInt($(document).outerHeight(true))*0.03,opacity:1},1000)
                        }

                    }

                });

                $(".no").on("touchstart",function(){
                    $(this).addClass("false-css");
                    $(this).addClass("shake")
                });
            },
            questionDisplay(){
                $("#questionLeft,#questionRight").hide();
                $("#questionImgLeft").on("touchstart",function(){
                    $("#questionLeft").show().animate({opacity:1},800)
                });
                $("#questionImgRight").on("touchstart",function(){
                    $("#questionRight").show().animate({opacity:1},800)
                });
            }
        },
        mounted:function(){
            this.questionPosition();
            this.clickEvent();
            this.questionDisplay();
        }
    }
</script>
<style>
    .sm-question-menu{
        margin-top: 10%;
    }
    .sm-question-main{
        display: inline-block;
        width: 40%;
        margin: 0 3% ;
        text-align: center;
    }
    .sm-q-title{
        font-size: 9vw;
        color: #666666;
        width: 90%;
        margin: 5% auto 0;
        word-break: break-all ;
        text-align: center;
    }
    .operation-text{
        width: 90%;
        font-size: 4vw;
        text-align: center;
        word-break: break-all ;
        color: #acafb2;
        margin: 5% auto 0;
    }
    #questionImgLeft,#questionImgRight{
        width: 30%;
        border-radius: 100%;
    }
    .sm-option-menu{
        width: 100%;
        position: absolute;
        margin-top: 10%;
        opacity: 0;
    }
    .sm-option-menu li{
        width: 100%;
        margin-top: 5%;
        padding: 3% 2%;
        position: absolute;
        border: 1px solid #cbcbcb;
        font-size: 4vw;
        background: #ffffff;
    }
    .sm-option-menu li.explain{
        border: 0 solid transparent;
        font-size: 4vw;
        color: #666;
        opacity: 0;
        display: none;
    }

    .sm-option-menu li.true-css{
        color: #ffffff;
        background: #286b36;
    }
    .sm-option-menu li.false-css{
        color: #ffffff;
        background: #bf374b;
    }
    .none{
        display: none;
    }
    .sm-q-box{
        position: relative;
    }
</style>