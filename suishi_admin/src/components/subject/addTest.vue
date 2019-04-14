<template>
    <div id="addTest">
        <p class="title_main">新增帖子</p>
        <div class="view_main">
            <span>所属专业</span>
            <el-select v-model="isUse" placeholder="是否推荐">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <span>所属课件</span>
            <el-select v-model="isUse" placeholder="是否推荐">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
            <el-input class="input_test" placeholder="输入问题"></el-input>
        </div>
        <div class="view_main">
            <span>图片</span>
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
            <span>视频</span>
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
        <div  class="view_main">
            <ul>
                <li>
                    <span>选项</span>
                    <el-input class="input_type"></el-input>
                </li>
            </ul>
            <el-button>新增选项</el-button>
        </div>
        <div  class="view_main">
            <span>正确选项</span>
            <el-select v-model="isUse" placeholder="是否推荐">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div  class="view_main">
            <span>答案注释</span>
            <el-input class="input_type"></el-input>
            <span>选填</span>
        </div>
        <div  class="view_main">
            <el-button>提交</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                isUseMenu: [
                    {value: "true",
                        label: "是"},
                    {value: "false",
                        label: "否"}
                ],
                isUse: "false",
                fileList: []
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
        }
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
</style>