<template>
    <div>
        <input id="selectImgJ-selector" type="file" >
        <div class="view_main">
            <span>标题:</span>
            <el-input class="input_type" v-model="nowData.ImgJumpTypeTitle"></el-input>
        </div>
        <div class="view_main">
            <span>介绍文字:</span>
            <el-input
                    class="textarea_type"
                    type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="nowData.ImgJumpTypeInfo"></el-input>
    </div>
    <div class="view_main">
        <span>标题颜色:</span>
        <el-select v-model="nowData.ImgJumpTypeTitleColor" class="select-css" placeholder="标题颜色">
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

<div class="avatar-uploader" @click="uploadClick('selectImgJ-selector')">
<img v-if="nowData.ImgJumpTypeBg" :src="nowData.ImgJumpTypeBg" class="avatar">
<div v-else class=" avatar-uploader-icon">
    <img class="addi-icon" src="./../../image/addi.png">
</div>
</div>
<i  @click="deleteImg('ImgJumpTypeBg')">
<img  class="icon_btn" src="./../../image/close.png" />
        </i>
        </div>
<div class="view_main">
<span>跳转按钮文本:</span>
<el-input class="input_type" v-model="nowData.ImgJumpBtnText"></el-input>
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
                titleColor:""
    },
    mounted:function(){
        var self =this;
        self.SecretId= self.cosData.SecretId;
        self.SecretKey= self.cosData.SecretKey;
        self.XCosSecurityToken = self.cosData.XCosSecurityToken;
        self.expiredTime = self.cosData.expiredTime;
        document.getElementById('selectImgJ-selector').onchange = function () {
            var file = this.files[0];
            if (!file) return;

            if(self.SecretId != "" && self.SecretKey !="" ){
                if(file){
                    self.cosjsFile3(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                        self.nowData.ImgJumpTypeBg =img;
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

    }
}
</script>