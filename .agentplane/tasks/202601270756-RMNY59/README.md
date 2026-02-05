---
id: "202601270756-RMNY59"
title: "AP-005: Project discovery + path resolver for .agentplane"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: ["202601270756-B8J0CW"]
tags: ["nodejs", "core"]
verify: []
commit: { hash: "9696dd28c368c87392c199a4f58a2716e3368d01", message: "✨ RMNY59 core: add git root discovery and .agentplane resolver" }
comments:
  - { author: "CODER", body: "Start: implementing git-root discovery + .agentplane path resolver with unit tests under packages/core." }
  - { author: "CODER", body: "verified: implemented findGitRoot/resolveProject in @agentplane/core with TS unit tests (run via npm after installing deps)." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:03.631Z"
doc_updated_by: "agentplane"
description: "Implement git-root discovery and .agentplane path resolution from any subdirectory, including --root override."
---
## Summary

Implement project discovery (git root) and `.agentplane` path resolution from any working directory.

## Scope

- Implement a resolver that:
  - finds git root (walking up directories),
  - locates `.agentplane` relative to git root,
  - supports `--root <path>` override.
- Add unit tests covering subdir execution and failure modes.

## Risks

- Git discovery edge cases (submodules, bare repos) can complicate root detection.
- Path resolution must be deterministic to avoid writing outside the intended repo.

## Verify Steps

- Run resolver tests (e.g. `npm -w @agentplane/core test`).
- Manually run `agentplane --root <repo>` from a nested subdirectory and confirm it finds `.agentplane`.

## Rollback Plan

- Revert resolver changes; keep CLI limited to running from repo root temporarily.
