<template>
    <div id="QuestMain">
        <p class="quest-text common-text" v-text="data.imgselectDisplayTitle"></p>
        <p class="common-info" v-text="data.imgselectDisplayInfo"></p>
        <div>
            <div class="isd-leftMenu">
                <div class="isb-btn" v-for="(datas,index) in data.imgselectDisplayMenu" @click="showContentEvent(index)" v-text="datas.imgselectDisplayBtn"></div>
            </div>
            <div class="isd-rightMenu">
                <div  class="isb-sideEdgeBoxMain" v-show="nowshow == '-1'">
                    <div class="isb-imgmain">
                        <div class="white-r">
                            <img v-if="data.imgselectDisplayMImg != ''" :src="data.imgselectDisplayMImg" />
                        </div>
                    </div>
                </div>

                    <div  class="isb-sideEdgeBoxMain" v-for="(datas,index) in data.imgselectDisplayMenu" v-show="nowshow == index">
                        <div class="isb-imgmain simg-main-nobor">
                            <div class="white-r">
                                <img v-if="datas.imgselectDisplayImg != ''" :src="datas.imgselectDisplayImg" />
                            </div>
                        </div>
                        <ul  class="sideEdgeBoxMenu">
                            <li v-for="(mdata,mindex) in datas.imgselectDisplayTextMenu" v-html="Trim(mdata.imgselectDisplayText)"></li>
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
                nowshow:"-1"
            }
        },
        methods:{
            showContentEvent(index){
                this.nowshow = index;
            },
            Trim(str) {
                return str.replace(/\n|\r\n/g,"<br/>");
            }
        },
        mounted:function(){
            console.log(this.data.imgselectDisplayMenu)
            $(".isb-btn").on("click",function(){

                $(this).parents(".isd-leftMenu").find(".isb-btn").removeClass("isb-clicked");
                $(this).addClass("isb-clicked");
            });

            $(".isb-imgmain").height($(".isb-imgmain").width());
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
.isb-btn{
    border: 1px solid #d9d9d9;
    padding: 4% 2%;
    margin: 6% 0 0 12%;
    font-size: 4vw;
    border-radius: 5px;
    color: #666;
}
.isb-clicked{
    border: 1px solid deepskyblue;
    color: deepskyblue;
}

.isb-sideEdgeBoxMain{
    margin-left: 10%;
    width: 90%;
    text-align: left;
    font-size: 4vw;
}
.isb-imgmain{
    width: 62%;
    padding: 4%;
    border: 1px solid #d8d8d8;
    border-radius: 100%;
    margin: 0 auto;
}
.isb-sideEdgeBoxMain img{
   width: 100%;
    height: 100%;
}

</style>