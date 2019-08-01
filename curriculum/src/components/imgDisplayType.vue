<template>
    <div id="QuestMain">
        <p class="quest-text" v-text="data.imgDisplayTypeTitle"></p>
        <p class="common-info" v-text="data.imgDisplayTypeInfo"></p>
        <div class="idt-main"  v-for="(datas,index) in data.imgDisplayTypeMenu">
            <img class="idt-img" :src="datas.imgDisplayTypeImg">
            <ul class="sideEdgeBoxMenu ishide">
                <li v-for="(sdata,sindex) in datas.imgDisplayTypeTextMenu" v-html="Trim(sdata.imgDisplayTypeText)"></li>
            </ul>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
           export default{
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

                    })
                }
           }
</script>
 <style>
        .idt-img{
            width: 50%;
        }
</style>