var a = `

<video autoplay="true" controls="true" width="100%" height="auto" src="https://gw.alipayobjects.com/os/rmsportal/mOBlbPzfAbsyblUXgLLb.mp4" />

## 内容概览

本节内容主要帮大家构建 ice 开发环境，包括：

- 安装 ICE SDK；
- 初始化一个 ICE 项目；

## 相关内容

- 详细安装文档： [http://ice.alibaba-inc.com/docs/get-started](http://ice.alibaba-inc.com/docs/get-started)

## 下节内容

下节内容会帮助大家一步步创建一个实际的业务项目，包括创建新的页面、调试页面以及页面代码简介。
\`\`\`\`
`

var md2 = require('../')

console.log(md2(a))