/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Передаем объект { command }, который Vite заполняет автоматически
export default defineConfig(({ command }) => ({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  // Если выполняется команда сборки (build), жестко ставим подпапку репозитория.
  // Во всех остальных случаях (например, npm run start) — обычный корень '/'
  base: command === 'build' ? '/escape-room-vite/' : '/',
}));
