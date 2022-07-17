interface Config {
  authorUri: string
  redirectUri: string
  clientId: string
  clientSecret: string
}

const config: Config = {
  authorUri: 'https://github.com/login/author/authorize',
  redirectUri: 'https://biaochenxuying.cn/login',
  clientId: 'XXXXX',
  clientSecret: 'XXXXX',
}

// 本地开发测试数据
if (import.meta.env.MODE === 'development') {
  config.redirectUri = 'http://localhost:8000/login'
  config.clientId = '502176cec65773057a9e'
  config.clientSecret = '65d444de381a026301a2c7cffb6952b9a86ac235'
}

export default config
