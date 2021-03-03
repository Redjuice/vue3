const cssVariablePath = ["./src/styles/variable.less"];
const {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  devPort,
} = require("./src/config");

const mockServer = () => {
  if (process.env.NODE_ENV === "development") {
    return require("./mock/mockServer.js");
  } else {
    return "";
  }
};

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    // 注释掉的地方是前端配置代理访问后端的示例
    // proxy: {
    //   [baseURL]: {
    //     target: `http://你的后端接口地址`,
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ["^/" + baseURL]: "",
    //     },
    //   },
    // },
    after: mockServer(),
  },
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: cssVariablePath,
    },
  },
};
