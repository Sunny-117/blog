const sass = require("sass");
const path = require("path");
const postcss = require("postcss");
const stylelint = require("stylelint");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const fs = require("fs");

// 定义输入和输出的文件路径
const scssPath = path.resolve("src", "index.scss");
const outputPath = path.resolve("src", "build.css");

// 编译 scss
const scssResult = sass.compile(scssPath);
// console.log(scssResult.css)

// 对生成的 CSS 做一些后处理
postcss([
  stylelint({
    fix: true,
  }),
  autoprefixer,
  cssnano,
])
  .process(scssResult.css, { from: undefined })
  .then((res) => {
    fs.writeFileSync(outputPath, res.css);
    console.log("文件后处理完毕...");
  })
  .catch((err) => {
    console.error("Error:", err.message);
  });
