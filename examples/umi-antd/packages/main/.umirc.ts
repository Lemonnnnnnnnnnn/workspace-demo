import { defineConfig } from "umi";
import route from "./config/route";

export default defineConfig({
  routes: route,
  npmClient: "pnpm",
  mfsu: {
    strategy: "normal",
  },
  monorepoRedirect: {
    srcDir: ["src"],
    peerDeps: true,
  },
});
