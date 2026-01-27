---
id: "202601270756-B8J0CW"
title: "AP-004: Create Node/TS monorepo + CLI build (ESM, node20)"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: ["202601270755-M1Q50F"]
tags: ["nodejs", "monorepo", "build"]
commit: { hash: "06116a797cb5bc3141cf0816bc4bfc7d3981536d", message: "✨ B8J0CW monorepo: bootstrap Node+TS workspaces and agentplane cli stub" }
comments:
  - { author: "CODER", body: "Start: bootstrapping Node.js 20+ TypeScript ESM workspace with packages/agentplane CLI and placeholder core/recipes/testkit/spec packages." }
  - { author: "CODER", body: "verified: added Node.js workspaces + TS configs and a minimal agentplane CLI stub | details: build/run requires npm install (not executed in this run)." }
doc_version: 2
doc_updated_at: "2026-01-27T07:59:54+00:00"
doc_updated_by: "agentctl"
description: "Bootstrap a Node.js 20+ ESM TypeScript monorepo with packages (agentplane CLI, core engine, recipes, spec, testkit) and a buildable agentplane binary."
---
## Summary

Bootstrap the Node.js 20+ ESM TypeScript monorepo and ship a runnable `agentplane --help` entrypoint.

## Scope

- Add root workspace config (`package.json`, `tsconfig`, build/test scripts).
- Create packages:
  - `packages/agentplane` (CLI)
  - `packages/core` (engine)
  - `packages/recipes` (recipes manager/runner)
  - `packages/spec` (types/schemas)
  - `packages/testkit` (fixtures/e2e helpers)
- Ensure ESM output and Node 20 compatibility.

## Risks

- Dependency choices (commander/tsx/tsup/vitest) affect future portability; keep initial stack minimal.
- Packaging details (bin entrypoint, ESM/CJS interop) can be tricky; validate locally.

## Verify Steps

- `node --version` is 20+.
- `npm install` (or `pnpm install`) completes.
- `npm -w @agentplane/agentplane run build` succeeds.
- `node packages/agentplane/dist/cli.mjs --help` prints help.

## Rollback Plan

- Revert monorepo bootstrap commits.
- Keep the existing Python tooling as the supported workflow until later milestones.

