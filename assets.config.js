/**
 * root of from is project root dir
 * root of to is dist dir.
 */
const assets = []

// components
assets.push({ from: '/src/components', to: '@/lib/widget' })
// mixins
assets.push({ from: '/src/mixins', to: '@/lib/mixins' })
// styles
assets.push({ from: '/src/style', to: '@/lib/style' })
// utils
assets.push({ from: '/src/utils', to: '@/lib/utils' })
// static
assets.push({ from: '/src/static', to: '@/lib/static' })
// fonts
assets.push({ from: '/src/fonts', to: '@/lib/fonts' })

module.exports = assets
