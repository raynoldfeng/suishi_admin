<template>
    <div id="QuestMain">
        <p class="quest-text" v-text="data.listTypeTitle"></p>
        <div class="sideEdgeBox">
            <div class="sideEdgeBoxImg" :class="{sideEdgeBoxLeft:data.sideEdgeImgLRType == '0', sideEdgeBoxRight:data.sideEdgeImgLRType == '1'}">
                <img @click="displayEvent(data.sideEdgeImg,'')" :src="data.sideEdgeImg">
            </div>
            <div class="sideEdgeBoxMain" :class="{sideEdgeBoxLeft:data.sideEdgeImgLRType == '0', sideEdgeBoxRight:data.sideEdgeImgLRType == '1'}">
                <p v-html="Trim(data.sideEdgeImgTypeInfo)"></p>
                <ul class="sideEdgeBoxMenu">
                    <li v-for="(datas,index) in data.sideEdgeImgMenu" v-html="Trim(datas.sideEdgeImgTypeText)"></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
 export default {
    props:{
        data:""
    },
     data(){
        return{

        }
    },
    mounted:function(){


    },
    methods:{
        Trim(str) {
            return str.replace(/\n|\r\n/g,"<br/>");
        },
        displayEvent(url,text){
            var data = {url:url,text:text};
            this.$emit("imgShow",data);
        },


    }
}
</script>
    <style>
        .sideEdge-text{
            color:#999;
        }
        .sideEdgeBox{

        }
        .sideEdgeBoxImg{
            width:49%;
            text-align:center;
        }
        .sideEdgeBoxImg img{
            width:66%;
        }
        .sideEdgeBox{
            margin:15% 0 0 0;
        }
        .sideEdgeBoxMain{
            width: 45%;
            text-align: left;
            font-size: 4vw;
            margin-left: 4%;
        }
        .sideEdgeBoxLeft{
            float:left;
        }
        .sideEdgeBoxRight{
            float:right;
        }
        .sideEdgeBoxMenu li{
            margin:5% 0 0 0;
            word-break: break-all;
        }
    .sideEdgeBoxMenu li:before{
        content: "▶";
        padding-right: .5em;
        font-family: "iconfont";
        vertical-align: middle;
        display: inline-block;
        }
    </style>