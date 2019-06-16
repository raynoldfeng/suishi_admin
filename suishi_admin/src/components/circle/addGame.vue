<template>
    <div id="addGame"  @click="displayChange(false)">
        <p class="title_main">新增圈子</p>
        <div class="view_main">
            <span>圈子名称</span>
            <el-input v-model="name" class="input_type"></el-input>
            <span>排序</span>
            <el-input v-model="sort" class="input_type"></el-input>
            <span>是否推荐</span>
            <el-select v-model="is_recommend" placeholder="是否推荐">
                <el-option
                        v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
            <span>是否禁用</span>
            <el-select v-model="isUse" placeholder="是否禁用">
                <el-option
                        v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
           </el-select>
        </div>
        <div  class="view_main">
            <span>简介</span>
            <el-input
                    class="textarea_type"
                    type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="description">
        </el-input>
        </div>
        <div  class="view_main2">
            <!--<span>圈子类型</span>
            <el-select v-model="circleTypeId" placeholder="专业">
                <el-option
                v-for="item in circleData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>-->
            <span>圈子类型</span>
            <div class="select-main"  @click.stop>
                <el-input v-model="circleTypeIdSelect" placeholder="圈子类型" @focus="displayChange(true)" @blur="blurEvent"  @keyup.native="searchEvent" class="input_type" />
                <ul class="select-menu" v-show="mIsShow" >
                    <li v-for="item in circleData" v-text="item.name" @click="changeEvent(item.id,item.name)"></li>
                </ul>
            </div>
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
            <p>封面图</p>
            <input id="file-selector" type="file">
                <div class="avatar-uploader" @click="uploadImg">
                    <img v-if="coverImg" :src="coverImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </div>
        </div>

            <div class="view_main">
                <el-button @click="addCircle">提交</el-button>
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
                        optionsType: [
                            {
                                value: '选项1',
                                label: '黄金糕'
                            },
                            {
                                value: '选项2',
                                label: '双皮奶'
                            },
                            {
                                value: '选项3',
                                label: '蚵仔煎'
                            },
                            {
                                value: '选项4',
                                label: '龙须面'
                            },
                            {
                                value: '选项5',
                                label: '北京烤鸭'
                            }
                        ],
                        typeValue1: '',
                        tags: [
                            { name: '标签一', type: '' },
                            { name: '标签二', type: 'success' },
                            { name: '标签三', type: 'info' },
                            { name: '标签四', type: 'warning' },
                            { name: '标签五', type: 'danger' }
                        ],
                         imageUrl: '',
                        dialogTableVisible: false,

            userinfo:"",
                        name:"",
                        sort:"",
                        isUseMenu: [
                        {value: "1",
                        label: "是"},
                        {value: "0",
                        label: "否"}
                        ],
                        isUse: "0",
                        is_recommend:"0",
                        description:"",
                        circleData:[],
                        circleTypeId:"",
            coverImg:"",
            SecretId:"",
            SecretKey:"",
            XCosSecurityToken:"",
            expiredTime:"",

                        typeData:[],
                        nowType:"",
                        tagData:[],
                        tagDataList:[],
                        tagDataMenu:[],
                        tags: [],
                        tagsArr:[],

                        circleTypeIdSelect:"",
                        saveCircleTypeIdSelect:"",
                        mIsShow:false
                    }
                },
                methods:{
                    urlEvent(){
                        var self = this;
                        if(this.isedits()){
                            this.common.getEventToken(this.api.host+this.api.category+"/"+this.$route.query.id,{},this.userinfo,function(data){
                                console.log(data);
                                self.name = data.name;
                                self.sort = data.sort;
                                self.is_recommend = data.is_recommend;
                                self.isUse = data.status;
                                self.description = data.description;
                                self.coverImg = data.img;
                                self.circleTypeId = parseInt(data.type);
                                self.getCategoryId(parseInt(data.type));
                                for(var index in data.tag_ids){
                                    console.log(data.tag_ids)
                                    self.tagsArr.push(data.tag_ids[index])
                                }
                            });
                        }
                    },
                    getCategoryId(id){
                        var self = this;
                        this.common.getEventToken(this.api.host+this.api.categoryType+"/"+id,{},this.userinfo,function(data){
                            self.circleTypeIdSelect = data.name;
                            self.saveCircleTypeIdSelect = data.name;
                        });
                    },
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
                    circleType:function(name){
                        var self = this;
                        this.common.getEventToken(this.api.host+this.api.categoryType+"?name="+name,{},this.userinfo,function(data){
                            self.circleData = data.data;
                            console.log(data)
                        });
                    },
                    tagsType(){
                        var self = this;
                        this.common.getEventToken(this.api.host+this.api.tagsType,{},this.userinfo,function(data){
                            if(data.length >0){
                                self.typeData = data;
                                self.nowType = data[0].id;
                                self.tagsData(self.nowType);
                                if(self.isedits()){
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
                            if(data.data.length >0){
                                self.tagData = data.data;
                                self.tagDataList = [];
                                self.tagDataMenu = [];
                                for(let i = 0 ;i<self.tagData.length;i++){
                                    self.tagDataList.push(self.tagData[i].id);
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
                                for(let a = 0;a<data.data.length;a++){
                                    if(self.tagsArr.indexOf(data.data[a].id)!=(-1)){
                                        self.tags.push({ name: data.data[a].name, id: data.data[a].id });

                        //                                    console.log(self.tags)
                                    }else{
                                        return;
                                    }
                                }
                            })
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
                    addCircle(){
                        var self = this;
                        if(this.name == ""){
                            alert("输入圈子名称");
                            return;
                        }else if(this.sort == ""){
                            alert("输入排序");
                            return;
                        }else if(this.circleTypeId == ""){
                            alert("选择圈子类型");
                            return;
                        }

                            this.tagsArr = [];
                            for(let i = 0 ;i <this.tags.length; i++){
                                this.tagsArr.push(this.tags[i].id);
                            }

                        if(this.isedits()){
                            var info = {"id":this.$route.query.id,"name":this.name,"description":this.description,"status":this.isUse,"sort":this.sort,"is_recommend":this.is_recommend,"img":this.coverImg,"type":this.circleTypeId,"tag_ids":this.tagsArr}
                            this.common.putEventToken(this.api.host+this.api.category+"/"+this.$route.query.id,info,this.userinfo,function(data){
                                self.$router.push("/circleList");
                            })
                        }else{
                            var info = {"name":this.name,"description":this.description,"status":this.isUse,"sort":this.sort,"is_recommend":this.is_recommend,"img":this.coverImg,"type":this.circleTypeId,"tag_ids":this.tagsArr}
                            this.common.postEventToken(this.api.host+this.api.category,info,this.userinfo,function(data){
                                self.$router.push("/circleList");
                            })
                        }

                    },
                    isedits(){
                        if(this.$route.name == "editGame"){
                            return true;
                        }else{
                            return false;
                        }
                    },
                    uploadImg(){
                        document.getElementById('file-selector').click();
                    },
                    changeEvent(id,name){
                        this.circleTypeId = id;
                        this.circleTypeIdSelect = name;
                        this.saveCircleTypeIdSelect = name;
                        this.displayChange(false);
                    },
                    blurEvent(){
                        this.circleTypeIdSelect = this.saveCircleTypeIdSelect;
                    },
                    searchEvent(){
                        this.circleType(this.circleTypeIdSelect);
                    },
                    displayChange(boolean){
                        this.mIsShow = boolean;
                    },
                },
                watch:{
//                    circleData(){
//                        this.urlEvent();
//                    }
                },
                mounted:function(){
                    var self = this;
                    this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
                    this.getUpLoadKey();
                    this.circleType("");
            this.urlEvent();
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
        .input_type{
            width: 200px;
        }
        .textarea_type{
            width: 500px;
        }
        .title_main{
            padding:20px 0;
            border-bottom: 1px solid #999;
            }
        .view_main{
            margin-top:10px;
            overflow:hidden;
            }
        .view_main2{
            margin-top: 10px;
            overflow:inherit;
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
            .game_info{
                overflow:hidden;
                background:#efefef;
                padding:10px 0;
            }
        .game_info li{
                float:left;
                width:150px;
            height:150px;
                text-align:center;
            background:#666666;
            color:#fff;
            margin-left:20px;
            }
            .padd_type{
            padding-top:30px;
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