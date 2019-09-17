<template>
    <div>
        <input id="video-up" type="file" accept = "video/*" />
        <div class="view_main">
            <span>标题:</span>
            <el-input class="input_type" v-model="nowData.videoTitle"></el-input>
        </div>
        <div class="view_main">
            <el-button @click="uploadClick('video-up')">添加视频</el-button>
            <el-button @click="deleteVideo">删除视频</el-button>
            <el-input class="input_type" v-model="nowData.videoUrl"></el-input>
        </div>

        </div>
        </template>
<script>
export default {
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

    },
    mounted:function(){
        var self = this;
        self.SecretId= self.cosData.SecretId;
        self.SecretKey= self.cosData.SecretKey;
        self.XCosSecurityToken = self.cosData.XCosSecurityToken;
        self.expiredTime = self.cosData.expiredTime;

        document.getElementById('video-up').onchange = function () {
            var file = this.files[0];
            if (!file) return;
            if(self.SecretId != "" && self.SecretKey !="" ){
                if(file){
                    self.cosjsFile3(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                        self.nowData.videoUrl ="https://suishi-1256985330.cos.ap-guangzhou.myqcloud.com/" + img;
                    });
                }
            }
        };
    },
    methods:{


        uploadClick(id){
            document.getElementById(id).click();
        },
        deleteVideo(){
            this.nowData.videoUrl = "";
        }
    }
}
</script>
<style>

</style>