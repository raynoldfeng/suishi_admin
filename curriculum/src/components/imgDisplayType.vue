<template>
    <div id="QuestMain">
        <p class="quest-text" v-text="data.imgDisplayTypeTitle"></p>
        <p class="common-info" v-text="data.imgDisplayTypeInfo"></p>
        <div class="idt-main"  v-for="(datas,index) in data.imgDisplayTypeMenu">

            <div class="idt-img-main">
                <div class="white-r">
                    <img class="idt-img" @click="changeEvent" :src="datas.imgDisplayTypeImg">
                </div>
            </div>
            <transition name="fade">
                <ul class="sideEdgeBoxMenu idp-type-menu common-ul" v-show="isShow">
                    <li v-for="(sdata,sindex) in datas.imgDisplayTypeTextMenu" :class = "{commonMenuN:sdata.typeValue == '0',commonMenuS:sdata.typeValue == '1',commonMenuC:sdata.typeValue == '2'
                    ,commonMenuF:sdata.typeValue == '3',commonMenuTC:sdata.typeValue == '4',commonMenuX:sdata.typeValue == '5',commonMenu:sdata.typeValue == '6'
                    ,commonMenuNN:sdata.typeDLValue == '0',commonMenuSN:sdata.typeDLValue == '1',blue:sdata.textColor == '1'}" >
                        <span v-show="sdata.typeValue == '6'" v-text="numEvent(sdata.typeNum)"></span>
                        <span v-html="Trim(sdata.imgDisplayTypeText)" ></span>
                    </li>
                </ul>
            </transition>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
           export default{
                props:{
                    data:"",
                },
                data(){
                    return{
                        isShow:false
                    }
                },
               methods:{
                   Trim(str) {
                       return str.replace(/\n|\r\n/g,"<br/>");
                   },
                    changeEvent(){
                        this.isShow = !this.isShow;
                    },
                    numEvent(str){
                        return str+".";
                    }
               },
                mounted:function(){
//                    $(".idt-img").on("click",function(){
//                        if($(this).parents(".idt-main").find(".sideEdgeBoxMenu").is(":hidden")){
//                            $(this).parents(".idt-main").find(".sideEdgeBoxMenu").show();
//                        }else{
//                            $(this).parents(".idt-main").find(".sideEdgeBoxMenu").hide();
//                        }
//
//                    });

                    $(".idt-img-main").height($(".idt-img-main").width());
                }
           }
</script>
 <style>
        .idt-img{
            width: 100%;
            height: 100%;
        }
 .idt-main{
     margin-top: 4vw;
 }
 .idt-img-main{
     width: 34%;
     margin: 0 auto 0;
     border: 1px solid #d8d8d8;
     border-radius: 100%;
     padding: 2%;
 }

</style>