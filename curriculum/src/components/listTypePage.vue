<template>
    <div id="QuestMain">
        <p class="quest-text" v-text="data.listTypeTitle"></p>
        <div class="img-main simg-main" v-if="data.listTypeImg">
            <img id="selectImg" :src="data.listTypeImg" @click="displayEvent(data.listTypeImg,'')" >
        </div>
        <ul class="list-type-menu">
            <li v-for="(idata,index) in listMenu" v-html="Trim(idata.text)" v-show="idata.show"></li>
        </ul>
            <ul class="ratelist">
                <li  v-for="(idata,index) in listMenu" @click="reShow(index)" :class="{clickbtned:listLen == index}"></li>
            </ul>
            <div class="tp-next-btn" @click="listShowEvent"  v-text="data.listTypeBtnText"></div>

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
            this.listMenu = [];
            for(let i = 0 ; i < this.data.listTypeMenu.length; i++){
                if(i == 0){
                    this.listMenu.push({text:this.data.listTypeMenu[i].listTypeText,show:true})
                }else{
                    this.listMenu.push({text:this.data.listTypeMenu[i].listTypeText,show:false})
                }

            }

        },
        methods:{
            Trim(str) {
                  return str.replace(/\n|\r\n/g,"<br/>");
            },
            displayEvent(url,text){
                var data = {url:url,text:text};
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
        font-size: 5vw;
        color: #333;
        margin:1% 6% 0;
        text-align: left;
    }
    .tp-next-btn{
        min-width: 30%;
        display: inline-block;
        background: #019ccb;
        margin: 2% auto 0;
        padding: 2% 4%;
        color: #fff;
        font-size: 4vw;
        position: relative;
    }
.simg-main{
    width:40%;
    margin: 10% auto;
    }
#selectImg{
    width:100%;
    }
</style>