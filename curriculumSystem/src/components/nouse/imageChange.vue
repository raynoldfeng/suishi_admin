<template>
    <div>
        <input id="file-selector3" multiple="multiple" type="file" />
        <div class="view_main">
            <div>图片</div>

            <div  class="view_main" v-for="(data,index) in nowData.imageChange">
                <div class="avatar-uploader">
                    <img v-if="nowData.imageChange[index]" :src="nowData.imageChange[index]" class="avatar">
                        <div v-else class=" avatar-uploader-icon">
                            <img class="addi-icon" src="./../../image/addi.png">
                            </div>
                        </div>
                        <el-button @click="imageChangeDelete(index)">删除</el-button>
                    </div>
                    <div class="view_main">
                        <el-button @click="uploadClick('file-selector3')">添加图片</el-button>
                    </div>


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
            selectImgIndex:""      //模板需要多个带图片的问题时
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


            document.getElementById('file-selector3').onchange = function () {
            var files = this.files;
            //                console.log(file.name);
            //                console.log(file)
            if(files.length>0){
            self.pptUrl = [];
            }
            if(self.SecretId != "" && self.SecretKey !="" ){
            for(let i = 0 ;i<files.length;i++){
            var file = files[i];
            if (!file) return;
            if(file){
            self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(url){
            self.nowData.imageChange.push(url);
            });
            }
            }
            }

            };

            },
            methods:{
            uploadClick(id,index){
            document.getElementById(id).click();
            if(index > (-1)){
            this.selectImgIndex = index;
            }
            },
        /**
         * 选择类型 (多题)
         */
            selectMoreAddEvent(type){
            var newData =  {answerText:"",isAnswer:"0"}
            if(type=="l"){
            this.nowData.selectMoreMenuL.push(newData);
            }else if(type == "r"){
            this.nowData.selectMoreMenuR.push(newData);
            }
            },
            selectMoreDeleteEvent(type,index){
            if(type == "l"){
            this.nowData.selectMoreMenuL.splice(index,1);
            }else if(type == "r"){
            this.nowData.selectMoreMenuR.splice(index,1);
            }

            },
            deleteImg(type){
            this.nowData[type] = "";
            },
            imageChangeDelete(index){
            if(this.nowData.imageChange.length > 0){
            this.nowData.imageChange.splice(index,1);
            }
            },
            }
            }
        </script>