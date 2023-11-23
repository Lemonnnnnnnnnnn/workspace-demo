import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'pnpm',
  mfsu: {
    strategy: "normal",
  },
  monorepoRedirect: {
    srcDir: ["src"],
    peerDeps: true,
  },
  esbuildMinifyIIFE:true,
  codeSplitting:{
    jsStrategy: "granularChunks"
  },
});
