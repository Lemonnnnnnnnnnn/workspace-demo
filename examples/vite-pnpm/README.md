## FAQ

**如何一次性安装所有依赖？**

1. 在 pnpm-workspace.yaml 中声明工作空间包含的文件夹/文件
2. 在根目录运行 `pnpm i`

**如何在根目录运行子项目？**

```bash
pnpm --filter <package-name> <command>
```

例如我们有一个名为 main（项目名字取决于 `package.json` 的 `name` 属性）的项目，则我们可以在根目录用：

```bash
pnpm --filter main dev
``` 

该命令用于执行该项目的 `dev` 命令。


**如何在子包中相互引用？ 以 main 引用 shared-ui 为例：**

```bash
pnpm add shared-ui --filter main --workspace
```

该命令会在自动在 `main/package.json` 的 `dependencies` 中以工作空间的形式添加 `shared-ui` 的依赖声明并安装依赖：

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



**为什么修改 `share-ui` 中的文件可以直接实现热更新？**

在 main 项目中声明了 `"shared-ui": "workspace:^",` 后，安装依赖时会将 `shared-ui` 包的 **符号链接（symlinks）** 放入 main 项目的 `node_modules` 中。

`vite` 为我们启动的开发服务器可以根据该符号链接判断源文件是否改变，从而实现热更新。



**为什么 `share-ui` 中的 ts 文件可以直接被引入？**

Vite 在开发时会用 `Connect` 库启动一个本地服务器。在引入 `share-ui` 库时，实际上浏览器会向该服务器请求一个 ts 文件（根据软连接请求 share-ui 子包的源 ts 文件）：

```js
import { Button, A, B } from "/@fs/D:/code/personal/workspace-demo/examples/vite-pnpm/packages/shared-ui/src/index.ts";
```

浏览器请求 `ts` 文件时，会在该服务器进行转换，返回给浏览器解析后的 `js` 文件。

参考：https://juejin.cn/post/7060673531389935653


## 如何实现开发时依赖src，打包时依赖dist？

修改package.json: 
```json
{
  "main": "dist/index.js",
  "exports": {
    ".": {
      "import": "./src/index.ts"
    }
  },
}
```

方法来源：[https://github.com/vitejs/vite/issues/10447](https://github.com/vitejs/vite/issues/10447)
export 与 main 的区别：[https://stackoverflow.com/questions/68572936/what-is-the-difference-between-main-and-module-vs-exports-in-package-json](https://stackoverflow.com/questions/68572936/what-is-the-difference-between-main-and-module-vs-exports-in-package-json)