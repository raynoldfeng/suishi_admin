<template>
    <div>
        <input id="select-selector" type="file" >
        <input id="select-selector-big" type="file" >
        <div class="view_main">
            <el-button @click="selectAddQEvent">添加题目</el-button>
    </div>
    <div v-for="(selectData,selectIndex) in nowData.selectQMenu"  class="padd-bottom">
        <div class="view_main">
            <span>第{{selectIndex+1}}题</span>
            <el-button @click="selectDeleteQEvent(selectIndex)">删除</el-button>
    </div>
    <div class="view_main">
        <span>题目:</span>
        <el-input class="input_type" v-model="selectData.selectTitle"></el-input>
    </div>
    <div class="view_main">
        <span>副标题:</span>
        <el-input class="input_type" v-model="selectData.selectInfo"></el-input>
    </div>
    <div class="view_main">
        <div class="type_title">图片:</div>
        <div class="avatar-uploader" @click="uploadClick('select-selector',selectIndex)">
        <img v-if="selectData.selectImg" :src="selectData.selectImg" class="avatar">
        <div v-else class=" avatar-uploader-icon">
            <img class="addi-icon" src="./../../image/addi.png">
        </div>
    </div>
    <i  @click="deleteMenuImg(selectIndex,'selectQMenu','selectImg')">
    <img  class="icon_btn" src="./../../image/close.png" />
</i>
        </div>
<div class="view_main">
<div class="type_title">大图片:</div>
<div class="avatar-uploader" @click="uploadClick('select-selector-big',selectIndex)">
<div></div>
<img v-if="selectData.selectImgBig" :src="selectData.selectImgBig" class="avatar">
<div v-else class=" avatar-uploader-icon">
    <img class="addi-icon" src="./../../image/addi.png">
</div>
</div>
<i  @click="deleteMenuImg(selectIndex,'selectQMenu','selectImgBig')">
<img  class="icon_btn" src="./../../image/close.png" />
        </i>
        </div>

<div class="view_main">
<span class="type_title">图片文字介绍:</span>
<el-input
        class="textarea_type"
        type="textarea"
:autosize="{ minRows: 2, maxRows: 4}"
placeholder="请输入内容"
v-model="selectData.imgNoteNode">
</el-input>
        </div>

<div class="view_main">
<span>答案选项</span>
<el-button @click="selectAddEvent(selectIndex)">添加选项</el-button>
<div class="">
<ul>
    <li v-for="(data,index) in selectData.selectMenu" class="view_main" >
        <span>选项{{index+1}}</span>
        <el-input class="input_type" v-model="selectData.selectMenu[index].answerText"></el-input>
        <el-select v-model="data.isAnswer" class="select-css" placeholder="是否正确">
            <el-option
                    v-for="item in judgeAnswerMenu"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>
    <span @click="selectDeleteEvent(index,selectIndex)">删除</span>
</li>
        </ul>
        </div>
        </div>
<div class="view_main">
<span class="type_title">答案注释:</span>
<el-input
        class="textarea_type"
        type="textarea"
:autosize="{ minRows: 2, maxRows: 4}"
placeholder="请输入内容"
v-model="selectData.imgTextNote">
</el-input>
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
            selectImgIndex:""      //模板需要多个带图片的问题时
        }
    },
    props:{
        nowData:"",
        cosData:"",
        judgeAnswerMenu:"",
    },
    mounted:function(){
        var self =this;
        self.SecretId= self.cosData.SecretId;
        self.SecretKey= self.cosData.SecretKey;
        self.XCosSecurityToken = self.cosData.XCosSecurityToken;
        self.expiredTime = self.cosData.expiredTime;
        document.getElementById('select-selector').onchange = function () {
            var file = this.files[0];
            if (!file) return;
            if(self.SecretId != "" && self.SecretKey !="" ){
                if(file){
                    self.cosjsFile3(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                        self.nowData.selectQMenu[self.selectImgIndex].selectImg ="https://suishi-1256985330.cos.ap-guangzhou.myqcloud.com/" + img;
                    });
                }
            }
        };
        document.getElementById('select-selector-big').onchange = function () {
            var file = this.files[0];
            if (!file) return;
            if(self.SecretId != "" && self.SecretKey !="" ){
                if(file){
                    self.cosjsFile3(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                        self.nowData.selectQMenu[self.selectImgIndex].selectImgBig ="https://suishi-1256985330.cos.ap-guangzhou.myqcloud.com/" + img;
                    });
                }
            }
        };
    },
    methods:{
        /**
         * 选择类型 (可添加多个题目)
         */
        selectAddQEvent(){
            var newData = {
                selectTitle: "",
                selectImgBig:"",
                selectInfo:"",
                selectImg: "",
                selectMenu: [
                    {answerText:"",isAnswer:"0" , isClick:false ,isShow:true}
                ],
                imgTextNote: "",
                imgTextNoteShow:false,
                imgNoteNode:""
            };
            this.nowData.selectQMenu.push(newData);
        },
        selectDeleteQEvent(index){
            this.nowData.selectQMenu.splice(index,1);
        },
        selectAddEvent(index){
            var newData =  {answerText:"",isAnswer:"0"}
            this.nowData.selectQMenu[index].selectMenu.push(newData);
        },
        selectDeleteEvent(index,pIndex){
            this.nowData.selectQMenu[pIndex].selectMenu.splice(index,1);
        },
        deleteMenuImg(index,key1,key2){
            this.nowData[key1][index][key2] = "";
        },
        uploadClick(id,index){
            document.getElementById(id).click();
            if(index > (-1)){
                this.selectImgIndex = index;
            }
        },
    }
}
</script>