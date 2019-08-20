<template>
    <div id="addCourseware" @click="displayChange(false)">
        <p class="title_main">课件编辑</p>
        <div class="view_main view_main2">
            <span>课件名称</span>
            <el-input v-model="coursewarename" class="input_type" />
            <!--<span>所属课程</span>
            <el-select v-model="majorValue" filterable placeholder="请选择">
                <el-option
                v-for="item in majorData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
        </el-select>-->

            <span>所属课程</span>
            <div class="select-main"  @click.stop>
                <el-input v-model="majorValueSelect" placeholder="请选择" @focus="displayChange(true)" @blur="blurEvent"  @keyup.native="searchEvent" class="input_type" />
                <ul class="select-menu self-select-menu" v-show="mIsShow" >
                    <li v-for="item in majorData" class="major_li"  @click="changeEvent(item.id,item.name)">
                        <p class="major_name" v-text="item.name"></p>
                        <span v-if="item.type == 1">专业课</span>
                        <span v-else-if="item.type == 0">公开课</span>
                        <span v-else>未定义</span>
                    </li>
                </ul>
            </div>

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
            <span>简介</span>
            <el-input
            class="textarea_type"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="descText">
            </el-input><span>最多300字</span>
        </div>
        <div class="view_main">
            <span>排序</span>
            <el-input v-model="order" class="input_type" />
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
        <div class="view_main">
            <span>课件类型:</span>
            <el-select v-model="courType" placeholder="选择类型">
                <el-option
                        v-for="item in courTypeMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
            <div v-for="(data,index) in pptUrl">
                <el-input v-model = "pptUrl[index]" class="input_type" />
                <el-button @click="deleteEvent(index)">删除</el-button>
            </div>
            <el-button @click="uploadFile">上传课件</el-button>
             <input id="file-selectorH5" type="file" accept="*/*" multiple="" webkitdirectory="">
             <!--<input id="file-selectorvideo" multiple="multiple" accept="*.3gpp  audio/3gpp， video/3gpp  3GPP Audio/Video">-->
             <input id="file-selectorvideo" type="file" accept="*.3gpp  audio/3gpp， video/3gpp  3GPP Audio/Video">
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
                    order:"",
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
                    courTypeMenu:[
                        {
                            value: 1,
                            label: '视频'
                        },
                        {
                            value: 2,
                            label: 'H5'
                        }
                    ],
                    courType:1,
                    majorValue:"",
                    majorData: [],
                    SecretId:"",
                    SecretKey:"",
                    XCosSecurityToken:"",
                    expiredTime:"",
                    pptUrl:[],
                  //  major:{majorNameId:"",majorName:""},
            descText:"",

            majorValueSelect:"",
            saveMajorValueSelect:"",
            mIsShow:false
                }
            },
            methods:{
                urlEvent(){
                    console.log(this.$route.name);
                    var self = this;
                    if(this.isedits()){
                        this.common.getEventToken(this.api.host+this.api.lesson+"/"+this.$route.query.id,{},this.userinfo,function(data){
                            console.log(data);
                            self.coursewarename = data.name;
                            self.descText = data.desc;
                            self.isUse = data.status;
                            self.order = data.order;
                            if(data.url == null || data.url == 'null'){
                                self.pptUrl = [];
                            }else{
                                self.pptUrl = data.url;
                            }
                            self.preposition = data.preposition;
                          //  self.majorValue = data.course_name;
                            self.majorValueSelect = data.course_name;
                            self.saveMajorValueSelect = data.course_name;
                            self.courType = data.resource_type;
                        //    self.getMajorId(self.majorValue)
//                            for(var i = 0 ;i < self.majorData.length; i++){
//                                if(data.course_name == self.majorData[i].id){
//                                    self.majorValue = self.majorData[i].name;
//                                    self.major.majorNameId = self.majorData[i].id;
//                                    self.major.majorName = self.majorData[i].name;
//                                }
//                            }
                        });
                    }
                },

                getMajorId(id){
                    var self = this;
                    this.common.getEventToken(this.api.host+this.api.course+"/"+id,{},this.userinfo,function(data){
                        self.majorValueSelect = data.name;
                        self.saveMajorValueSelect = data.name;
                    });
                },
                addEvent(){
                    var self = this;
                    if(this.coursewarename == ""){
                        alert("输入课件名称");
                        return;
                    }else if(this.majorValueSelect == ""){
                        alert("请选择专业");
                        return;
                    }else if(this.order == ""){
                        alert("输入顺序");
                        return ;
                    }else if(this.resource_type == ""){
                        alert("选择课件类型");
                    }

                    if(this.pptUrl != null || this.pptUrl != "null"){
                        if(this.pptUrl.length == 0) {
                            alert("选择课件");
                            return;
                        }
                    }else{
                        alert("选择课件");
                        return;
                    }
                    if(this.isedits()){
                        var info = {"resource_type":this.courType,"name":this.coursewarename, "order":this.order, "status":this.isUse,"preposition":this.preposition,"url":this.pptUrl, "course_name":this.majorValueSelect,desc:this.descText};
//                        if(self.majorValue == this.major.majorName){
//                            info.profession_id=this.major.majorNameId;
//                        }
                        this.common.putEventToken(this.api.host+this.api.lesson+"/"+this.$route.query.id,info,this.userinfo,function(data){
                            console.log(data);
                            self.$router.push("/coursewareList")
                        });
                    }else{
                        var info = {"resource_type":this.courType,"name":this.coursewarename, "order":this.order, "status":this.isUse,"preposition":this.preposition,"url":this.pptUrl, "course_name":this.majorValueSelect,desc:this.descText};
                        this.common.postEventToken(this.api.host+this.api.lesson,info,this.userinfo,function(data){
                            console.log(data);
                            self.$router.push("/coursewareList")
                        });
                    }

                },
//                getProfession(){
//                    var self = this;
//                    this.common.getEventToken(this.api.host+this.api.course,{},this.userinfo,function(data){
//                        self.professionOptions = data;
//                    });
//                },
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
                    professionList(name){
                         var self = this;
                         this.common.getEventToken(this.api.host+this.api.course+"?name="+name+"&per_page=100",{},this.userinfo,function(data){
                            console.log(data);
                            self.majorData = data.data;

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
                    },
                    uploadFile(){
                        if(this.courType == 1){
                            this.pptUrl = [];
                            document.getElementById('file-selectorvideo').click();
                        }else if(this.courType == 2){
                            this.pptUrl = [];
                            document.getElementById('file-selectorH5').click();
                        }
                    },
                resetPath(){

                },

                    changeEvent(id,name){
                        this.majorValue = id;
                        this.majorValueSelect = name;
                        this.saveMajorValueSelect = name;
                        this.displayChange(false);
                    },
                    blurEvent(){
                        this.majorValueSelect = this.saveMajorValueSelect;
                    },
                    searchEvent(){
                        this.professionList(this.majorValueSelect);
                    },
                    displayChange(boolean){
                        this.mIsShow = boolean;
                    },
            },
            watch:{
                majorData(){

                },
                descText(){
                    if(this.descText.length>300){
                        this.descText = this.descText.slice(0,299);
                    }
                }
            },
            mounted:function(){
                var self = this;
                this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
                this.getUpLoadKey();
                this.professionList("");
            this.urlEvent();


                document.getElementById('file-selectorvideo').onchange = function () {
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
                document.getElementById('file-selectorH5').onchange = function () {
                    var file = this.files;
                    console.log(self.value);
                    console.log(this.files);
//                    if(self.value != ""){
//                        var path = "test/";
//
//                    }else{
//                        alert("选择专业");
//                        return ;
//                    }
                    var path = "test/";
                    var fileurl = "courseware/"+path;
                    //   this.cpath = "https://suishi-1256985330.cos.ap-guangzhou.myqcloud.com/courseware/"+ path + ""
                    if (!file) return;
                    //                console.log(file.name);
                    //                console.log(file)
                    if(self.SecretId != "" && self.SecretKey !="" ){
                        if(file){
                            var lens = this.files.length;
                            for(let i =0 ;i<lens;i++){
                                self.cosjsFile2(self.SecretId,self.SecretKey,fileurl,file[i],self.XCosSecurityToken,self.expiredTime,function(url,err){
                                    // self.coverImg = img;
                                    if(err){
                                        alert(url+"上传失败")
                                    }else {
                                        if (url.indexOf("index.html") != (-1)) {
                                            self.pptUrl.push("https://suishi-1256985330.cos.ap-guangzhou.myqcloud.com/" + url);
                                        }
                                    }
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

        .textarea_type{
            width: 500px;
            }
        .select-menu li.major_li{
            padding-left: 10px;
        }
        .major_name{
            width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        </style>