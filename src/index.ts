import fs from 'fs';
import path from 'path';

interface CleanerConfig {
  excludeFolders?: string[];
  includeExtensions?: string[];
  dryRun?: boolean;
}

interface ScanResult {
  deletedPaths: string[];
  bytesFreed: number;
}

export async function run(configPath?: string): Promise<boolean> {
  console.info("[Stack Cleaner] Starting static dependency and workspace scan...");

  try {
    const targetConfig = configPath || path.join(process.cwd(), 'stack-cleaner.json');
    let config: CleanerConfig = { dryRun: true, excludeFolders: ['node_modules', '.git', 'dist'] };

    if (fs.existsSync(targetConfig)) {
      const configRaw = fs.readFileSync(targetConfig, 'utf-8');
      if (configRaw.trim()) {
        config = JSON.parse(configRaw);
      }
    } else {
      console.warn(`[Stack Cleaner] Warning: Configuration file not found. Using safe defaults.`);
    }

    const result = await executeCleanProcess(config);
    
    if (config.dryRun !== false) {
      console.info(`\n[Stack Cleaner] [DRY RUN DONE] Scan complete. Found ${result.deletedPaths.length} targets. Potential space to free: ${(result.bytesFreed / (1024 * 1024)).toFixed(2)} MB.`);
      console.info("[Stack Cleaner] Run with 'dryRun: false' in your config to execute the actual cleanup.");
    } else {
      console.info(`\n[Stack Cleaner] [SUCCESS] Cleanup done! Removed ${result.deletedPaths.length} targets. Freed ${(result.bytesFreed / (1024 * 1024)).toFixed(2)} MB.`);
    }

    return true;
  } catch (error: any) {
    console.error(`[Stack Cleaner] [Critical Error]: ${error.message}`);
    throw error;
  }
}

async function executeCleanProcess(config: CleanerConfig): Promise<ScanResult> {
  const isDryRun = config.dryRun !== false;
  const targetFolders = ['node_modules', '.test', '.cache', 'dist', 'build']; 
  const excludeFolders = config.excludeFolders || ['.git'];
  
  const result: ScanResult = { deletedPaths: [], bytesFreed: 0 };
  const rootDir = process.cwd();

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
      return; // Ignora pastas sem permissão de leitura
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

          if (!isDryRun) {
            console.log(`[Cleaning] Removing: ${fullPath} (~${(size / 1024).toFixed(1)} KB)`);
            fs.rmSync(fullPath, { recursive: true, force: true });
          } else {
            console.log(`[Scan Found] ${fullPath} (~${(size / 1024).toFixed(1)} KB)`);
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
  const args = process.argv.slice(2);
  if (args.includes('--version') || args.includes('-v')) {
    console.log('1.0.1');
    process.exit(0);
  }
  run().catch(() => process.exit(1));
}
