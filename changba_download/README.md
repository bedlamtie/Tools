## changba_download

> 描述

通过唱吧作者ID批量下载该作者作品（仅供个人学习使用）

通过网页（ http://changba.com/ ）获取到作品的下载地址进行解密下载（解密部分提取自/s/user_work_jplayer.js）
下载完成后使用ffmpeg.exe写入作品名，作者名。（后续可能会写入专辑图片）

ffmetadata

ffmpeg-static：https://github.com/eugeneware/ffmpeg-static

ffmpeg下载参考：https://github.com/eugeneware/ffmpeg-static/blob/master/build/index.sh



**获取作者ID**

* 网页端 “关注按钮” 元素审查 data-userid属性
* 网页端 作者主页（通过关注可以进）“关注按钮”  或 script标签里：var userid = 'xxx';

> 安装依赖

```shell
#npm
npm install
#yarn
yarn
```

**关于 utils/ffmpeg.exe**

* 用于对作品的作品的metadata进行读写，详情：src/index.js setFileMetaData()

> 使用

------

**下载指定作者全部作品**

1. 填写作者ID，作者名

   download.config.js => L4-5

   ```js
   // eg
   
   /**
    * authorID: 'xxx',
    * authorName: 'xxxx',
    */
   ```

2. 运行

    ```shell
    # node
    node .\index.js
    # npm
    npm run start
    # yarn
    yarn start
    ```

------

**下载指定作品**

​	index.js => func：downloadSong()

------

**下载指定作者指定页数作品**

​	index.js => func：start()

