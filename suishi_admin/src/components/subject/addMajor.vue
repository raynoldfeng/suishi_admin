<template>
    <div id="addMajor">
        <p class="title_main">专业编辑</p>
        <div class="view_main">
            <span>专业名称</span>
            <el-input class="input_type"></el-input>
            <span>排序</span>
            <el-input class="input_type"></el-input>
            <span>是否启用</span>
            <el-select v-model="isUse" placeholder="是否使用">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="view_main">
            <span>简介</span>
            <el-input
            class="textarea_type"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea">
            </el-input>
            <span>是否学习</span>
            <el-select v-model="isUse" placeholder="是否使用">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="view_main">
            <span>标签</span>
            <el-tag
            v-for="tag in tags"
            :key="tag.name"
            closable
            :type="tag.type">
  {{tag.name}}
            </el-tag>
            <el-button @click="LabelDialog(true)">添加</el-button>
        </div>
        <div class="view_main">
            <span class="type_title">封绘图</span>
            <input id="file-selector" type="file">
            <el-upload
            class="avatar-uploader "
            action=""
            :on-change="uploadImg"
            :show-file-list="false"
            :auto-upload="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="view_main">
                <el-button>提交</el-button>
            </div>
            <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
               <div>sadasd</div>
                <el-button @click="LabelDialog(false)">保存并关闭</el-button>
            </el-dialog>
        </div>
    </template>
    <script>
    export default{
            data(){
                return{
                    isUseMenu: [
                        {value: "true",
                        label: "是"},
                        {value: "false",
                        label: "否"}
                    ],
                    isUse: "false",
                    textarea:"",
                    imageUrl: '',
                    tags: [
                        { name: '标签一', type: '' },
                        { name: '标签二', type: 'success' },
                        { name: '标签三', type: 'info' },
                        { name: '标签四', type: 'warning' },
                        { name: '标签五', type: 'danger' }
                    ],
                dialogTableVisible: false,
                userinfo:"",
                SecretId:"",
                SecretKey:"",
                XCosSecurityToken:"",
        expiredTime:""
                }
            },
            methods: {
                handleAvatarSuccess(res, file) {
                    this.imageUrl = URL.createObjectURL(file.raw);
                    console.log(1)
                },
                beforeAvatarUpload(file) {
                    console.log(2)
                    const isJPG = file.type === 'image/jpeg';
                    const isLt2M = file.size / 1024 / 1024 < 2;

                    if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                    }
                    if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                    }
                    return isJPG && isLt2M;
                },
                LabelDialog(boolean){
                    this.dialogTableVisible = boolean;
                },
                urlEvent(){
                    console.log(this.$route.name)
                },
                getUpLoadKey(){
                    var self =this;
                    this.common.getEventToken(this.api.host+this.api.cosToken,{},this.userinfo,function(data){
                        console.log(data);
                        self.SecretId = data.credentials.tmpSecretId;
                        self.SecretKey = data.credentials.tmpSecretKey;
                        self.XCosSecurityToken = data.credentials.sessionToken;
                        self.expiredTime = data.expiredTime;
                    })

                },
                uploadImg(file){
                    var files = file;
        console.log(files)
//                    if(this.SecretId != "" && this.SecretKey !="" ){
//                        if(file){
//                             this.cosjs(this.SecretId,this.SecretKey,file);
//                        }
//                    }

                }
            },
            mounted:function(){
        var self =this;
                this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
                this.urlEvent();
                this.getUpLoadKey();
                document.getElementById('file-selector').onchange = function () {
                var file = this.files[0];
                if (!file) return;
//                console.log(file.name);
//                console.log(file)
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime);
                    }
                }

                };
            }
        }
    </script>
    <style>
    .title_main{
        padding:20px 0;
        border-bottom: 1px solid #999;
        }
    .input_type{
        width: 200px;
        }
    .view_main{
        overflow:hidden;
        margin-top:10px
        }
    .textarea_type{
        width: 500px;
        }
    .type_title{
        float: left;
        }
    .avatar-uploader{
        float: left;
        }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
        }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
        }
    </style>