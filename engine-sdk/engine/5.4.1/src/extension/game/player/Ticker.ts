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
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/game/player/Ticker.ts
     * @language en_US
     */
    /**
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/game/player/Ticker.ts
     * @language zh_CN
     */
    export class Ticker extends EventDispatcher {
        /**
         * @deprecated
         * @version Egret 2.4
         * @platform Web,Native
         */
        public constructor() {
            super();
            if (Ticker.instance != null) {
                if (DEBUG) {
                    egret.$error(1033);
                }
            }

            ticker.$startTick(this.update, this);

            this._lastTime = egret.getTimer();
        }

        private _timeScale:number = 1;
        private _paused:boolean = false;

        private _callIndex:number = -1;
        private _callList:any[];
        private _lastTime:number = 0;
        private update(timeStamp:number):boolean {
            let advancedTime:number = timeStamp - this._lastTime;
            this._lastTime = timeStamp;

            if (this._paused){
                return false;
            }
            let frameTime:number = advancedTime * this._timeScale;

            this._callList = this.callBackList.concat();
            this._callIndex = 0;
            for (; this._callIndex < this._callList.length; this._callIndex++) {
                let eventBin:any = this._callList[this._callIndex];
                eventBin.listener.call(eventBin.thisObject, frameTime);
            }

            this._callIndex = -1;
            this._callList = null;

            return false;
        }

        private callBackList:any[] = [];
        /**
         * ?????????????????????????????????????????????????????????????????????????????? egret.startTick ??????????????????
         * @method egret.Ticker#register
         * @param listener {Function} ???????????????,?????????????????????????????????????????????????????????onEnterFrame(frameTime:number):void
         * @param thisObject {any} ??????????????????this??????
         * @param priority {number} ??????????????????????????????????????? Number.NEGATIVE_INFINITY ??? Number.POSITIVE_INFINITY
         * @version Egret 2.4
         * @platform Web,Native
         * @deprecated
         */
        public register(listener:Function, thisObject:any, priority:number = 0):void {
            this.$insertEventBin(this.callBackList, "", listener, thisObject, false, priority, false);
        }

        /**
         * ????????????enterFrame????????????????????? egret.stopTick ??????????????????
         * @method egret.Ticker#unregister
         * @param listener {Function} ??????????????????
         * @param thisObject {any} ???????????????this??????
         * @version Egret 2.4
         * @platform Web,Native
         * @deprecated
         */
        public unregister(listener:Function, thisObject:any):void {
            this.$removeEventBin(this.callBackList, listener, thisObject);
        }

        /**
         * @deprecated
         * @param timeScale {number}
         * @private
         */
        public setTimeScale(timeScale:number):void {
            this._timeScale = timeScale;
        }

        /**
         * @deprecated
         * @method egret.Ticker#getTimeScale
         * @private
         */
        public getTimeScale():number {
            return this._timeScale;
        }

        /**
         * ??????
         * @deprecated
         * @method egret.Ticker#pause
         */
        public pause():void {
            this._paused = true;
        }

        /**
         * ??????
         * @deprecated
         * @method egret.Ticker#resume
         */
        public resume():void {
            this._paused = false;
        }

        /**
         * @private
         */
        private static instance:egret.Ticker;

        /**
         * @method egret.Ticker.getInstance
         * @returns {Ticker}
         * @version Egret 2.4
         * @platform Web,Native
         * @deprecated
         */
        public static getInstance():egret.Ticker {
            if (Ticker.instance == null) {
                Ticker.instance = new Ticker();
            }
            return Ticker.instance;
        }
    }

}
