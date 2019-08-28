<template>
    <div>
        <div class="view_main">
            <span>题目:</span>
            <el-input class="input_type" v-model="nowData.judgeTitle"></el-input>
        </div>
        <div class="view_main">
            <span>副题目:</span>
            <el-input class="input_type" v-model="nowData.judgeInfo"></el-input>
        </div>
        <div class="view_main">
            <span>正确标题:</span>
            <el-input class="input_type" v-model="nowData.judgeTitleTrue"></el-input>
        </div>
        <div class="view_main">
            <span>错误标题:</span>
            <el-input class="input_type" v-model="nowData.judgeTitleFalse"></el-input>
        </div>
        <div class="view_main">
            <el-button @click="addJudgeEvent">添加问题</el-button>
    </div>
    <div class="view_main" v-for="(data,index) in nowData.judgeMenu">
        <el-button @click="deleteJudgeEvent(index)">删除问题</el-button>
    <div class="view_main">
        <span>答案文本:</span>
        <el-input class="input_type" v-model="data.judgeText"></el-input>
    </div>

    <div class="view_main">
        <span>正确选项:</span>

        <el-select v-model="data.judgeAnswer" class="select-css" placeholder="正确选项">
            <el-option
                    v-for="item in judgeAnswerMenu"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>
</div>
<div class="view_main">
<span>答案注释:</span>
<el-input
        class="textarea_type"
        type="textarea"
:autosize="{ minRows: 2, maxRows: 4}"
placeholder="请输入内容"
v-model="data.judgeAnswerText">
</el-input>
        </div>

        </div>

        </div>
</template>
        <script>
        export default{
            data(){
                return {
                    SecretId:"",
                    SecretKey:"",
                    XCosSecurityToken:"",
                    expiredTime:"",
                    selectImgIndex:""      //模板需要多个带图片的问题时
                }
            },
            props:{
                nowData:"",
                cosData:"",
                judgeAnswerMenu:"",
            },
            mounted:function(){

            },
            methods:{
                /**
                 * 判断题
                 */
                addJudgeEvent(){
                    var newData={
                        judgeText:"",
                        judgeAnswer:"0",
                        judgeAnswerText:""
                    }
                    this.nowData.judgeMenu.push(newData)
                },

                deleteJudgeEvent(index){
                    this.nowData.judgeMenu.splice(index,1);
                }
            }
        }
        </script>