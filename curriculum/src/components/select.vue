<template>
    <div id="QuestMain">
        <div id="QuestBox">
            <div v-for="(sdata,sindex) in data.selectQMenu" class="padd-css">
                <p class="quest-text" :class="{paddcss5v:sdata.selectTitle == ''}" v-text="sdata.selectTitle"></p>
                <p class="common-info" :class="{paddcss4d5v:sdata.selectInfo == ''}"  v-text="sdata.selectInfo"></p>
                <div class="img-main simg-main" v-if="sdata.selectImg">
                    <div class="white-r">
                        <img id="selectImgs" :src="sdata.selectImg" @click="displayEvent(sdata.selectImg,sdata.imgNoteNode,sdata.selectImgBig)">
                    </div>
                </div>
                <p class="common-info"   v-text="sdata.selectImgTitle"></p>
                <ul class="option-menu selectBox">
                    <li v-for="(data,index) in sdata.selectMenu"  v-text="data.answerText"   @click="test(sindex,index,data.isAnswer)" :indexQ = "sindex"   class="answer-css animated" :class="{yes:data.isAnswer == '1' ,no:data.isAnswer == '0' , clickcss:data.isClick,anwdisplay:data.isShow == false}">

                    </li>
                <li class="explain" v-html="Trim(sdata.imgTextNote)"  :class="{opacityami:sdata.imgTextNoteShow == true}"></li>
                <!--     <li class="answer-css no animated">
                <!-     <li class="answer-css no animated">
                         不是
                     </li>.operation-text
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
            data:"",
            nowyes:[]
    },
    data(){
        return {
            yesMenu:[],

        }
    },
        mounted:function(){
           // this.nowyes = [];
            this.sClickEvent();
            console.log(this.nowyes);

            for(let i = 0 ; i < this.data.selectQMenu.length ; i++){
                this.yesMenu.push({isTrue:0,allTrue:0});
                for(let a = 0; a < this.data.selectQMenu[i].selectMenu.length; a++){
                    if(this.data.selectQMenu[i].selectMenu[a].isAnswer == '1'){
                        this.yesMenu[i].allTrue++;
                    }
                }
            }
            $(".simg-main").height($(".simg-main").width());
//            for(var i = 0 ; i<$(".option-menu li").length;i++){
//                //$(".option-menu li").eq(i).css("top",i*0.09*parseInt($(document).outerHeight(true)));
//                if(i == 0){
//                    $(".option-menu li").eq(i).css("top",0);
//                }else{
//                    $(".option-menu li").eq(i).css("top",($(".option-menu li").eq(i-1).height()+(parseInt($(".option-menu li").eq(i-1).css("paddingTop"))*2)+3)+parseInt($(".option-menu li").eq(i-1).css("top"))+parseInt($(document).outerHeight(true))*0.02);
////                    console.log( $("#questionLeft li").eq(i-1).css("top"));
////                    console.log( (i*$("#questionLeft li").eq(i-1).height()+parseInt($("#questionLeft li").eq(i-1).css("paddingTop"))*2)+3)
//                }
//            }




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


        },
        watch:{
            nowyes(){

            }
        },
        methods:{
            Trim(str) {
                return str.replace(/\n|\r\n/g,"<br/>");
            },
            test(sindex,index,type){
                console.log(this);

                if(type == "1"){
                    if(this.data.selectQMenu[sindex].selectMenu[index].isClick){
                        return;
                    }else{
                        this.data.selectQMenu[sindex].selectMenu[index].isClick = true;
                        this.yesMenu[sindex].isTrue++;
                        if(this.yesMenu[sindex].isTrue == this.yesMenu[sindex].allTrue){
                            for(let i = 0 ; i < this.data.selectQMenu[sindex].selectMenu.length; i++){
                                if(this.data.selectQMenu[sindex].selectMenu[i].isAnswer == "0"){
                                    this.data.selectQMenu[sindex].selectMenu[i].isShow = false;
                                }
                            }
                            this.data.selectQMenu[sindex].imgTextNoteShow = true;
                        }
                    }
                }else{
                    this.data.selectQMenu[sindex].selectMenu[index].isClick = true;
                }

            },
            sClickEvent(){
                var self = this;
                $(".selectBox .yes").on("touchstart",function(){
//                    var indexQ = $(this).attr("indexQ");
//
//                    //  $("#selectBox .explain").show();
//                    if($(this).hasClass("true-css")){
//                        return;
//                    }else{
//                        $(this).addClass("true-css");
//                   //     console.log(indexQ);
//                     //   console.log(self.nowyes[indexQ]);
//                        self.nowyes[indexQ]++;
//                      //  console.log(self.nowyes.length)
//                        if(self.nowyes[indexQ] ==  $(this).parent().find(".yes").length){
//                            //  $(this).parent().find(".explain").show();
//                            $(this).parent().find(".answer-css").hide();
//                            $(this).parent().find(".yes").show();
//                            for(let i = 0; i<$(this).parent().find(".yes").length; i++){
//                                if(i == 0){
//                                    $(this).parent().find(".yes").eq(i).animate({top:0},800)
//                                }else{
//                                    $(this).parent().find(".yes").eq(i).animate({top:($(this).parent().find(".yes").eq(i-1).height()+(parseInt($(this).parent().find(".yes").eq(i-1).css("paddingTop"))*2)+3)+parseInt($(document).outerHeight(true))*0.02},800)
//                                }
//                            }
//                            $(this).parent().find(".explain").show();
//                            var yesLens = $(this).parent().find(".yes").length;
//                            //                        $(this).animate({top:0},800);
//                            //       $("#selectBox .explain").animate({top:yesLens*($("#selectBox .yes").eq(yesLens-1).height()+(parseInt($("#selectBox .yes").eq(yesLens-1).css("paddingTop"))*2)+3)+parseInt($(document).outerHeight(true))*0.03,opacity:1},1000)
////                        $(this).parent().find(".explain").animate({top:yesLens*($(this).parent().find(".yes").eq(yesLens-1).height()+(parseInt($(this).parent().find(".yes").eq(yesLens-1).css("paddingTop"))*2)+3)+parseInt($(document).outerHeight(true))*0.02,opacity:1},1000)
//                            $(this).parent().find(".explain").animate({opacity:1},2000);
//                        }
//
//                    }

                });


                $(".no").on("click",function(){
                    $(this).addClass("false-css");
                    $(this).addClass("shake")
                });
            },
            displayEvent(url,text,urlbig){
                var data = {url:url,text:text,urlbig:urlbig};
                this.$emit("imgShow",data);
            }
        }

    }
