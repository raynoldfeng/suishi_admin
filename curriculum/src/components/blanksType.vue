<template>
    <div id="QuestMain">
        <p class="quest-text blanks-title" v-text="data.blanksTitle"></p>
        <p class="blanks-info" v-text="data.blanksInfo"></p>
        <div>
            <span class="blanks-text">sdfsdfdsf</span>
            <input class="blanks-anw" value="dsfdsfsd" />
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
</style>