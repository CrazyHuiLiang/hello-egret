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

    let setTimeoutCache: any = {};
    let setTimeoutIndex: number = 0;

    let setTimeoutCount: number = 0;
    let lastTime: number = 0;
    /**
     * Run the designated function in specified delay (in milliseconds).
     * @param listener {Function} Listener function
     * @param thisObject {any} this object
     * @param delay {number} Delay time, in milliseconds
     * @param ...args {any} Parameter list
	 * @returns {number} Return index which can be used for clearTimeout
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/game/utils/setTimeout.ts
     * @language en_US
     */
    /**
     * ?????????????????????????????????????????????????????????????????????
     * @param listener {Function} ????????????
     * @param thisObject {any} this??????
     * @param delay {number} ?????????????????????????????????
     * @param ...args {any} ????????????
	 * @returns {number} ??????????????????????????? clearTimeout
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/game/utils/setTimeout.ts
     * @language zh_CN
     */
    export function setTimeout<Z>(listener: (this: Z, ...arg) => void, thisObject: Z, delay: number, ...args): number {
        let data = { listener, thisObject, delay: delay, params: args };

        setTimeoutCount++;
        if (setTimeoutCount == 1 && ticker) {
            lastTime = egret.getTimer();
            ticker.$startTick(timeoutUpdate, null);
        }

        setTimeoutIndex++;
        setTimeoutCache[setTimeoutIndex] = data;
        return setTimeoutIndex;
    }

    /**
     * Function run after the specified delay is cleared.
     * @param key {number} Index that egret.setTimeout returns
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * ???????????????????????????????????????
     * @param key {number} egret.setTimeout??????????????????
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    export function clearTimeout(key: number): void {
        if (setTimeoutCache[key]) {
            setTimeoutCount--;
            delete setTimeoutCache[key];

            if (setTimeoutCount == 0 && ticker) {
                ticker.$stopTick(timeoutUpdate, null);
            }
        }

    }

    /**
     * @private
     * 
     * @param dt 
     */
    function timeoutUpdate(timeStamp: number): boolean {
        let dt: number = timeStamp - lastTime;
        lastTime = timeStamp;

        for (let key in setTimeoutCache) {
            let key2: any = key;
            let data = setTimeoutCache[key2];
            data.delay -= dt;
            if (data.delay <= 0) {
                clearTimeout(<number>key2);
                data.listener.apply(data.thisObject, data.params);
            }
        }

        return false;
    }
}
