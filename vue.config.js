var path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@/': path.join(__dirname, 'src')
      },
    }
  },
  transpileDependencies: [
    // can be string or regex
    /node_modules/
  ],
  devServer: {
    allowedHosts: [
      '.zhuyin.club',
      '.yueya.org'
    ],
    proxy: {
			'/user/login.do': {
				target: 'https://i-test.zhuyin.club',
				changeOrigin: true,
				secure: false,
				logLevel: 'debug',
			},
			'/index.do': {
				target: 'https://i-test.zhuyin.club',
				changeOrigin: true,
				secure: false,
				logLevel: 'debug',
			},
			'/api/.*': {
				target: 'https://ma-test.zhuyin.club',
				changeOrigin: true,
				secure: false,
				logLevel: 'debug',
			},
			'/*.do': {
				target: 'https://ma-test.zhuyin.club',
				changeOrigin: true,
				secure: false,
				logLevel: 'debug',
			},
    },
  }
}