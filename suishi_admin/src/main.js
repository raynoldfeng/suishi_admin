// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style.css'

const common=require("./common/common.js");
const api = require("./common/api.js");
require("./common/cos-js-sdk-v5.js");

var date = new Date();
var key;
if(document.location.host=="admin.sui10.com"){
    key = "admin/prod/"
}else{
    key = "admin/test/"
}
var cosjs = function newCos(SecretId,SecretKey,file,XCosSecurityToken,expiredTime,callback ){
//    console.log(2545454);
//    console.log(SecretId);
//    console.log(SecretKey);
//    console.log(file);
//    console.log(file.name);
   var cos = new COS({ SecretId: SecretId,SecretKey: SecretKey,XCosSecurityToken:XCosSecurityToken,expiredTime:expiredTime});
//    cos.sliceUploadFile({
//        Bucket: "suishi-1256985330",
//        Region: "ap-guangzhou",
//        Key: file.name,
//        Body: file
//    }, function (err, data) {
//        console.log(err, data);
//    });

    var newdate = ""+date.getFullYear()+date.getMonth()+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds();

    cos.putObject({
        Bucket: "suishi-1256985330",
        Region: "ap-guangzhou",
        Key: key+date.getFullYear()+(date.getMonth()+1)+date.getDate()+"/"+newdate+file.name,
        Body: file
    }, function (err, data) {


    });
    cos.getObjectUrl({
        Bucket: "suishi-1256985330",
        Region: "ap-guangzhou",
        Key: key+date.getFullYear()+(date.getMonth()+1)+date.getDate()+"/"+newdate+file.name,
        Sign: false
    }, function (err, data) {
        console.log(err || data.Url);
        var flength = "http://suishi-1256985330.cos.ap-guangzhou.myqcloud.com/".length;
        var llength = data.Url.length;
        if(data.Url.indexOf("http://suishi-1256985330.cos.ap-guangzhou.myqcloud.com") != (-1)){
//            var nimg ="http://res.sui10.com/"+key+date.getFullYear()+(date.getMonth()+1)+date.getDate()+"/"+ data.Url.slice(flength,llength);
            var nimg ="http://res.sui10.com/"+ data.Url.slice(flength,llength);
            callback(nimg);
        }else{
            callback(data.Url);
        }


    });

};



var cosjsLink = function newCos(SecretId,SecretKey,file,XCosSecurityToken,expiredTime,callback ){
//    console.log(2545454);
//    console.log(SecretId);
//    console.log(SecretKey);
//    console.log(file);
//    console.log(file.name);
    var cos = new COS({ SecretId: SecretId,SecretKey: SecretKey,XCosSecurityToken:XCosSecurityToken,expiredTime:expiredTime});
//    cos.sliceUploadFile({
//        Bucket: "suishi-1256985330",
//        Region: "ap-guangzhou",
//        Key: file.name,
//        Body: file
//    }, function (err, data) {
//        console.log(err, data);
//    });

    var newdate = ""+date.getFullYear()+date.getMonth()+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds();

    cos.putObject({
        Bucket: "suishi-public-1256985330",
        Region: "ap-nanjing",
        Key: "share"+"/"+newdate+file.name,
        Body: file
    }, function (err, data) {


    });
    cos.getObjectUrl({
        Bucket: "suishi-public-1256985330",
        Region: "ap-nanjing",
        Key: "share"+"/"+newdate+file.name,
        Sign: false
    }, function (err, data) {
        console.log(err || data.Url);
        var flength = "http://suishi-public-1256985330.cos.ap-guangzhou.myqcloud.com/".length;
        var llength = data.Url.length;
//        if(data.Url.indexOf("http://suishi-public-1256985330.cos.ap-guangzhou.myqcloud.com") != (-1)){
////            var nimg ="http://res.sui10.com/"+key+date.getFullYear()+(date.getMonth()+1)+date.getDate()+"/"+ data.Url.slice(flength,llength);
//            var nimg ="http://res.sui10.com/"+ data.Url.slice(flength,llength);
//            callback(nimg);
//        }else{
            callback(data.Url);
//        }


    });

};


