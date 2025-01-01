import structuredClone from 'structured-clone';

if (typeof globalThis.structuredClone !== 'function') {
    globalThis.structuredClone = structuredClone;
}

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
