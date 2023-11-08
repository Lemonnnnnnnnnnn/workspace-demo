## FAQ

**如何一次性安装所有依赖？**

1. 在 pnpm-workspace.yaml 中声明工作空间包含的文件夹/文件
2. 在根目录运行 `pnpm i`

**如何在根目录运行子项目？**

```bash
pnpm --filter <package-name> <command>
```

例如我们有一个名为 vite-project（项目名字取决于 `package.json` 的 `name` 属性）的项目，则我们可以在根目录用：

```bash
pnpm --filter vite-project dev
``` 

该命令用于执行该项目的 `dev` 命令。


**如何在 app 中引用 packages 中的项目？ 以 vite-project 引用 shared-ui 为例：**

```bash
pnpm add shared-ui --filter vite-project --workspace
```

该命令会在自动在 `vite-project/package.json` 的 `dependencies` 中以工作空间的形式添加 `shared-ui` 的依赖声明并安装依赖：

```json
{
  "dependencies": {
    "shared-ui": "workspace:^",
  },
}
```

其中 `workspace:^` 使用的是子项目的最高版本，例如 `shared-ui` 的版本是 `v1.0.0` ，则 `"shared-ui": "workspace:^"` 会被转换为 `"shared-ui": "^1.0.0"` .

关于版本号：
- https://pnpm.io/workspaces
- https://juejin.cn/post/7057420490851221518

**npm 与 pnpm 的工作空间有什么区别？**

pnpm 用单独的 `pnpm-workspace.yaml` 配置文件来单独管理 menorepo 的配置项。而 npm 则将这些配置写在 `pakcage.json` 中的 "workspaces" 属性中. 


**为什么 `share-ui` 中的 ts 文件可以直接被引入？**

**为什么修改 `share-ui` 中的文件可以直接实现热更新？**