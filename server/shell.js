const process = require("child_process")

const _exec = function(shell) {
  return new Promise((resolve, reject) => {
    process.exec(shell, (error, stdout, stderr) => {
      if (error) {
        console.error(`错误： ${error}`)
        reject(error)
      }
      if (!error) {
        console.log(`成功：${stdout}`)
        resolve(stdout)
      }
      console.log(`错误：${stderr}`)
      reject(error)
    })
  })
}

_exec(
  "cat ./public/static/config/maotang.json && git add . && git commit -m 'fixed' && git push"
).then(res => {
  console.log(res)
})
