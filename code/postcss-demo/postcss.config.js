// postcss 配置主要其实就是做插件的配置

module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: "last 10 versions",
    }),
  ],
};
