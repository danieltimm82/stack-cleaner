// @vitest-environment node
import { describe, it, expect, vi } from 'vitest';
import { run } from '../src/index';

describe('Stack Cleaner - Testes de Integração Nativa', () => {

  it('Deve executar o modo dry run por defeito e retornar verdadeiro', async () => {
    // Intercepta os logs apenas para manter o terminal do GitHub limpo
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Executa o motor principal
    const result = await run();

    // Valida o retorno booleano
    expect(result).toBe(true);

    // Valida se a mensagem de inicialização que você queria monitorar foi disparada
    expect(infoSpy).toHaveBeenCalledWith(
      expect.stringContaining('[Stack Cleaner] Iniciando varredura estática de dependências...')
    );

    vi.restoreAllMocks();
  });

});
