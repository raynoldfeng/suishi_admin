<template>
    <div>
        <input id="selectL-selector" type="file" />
        <input id="selectR-selector" type="file" />
        <div class="view_main" >
            <span>问题:</span>
            <el-input class="input_type" v-model="nowData.selectMoreTitle"></el-input>
        </div>
        <div class="view_main" >
            <span class="type_title">问题描述:</span>
            <el-input
                    class="textarea_type"
                    type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="nowData.selectMoreInfo">
        </el-input>
    </div>
    <div class="view_main" >
        <div class="type_title">左侧图片:</div>
        <div class="avatar-uploader" @click="uploadClick('selectL-selector')">
        <img v-if="nowData.selectMoreImgL" :src="nowData.selectMoreImgL" class="avatar">
        <div v-else class=" avatar-uploader-icon">
            <img class="addi-icon" src="./../../image/addi.png">
        </div>
    </div>
    <i  @click="deleteImg('selectMoreImgL')">
    <img  class="icon_btn" src="./../../image/close.png" />
</i>

        </div>
<div class="view_main" >
<span>左侧选项:</span><el-button @click="selectMoreAddEvent('l')">添加选项</el-button>
<div class="">

<ul>
    <li v-for="(data,index) in nowData.selectMoreMenuL" class="view_main">
        <span>选项{{index+1}}</span>
        <el-input class="input_type" v-model="data.answerText"></el-input>
        <el-select class="select-css" v-model="data.isAnswer"
                   placeholder="是否正确">
            <el-option
                    v-for="item in judgeAnswerMenu"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>
    <span @click="selectMoreDeleteEvent('l',index)">删除</span>
</li>
        </ul>
<div class="view_main">
<span class="type_title">答案注释</span>
<el-input
        class="textarea_type"
        type="textarea"
:autosize="{ minRows: 2, maxRows: 4}"
placeholder="请输入内容"
v-model="nowData.selectTextNoteL">
</el-input>
        </div>
        </div>
        </div>
<div class="view_main" >
<div class="type_title">右侧图片:</div>
<div class="avatar-uploader" @click="uploadClick('selectR-selector')">
<img v-if="nowData.selectMoreImgR" :src="nowData.selectMoreImgR" class="avatar">
<div v-else class=" avatar-uploader-icon">
    <img class="addi-icon" src="./../../image/addi.png">
</div>
</div>
<i  @click="deleteImg('selectMoreImgR')">
<img  class="icon_btn" src="./../../image/close.png" />
        </i>
        </div>
<div class="view_main" >
<span>右侧选项:</span><el-button  @click="selectMoreAddEvent('r')">添加选项</el-button>
<div>
<ul>
    <li v-for="(data,index) in nowData.selectMoreMenuR" class="view_main">
        <span>选项{{index+1}}</span>
        <el-input class="input_type" v-model="data.answerText"></el-input>
        <el-select v-model="data.isAnswer" class="select-css" placeholder="正确选项">
            <el-option
                    v-for="item in judgeAnswerMenu"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>
    <span  @click="selectMoreDeleteEvent('r',index)">删除</span>
</li>
        </ul>
        </div>
<div class="view_main">
<span class="type_title">答案注释:</span>
<el-input
        class="textarea_type"
        type="textarea"
:autosize="{ minRows: 2, maxRows: 4}"
placeholder="请输入内容"
v-model="nowData.selectTextNoteR">
</el-input>
        </div>
        </div>
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
            selectImgIndex:""      //模板需要多个带图片的问题时
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
        document.getElementById('selectL-selector').onchange = function () {
            var file = this.files[0];
            if (!file) return;
            if(self.SecretId != "" && self.SecretKey !="" ){
                if(file){
                    self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                        self.nowData.selectMoreImgL = img;
                    });
                }
            }
        };
        document.getElementById('selectR-selector').onchange = function () {
            var file = this.files[0];
            if (!file) return;
            if(self.SecretId != "" && self.SecretKey !="" ){
                if(file){
                    self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                        self.nowData.selectMoreImgR = img;
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
        /**
         * 选择类型 (多题)
         */
        selectMoreAddEvent(type){
            var newData =  {answerText:"",isAnswer:"0"}
            if(type=="l"){
                this.nowData.selectMoreMenuL.push(newData);
            }else if(type == "r"){
                this.nowData.selectMoreMenuR.push(newData);
            }
        },
        selectMoreDeleteEvent(type,index){
            if(type == "l"){
                this.nowData.selectMoreMenuL.splice(index,1);
            }else if(type == "r"){
                this.nowData.selectMoreMenuR.splice(index,1);
            }

        },
        deleteImg(type){
            this.nowData[type] = "";
        },
        /**
         * 选择类型 (多题)
         */
        selectMoreAddEvent(type){
            var newData =  {answerText:"",isAnswer:"0"}
            if(type=="l"){
                this.nowData.selectMoreMenuL.push(newData);
            }else if(type == "r"){
                this.nowData.selectMoreMenuR.push(newData);
            }
        },
    }
}
</script>