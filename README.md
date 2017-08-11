# idea

本地环境
后端工程npm run dev
前端工程：cd webapp && npm run dev

测试环境
EGG_SERVER_ENV=test pm2 start index.js --name 'ideaTest'
前端工程打包 cd webapp && npm run build-test

正式环境
EGG_SERVER_ENV=prod pm2 start index.js --name 'idea'
前端工程打包 cd webapp && npm run build