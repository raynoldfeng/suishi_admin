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

        <span>是否启用</span>
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
            <el-input class="input_type" />
            <el-button>上传</el-button>
            <el-button>删除</el-button>
            <input id="file-selector" type="file">
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
                    pptUrl:[]
                }
            },
            methods:{
                urlEvent(){
                    console.log(this.$route.name);
                    var self = this;
                    if(this.$route.name == "editCourseware"){
                        this.common.getEventToken(this.api.host+this.api.course+"/"+this.$route.query.id,{},this.userinfo,function(data){
            console.log(1212)
                            console.log(data);
                            self.coursewarename = data.name;
                            self.majorValue = data.profession_id;
                            self.isUse = data.status;
                            self.sort = data.sort;

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
                    var info = {"name":this.coursewarename, "sort":this.sort, "status":this.isUse,"preposition":this.preposition,"url":this.pptUrl, "profession_id":this.majorValue};
                    if(this.$route.name == "editCourseware"){

                    }else{
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
            },
            mounted:function(){
                var self = this;
                this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
                this.urlEvent();
                this.getUpLoadKey();
                this.professionList();

                document.getElementById('file-selector').onchange = function () {
                    var file = this.files[0];
                    if (!file) return;
//                console.log(file.name);
//                console.log(file)
                    if(self.SecretId != "" && self.SecretKey !="" ){
                        if(file){
                            self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(url){
                                self.pptUrl = [];
                                self.pptUrl.push(url);
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