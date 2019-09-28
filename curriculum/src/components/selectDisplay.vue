<template>
    <div id="QuestMain">
        <p class="quest-text common-text" v-text="data.selectDisplayTitle"></p>
        <p class="common-info" v-text="data.selectDisplayInfo"></p>
        <div>
            <div class="sd-leftMenu">
                <div class="sb-btn" :class="{isbclicked:nowshow == index}" v-for="(datas,index) in data.selectDisplayMenu" @click="showContentEvent(index)" v-text="datas.selectDisplayBtn"></div>
            </div>
            <div class="sd-rightMenu">
                <div  class="isb-sideEdgeBoxMain" v-for="(datas,index) in data.selectDisplayMenu" v-show="nowshow == index">
                    <div class="sb-imgmain ">
                        <div class="white-r">
                            <img v-if="datas.selectDisplayImg != ''" :src="datas.selectDisplayImg" @click="displayEvent(datas.selectDisplayImg,'',datas.selectDisplayImg)" />
                        </div>
                    </div>
                    <ul  class="sideBoxMenu common-ul" >
                        <li v-for="(mdata,mindex) in datas.selectDisplayTextMenu" :class = "{commonMenuN:mdata.typeValue == '0',commonMenuS:mdata.typeValue == '1',commonMenuC:mdata.typeValue == '2'
                        ,commonMenuF:mdata.typeValue == '3',commonMenuTC:mdata.typeValue == '4',commonMenuX:mdata.typeValue == '5',commonMenu:mdata.typeValue == '6'
                        ,commonMenuNN:mdata.typeDLValue == '0',commonMenuSN:mdata.typeDLValue == '1',blue:mdata.textColor == '1'}">
                            <span v-show="mdata.typeValue == '6'" v-text="numEvent(mdata.typeNum)"></span>
                            <span  v-html="Trim(mdata.selectDisplayText)"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default{
    props:{
        data:""
    },
    data(){
        return{
            nowshow:"0"
        }
    },
    methods:{
        showContentEvent(index){
            this.nowshow = index;
        },
        Trim(str) {
            return str.replace(/\n|\r\n/g,"<br/>");
        },
        numEvent(str){
            return str+".";
        },
        displayEvent(url,text,urlbig){
            var data = {url:url,text:text,urlbig:urlbig};
            this.$emit("imgShow",data);
        }
    },
    mounted:function(){
        $(".sb-imgmain").height($(".sb-imgmain").width());
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
    .isd-leftMenu,.isd-rightMenu{
        float: left;
        margin-top: 10%;
        }
    .isd-leftMenu{
        width: 40%;
        }
    .isd-rightMenu{
        width: 56%;
        }
    .sb-btn{
        border: 1px solid #d9d9d9;
        width:80%;
        padding: 3% 2%;
        margin: 2% auto 0 auto;
        font-size: 4.5vw;
        border-radius: 5px;
        color: #666;
        }
    .isbclicked{
        border: 1px solid deepskyblue;
        color: deepskyblue;
        }

    .isb-sideEdgeBoxMain{
        margin-left: 10%;
        width: 90%;
        text-align: left;
        font-size: 4vw;
        padding-bottom: 28%;
        }
    .sb-imgmain{
        width: 30%;
        padding: 4%;
        border: 1px solid #d8d8d8;
        border-radius: 100%;
        margin: 8% auto 0;
        }
    .isb-sideEdgeBoxMain img{
        width: 100%;
        height: 100%;
        }

    </style>