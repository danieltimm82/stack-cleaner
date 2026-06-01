// @vitest-environment node
import { describe, it, expect, vi } from 'vitest';
import { run } from '../src/index';

describe('Stack Cleaner - Core Engine Integration', () => {

  it('Should safely complete a dry run scanning execution', async () => {
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = await run();
    expect(result).toBe(true);

    vi.restoreAllMocks();
  });

});
