<template>
    <div id="QuestMain">
        <div id="imageText">
            <p class="it-title" v-text="data.imgTextTitle"></p>
            <div class="it-img-main simg-main-nobor">
                <div class="white-r">
                    <img :src="data.imgTextImg" />
                </div>
            </div>
            <ul class="it-text-menu commonListStyle" >
                <li v-for="textData in data.imgTextMenu" :class = "{commonMenuN:textData.imgTextValue == '0',commonMenuS:textData.imgTextValue == '1',commonMenuC:textData.imgTextValue == '2'
            ,commonMenuF:textData.imgTextValue == '3',commonMenuTC:textData.imgTextValue == '4',commonMenuX:textData.imgTextValue == '5'}" v-html="Trim(textData.text)"></li>
            </ul>
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
    methods:{
        Trim(str) {
            return str.replace(/\n|\r\n/g,"<br/>");
        }
    },
    mounted:function(){
        $(".it-img-main").height($(".it-img-main").width());
    }
}

 </script>
 <style>
    .it-title{
        font-size: 5vw;
        color: #666666;
        width: 90%;
        margin: 10% auto 0;
        word-break: break-all ;
        text-align: center;
    }
     .it-img-main{
        width: 28%;
         margin: 5% auto 0;
         border: 1px solid #d8d8d8;
         padding: 2%;
         border-radius: 100%;
     }
    .it-img-main img{
        width: 100%;
        height: 100%;
    }
    .it-text-menu{
        width: 75%;
        margin: 5% auto;
        font-size: 4.5vw;
        text-align: left;
    }
    .it-text-menu li{
        margin-top: 4%;
        color: #666666;
    }
    .it-text-menu li:before {
        margin-left: -1.3em;
    }
    .it-text-menu li:before {
        content: "•";
        padding-right: .5em;
        font-family: "iconfont";
        vertical-align: middle;
        display: inline-block;
    }
 </style>