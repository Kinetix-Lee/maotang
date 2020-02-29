Node.js 写个简单的七牛云上传命令行工具

### 0.成品

效果大概就是这样啦，这张图正是用这个小工具上传的：

![][1]

### 1.代码

#### 1.1 `package.json`，可以参考

```json
{
  "name": "qiniu-uploader",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "clear && node ."
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "commander": "^4.1.1",
    "fs": "^0.0.1-security",
    "inquirer": "^7.0.5",
    "path": "^0.12.7",
    "qiniu": "^7.3.0"
  },
  "bin": {
    "qiniu": "./index.js"
  }
}
```

#### 1.2 `index.js`

```js
#!usr/bin/env node

const { upload, options, uploadDir, formatOutput } = require("./module/qiniu")
const inquirer = require("inquirer")
const path = require("path")
const fs = require("fs")

const main = async function() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      message: "* 请选择上传类型",
      validate: function(input) {
        return !input ? "目录不能为空" : true
      },
      name: "type",
      choices: ["图片", "文章", "音、视频", "代码"]
    },
    {
      type: "input",
      name: "file",
      message: "* 请拖拽文件或目录",
      validate: function(input) {
        return !input ? "目录不能为空" : true
      }
    },
    {
      type: "input",
      name: "fdir",
      message: "请输入分类（可空）",
      validate: function(input) {
        input = input.replace(new RegExp(" ", "g"), "")
        return true
      }
    }
  ])

  const file = answers.file.replace(" ", "")
  const fdir = answers.fdir || ""
  const typeList = {
    图片: "image",
    "音、视频": "audio",
    文章: "article",
    代码: "code"
  }
  const ftyle = typeList[answers.type]

  console.log(ftyle)

  if (!fs.existsSync(file)) {
    console.log("文件或目录不存在")
    return
  }
  const stat = fs.lstatSync(file)
  if (!stat.isDirectory()) {
    let res = await upload(file, fdir)
    formatOutput(res, options.host)
  } else {
    // 目录
    const dir = fs
      .readdirSync(file)
      .map(item =>
        ((file.substr(-1) == "/" ? file : file + "/") + item).replace(
          /\/\//g,
          "/"
        )
      )
      .filter(item => options.fileType.image.includes(path.extname(item)))

    if (!dir.length) {
      console.log("当前目录下没有合适的文件")
    } else {
      await uploadDir(dir, fdir)
    }
  }
}

main()
```

#### 1.3 `module/qiniu.js`

```js
const qiniu = require("qiniu")
const path = require("path")

const OPT = {
  host: "https://img.meek3n.cn/",
  ak: "你的 AK",
  sk: "你的 SK",
  zone: qiniu.zone.Zone_z2, // 这里需要换成自己的服务器空间
  bucket: "你的 bucket",
  fileType: {
    image: [".jpg", ".gif", ".png", ".jpeg"],
    article: [".md", ".txt", ".json"],
    audio: [".ogg", ".mp3", ".mp4", ".webm"],
    code: [".js", ".css", ".htm", ".html"]
  }
}

let mac = new qiniu.auth.digest.Mac(OPT.ak, OPT.sk)

let options = {
  scope: OPT.bucket
}

let putPolicy = new qiniu.rs.PutPolicy(options)
let uploadToken = putPolicy.uploadToken(mac)
let config = new qiniu.conf.Config()
let formUploader = new qiniu.form_up.FormUploader(config)
let putExtra = new qiniu.form_up.PutExtra()

config.zone = OPT.zone

const upload = function(fpath, fdir = "") {
  return new Promise(resolve => {
    if (fpath.substr(-1) == " ") fpath = fpath.substr(0, fpath.length)
    let fname = path.basename(fpath)
    if (fdir) {
      fname = fdir + "/" + fname
    }
    // 文件上传
    formUploader.putFile(uploadToken, fname, fpath, putExtra, function(
      respErr,
      respBody,
      respInfo
    ) {
      if (respErr) {
        resolve({
          err: true,
          res: respErr
        })
      }
      if (respInfo.statusCode == 200) {
        resolve({
          err: false,
          res: respBody
        })
      } else {
        resolve({
          err: true,
          res: respBody
        })
      }
    })
  })
}

const formatOutput = function({ err, res }, host) {
  if (err) {
    console.log("\x1b[91m", host + res.key)
  } else {
    console.log("\x1B[36m%s\x1B[0m", host + res.key)
  }
}

const uploadDir = async function(dir, fdir = "") {
  for (let i = 0; i < dir.length; i++) {
    let res = await upload(dir[i], fdir)
    formatOutput(res, OPT.host)
  }
}

module.exports = {
  upload,
  uploadDir,
  formatOutput
  options: OPT
}

```

### 2.运行

```shell
$ npm run start # 或者直接 node .
```

如你所见，`package.json` 里配置了 `bin`。如果需要直接在命令行中输入 `qiniu` 启动这个工具，需要使用 `npm link` 一下，关于这个，网上有很多资料。

[1]: https://img.meek3n.cn/blog/qiniu-uploader.png
