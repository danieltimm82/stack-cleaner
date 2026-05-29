// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { run } from '../src/index';

describe('Stack Cleaner - Testes de Integração Nativa', () => {

  it('Deve executar o modo dry run por defeito e retornar verdadeiro', async () => {
    // Executa o motor principal diretamente
    const result = await run();

    // Valida o retorno booleano esperado de sucesso
    expect(result).toBe(true);
  });

});
