<template>
    <div id="QuestMain">
        <div class="padd-bottom">
            <p class="quest-text" v-text="data.listTypeTitle"></p>
            <div class="img-main simg-main" v-if="data.listTypeImg">
                <div class="white-r">
                    <img id="selectImg" :src="data.listTypeImg" @click="displayEvent(data.listTypeImg,'',data.listTypeImgBig)" >
                </div>
            </div>
            <ul class="list-type-menu common-ul" >
                <li v-for="(idata,index) in listMenu"  :class = "{commonMenuN:idata.typeValue == '0',commonMenuS:idata.typeValue == '1',commonMenuC:idata.typeValue == '2'
                ,commonMenuF:idata.typeValue == '3',commonMenuTC:idata.typeValue == '4',commonMenuX:idata.typeValue == '5',commonMenu:idata.typeValue == '6'
                ,commonMenuNN:textData.typeValue == '7',blue:idata.textColor == '1'}" v-show="idata.show">
                    <span v-show="idata.typeValue == '6'" v-text="numEvent(idata.typeNum)"></span>
                    <span v-html="Trim(idata.text)"></span>
                </li>
            </ul>
            <ul class="ratelist">
                <li  v-for="(idata,index) in listMenu" @click="reShow(index)" :class="{clickbtned:listLen == index}"></li>
            </ul>
            <div class="tp-next-btn" @click="listShowEvent" v-show="data.listTypeBtnText != '' && listLen != (data.listTypeMenu.length-1)"  v-text="data.listTypeBtnText"></div>

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
                listLen:0,
                listMenu:[]
            }
        },
        mounted:function(){
            $(".simg-main").height($(".simg-main").width());
            this.listMenu = [];
            for(let i = 0 ; i < this.data.listTypeMenu.length; i++){
                if(i == 0){
                    this.listMenu.push({text:this.data.listTypeMenu[i].listTypeText,listTypeValue:this.data.listTypeMenu[i].listTypeValue,show:true})
                }else{
                    this.listMenu.push({text:this.data.listTypeMenu[i].listTypeText,listTypeValue:this.data.listTypeMenu[i].listTypeValue,show:false})
                }
            }

        },
        methods:{
            Trim(str) {
                  return str.replace(/\n|\r\n/g,"<br/>");
            },
            displayEvent(url,text,urlbig){
                var data = {url:url,text:text,urlbig:urlbig};
                this.$emit("imgShow",data);
            },
            listShowEvent(){
                if(this.listLen <this.data.listTypeMenu.length-1){
                    this.listLen++;
                }else{
                     this.listLen = this.data.listTypeMenu.length-1;
                }

                if(this.listLen <this.data.listTypeMenu.length){
                    this.listMenu[this.listLen].show = true;
                }
            },
            reShow(index){
                this.listLen = index;
                for(let i =0 ; i < this.data.listTypeMenu.length ; i++){
                    if(i <= index ){
                         this.listMenu[i].show = true;
                    }else{
                        this.listMenu[i].show = false;
                    }
                }

            },
            numEvent(str){
                return str+".";
            }
        },
    }
</script>
<style>
    .ratelist{
        width:80%;
        margin:6% auto 0;
        text-align: center;
    }
    .ratelist li{
        display:inline-block;
        width:3vw;
        height:3vw;
        margin: 0 2%;
        border-radius: 100%;
        background:#999999;
    }
    .ratelist li.clickbtned{
        background:#fd9800;
    }
    .list-type-menu li{
        font-size: 4.5vw;
        margin:3% 6% 0;
        text-align: left;
        word-break: break-all;
    }
.list-type-menu li:before{
    padding-right: .5em;
    font-family: "iconfont";
    vertical-align: middle;
    display: inline-block;
    margin-top:-1%;
    }


</style>