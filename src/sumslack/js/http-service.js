const config = require("../js/config.js");
const Sumslack = require("../js/sumslack.js");

export function login (cb) {
    Sumslack.login(function(json){
        var code = json.code;
        if(code == ""){
            cb({ret:false,msg:"请先登录!"});
        }else{
            Sumslack.getConfig().code = code;
            Sumslack.request(Sumslack.getConfig().svrurl + "user/login/"+code,{}).then(data => {
                if(typeof cb === "function"){
                    let json = Sumslack.toJSON(data);
                    if (json.ret){
                        Sumslack.setStorage(json.user.uid + "user", json.user);
                        cb(json);
                    }
                }
            });
        }
    });
}

export function isLogin(cb){
    Sumslack.getUserInfo().then(userInfor => {
        var _uid = userInfor.id;
        Sumslack.getStorage(_uid + "user", function (result) {
            cb(true);  //已登录
        }, function () {
            cb(false); //未登录
        });
    });
}

export function loginThen() {
    return new Promise((resolve) => {
        Sumslack.getUserInfo().then(userInfor => {
            var _uid = userInfor.id;
            Sumslack.getStorage(_uid + "user", function (result) {
                resolve(true);
            }, function () {
                resolve(false);
            });
        });
    });
}

export function getToken(cb){
    Sumslack.getUserInfo().then( data => {
        var _uid = data.id;
        Sumslack.getStorage(_uid+"user",function(result){
            cb(result.token);
        },function(){
            cb("");
        });
    });
}

export function fav(finId,cb){
    getToken(function (token) {
        Sumslack.request(Sumslack.getConfig().svrurl + "fav/add/" + finId, {
                "token": token
            }).then(data => {
            //Sumslack.alert(Sumslack.print(data));
            data = Sumslack.toJSON(data);
            cb(data);
        });
    });
}

export function favGet(finId) {
    return new Promise((resolve) => {
        getToken(function (result) {
            Sumslack.request(Sumslack.getConfig().svrurl + "fav/get/"+finId, {
                "token": result
            }).then(data => {
                //Sumslack.alert(Sumslack.print(data));
                data = Sumslack.toJSON(data);
                resolve(data);
            });
        });
    });

}

export function favList(cb) {
    getToken(function (result) {
        Sumslack.request(Sumslack.getConfig().svrurl + "fav/list", {
            "token": result
        }).then(data => {
            //Sumslack.alert(Sumslack.print(data));
            data = Sumslack.toJSON(data);
            cb(data);
        });
    });
}
