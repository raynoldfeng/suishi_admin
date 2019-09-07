<template>
    <div>
        <input id="file-selector3" multiple="multiple" type="file" />
        <div class="view_main">
            <div>图片</div>
            <div class="view_main">
                <el-button @click="addEvent">添加图片</el-button>
            </div>
            <div class="view_main">
                <span>跳转文案:</span>
                <el-input class="input_type" v-model="nowData.imageChangeJump"></el-input>
            </div>
            <div  class="view_main" v-for="(data,index) in nowData.imageChange">
                <el-button @click="imageChangeDelete(index)">删除</el-button>
                <div class="view_main">
                    <span>图片标题:</span>
                    <el-input class="input_type"   v-model="nowData.imageChange[index].imgChangeTitle"></el-input>
                </div>
                <div class="view_main">
                    <div class="avatar-uploader" @click="uploadClick('file-selector3',index)">
                        <img v-if="nowData.imageChange[index].img" :src="nowData.imageChange[index].img" class="avatar">
                            <div v-else class=" avatar-uploader-icon">
                                <img class="addi-icon" src="./../../image/addi.png" />
                            </div>
                    </div>
                            <i  @click="deleteMenuImg(index,'imageChange','img')">
                                <img  class="icon_btn" src="./../../image/close.png" />
                            </i>

                 </div>
                <div class="view_main">
                    <span>是否显示大图:</span>
                    <el-select v-model="nowData.imageChange[index].isBigImg" class="select-css" placeholder="是否显示大图">
                        <el-option
                                v-for="item in judgeAnswerMenu"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                        <div class="view_main">
                            <p>解释:</p>
                            <div class="view_main"  v-for="(sdata,tindex) in nowData.imageChange[index].textMenu">
                                <div class="view_main">
                                    <span>段落样式:</span>
                                        <el-select v-model="sdata.typeValue" class="select-css" placeholder="段落样式">
                                            <el-option
                                                v-for="item in listSysleList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                </div>
                                <div class="view_main" v-show="sdata.typeValue == '6'">
                                    <span>输入段落序号</span>
                                    <el-input class="input_type"   v-model="sdata.typeNum"></el-input>
                                </div>
                                <el-input

                                          class="textarea_type"
                                          type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                          v-model="sdata.text"></el-input>
                                <span  @click="deleteTextEvent(index,tindex)">删除</span>
                            </div>
                            <div  class="view_main">
                                <el-button @click="addTextEvent(index)">添加段落</el-button>
                             </div>
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
            selectImgIndex:"",      //模板需要多个带图片的问题时
            }
            },
            props:{
                  nowData:"",
                  cosData:"",
                  listSysleList:"",
                  judgeAnswerMenu:""
            },
            mounted:function(){
            var self = this;
            self.SecretId= self.cosData.SecretId;
            self.SecretKey= self.cosData.SecretKey;
            self.XCosSecurityToken = self.cosData.XCosSecurityToken;
            self.expiredTime = self.cosData.expiredTime;


            document.getElementById('file-selector3').onchange = function () {
             //   var files = this.files;
                //                console.log(file.name);
                //                console.log(file)
//                if(files.length>0){
//                    self.pptUrl = [];
//                }
//                if(self.SecretId != "" && self.SecretKey !="" ){
//                    for(let i = 0 ;i<files.length;i++){
//                        var file = files[i];
//                        if (!file) return;
//                        if(file){
//                            self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(url){
//                                self.nowData.imageChange[self.selectImgIndex].img = url;
//                            });
//                        }
//                    }
//                }
                var file = this.files[0];
                if (!file) return;
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjsFile3(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.nowData.imageChange[self.selectImgIndex].img ="https://suishi-1256985330.cos.ap-guangzhou.myqcloud.com/" + img;
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

                deleteMenuImg(index,key1,key2){
                    this.nowData[key1][index][key2] = "";
                },
                imageChangeDelete(index){
                    if(this.nowData.imageChange.length > 0){
                        this.nowData.imageChange.splice(index,1);
                    }
                },

                addEvent(){
                    var newdata = {imgChangeTitle:"",img:"",isBigImg:"0",textMenu:[{text:"",typeValue:"0",typeNum:""}]};
                    this.nowData.imageChange.push(newdata);
                },
                addTextEvent(index){
                    var newText = {text:"",typeValue:"0",typeNum:""};
                    this.nowData.imageChange[index].textMenu.push(newText);

                },
                deleteTextEvent(index,tindex){
                    this.nowData.imageChange[index].textMenu.splice(tindex,1);
                }
            }
            }
        </script>