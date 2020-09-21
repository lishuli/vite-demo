const rewriteImport = (content) => {
  // 改造js文件内容，不是/ ./ ../ 开头的import，替换成/@modules/开头
  return content.replace(/ from ['|"]([^'"]+)['|"]/g, function(s0, s1) {
    if(!(s1[0] === '.' || s1[0] === '/')) {
      return ` from "/@modules/${s1}"`;
    } else {
      return s0;
    }
  })
}

module.exports = rewriteImport;