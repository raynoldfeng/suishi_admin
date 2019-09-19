<template>
    <div id="QuestMain" >
        <div id="QuestBox" class="judgebox" >
            <p class="quest-text" id="lodingtext"   v-show="data.judgeTitle==''">loding</p>
            <p class="quest-text" id="judgeTitle" v-text="data.judgeTitle" v-show="data.judgeTitle!=''"></p>
            <p class="common-info" v-if="data.judgeInfo !='' " v-text="data.judgeInfo"></p>
            <div class="true-main">
                <p class="common-info css-bla" v-if="data.judgeTitleTrue !='' " v-text="data.judgeTitleTrue"></p>
                <div  class="judge-img" v-if="data.judgeTrueImg !=''"><img  :src="data.judgeTrueImg" /></div>
                <div class="true-logo" v-else></div>
                <ul class="anwer-menu yesm">

                </ul>
                <div class="kuang true-k " :class="{ yes: data.judgeMenu[indexQ].judgeAnswer == '1' }">
                    <p></p>
                </div>
            </div>
            <div class="false-main">
                <p class="common-info css-bla" v-if="data.judgeTitleFalse !='' " v-text="data.judgeTitleFalse"></p>
                <div class="judge-img" v-if="data.judgeFalseImg !=''"><img   :src="data.judgeFalseImg" /></div>
                <div class="false-logo" v-else ></div>
                <ul class="anwer-menu nom">

                </ul>
                <div class="kuang false-k " :class="{ yes: data.judgeMenu[indexQ].judgeAnswer == '0' }">
                    <p></p>
                </div>
            </div>
        </div>
        <div  class="animated judgebtn" v-show="jshow" v-html="Trim(data.judgeMenu[indexQ].judgeText)" :attr="data.judgeMenu[indexQ].judgeAnswerText"  @touchstart="touchStatus" :attr-all = "data.judgeMenu.length" attr-now="0" ></div>
        <div class="tp-start-btn nextbtn_ab" @click="jumpEvent"  v-text="data.judgeBtn" ></div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    props:{
        data:"",
            isReset:"",
            nowPage:"",
            page:""
    },
    data(){
      return{
          indexQ:0,
          jshow:true
      }
    },
    watch:{
        nowPage(){
            window.jpage = 0;
            $(".judgebtn").show();
            $(".true-k").show();
            $(".false-k").show();
            $(".nextbtn_ab").hide();
            $(".anwer-menu").html("");
            this.indexQ = 0;
            this.data =  window.edit[nowPage];
           // this.$emit("isReset",false);
        }
    },
    mounted:function(){
        this.initData();
        $(".nextbtn_ab").css({"margin-left": "-"+ (parseInt($(".nextbtn_ab").css("padding-left")) + $(".nextbtn_ab").width()/2)+"px"})
    },
    methods:{
        Trim(str) {
            return str.replace(/\n|\r\n/g,"<br/>");
        },
        initData(){
            var self = this;
            $(".judgebtn").css({top:window.innerHeight/1.2,left:(window.innerWidth-$(".judgebtn").width())/2});
            var oBox = $(".judgebtn");
            var oBar = $(".judgebtn");
            this.drops.phoneStartDrag(oBar, oBox ,".judgebtn",function(data){

            },(all,now)=>{

                if(now >= all){
                    self.jshow = false;
                }else{
                    window.jpage = now;
                    self.indexQ =  window.jpage;
//                    console.log("aaaaaaaaa",self.indexQ);
//                    console.log("ffffffffffffffffffffffffffffffffff"+self.data.judgeMenu[self.indexQ].judgeAnswerText)
                    if(now >= all-1){
                        $("#noteText p").html(self.Trim(window.edit[nowPage].judgeMenu[window.jpage].judgeAnswerText));
                      $(".judgebtn").hide();
                        $(".true-k").hide();
                        $(".false-k").hide();
                        if(self.data.judgeBtn != ''){
                            $(".nextbtn_ab").show();
                        }
                    }else{
                        window.jpage++;
                        self.indexQ =  window.jpage;
                        $("#noteText p").html(self.Trim(window.edit[nowPage].judgeMenu[window.jpage-1].judgeAnswerText));
                    }

                    $(".judgebtn").html(self.Trim(window.edit[nowPage].judgeMenu[window.jpage].judgeText));
                    $(".judgebtn").attr("attr",self.Trim(window.edit[nowPage].judgeMenu[window.jpage].judgeAnswerText));
                }
                $("#noteWin").show().addClass("noteWin-play");
                $("#noteText").css("bottom","-"+$("#noteText").height());
                $("#noteText").show().addClass("noteText-play");
            });
        },
        touchStatus(){

            var a = window.edit[nowPage].judgeMenu[window.jpage].judgeAnswer;
            if(a == '0'){
                $(".kuang").removeClass("yes");
                $(".false-k").addClass("yes");
            }else if(a == '1'){
                $(".kuang").removeClass("yes");
                $(".true-k").addClass("yes");
            }
            this.drops.getNow( window.jpage)
        },
        jumpEvent(){
            this.$emit("isJump",this.page+1);
        }
    }
}
</script>
<style>

.true-main, .false-main{
    width: 39%;
    padding: 0 5%;
    float: left;
}

.true-logo,.false-logo,.judge-img{
    width: 60px;
    height: 60px;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    margin: 5% auto 0;
    overflow: hidden;
    border-radius: 100%;
}
.judge-img img{
    width: 100%;
    height: 100%;
}
.true-logo{
    /*color: green;*/
    background:url("./../img/true_btn.png") no-repeat 0 0;
    background-size:100%;
}
.false-logo{
    /*color: red;*/
    background:url("./../img/false_btn.png") no-repeat 0 0;
    background-size:100%;
}
.judgebtn{
    width: 80%;
    height: auto;
    text-align: center;
    color: #666;
    background: #fff;
    padding: 2% 0;
    position:absolute;
    left:100px;
    top:300px;
    font-size: 0.65em;
    -moz-box-shadow:0px 2px 4px #999;
    -webkit-box-shadow:0px 2px 4px #999;
}
.true-k.answer-css{
    background: #286b36;
}
.false-k.answer-css{
    background: #286b36;
}
.q-main{
    text-align: center;
    margin: 50px auto 0;
}
.kuang{
    margin: 10% auto 0;
    width: 100%;
    height: 54px;
    border: 1px solid #ddd;
}
.kuang p{
    margin: 0;
    float: left;
    width: 100%;
    height: 54px;
    line-height: 40px;
    color: #ffffff;
    text-align: center;
}
#judgeTitle{
    font-size: 5vw;
    margin-top: 10%;
    color: #666;
}
#lodingtext{
    font-size: 5vw;
    margin-top: 10%;
    color: #666;
    padding-bottom: 10%;
    opacity: 0;
}
.select-css{
    background: #efefef;
}
.anwer-menu{
    width:100%;
    margin-top:10%;
}
.anwer-menu li{
        margin-top:4%;
        color:#fff;
        word-break:break-all;
        font-size: 4vw;
        padding:5% 4%;
    }
.anwer-menu.yesm  li{
        background:#286b36;
    }
.anwer-menu.nom  li{
    background:#bf374b;
    }
</style>