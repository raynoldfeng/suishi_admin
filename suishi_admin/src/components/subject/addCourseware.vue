<template>
    <div id="addCourseware">
        <p class="title_main">课件编辑</p>
        <div class="view_main">
            <span>课件名称</span>
            <el-input v-model="coursewarename" class="input_type" />
            <span>所属专业</span>
            <el-select v-model="majorValue" placeholder="请选择">
                <el-option
                v-for="item in majorData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
        </el-select>

        <span>是否禁用</span>
        <el-select v-model="isUse" placeholder="请选择">
            <el-option
               v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        </div>
        <div class="view_main">
            <span>排序</span>
            <el-input v-model="sort" class="input_type" />
            <span>关联前置</span>
            <el-select v-model="preposition" placeholder="请选择">
                <el-option
                v-for="item in prepositionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="view_main">
            <span>课题内容</span>
            <div v-for="(data,index) in pptUrl">
                <el-input v-model = "pptUrl[index]" class="input_type" />
                <el-button @click="deleteEvent(index)">删除</el-button>
            </div>

            <input id="file-selector" multiple="multiple" type="file">
        </div>
        <div class="view_main">
            <el-button @click="addEvent">提交</el-button>
        </div>
    </div>
</template>
        <script>
        export default {
            data(){
                return{
                    userinfo:"",
                    coursewarename:"",
                    sort:"",
                    statusOptions: [{
                        value: '1',
                        label: '是'
                    }, {
                        value: '0',
                        label: '否'
                    }],
                    isUse:"0",
                    prepositionOptions: [{
                        value: '1',
                        label: '是'
                    }, {
                        value: '0',
                        label: '否'
                    }],
                    preposition:"0",
                    majorValue:"",
                    majorData: [],
                    SecretId:"",
                    SecretKey:"",
                    XCosSecurityToken:"",
                    expiredTime:"",
                    pptUrl:[],
                    major:{majorNameId:"",majorName:""}
                }
            },
            methods:{
                urlEvent(){
                    console.log(this.$route.name);
                    var self = this;
                    if(this.isedits()){
                        this.common.getEventToken(this.api.host+this.api.course+"/"+this.$route.query.id,{},this.userinfo,function(data){
                            console.log(data);
                            self.coursewarename = data.name;

                            self.isUse = data.status;
                            self.sort = data.sort;
                            self.pptUrl = data.url;
                            self.preposition = data.preposition;
                            for(var i = 0 ;i < self.majorData.length; i++){
                                if(data.profession_id == self.majorData[i].id){
                                    self.majorValue = self.majorData[i].name;
                                    self.major.majorNameId = self.majorData[i].id;
                                    self.major.majorName = self.majorData[i].name;
                                }
                            }
                        });
                    }else{

                    }
                },
                addEvent(){
                    var self = this;
                    if(this.coursewarename == ""){
                        alert("输入课件名称");
                        return;
                    }else if(this.majorValue == ""){
                        alert("请选择专业");
                        return;
                    }else if(this.sort == ""){
                        alert("输入顺序");
                        return ;
                    }else if(this.url == ""){
                        alert("选择课件");
                        return;
                    }
                    if(this.isedits()){
                        var info = {"name":this.coursewarename, "sort":this.sort, "status":this.isUse,"preposition":this.preposition,"url":this.pptUrl, "profession_id":this.majorValue,id:this.$route.query.id};
                        if(self.majorValue == this.major.majorName){
                            info.profession_id=this.major.majorNameId;
                        }
                        this.common.putEventToken(this.api.host+this.api.course,info,this.userinfo,function(data){
                            console.log(data);
                            self.$router.push("/coursewareList")
                        });
                    }else{
                        var info = {"name":this.coursewarename, "sort":this.sort, "status":this.isUse,"preposition":this.preposition,"url":this.pptUrl, "profession_id":this.majorValue};
                        this.common.postEventToken(this.api.host+this.api.course,info,this.userinfo,function(data){
                            console.log(data);
                            self.$router.push("/coursewareList")
                        });
                    }

                },
                getProfession(){
                    var self = this;
                    this.common.getEventToken(this.api.host+this.api.profession,{},this.userinfo,function(data){
                        self.professionOptions = data;
                    });
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
                    professionList(){
                         var self = this;
                         this.common.getEventToken(this.api.host+this.api.profession,{},this.userinfo,function(data){
                            console.log(data);
                            self.majorData = data;

                        })
                    },
                    deleteEvent(index){
                        this.pptUrl.splice(index,1);
                    },
                    isedits(){
                        if(this.$route.name == "editCourseware"){
                            return true;
                        }else{
                            return false;
                        }
                    }
            },
            watch:{
                majorData(){
                    this.urlEvent();
                }
            },
            mounted:function(){
                var self = this;
                this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
                this.getUpLoadKey();
                this.professionList();


                document.getElementById('file-selector').onchange = function () {
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
                                    self.pptUrl.push(url);
                                });
                            }
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
        #addCourseware{
            text-align: left;
        }
            .input_type{
                width: 200px;
            }
        .view_main{
            margin-top:10px
            }
        </style>