<template>
    <div id="QuestMain">
        <div class="drag-main">
            <p class="quest-text" v-text="data.pairTypeTitle"></p>
            <p class="common-info" v-text="data.pairTypeInfo"></p>
            <ul class="question-menu">
                <li>
                    <p class="drag-text">hsdfjsdfjsdfsdbfhsg</p>
                    <div class="drag-box"></div>
                </li>
                <li>
                    <p class="drag-text">hsdfjsdfjsdfsdbfhsg</p>
                    <div class="drag-box"></div>
                </li>

            </ul>
        </div>
        <!--☰-->
        <div class="answer-menu">
            <div  class="animated dragboxbtn shake">adsd</div>
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
            newAMenu:[]
        }
    }
    methods:{
        Trim(str) {
            return str.replace(/\n|\r\n/g,"<br/>");
        }
    },
    mounted:function(){
        this.newAMenu = [];
        for(let i = 0; i < this.data.pairTypeMenu.length;i++){
            this.newAMenu =  $.merge(this.newAMenu,this.data.pairTypeMenu[i].pairTypeAmenu);
        }
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
           overflow: hidden;
    }
    .drag-text{
        width: 48%;
        float: left;
        font-size: 4.5vw;
        word-break:break-all;
    }
    .drag-box{
        width: 48%;
        height: 40px;
        margin: 0 0 0 2%;
        float: left;
        border: 1px solid #ddd;
    }
    .dragboxbtn {
        max-width: 80%;
        min-width: 30%;
        height: auto;
        text-align: center;
        color: #666;
        background: #fff;
        margin: 0 auto;
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
    background-color: #999999;
    padding: 2% 0;
}
.drag-main{
    width: 100%;
    height: 80%;
    overflow: auto;
}
</style>