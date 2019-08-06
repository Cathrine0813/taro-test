const path = require('path')
const config = {
  projectName: 'webox-taro',
  date: '2019-5-5',
  designWidth: 750,//设计稿以 iPhone6 750px 作为设计尺寸标准
  //目前 Taro 支持 750、 640 、 828 三种尺寸设计稿，他们的换算规则如下
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  // 项目源码目录
  sourceRoot: 'src',
  // 项目产出目录
  outputRoot: 'dist',
  // 通用插件配置
  plugins: {
    //plugins 用来设置一些各个端通用的编译过程配置，例如 babel 配置，JS/CSS 压缩配置等。
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    }
  },
  // //设置打包过程中的 JS 代码压缩
  // uglify: {
  //   enable: true,
  //   config: {
  //   // 配置项同 https://github.com/mishoo/UglifyJS2#minify-options
  //   }
  // },
  // //设置打包过程中的 CSS 代码压缩
  // csso: {
  //   enable: true,
  //   config: {
  //   // 配置项同 https://github.com/css/csso#minifysource-options
  //   }
  // },
  
  // 全局变量设置
  defineConstants: {
  },
  alias: {
    '@src': path.resolve(__dirname,'../src/'),    
    '@components': path.resolve(__dirname,'../src/components'),
    '@images': path.resolve(__dirname,'../src/assets/images'),
    '@utils': path.resolve(__dirname, '..', 'src/utils'),
    '@scss': path.resolve(__dirname, '../src/app.scss'),
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  weapp: {
    //小程序编译过程的相关配置。
    compile: {
      compressTemplate: true,//决定小程序打包时是否需要压缩 wxml
    },
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        pxtransform: {
          enable: true,
          config: {
            // onePxTransform: true, //设置 1px 是否需要被转换
            // unitPrecision: 5,//REM 单位允许的小数位。
            // selectorBlackList: [],//黑名单里的选择器将会被忽略。
            // replace: true,//直接替换而不是追加一条进行覆盖。
            // mediaQuery: false,//允许媒体查询里的 px 单位转换
            // minPixelValue: 0//设置一个可被转换的最小 px 值
          }
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },
  h5: {
    devServer: {
      port: 10086
    },
    publicPath: '/',//设置输出解析文件的目录。
    staticDirectory: 'static',//h5 编译后的静态文件目录。
    // esnextModules: ['taro-ui'],//配置需要额外的编译的源码模块，比如taro-ui：
    // miniCssExtractPluginOption: {
    //   filename: 'css/[name]/[hash].css',
    //   chunkFilename: 'css/[name]/[hash].css'
    // },
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
