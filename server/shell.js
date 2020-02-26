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
  config = await _exec("cat ./public/static/config/maotang.json", true)
  config = JSON.parse(config)
  await _exec("cd ./public/static/article")
  await _exec("git init")
  await _exec("git add .")
  await _exec(
    `git commit -m '${
      config.origin.username
    }提交于${new Date().toLocaleString()}'`
  )
  await _exec(`git remote add origin ${config.origin.repo}`)
  await _exec(`git push -u origin master`)
  // await _exec("git add .")
  // await _exec("git commit -m 'fixed'")
  // await _exec("git push gitee master")
}

try {
  main()
} catch (err) {
  console.log("报错：" + err)
}
