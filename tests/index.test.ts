// @vitest-environment node
import { describe, it, expect, vi } from 'vitest';
import { run } from '../src/index';
import fs from 'fs';

describe('Stack Cleaner - Core Engine Integration', () => {

  it('Should safely complete a dry run scanning execution', async () => {
    // Intercepta os logs para não poluir o terminal de CI
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = await run();
    
    // O motor precisa retornar true indicando que o ciclo de varredura fechou sem estourar exceções
    expect(result).toBe(true);

    vi.restoreAllMocks();
  });

});
