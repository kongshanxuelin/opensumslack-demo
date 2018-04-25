/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
exports.getBaseURL = function () {
    // if(true){
    //    return "http://192.168.1.154:8081/";
    // }

    var bundleUrl = weex.config.bundleUrl;
    //去除应用名
    if (bundleUrl.indexOf("http://") == 0 || bundleUrl.indexOf("https://")==0){
        if (bundleUrl.indexOf("http://")==0){
            bundleUrl = bundleUrl.substring("http://".length, bundleUrl.length);
            bundleUrl = "http://" + bundleUrl.substring(0, bundleUrl.indexOf("/") + 1)
        } else if (bundleUrl.indexOf("https://") == 0) {
            bundleUrl = bundleUrl.substring("https://".length, bundleUrl.length);
            bundleUrl = "https://" + bundleUrl.substring(0, bundleUrl.indexOf("/") + 1)
        }
    }
    console.log("********bundleUrl*************:",bundleUrl);
    var nativeBase;
    var isAndroidAssets = weex.config.env.platform.toLowerCase().indexOf("android")>=0;
    var isiOSAssets = weex.config.env.platform.toLowerCase().indexOf("ios")>=0;
    if (isAndroidAssets) {
        nativeBase = 'file://assets/';
    }
    else if (isiOSAssets) {
        // file:///var/mobile/Containers/Bundle/Application/{id}/WeexDemo.app/
        // file:///Users/{user}/Library/Developer/CoreSimulator/Devices/{id}/data/Containers/Bundle/Application/{id}/WeexDemo.app/
        nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
    }
    else {
        var host = 'localhost:12580';
        var matches = /\/\/([^\/]+?)\//.exec(weex.config.bundleUrl);
        if (matches && matches.length >= 2) {
            host = matches[1];
        }
        //nativeBase = 'http://' + host + '/' + vm.dir + '/build/';
        nativeBase = 'http://' + host + '/';
    }
    // in Native
    var base = nativeBase;
    if (typeof window === 'object') {
        // in Browser or WebView
        //var h5Base = './vue.html?page=./' + vm.dir + '/build/';
        var h5Base = "http://192.168.1.154:8081/?hot-reload_controller&loader=xhr&wsport=8082&type=vue&page=";
        base = h5Base;
    }
    console.log("********base*************:",base);
    return base
}