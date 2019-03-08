const APP_TYPE = {
  h5plus: 'h5plus',
  apicloud: 'apicloud'
}
// 平台
const PLATFORMS = {
  universal: 'universal',
  android: 'android',
  ios: 'ios'
}
// 当前环境
const platform = process.env.PLATFORM_ENV || PLATFORMS.universal
const pluginName = 'PackAppPlugin'

const fs = require('fs-extra')
// 打包插件
class PackerAppPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    const self = this
    const options = this.options
    const originDir = options.originDir
    const distDirs = options.distDirs
    compiler.hooks.beforeRun.tap(pluginName, (compiler) => {
      self.beforeRun()
    })
    compiler.hooks.done.tap(pluginName, (stats) => {
      setTimeout(() => {
        if (originDir === undefined) {
          throw new Error('originDir must config')
        }
        if (distDirs === undefined) {
          throw new Error('distDirs must config')
        }
        switch (platform) {
          case PLATFORMS.android:
            if (distDirs.android === undefined) {
              throw new Error('distDirs.android must config')
            }
            self.packerAndroid(originDir, distDirs.android)
            break
          case PLATFORMS.ios:
            if (distDirs.ios === undefined) {
              throw new Error('distDirs.android must config')
            }
            self.packerIOS(originDir, distDirs.ios)
            break
          case PLATFORMS.universal:
            if (distDirs.android === undefined) {
              throw new Error('distDirs.android must config')
            }
            if (distDirs.ios === undefined) {
              throw new Error('distDirs.android must config')
            }
            self.packerAndroid(originDir, distDirs.android)
            self.packerIOS(originDir, distDirs.ios)
            break
          default:
            break
        }
        console.log(`${self.appid} [${platform}] build done.`)
      }, 0)
    })
  }

  get type () {
    return this.options.type || APP_TYPE.h5plus
  }
  get appid () {
    return this.options.appid || 'VueApp'
  }

  beforeRun () {
    if (this.type === APP_TYPE.apicloud) {
      const configXml = `<?xml version="1.0" encoding="UTF-8"?>
<widget id="A0000000000000" version="0.0.1">
<name>${this.appid}</name>
<content src="index.html"/>
<access origin="*"/>
<preference name="smartUpdate" value="false"/>
<preference name="statusBarAppearance" value="false" />
<preference name="debug" value="true"/>
</widget>
      `
      fs.writeFileSync(`${this.options.rootDir}/public/config.xml`, configXml)
    }
  }

  packerAndroid (originDir, dist) {
    switch (this.type) {
      case APP_TYPE.apicloud:
        this.packApicloud(originDir, dist)
        break
      case APP_TYPE.h5plus:
        this.packH5plusAndroid(originDir, dist)
        break
      default:
        break
    }
  }

  packerIOS (originDir, dist) {
    switch (this.type) {
      case APP_TYPE.apicloud:
        this.packApicloud(originDir, dist)
        break
      case APP_TYPE.h5plus:
        this.packH5plusIOS(originDir, dist)
        break
      default:
        break
    }
  }

  packApicloud (originDir, dist) {
    fs.removeSync(dist)
    fs.copySync(originDir, dist)
    fs.removeSync(`${dist}/web_adapter`)
  }

  packH5plusAndroid (originDir, dist) {
    fs.removeSync(`${dist}/apps/${this.appid}`)
    fs.copySync(originDir, `${dist}/apps/${this.appid}/www`)
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<hbuilder version="1.9.9.59000" debug="true">
    <apps>
        <app appid="${this.appid}" appver="0.0.1"/>
    </apps>
</hbuilder>`
    fs.writeFileSync(`${dist}/data/dcloud_control.xml`, xml)
  }

  packH5plusIOS (originDir, dist) {
    fs.removeSync(`${dist}/apps/${this.appid}`)
    fs.copySync(originDir, `${dist}/apps/${this.appid}/www`)
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<HBuilder debug="true" version="1.9.9.59000">
  <apps>
    <app appid="${this.appid}" appver="1.0.1"/>
  </apps>
</HBuilder>`
    const SDK_PATH = require('path').resolve(`${dist}`, '../SDK')
    fs.writeFileSync(`${SDK_PATH}/Resource/control.xml`, xml)
  }
}
module.exports = PackerAppPlugin
