<template>
    <div id="QuestMain" >
        <div id="QuestBox" class="judgebox" >
            <p class="quest-text" id="judgeTitle" v-text="data.judgeTitle"></p>
            <div class="true-main">
                <div class="true-logo">对</div>
                <ul class="anwer-menu yesm">

                </ul>
                <div class="kuang true-k " :class="{ yes: data.judgeMenu[indexQ].judgeAnswer == '1' }">
                    <p></p>
                </div>
            </div>
            <div class="false-main">
                <div class="false-logo">错</div>
                <ul class="anwer-menu nom">

                </ul>
                <div class="kuang false-k " :class="{ yes: data.judgeMenu[indexQ].judgeAnswer == '0' }">
                    <p></p>
                </div>
            </div>

        </div>
        <div  class="animated judgebtn" v-show="jshow" v-html="Trim(data.judgeMenu[indexQ].judgeText)" @touchstart="touchStatus" :attr-all = "data.judgeMenu.length" attr-now="0" ></div>
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
            $(".judgebtn").css({top:window.innerHeight/1.5,left:(window.innerWidth-$(".judgebtn").width())/2});
            var oBox = $(".judgebtn");
            var oBar = $(".judgebtn");
            this.drops.phoneStartDrag(oBar, oBox ,".judgebtn",function(data){

            },(all,now)=>{
                $("#noteWin").show();
                $("#noteText").show();
console.log(now,all);

                if(now >= all){
                    self.jshow = false;
                }else{
                    window.jpage = now;
                    self.indexQ =  window.jpage;
                    console.log("aaaaaaaaa",self.indexQ);
                    console.log("ffffffffffffffffffffffffffffffffff"+self.data.judgeMenu[self.indexQ].judgeAnswerText)
                    if(now >= all-1){
                        $("#noteText").html(self.Trim(window.edit[nowPage].judgeMenu[window.jpage].judgeAnswerText));
                      $(".judgebtn").hide();
                    }else{
                        window.jpage++;
                        self.indexQ =  window.jpage;
                        $("#noteText").html(self.Trim(window.edit[nowPage].judgeMenu[window.jpage-1].judgeAnswerText));
                    }

                    $(".judgebtn").html(self.Trim(window.edit[nowPage].judgeMenu[window.jpage].judgeText))
                }

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
    background: #286b36;
}
.false-logo{
    /*color: red;*/
    background: #bf374b;
}
.judgebtn{
    width: 100px;
    height: auto;
    text-align: center;
    color: #333;
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
    background: #bf374b;
}
.q-main{
    text-align: center;
    margin: 50px auto 0;
}
.kuang{
    margin: 10% auto 0;
    width: 80%;
    height: 40px;
    border: 1px solid #ddd;
}
.kuang p{
    margin: 0;
    float: left;
    width: 100%;
    height: 40px;
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
.select-css{
    background: #efefef;
}
.anwer-menu{
    width:100%
}
.anwer-menu li{
        margin-top:4%;
        color:#fff;
        word-break:break-all;
        font-size: 4vw;
        padding:0 1%;
    }
.anwer-menu.yesm  li{
        background:#286b36;
    }
.anwer-menu.nom  li{
    background:#bf374b;
    }
</style>