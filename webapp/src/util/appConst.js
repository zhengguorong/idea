let BACKEND_DOMAIN = 'http://localhost:7001'
if (process.env.NODE_ENV === 'production') {
  // 生产环境
  BACKEND_DOMAIN = 'http://chaos.limesoftware.cn'
} else if (process.env.NODE_ENV === 'development') {
  // 本地开发
  BACKEND_DOMAIN = 'http://localhost:7001'
} else if (process.env.NODE_ENV === 'test') {
  // 部署测试服务器
  BACKEND_DOMAIN = 'http://chaostest.limesoftware.cn'
}
export default {
  BACKEND_DOMAIN
}
