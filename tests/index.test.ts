import { execSync } from 'child_process';

describe('Stack Cleaner CLI Basic Integration Tests', () => {
  it('should output version alignment correctly', () => {
    const output = execSync('ts-node src/index.ts --version').toString().trim();
    expect(output).toBe('1.0.0');
  });

  it('should contain the core infrastructure commands', () => {
    const output = execSync('ts-node src/index.ts --help').toString();
    expect(output).toContain('inspect');
    expect(output).toContain('clean');
  });
});
