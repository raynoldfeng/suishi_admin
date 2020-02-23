<template>
    <div>
        <input id="true-img" type="file"  />
        <input id="false-img" type="file"  />
        <div class="view_main">
            <span>题目:</span>
            <el-input class="input_type" v-model="nowData.judgeTitle"></el-input>
        </div>
        <div class="view_main">
            <span>副题目:</span>
            <el-input class="input_type" v-model="nowData.judgeInfo"></el-input>
        </div>
        <div class="view_main">
            <span>正确标题:</span>
            <el-input class="input_type" v-model="nowData.judgeTitleTrue"></el-input>
        </div>
        <div class="view_main">
            <div class="type_title">正确图片:</div>

                <div class="avatar-uploader" @click="uploadClick('true-img')">
                <img v-if="nowData.judgeTrueImg" :src="nowData.judgeTrueImg" class="avatar">
                <div v-else class=" avatar-uploader-icon">
                    <img class="addi-icon" src="./../../image/addi.png">
                </div>
            </div>
            <i  @click="deleteImg('judgeTrueImg')">
                <img  class="icon_btn" src="./../../image/close.png" />
            </i>
        </div>
        <div class="view_main">
            <span>错误标题:</span>
            <el-input class="input_type" v-model="nowData.judgeTitleFalse"></el-input>
        </div>
        <div class="view_main">
            <div class="type_title">错误图片:</div>

            <div class="avatar-uploader" @click="uploadClick('false-img')">
                <img v-if="nowData.judgeFalseImg" :src="nowData.judgeFalseImg" class="avatar">
                <div v-else class=" avatar-uploader-icon">
                    <img class="addi-icon" src="./../../image/addi.png">
                </div>
            </div>
            <i  @click="deleteImg('judgeFalseImg')">
                <img  class="icon_btn" src="./../../image/close.png" />
            </i>
         </div>
        <div class="view_main">
            <span>按钮:</span>
            <el-input class="input_type" v-model="nowData.judgeBtn"></el-input>
        </div>
        <div class="view_main">
            <el-button @click="addJudgeEvent">添加问题</el-button>
    </div>
    <div class="view_main" v-for="(data,index) in nowData.judgeMenu">
        <el-button @click="deleteJudgeEvent(index)">删除问题</el-button>
    <div class="view_main">
        <span>答案文本:</span>
        <el-input class="input_type" v-model="data.judgeText"></el-input>
    </div>

    <div class="view_main">
        <span>正确选项:</span>

        <el-select v-model="data.judgeAnswer" class="select-css" placeholder="正确选项">
            <el-option
                    v-for="item in judgeAnswerMenu"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>
</div>
<div class="view_main">
<span>答案注释:</span>
<el-input
        class="textarea_type"
        type="textarea"
:autosize="{ minRows: 2, maxRows: 4}"
placeholder="请输入内容"
v-model="data.judgeAnswerText">
</el-input>
        </div>

        </div>

        </div>
</template>
        <script>
        export default{
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
                judgeAnswerMenu:"",
            },
            mounted:function(){
                var self = this;
                self.SecretId= self.cosData.SecretId;
                self.SecretKey= self.cosData.SecretKey;
                self.XCosSecurityToken = self.cosData.XCosSecurityToken;
                self.expiredTime = self.cosData.expiredTime;
                document.getElementById('true-img').onchange = function () {
                    var file = this.files[0];
                    if (!file) return;
                    if(self.SecretId != "" && self.SecretKey !="" ){
                        if(file){
                            self.cosjsFile3(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                                self.nowData.judgeTrueImg = img;
                            });
                        }
                    }
                };
                document.getElementById('false-img').onchange = function () {
                    var file = this.files[0];
                    if (!file) return;
                    if(self.SecretId != "" && self.SecretKey !="" ){
                        if(file){
                            self.cosjsFile3(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                                self.nowData.judgeFalseImg = img;
                            });
                        }
                    }
                };
            },
            methods:{
                /**
                 * 判断题
                 */
                addJudgeEvent(){
                    var newData={
                        judgeText:"",
                        judgeAnswer:"0",
                        judgeAnswerText:""
                    }
                    this.nowData.judgeMenu.push(newData)
                },

                deleteJudgeEvent(index){
                    this.nowData.judgeMenu.splice(index,1);
                },
                uploadClick(id,index){
                    document.getElementById(id).click();
                    if(index > (-1)){
                        this.selectImgIndex = index;
                    }
                },
                deleteImg(type){
                    this.nowData[type] = "";
                },
            }
        }
        </script>