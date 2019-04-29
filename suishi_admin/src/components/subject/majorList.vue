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
                :data="majorData"
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
                    prop="status"
                    label="是否启用"
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button @click="editEvent(scope.row.id)" type="text" size="small">查看</el-button>
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
                        majorData: [],
                        userinfo:""
                    }
                },
                methods: {
                    addEvent(){
                        this.$router.push("/addMajor");
                    },
                    professionList(){
                        var self = this;
                        this.common.getEventToken(this.api.host+this.api.profession,{},this.userinfo,function(data){
                            console.log(data);
                            self.majorData = data;
                        })
                    },
                    editEvent(id){
                        console.log(id)
                        this.$router.push({path: "/editMajor", query: {id: id}});
                      //  this.$router.push("/editMajor",{params:id});
                    }
                },
                mounted:function(){
                    this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
                    this.professionList();
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