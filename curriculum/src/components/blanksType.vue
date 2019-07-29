<template>
    <div id="QuestMain">
        <p class="quest-text blanks-title" v-text="data.blanksTitle"></p>
        <p class="blanks-info" v-text="data.blanksInfo"></p>
        <div>
            <p v-for="(idata,index) in data.blanksMenu">
                <span v-if="idata.blanksType == '1'" class="blanks-text" v-text="idata.blanksText"></span>
                <div class="input-b-box" v-if="idata.blanksType == '2'">
                    <input v-if="aShow[index] == 0" class="blanks-anw" v-model="idata.blanksInput" />
                    <span  v-if="aShow[index] == 1" v-text="idata.blanksAnswer"></span>
                    <span v-if="aShow[index] == 0" class="show-abtn" @click="showAnswer(index)"> > </span>
                    <span  v-if="aShow[index] == 1" class="true-btn">1</span>
                </div>

            </p>

        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default
{
    props:{
        data:""
    },
    data(){
        return{
            aShow:[]
        }
    },
    methods:{
        showAnswer(index){
            this.aShow[index] = 1;
        }
    },
    mounted:function(){
        for(let i =0; i < this.data.blanksMenu.length;i++){
            this.aShow.push(0);
        }
    }
}
</script>
<style>
    .blanks-title{
        margin-top: 10%;
        font-size: 8vw;
        color: #666;
        position: relative;
        z-index: 1;
    }
    .blanks-info{
        font-size: 4vw;
        color: #666;
        z-index: 1;
    }
    .blanks-text{
        display:inline-block;
        font-size:4vw;
    }
    .blanks-anw{
        width:25vw;
        display:inline-block;
        font-size:4vw;
        text-algin:center;
    }
    .input-b-box{
        display: inline-block;
    }
    .show-abtn{
        display: inline-block;
        background: skyblue;
        color: #fff;
    }
    .true-btn{
       background: green;
    }
</style>