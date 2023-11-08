## 和 pnpm 的区别

- pnpm 用单独的 `pnpm-workspace.yaml` 配置文件来单独管理 menorepo 的配置项。而 npm 则将这些配置写在 `pakcage.json` 中的 "workspaces" 属性中. 
- 在根目录下， pnpm 通过 `--filter` 来指定执行命令的子包；npm 通过 `-w` 或 `--workspace` 来指定执行命令的主包
- pnpm 执行 `install` 命令时会为各包分别在自身目录下安装 `node_modules` ，而 npm 统一在根目录下安装所有依赖
- pnpm 可以在子包的 `package.json` 中利用 `workspace:` 语法声明对于其他子包的依赖，npm 不支持此语法，因为在 npm 中所有子包均依赖根目录下的 `node_modules` 包，在 `install` 时默认会把各子包打包放入 `node_modules` 中。
