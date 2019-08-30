<template>
    <div >
        <input id="sideEdgeImg-upload" type="file" >
        <div class="view_main">
            <span>标题:</span>
            <el-input class="input_type" v-model="nowData.sideEdgeImgTypeTitle"></el-input>
        </div>
        <div class="view_main">
            <span>展示方式:</span>
            <el-select v-model="nowData.sideEdgeImgLRType" class="select-css" placeholder="是否正确">
                <el-option
                        v-for="item in sideEdgeImgDisplayType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div>
    <div class="view_main">
        <span>副标题:</span>
        <el-input class="input_type" v-model="nowData.sideEdgeImgTypeInfo"></el-input>
    </div>
    <div class="view_main">
        <div class="type_title">图片:</div>
        <div class="avatar-uploader" @click="uploadClick('sideEdgeImg-upload')">
        <img v-if="nowData.sideEdgeImg" :src="nowData.sideEdgeImg" class="avatar">
        <div v-else class=" avatar-uploader-icon">
            <img class="addi-icon" src="./../../image/addi.png">
        </div>
    </div>
    <i  @click="deleteImg('sideEdgeImg')">
    <img  class="icon_btn" src="./../../image/close.png" />
</i>
        </div>
<div>
<el-button @click="sideEdgeImgTypeAddEvent">添加段落</el-button>
<ul>
<li v-for="(data,index) in nowData.sideEdgeImgMenu" class="view_main" >
    <el-input
            class="textarea_type"
            type="textarea"
    :autosize="{ minRows: 2, maxRows: 4}"
    placeholder="请输入内容"
    v-model="data.sideEdgeImgTypeText"></el-input>
<span @click="sideEdgeImgTypeDeleteEvent(index)">删除</span>
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
            sideEdgeImgDisplayType:[
                {value: "0",
                    label: "left"},
                {value: "1",
                    label: "right"},
            ],
        }
    },
    props:{
        nowData:"",
                cosData:"",
                judgeAnswerMenu:"",
    },
    mounted:function(){
        var self = this;
        self.SecretId= self.cosData.SecretId;
        self.SecretKey= self.cosData.SecretKey;
        self.XCosSecurityToken = self.cosData.XCosSecurityToken;
        self.expiredTime = self.cosData.expiredTime;
        document.getElementById('sideEdgeImg-upload').onchange = function () {
            var file = this.files[0];
            if (!file) return;
            if(self.SecretId != "" && self.SecretKey !="" ){
                if(file){
                    self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                        self.nowData.sideEdgeImg = img;
                    });
                }
            }
        };

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
         * 侧边图片
         */
        sideEdgeImgTypeAddEvent(){
            var newData = {sideEdgeImgTypeText:""};
            this.nowData.sideEdgeImgMenu.push(newData);
        },
        sideEdgeImgTypeDeleteEvent(index){
            this.nowData.sideEdgeImgMenu.splice(index,1);
        },
    }
}
</script>