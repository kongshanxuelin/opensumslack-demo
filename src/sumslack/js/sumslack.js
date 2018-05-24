var config = require("../js/config.js");
const globalEvent = weex.requireModule('globalEvent');
const sumslack = weex.requireModule('event');
const modal = weex.requireModule('modal');
const clipboard = weex.requireModule('clipboard');
const storage = weex.requireModule('storage');
const stream = weex.requireModule('stream');

const getBaseURL = require('../include/base-url.js').getBaseURL;

const navigator = weex.requireModule('navigator');

const Http = {
    getUrlParam: function (obj, key) {
        var url = "";
        if (typeof obj === "object") {
            url = obj.$getConfig().bundleUrl;
        } else {
            url = obj;
        }
        var reg = new RegExp('[?|&]' + key + '=([^&]+)');
        var match = url.match(reg);
        return match && match[1];
    },
    get: function (_url, params, callback, err) {
        var me = this;
        if (typeof params === "object") {
            for (var k in params) {
                if (_url.indexOf("?") > 0) {
                    _url += "&" + k + "=" + encodeURIComponent(params[k]);
                } else {
                    _url += "?" + k + "=" + encodeURIComponent(params[k]);
                }
            }
        }
        stream.fetch({
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            method: 'GET',
            url: _url,
            type: 'json'
        }, function (ret) {
            if (typeof callback === "function") {
                callback(ret);
            }
        }, function (response) {
            console.log('http get in progress:' + response.length);
            if (typeof err === "function") {
                err(response);
            }
        });
    },
    post: function (_url, param, cb) {
        var me = this;
        stream.fetch({
            method: 'POST',
            url: _url,
            type: 'json',
            //body:JSON.stringify({username:'weex'})//or you can just use JSON Object {username:'weex'}
            body: JSON.stringify(param)
        }, function (ret) {
            cb(ret);
        }, function (response) {
            console.log('http post in progress:' + response.length);
        });
    },
    fetch: function (_url, params) {
        if (typeof params === "object") {
            for (var k in params) {
                console.log(k);
                if (_url.indexOf("?") > 0) {
                    _url += "&" + k + "=" + encodeURIComponent(params[k]);
                } else {
                    _url += "?" + k + "=" + encodeURIComponent(params[k]);
                }
            }
        }
        return new Promise((resolve, reject) => {
            stream.fetch({
                method: 'GET',
                url: _url,
                type: 'json',
                timeout:30000
            }, (response) => {
                if (response.status == 200) {
                    resolve(response.data)
                }
                else {
                    reject(response)
                }
            }, () => { })
        });
    }
};

const Tool = {
    dateFormat: function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    uuid: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    }
};

export function getTool() {
    return Tool;
}

export function getHttp() {
    return Http;
}


export function init(_title, _items, cb) {
    try {
        if (isSumslackEnv()) {
            if (typeof _items != "undefined") {
                sumslack.layoutNaviBar({ "title": _title, "items": _items });
            } else {
                sumslack.layoutNaviBar({ "title": _title });
            }
            if (config.Config.allowAnonymous){
                cb();
            }else{
                getUserInfo().then(user => {
                    config.Config.cUser = user;
                    sumslack.getAuthToken(function (ret) {
                        console.log("==========current token:", ret);
                        config.Config.token = ret;
                        if (typeof cb === "function") {
                            cb();
                        }
                    });
                });
            }
        } else {
            if (typeof cb === "function") {
                cb();
            }
        }
    } catch (e) {
        console.log(e);
    }
    return sumslack;
}
export function getConfig() {
    return config.Config;
}
export function getToken(cb) {
    if (isDev()) {

    }
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.getAuthToken(function (res) {
        if (typeof cb === "function") {
            cb(res);
        }
    });
}
export function isDev() {
    return config.Config.DEV;
}
export function login(cb) {
    if (isDev()) {
        cb({ code: config.Config.testCode });
        return;
    }
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.getAuthToken(function (token) {
        if (token === "\"{}\"") {
            cb({code:""});
        }else{
            sumslack.requestWebOauth({ 'code': token, 'clientId': config.AppID }, function (res) {
                if (typeof cb === "function") {
                    res = toJSON(res);
                    cb(res);
                }
            });
        }
    });
}
export function isSumslackEnv() {
    return (typeof sumslack.layoutNaviBar != "undefined");
}
export function layoutNaviBar(param) {
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.layoutNaviBar(param);
}
export function getSumslack() {
    return sumslack;
}
export function close() {
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.popViewController();
}


