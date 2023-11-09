- [x] 热更新（目前热更新与mfsu配置）


## 关于热更新

在 umi 中要对 `node_modules` 中的 ts 文件进行 diff 比较，需要在配置文件中添加 `extraBabelIncludes` ，表示配置需要额外用 `babel` 进行转换的包，在我们的示例中：

```js
extraBabelIncludes: ['shared-ui'],
```

并且根据 https://github.com/umijs/umi/issues/11381 ，当前该配置与 `mfsu` 互斥，将 `mfsu` 设为 `false` 后，修改 `shared-ui` 中的组件才有热更新。

