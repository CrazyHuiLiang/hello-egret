//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

namespace egret {
    /**
     * h5 and native interaction.
     * @see http://edn.egret.com/cn/article/index/id/714 Egret basic skills to communicate with Native
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/external/ExternalInterface.ts
     * @language en_US
     */
    /**
     * h5???native?????????
     * @see http://edn.egret.com/cn/article/index/id/714 Egret ??? Native ??????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/external/ExternalInterface.ts
     * @language zh_CN
     */
    export interface ExternalInterface {

    }

    export let ExternalInterface: {
        /**
         * Call functionName, and the value passed to the native.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ?????? functionName?????????value?????????native??????
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        call(functionName:string, value:string):void;

        /**
         * FunctionName callback listener, you need to have to call functionName this field in native rather than such a call.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ?????? functionName ??????????????????native???????????? functionName ???????????????????????? ?????????call???
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        addCallback(functionName:string, listener:(value:string)=>void):void
    };
}