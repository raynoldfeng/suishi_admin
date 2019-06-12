
<template>
    <div>
       <!-- <input id="file-selector" type="file" >-->
        <div class="margin-css">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div  class="margin-css">  <input id="mfile-selector" type="file" accept="*/*" multiple="" webkitdirectory=""></div>
        <div>
            <p>路径:<span v-text="cpath"></span></p>
        </div>
                <!--   <input title="点击选择文件夹" id="h5Input2" multiple="" webkitdirectory="" accept="*/*" type="file" name="html5uploader" style="position:absolute;opacity:0;top:0;left:0;width:100%;height:100%;cursor:pointer;">-->
            </div>
        </template>
        <script>
        export default{
            data(){
            return{
            userinfo:"",
            SecretId:"",
            SecretKey:"",
            XCosSecurityToken:"",
            expiredTime:"",

            options: [{
            value: 'test/',
            label: '测试'
            }],
            value: '',
            cpath:""
            }
            },
            methods: {
        /**
         * 路径例子https://suishi-1256985330.cos.ap-guangzhou.myqcloud.com/courseware/a/dsds/yes/indexxx.html
         * **/
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
            },
            mounted:function(){
            var self =this;
            this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
            this.getUpLoadKey();

//            document.getElementById('file-selector').onchange = function () {
//            var file = this.files[0];
//
//            var fileurl = "courseware/a/";
//            if (!file) return;
//            //                console.log(file.name);
//            //                console.log(file)
//            if(self.SecretId != "" && self.SecretKey !="" ){
//            if(file){
//            self.cosjsFile(self.SecretId,self.SecretKey,fileurl,file,self.XCosSecurityToken,self.expiredTime,function(img){
//            // self.coverImg = img;
//            });
//            }
//            }
//
//            };

            document.getElementById('mfile-selector').onchange = function () {
            var file = this.files;
            console.log(self.value)
            console.log(this.files);
            if(self.value != ""){
                var path = "test/";

            }else{
                alert("选择专业");
                return ;
            }
            var fileurl = "courseware/"+path;
         //   this.cpath = "https://suishi-1256985330.cos.ap-guangzhou.myqcloud.com/courseware/"+ path + ""
            if (!file) return;
            //                console.log(file.name);
            //                console.log(file)
            if(self.SecretId != "" && self.SecretKey !="" ){
            if(file){
            var lens = this.files.length;
            for(let i =0 ;i<lens;i++){
            self.cosjsFile2(self.SecretId,self.SecretKey,fileurl,file[i],self.XCosSecurityToken,self.expiredTime,function(img){
            // self.coverImg = img;
            });
            }

            }
            }

            };

            }
            }
        </script>
        <style>

            #mfile-selector{
            display:block
            }
        </style>