export function openNativeUI(param) {
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.pushViewController(param);
}

export function openProfile(uid) {
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.openProfile(uid);
}

export function makePhoneCall(phoneNumber) {
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.makePhoneCall({ 'phoneNumber': phoneNumber });
}

export function scanQrCode(cb) {
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.scan(function (ret) {
        if (typeof cb === "function") {
            cb(ret);
        }
    });
}

export function share(param, cb) {
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.shareWeixin({
        title: param.title || "标题",
        description: param.description || param.title,
        url: param.url,
        logo: param.logo || ""
    });
}

export function refresh() {
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.refresh();
}

export function previewImage(param) {
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.previewImage(param);
}

export function addGlobalEventListener(funcName, cb) {
    //globalEvent.removeEventListener(funcName);
    //toast("reg:"+funcName);
    globalEvent.addEventListener(funcName, function (e) {
        cb(e);
    });
}
/*
  avatar:头像地址
  nick:昵称
  departId:部门ID
  id:用户ID
  sex:性别
  name:用户名
  telphone:电话
 */
export function getUserInfo() {
    if (isDev()) {
        return new Promise((resolve) => {
            resolve(config.Config.testUser);
        });
    }
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    return new Promise((resolve) => {
        sumslack.getRunUserInfo(function (ret) {
            resolve(ret);
        });
    });
}

export function uploadFile(filepath, cb) {
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.uploadFile(function (ret) {
        cb(ret);
    });
}

export function showActionSheet(actionSheetParam, cb) {
    if (sumslack && isSumslackEnv()) {
        sumslack.showActionSheet(actionSheetParam, function (ret) {
            if (typeof cb === "function") {
                cb(ret);
            }
        });
    } else {
        alert(config.Config.notSupport);
    }
}

export function chooseLocation(cb) {
    if (sumslack && isSumslackEnv()) {
        sumslack.chooseLocation(function (ret) {
            if (typeof cb === "function") {
                cb(ret);
            }
        });
    } else {
        alert(config.Config.notSupport);
    }
}

export function openLocation(_lat, _lot, building, address) {
    if (sumslack && isSumslackEnv()) {
        sumslack.openLocation({ 'lat': _lat, 'lot': _lot, "building": building, "address": address });
    } else {
        alert(config.Config.notSupport);
    }
}

export function shareWeixin(title, url, description, logo) {
    if (sumslack && isSumslackEnv()) {
        if (typeof (logo) != "undefined")
            sumslack.shareWeixin({ 'title': title, 'description': description, "url": url, "logo": logo });
        else
            sumslack.shareWeixin({ 'title': title, 'description': description, "url": url });
    } else {
        alert(config.Config.notSupport);
    }
}
export function navigateToEmojiPanel(title, placeholder, pageId, params) {
    var _url = config.getPageUrl(pageId);
    if (typeof params === "object") {
        for (var k in params) {
            if (_url.indexOf("?") > 0) {
                _url += "&" + k + "=" + encodeURIComponent(params[k]);
            } else {
                _url += "?" + k + "=" + encodeURIComponent(params[k]);
            }
        }
    }
    _url = getBaseURL() + _url;
    if (sumslack && isSumslackEnv()) {
        sumslack.navigateToEmojiPanel({ 'url': _url, 'title': title, 'placeholder': placeholder });
    } else {
        alert(config.Config.notSupport);
    }
}
export function navigateTo(pageId, params) {
    var _url = config.getPageUrl(pageId);
    if (typeof params === "object") {
        for (var k in params) {
            if (_url.indexOf("?") > 0) {
                _url += "&" + k + "=" + encodeURIComponent(params[k]);
            } else {
                _url += "?" + k + "=" + encodeURIComponent(params[k]);
            }
        }
    }
    let _basepath = getBaseURL();
    _url = _basepath + _url;
    if (sumslack && isSumslackEnv()) {
        sumslack.navigateTo(_url);
    } else {
        navigator.push({
            url: _url,
            animated: "false"
        }, event => {

        });
    }


}

