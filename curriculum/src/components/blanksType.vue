<template>
    <div id="QuestMain">
        <div class="padd-bottom">
            <p class="quest-text common-text" v-text="data.blanksTitle"></p>
            <p class="common-info" v-text="data.blanksInfo"></p>
            <div class="btext-menu">
                <!--<div class="btext-main" v-for="(idata,index) in data.blanksMenu">-->
                <!--<span v-if="idata.blanksType == 1"  class="blanks-text" v-text="idata.blanksText"></span>-->
                <!--<div class="input-b-box" v-if="idata.blanksType == 2">-->
                <!--<div class="blanks-anw" contenteditable="true" v-text="idata.blanksInput" ></div>-->
                <!--<span v-if="idata.isShow == false" class="show-abtn" @click="showAnswer(index,idata.blanksAnswer)"> > </span>-->
                <!--<span  v-if="idata.isShow == true" class="true-btn"  @click="showAnswer(index,idata.blanksAnswer)">✔</span>-->
                <!--</div>-->

                <!--</div>-->
            </div>
        </div>

    </div>
</template>
<script>
import $ from 'jquery'
export default
{
    props:{
        data:""
    },
    data(){
        return{
            aShow:[],
        }
    },
    methods:{
//        showAnswer(index,anw){
//            this.data.blanksMenu[index].isShow = true;
//            this.data.blanksMenu[index].blanksInput = anw;
//        }
    },
    mounted:function(){
         var html = "";
        for(let i = 0;i < this.data.blanksMenu.length;i++){
            if(this.data.blanksMenu[i].blanksType == 1){
                html+= this.data.blanksMenu[i].blanksText;
            }else if(this.data.blanksMenu[i].blanksType == 2){
                html+= '<div class="input-b-box"><div class="blanks-anw" contenteditable="true"  >'+this.data.blanksMenu[i].blanksInput+'</div>'+
                        '<span class="show-abtn" key="'+this.data.blanksMenu[i].blanksAnswer+'"> ▼</span></div>'
            }
        }
        $(".btext-menu").html(html);
        $(".show-abtn").on("click",function(){
            $(this).prev().text($(this).attr("key"));
            $(this).addClass("true-btn").text("✔");
        })

    }
}
</script>
<style>
    .blanks-title{
        margin-top: 10%;
        font-size: 8vw;
        color: #666;
        position: relative;
        z-index: 1;
    }

    .blanks-text{
        display:inline-block;
        font-size:4vw;
    }
    .blanks-anw{
        min-width:22vw;
        border: 1px solid #dadada;
        float: left;
        font-size:4vw;
        margin-left:2vw;
        height: 1.8em;
    }
    .input-b-box{
        display: inline-block;
        position: relative;
        top: 2px;
    }
    .show-abtn{
        background: #f48335;
        color: #fff;
        float: left;
        font-size:4.5vw;
        text-align: center;
        width: 1.8em;
        height: 1.8em;
    }
    .true-btn{
       background: green;
        float: left;
        font-size:4vw;
        text-align: center;
        width: 1.8em;
        height: 1.8em;
    }
.btext-main{
    display: inline-block;
}
.btext-menu{
    text-align: left;
    font-size: 4.5vw;
    word-break: break-all;
    margin: 4vw 4vw 0;
    line-height: 1.8em;
}
</style>