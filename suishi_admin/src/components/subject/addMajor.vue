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
            <el-upload
            class="avatar-uploader "
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
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
                }
            },
            methods: {
                handleAvatarSuccess(res, file) {
                    this.imageUrl = URL.createObjectURL(file.raw);
                },
                beforeAvatarUpload(file) {
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
                }

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