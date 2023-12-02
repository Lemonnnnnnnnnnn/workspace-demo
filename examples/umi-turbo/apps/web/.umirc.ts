import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: 'index' },
    { path: '/docs', component: 'docs' },
  ],
  npmClient: 'pnpm',
  mfsu: {
    strategy: 'eager',
    exclude: ['@cat/components'],
  },
  monorepoRedirect: {
    srcDir: ['dist/esm'],
    peerDeps: true,
  },
  // esbuildMinifyIIFE:true,
});
