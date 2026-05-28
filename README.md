# stack-cleaner

A production-grade, lightweight CLI tool designed to optimize, clean, and safely manage local development environments clutter (Docker containers, bloated package manager caches, and system logs).

[![CI Status](https://github.com/danieltimm82/stack-cleaner/actions/workflows/ci.yml/badge.svg)](https://github.com/danieltimm82/stack-cleaner/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node version](https://img.shields.io/badge/node-%3E%3D18.0.0-blue.svg)](https://nodejs.org)

## Features

- ****Inspect****: Deep scan of local development storage leaks.
- ****Clean****: Safe and automated eviction of orphaned Docker volumes and volatile global caches.
- ****Fast & Safe****: Built with TypeScript for reliable system-level execution.

## Installation

```bash
npm install -g stack-cleaner
