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

class Main extends eui.UILayer {

    private textfield: egret.TextField;

    constructor() {
        super();
        console.log('%cMain constructor\n', 'color: #f0f', this);

        this.registerAppLifecycle();
    }

    // example: UILayer life cycle
    protected async createChildren(): Promise<void> {
        super.createChildren();

        console.log('createChildren');

        //inject the custom material parser
        //?????????????????????????????????
        this.registerAdapter();

        await this.loadResource();
        this.addShape();
        this.createGameScene();

        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);

        
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log("userInfo", userInfo);
    }

    // example: UILayer life cycle
    protected childrenCreated(): void {
        super.createChildren();
        console.log('childrenCreated');
    }

    // example: app life cycle
    private registerAppLifecycle(): void {
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            console.log('lifecycle', context);
        })

        // ????????????
        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
            console.log('????????????');
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
            console.log('????????????');
        }
    }

    // example: register adapter
    // TODO: check purpose
    private registerAdapter(): void {
        console.log('before registerImplementation');
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        console.log('after registerImplementation');
    }


    // example: load resource and add/remove sprite to stage
    // TODO RES.load* ?????????????????????????????????????????????
    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);

            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, e => {
                console.log('RES.ResourceEvent.CONFIG_COMPLETE\n', e);
            }, this);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    // example: grachic shape
    private addShape(): void {
        console.log('addShape');
        
        const shape: egret.Shape = new egret.Shape();
        shape.x = 80;
        shape.y = 320;
        shape.anchorOffsetX = 50;
        shape.anchorOffsetY = 100;
        
        shape.graphics.beginFill(0x0000ff);
        shape.graphics.drawRect(0, 0, 50, 50);
        shape.graphics.endFill();
        shape.graphics.beginFill(0x0000ff);
        shape.graphics.drawRect(50, 50, 50, 50);
        shape.graphics.endFill();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.drawRect(50, 0, 50, 50);
        shape.graphics.endFill();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.drawRect(0, 50, 50, 50);
        shape.graphics.endFill();

        this.stage.addChild(shape);
    }

    // example: ????????????
    // TODO: detect porpose
    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //??????????????????????????????,??????????????????????????????????????????????????????
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, resolve, this);
        })
    }

    /**
     * ??????????????????
     * Create scene interface
     */
    protected createGameScene(): void {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        let line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret???I'm comming!";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        let textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 1;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.text = "I'm a Text Field"
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        let button = new eui.Button();
        button.label = "showDialog";
        button.horizontalCenter = 0;
        // button.verticalCenter = 0;
        button.top = 220;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDialog, this);
    }
    /**
     * ??????name?????????????????????Bitmap?????????name???????????????resources/resource.json????????????????????????
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * ?????????????????????????????????????????????
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        console.log('startAnimation\n', result);
        
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // ??????????????????
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }

    /**
     * ????????????
     * Click the button
     */
    private showDialog(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "I'm a eui.Panel";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }
}
