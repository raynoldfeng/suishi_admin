<template>
    <div id="addMajor">
        <p class="title_main">专业编辑</p>
        <div class="view_main">
            <span>专业名称</span>
            <el-input v-model="majorName" class="input_type"></el-input>
            <span>排序</span>
            <el-input v-model="orderValue" class="input_type"></el-input>
            <span>是否启用</span>
            <el-select v-model="isUse" placeholder="是否使用">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="view_main">
            <span>简介</span>
            <el-input
            class="textarea_type"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="descText">
            </el-input>
            <span>是否学习</span>
            <el-select v-model="isStudy" placeholder="是否使用">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="view_main">
            <span>标签</span>
                <el-tag  v-if="tags.length > 0"
                v-for="tag in tags"
                :key="tag.name"
                closable
                :id="tag.id" @close="handleClose(tag)">
                {{tag.name}}
                </el-tag>
            <el-button @click="LabelDialog(true)">添加</el-button>
        </div>
        <div class="view_main">
            <span class="type_title">封绘图</span>
            <input id="file-selector" type="file">
                <div class="avatar-uploader">
                    <img v-if="coverImg" :src="coverImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
            </div>
            <div class="view_main">
                <el-button @click="addMajor">提交</el-button>
            </div>
            <el-dialog title="选择标签" :visible.sync="dialogTableVisible">
               <div class="dialog_menu">
                   <div class="type_menu_css">
                        <p v-for="data in typeData" v-text="data.name" @click="tagsData(data.id)"></p>
                   </div>
                   <div class="type_menu_css">
                       <template>
                           <el-checkbox-group v-model="tagDataMenu" @change="handleCheckedCitiesChange">
                               <div  v-for="data in tagData">
                                   <el-checkbox  :label="data.id" :key="data.id">{{data.name}}</el-checkbox>
                               </div>

                           </el-checkbox-group>
                       </template>
                   </div>
               </div>
                <el-button @click="LabelDialog(false)">保存并关闭</el-button>
            </el-dialog>
        </div>
    </template>
    <script>
    export default{
            data(){
                return{
                    isUseMenu: [
                        {value: "1",
                        label: "是"},
                        {value: "0",
                        label: "否"}
                    ],
                    isUse: "0",
                    isStudy:"0",
                    descText:"",
                    imageUrl: '',
                    tags: [

                    ],
                    tagsArr:[],
                dialogTableVisible: false,
                userinfo:"",
                SecretId:"",
                SecretKey:"",
                XCosSecurityToken:"",
                expiredTime:"",
                majorName:"",
                orderValue:"",
                coverImg:"",
                typeData:[],
                nowType:"",
                tagData:[],
                tagDataList:[],
                tagDataMenu:[],
                isedit:false
                }
            },
            methods: {
                handleClose(tag) {
                      this.tags.splice(this.tags.indexOf(tag), 1);
                },
                handleCheckedCitiesChange(value) {
                    let tagDataMenu = value.length;
                    this.checkAll = tagDataMenu === this.tagDataList.length;
                    this.isIndeterminate = tagDataMenu > 0 && tagDataMenu < this.tagDataList.length;
                },


                LabelDialog(boolean){
                    this.dialogTableVisible = boolean;
                    console.log(this.tagDataMenu);
                    this.tags = [];
                        for(let a = 0; a < this.tagData.length;a++){
                            if(this.tagDataMenu.indexOf(this.tagData[a].id) != (-1)){
                                this.tags.push({ name: this.tagData[a].name, id: this.tagData[a].id });
                            }
                    }
                },
                urlEvent(){
                    console.log(this.$route.name);
                    var self = this;
                    if(this.$route.name == "editMajor"){
                        this.isedit = true;
                        this.common.getEventToken(this.api.host+this.api.profession+"/"+this.$route.query.id,{},this.userinfo,function(data){
                            console.log(data);
     //   var datas = {"name":this.majorName, "desc":this.descText,"cover":this.coverImg, "order":this.orderValue, "status":this.isUse,"tag_ids":this.tagsArr,is_study:this.isStudy};
                            self.majorName = data.name;
                            self.descText = data.desc;
                            self.coverImg = data.cover;
                            self.orderValue = data.order;
                            self.isUse = data.status;
                            self.isStudy = data.is_study;
                            self.tagsArr = data.tag_ids;
        console.log(8888)
        console.log(data.tag_ids)
                        })
                    }else{
                        this.isedit = false;
                    }
                },
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
                addMajor(){
                    var self =this;
                    if(this.majorName == ""){
                        alert("输入专业名称");
                        return ;
                    }else if(this.orderValue == ""){
                        alert("输入顺序");
                        return ;
                    }else if(self.descText == ""){
                        alert("输入简介");
                        return;
                    }else if(this.coverImg == ""){
                        alert("选择封绘图");
                        return ;
                    }

                    if(this.tags.length <= 0){
                        alert("请选择标签");
                        return ;
                    }else{
                        this.tagsArr = [];
                        for(let i = 0 ;i <this.tags.length; i++){
        console.log(i)
                            this.tagsArr.push(this.tags[i].id);
                        }
                    }
                    console.log(this.tagsArr)
                    var datas = {"name":this.majorName, "desc":this.descText,"cover":this.coverImg, "order":this.orderValue, "status":this.isUse,"tag_ids":this.tagsArr,is_study:this.isStudy};
                    this.common.postEventToken(this.api.host+this.api.profession,datas,this.userinfo,function(data){
                        console.log(data);
                        self.$router.push("/majorList");
                    })
                },
                tagsType(){
                    var self = this;
                    this.common.getEventToken(this.api.host+this.api.tagsType,{},this.userinfo,function(data){
                        if(data.length >0){
                            self.typeData = data;
                            self.nowType = data[0].id;
                            self.tagsData(self.nowType);
                            if(self.isedit){
                                self.showTag();
                            }
                        }
                    });
                },
                tagsData(id){
                    var self = this;
                    this.nowType = id;
                    this.common.getEventToken(this.api.host+this.api.tagsData+"?tag_type="+id,{},this.userinfo,function(data){
                    console.log(data);
                    if(data.length >0){
                        self.tagData = data;
                        self.tagDataList = [];
                        self.tagDataMenu = [];
                        for(let i = 0 ;i<data.length;i++){
                            self.tagDataList.push(data[i].id);
                        }

                    }else{
                        self.tagData = [];
                        self.tagDataList = [];
                    }

                    });
                },
                showTag(){
                     var self = this;
                    for(let i = 0 ; i<self.typeData.length;i++){
                        this.common.getEventToken(this.api.host+this.api.tagsData+"?tag_type="+self.typeData[i].id,{},this.userinfo,function(data){
                            for(let a = 0;a<data.length;a++){
        console.log(155)
        console.log(self.tagsArr)
                                if(self.tagsArr.indexOf(data[a].id)!=(-1)){
                                    self.tags.push({ name: data[a].name, id: data[a].id });
        console.log(155)
                                    console.log(self.tags)
                                }else{
                                    return;
                                }
                            }
                        })
                     }
                }
            },
            mounted:function(){
                var self =this;
                this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
                this.urlEvent();
                this.getUpLoadKey();
                this.tagsType();

                document.getElementById('file-selector').onchange = function () {
                var file = this.files[0];
                if (!file) return;
//                console.log(file.name);
//                console.log(file)
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                            self.coverImg = img;
                        });
                    }
                }

                };
            }
        }
    </script>
    <style>
    .title_main{
        padding:20px 0;
        border-bottom: 1px solid #999;
        }
    .input_type{
        width: 200px;
        }
    .view_main{
        overflow:hidden;
        margin-top:10px
        }
    .textarea_type{
        width: 500px;
        }
    .type_title{
        float: left;
        }
    .avatar-uploader{
        float: left;
        }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
        }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
        }
        .dialog_menu{

        }
        .type_menu_css{
            display:inline-block;
            width:40%;
            height:500px;
            overflow:auto;
            background:#efefef;
        }
        .type_menu_css p{
            padding-left:10px;
        }
    </style>