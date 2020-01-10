<template>
    <div id="addTest" @click="displayChange(false)">
        <p class="title_main">测试详情</p>
        <div class="view_main2">
           <!-- <span>所属专业</span>
            <el-select v-model="majorValue" placeholder="所属专业">
                <el-option
                v-for="item in majorData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>-->
            <!--<span>所属课件</span>
            <el-select v-model="coursewareName"   filterable  placeholder="所属课件">
                <el-option
                v-for="item in coursewareData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>-->
            <span>所属课件</span>
            <div class="select-main"  @click.stop>
                <el-input v-model="coursewaresSelect" placeholder="所属课件" @focus="displayChange(true)" @blur="blurEvent"  @keyup.native="searchEvent" class="input_type" />
                <ul class="select-menu" v-show="mIsShow" >
                    <li v-for="item in coursewareData" v-text="item.name" @click="changeEvent(item.id,item.name)"></li>
                </ul>
            </div>
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
        <div class="view_main">
            <span>测试问题</span>
            <el-input
            class="textarea_type"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="输入问题"
            v-model="testName">
            </el-input><span>最多300字</span>
        </div>
        <div class="view_main">
               <div>
                   <span>图片</span>
                   <input id="img-selector" type="file" accept = "image/*">
                       <el-button size="small" type="primary" @click="uploadEvent('img')">点击上传</el-button>
                       <p v-text="imgUrl"></p>
               </div>
           </div>
            <div class="view_main">
            <div>
                <span>视频</span>
                <input id="video-selector" type="file" accept = "video/*">
                    <el-button size="small" type="primary" @click="uploadEvent('video')">点击上传</el-button>
                    <p v-text="videoUrl"></p>
                </div>

        </div>
        <div  class="view_main">
            <el-button @click="addAnswer">新增选项</el-button>
            <ul class="answerMenus">
                <li v-for="(data,index) in answerMenu" >
                    <span>选项{{index+1}}</span>
                    <el-input class="input_type" v-model="answerMenu[index]"></el-input>
                    <i @click="closeAnswer(index)" class="el-icon-error"></i>
                </li>
            </ul>

        </div>
        <div  class="view_main">
            <span>正确选项</span>
            <el-select v-model="answer" placeholder="正确选项">
                <el-option
                v-for="item in answerOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div  class="view_main">
            <span>答案注释</span>
            <el-input class="input_type" v-model="note"></el-input>
            <span>选填</span>
        </div>
        <div  class="view_main">
            <el-button @click="addTestEvent">提交</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                isUseMenu: [
                    {value: "1",
                        label: "是"},
                    {value: "0",
                        label: "否"}
                ],
                isUse: "0",
                userinfo:"",
                fileList: [],
                majorData:[],
                majorValue:"",
                testName:"",
                imgUrl:"",
                videoUrl:"",
                status:"",
                note:"",
                courseid:"",
                answerMenu:[""],
                answerOptions:[{value:0}],
                answer:"",
    SecretId:"",
    SecretKey:"",
    XCosSecurityToken:"",
    expiredTime:"",
    coursewareData: [],
    coursewareName:"",