export function redirectTo(pageId, params) {
    var _url = config.getPageUrl(pageId);
    if (typeof params === "object") {
        for (var k in params) {
            if (_url.indexOf("?") > 0) {
                _url += "&" + k + "=" + encodeURIComponent(params[k]);
            } else {
                _url += "?" + k + "=" + encodeURIComponent(params[k]);
            }
        }
    }
    //console.log("======gotopage redirect:", _url);
    _url = getBaseURL() + _url;
    if (sumslack && isSumslackEnv()) {
        sumslack.redirectTo(_url);
    } else {
        alert(config.Config.notSupport);
    }
}

export function setTitle(title) {
    if (sumslack && isSumslackEnv()) {
        sumslack.setNavigationBarTitle(title);
    } else {
        alert(config.Config.notSupport);
    }
}

export function selectContact(selectContactParam, callback) {
    if (sumslack && isSumslackEnv()) {
        sumslack.selectContact(selectContactParam, function (ret) {
            callback(ret);
        });
    } else {
        alert(config.Config.notSupport);
    }
}

export function createGroup(group, callback) {
    if (sumslack && isSumslackEnv()) {
        sumslack.createGroup(group, function (ret) {
            callback(ret);
        });
    } else {
        alert(config.Config.notSupport);
    }
}
export function getLocation(cb) {
    if (sumslack && isSumslackEnv()) {
        sumslack.getLocation(function (ret) {
            cb(toJSON(ret));
        });
    } else {
        alert(config.Config.notSupport);
    }
}

export function chooseImage(count, type, cb) {
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.chooseImage(count, type, function (ret) {
        if (typeof cb === 'function') {
            cb(ret);
        }
    });
}
export function uploadImage(filePath, cb) {
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.uploadFile(filePath, function (data) {
        if (typeof cb === 'function') {
            cb(data);
        }
    });
}
export function downloadFile(url, cb) {
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.downloadFile(url, function (data) {
        if (typeof cb === 'function') {
            cb(data);
        }
    });
}

export function picker(fmt, param, cb) {
    let type = 0;
    if (fmt === 'MMddhhmm' || fmt === 'mmddhhii') type = 1;
    else if (fmt === 'yyyyMMdd' || fmt === 'yyyymmdd') type = 2;
    else if (fmt === "MMdd" || fmt === "mmdd") type = 3;
    else if (fmt === 'hhmm' || fmt === 'hhii') type = 4;
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.pickDateTime({
        'type': type,
        'min': param.min || "",
        'max': param.max || "",
        'current': param.current || ""
    }, function (data) {
        if (typeof cb === "function") {
            cb(data);
        }
    });
}
export function request(url, param) {
    return new Promise((resolve) => {
        Http.fetch(url, param).then(data => {
            resolve(data);
        });
    });
}
export function sendMessage(type, typeId, msg) {
    if (!isSumslackEnv()) {
        alert(config.Config.notSupport);
        return;
    }
    sumslack.sendMessage(type, typeId, msg);
}
export function confirm(msg, cb) {
    modal.confirm({
        message: msg,
        duration: 0.3
    }, function (value) {
        cb(value);
    });
}

