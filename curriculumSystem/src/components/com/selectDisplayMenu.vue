<template>
    <div >
        <input id="selector-ty" type="file"  />
        <div class="view_main">
            <span>标题:</span>
            <el-input class="input_type" v-model="nowData.selectDisplayTitle"></el-input>
        </div>
        <div class="view_main">
            <span>副标题:</span>
            <el-input class="input_type" v-model="nowData.selectDisplayInfo"></el-input>
        </div>


                <div class="view_main">
                    <el-button @click="SelectAddEvent" type="primary" >添加图片选项</el-button>
                    <div class="view_main box-css" v-for="(data,index) in nowData.selectDisplayMenu">
                        <div class="view_main">
                            <el-button @click="SelectDeleteEvent(index)">删除</el-button>
                        </div>
                        <div class="view_main">
                            <span>按钮内容:</span>
                            <el-input class="input_type" v-model="data.selectDisplayBtn"></el-input>
                        </div>
                        <div class="view_main">
                            <div class="type_title">图片:</div>
                            <div class="avatar-uploader" @click="uploadClick('selector-ty',index)">
                                <img v-if="data.selectDisplayImg" :src="data.selectDisplayImg" class="avatar">
                                    <div v-else class=" avatar-uploader-icon">
                                        <img class="addi-icon" src="./../../image/addi.png">
                                        </div>
                                    </div>
                                    <i  @click="deleteMenuImg(index,'selectDisplayMenu','selectDisplayImg')">
                                        <img  class="icon_btn" src="./../../image/close.png" />
                                    </i>
                                </div>
                                <div class="view_main">
                                    <span>段落:</span>
                                    <el-button @click="SelectTextAddEvent(index)">添加段落</el-button>
                                    <ul class="view_main">
                                        <li v-for="(sdata,sindex) in data.selectDisplayTextMenu"  class="view_main">
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
                                            <div class="view_main">
                                                <span>段落颜色:</span>
                                                <el-select v-model="sdata.textColor" class="select-css" placeholder="段落颜色">
                                                    <el-option
                                                    v-for="item in paragraphMenu"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                    </el-option>
                                                </el-select>

                                            </div>
                                            <div class="view_main" v-show="sdata.typeValue == '6'" >
                                                <span>输入段落序号</span>
                                                <el-input class="input_type" v-model="sdata.typeNum"></el-input>
                                            </div>
                                            <div class="view_main">
                                                <el-input
                                                class="textarea_type"
                                                type="textarea"
                                                :autosize="{ minRows: 2, maxRows: 4}"
                                                placeholder="请输入内容"
                                                v-model="sdata.selectDisplayText"></el-input>
                                                <span @click="SelectTextDeleteEvent(index,sindex)">删除</span>
                                            </div>
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
                    listSysleList:"",
                    paragraphMenu:""
                    },
                    mounted:function(){
                    var self = this;
                    self.SecretId= self.cosData.SecretId;
                    self.SecretKey= self.cosData.SecretKey;
                    self.XCosSecurityToken = self.cosData.XCosSecurityToken;
                    self.expiredTime = self.cosData.expiredTime;


                    document.getElementById('selector-ty').onchange = function () {
                    var file = this.files[0];
                    if (!file) return;

                    if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjsFile3(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                        self.nowData.selectDisplayMenu[self.selectImgIndex].selectDisplayImg ="https://suishi-1256985330.cos.ap-guangzhou.myqcloud.com/" + img;
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
                    deleteMenuImg(index,key1,key2){
                    this.nowData[key1][index][key2] = "";
                    },

                /**
                 * 图片选项展示
                 */
                    SelectAddEvent(){
                    var newdata = { selectDisplayBtn:"",
                    selectDisplayImg:"",
                    selectDisplayTextMenu:[{
                        typeValue:"0",
                        typeNum:"",
                        selectDisplayText:""
                    }]
                    };
                    this.nowData.selectDisplayMenu.push(newdata);
                    },
                    SelectDeleteEvent(index){
                    this.nowData.selectDisplayMenu.splice(index,1);
                    },
                    SelectTextAddEvent(index){
                    var newdata = {typeValue:"0", typeNum:"",selectDisplayText:""};
                    this.nowData.selectDisplayMenu[index].selectDisplayTextMenu.push(newdata);
                    },
                    SelectTextDeleteEvent(index,sindex){
                    this.nowData.selectDisplayMenu[index].selectDisplayTextMenu.splice(sindex,1);
                    },

                    }
                    }
                </script>