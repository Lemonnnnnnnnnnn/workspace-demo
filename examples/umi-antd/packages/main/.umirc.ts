import { defineConfig } from "umi";
import route from "./config/route";

export default defineConfig({
  routes: route,
  npmClient: 'pnpm',
});
