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
     * The ColorMatrixFilter class lets you apply a 4 x 5 matrix transformation on the RGBA color and alpha values of every pixel in the input image to produce a result with a new set of RGBA color and alpha values.
     * It allows saturation changes, hue rotation, luminance to alpha, and various other effects.
     * @version Egret 3.1.0
     * @platform Web
     * @see http://edn.egret.com/cn/docs/page/947 ??????????????????
     * @language en_US
     */
    /**
     * ?????? ColorMatrixFilter ???????????? 4 x 5 ?????????????????????????????????????????????????????? RGBA ????????? Alpha ????????????????????????????????? RGBA ????????? Alpha ???????????????
     * ?????????????????????????????????????????????????????? Alpha ???????????????????????????
     * @version Egret 3.1.0
     * @platform Web
     * @see http://edn.egret.com/cn/docs/page/947 ??????????????????
     * @language zh_CN
     */
    export class ColorMatrixFilter extends Filter {
        /**
         * @private
         */
        public $matrix:number[] = [];
        /**
         * @private
         */
        private matrix2:number[] = [];

        /**
         * Initializes a ColorMatrixFilter object.
         * @version Egret 3.1.0
         * @platform Web
         * @language en_US
         */
        /**
         * ???????????? ColorMatrixFilter ?????????
         * @version Egret 3.1.0
         * @platform Web
         * @language zh_CN
         */
        constructor(matrix:number[] = null) {
            super();
            this.type = "colorTransform";
            this.$uniforms.matrix = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
            this.$uniforms.colorAdd = {x: 0, y: 0, z: 0, w: 0};
            this.setMatrix(matrix);
            this.onPropertyChange(); 
        }

        /**
         * A comma delimited list of 20 doubles that comprise a 4x5 matrix applied to the rendered element.
         * The matrix is in row major order -- that is, the first five elements are multipled by the vector [srcR,srcG,srcB,srcA,1] to determine the output red value, the second five determine the output green value, etc.
         * The value must either be an array or comma delimited string of 20 numbers.
         * @version Egret 3.1.0
         * @platform Web
         * @language en_US
         */
        /**
         * ?????????????????????????????????????????? 4x5 ?????????????????????????????? 20 ???????????????????????????
         * ???????????????????????????????????????????????????????????????????????? [srcR,srcG,srcB,srcA,1] ?????????????????????????????????????????????????????????????????????????????????????????????
         * ??????????????? 20 ?????????????????????????????????????????????????????????
         * @version Egret 3.1.0
         * @platform Web
         * @language zh_CN
         */
        public get matrix():number[] {
            for (let i = 0; i < 20; i++) {
                this.matrix2[i] = this.$matrix[i];
            }
            return this.matrix2;
        }

        public set matrix(value:number[]) {
            this.setMatrix(value);
        }

        /**
         * @private
         */
        private setMatrix(value:number[]):void {
            if(value) {
                for (let i = 0; i < 20; i++) {
                    this.$matrix[i] = value[i];
                } 
            } else {
                for (let i = 0; i < 20; i++) {
                    this.$matrix[i] = (i == 0 || i == 6 || i == 12 || i == 18) ? 1 : 0;
                } 
            }

            let $matrix = this.$matrix;
            let matrix = this.$uniforms.matrix;
            let colorAdd = this.$uniforms.colorAdd;

            for(let i = 0, j = 0; i < $matrix.length; i++) {
                if(i === 4) {
                    colorAdd.x = $matrix[i] / 255;
                } else if(i === 9) {
                    colorAdd.y = $matrix[i] / 255;
                } else if(i === 14) {
                    colorAdd.z = $matrix[i] / 255;
                } else if(i === 19) {
                    colorAdd.w = $matrix[i] / 255;
                } else {
                    matrix[j] = $matrix[i];
                    j++;
                }
            }
            this.onPropertyChange();
        }

        /**
         * @private
         */
        public $toJson():string {
            return '{"matrix": [' + this.$matrix.toString() + ']}';
        }
    }
}