<template>
    <div id="majorList">
        <p class="title_main">专业列表</p>
        <div class="view_main">
            <span>是否启用</span>
            <el-select v-model="isUse" placeholder="是否使用">
                <el-option
                        v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
            </el-select>
            <el-input
            placeholder="输入关键字"
            class="search_input"
            >
            </el-input>
            <el-button>搜索</el-button>
            <el-button>还原</el-button>
        </div>
        <div  class="view_main">
            <el-button @click="addEvent">新增</el-button>
        </div>
        <div class="view_main">
            <template>
                <el-table
                :data="tableData"
                border
                style="width: 100%">
                    <el-table-column
                    fixed
                    prop="id"
                    label="ID"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="专业名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="city"
                    label="创建时间"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="是否启用"
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>

        </div>

    </div>
</template>
        <script>
            export default{
                data(){
                    return{
                        isUseMenu: [
                            {value: "true",
                                label: "是"},
                            {value: "false",
                                label: "否"}
                        ],
                        isUse: "false",
                        tableData: [{
                            id: '2016-05-03',
                            name: '王小虎',
                            province: '上海',
                            city: '普陀区',
                            address: '上海市普陀区金沙江路 1518 弄',
                            zip: 200333
                        }]
                    }
                },
                methods: {
                    addEvent(){
                        this.$router.push("/addMajor");
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
            margin-top:10px
            }
            .input_type{
                width: 200px;
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
        .search_input{
            width: 300px;
            }
        </style>