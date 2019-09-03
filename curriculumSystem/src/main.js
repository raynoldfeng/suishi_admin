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
const fileSaver = require("./common/FileSaver.js");
//require("./common/FileSaver.js");

Vue.config.productionTip = false

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

    cos.putObject({
        Bucket: "suishi-1256985330",
        Region: "ap-guangzhou",
        Key: file.name,
        Body: file
    }, function (err, data) {
        console.log(data.headers);

    });
    cos.getObjectUrl({
        Bucket: "suishi-1256985330",
        Region: "ap-guangzhou",
        Key: file.name,
        Sign: false
    }, function (err, data) {
        console.log(err || data.Url);
        callback(data.Url);
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

    cos.putObject({
        Bucket: "suishi-1256985330",
        Region: "ap-guangzhou",
        Key: fileurl+file.name,
        Body: file
    }, function (err, data) {
        console.log(data.headers);

    });
    cos.getObjectUrl({
        Bucket: "suishi-1256985330",
        Region: "ap-guangzhou",
        Key: fileurl+file.name,
        Sign: false
    }, function (err, data) {
        console.log(err || data.Url);
        callback(data.Url);
        url = data.Url;
    });
};



var cosjsFile2 = function newCos(SecretId,SecretKey,fileurl,file,XCosSecurityToken,expiredTime,callback ){
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
            Key: fileurl+file.webkitRelativePath,
            Body: file,
        }],
        SliceSize: 1024 * 1024,
        onProgress: function (info) {
            var percent = parseInt(info.percent * 10000) / 100;
            var speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
            console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
        },
        onFileFinish: function (err, data, options) {
            console.log(options.Key + '上传' + (err ? '失败' : '完成'));
            callback(options.Key + '上传' + (err ? '失败' : '完成'));
        },
    }, function (err, data) {
        console.log(err || data);
    });
};


var cosjsFile3 = function newCos(SecretId,SecretKey,fileurl,file,XCosSecurityToken,expiredTime,callback ){

    var cos = new COS({ SecretId: SecretId,SecretKey: SecretKey,XCosSecurityToken:XCosSecurityToken,expiredTime:expiredTime});
    var url = "";
console.log(file)
    cos.uploadFiles({
        files: [{
            Bucket: 'suishi-1256985330', /* 必须 */
            Region: 'ap-guangzhou',    /* 必须 */
            Key: fileurl+file.webkitRelativePath,
            Body: file,
        }],
        SliceSize: 1024 * 1024,
        onProgress: function (info) {
            var percent = parseInt(info.percent * 10000) / 100;
            var speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
            console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
        },
        onFileFinish: function (err, data, options) {
            console.log(options.Key + '上传' + (err ? '失败' : '完成'));
            callback(options.Key);
        },
    }, function (err, data) {
        console.log(err || data);
    });
};

var getjsFile = function(){
    let data = {
        name:"hanmeimei",
        age:88
    }
    var content ="window.test="+JSON.stringify(data);
    var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    fileSaver.fileSaver.saveAs(blob, "save.js");
}



//Vue.prototype.fileSaver = fileSaver.fileSaver;
Vue.prototype.common = common.common;
Vue.prototype.api = api.api;
Vue.prototype.cosjs = cosjs;
Vue.prototype.cosjsFile = cosjsFile;
Vue.prototype.cosjsFile2 = cosjsFile2;
Vue.prototype.getjsFile = getjsFile;
Vue.prototype.cosjsFile3 = cosjsFile3;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
