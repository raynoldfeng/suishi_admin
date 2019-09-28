<template>
    <div id="payMenu">
        <div class="view_main">
            <template>
                <el-table
                :data="payData"
                border
                style="width: 100%">
                <el-table-column
                        fixed
                        prop="id"
                        label="ID"
                        >
                </el-table-column>
                <el-table-column
                        prop="account"
                        label="账号"
                        >
                </el-table-column>

                <el-table-column
                        prop="order_id"
                        label="订单id"
                        >
                </el-table-column>
                <el-table-column
                        prop="money"
                        label="订单金额"
                        >
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="订单状态"
                        >
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 0">待支付</span>
                        <span v-else>已支付</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="product_id"
                        label="课程id"
                        >
                </el-table-column>
                <el-table-column
                        prop="product_name"
                        label="课程名称"
                        >
                </el-table-column>
                <el-table-column
                        prop="created_at"
                        label="订单时间"
                        >
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
            payData:[],
            allPage:0,
            nowPage:1,
        }
    },
    methods: {

        getPayMenu(){
            this.common.getEventToken(this.api.host+this.api.order+"?page="+this.nowPage,{},this.userinfo,function(data){
                console.log(data);
                self.payData = data.data;
                self.allPage = data.last_page * 10;
            })
        },
        editEvent(id){
            console.log(id)
//            this.$router.push({path: "/editMajor", query: {id: id}});
            //  this.$router.push("/editMajor",{params:id});
        }
    },
    watch:{
        nowPage(){
            this.getPayMenu();
        }
    },
    mounted:function(){
        this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
        this.getPayMenu();
    }
}
</script>
        <style>

        </style>