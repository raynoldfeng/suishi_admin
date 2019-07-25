<template>
    <div id="QuestMain">
        <div id="QuestBox">
            <div v-for="(sdata,sindex) in data">
                <p class="quest-text" v-text="sdata.selectTitle"></p>
                <div class="img-main">
                    <img id="selectImg" :src="sdata.selectImg">
                </div>
                <ul class="option-menu selectBox">
                    <li v-for="(data,index) in sdata.selectMenu" v-text="data.answerText"   class="answer-css animated" :class="{yes:data.isAnswer == '1' ,no:data.isAnswer == '0'}"></li>
                <li class="explain" v-html="Trim(sdata.imgTextNote)">

                </li>
                <!--     <li class="answer-css no animated">
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
                     </li>-->
            </ul>
            </div>


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
            var self = this;
            for(var i = 0 ; i<$(".option-menu li").length;i++){
                //$(".option-menu li").eq(i).css("top",i*0.09*parseInt($(document).outerHeight(true)));
                if(i == 0){
                    $(".option-menu li").eq(i).css("top",0);
                }else{
                    $(".option-menu li").eq(i).css("top",($(".option-menu li").eq(i-1).height()+(parseInt($(".option-menu li").eq(i-1).css("paddingTop"))*2)+3)+parseInt($(".option-menu li").eq(i-1).css("top"))+parseInt($(document).outerHeight(true))*0.02);
//                    console.log( $("#questionLeft li").eq(i-1).css("top"));
//                    console.log( (i*$("#questionLeft li").eq(i-1).height()+parseInt($("#questionLeft li").eq(i-1).css("paddingTop"))*2)+3)
                }
            }




            //$(".option-menu li").css("height",parseInt($(".answer-css").outerHeight(true)));
//            $("#selectBox .yes").on("touchstart",function(){
//                $(this).addClass("true-css");
//                $("#selectBox .answer-css").hide();
//                $(this).show();
//                $(this).animate({top:0},800);
////                $("#selectBox .explain").animate({top:parseInt($(this).outerHeight(true)),opacity:1},1000);
//
//                $("#selectBox .explain").show();
//                var yesLens = $("#selectBox .yes").length;
//                $("#selectBox .explain").animate({top:yesLens*($("#selectBox .yes").eq(yesLens-1).height()+(parseInt($("#selectBox .yes").eq(yesLens-1).css("paddingTop"))*2)+3)+parseInt($(document).outerHeight(true))*0.02,opacity:1},1000)
//            });

            $(".selectBox .yes").on("touchstart",function(){
                $(this).parent().find(".explain").show();
              //  $("#selectBox .explain").show();
                if($(this).hasClass("true-css")){
                    return;
                }else{
                    $(this).addClass("true-css");
                    self.nowyes++;
                    if(self.nowyes ==  $(this).parent().find(".yes").length){
                        $(this).parent().find(".answer-css").hide();
                        $(this).parent().find(".yes").show();
                        for(let i = 0; i<$(this).parent().find(".yes").length; i++){
                            if(i == 0){
                                $(this).parent().find(".yes").eq(i).animate({top:0},800)
                            }else{
                                $(this).parent().find(".yes").eq(i).animate({top:($(this).parent().find(".yes").eq(i-1).height()+(parseInt($(this).parent().find(".yes").eq(i-1).css("paddingTop"))*2)+3)+parseInt($(document).outerHeight(true))*0.02},800)
                            }
                        }
                        $(this).parent().find(".explain").show();
                        var yesLens = $(this).parent().find(".yes").length;
                        //                        $(this).animate({top:0},800);
                 //       $("#selectBox .explain").animate({top:yesLens*($("#selectBox .yes").eq(yesLens-1).height()+(parseInt($("#selectBox .yes").eq(yesLens-1).css("paddingTop"))*2)+3)+parseInt($(document).outerHeight(true))*0.03,opacity:1},1000)
                        $(this).parent().find(".explain").animate({top:yesLens*($(this).parent().find(".yes").eq(yesLens-1).height()+(parseInt($(this).parent().find(".yes").eq(yesLens-1).css("paddingTop"))*2)+3)+parseInt($(document).outerHeight(true))*0.02,opacity:1},1000)
                    }

                }

            });


            $(".no").on("click",function(){
                $(this).addClass("false-css");
                $(this).addClass("shake")
            });
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
        }

        .option-menu{
            width: 70%;
            margin: 8% auto 0;
            position: relative;
        }
        .option-menu li{
            width: 100%;
            margin-top: 5%;
            padding: 3% 2%;
            position: absolute;
            border: 1px solid #cbcbcb;
            font-size: 4vw;
            background: #ffffff;
            word-break: break-all;
        }

        .option-menu li.true-css{
            color: #ffffff;
            background: #286b36;
        }
        .option-menu li.false-css{
            color: #ffffff;
            background: #bf374b;
        }
        .none{
            display: none;
        }
        .option-menu li.explain{
            border: 0 solid transparent;
            font-size: 4vw;
            color: #666;
            opacity: 0;
            display: none;
        }
            #selectImg{
            width:60%;
            }
        </style>