var path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const assets = require('./assets.config')

const production = process.env.NODE_ENV === 'production'
const root = path.join(__dirname, './')
const lib = path.join(root, 'lib')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@/': path.join(__dirname, 'src')
			},
			modules: ['node_modules', 'src']
		},
		plugins: [
			new CopyWebpackPlugin(
				assets.map(s => {
					let from = typeof s === 'string' ? s : s.from
					let to = from
					if (typeof s !== 'string' && s.to) {
						to = s.to
					}

					from = path.join(root, from)
					to = path.join(lib, to)
					console.log('copy', from, to)
					return { from, to }
				})
			)
		]
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