const config = require("../js/config.js");
const Sumslack = require("../js/sumslack.js");

export function login (cb) {
    Sumslack.login(function(json){
        var code = json.code;
        Sumslack.getConfig().code = code;
        Sumslack.request(Sumslack.getConfig().svrurl + "r/home/login",{"code":code}).then(data => {
            if(typeof cb === "function"){
                cb(Sumslack.toJSON(data));
            }
        });
    });
}

//export function storeToken(token,cb){
//    //要跟当前用户的uid绑定，不然切换用户存在Bug
//    Sumslack.getUserInfo().then( data => {
//        var _uid = data.id;
//        Sumslack.alert("store token:"+token+"=>"+_uid+"token");
//        Sumslack.setStorage(_uid+"token",token,cb);
//    });
//}

export function getDaziToken(cb){
    Sumslack.getUserInfo().then( data => {
        var _uid = data.id;
        Sumslack.getStorage(_uid+"user",function(result){
            cb(result.token);
        });
    });
}

export function listDazi(p,city,cateid,cb){
    getDaziToken(function(result){
        Sumslack.request(Sumslack.getConfig().svrurl + "r/dazi/list",{"p":p,"city":city,"cateid":cateid,"token":result}).then(data => {
            //Sumslack.alert(Sumslack.print(data));
            data = Sumslack.toJSON(data);
            cb(data);
        });
    });
}

export function dayixia(id,cb){
    getDaziToken(function(result){
        //Sumslack.alert(result);
        Sumslack.request(Sumslack.getConfig().svrurl + "r/dazi/da",{"id":id,"token":result}).then(data => {
            data = Sumslack.toJSON(data);
            cb(data);
        });
    });
}

export function daziRemove(id,cb){
    getDaziToken(function(result){
        Sumslack.request(Sumslack.getConfig().svrurl + "r/dazi/remove",{"id":id,"token":result}).then(data => {
            data = Sumslack.toJSON(data);
            cb(data);
        });
    });
}


export function listDaList(fid,cb){
    getDaziToken(function(result){
        Sumslack.request(Sumslack.getConfig().svrurl + "r/dazi/dalist",{"fid":fid,"token":result}).then(data => {
            data = Sumslack.toJSON(data);
            cb(data);
        });
    });
}

export function daConfirm(fid,uid,sts,cb){
    getDaziToken(function(result){
        Sumslack.request(Sumslack.getConfig().svrurl + "r/dazi/daConfirm",{"id":fid,"uid":uid,"sts":sts,"token":result}).then(data => {
            data = Sumslack.toJSON(data);
            cb(data);
        });
    });
}


export function listCities(cb){
    Sumslack.request(Sumslack.getConfig().svrurl + "r/district/list",{}).then(data => {
        data = Sumslack.toJSON(data);
        cb(data);
    });
}

export function queryCities(q,cb){
    Sumslack.request(Sumslack.getConfig().svrurl + "r/district/getCity",{"q":q}).then(data => {
        data = Sumslack.toJSON(data);
        cb(data);
    });
}

export function listComment(p,fid,cb){
    getDaziToken(function(result){
        Sumslack.request(Sumslack.getConfig().svrurl + "r/comment/list",{"token":result,"p":p,"id":fid}).then(data => {
            data = Sumslack.toJSON(data);
            cb(data);
        });
    });
}
export function addComment(fid,content,cb){
    getDaziToken(function(result){
        Sumslack.request(Sumslack.getConfig().svrurl + "r/comment/add",{"token":result,"fid":fid,"content":content}).then(data => {
            data = Sumslack.toJSON(data);
            cb(data);
        });
    });
}
export function replyComment(id,content,cb){
    getDaziToken(function(result){
        Sumslack.request(Sumslack.getConfig().svrurl + "r/comment/reply",{"token":result,"id":id,"content":content}).then(data => {
            data = Sumslack.toJSON(data);
            cb(data);
        });
    });
}
export function removeComment(id,cb){
    getDaziToken(function(result){
        Sumslack.request(Sumslack.getConfig().svrurl + "r/comment/remove",{"token":result,"id":id}).then(data => {
            data = Sumslack.toJSON(data);
            cb(data);
        });
    });
}