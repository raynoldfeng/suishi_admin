<template>
    <div id="QuestMain">
        <p class="quest-text blanks-title" v-text="data.imgselectDisplayTitle"></p>
        <p class="blanks-info" v-text="data.imgselectDisplayInfo"></p>
        <div>
            <div class="isd-leftMenu">
                <div class="isb-btn" v-for="(datas,index) in data.imgselectDisplayMenu" @click="showContentEvent(index)" v-text="datas.imgselectDisplayBtn"></div>
            </div>
            <div class="isd-rightMenu">
                <div  v-for="(datas,index) in data.imgselectDisplayMenu" v-show="nowshow == index">
                    <img v-if="datas.imgselectDisplayImg != ''" :src="datas.imgselectDisplayImg" />
                    <ul  class="sideEdgeBoxMenu">
                        <li v-for="(mdata,mindex) in datas.imgselectDisplayTextMenu" v-html="mdata.imgselectDisplayText"></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        prop:{
            data:""
        },
        data(){
            return{
                nowshow:""
            }
        },
        methods:{
            showContentEvent(index){
                this.nowshow = index;
            }
        },
        mounted:function(){

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
    display: inline-block;
}
.isd-leftMenu{
    width: 48%;
}
.isd-rightMenu{
    width: 48%;
}
.isb-btn{
    border: 1px solid #999999;
    padding: 2% 2%;
    margin: 1% 0;
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