# 设计师作品集网站源码

这是当前作品集网站的完整静态源码，包含页面、样式、交互和所有网站使用的图片。无需数据库、API Key 或构建步骤。

## 本地预览

1. 解压本压缩包。
2. 在解压目录打开终端。
3. 安装 Node.js 后执行：

   node preview-server.cjs

4. 在浏览器访问 http://127.0.0.1:4173 。

请通过本地服务器预览，不要直接双击 index.html：项目列表通过 fetch 读取 JSON，file:// 打开可能无法加载。
停止预览：在终端按 Ctrl+C。

## 文件说明

- index.html：页面结构、首页文字、五分类目录、个人介绍、联系方式及案例弹窗结构。
- projects.json：项目名称、分类、说明、封面与详情图片编号。
- app.js：项目列表、项目详情、导航、邮箱复制和滚动入场动画。
- style.css：基础布局与响应式规则。
- hero.css / hero.js：首页视差、拖动回弹与圆环交互。
- longform.css / longform.js：公众号长图横向切换、手机框内阅读及完整长图查看。
- theme.css / theme.js：整站科技风格、卡片高光、导航状态和阅读进度条。
- catalog.css / catalog.js：五分类作品目录及分类展开。
- posters.css / posters.js：节日海报案例排版、13张作品展廊与单张大图切换。
- assets/：网站图片与原PDF作品集。
- assets/longform/index.json：7张公众号长图的标题、分类与图片尺寸。
- assets/posters/index.json：13张节日海报的标题与图片尺寸。
- preview-server.cjs：仅用于本机预览的静态服务器，不用于公网生产托管。

样式加载顺序是 style.css、hero.css、longform.css、theme.css、catalog.css、posters.css。后加载的规则可能覆盖前面的规则。

## 修改图片

普通作品的 cover 和 pages 对应 assets/thumb-编号.webp 与 assets/work-编号.webp。
coverImage 字段可以直接指定自定义封面路径。
公众号图片在 assets/longform/，节日海报在 assets/posters/。
更换图片时可用同名、同格式图片覆盖；如修改文件名，还需修改 HTML 或对应 JSON 中的引用。
修改图片比例后请同步更新 JSON 的 width、height，避免页面跳动。
海报案例顶部的三张展示图在 index.html 的 poster-stage 中配置。
部分交互提示与邮箱复制内容写在 JS 中；修改邮箱时同步修改 index.html 与 app.js。
新增或删除作品时，请同步核对目录中的组数、首页作品数量及海报/长图统计文字。

## 部署

将 index.html、所有 CSS/JS/JSON 文件和 assets 文件夹上传至支持静态网站的托管服务。
网站根目录应直接包含 index.html，无需 npm install，也无需执行构建命令。
preview-server.cjs 和本说明无需上传。
压缩包不包含原平台凭证、仓库认证信息或平台专用部署配置。
平台账号、域名、HTTPS和中国大陆访问条件需在所选托管服务中另行配置。

## 素材说明

保留网站当前使用的用户作品素材。assets/portfolio.pdf 是最初上传的原始PDF，未随网页的后续海报替换同步改写。
本源码包供作品所有者保存、编辑与部署，素材使用权遵循原始权利归属。

- exhibitions.js / assets/exhibitions/：展会海报独立案例，含 13 张作品，沿用节日海报布局、悬浮动画和大图切换交互。
- banners.css / banners.js / assets/banners/：Banner 设计独立案例，含 10 张作品；大图背景、右侧作品选择、分类筛选、键盘切换和完整图片查看。手机端改为横向作品列表。

- 个人信息：张璠，作品时间 2021–2026。assets/zhangfan-portrait.webp 为个人照片；assets/resume-zhangfan.pdf 为“个人简历”按钮指向的 PDF 文件。
