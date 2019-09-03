<template>
    <div >
        <input id="imgtext-selector" type="file" >
        <div class="view_main">
            <div class="view_main">
                <span>标题:</span>
                <el-input class="input_type" v-model="nowData.imgTextTitle"></el-input>
            </div>
                    <div class="view_main">
                        <div class="type_title">图片:</div>

                            <div class="avatar-uploader" @click="uploadClick('imgtext-selector')">
                            <img v-if="nowData.imgTextImg" :src="nowData.imgTextImg" class="avatar">
                            <div v-else class=" avatar-uploader-icon">
                                <img class="addi-icon" src="./../../image/addi.png">
                            </div>
                        </div>
                        <i  @click="deleteImg('imgTextImg')">
                        <img  class="icon_btn" src="./../../image/close.png" />
                         </i>
                    </div>

                <div  class="view_main">

                     <p>文本</p>

                    <div  class="view_main"  v-for="(data,index) in nowData.imgTextMenu">
                        <div class="view_main">
                            <span>段落样式:</span>
                            <el-select v-model="nowData.imgTextMenu[index].typeValue" class="select-css" placeholder="段落样式">
                                <el-option
                                v-for="item in listSysleList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>

                        </div>
                        <div class="view_main" v-show="nowData.imgTextMenu[index].typeValue == '6'">
                            <span>输入段落序号</span>
                            <el-input class="input_type"   v-model="nowData.imgTextMenu[index].typeNum"></el-input>
                        </div>
                        <div class="view_main">
                            <el-input   v-if="nowData.imgTextMenu.length>0"
                                        class="textarea_type"
                                        type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="nowData.imgTextMenu[index].text">
                            </el-input>
                             <span  @click="deleteImgText(index)">删除</span>
                         </div>
                     </div>
                    <div  class="view_main">
                            <el-button @click="addImgText">添加段落</el-button>
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
    },
    mounted:function(){
        var self = this;
        self.SecretId= self.cosData.SecretId;
        self.SecretKey= self.cosData.SecretKey;
        self.XCosSecurityToken = self.cosData.XCosSecurityToken;
        self.expiredTime = self.cosData.expiredTime;
        document.getElementById('imgtext-selector').onchange = function () {
            var file = this.files[0];
            var date = new Date().getTime();
            var fileurl = "courseware/a/"+date.getFullYear()+(date.getMonth()+1)+date.getDate()+"/"+date+file.name;
            if (!file) return;
            //                console.log(file.name);
            //                console.log(file)
            if(self.SecretId != "" && self.SecretKey !="" ){
                if(file){
//                    self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
//                        self.nowData.imgTextImg = img;
//                    });
                    self.cosjsFile3(self.SecretId,self.SecretKey,fileurl,file,self.XCosSecurityToken,self.expiredTime,function(img){
                        self.nowData.imgTextImg ="https://suishi-1256985330.cos.ap-guangzhou.myqcloud.com/" + img;
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
        /**
         * 1
         * 添加段落
         */
        addImgText(){
            var newdata = { text:"",typeValue:"0",
                typeNum:""};
            this.nowData.imgTextMenu.push(newdata);
        },
        deleteImgText(index){
            this.nowData.imgTextMenu.splice(index,1);
        },
    }
}
</script>