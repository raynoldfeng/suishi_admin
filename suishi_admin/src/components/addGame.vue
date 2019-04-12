<template>
    <div id="addGame">
        <p class="title_main">新增游戏</p>
        <div class="view_main">
            <span>圈子名称</span>
            <el-input class="input_type"></el-input>
            <span>排序</span>
            <el-input class="input_type"></el-input>
            <span>是否推荐</span>
            <el-select v-model="isUse" placeholder="是否推荐">
                <el-option
                        v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
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
        <div  class="view_main">
            <span>简介</span>
            <el-input
                    class="textarea_type"
                    type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
        </div>
        <div  class="view_main">
            <span>类型</span>
            <el-select v-model="typeValue1" placeholder="专业">
                <el-option
                v-for="item in optionsType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div  class="view_main">
            <span>标签</span>
            <el-tag
            v-for="tag in tags"
            :key="tag.name"
            closable
            :type="tag.type">
  {{tag.name}}
            </el-tag>
        </div>
        <div class="view_main">
            <p>封面图</p>
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
                <ul class="game_info">
                    <li>
                    <p class="padd_type">关注人数</p>
                        <p>0</p>
                        </li>
                    <li>
                        <p class="padd_type">帖子数</p>
                        <p>0</p>
                    </li>
                    <li>
                        <p class="padd_type">每日预览</p>
                        <p>0</p>
                    </li>
                    <li>
                        <p class="padd_type">每日点赞</p>
                        <p>0</p>
                    </li>
                </ul>
            </div>
            <div class="view_main">
                <el-button>提交</el-button>
            </div>
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
                        optionsType: [
                            {
                                value: '选项1',
                                label: '黄金糕'
                            },
                            {
                                value: '选项2',
                                label: '双皮奶'
                            },
                            {
                                value: '选项3',
                                label: '蚵仔煎'
                            },
                            {
                                value: '选项4',
                                label: '龙须面'
                            },
                            {
                                value: '选项5',
                                label: '北京烤鸭'
                            }
                        ],
                        typeValue1: '',
                        tags: [
                            { name: '标签一', type: '' },
                            { name: '标签二', type: 'success' },
                            { name: '标签三', type: 'info' },
                            { name: '标签四', type: 'warning' },
                            { name: '标签五', type: 'danger' }
                        ],
                         imageUrl: ''
                    }
                },
                methods:{
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
        .input_type{
            width: 200px;
        }
        .textarea_type{
            width: 500px;
        }
        .title_main{
            padding:20px 0;
            border-bottom: 1px solid #999;
            }
        .view_main{
            margin-top:10px
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
            .game_info{
                overflow:hidden;
                background:#efefef;
                padding:10px 0;
            }
        .game_info li{
                float:left;
                width:150px;
            height:150px;
                text-align:center;
            background:#666666;
            color:#fff;
            margin-left:20px;
            }
            .padd_type{
            padding-top:30px;
            }
        </style>