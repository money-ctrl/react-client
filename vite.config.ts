import { defineConfig } from "vite";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default defineConfig({
  root: './src',
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: path.resolve(__dirname, './src/') + '/',
      }
    ],
  },
  server: {
    port: Number(process.env.PORT),
  },
  build: {
    outDir: '../build',
    emptyOutDir: true,
  },
});
