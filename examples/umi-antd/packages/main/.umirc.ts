import { defineConfig } from "umi";
import route from "./config/route";

export default defineConfig({
  routes: route,
  npmClient: 'pnpm',
  extraBabelIncludes: ['shared-ui'],
  mfsu:false,
  esbuildMinifyIIFE:true
});
