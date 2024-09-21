import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import typescript2 from 'rollup-plugin-typescript2';
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
    typescript2({
      check: false,
      include: ["src/stories/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          outDir: "dist",
          sourceMap: true,
          declaration: true,
          declarationMap: true,
          types: [
            "vite/client",
          ]
        },
      },
      exclude: ["vite.config.ts"]
    })
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: "src/main.ts",
      name: 'MeshUIComponents',
      formats: ["es"],
      fileName: format => `mesh-ui-components.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that should not be bundled
      // into your library
      input: {
        // eslint-disable-next-line no-undef
        main: path.resolve(__dirname, "src/main.ts")
      },
      external: ['vue'],
      output: {
        exports: "named",
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, 'src'),
    },
  },
})