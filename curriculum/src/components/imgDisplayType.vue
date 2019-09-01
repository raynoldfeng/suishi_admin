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
                <ul class="sideEdgeBoxMenu idp-type-menu" v-show="isShow">
                    <li v-for="(sdata,sindex) in datas.imgDisplayTypeTextMenu" v-html="Trim(sdata.imgDisplayTypeText)" :class = "{commonMenuN:sdata.imgDisplayTypeValue == '0',commonMenuS:sdata.imgDisplayTypeValue == '1',commonMenuC:sdata.imgDisplayTypeValue == '2'
            ,commonMenuF:sdata.imgDisplayTypeValue == '3',commonMenuTC:sdata.imgDisplayTypeValue == '4',commonMenuX:sdata.imgDisplayTypeValue == '5'}" ></li>
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
    console.log(this.isShow)
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