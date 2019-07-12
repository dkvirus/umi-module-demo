/**
 * .umirc 不支持 es6 模块
 */

const path = require('path');
const routes = require('./src/configs/route');

export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dll: true,
      dva: {
        dynamicImport: {
          webpackChunkName: true,
        },
      },
      routes: {
        exclude: [
          /components/,
        ],
      },
    }],
  ],
  proxy: {
    '/api/v1': {
      target: 'http://localhost:8081/',
      changeOrigin: true,
    }
  },
  alias: {
      components: path.resolve(process.cwd(), 'src/components'),
      models: path.resolve(process.cwd(), 'src/models'),
      routes: path.resolve(process.cwd(), 'src/routes'),
      services: path.resolve(process.cwd(), 'src/services'),
      utils: path.resolve(process.cwd(), 'src/utils'),
      configs: path.resolve(process.cwd(), 'src/configs'),
  },
  routes: routes,
}
