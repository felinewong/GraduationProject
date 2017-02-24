
图片画廊
在线演示: https://felinewong.github.io/PhotoGallery/

安装运行

安装node.js环境
使用yoman、webpack
安装yeoman: npm install -g yo
安装yeoman模板: npm install -g generator-react-webpack
自动生成项目: yo react-webpack gallery-by-react
安装项目所有的依赖类库: npm install
编辑 Main.js 开始项目
发布项目

启动本地项目: npm start 或者 npm run serve
启动本地dist目录项目: npm run serve:start
打包到dist目录: npm run copy
清除dist文件：npm run clean
生成dist目录: npm run dist

删除dist目录中index.html中app.js的src中第一个斜杠
删除cfg目录中defaut.js中publicPath中的第一个斜杠

将文件全部添加到git仓库: git add -A (git add dist)
创建主页： git subtree push --prefix=dist origin gh-pages
推送远程分支： git push origin local_branch:remote_branch
推送dist目录文件到githubPages: git subtree push --prefix=dist origin gh-pages
回滚: git --hard 版本号





   
    