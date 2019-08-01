/**
 * Created by Administrator on 2019/5/23.
 */
/**
 * Created by Administrator on 2019/5/23.
 */
var params = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};
function getCss(o,key){
    return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
};
export const drop = {

    phoneStartDrag:function(bar, target,id,callback,truecallback){
        if(getCss(target, "left") !== "auto"){
            params.left = getCss(target, "left");
        }
        if(getCss(target, "top") !== "auto"){
            params.top = getCss(target, "top");
        }

        bar.addEventListener("touchstart",function(event){
            $(".kuang").addClass("select-css");
            params.flag = true;
            if(!event){
                event = window.event;
                //防止IE文字选中
                bar.onselectstart = function(){
                    return false;
                }
            }
            var e = event;
            //    console.log(e.targetTouches[0].clientX)
            params.currentX = e.targetTouches[0].clientX;
            params.currentY = e.targetTouches[0].clientY;
        });
        document.addEventListener("touchend",function(){
            params.flag = false;
//        target.style.left = 100 + "px";
//        target.style.top = 300 + "px";

            $(".kuang").removeClass("select-css");
            if(isSelection(".true-main", target.style.top, target.style.left) || isSelection(".false-main", target.style.top, target.style.left)){
                target.style.left = (window.innerWidth - $(id).width())/2 + "px";
                target.style.top = window.innerHeight/1.5 + "px";
                $(id).hide();
                if(getCss(target, "left") !== "auto"){
                    params.left = getCss(target, "left");
                }
                if(getCss(target, "top") !== "auto"){
                    params.top = getCss(target, "top");
                }
                truecallback && truecallback();
            }else{
                $(id).removeClass("shake");
                var left = (window.innerWidth - $(id).width())/2 + "px";
                var top =window.innerHeight/1.5 + "px";
                $(id).animate({left:left,top:top},function(){
                    if(getCss(target, "left") !== "auto"){
                        params.left = getCss(target, "left");
                    }
                    if(getCss(target, "top") !== "auto"){
                        params.top = getCss(target, "top");
                    }
                    $(id).addClass("shake");
                });
            }





        });
        document.addEventListener("touchmove",function(event){
            var e = event ? event: window.event;
            // console.log(e);
            if(params.flag){
                var nowX = e.targetTouches[0].clientX, nowY = e.targetTouches[0].clientY;
                var disX = nowX - params.currentX, disY = nowY - params.currentY;
                target.style.left = parseInt(params.left) + disX + "px";
                target.style.top = parseInt(params.top) + disY + "px";
                if (typeof callback == "function") {
                    callback((parseInt(params.left) || 0) + disX, (parseInt(params.top) || 0) + disY);
                }
//
//            if (event.preventDefault) {
//                event.preventDefault();
//            }
                return false;
            }
        });
        function isSelection(id,top,left){
            var left_s = $(id).offset().left - $(id).width()/2;
            var left_e = $(id).offset().left + $(id).width()/2;
            var top_s = $(id).offset().top -  $(id).height()/2;
            var top_e =  $(id).offset().top + $(id).height();
            var nowTop = parseInt(top)+target.style.height/2;
            var nowLeft = parseInt(left)+target.style.width/2;
            if(nowTop > top_s && nowTop < top_e && nowLeft > left_s && nowLeft < left_e){
                if($(id).find(".kuang").hasClass("yes")){
                    $(id).find(".kuang").addClass("answer-css");  //给答案添加样式
                    $(id).find(".kuang").find("p").text(target.innerHTML);
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }

        }
    }
}