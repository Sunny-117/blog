const fs = require("fs");
const path = require("path");
const sass = require("sass");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

// 定义输入文件的路径
const scssPath = path.resolve("src", "index.scss");

// 编译 scss
const scssResult = sass.compile(scssPath);

// 使用 PostCSS 来进行处理
postcss([autoprefixer, cssnano])
  .process(scssResult.css, { from: undefined })
  .then((res) => {
    // console.log(res.css)
    fs.writeFileSync("build.css", res.css);
    console.log("CSS 后处理完成...");
  })
  .catch((err) => {
    console.error("Error:", err.message);
  });
