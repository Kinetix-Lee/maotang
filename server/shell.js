const process = require("child_process")

const _exec = function(shell, isHidden = false) {
  return new Promise((resolve, reject) => {
    process.exec(shell, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        if (!isHidden) console.log(stdout)
        resolve(stdout)
      }
    })
  })
}

// _exec("git init && git add . && git commit -m 'fixed' && git push")
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.log(err)
//   })

const main = async function() {
  await _exec("git init")
  await _exec("git add .")
  await _exec("git commit -m 'fixed'")
  await _exec("git push gitee master")
}

main()
