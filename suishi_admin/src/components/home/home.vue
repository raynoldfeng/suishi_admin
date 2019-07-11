<template>
    <div></div>
</template>
<script>
    export default{
        mounted:function(){
         //   location.reload();
            if(this.$route.query.isr == "1"){
             //   this.$router.push({path:"/home",query:{isr:"0"}});
             //   location.reload();
            }

        }
    }
</script>