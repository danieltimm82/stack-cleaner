# stack-cleaner

A command-line tool (CLI) designed to analyze, map, and optimize local development environments. If you work with multiple repositories and constantly run out of disk space or face sluggish builds due to accumulated clutter (`orphaned node_modules`, heavy framework caches like `.next` or `.vite`), stack-cleaner tackles this surgically and safely.

The main difference here is that it doesn't blindly delete your work. It performs a structured static scan, strictly respecting your custom configuration rules.

---

## Quick Start

You don't need to install anything globally. Run it directly using `npx`:

```bash
npx stack-cleaner