var cosjsFile = function newCos(SecretId,SecretKey,fileurl,file,XCosSecurityToken,expiredTime,callback ){
//    console.log(2545454);
//    console.log(SecretId);
//    console.log(SecretKey);
//    console.log(file);
//    console.log(file.name);
    var cos = new COS({ SecretId: SecretId,SecretKey: SecretKey,XCosSecurityToken:XCosSecurityToken,expiredTime:expiredTime});
//    cos.sliceUploadFile({
//        Bucket: "suishi-1256985330",
//        Region: "ap-guangzhou",
//        Key: file.name,
//        Body: file
//    }, function (err, data) {
//        console.log(err, data);
//    });
    var newdate = ""+date.getFullYear()+date.getMonth()+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds();
    cos.putObject({
        Bucket: "suishi-1256985330",
        Region: "ap-guangzhou",
        Key: key+fileurl+newdate+file.name,
        Body: file
    }, function (err, data) {
        console.log(data.headers);

    });
    cos.getObjectUrl({
        Bucket: "suishi-1256985330",
        Region: "ap-guangzhou",
        Key: fileurl+newdate+file.name,
        Sign: false
    }, function (err, data) {
        console.log(err || data.Url);
        callback(data.Url);
    });

};


var cosjsFile2 = function newCos(SecretId,SecretKey,fileurl,file,XCosSecurityToken,expiredTime,callback,progressCallback ){
//    console.log(2545454);
//    console.log(SecretId);
//    console.log(SecretKey);
//    console.log(file);
//    console.log(file.name);
    var newdate = ""+date.getFullYear()+date.getMonth()+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds();
    var cos = new COS({ SecretId: SecretId,SecretKey: SecretKey,XCosSecurityToken:XCosSecurityToken,expiredTime:expiredTime});
//    cos.sliceUploadFile({
//        Bucket: "suishi-1256985330",
//        Region: "ap-guangzhou",
//        Key: file.name,
//        Body: file
//    }, function (err, data) {
//        console.log(err, data);
//    });

//    cos.sliceUploadFile({
//        Bucket: 'suishi-1256985330', /* 必须 */
//        Region: 'ap-guangzhou',    /* 必须 */
//        Key: fileurl+file.webkitRelativePath,              /* 必须 */
//        Body: file,                /* 必须 */
//        TaskReady: function(taskId) {                   /* 非必须 */
//            console.log(file);
//            console.log(fileurl+file.webkitRelativePath)
//
//        },
//        onHashProgress: function (progressData) {       /* 非必须 */
//            console.log(JSON.stringify(progressData));
//
//        },
//        onProgress: function (progressData) {           /* 非必须 */
//            console.log(JSON.stringify(progressData));
//
//        }
//    }, function(err, data) {
//
//        console.log(err || data);
//    });


    cos.uploadFiles({
        files: [{
            Bucket: 'suishi-1256985330', /* 必须 */
            Region: 'ap-guangzhou',    /* 必须 */
            Key: key+fileurl+newdate+file.webkitRelativePath,
            Body: file,
        }],
        SliceSize: 1024 * 1024,
        onProgress: function (info) {
            var percent = parseInt(info.percent * 10000) / 100;
            var speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
            progressCallback(percent,speed);
            console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
        },
        onFileFinish: function (err, data, options) {
            console.log(options.Key + '上传' + (err ? '失败' : '完成'));
            if(err){
                callback(options.Key,1);
            }else{
                if (options.Key.indexOf("index.html") != (-1)) {
                    //self.pptUrl.push("https://suishi-1256985330.cos.ap-guangzhou.myqcloud.com/" + url);
                    var nUrl = "http://res.sui10.com/" + options.Key;
                    callback(nUrl,0);
                }else{
                    callback(options.Key,0);
                }

            }
        },
    }, function (err, data) {
        console.log(err || data);
    });

//    cos.putObject({
//        Bucket: "suishi-1256985330",
//        Region: "ap-guangzhou",
//        Key: fileurl+file.name,
//        Body: file
//    }, function (err, data) {
//        console.log(data.headers);
//
//    });
//    cos.getObjectUrl({
//        Bucket: "suishi-1256985330",
//        Region: "ap-guangzhou",
//        Key: fileurl+file.name,
//        Sign: false
//    }, function (err, data) {
//        console.log(err || data.Url);
//        callback(data.Url);
//    });

};


Vue.prototype.common = common.common;
Vue.prototype.api = api.api;
Vue.prototype.cosjs = cosjs;
Vue.prototype.cosjsLink = cosjsLink;
Vue.prototype.cosjsFile = cosjsFile;
Vue.prototype.cosjsFile2 = cosjsFile2;
Vue.config.productionTip = false;
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