</script>
        <style>




        .option-menu{
            width: 70%;
            margin: 8% auto 0;
            position: relative;
            min-height:150px;
        }
        .option-menu li{
            width: 100%;
            margin-top: 5%;
            padding: 4% 2%;
            /*position: absolute;*/
            /*position: relative;*/
            border: 1px solid #cbcbcb;
            font-size: 4vw;
            background: #ffffff;
            word-break: break-all;
            overflow:hidden;
            border-radius: 4px;
        }

         .option-menu li.anwdisplay{
            animation:hides 0.3s linear 0s forwards;
            -webkit-animation:hides 0.3s linear 0s forwards;
         }

        @keyframes hides{
            0%{width: 100%;height:auto;opacity:1;margin-top: 5%;padding: 3% 2%;}
            100%{width: 100%;height:0;;opacity:0;margin-top: 0%;padding: 0;}
            }
        @-webkit-keyframes hides{
            0%{width: 100%;height:auto;opacity:1;margin-top: 5%;padding: 3% 2%;}
            100%{width: 100%;height:0;;opacity:0;margin-top: 0%;padding: 0;}
            }

        .option-menu li.true-css,.option-menu li.yes.clickcss{
            color: #ffffff;
            background: #286b36;
        }
        .option-menu li.false-css, .option-menu li.no.clickcss{
            color: #ffffff;
            background: #bf374b;
        }

        .option-menu li.true-css:before,.option-menu li.yes.clickcss:before{
            content: "√";
            padding-right: .5em;
            font-family: "iconfont";
            vertical-align: middle;
            display: inline-block;
         }
        .option-menu li.false-css:before, .option-menu li.no.clickcss:before{
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
        .option-menu li.explain{
            border: 0 solid transparent;
            font-size: 4.5vw;
            color: #666;
            opacity: 0;
            /*display: none;*/
        }
        .option-menu li.explain:before{
            content: "";
            padding-right: .5em;
            font-family: "iconfont";
            vertical-align: middle;
            display: inline-block;
         }
        .padd-css{
            padding: 0 0 50px 0;
        }
        .option-menu li.opacityami{
            transition: opacity 2s;
            -webkit-transition:opacity 2s;
            opacity:1;
        }

        </style>