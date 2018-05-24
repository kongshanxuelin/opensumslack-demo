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
    
    var bundleUrl = weex.config.bundleUrl;
    var nativeBase;
    var isAndroidAssets = weex.config.env.platform.toLowerCase().indexOf("android") >= 0;
    var isiOSAssets = weex.config.env.platform.toLowerCase().indexOf("ios") >= 0;

    if (isAndroidAssets && (bundleUrl.indexOf("http://") != 0 && bundleUrl.indexOf("https://") != 0)) {
        nativeBase = 'file://assets/';
    }else if (isiOSAssets && (bundleUrl.indexOf("http://") != 0 && bundleUrl.indexOf("https://") != 0)) {
        // file:///var/mobile/Containers/Bundle/Application/{id}/WeexDemo.app/
        // file:///Users/{user}/Library/Developer/CoreSimulator/Devices/{id}/data/Containers/Bundle/Application/{id}/WeexDemo.app/
        //nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
        nativeBase = 'file://assets/';
    }else{
        nativeBase = bundleUrl.split('/').slice(0, -1).join('/') + '/';
    }
    return nativeBase;
    
}