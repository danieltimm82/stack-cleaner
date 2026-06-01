# ⚡ stack-cleaner

[![Node.js CI](https://github.com/danieltimm82/stack-cleaner/actions/workflows/ci.yml/badge.svg)](https://github.com/danieltimm82/stack-cleaner/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**💥 Free up tens of gigabytes of disk space in seconds — without breaking your projects.**

⚠️ Safe by default — dry-run simulation before any actual deletion.

---

## 🧠 The Problem

Every developer knows this pain:

Your hard drive is quietly suffocated by gigabytes of forgotten:
- `node_modules`
- build artifacts (`dist`, `build`)
- framework caches (`.next`, `.vite`, `.turbo`)

---

## ⚙️ The Solution

`stack-cleaner` is a blazing-fast CLI that:

✅ Scans your workspace  
✅ Detects wasted storage  
✅ Protects active projects  
✅ Cleans safely — in seconds  

---

## 🚀 Quick Start

```bash
# Scan your workspace
npx stack-cleaner scan

# Clean safely
npx stack-cleaner clean

💥 Real Performance Impact
⚡ stack-cleaner v1.0.1 — Smart Workspace Optimization

✔ Removed 32 folders
🛡️ Safeguarded 14 active projects

🎉 Total space recovered: 24.83 GB
⚡ Finished in 4.12s

✨ Key Features

🛡️ Smart Active Project Protection
Skips projects modified in the last 7 days to prevent data loss.
⚡ Blazing Fast Engine
Traverses large monorepos in seconds with native filesystem performance.
⚙️ Configuration as Code
Customize behavior with stack-cleaner.json.

⚙️ Configuration
{
  "targetFolders": ["node_modules", ".next", ".turbo", "dist"],
  "excludeFolders": [".git", "important-production-build"],
  "gracePeriodDays": 7,
  "dryRun": true
}

Roadmap
 () Interactive Terminal UI
 () Docker cache cleaning

⭐ Support the Project
If this tool saved you disk space:
👉 ⭐ Star the repo
👉 Share with other devs

Author: Carlos Daniel Timm
License: MIT
