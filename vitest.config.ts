import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Ativa o suporte nativo a tipos e resolve módulos TypeScript automaticamente
    globals: true,
    environment: 'node',
  },
});
