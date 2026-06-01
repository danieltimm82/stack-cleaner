# stack-cleaner

[![Node.js CI](https://github.com/danieltimm82/stack-cleaner/actions/workflows/ci.yml/badge.svg)](https://github.com/danieltimm82/stack-cleaner/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Reclaim tens of gigabytes of wasted storage and speed up your local workspace in seconds.**

⚠️ **Safe by default — dry-run simulation before any actual deletion.**

Every developer knows the pain: your hard drive is quietly suffocated by gigabytes of forgotten `node_modules`, build artifacts, and heavy framework caches (`.next`, `.vite`, `.turbo`) from repositories you haven't touched in months.

`stack-cleaner` is a lightweight, blazing-fast CLI tool built in TypeScript that surgically scans your development directories, calculates exactly how much space is being wasted, and purges it safely.

---

## Quick Start

```bash
# 1. Scan your workspace recursively to calculate potential space savings
npx stack-cleaner scan

# 2. Purge the detected clutter and instantly recover your disk space
npx stack-cleaner clean
