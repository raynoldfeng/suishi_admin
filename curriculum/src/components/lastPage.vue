<template>
    <div id="lastPage">
        <p>最后一页</p>
        <div class="tp-start-btn" @click="finishEvent">
        退出
        </div>
    </div>
</template>
<script>
    export default{
    methods:{
        finishEvent(){
            try{
                h5.finishResult();
            }catch(e){

            }
        }
    }
}
</script>
<style>
#lastPage{
    padding-top: 25%;
    font-size: 5vw;
}
.tp-start-btn{
    min-width: 30%;
    display: inline-block;
    background: #019ccb;
    margin: 10% auto 0;
    padding: 2% 4%;
    color: #ffffff;
    }</style>