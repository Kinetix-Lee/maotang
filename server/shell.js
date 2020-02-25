const process = require("child_process")

process.exec(
  "cat ./public/static/config/maotang.json && git add . && git commit -m 'fixed' && git push",
  (error, stdout, stderr) => {
    if (error) {
      console.error(`执行出错: ${error}`)
      return
    }
    console.log(`${stdout}`)
    console.log(`${stderr}`)
  }
)
