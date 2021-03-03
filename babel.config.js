// 使用babel-plugin-import实现组件按需加载
// https://www.npmjs.com/package/babel-plugin-import
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: true
      }
    ]
  ]
};
