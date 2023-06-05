# 扫码支付宝支付(深圳)

## Script
> yarn dev   本地开发环境 

> yarn test  测试环境打包

> yarn build 正式环境打包

## 注意事项

- 构建时需要将后端服务放在和本项目同级目录，构建的文件会放入后端服务指定文件夹，对应配置在`vite.config.ts`中`build`

- move.cjs 作用是移动index.html到指定位置