<template>
    <div >
        <input id="selectAllJ-selector" type="file" />
        <div class="view_main">
            <span>题目:</span>
            <el-input class="input_type" v-model="nowData.selectAllJTitle"></el-input>
        </div>
        <div class="view_main">
            <span>副标题:</span>
            <el-input class="input_type" v-model="nowData.selectAllJSubtitleTitle"></el-input>
        </div>
        <div class="view_main">
            <span>标题颜色:</span>
            <el-select v-model="nowData.selectAllJSubtitleTitleColor" class="select-css" placeholder="标题颜色">
                <el-option
                        v-for="item in titleColor"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div>
    <div class="view_main">
        <div class="type_title">背景图片:</div>

        <div class="avatar-uploader" @click="uploadClick('selectAllJ-selector')">
        <img v-if="nowData.selectAllJImg" :src="nowData.selectAllJImg" class="avatar">
        <div v-else class=" avatar-uploader-icon">
            <img class="addi-icon" src="./../../image/addi.png">
        </div>
    </div>
    <i @click="deleteImg('selectAllJImg')">
    <img  class="icon_btn" src="./../../image/close.png" />
</i>
        </div>
<div class="view_main">
<span>答案选项</span>
<el-button @click="selectAllJAddEvent">添加选项</el-button>
<div class="">
<ul>
    <li v-for="(data,index) in nowData.selectAllJMenu" class="view_main" >
        <span>选项{{index+1}}</span>
        <el-input class="input_type" v-model="nowData.selectAllJMenu[index].answerText"></el-input>
        <el-select v-model="data.isAnswer" class="select-css" placeholder="是否正确">
            <el-option
                    v-for="item in judgeAnswerMenu"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>
    <span @click="selectAllJDeleteEvent(index)">删除</span>
<div class="view_main">
    <span class="type_title">答案解释:</span>
    <el-input
            class="textarea_type"
            type="textarea"
    :autosize="{ minRows: 2, maxRows: 4}"
    placeholder="请输入内容"
    v-model="data.selectTextNote">
</el-input>
</div>

        </li>
        </ul>
        </div>
        </div>


        </div>
</template>
<script>
export default{
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
                judgeAnswerMenu:"",
                titleColor:""
    },
    mounted:function(){
        var self =this;
        self.SecretId= self.cosData.SecretId;
        self.SecretKey= self.cosData.SecretKey;
        self.XCosSecurityToken = self.cosData.XCosSecurityToken;
        self.expiredTime = self.cosData.expiredTime;
        document.getElementById('selectAllJ-selector').onchange = function () {
            var file = this.files[0];
            if (!file) return;
            if(self.SecretId != "" && self.SecretKey !="" ){
                if(file){
                    self.cosjsFile3(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                        self.nowData.selectAllJImg ="https://suishi-1256985330.cos.ap-guangzhou.myqcloud.com/" + img;
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
         * 选项带解释 选择
         */
        selectAllJAddEvent(){
            var newData =  {answerText:"",isAnswer:"0",selectTextNote:""};
            this.nowData.selectAllJMenu.push(newData);
        },
        selectAllJDeleteEvent(index){
            this.nowData.selectAllJMenu.splice(index,1);
        },
    }
}
</script>