<template>
    <div id="operateAdministration">
        <div class="view_main">
            <el-button @click="displayDialog(true)">新增</el-button>
        </div>
        <div class="view_main">
            <template>
                <el-table
                :data="tableData"
                border
                style="width: 100%">
                    <el-table-column
                    fixed
                    prop="id"
                    label="用户ID"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="昵称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="头像"
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <el-dialog title="新增" :visible.sync="dialogTableVisible">
            <div class="view_main">
                <span>昵称</span>
                <el-input class="input_type" placeholder="输入名称"></el-input>
            </div>
            <div class="view_main">
                <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
            </div>
            <div class="view_main">
                <el-button type="primary" @click="displayDialog(false)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                tableData: [{
                    id: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }],
                dialogTableVisible:false,
                imageUrl: ''
            }
        },
        methods:{
            displayDialog(boolean){
                this.dialogTableVisible = boolean;
            },
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
    }
        }
    }
</script>
<style>
.view_main{
    overflow:hidden;
    margin-top:10px
    }
.input_type{
    width: 200px;
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