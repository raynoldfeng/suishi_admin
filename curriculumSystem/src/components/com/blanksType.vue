<template>
    <div>
        <div class="view_main">
            <span>标题:</span>
            <el-input class="input_type" v-model="nowData.blanksTitle"></el-input>
        </div>
        <div class="view_main">
            <span>副标题:</span>
            <el-input class="input_type" v-model="nowData.blanksInfo"></el-input>
        </div>

        <div class="view_main">
            <el-button @click="blanksAddFD()">添加分段</el-button>
        </div>
<div class="view_main">
<ul>
    <li v-for="(data,index) in nowData.blanksMenu "  class="view_main">
        <div class="view_main">
            <el-button @click="blankDeleteFD(index)">删除分段</el-button>
            <el-button @click="blanksAddEvent(1,index)">添加段落</el-button>
            <el-button @click="blanksAddEvent(2,index)">添加填空</el-button>
        </div>
        <div v-for="(sdata,sindex) in data ">
            <span v-if="sdata.blanksType == 1">段落:</span>
            <el-input
                    class="textarea_type"
                    type="textarea"
                    v-if="sdata.blanksType == 1"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="sdata.blanksText"></el-input>
            <span v-if="sdata.blanksType == 2">答案:</span>
            <el-input class="input_type" v-if="sdata.blanksType == 2" v-model="sdata.blanksAnswer"></el-input>
            <span @click="blanksDeleteEvent(index,sindex)">删除</span>
        </div>

</li>
        </ul>
        </div>


        </div>
</template>
<script>
export default {
    data(){
        return {
            SecretId:"",
            SecretKey:"",
            XCosSecurityToken:"",
            expiredTime:"",
            selectImgIndex:"",      //模板需要多个带图片的问题时

        }
    },
    props:{
        nowData:"",
                cosData:"",

    },
    mounted:function(){
        var self = this;
        self.SecretId= self.cosData.SecretId;
        self.SecretKey= self.cosData.SecretKey;
        self.XCosSecurityToken = self.cosData.XCosSecurityToken;
        self.expiredTime = self.cosData.expiredTime;


    },
    methods:{
        uploadClick(id,index){
            document.getElementById(id).click();
            if(index > (-1)){
                this.selectImgIndex = index;
            }
        },

        deleteImg(type){
            this.nowData[type] = "";
        },
        /**
         * 填空
         */
        blanksAddEvent(type,index){
            if(type == 1){
                var data = {blanksType:1,blanksText:""};
            }else if(type == 2){
                var data ={blanksType:2,blanksInput:"",blanksAnswer:"",isShow:false};
            }
            this.nowData.blanksMenu[index].push(data);
        },
        blanksDeleteEvent(index,sindex){
            this.nowData.blanksMenu[index].splice(sindex,1);
        },
        blanksAddFD(){
            this.nowData.blanksMenu.push([]);
        },
        blankDeleteFD(index){
            this.nowData.blanksMenu.splice(index,1);
        }

    }
}
</script>