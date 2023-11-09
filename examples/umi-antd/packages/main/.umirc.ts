import { defineConfig } from "umi";
import route from "./config/route";

export default defineConfig({
  routes: route,
  npmClient: 'pnpm',
  extraBabelIncludes: ['shared-ui'],
  // chainWebpack:(config)=>{
  //   config.module.rules.get('ts-in-node_modules').include.add()
  // }
  mfsu:false,
});
