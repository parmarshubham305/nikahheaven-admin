import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig(({ mode }) => {
  const env = loadEnv('mock', process.cwd(), '');
  // const env = loadEnv(mode, process.cwd());

  const processEnvValues = Object.entries(env).reduce((prev, [key, val]) => {
    return {
      ...prev,
      [`process.env.${key}`]: JSON.stringify(val),
    };
  }, {});

  return {
    plugins: [react()],
    define: processEnvValues,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
