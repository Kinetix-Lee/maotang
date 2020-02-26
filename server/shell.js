const process = require("child_process")

const _exec = function(shell) {
  return new Promise((resolve, reject) => {
    process.exec(shell, (error, stdout, stderr) => {
      if (error) {
        console.error(`错误：${error}`)
        reject(error)
      } else {
        console.log(`成功：${stdout}`)
        resolve(stdout)
      }
    })
  })
}

process.exec(
  "cat ./public/static/config/maotang.json && git add . && git commit -m 'fixed' && git push",
  (error, stdout, stderr) => {
    if (error) {
      console.error(`错误： ${error}`)
    }
    if (!error) {
      console.log(`成功：${stdout}`)
    }
    console.log(`错误：${stderr}`)
  }
)

_exec("echo 1")
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
