<template>
    <div id="addPost">
        <p class="title_main">新增帖子</p>
        <div class="view_main">
            <span>圈子名称</span>
            <el-select v-model="isUse" placeholder="是否推荐">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
                </el-select>
            <span>发布用户</span>
            <el-select v-model="isUse" placeholder="是否推荐">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="view_main">
            <span>帖子文本</span>
            <el-input
            class="textarea_type"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea">
            </el-input>
        </div>
        <div class="view_main">
            <p>图片</p>
            <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
        </div>
            <div class="view_main">
                <span>发布时间</span>
                <el-date-picker
                v-model="datevalue"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="view_main">
                <el-button>发布</el-button>
                <el-button>删除</el-button>
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
        datevalue: '',
        dialogImageUrl: '',
        dialogVisible: false
        }
    },
        methods:{
        handleRemove(file, fileList) {
        console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        }
        }

}
</script>
<style>
.title_main{
    padding:20px 0;
    border-bottom: 1px solid #999;
}
.view_main{
    overflow:hidden;
    margin-top:10px
}
.textarea_type{
    width: 500px;
    }
</style>