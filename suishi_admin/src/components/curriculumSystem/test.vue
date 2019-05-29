
<template>
    <div>
        <input id="file-selector" type="file" >
            <input id="file-selector2" type="file" accept="*/*" multiple="" webkitdirectory="">
             <!--   <input title="点击选择文件夹" id="h5Input2" multiple="" webkitdirectory="" accept="*/*" type="file" name="html5uploader" style="position:absolute;opacity:0;top:0;left:0;width:100%;height:100%;cursor:pointer;">-->
    </div>
</template>
<script>
export default{
    data(){
    return{
    isUseMenu: [
    {value: "1",
    label: "是"},
    {value: "0",
    label: "否"}
    ],
    isUse: "0",
    isStudy:"0",
    descText:"",
    imageUrl: '',
    dialogTableVisible: false,
    userinfo:"",
    SecretId:"",
    SecretKey:"",
    XCosSecurityToken:"",
    expiredTime:"",
    majorName:"",
    orderValue:"",
    coverImg:"",
    majorTypeMenu:[
    {value: 1,
    label: "专业课"},
    {value: 0,
    label: "公开课"}
    ],
    majorType:"",


    typeData:[],
    nowType:"",
    tagData:[],
    tagDataList:[],
    tagDataMenu:[],
    tags: [],
    tagsArr:[]
    }
    },
    methods: {
    /**
     * 路径例子https://suishi-1256985330.cos.ap-guangzhou.myqcloud.com/courseware/a/dsds/yes/indexxx.html
     * **/
        getUpLoadKey(){
            var self =this;
            this.common.getEventToken(this.api.host+this.api.cosToken,{},this.userinfo,function(data){
            console.log(data);
            self.SecretId = data.credentials.tmpSecretId;
            self.SecretKey = data.credentials.tmpSecretKey;
            self.XCosSecurityToken = data.credentials.sessionToken;
            self.expiredTime = data.expiredTime;
            })

        },
    },
    mounted:function(){
    var self =this;
    this.userinfo = {"token":this.common.cookie.get("token"),"user_id":this.common.cookie.get("user_id")};
    this.getUpLoadKey();

        document.getElementById('file-selector').onchange = function () {
        var file = this.files[0];

        var fileurl = "courseware/a/";
        if (!file) return;
    //                console.log(file.name);
    //                console.log(file)
        if(self.SecretId != "" && self.SecretKey !="" ){
        if(file){
                self.cosjsFile(self.SecretId,self.SecretKey,fileurl,file,self.XCosSecurityToken,self.expiredTime,function(img){
                   // self.coverImg = img;
                });
            }
        }

        };

    document.getElementById('file-selector2').onchange = function () {
    var file = this.files;
    console.log(4545)
    console.log(this.files)
    var fileurl = "courseware/a/";
    if (!file) return;
    //                console.log(file.name);
    //                console.log(file)
    if(self.SecretId != "" && self.SecretKey !="" ){
    if(file){
       var lens = this.files.length;
        for(let i =0 ;i<lens;i++){
            self.cosjsFile2(self.SecretId,self.SecretKey,fileurl,file[i],self.XCosSecurityToken,self.expiredTime,function(img){
            // self.coverImg = img;
            });
        }

    }
    }

    };

    }
    }
</script>
<style>
#file-selector{
    display:block
    }
</style>