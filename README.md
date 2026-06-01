# stack-cleaner

[![Node.js CI](https://github.com/danieltimm82/stack-cleaner/actions/workflows/ci.yml/badge.svg)](https://github.com/danieltimm82/stack-cleaner/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Reclaim tens of gigabytes of wasted storage and speed up your local workspace in seconds. Safe by default.**

Every developer knows the pain: you work on dozens of repositories, and months later your hard drive is quietly suffocated by gigabytes of forgotten `node_modules`, build artifacts, and hidden framework caches (`.next`, `.vite`, `.turbo`). 

`stack-cleaner` is a lightweight, blazing-fast CLI tool built in TypeScript that surgically scans your development directories, calculates exactly how much space is being wasted, and lets you purge it instantly.

---

## Real Performance Impact

```text
stack-cleaner v1.0.1 — Initiating smart environment optimization [Command: CLEAN]
-----------------------------------------------------------------------------------------
✔ [Purged] /Users/dev/projects/old-ecommerce/node_modules (~814.2 MB)
✔ [Purged] /Users/dev/projects/test-api/.next (~342.1 MB)
✔ [Purged] /Users/dev/projects/legacy-dashboard/node_modules (~1.2 GB)
✔ [Purged] /Users/dev/workspace/sandbox/.turbo (~189.5 MB)
-----------------------------------------------------------------------------------------
[SUCCESS] Cleanup finished in 4.12s!
Removed 38 folders successfully.
Total space recovered: 24.83 GB
