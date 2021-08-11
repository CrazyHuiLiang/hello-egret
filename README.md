# 学习Egret

### engin-sdk

版本 5.4.1


### 运行

使用本地engine-sdk

```
$ PATH="$(pwd)/engine-sdk/engine/5.4.1/tools/bin":$PATH
```


```
npx cross-env EGRET_PATH="./engine-sdk/engine/5.4.1" egret run -a
npx cross-env EGRET_PATH="./engine-sdk/engine/5.4.1" ./engine-sdk/engine/5.4.1/tools/bin/egret run -a 
```

### 发布

```
npx cross-env EGRET_PATH="./engine-sdk/engine/5.4.1" egret publish --version 1.2
```

### 目录结构

* bin-debug  供程序调试的文件
* bin-release 程序发布时的目录
* engine-sdk 将egret引擎放置于工程，方便CI工具使用
* libs       工程使用的库
* resource
    * assets 素材
    * config ?
    * eui_skins 皮肤文件
    * default.res.json ?
    * default.thm.json ?
* scripts 构建和发布时会用到的脚本
* src     源代码
* template 项目模板代码
* egretProperties.json [项目配置文件](https://docs.egret.com/engine/docs/projectConfig/configFile)
* index.html 模板（项目运行时使用的模板是template，这里的模板仅是一个示例）
* manifest.json  网页清单？
