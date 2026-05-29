import { describe, it, expect, vi } from 'vitest';
import { run } from '../src/index';

describe('Stack Cleaner - Testes de Integração Nativa', () => {

  it('Deve executar o modo dry run por defeito e retornar verdadeiro', async () => {
    // Espiona os logs do console para evitar poluir o terminal do CI
    const logSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Executa a função principal diretamente
    const result = await run();

    // Validações de sucesso
    expect(result).toBe(true);
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('[Stack Cleaner] Iniciando varredura estática de dependências...')
    );

    // Limpa os mocks do console
    vi.restoreAllMocks();
  });

});
