import fs from 'fs';
import path from 'path';

interface CleanerConfig {
  excludeFolders?: string[];
  includeExtensions?: string[];
  dryRun?: boolean;
  version?: string;
}

export async function run(configPath?: string): Promise<boolean> {
  console.info("[Stack Cleaner] Iniciando varredura estática de dependências...");

  try {
    const targetConfig = configPath || path.join(process.cwd(), 'stack-cleaner.json');
    
    if (!fs.existsSync(targetConfig)) {
      console.warn(`[Stack Cleaner] Aviso: Ficheiro de configuração não encontrado. Utilizando definições padrão.`);
      return await executeCleanProcess({ dryRun: true, excludeFolders: ['node_modules'] });
    }

    const configRaw = fs.readFileSync(targetConfig, 'utf-8');
    if (!configRaw.trim()) {
      throw new Error("O conteúdo do ficheiro de configuração está vazio.");
    }

    const config: CleanerConfig = JSON.parse(configRaw);
    return await executeCleanProcess(config);

  } catch (error: any) {
    console.error(`[Stack Cleaner] [Erro Crítico]: ${error.message}`);
    throw error;
  }
}

async function executeCleanProcess(config: CleanerConfig): Promise<boolean> {
  const foldersToExclude = config.excludeFolders || ['node_modules', 'dist', '.git'];
  const isDryRun = config.dryRun !== false;

  console.log(`[Stack Cleaner] Modo de Teste (Dry Run): ${isDryRun}`);
  console.log(`[Stack Cleaner] Pastas ignoradas: ${foldersToExclude.join(', ')}`);

  const projectPackageJson = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(projectPackageJson)) {
    console.warn("[Stack Cleaner] Aviso: package.json não detetado no diretório atual.");
  }

  return true;
}
