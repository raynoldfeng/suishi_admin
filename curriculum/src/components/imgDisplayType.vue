<template>
    <div id="QuestMain">
        <p class="quest-text" v-text="data.imgDisplayTypeTitle"></p>
        <p class="common-info" v-text="data.imgDisplayTypeInfo"></p>
        <div class="idt-main"  v-for="(datas,index) in data.imgDisplayTypeMenu">

            <div class="idt-img-main">
                <div class="white-r">
                    <img class="idt-img" :src="datas.imgDisplayTypeImg">
                </div>
            </div>
            <ul class="sideEdgeBoxMenu ishide idp-type-menu">
                <li v-for="(sdata,sindex) in datas.imgDisplayTypeTextMenu" v-html="Trim(sdata.imgDisplayTypeText)"></li>
            </ul>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
           export default{
                props:{
                    data:""
                },
               methods:{
                   Trim(str) {
                       return str.replace(/\n|\r\n/g,"<br/>");
                   }
               },
                mounted:function(){
                    $(".idt-img").on("click",function(){
                        if($(this).parents(".idt-main").find(".sideEdgeBoxMenu").is(":hidden")){
                            $(this).parents(".idt-main").find(".sideEdgeBoxMenu").show();
                        }else{
                            $(this).parents(".idt-main").find(".sideEdgeBoxMenu").hide();
                        }

                    });

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
 .idp-type-menu li{
     margin-top: 3vw;
 }

 .idt-img-main{
     width: 50%;
     margin: 0 auto;
     border: 1px solid #999999;
     border-radius: 100%;
     padding: 1%;
 }

</style>