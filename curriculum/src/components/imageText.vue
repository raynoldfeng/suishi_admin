<template>
    <div id="QuestMain">
        <div id="imageText">
            <p class="it-title" v-text="data.imgTextTitle"></p>
            <div class="it-img-main">
                <div class="white-r">
                    <img :src="data.imgTextImg" />
                </div>
            </div>
            <ul class="it-text-menu">
                <li v-for="textData in data.imgTextMenu" v-html="Trim(textData)">
                </li>

            </ul>
        </div>
    </div>
</template>
 <script>

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
        margin: 5% auto 0;
        word-break: break-all ;
        text-align: center;
    }
     .it-img-main{
        width: 28%;
         margin: 5% auto 0;
         border: 1px solid #999999;
         padding: 1%;
         border-radius: 100%;
     }
    .it-img-main img{
        width: 100%;
        height: 100%;
    }
    .it-text-menu{
        width: 75%;
        margin: 5% auto;
        font-size: 4vw;
        text-align: left;
    }
    .it-text-menu li{
        margin-top: 4%;
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