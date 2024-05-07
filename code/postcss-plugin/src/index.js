// 读取 CSS 文件
// 使用 PostCSS 来对读取的 CSS 文件做后处理

const fs = require("fs"); // 负责处理和文件读取相关的事情
const postcss = require("postcss");
// 引入插件，该插件负责为 CSS 代码添加浏览器前缀
const autoprefixer = require("autoprefixer");

const style = fs.readFileSync("src/index.css", "utf8");

postcss([autoprefixer({
    overrideBrowserslist: "last 10 versions"
})])
  .process(style, { from: undefined })
  .then((res) => {
    console.log(res.css);
  });
