import fs from 'fs';
import path from 'path';

interface CleanerConfig {
  excludeFolders?: string[];
  targetFolders?: string[];
  dryRun?: boolean;
  gracePeriodDays?: number; // Tempo em dias para ignorar projetos ativos
}

interface ScanResult {
  deletedPaths: string[];
  bytesFreed: number;
  skippedActiveProjects: number;
}

export async function run(configPath?: string): Promise<boolean> {
  const args = process.argv.slice(2);
  const command = args[0] || 'scan';

  let config: CleanerConfig = { 
    dryRun: command !== 'clean', 
    excludeFolders: ['.git', '.github', '.vscode', 'node_modules'],
    targetFolders: ['node_modules', '.cache', 'dist', 'build', '.next', '.turbo', '.vite'],
    gracePeriodDays: 7 // Ignora tudo modificado na última semana por padrão
  };

  const targetConfig = configPath || path.join(process.cwd(), 'stack-cleaner.json');
  if (fs.existsSync(targetConfig)) {
    try {
      const configRaw = fs.readFileSync(targetConfig, 'utf-8');
      if (configRaw.trim()) {
        config = { ...config, ...JSON.parse(configRaw) };
      }
    } catch {
      console.warn(`[stack-cleaner] Warning: Failed to parse stack-cleaner.json. Using defaults.`);
    }
  }

  if (command === 'clean') {
    config.dryRun = false;
  }

  console.info(`\n⚡ stack-cleaner v1.0.1 — Smart Workspace Optimization [Command: ${command.toUpperCase()}]`);
  console.info(`⚠️  Safe by default — Always simulates via dry-run unless 'clean' is explicitly called.`);
  console.info(`-----------------------------------------------------------------------------------------`);

  try {
    const startTime = Date.now();
    const result = await executeCleanProcess(config);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    const sizeInGB = (result.bytesFreed / (1024 * 1024 * 1024)).toFixed(2);
    const sizeInMB = (result.bytesFreed / (1024 * 1024)).toFixed(2);
    const finalSizeDisplay = parseFloat(sizeInGB) > 0.1 ? `${sizeInGB} GB` : `${sizeInMB} MB`;

    console.info(`-----------------------------------------------------------------------------------------`);
    if (config.dryRun) {
      console.info(`✨ [DRY RUN DONE] Scan finished in ${duration}s.`);
      console.info(`🔍 Found ${result.deletedPaths.length} bloated targets.`);
      console.info(`🛡️  Skipped ${result.skippedActiveProjects} active projects (modified within last ${config.gracePeriodDays} days).`);
      console.info(`🚀 Potential space to recover: ${finalSizeDisplay}`);
      console.info(`\n👉 Run 'npx stack-cleaner clean' to safely purge this garbage.`);
    } else {
      console.info(`💥 [SUCCESS] Cleanup finished in ${duration}s!`);
      console.info(`✔ Removed ${result.deletedPaths.length} folders successfully.`);
      console.info(`🛡️  Safeguarded ${result.skippedActiveProjects} active projects.`);
      console.info(`🎉 Total space recovered: ${finalSizeDisplay}`);
    }

    return true;
  } catch (error: any) {
    console.error(`\n❌ [Critical Error]: ${error.message}`);
    throw error;
  }
}

async function executeCleanProcess(config: CleanerConfig): Promise<ScanResult> {
  const isDryRun = config.dryRun !== false;
  const targetFolders = config.targetFolders || ['node_modules', '.cache']; 
  const excludeFolders = config.excludeFolders || ['.git'];
  const gracePeriodMS = (config.gracePeriodDays || 7) * 24 * 60 * 60 * 1000;
  
  const result: ScanResult = { deletedPaths: [], bytesFreed: 0, skippedActiveProjects: 0 };
  const rootDir = process.cwd();

  function isProjectActive(folderPath: string): boolean {
    try {
      const stats = fs.statSync(folderPath);
      const lastModified = stats.mtimeMs;
      if (Date.now() - lastModified < gracePeriodMS) {
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }

  function calculateSize(itemPath: string): number {
    try {
      const stats = fs.statSync(itemPath);
      if (stats.isFile()) return stats.size;
      
      if (stats.isDirectory()) {
        return fs.readdirSync(itemPath)
          .map(child => calculateSize(path.join(itemPath, child)))
          .reduce((acc, size) => acc + size, 0);
      }
    } catch {
      return 0;
    }
    return 0;
  }

  function scan(dir: string) {
    let items: string[] = [];
    try {
      items = fs.readdirSync(dir);
    } catch {
      return; 
    }

    // Se o diretório atual contém sinais de ser um projeto ativo, pulamos o node_modules dele
    if (dir !== rootDir && isProjectActive(dir)) {
      result.skippedActiveProjects++;
      return;
    }

    for (const item of items) {
      const fullPath = path.join(dir, item);
      let stats: fs.Stats;
      
      try {
        stats = fs.statSync(fullPath);
      } catch {
        continue;
      }

      if (stats.isDirectory()) {
        if (excludeFolders.includes(item)) {
          continue;
        }

        if (targetFolders.includes(item)) {
          const size = calculateSize(fullPath);
          result.bytesFreed += size;
          result.deletedPaths.push(fullPath);

          const sizeDisplay = (size / (1024 * 1024)).toFixed(1);

          if (!isDryRun) {
            console.log(`✔ [Purged] ${fullPath} (~${sizeDisplay} MB)`);
            fs.rmSync(fullPath, { recursive: true, force: true });
          } else {
            console.log(`🔍 [Found] ${fullPath} (~${sizeDisplay} MB)`);
          }
        } else {
          scan(fullPath);
        }
      }
    }
  }

  scan(rootDir);
  return result;
}

if (process.argv[1] && (process.argv[1].endsWith('index.js') || process.argv[1].endsWith('index.ts'))) {
  run().catch(() => process.exit(1));
}
