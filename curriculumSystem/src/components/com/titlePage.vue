<template>
    <div >
        <input id="file-selector" type="file" />
        <input id="file-selector2" type="file" />
        <div  class="view_main">
            <span>课程标题:</span>
            <el-input class="input_type" v-model="nowData.courseTitle"></el-input>
        </div>
        <div  class="view_main">
            <span class="type_title">封面图:</span>

            <div class="avatar-uploader" @click="uploadClick('file-selector')">
            <img v-if="nowData.courseImg" :src="nowData.courseImg" class="avatar">
            <div v-else class=" avatar-uploader-icon">
                <img class="addi-icon" src="./../../image/addi.png">
            </div>
        </div>
        <i @click="deleteImg('courseImg')">
        <img  class="icon_btn" src="./../../image/close.png" />
    </i>
</div>
<div  class="view_main">
<span  class="type_title">作者图:</span>

<div class="avatar-uploader" @click="uploadClick('file-selector2')">
<img v-if="nowData.authorImg" :src="nowData.authorImg" class="avatar">
<div v-else class=" avatar-uploader-icon">
    <img class="addi-icon" src="./../../image/addi.png">
</div>
</div>
<i  @click="deleteImg('authorImg')">
<img  class="icon_btn" src="./../../image/close.png" />
        </i>
        </div>
<div  class="view_main">
<span >作者名字:</span>
<el-input class="input_type" v-model="nowData.authorInfo"></el-input>

</div>
<div  class="view_main">
<span class="type_title">介绍:</span>
<el-input
        class="textarea_type"
        type="textarea"
:autosize="{ minRows: 2, maxRows: 4}"
placeholder="请输入内容"
v-model="nowData.courseInfo">
</el-input>
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
                console.log(this.nowData)
                var self = this;
                self.SecretId= self.cosData.SecretId;
                self.SecretKey= self.cosData.SecretKey;
                self.XCosSecurityToken = self.cosData.XCosSecurityToken;
                self.expiredTime = self.cosData.expiredTime;
                document.getElementById('file-selector').onchange = function () {
                    var file = this.files[0];
                    if (!file) return;
                    //                console.log(file.name);
                    //                console.log(file)
                    if(self.SecretId != "" && self.SecretKey !="" ){
                        if(file){
                            self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                                self.nowData.courseImg = img;
                            });
                        }
                    }
                };
                document.getElementById('file-selector2').onchange = function () {
                    var file = this.files[0];
                    if (!file) return;
                    if(self.SecretId != "" && self.SecretKey !="" ){
                        if(file){
                            self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                                self.nowData.authorImg = img;
                            });
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
                }
            }
        }
       </script>
