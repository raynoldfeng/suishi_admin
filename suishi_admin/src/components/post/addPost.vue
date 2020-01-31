<template>
    <div id="addPost">
        <p class="title_main">帖子详情</p>
        <div class="view_main">
            <span>圈子名称</span>
            <el-input v-model="category" readonly class="input_type"/>
           <!-- <el-select v-model="isUse" placeholder="是否推荐">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
                </el-select>-->
            <span>发布用户</span>
            <el-input v-model="nickName" readonly class="input_type"/>
        </div>
        <div class="view_main">
            <span>帖子文本</span>
            <el-input
            class="textarea_type"
            type="textarea" readonly
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="content">
            </el-input>
        </div>
        <div class="view_main">
            <p>图片</p>
            <img width="200" :src="imgs" alt="">
        </div>
            <div class="view_main">
                <span>发布时间</span>
                <el-input v-model="lastUpdateTime" readonly class="input_type"/>
                <!--<el-date-picker
                v-model="datevalue"
                type="date"
                placeholder="选择日期">
                </el-date-picker>-->
            </div>
           <!-- <div class="view_main">
                <el-button>发布</el-button>
                <el-button>删除</el-button>
            </div>-->
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
        dialogVisible: false,
        content:"",
        category:"",
        imgs:"",
        lastUpdateTime:"",
        nickName:""
        }
    },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            isedits(){
                if(this.$route.name == "seePost"){
                    return true;
                }else{
                    return false;
                }
            },
            getPostData(){
                 var self = this;
                this.common.getEventToken(this.api.host+this.api.postList+'/'+this.$route.query.id,{},this.userinfo,function(data){
                    console.log(data);
                    self.content = data.content;
                    self.category = data.category;
                    self.imgs = data.imgs;
                    self.lastUpdateTime = data.lastUpdateTime;
                    self.nickName = data.accountNick;
                })
            }
        },
        mounted:function(){
        var self = this;
        this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
        this.getPostData();
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
.input_type{
    width: 200px;
    }
</style>