// postcss 配置主要其实就是做插件的配置

module.exports = {
  plugins: [
    require("postcss-import")({
      path: ["src/css"]
    }),
    require("postcss-preset-env")({
      stage: 2,
    }),
    require("@fullhuman/postcss-purgecss")({
      content: ['./src/**/*.html']
    })
  ],
  // syntax: "postcss-scss"
};
