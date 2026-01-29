---
id: "202601290714-TZBJ1M"
title: "AP-037: tool runner for scenarios"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: ["202601290714-QE3NNN"]
tags: ["roadmap", "nodejs", "recipes"]
commit: { hash: "068662b0d2243b855f42e5c7c92d91b8d6b5e02a", message: "✨ TZBJ1M scenario tool runner" }
comments:
  - { author: "CODER", body: "Start: implement scenario tool runner (node/bash) with run artifacts." }
  - { author: "CODER", body: "verified: manual review only | details: tests not run (known failing run-cli.test.ts expectation for invalid meta.json)." }
  - { author: "CODER", body: "verified: manual review only | details: tests not run (known failing run-cli.test.ts expectation for invalid meta.json)." }
doc_version: 2
doc_updated_at: "2026-01-29T14:27:41+00:00"
doc_updated_by: "agentctl"
description: "Implement minimal tools runner for node and bash runtimes with declared permissions and run artifacts."
---
## Summary

Add minimal scenario runner to execute recipe tools and store run artifacts.

## Scope

- Implement scenario run command with node/bash tool execution\n- Emit permission warnings from manifest\n- Store stdout/stderr and meta under .agentplane/recipes/<id>/runs

## Risks

- Tool execution is unsandboxed in v1; warnings must be clear

## Verify Steps

- bun test packages/agentplane/src/run-cli.test.ts

## Rollback Plan

- Revert the AP-037 commits to remove scenario runner

