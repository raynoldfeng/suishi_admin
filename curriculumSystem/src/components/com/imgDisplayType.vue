<template>
    <div >
        <input id="img-display" type="file" >
        <div class="view_main">
            <span>标题:</span>
            <el-input class="input_type" v-model="nowData.imgDisplayTypeTitle"></el-input>
        </div>
        <div class="view_main">
            <span>副标题:</span>
            <el-input class="input_type" v-model="nowData.imgDisplayTypeInfo"></el-input>
        </div>
        <div class="view_main">
            <el-button @click="imgDisplayAddEvent" type="primary" >添加图片展示</el-button>
            <div class="view_main" v-for="(data,index) in nowData.imgDisplayTypeMenu">
                <div class="view_main">
                    <el-button @click="imgDisplayDeleteEvent(index)">删除</el-button>
                </div>
                <div class="view_main">
                    <div class="type_title">图片:</div>
                    <div class="avatar-uploader" @click="uploadClick('img-display',index)">
                        <img v-if="data.imgDisplayTypeImg" :src="data.imgDisplayTypeImg" class="avatar">
                            <div v-else class=" avatar-uploader-icon">
                                <img class="addi-icon" src="./../../image/addi.png">
                                </div>
                            </div>
                            <i  @click="deleteMenuImg(index,'imgDisplayTypeMenu','imgDisplayTypeImg')">
                                <img class="icon_btn" src="./../../image/close.png" />
                            </i>
                        </div>
                        <div class="view_main">
                            <span>是否添加段落样式:</span>

                            <el-select v-model="nowData.imgDisplayTypeValue" class="select-css" placeholder="段落样式">
                                <el-option
                                v-for="item in judgeAnswerMenu"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="view_main">
                            <span>段落:</span>
                            <el-button @click="imgDisplayTextAddEvent(index)">添加段落</el-button>
                            <ul class="view_main">
                                <li v-for="(sdata,sindex) in data.imgDisplayTypeTextMenu"  class="view_main">
                                    <el-input
                                    class="textarea_type"
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="sdata.imgDisplayTypeText"></el-input>
                                    <span @click="imgDisplayTextDeleteEvent(index,sindex)">删除</span>
                                </li>
                            </ul>
                        </div>
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
            judgeAnswerMenu:"",
            },
            mounted:function(){
            var self = this;
            self.SecretId= self.cosData.SecretId;
            self.SecretKey= self.cosData.SecretKey;
            self.XCosSecurityToken = self.cosData.XCosSecurityToken;
            self.expiredTime = self.cosData.expiredTime;

            document.getElementById('img-display').onchange = function () {
            var file = this.files[0];
            if (!file) return;
            if(self.SecretId != "" && self.SecretKey !="" ){
            if(file){
            self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
            self.nowData.imgDisplayTypeMenu[self.selectImgIndex].imgDisplayTypeImg = img;
            console.log( self.nowData.imgDisplayTypeMenu)
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
            },
            deleteImg(type){
            this.nowData[type] = "";
            },
            deleteImgType2(type,index){
            this.nowData.imgselectDisplayMenu[index][type] = "";
            },
            imgselectDisplayMImgEvent(){
            this.nowData.imgselectDisplayMImg = "";
            },

        /**
         * 图片展示类型
         */
            imgDisplayAddEvent(){
            var newdata = {
            imgDisplayTypeImg:"",
            imgDisplayTypeTextMenu:[{
            imgDisplayTypeText:""
            }]
            };
            this.nowData.imgDisplayTypeMenu.push(newdata);
            },
            imgDisplayDeleteEvent(index){
            this.nowData.imgDisplayTypeMenu.splice(index,1);
            },
            imgDisplayTextAddEvent(index){
            var newdata = {imgDisplayTypeText:""}
            this.nowData.imgDisplayTypeMenu[index].imgDisplayTypeTextMenu.push(newdata);
            },
            imgDisplayTextDeleteEvent(index,sindex){
            this.nowData.imgDisplayTypeMenu[index].imgDisplayTypeTextMenu.splice(sindex,1);
            },
            deleteMenuImg(index,key1,key2){
                this.nowData[key1][index][key2] = "";
            },

            }
            }
        </script>