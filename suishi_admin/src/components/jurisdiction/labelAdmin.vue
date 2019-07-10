<template>
    <div id="labelAdmin">
        <p class="title_main">标签管理</p>
        <div class="label_main view_main">
            <div class="parents_main">
                <div class="view_main marginleft_20">
                    <el-input
                    placeholder="输入名称"
                    class="name_input"
                    v-model="typeValue"
                    ></el-input>
                    <el-button @click="addType" type="primary">新建母标签</el-button>
                </div>
                <el-table class="table_main"
                    v-if="typeData.length > 0"
                :data="typeData"
                style="width: 90%">
                    <el-table-column
                    prop="id"
                    label="id"
                   >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper" @click="tagsData( scope.row.id)">
                               <p class="cursor_css" :class="{ nowType: (nowType == scope.row.id)}"> {{ scope.row.id }}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="名称"
                   >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper" @click="tagsData( scope.row.id)">
                                <p  class="cursor_css" :class="{ nowType: (nowType == scope.row.id)}"> {{ scope.row.name }}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="sub_main">
                <div class="view_main marginleft_20">
                    <el-input
                    placeholder="输入名称"
                    class="name_input"
                      v-model="tagValue"
                    ></el-input>
                    <el-button @click="addTags"  type="primary">新建子标签</el-button>
                </div>
                <el-table class="table_main"
                    v-if="tagData.length > 0"
                :data="tagData"
                style="width: 90%">
                    <el-table-column
                    prop="id"
                    label="id"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="名称"
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
    data(){
        return{
            userinfo:"",
            typeValue:"",
            typeId:"",
            tagValue:"",
            nowType:0,
            typeData: [],
            tagData: []

        }
    },
    methods:{
        tagsType(){
            var self = this;
            this.common.getEventToken(this.api.host+this.api.tagsType,{},this.userinfo,function(data){
                if(data.length >0){
                    self.typeData = data;
                    self.nowType = data[0].id;
                    self.tagsData(self.nowType);
                }

            });
        },
        addType(){
            var self = this;
            this.common.postEventToken(this.api.host+this.api.tagsType,{"name":this.typeValue},this.userinfo,function(data){
                self.typeValue = "";
                self.tagsType();
            });
        },
        tagsData(id){
            var self = this;
            this.nowType = id;
            this.common.getEventToken(this.api.host+this.api.tagsData+"?tag_type="+id,{},this.userinfo,function(data){
                console.log(data);
                if(data.data.length >0){
                    self.tagData = data.data;
                }else{
                    self.tagData = [];
                }

            });
        },
        addTags(){
            var self = this;
            this.common.postEventToken(this.api.host+this.api.tagsData,{"tag_type":this.nowType,"name":this.tagValue},this.userinfo,function(data){
                self.tagValue = "";
                self.tagsData(self.nowType);
            });
        }



    },
    mounted:function(){
        this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
        this.tagsType();
    }
}
</script>

<style>
    #labelAdmin{

    }
.title_main{
    padding:20px 0;
    border-bottom: 1px solid #999;
    }
    .label_main{
        overflow:hidden;
    }
    .parents_main, .sub_main{
        min-height:600px;
        width:400px;
        background:#efefef;
    float:left;
    }
    .sub_main{
        margin-left:60px;
    }
    .name_input{
        width:200px;
    }
    .table_main{
        margin: 10px auto 0;
    }
    .nowType{
        color:#409EFF;
        text-decoration: underline;

    }
    .cursor_css{
        cursor: pointer;
    }
</style>