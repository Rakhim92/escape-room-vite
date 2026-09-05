/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ИСПРАВЛЕНО: Перевели конфигурацию на функцию, принимающую аргумент command
export default defineConfig(({ command }) => ({
  plugins: [react()],

  // Если выполняется сборка (build), жестко привязываем имя репозитория,
  // во всех остальных случаях (локальный старт) — корень '/'
  base: command === 'build' ? '/escape-room-vite/' : '/',

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
}));

