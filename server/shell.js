const process = require("child_process")

const _exec = function(shell) {
  return new Promise((resolve, reject) => {
    process.exec(shell, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve(stdout)
      }
    })
  })
}

_exec("git init && git add . && git commit -m 'fixed' && git push")
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
