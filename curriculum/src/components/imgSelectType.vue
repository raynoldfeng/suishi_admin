<template>
    <div id="QuestMain">
        <p class="quest-text blanks-title" v-text="data.imgselectDisplayTitle"></p>
        <p class="blanks-info" v-text="data.imgselectDisplayInfo"></p>
        <div>
            <div class="isd-leftMenu">
                <div class="isb-btn" v-for="(datas,index) in data.imgselectDisplayMenu" @click="showContentEvent(index)" v-text="datas.imgselectDisplayBtn"></div>
            </div>
            <div class="isd-rightMenu">
                <div  class="sideEdgeBoxMain" v-for="(datas,index) in data.imgselectDisplayMenu" v-show="nowshow == index">
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
        props:{
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
            console.log(this.data)
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
    margin: 6% 0 0;
    font-size: 4vw;
    border-radius: 5px;
    color: #666;
}
.sideEdgeBoxMenu li{
    margin:5% 0 0 0;
    word-break: break-all;
    font-size: 4vw;
}
.sideEdgeBoxMenu li:before{
    content: "▶";
    padding-right: .5em;
    font-family: "iconfont";
    vertical-align: middle;
    display: inline-block;
}
.sideEdgeBoxMain{
    width: 100%;
}
.sideEdgeBoxMain img{
    width: 40%;
}
</style>