<template>
    <div id="QuestMain">
        <div id="QuestBox">
            <p class="quest-text" id="judgeTitle" v-text="data.judgeTitle"></p>
            <div class="true-main">
                <div class="true-logo">对</div>
                <div class="kuang true-k " :class="{ yes: data.judgeAnswer == '1' }">
                    <p></p>
                </div>
            </div>
            <div class="false-main">
                <div class="false-logo">错</div>

                <div class="kuang false-k " :class="{ yes: data.judgeAnswer == '0' }">
                    <p></p>
                </div>
            </div>

        </div>
        <div id="nbox" class="animated" v-html="Trim(data.judgeText)"></div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    props:{
        data:""
    },
    mounted:function(){
        var self = this;
        $("#nbox").css({top:window.innerHeight/1.5,left:(window.innerWidth-$("#nbox").width())/2});
//        var oBox = document.getElementById("nbox");
//        var oBar = document.getElementById("nbox");
        // this.drop.phoneStartDrag(oBar, oBox ,"#nbox");
//        this.drops.phoneStartDrag(oBar, oBox ,"#nbox",function(data){
//
//        },()=>{
//            $("#noteWin").show();
//             $("#noteText").show();
//        $("#noteText").html(this.Trim(this.data.judgeAnswerText))
//        });
        var oBox = $("#nbox");
        var oBar = $("#nbox");
        this.drops.phoneStartDrag(oBar, oBox ,"#nbox",function(data){

            },()=>{
                $("#noteWin").show();
            $("#noteText").show();
            $("#noteText").html(this.Trim(this.data.judgeAnswerText))
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

.true-main, .false-main{
    width: 35%;
    padding:0 10px ;
    display: inline-block;
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
#nbox{
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

</style>