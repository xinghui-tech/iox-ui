var path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const assets = require('./assets.config')

const production = process.env.NODE_ENV === 'production'
const root = path.join(__dirname, './')
const dist = path.join(root, 'dist', production ? 'build' : 'dev', process.env.UNI_PLATFORM)

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@/': path.join(__dirname, 'src'),
			},
		},
		plugins: [
			new CopyWebpackPlugin(
				assets.map(s => {
					let from = typeof s === 'string' ? s : s.from
					let to = from
					if (typeof s !== 'string' && s.to) {
						to = s.to
					}
					// convert from
					if (from.startsWith('~')) {
						from = path.join('node_modules', from.substring(1))
					} else if (from.startsWith('@/')) {
						from = from.substring(2);
					}
					// convert to
					if (to.startsWith('~')) {
						to = path.join(dist, 'node-modules', to.substring(1))
					} else if (to.startsWith('@/')) {
						to = path.join(root, to.substring(2));
					} else {
						to = path.join(dist, to)
					}

					from = path.join(root, from)
					console.log('copy', from, to)
					return { from, to }
				})
			)
		]
  },
  transpileDependencies: [
    // can be string or regex
    /node_modules/
  ]
};
