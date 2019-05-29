<template>
    <div id="QuestMain">
        <div id="imageChange" :style = '{"height":imageChangeHeight+"px"}'>
            <swiper class="swiper_type_menu" :options="imageChangeOption" >
            <!-- slides -->
                <swiper-slide key="0"  >
                   <img src="https://mohivecontents-jp.crossknowledge.com/staticcoursecontent/en-gb/bsfi633/medias/07FFDC33-D863-4B12-8C71-B4D49AA21F30/Q3_07FFDC33-D863-4B12-8C71-B4D49AA21F30.jpg">
                </swiper-slide>
                <swiper-slide key="1">
                    <img src="https://mohivecontents-jp.crossknowledge.com/staticcoursecontent/en-gb/bsfi633/medias/07FFDC33-D863-4B12-8C71-B4D49AA21F30/Q3_07FFDC33-D863-4B12-8C71-B4D49AA21F30.jpg">
                </swiper-slide>
                <swiper-slide key="2">
                    <img src="https://mohivecontents-jp.crossknowledge.com/staticcoursecontent/en-gb/bsfi633/medias/07FFDC33-D863-4B12-8C71-B4D49AA21F30/Q3_07FFDC33-D863-4B12-8C71-B4D49AA21F30.jpg">
                </swiper-slide>
            </swiper>

        </div>
        <div class="ic-swiper-pagination swiper-pagination-clickable swiper-pagination-bullets" slot="progressbar"></div>
    </div>
</template>
 <script>
    export default{
        data(){
            return{
                imageChangeHeight:0,
                imageChangeOption: {
                    direction: 'vertical',
                    pagination: {
                        el: '.ic-swiper-pagination',
                        clickable: true
                    }
                },

            }
        },
        mounted:function(){
            this.imageChangeHeight = document.getElementById("imageChange").scrollHeight;
        }
    }
 </script>
        <style>
        #imageChange{

            overflow: hidden;
        }
            #imageChange img{
                width: 100%;
            }
        .ic-swiper-pagination{
            width: 8px;
            float: right;
            margin-top: 30%;
            margin-right: 2%;
        }
            #imageChange  .swiper-pagination-bullets {
                right: 10px;
                top: 50%;
                -webkit-transform: translate3d(0,-50%,0);
                transform: translate3d(0,-50%,0);
            }
        </style>