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
                       this.common.getEventToken(this.api.host+this.api.cosToken+"?bucket=suishi-public-1256985330&region=ap-nanjing",{},this.userinfo,function(data){
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
                               self.cosjsLink(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                                   self.linkUrl = img;
                               });
                           }
                       }

                   };
               }
           }
        </script>
        <style></style>