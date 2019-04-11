<template>
    <div id="addCourseware">
        <p class="title_main">课件编辑</p>
        <div class="view_main">
            <span>课件名称</span>
            <el-input v-model="coursewarename" class="input_type" />
            <span>所属专业</span>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>

        <span>是否启用</span>
        <el-select v-model="isdisable" placeholder="请选择">
            <el-option
               v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        </div>
        <div class="view_main">
            <span>排序</span>
            <el-input class="input_type" />
            <span>关联前置</span>
            <el-select v-model="kejianName" placeholder="请选择">
                <el-option
                v-for="item in kejianNameOptions"
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
        </div>
        <div class="view_main">
            <el-button>提交</el-button>
        </div>
    </div>
</template>
        <script>
        export default {
            data(){
                return{
                    coursewarename:"",
                    options: [{
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }],
                    value: '',
                    options: [{
                        value: 'true',
                        label: '是'
                    }, {
                        value: 'false',
                        label: '否'
                    }],
                    isdisable:"false",
                    kejianNameOptions: [{
                        value: 'true',
                        label: '是'
                    }, {
                        value: 'false',
                        label: '否'
                    }],
                    kejianName:"false"
                }
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