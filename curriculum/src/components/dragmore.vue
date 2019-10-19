<template>
    <div id="QuestMain">
        <div class="drag-main" :class="{dragMheight:isfinish == true && data.pairTypeBtnText.length == 0}">
            <p class="quest-text" v-text="data.pairTypeTitle"></p>
            <p class="common-info" v-text="data.pairTypeInfo"></p>
            <ul class="question-menu">
                <li v-for="(sdata,index) in data.pairTypeMenu">
                    <div class="question-main">
                        <p class="drag-text" v-text="sdata.pairTypeQtitle"></p>
                       <div class="drag-img" v-if="sdata.pairTypeQimg">
                            <div class="white-r">
                                <img class="idt-img" @click="displayEvent(sdata.pairTypeQimg,'',sdata.pairTypeQimg)" :src="sdata.pairTypeQimg">
                            </div>
                       </div>

                    </div>
                    <div class="drag-menu">
                        <div class="finish-css" v-for="(adata,aindex) in readMenu" v-if="sdata.pairTypeQindex == adata.pairTypeAindex" @click="contextShow(adata.pairTypeAcontext)" v-text="adata.pairTypeAtitle"></div>
                        <div class="drag-box" :class="{clicked:ispair != (-1)}" v-show="isfinish == false"  @click="pairEvent(sdata.pairTypeQindex)"></div>
                    </div>

                </li>
            </ul>
        </div>
        <!--☰-->
        <div class="answer-menu" v-if="isfinish == false">
            <!--<div  class="animated dragboxbtn " v-show="isfinish == false"  :class="{clicked:ispair,shake:istrue == 'false'}" @click="pairChange" v-html="nowAnswer.pairTypeAtitle"></div>-->
            <div v-for="(datas,index) in allAMenu"  class="animated dragboxbtn "   :class="{clicked:ispair == index,shake:(istrue == 'false' && ispair == index)}" @click="pairChange(index)" v-html="datas.pairTypeAtitle"></div>
        </div>
        <div class="answer-menu" v-if="isfinish == true" v-show="data.pairTypeBtnText.length > 0">
           <div class="tp-start-btn nomargin" @click="jumpEvent" v-if="data.pairTypeBtnText.length > 0"   v-text="data.pairTypeBtnText"></div>
        </div>

</div>
</template>
<script>
import $ from 'jquery'
export default
{
    props:{
        data:"",
        page:0
    },
    data(){
        return{
            allAMenu:[],
            unAMenu:[],
            readMenu:[],
            nowAnswer:"",
            ispair:-1, //是否点击
            istrue:false, //是否正确
            dataIndex:0,
            allNum:0,
            isfinish:false,
            allCMenu:""   //还没改变之前所有数据
        }
    },
    methods:{
        Trim(str) {
            return str.replace(/\n|\r\n/g,"<br/>");
        },
//        aShowEvent(){
//            if(this.allAMenu.length == 1){
//                this.dataIndex = 0;
//            }else{
//                this.dataIndex =  parseInt(Math.random()*this.allAMenu.length);
//            }
//            this.nowAnswer = this.allAMenu[this.dataIndex];
//            this.allAMenu.splice(this.dataIndex,1);
//        },
        /**
         * 点击选项
         */
        pairEvent(index){
            var _this = this;
            if(this.ispair != (-1)){
                if(this.nowAnswer.pairTypeAindex == index){
                    this.allAMenu.splice(this.ispair,1);

                    this.readMenu.push(this.nowAnswer);
                    this.contextShow(this.nowAnswer.pairTypeAcontext)
                 //   this.drops.getNow(this.nowAnswer.pairTypeAcontext);

    //                this.pairChange();

                    if(this.readMenu.length < this.allNum){
//                        this.aShowEvent();
                        this.ispair = -1;
                    }else{
                        this.isfinish = true;
                    }
                }else{
                    this.istrue = "false";
                    setTimeout(function(){
                        _this.istrue = "";
                        _this.ispair = -1;
                    },800);
                }
            }
        },
    //改中
        pairChange(index){
           if(this.ispair == index){
                this.ispair = -1;
            }else{
                this.ispair = index;
            }
            this.nowAnswer = this.allAMenu[index];
            this.istrue = "";
        },
        displayEvent(url,text,urlbig){
            var data = {url:url,text:text,urlbig:urlbig};
            this.$emit("imgShow",data);
        },
        contextShow(text){
            if(text != ''){
                $("#noteText p").html(this.Trim(text));
                $("#noteWin").show().addClass("noteWin-play");
                $("#noteText").css("bottom","-"+$("#noteText").height());
                $("#noteText").show().addClass("noteText-play");
            }
        },
        jumpEvent(){
            this.$emit("isJump",this.page+1);
        }
    },
    //改中
    mounted:function(){
         $(".drag-img").height($(".drag-img").width());
        this.allAMenu = [];
        for(let i = 0; i < this.data.pairTypeMenu.length;i++){
            this.allCMenu =  $.merge(this.allAMenu,this.data.pairTypeMenu[i].pairTypeAmenu);
        }
     //   console.log(this.allAMenu);
        this.allNum = this.allCMenu.length;
        for(let a = 0;a < this.allNum;a++ ){
            var r = parseInt(Math.random()*this.allCMenu.length);
            this.allAMenu.push(this.allCMenu[r]);
            this.allCMenu.splice(r,1);
        }

//        this.aShowEvent();
    },
    watch:{

    }
}
</script>
<style>
    .question-menu{
        width: 94%;
        margin: 5% auto 0;
        padding-bottom: 15%;
    }
    .question-menu li{
            margin-top: 3%;
            color:#666;
           overflow: hidden;
    }
    .drag-text{
        font-size: 4.5vw;
        text-align:left;
        word-break:break-all;
        margin-bottom: 4%;;
    }
    .drag-menu{
        width: 48%;
        float: right;
        margin: 0 0 0 2%;
        font-size: 4.5vw;
    }
    .drag-box{
        width: 98%;
        height: 40px;
        border: 1px solid #ddd;
    }
    .drag-box.clicked{
        background: #efefef;
        color: #ffffff;
    }
    .finish-css{
        width: 92%;
        margin: 0 0 2% 2%;
        background: #286b36;
        padding: 1% 4%;
        color: #ffffff;
        text-align: left;
        font-size: 4vw;;
    }
    .dragboxbtn {
        max-width: 80%;
        min-width: 30%;
        height: auto;
        text-align: center;
        color: #666;
        background: #fff;
        margin: 4% auto;
        padding: 3% 0;
        /*position: absolute;*/
        /*left: 100px;*/
        /*top: 300px;*/
        font-size: 4vw;
        -moz-box-shadow: 0 2px 4px #999;
        -webkit-box-shadow: 0 2px 4px #999;
    }
.answer-menu{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20%;
    overflow: auto;
    background-color: #ebebeb;
    padding: 2% 0;
}
.drag-main{
    width: 100%;
    height: 80%;
    overflow: auto;
}
.dragMheight{
    height: 100%;
}
.dragboxbtn.clicked{
    background: #999999;
    color: #ffffff;
}
.question-main{
    width: 48%;
    float: left;
 }
 .drag-img{
    width: 50%;
    margin: 0 auto 0;
    border: 1px solid #d8d8d8;
    border-radius: 100%;
    padding: 2%;
    }
</style>