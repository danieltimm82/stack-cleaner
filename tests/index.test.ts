import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';

describe('Stack Cleaner CLI Basic Integration Tests', () => {

  it('should output version alignment correctly', () => {
    // Executa o script principal passando a flag de versão para validar o CLI
    const output = execSync('ts-node src/index.ts --version').toString();
    
    // Verifica se a saída do terminal contém a versão correta do ecossistema
    expect(output).toContain('1.0.1');
  });

  it('should execute dry run mode by default when no config is provided', () => {
    const output = execSync('ts-node src/index.ts').toString();
    
    // Valida se o sistema avisa sobre a falta de configuração e assume o modo seguro
    expect(output).toContain('[Stack Cleaner] Iniciando varredura estática de dependências...');
    expect(output).toContain('Modo de Teste (Dry Run): true');
  });

});
