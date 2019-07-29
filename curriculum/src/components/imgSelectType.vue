<template>
    <div id="QuestMain">
        <p class="quest-text blanks-title" v-text="data.imgselectDisplayTitle"></p>
        <p class="blanks-info" v-text="data.imgselectDisplayInfo"></p>
        <div>
            <div class="isd-leftMenu">
                
            </div>
            <div class="isd-rightMenu"></div>
        </div>
    </div>
</template>
<script>
    export default{
        prop:{
            data:""
        },
        data(){
            return{}
        },
        methods:{

        },
        mounted:function(){

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
.isd-leftMenu,.isd-rightMenu{
    display: inline-block;
}
.isd-leftMenu{
    width: 48%;
}
.isd-rightMenu{
    width: 48%;
}
</style>