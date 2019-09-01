<template>
    <div>
        <input id="selectLt-selector" type="file"  />
        <input id="selectLt-selector-big" type="file" />
        <div class="view_main">
            <span>标题:</span>
            <el-input class="input_type" v-model="nowData.listTypeTitle"></el-input>
        </div>

        <div class="view_main">
            <div class="type_title">图片:</div>

            <div class="avatar-uploader" @click="uploadClick('selectLt-selector')">
            <img v-if="nowData.listTypeImg" :src="nowData.listTypeImg" class="avatar">
            <div v-else class=" avatar-uploader-icon">
                <img class="addi-icon" src="./../../image/addi.png">
            </div>
        </div>
        <i  @click="deleteImg('listTypeImg')">
        <img  class="icon_btn" src="./../../image/close.png" />
    </i>
</div>
<div class="view_main">
<div class="type_title">大图片:</div>

<div class="avatar-uploader" @click="uploadClick('selectLt-selector-big')">
<img v-if="nowData.listTypeImgBig" :src="nowData.listTypeImgBig" class="avatar">
<div v-else class=" avatar-uploader-icon">
    <img class="addi-icon" src="./../../image/addi.png">
</div>
</div>
<i  @click="deleteImg('listTypeImgBig')">
<img  class="icon_btn" src="./../../image/close.png" />
        </i>
        </div>
<div class="view_main">
<span>按钮文案:</span>
<el-input class="input_type" v-model="nowData.listTypeBtnText"></el-input>
</div>

<div class="view_main">
<span>段落:</span>
<el-button @click="selectListTypeAddEvent">添加段落</el-button>
<ul>
    <li v-for="(data,index) in nowData.listTypeMenu" class="view_main" >
        <div class="view_main">
            <span>段落样式:</span>

            <el-select v-model="data.listTypeValue" class="select-css" placeholder="段落样式">
                <el-option
                v-for="item in listSysleList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>

        </div>
        <div class="view_main" v-show="data.listTypeValue == '6'" >
            <span>输入段落序号</span>
            <el-input class="input_type"  v-model="data.listTypeNum"></el-input>
        </div>
        <div class="view_main">
            <el-input
            class="textarea_type"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="data.listTypeText"></el-input>
            <span @click="selectListTypeDeleteEvent(index)">删除</span>
        </div>
    </li>
        </ul>

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
                listSysleList:""
    },
    mounted:function(){
        var self =this;
        self.SecretId= self.cosData.SecretId;
        self.SecretKey= self.cosData.SecretKey;
        self.XCosSecurityToken = self.cosData.XCosSecurityToken;
        self.expiredTime = self.cosData.expiredTime;
        document.getElementById('selectLt-selector').onchange = function () {
            var file = this.files[0];
            if (!file) return;
            if(self.SecretId != "" && self.SecretKey !="" ){
                if(file){
                    self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                        self.nowData.listTypeImg = img;
                    });
                }
            }
        };
        document.getElementById('selectLt-selector-big').onchange = function () {
            var file = this.files[0];
            if (!file) return;
            if(self.SecretId != "" && self.SecretKey !="" ){
                if(file){
                    self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                        self.nowData.listTypeImgBig = img;
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
         * 列表类型
         */
        selectListTypeAddEvent(){
            var newData = {listTypeText:"",listTypeValue:"0",listTypeNum:""};
            this.nowData.listTypeMenu.push(newData);
        },
        selectListTypeDeleteEvent(index){
            this.nowData.listTypeMenu.splice(index,1);
        }
    }
}
</script>