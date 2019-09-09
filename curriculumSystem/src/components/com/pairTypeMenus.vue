<template>
    <div>
        <div class="view_main">
            <span>标题:</span>
            <el-input class="input_type" v-model="nowData.pairTypeTitle"></el-input>
        </div>
        <div class="view_main">
            <span>副标题:</span>
            <el-input class="input_type" v-model="nowData.pairTypeInfo"></el-input>
        </div>
        <div class="view_main">
            <el-button @click="">添加问题</el-button>
        </div>
        <div class="view_main">
            <ul class="padd_css">
                <li v-for="(data,index) in nowData.pairTypeMenu">
                    <div class="view_main">
                        <el-button @click="">删除问题</el-button>
                    <el-button @click="">添加答案</el-button>
                    </div>
                    <div class="view_main">
                        <span>问题标题:</span>
                        <el-input class="input_type" v-model="data.pairTypeQtitle"></el-input>
                    </div>
                    <ul class="padd_css">
                        <li v-for="(sdata,sindex) in data.pairTypeAmenu">
                            <div class="view_main">
                                <el-button @click="">删除答案</el-button>
                            </div>
                            <div class="view_main">
                                <span>答案标题:</span>
                                <el-input class="input_type" v-model="sdata.pairTypeAtitle"></el-input>
                            </div>
                            <div class="view_main">
                                <span>答案解释:</span>
                                <el-input class="input_type" v-model="sdata.pairTypeAcontext"></el-input>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            SecretId:"",
            SecretKey:"",
            XCosSecurityToken:"",
            expiredTime:"",
            selectImgIndex:"",      //模板需要多个带图片的问题时

        }
    },
    props:{
        nowData:"",
        cosData:"",

    },
    mounted:function(){
        var self = this;
        self.SecretId= self.cosData.SecretId;
        self.SecretKey= self.cosData.SecretKey;
        self.XCosSecurityToken = self.cosData.XCosSecurityToken;
        self.expiredTime = self.cosData.expiredTime;


    },
    methods:{


    }
}
</script>
        <style>
        .padd_css{
            padding-top: 20px;
            padding-left: 50px;
            margin-top: 10px;
        }
        </style>