import {defineConfig} from 'vite';
import {reactRouter} from '@react-router/dev/vite';
import {nitrogen} from '@cloudcart/nitrogen/vite';
export default defineConfig({plugins: [nitrogen({disableVirtualRoutes: true}), reactRouter()]});
