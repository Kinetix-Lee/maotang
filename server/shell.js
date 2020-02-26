const process = require("child_process")
let config = {}

const _exec = function(shell, isHidden = false) {
  return new Promise((resolve, reject) => {
    process.exec(shell, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        if (!isHidden) console.log(stdout)
        if (stderr) console.log(stderr)
        resolve(stdout)
      }
    })
  })
}

const main = async function() {
  try {
    config = await _exec("cat ./public/static/config/maotang.json", true)
    config = JSON.parse(config)
    await _exec("git pull gitee master && sudo yarn build")
  } catch (err) {
    
  }
}

main()