export function toast(msg) {
    modal.toast({ message: msg });
}
export function setClipboardData(msg) {
    clipboard.setString(msg);
}
export function getClipboardData(cb) {
    clipboard.getString(function (ret) {
        cb(ret);
    });
}
export function print(obj) {
    if (typeof obj === "object") {
        return JSON.stringify(obj);
    } else {
        return obj;
    }
}
export function log(s, s2, s3) {
    if (typeof (s3) != "undefined")
        console.log("***sumslack log***", s, s2, s3);
    else if (typeof (s2) != "undefined") {
        console.log("***sumslack log***", s, s2);
    } else {
        console.log("***sumslack log***", s);
    }
}
export function toJSON(obj) {
    if (typeof obj === "string") {
        if ((obj.substring(0, 1) === "{") && (obj.substring(obj.length - 1, obj.length) === "}")) {
            return JSON.parse(obj);
        } else {
            return obj;
        }
    } else {
        return obj;
    }
}
export function alert(msg) {
    modal.alert({
        message: msg,
        duration: 0.3
    });
}

export function clearStorage() {
    storage.getAllKeys(event => {
        if (event.result === 'success') {
            if (event.data && event.data.length > 0) {
                for (var index in event.data) {
                    storage.removeItem(event.data[index], event => {
                        console.log('delete value:', event.data[index]);
                    });
                }
            }
        }
    });
}

export function setStorage(key, value, cb) {
    if (typeof value == "object") {
        value = JSON.stringify(value);
    }
    storage.setItem(key, value, function (e) {
        if (typeof cb === "function") {
            cb(e);
        }
    });
}

export function removeStorage(key, cb) {
    storage.removeItem(key, value, function (e) {
        if (typeof cb === "function") {
            cb(e);
        }
    });
}

export function getStorage(key, cb, err) {
    storage.getItem(key, function (e) {
        if (e.result === "success") {
            if (typeof cb === "function") {
                cb(toJSON(e.data));
            }
        } else {
            if (typeof err === "function") {
                err(e);
            }
        }
    });
}

export function prompt(msg, cb) {
    modal.prompt({
        message: msg,
        duration: 0.3
    }, function (value) {
        cb(value);
    })
}

export function niceTime(time_stamp) {
    time_stamp = time_stamp / 1000;
    var now_d = new Date();
    var now_time = now_d.getTime() / 1000; //获取当前时间的秒数
    var f_d = new Date();
    f_d.setTime(time_stamp * 1000);
    var f_time = f_d.toLocaleDateString();

    var ct = now_time - time_stamp;
    var day = 0;
    if (ct < 0) {
        f_time = dateFormat(f_d, "yyyy-MM-dd hh:mm");
    }
    else if (ct < 5) {
        f_time = '刚刚';
    }
    else if (ct < 60) {
        f_time = Math.floor(ct) + '秒前';
    }
    else if (ct < 3600) {
        f_time = Math.floor(ct / 60) + '分钟前';
    }
    else if (ct < 86400)//一天
    {
        f_time = Math.floor(ct / 3600) + '小时前';
    }
    else if (ct < 604800)//7天
    {
        day = Math.floor(ct / 86400);
        if (day < 2)
            f_time = '昨天';
        else
            f_time = day + '天前';
    }
    else {
        day = Math.floor(ct / 86400);
        f_time = day + '天前';
    }
    return f_time;
}

export function dateFormat(date, fmt) {
    if (typeof (date) === "number") {
        date = new Date(date);
    }
    var o = {
        "y+": date.getFullYear(),
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S+": date.getMilliseconds()             //毫秒
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            if (k == "y+") {
                fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
            }
            else if (k == "S+") {
                var lens = RegExp.$1.length;
                lens = lens == 1 ? 3 : lens;
                fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
            }
            else {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
    }
    return fmt;
}
