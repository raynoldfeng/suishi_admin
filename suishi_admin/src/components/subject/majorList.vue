<template>
    <div id="majorList">
        <p class="title_main">课程列表</p>
        <div class="view_main">
            <span>是否禁用</span>
            <el-select v-model="isUse" placeholder="是否禁用" @change="professionList(1)">
                <el-option
                        v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
            </el-select>
            <el-input
            placeholder="输入专业名称"
            class="search_input"
            v-model="majorName"
            >
            </el-input>
            <el-button @click="professionList(1)">搜索</el-button>
        </div>
        <div  class="view_main">
            <el-button @click="addEvent" type="primary">新增课件</el-button>
        </div>
        <div class="view_main">
        <el-tabs v-model="majorType" type="card" @tab-click="handleClick">
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
                                    prop="name"
                                    label="封面图"
                                    >
                             <template slot-scope="scope">
                                 <img class="major_img" :src="scope.row.cover">
                             </template>
                         </el-table-column>
                        <el-table-column
                                label="是否免费"
                                >
                            <template slot-scope="scope">
                                <span v-if="scope.row.is_free == '1'">
                                    付费
                                </span>
                                <span v-else>
                                    免费
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="price"
                                label="价格"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="discount_price"
                                label="折后价"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="是否禁用"
                                >
                            <template slot-scope="scope">
                                <span v-if="scope.row.status == 0">否</span>
                                <span v-else>是</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                >
                        <template slot-scope="scope">
                            <el-button @click="editEvent(scope.row.id)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small" @click="deleteEvent(scope.row.id,'0')">删除</el-button>
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
                            label="是否免费"
                            >
                        <template slot-scope="scope">
                                <span v-if="scope.row.is_free == '1'">
                                    付费
                                </span>
                                <span v-else>
                                    免费
                                </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="价格"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="discount_price"
                            label="折后价"
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
                    <el-button type="text" size="small" @click="deleteEvent(scope.row.id,'1')">删除</el-button>
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
                            {value: "1",
                                label: "是"},
                            {value: "0",
                                label: "否"},
                            {value:"-1",
                            label:"全部"}
                        ],
                        isUse: "-1",
                        majorData: [],
                        openMajorData: [],
                        userinfo:"",
                        nowPage:1,
                        opennowPage:1,
                        allPage:0,
                        openNowPage:1,
                        openAllPage:0,
                        majorType: 'first',
                        majorName:"",
                        majorTypeNum:0
                    }
                },
                methods: {
                    handleClick(tab, event) {
                       this.majorTypeNum = tab.index;
                        this.majorName = "";
                        this.isUse = "-1";
                        this.professionList();
                    },
                    addEvent(){
                        this.$router.push("/addMajor");
                    },
                    professionList(type){
                        var self = this;

                            if(this.majorTypeNum == 1){
                                if(type == 1){
                                    this.nowPage = 1;
                                }
                                var url = this.api.host+this.api.course+"?page="+this.nowPage+"&per_page=10&type="+this.majorTypeNum;
                            }else{
                                if(type == 1){
                                    this.opennowPage = 1;
                                }
                                var url = this.api.host+this.api.course+"?page="+this.opennowPage+"&per_page=10&type="+this.majorTypeNum;
                            }



                        if(this.isUse != "-1"){
                            url+="&status="+this.isUse;
                        }

                        if(this.majorName){
                            url+="&name="+this.majorName;
                        }
                        this.common.getEventToken(url,{},this.userinfo,(data)=>{
                            if(this.majorTypeNum == 0){
                            this.openMajorData = data.data;
                            this.openAllPage = data.last_page * 10;
                        }else{
                            this.majorData = data.data;
                            this.allPage = data.last_page * 10;
                        }

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
                    deleteEvent(id,type){
                        var self = this;
                        if(type == '0'){
                            this.common.deleteEventToken(this.api.host+this.api.course+"/"+id,{},this.userinfo,(data)=>{

                                self.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                self.openprofessionList();
                            })
                        }else if(type == '1'){
                            this.common.deleteEventToken(this.api.host+this.api.course+"/"+id,{},this.userinfo,(data)=>{

                                self.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                self.professionList();
                            })
                        }

                    },
                    editEvent(id){
                        console.log(id)
                        this.$router.push({path: "/editMajor", query: {id: id}});
                      //  this.$router.push("/editMajor",{params:id});
                    },
//            searchEvent(){
//                            var url = this.api.host+this.api.course+"?name="+this.majorName+"&per_page=100&type="+this.majorTypeNum;
//                            if(this.isUse != "-1"){
//                                url = this.api.host+this.api.course+"?name="+this.majorName+"&per_page=100&type="+this.majorTypeNum+"&status="+this.isUse;
//                            }
//                            this.common.getEventToken(url,{},this.userinfo,(data)=>{
//                                if(this.majorTypeNum == 0){
//                                    this.openMajorData = data.data;
//                                    this.openAllPage = data.last_page * 10;
//                                }else{
//                                    this.majorData = data.data;
//                                    this.allPage = data.last_page * 10;
//                                }
//
//                            })
//                    }
                },
                watch:{
                    nowPage(){
                        this.professionList();
                    },
                    opennowPage(){
                        this.professionList();
                    }

                },
                mounted:function(){
                    this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
                    this.professionList();
//                    this.openprofessionList();
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
        .el-input.search_input{
            width: 300px;
            }
            .major_img{
                width: 50%;;
            }
        </style>