<template>
    <div>
        <div class="view_main">
            <span class="type_title">选择文件：</span>
            <input id="linkFile" type="file" >
            <div class="avatar-uploader" @click="uploadLink">
                <img v-if="coverImg" :src="coverImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            <p v-text="linkUrl"></p>
        </div>
    </div>
</template>
        <script>
           export default{
               data(){
                   return{
                       linkUrl:""
                   }
               },
               methods:{
                   uploadLink(){
                       document.getElementById('linkFile').click();
                   },
                   getUpLoadKey(){
                       var self =this;
                       //http://test.sui10.com:9001/api/account/v1/qcloudBucketApiToken?bucket=suishi-public-1256985330
                       //this.api.host+this.api.bucketApiToken+"?bucket=suishi-public-1256985330"
                       this.common.getEventToken(this.api.host+this.api.bucketApiToken+"?bucket=suishi-public-1256985330",{bucket:"suishi-public-1256985330"},this.userinfo,function(data){
                           console.log(111)
                           console.log(data);
                           self.SecretId = data.credentials.tmpSecretId;
                           self.SecretKey = data.credentials.tmpSecretKey;
                           self.XCosSecurityToken = data.credentials.sessionToken;
                           self.expiredTime = data.expiredTime;
                       })

                   }
               },
               mounted:function(){
                   var self = this;
                   this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
                   this.getUpLoadKey();
                   document.getElementById('linkFile').onchange = function () {
                       var file = this.files[0];
                       if (!file) return;
                       if(self.SecretId != "" && self.SecretKey !="" ){
                           if(file){
                               self.cosjsLink("AKIDf3Tx6n4qJbw0NiT80UppYIHooQ3EIjTj","5TRcRI2MvI43G9LTIgs79ODYiyQbO848",file,"4ae0569dd0d0131fa963563bcfdd43b84621b4cd30001",1589814598,function(img){
                                   self.linkUrl = img;
                               });
                           }
                       }

                   };
               }
           }
        </script>
        <style></style>