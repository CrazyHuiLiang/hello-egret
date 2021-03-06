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


namespace eui {

	/**
	 * The CheckBox component consists of an optional label and a small box
	 * that can contain a check mark or not.<p/>
	 *
	 * When a user clicks a CheckBox component or its associated text,
	 * the CheckBox component sets its <code>selected</code> property
	 * to <code>true</code> for checked, and to <code>false</code> for unchecked.
	 *
	 * @version Egret 2.4
	 * @version eui 1.0
	 * @platform Web,Native
     * @includeExample extension/eui/components/CheckboxExample.ts
	 * @language en_US
	 */
	/**
	 * CheckBox ???????????????????????????????????????????????????????????????????????????/????????????????????????<p/>
	 * ???????????? CheckBox ??????????????????????????????CheckBox ??????????????? selected ??????????????? true????????????????????? false???????????????????????????
	 *
	 * @version Egret 2.4
	 * @version eui 1.0
	 * @platform Web,Native
     * @includeExample extension/eui/components/CheckboxExample.ts
	 * @language zh_CN
	 */
	export class CheckBox extends ToggleButton{
		/**
		 * Constructor.
		 * @version Egret 2.4
		 * @version eui 1.0
		 * @platform Web,Native
		 * @language en_US
		 */
		/**
		 * ????????????CheckBox
		 * @version Egret 2.4
		 * @version eui 1.0
		 * @platform Web,Native
		 * @language zh_CN
		 */
		public constructor(){
			super();
		}
	}

}