<template>
    <div id="QuestMain">
        <div id="imageChange" :style = '{"height":imageChangeHeight+"px"}'>
            <ul class="imgChange-menu">
                <li :class="{smargin:datas.isBigImg == '0'}"  v-for="(datas,index) in data.imageChange" v-show="nowImgIndex == index">
                    <p class="image-titles" v-text="datas.imgChangeTitle"></p>
                    <img class="bigimgs"  v-show="datas.isBigImg == '0'" :src="datas.img"  />
                    <div class="img-main simg-main simgnobor imgchange-img" v-show="datas.img && datas.isBigImg == '1'" >
                        <div class="white-r">
                            <img class="idt-img" v-if="" :src="datas.img"  />
                        </div>
                    </div>

                        <!--<div class="imageChange-text" v-if="datas.text" v-html="Trim(datas.text)"></div>-->

                        <ul class="list-type-menu imageChange-menu imageChange-text common-ul" :class="{nobig:datas.isBigImg == '1'}">
                            <li  v-for="(idata,index) in datas.textMenu"  :class = "{commonMenuN:idata.typeValue == '0',commonMenuS:idata.typeValue == '1',commonMenuC:idata.typeValue == '2'
                                ,commonMenuF:idata.typeValue == '3',commonMenuTC:idata.typeValue == '4',commonMenuX:idata.typeValue == '5',commonMenu:idata.typeValue == '6'
                                ,commonMenuNN:textData.typeValue == '7',blue:idata.textColor == '1'}">
                                <span v-show="idata.typeValue == '6'" v-text="numEvent(idata.typeNum)"></span>
                                <span v-html="Trim(idata.text)"></span>
                            </li>
                        </ul>

                        <div class="tp-next-btn" v-if="index < data.imageChange.length-1" @click="NextEvent(index, data.imageChange.length-1)"  v-show="data.imageChangeJump !=''" v-text="data.imageChangeJump"></div>
                        <div class="tp-next-btn" v-if="index == data.imageChange.length-1" @click="NextEvent(index, data.imageChange.length-1)"  v-show="data.imageChangeJumpL !=''" v-text="data.imageChangeJumpL"></div>
                        <!--<div class="tp-next-btn" v-if="index == data.imageChange.length-1" @click="NextEvent(index, data.imageChange.length-1)"  v-show="data.imageChangeJumpL =='' && data.imageChangeJump !=''" v-text="data.imageChangeJump"></div>-->
                    </li>
                </ul>
            </div>
            <ul class="ic-swiper-pagination" v-show="data.imageChange.length > 1">
                <li  v-for="(data,index) in data.imageChange" @click="imgChangeEvent(index)" :class="{clickbtned:nowImgIndex == index}"></li>
            </ul>

        </div>
    </template>
    <script>
    export default{
        props:{
        data:"",
        page:0
        },
        data(){
        return{
        imageChangeHeight:0,
        nowImgIndex:0
        }
        },
        mounted:function(){
        this.imageChangeHeight = document.getElementById("QuestMain").scrollHeight;
            $(".imgchange-img").height($(".imgchange-img").width());
        },
        methods:{
        Trim(str) {
        return str.replace(/\n|\r\n/g,"<br/>");
        },
        imgChangeEvent(index){
                var QuestMain = document.getElementById("imageChange");
                QuestMain.scrollTop = 0;
                QuestMain.scrollTop = 0;
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            this.nowImgIndex = index;
        },
        NextEvent(index,len){
        if(index<len){
            var QuestMain = document.getElementById("imageChange");
            QuestMain.scrollTop = 0;
            QuestMain.scrollTop = 0;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            this.nowImgIndex = index+1;
        }else{
            this.$emit("isJump",this.page+1);
        }

        },
            numEvent(str){
                return str+".";
            },
            displayEvent(url){
                var data = {url:url,text:"",urlbig:url};
                this.$emit("imgShow",data);
            }
        }
        }
    </script>
    <style>
    #imageChange{
        /*overflow: auto;*/
        }
    #imageChange img{
        width: 100%;
        }
    .ic-swiper-pagination{
        width: 12px;
        float: right;
        margin-left: 2%;
        position: absolute;
        left: 0;
        z-index: 100;
        top: 50%;
        }
    .ic-swiper-pagination li{
        width:12px;
        height:12px;
        background:#999999;
        margin-top:60%;
        border-radius:100px;
        }
    .ic-swiper-pagination li.clickbtned{
        background:#fd9800;
        }
    #imageChange  .swiper-pagination-bullets {
        right: 10px;
        top: 50%;
        -webkit-transform: translate3d(0,-50%,0);
        transform: translate3d(0,-50%,0);
        }

    .imgChange-menu{
        width: 100%;
        margin: 0 auto;
        position: relative;
        padding-bottom: 15%;
        }
    .imgChange-menu li {
        /*position: absolute;*/
        /*top: 50%;*/

        margin: 10% 0 0;
        }
    .imgChange-menu li.smargin{
        margin: 0;
    }
    .bigimgs{
        margin-top: 5%;;
    }
    .imgChange-menu img{
        width:100%;
        }
    .imageChange-text{
        padding:4%;
        font-size:4.5vw;
        text-align:left;
        width: 84%;
        margin: 2% auto 5%;
        }
    .imageChange-text.nobig{
        min-height: 40vw;
    }
.imageChange-menu li{
    position: relative;
    top: 0;;
}

    </style>