//    coursewares:{coursewareNameId:"",coursewareName:""},
    coursewaresSelect:"",
    saveCoursewaresSelect:"",
    mIsShow:false
            }
        },
        methods:{
            urlEvent(){
                console.log(this.$route.name);
                var self = this;
                if(self.isedits()){
                    this.common.getEventToken(this.api.host+this.api.test+"/"+this.$route.query.id,{},this.userinfo,function(data){
                    console.log(data);
                    self.testName = data.name;
                    self.isUse = data.status;
                    self.note = data.note;
                    self.vedioUrl = data.video_url;
                    self.imgUrl = data.img_url;
                    if(data.options == null){
                        self.answerMenu = [""];
                        self.answer = "";
                    }else{
                        self.answerMenu = data.options;
                        self.answerOptions = [];
                        for(let i = 0; i < self.answerMenu.length;i++){
                        self.answerOptions.push({value:i});
                        self.answer = data.answer;
                        }
                    }



                    self.coursewareName = data.course_id;
                    self.getCourseId(data.course_id);
//                        for(var i = 0 ;i < self.coursewareData.length; i++){
//                            if(data.course_id == self.coursewareData[i].id){
//                                 self.coursewareName = self.coursewareData[i].id;
//                                 self.coursewaresSelect = self.coursewareData[i].name
////                                 self.coursewares.coursewareName = self.coursewareData[i].name;
////                                 self.coursewares.coursewareNameId = data.course_id;
//                            }
//                        }
                    });
                }
            },
           getCourseId(id){
                var self = this;
                this.common.getEventToken(this.api.host+this.api.lesson+"/"+id,{},this.userinfo,function(data){
                    self.coursewaresSelect = data.name;
                    self.saveCoursewaresSelect = data.name;
                });
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            addTestEvent(){
                var self = this;
                if(this.coursewareName == ""){
                    alert("请选择所属课件！")
                    return false;
                }
                if(this.testName == ""){
                    alert("请输入测试问题！");
                    return false
                }

                if(this.answerMenu.length > 0 && this.answer == ""){
                    alert("请选择正确选项！")
                    return false;
                }
                if(this.isedits()){
                    var info = {"name":this.testName,"img_url":this.imgUrl,"video_url":this.videoUrl,"status":this.isUse,"note":this.note,"options":this.answerMenu,"answer":this.answer,"course_id":this.coursewareName,id:this.$route.query.id};
//                    if(self.coursewareName == this.coursewares.coursewareName){
//                         info.course_id=this.coursewares.coursewareNameId;
//                    }
                    this.common.putEventToken(this.api.host+this.api.test+"/"+this.$route.query.id,info,this.userinfo,function(data){
                        console.log(data);
                        self.$router.push("/testList");
                    })
                }else{
                    var info = {"name":this.testName,"img_url":this.imgUrl,"video_url":this.videoUrl,"status":this.isUse,"note":this.note,"options":this.answerMenu,"answer":this.answer,"course_id":this.coursewareName};
                    this.common.postEventToken(this.api.host+this.api.test,info,this.userinfo,function(data){
                        console.log(data);
                        self.$router.push("/testList");
                    })
                }

            },
        changeEvent(id,name){
            this.coursewareName = id;
            this.coursewaresSelect = name;
            this.saveCoursewaresSelect = name;
            this.displayChange(false);
        },
        blurEvent(){
            this.coursewaresSelect = this.saveCoursewaresSelect;
        },
        searchEvent(){
            this.courseList(this.coursewaresSelect);
        },
        displayChange(boolean){
            this.mIsShow = boolean;
        },
            addAnswer(){
                this.answerOptions = [];
                this.answerMenu.push("");
                for(let i = 0; i<this.answerMenu.length;i++){
                    this.answerOptions.push({value:(i)});
                }

            },
            closeAnswer(index){
                this.answerMenu.splice(index,1);
                this.answerOptions = [];
                for(let i = 0; i<this.answerMenu.length;i++){
                    this.answerOptions.push({value:(i)});
                }
            },
            professionList(){
                var self = this;
                this.common.getEventToken(this.api.host+this.api.course,{},this.userinfo,function(data){
                    console.log(data);
                    self.majorData = data;

                })
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
            courseList(name){
                var self = this;
                this.common.getEventToken(this.api.host+this.api.lesson+"?name="+name,{},this.userinfo,function(data){
                    self.coursewareData = data.data;
                    console.log(data)
                });
            },
            isedits(){
                if(this.$route.name == "editTest"){
                    return true;
                }else{
                    return false;
                }
            },
            uploadEvent(type){
                if(type == 'img'){
                    document.getElementById('img-selector').click();
                }else if(type =='video'){
                    document.getElementById('video-selector').click();
                }

            }
        },
        watch:{
            testName(){
                if(this.testName.length>300){
                    this.testName = this.testName.slice(0,299);
                }
            }
        },
        mounted:function(){
            var self = this;
            this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
            this.urlEvent();
            this.professionList();
            this.courseList();
            this.getUpLoadKey();
                document.getElementById('video-selector').onchange = function () {
                var file = this.files[0];
                if (!file) return;
            //                console.log(file.name);
            //                console.log(file)
                if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                        self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(video){
                            self.videoUrl = video;
                        });
                    }
                }

                };
                document.getElementById('img-selector').onchange = function () {
                    var file = this.files[0];
                    if (!file) return;
                    //                console.log(file.name);
                    //                console.log(file)
                    if(self.SecretId != "" && self.SecretKey !="" ){
                    if(file){
                    self.cosjs(self.SecretId,self.SecretKey,file,self.XCosSecurityToken,self.expiredTime,function(img){
                    self.imgUrl = img;
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


.input_test{
    width: 500px;
    }
.input_type{
    width: 200px;
    }
    .answerMenus li{
        padding-top:10px;
    }
    .select-main{
        width: 200px;
    display:inline-block;
        position: relative;
    }
    .select-menu{
        width:198px;
        position: absolute;
        top: 45px;
        background:#fff;
        z-index:100;
        border: 1px solid #E4E7ED;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .select-menu li{
        height:40px;
        line-height:40px;
        padding-left:20px;
        cursor: pointer;
        color:#606266;
        font-size: 14px;
    }
.select-menu li:hover{
    background:#f5f7fa
    }
</style>