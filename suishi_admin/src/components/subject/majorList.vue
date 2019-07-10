<template>
    <div id="majorList">
        <p class="title_main">专业列表</p>
        <div class="view_main">
            <span>是否禁用</span>
            <el-select v-model="isUse" placeholder="是否禁用">
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
            <el-button @click="addEvent" type="primary">新增</el-button>
        </div>
        <div class="view_main">
        <el-tabs v-model="majorType" type="card" >
            <el-tab-pane label="公开课" name="first">
                <div class="view_main">
                    <template>
                        <el-table
                        :data="openMajorData"
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
                                label="是否禁用"
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
<div class="view_main page_main">
<el-pagination
        background
        layout="prev, pager, next"
:current-page.sync="opennowPage"
:total="openAllPage">
</el-pagination>
        </div>
        </el-tab-pane>
<el-tab-pane label="专业课" name="second">
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
                            label="是否禁用"
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
            <div class="view_main page_main">
            <el-pagination
                    background
                    layout="prev, pager, next"
            :current-page.sync="nowPage"
            :total="allPage">
            </el-pagination>
                    </div>
                    </el-tab-pane>
                    </el-tabs>
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
                        openMajorData: [],
                        userinfo:"",
                        nowPage:1,
                        opennowPage:1,
                        allPage:0,
                        openNowPage:1,
                        openAllPage:0,
                        majorType: 'first'
                    }
                },
                methods: {
                    addEvent(){
                        this.$router.push("/addMajor");
                    },
                    professionList(){
                        var self = this;
                        this.common.getEventToken(this.api.host+this.api.course+"?page="+this.nowPage+"&per_page=10&type="+1,{},this.userinfo,function(data){
                                self.majorData = data.data;
                                self.allPage = data.last_page * 10;
                        })
                    },
                    openprofessionList(){
                        var self = this;
                        this.common.getEventToken(this.api.host+this.api.course+"?page="+this.opennowPage+"&per_page=10&type="+0,{},this.userinfo,function(data){
                            console.log(data);
                                self.openMajorData = data.data;
                                self.openAllPage = data.last_page * 10;

                        })
                    },
                    editEvent(id){
                        console.log(id)
                        this.$router.push({path: "/editMajor", query: {id: id}});
                      //  this.$router.push("/editMajor",{params:id});
                    }
                },
                watch:{
                    nowPage(){
                        this.professionList();
                    },
                    opennowPage(){
                        this.openprofessionList();
                    }
                },
                mounted:function(){
                    this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
                    this.professionList();
                    this.openprofessionList();
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