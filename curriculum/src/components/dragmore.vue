<template>
    <div id="QuestMain">
        <p class="quest-text" >loding</p>
        <p class="common-info" >sadasdas</p>
        <ul class="question-menu">
            <li>
                <p class="drag-text">hsdfjsdfjsdfsdbfhsg</p>
                <div class="drag-box"></div>
            </li>
            <li>
                <p class="drag-text">hsdfjsdfjsdfsdbfhsg</p>
                <div class="drag-box"></div>
            </li>
            <li>
                <p class="drag-text">hsdfjsdfjsdfsdbfhsg</p>
                <div class="drag-box"></div>
            </li>
        </ul>
        <div  class="animated dragboxbtn">adsd</div>
</div>
</template>
<script></script>
<style>
    .question-menu{
        width: 94%;
        margin: 5% auto 0;
    }
    .question-menu li{
            margin-top: 3%;
           overflow: hidden;
    }
    .drag-text{
        width: 48%;
        float: left;
        font-size: 4.5vw;
        word-break:break-all;
    }
    .drag-box{
        width: 48%;
        height: 40px;
        margin: 0 0 0 2%;
        float: left;
        border: 1px solid #ddd;
    }
    .dragboxbtn {
        max-width: 80%;
        min-width: 30%;
        height: auto;
        text-align: center;
        color: #666;
        background: #fff;
        padding: 2% 0;
        position: absolute;
        left: 100px;
        top: 300px;
        font-size: .65em;
        -moz-box-shadow: 0 2px 4px #999;
        -webkit-box-shadow: 0 2px 4px #999;
    }
</style>