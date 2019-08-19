<template>
    <div id="QuestMain" >
        <div id="QuestBox" class="judgebox" >
            <p class="quest-text" id="lodingtext"   v-show="data.judgeTitle==''">loding</p>
            <p class="quest-text" id="judgeTitle" v-text="data.judgeTitle" v-show="data.judgeTitle!=''"></p>
            <div class="true-main">
                <div class="true-logo"></div>
                <ul class="anwer-menu yesm">

                </ul>
                <div class="kuang true-k " :class="{ yes: data.judgeMenu[indexQ].judgeAnswer == '1' }">
                    <p></p>
                </div>
            </div>
            <div class="false-main">
                <div class="false-logo"></div>
                <ul class="anwer-menu nom">

                </ul>
                <div class="kuang false-k " :class="{ yes: data.judgeMenu[indexQ].judgeAnswer == '0' }">
                    <p></p>
                </div>
            </div>
        </div>
        <div  class="animated judgebtn" v-show="jshow" v-html="Trim(data.judgeMenu[indexQ].judgeText)" :attr="data.judgeMenu[indexQ].judgeAnswerText"  @touchstart="touchStatus" :attr-all = "data.judgeMenu.length" attr-now="0" ></div>

    </div>
</template>
<script>
import $ from 'jquery'
export default {
    props:{
        data:"",
            isReset:"",
            nowPage:""
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
            $(".anwer-menu").html("");
            this.indexQ = 0;
            this.data =  window.edit[nowPage];
           // this.$emit("isReset",false);
        }
    },
    mounted:function(){
        this.initData();
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
                    console.log("aaaaaaaaa",self.indexQ);
                    console.log("ffffffffffffffffffffffffffffffffff"+self.data.judgeMenu[self.indexQ].judgeAnswerText)
                    if(now >= all-1){
                        $("#noteText p").html(self.Trim(window.edit[nowPage].judgeMenu[window.jpage].judgeAnswerText));
                      $(".judgebtn").hide();
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

.true-logo,.false-logo{
    /*width: 100px;*/
    /*height: 30px;*/
    width: 60px;
    height: 60px;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    margin: 0 auto;
    border-radius: 100%;
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
    width: 100px;
    height: auto;
    text-align: center;
    color: #666;
    background: #fff;
    padding: 2% 0;
    position:absolute;
    left:100px;
    top:300px;
    font-size:12px;
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
    padding-bottom: 10%;
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