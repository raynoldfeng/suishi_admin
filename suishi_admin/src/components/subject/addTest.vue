<template>
    <div id="addTest">
        <p class="title_main">新增帖子</p>
        <div class="view_main">
           <!-- <span>所属专业</span>
            <el-select v-model="majorValue" placeholder="所属专业">
                <el-option
                v-for="item in majorData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>-->
            <span>所属课件</span>
            <el-select v-model="coursewareName" placeholder="所属课件">
                <el-option
                v-for="item in coursewareData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            <span>是否启用</span>
            <el-select v-model="isUse" placeholder="是否推荐">
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
            <el-input class="input_test" v-model="testName" placeholder="输入问题"></el-input>
        </div>
        <div class="view_main">
           <div> <span>图片</span>
            <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            </el-upload>
            <input id="file-selector" type="file"></div>
            <div><span>视频</span>
            <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            </el-upload>
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
    coursewareName:""
            }
        },
        methods:{
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
                var info = {"name":this.testName,"img_url":this.imgUrl,"video_url":this.videoUrl,"status":this.isUse,"note":this.note,"options":this.answerMenu,"answer":this.answer,"course_id":this.coursewareName};
                this.common.postEventToken(this.api.host+this.api.test,info,this.userinfo,function(data){
                    console.log(data);
                    self.$router.push("/testList");
                })
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
                this.common.getEventToken(this.api.host+this.api.profession,{},this.userinfo,function(data){
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
            courseList(){
                var self = this;
                this.common.getEventToken(this.api.host+this.api.course,{},this.userinfo,function(data){
                    self.coursewareData = data;
                    console.log(data)
                });
            }
        },
        mounted:function(){
            var self = this;
            this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
            this.professionList();
            this.courseList();
            this.getUpLoadKey();
                document.getElementById('file-selector').onchange = function () {
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
.view_main{
    overflow:hidden;
    margin-top:10px
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
</style>