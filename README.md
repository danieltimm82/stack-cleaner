# Stack-cleaner

[![Node.js CI](https://github.com/danieltimm82/stack-cleaner/actions/workflows/ci.yml/badge.svg)](https://github.com/danieltimm82/stack-cleaner/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Reclaim tens of gigabytes of wasted storage and speed up your local workspace in seconds.**

⚠️ **Safe by default — dry-run simulation before any actual deletion.**

Every developer knows the pain: your hard drive is quietly suffocated by gigabytes of forgotten `node_modules`, build artifacts, and heavy framework caches (`.next`, `.vite`, `.turbo`) from repositories you haven't touched in months.

`stack-cleaner` is a lightweight, blazing-fast CLI tool built in TypeScript that surgically scans your development directories, calculates exactly how much space is being wasted, and purges it safely.

-----------------------

## Quick Start

```bash
# 1. Scan your workspace recursively to calculate potential space savings
npx stack-cleaner scan

# 2. Purge the detected clutter and instantly recover your disk space
npx stack-cleaner clean
-----------------------
Real Performance Impact
stack-cleaner v1.0.1 — Smart Workspace Optimization [Command: CLEAN]
-----------------------
✔ [Purged] /Users/dev/projects/old-ecommerce/node_modules (~814.2 MB)
✔ [Purged] /Users/dev/projects/test-api/.next (~342.1 MB)
✔ [Purged] /Users/dev/workspace/sandbox/.turbo (~189.5 MB)
-----------------------
[SUCCESS] Cleanup finished in 4.12s!
Removed 32 folders successfully.
Safeguarded 14 active projects.
Total space recovered: 24.83 GB
-----------------------
Features That Set Us Apart
- Smart Active Project Exclusion: stack-cleaner automatically tracks file modification timestamps. By default, it skips any project or folder that has been modified within the last 7 days, ensuring your active workspaces are left completely untouched.

- Light Speed Engine: Built directly on top of native Node.js file system mechanics, traversing deep monorepos in a matter of seconds.

- Configuration as Code: Drop a stack-cleaner.json file at the root of your directory to permanently map customized targets or whitelists.

{
  "targetFolders": ["node_modules", ".next", ".turbo", "dist"],
  "excludeFolders": [".git", "important-production-build"],
  "gracePeriodDays": 7,
  "dryRun": true
}
-----------------------
Local Development
Setting up the repository locally to extend the scanning engine takes less than a minute:

1. *Clone & Enter:
Bash
git clone [https://github.com/danieltimm82/stack-cleaner.git](https://github.com/danieltimm82/stack-cleaner.git)
cd stack-cleaner

2. **Install & Test:**
Bash
npm install
npm test

3. *** Build Target:
Bash
npm run build
-----------------------
## Engineering Roadmap

[ ] **Interactive Terminal UI:** Add an interactive checkbox layout to choose exactly which folders to drop.
[ ] **Docker Cache Targets:** Prune dangling docker containers, anonymous volumes, and builder layers alongside node directory scans.

-----------------------
## Leave a Star!

If this project helped you recover disk space, please **leave a star on this repository**. It costs nothing, boosts our open-source search ranking, and drives active development!

---
**Author:** Carlos Daniel Timm  
**License:** MIT
