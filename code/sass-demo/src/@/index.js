// 读取 scss 文件
// 调用 sass 依赖提供的 complie 进行文件的编译
// 最终在 dist 目录下面新生成一个 index.css（编译后的文件）

const sass = require('sass'); // 做 scss 文件编译的
const path = require('path'); // 处理路径相关的
const fs = require('fs'); // 处理文件读写相关的

// 定义一下输入和输出的文件路径
const scssPath = path.resolve("src", "index.scss");
const cssDir = "dist"; // 之后编译的 index.css 要存储的目录名
const cssPath = path.resolve(cssDir, "index.css");

// 编译
const result = sass.compile(scssPath);
console.log(result.css);

// 将编译后的字符串写入到文件里面
if(!fs.existsSync(cssDir)){
    // 说明不存在，那就创建
    fs.mkdirSync(cssDir);
}

fs.writeFileSync(cssPath, result.css);