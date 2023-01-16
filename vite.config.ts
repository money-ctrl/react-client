import { defineConfig } from "vite";
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  root: './src',
  server: {
    port: Number(process.env.PORT),
  },
  build: {
    outDir: '../build',
    emptyOutDir: true,
  },
});
