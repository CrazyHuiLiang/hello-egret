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
      * Check whether a public definition exists in the specified application domain. The definition can be that of a class, a naming space or a function.
      * @param name {string} Name of the definition.
	  * @returns {boolean} Whether the public definition exists
      * @example
      * egret.hasDefinition("egret.DisplayObject") //return true
      * @version Egret 2.4
      * @platform Web,Native
      * @includeExample egret/utils/hasDefinition.ts
      * @language en_US
      */
     /**
      * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
      * @param name {string} ??????????????????
	  * @returns {boolean} ????????????????????????
      * @example
      * egret.hasDefinition("egret.DisplayObject") //?????? true
      * @version Egret 2.4
      * @platform Web,Native
      * @includeExample egret/utils/hasDefinition.ts
      * @language zh_CN
      */
    export function hasDefinition(name:string):boolean{
        let definition:any = getDefinitionByName(name);
        return definition?true:false;
    }
}