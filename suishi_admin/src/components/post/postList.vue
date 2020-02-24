<template>
    <div id="postList">
        <p class="title_main">帖子列表</p>
        <div class="view_main">
         <!--   <el-select v-model="typeValue1" placeholder="是否推荐">
                <el-option
                v-for="item in optionsType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="isUse" placeholder="是否禁用">
                <el-option
                v-for="item in isUseMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="dateVaule" placeholder="时间范围">
                <el-option
                v-for="item in dateMenu"
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
            <el-button>还原</el-button>-->
        </div>
        <div class="view_main">
            <!--<el-button @click="addEvent">发布</el-button>-->
            <!--<ul class="sort_type">
                <li>按发布时间排序</li>
                <li>按评论数排序</li>
                <li>按点赞数排序</li>
            </ul>-->
        </div>
        <div class="view_main">
            <template>
                <el-table
                :data="postList"
                border
                style="width: 100%">
                    <el-table-column
                    fixed
                    prop="id"
                    label="ID"
                    >
                    </el-table-column>
              <!--      <el-table-column
                    prop="accountNick"
                    label="发布用户"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="category"
                    label="所属圈子"
                    >
                    </el-table-column>-->
                    <el-table-column
                    prop="content"
                    label="内容"
                    >
                        <template slot-scope="scope">
                            <p v-text="ellipsisEvent(scope.row.content)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="是否有图"
                    >
                        <template slot-scope="scope">
                            <p v-if="scope.row.imgs">有</p>
                            <p v-else>无</p>
                          <!--  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">删除</el-button>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="like"
                    label="点赞数"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="reply"
                    label="评论数"
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button @click="seeEvent(scope.row.id)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small" @click="deleteEvent(scope.row.id)">删除</el-button>
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
    </div>
</template>
<script>
    export default{
        data(){
            return{
                optionsType: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    },
                    {
                        value: '选项2',
                        label: '双皮奶'
                    },
                    {
                        value: '选项3',
                        label: '蚵仔煎'
                    },
                    {
                        value: '选项4',
                        label: '龙须面'
                    },
                    {
                        value: '选项5',
                        label: '北京烤鸭'
                    }
                ],
                typeValue1: '',
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
                }],
                dateMenu:[
                    {value: "1",
                        label: "一天"},
                    {value: "7",
                        label: "一周"},
                    {value: "30",
                        label: "一个月"},
                    {value: "90",
                        label: "半年"}
                ],
                dateVaule:'',
                userinfo:"",
                postList:[],
                nowPage:1,
                allPage:0
            }
    },
    methods:{
        ellipsisEvent(text){
            console.log(11111111);
            console.log(this.common.ellipsisEvent(text))
            return this.common.ellipsisEvent(text);
        },
        addEvent(){
            this.$router.push("/addPost");
        },
        postDatas(){
            var self = this;
            this.common.getEventToken(this.api.host+this.api.postList+"?page="+this.nowPage+"&per_page=10",{},this.userinfo,function(data){
                console.log(data);
                self.postList = data.data;
                self.allPage = data.last_page * 10;
            })
        },
        seeEvent(id){
            this.$router.push({path:"/editPost",query:{id:id}});
        },
        deleteEvent(id){
            var self = this;
//            this.$confirm('确定要删除此帖子吗?', '提示', {
//                confirmButtonText: '确定',
//                cancelButtonText: '取消',
//                type: 'warning'
//            }).then(() => {
//            this.common.deleteEventToken(this.api.host+this.api.postList+'/'+id,{},this.userinfo,function(data){
//                console.log(data);
//                self.$message({
//                    type: 'success',
//                    message: '删除成功!'
//                    });
//                    self.postDatas();
//                })
//            }).catch(() => {
//                this.$message({
//                    type: 'info',
//                    message: '已取消删除'
//                });
//        });
            this.common.commonDeleteEvent(this,this.userinfo,this.api.postList,id,function(){
                self.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                self.postDatas();
            })
    }
    },
    watch:{
        nowPage(){
            this.postDatas();
        }
    },
    mounted:function(){
        this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
        this.postDatas();
    }
    }
</script>
<style>
.view_main{
    overflow:hidden;
    margin-top:10px
    }
.search_input{
    width: 300px;
    }
    .sort_type{
    float:right;
    overflow:hidden;
    }
    .sort_type li{
        display:inline-block;
        margin-left:10px;

    }
    .page_main{
        text-align:center;
    }
</style>