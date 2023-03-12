
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./zs-sdk-core.cjs.production.min.js')
} else {
  module.exports = require('./zs-sdk-core.cjs.development.js')
}
