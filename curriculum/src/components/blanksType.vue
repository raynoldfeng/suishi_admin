<template>
    <div id="QuestMain">
        <p class="quest-text blanks-title" v-text="data.blanksTitle"></p>
        <p class="blanks-info" v-text="data.blanksInfo"></p>
        <div class="btext-menu">
            <div class="btext-main" v-for="(idata,index) in data.blanksMenu">
                    <span v-if="idata.blanksType == 1"  class="blanks-text" v-text="idata.blanksText"></span>
                <div class="input-b-box" v-if="idata.blanksType == 2">
                   <div class="blanks-anw" contenteditable="true" v-text="idata.blanksInput" ></div>
                    <span v-if="idata.isShow == false" class="show-abtn" @click="showAnswer(index,idata.blanksAnswer)"> > </span>
                    <span  v-if="idata.isShow == true" class="true-btn"  @click="showAnswer(index,idata.blanksAnswer)">✔</span>
                </div>

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
        showAnswer(index,anw){
            this.data.blanksMenu[index].isShow = true;
            this.data.blanksMenu[index].blanksInput = anw;
        }
    },
    mounted:function(){
         var html = "";
        for(let i = 0;i < this.data.blanksMenu.length;i++){
            if(this.data.blanksMenu[i].blanksType == 1){
                html+= this.data.blanksMenu[i].blanksText;
            }else if(this.data.blanksMenu[i].blanksType == 2){
                html+= '<div class="input-b-box"><div class="blanks-anw" contenteditable="true"  >'+this.data.blanksMenu[i].blanksInput+'</div>'+
                        '<span class="show-abtn" key="'+this.data.blanksMenu[i].blanksAnswer+'"> > </span></div>'
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
    .blanks-info{
        font-size: 4vw;
        color: #666;
        z-index: 1;
    }
    .blanks-text{
        display:inline-block;
        font-size:4vw;
    }
    .blanks-anw{
        min-width:25vw;
        border: 1px solid #999;
        float: left;
        font-size:4vw;
    }
    .input-b-box{
        display: inline-block;
        position: relative;
        top: 2px;
    }
    .show-abtn{
        background: skyblue;
        color: #fff;
        float: left;
        font-size:4.5vw;
        width: 5vw;
        text-align: center;
    }
    .true-btn{
       background: green;
        float: left;
        font-size:4vw;
        width: 5vw;
        text-align: center;
    }
.btext-main{
    display: inline-block;
}
.btext-menu{
    text-align: left;
    font-size: 4vw;
    word-break: break-all;
}
</style>