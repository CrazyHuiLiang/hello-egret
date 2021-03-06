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
	export interface HttpRequest{
		addEventListener<Z>(type: "ioError"
			, listener: (this: Z, e: IOErrorEvent) => void, thisObject: Z, useCapture?: boolean, priority?: number);
		addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number);
	}
	/**
	 * @classdesc IO??????????????????????????????????????????????????????????????? IOErrorEvent ?????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/IOErrorEvent.ts
     * @language en_US
	 */
	/**
	 * @classdesc IO??????????????????????????????????????????????????????????????? IOErrorEvent ?????????
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/IOErrorEvent.ts
     * @language zh_CN
	 */
    export class IOErrorEvent extends Event{

		/**
         * io error
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
		 */
		/**
         * io????????????
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
		 */
        public static IO_ERROR:"ioError" = "ioError";

		/**
         * Create a egret.IOErrorEvent objects
         * @param type {string} Type of event, accessible as Event.type.
         * @param bubbles {boolean} Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable {boolean} Determine whether the Event object can be canceled. The default value is false.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
		 */
		/**
         * ???????????? egret.IOErrorEvent ??????
         * @param type {string} ?????????????????????????????? Event.type ?????????
         * @param bubbles {boolean} ?????? Event ????????????????????????????????????????????????????????? false???
         * @param cancelable {boolean} ???????????????????????? Event ????????????????????? false???
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
		 */
        public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false){
            super(type,bubbles,cancelable);
        }

        /**
         * EventDispatcher object using the specified event object thrown Event. The objects will be thrown in the object cache pool for the next round robin.
		 * @param target {egret.IEventDispatcher} Distribute event target
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * ???????????????EventDispatcher???????????????Event????????????????????????????????????????????????????????????????????????????????????
		 * @param target {egret.IEventDispatcher} ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static dispatchIOErrorEvent(target:IEventDispatcher):boolean {
            let event:IOErrorEvent = Event.create(IOErrorEvent, IOErrorEvent.IO_ERROR);
            let result = target.dispatchEvent(event);
            Event.release(event);
            return result;
        }
    }
}