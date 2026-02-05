---
id: "202601270755-QFAJS8"
title: "M0: Node.js migration foundation (AP-001..AP-006)"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["nodejs", "roadmap", "m0"]
verify: []
commit: { hash: "0e80893fb17c6903d0cca8a56b0b7d32e10e5bb2", message: "✨ QFAJS8 roadmap: record M0 implementation landing points" }
comments:
  - { author: "ORCHESTRATOR", body: "verified: M0 tasks AP-001..AP-006 completed (CLI contract, specs, recipes spec, Node workspace scaffold, project resolver, config show | details: set). Builds/tests require npm install." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:02.378Z"
doc_updated_by: "agentplane"
description: "Implement M0 of the AgentPlane Node.js migration roadmap: CLI contract, file format specs, recipe spec, monorepo scaffold, project root resolver, and config+validation commands."
---
## Summary

Ship M0 of the Node.js migration: define contracts/specs and bootstrap the Node.js monorepo so subsequent milestones can implement the engine and workflows.

## Scope

- AP-001: Document CLI contract v1 (`docs/cli-contract.md`).
- AP-002: Define v1 file formats and JSON Schemas (`packages/spec`).
- AP-003: Define v1 recipes spec (`docs/recipes-spec.md`, schema).
- AP-004: Create Node.js/TS monorepo scaffold (ESM, node20) with a runnable `agentplane --help`.
- AP-005: Implement project discovery + `.agentplane` path resolver.
- AP-006: Implement `.agentplane/config.json` read/write + validation and `agentplane config show|set`.

## Risks

- Toolchain drift: TypeScript/ESM build setup may diverge from the eventual packaging strategy.
- Spec drift: schemas and CLI contract might need iteration once M1/M2 flows are implemented.
- Migration clarity: `.agentplane` is a breaking change vs `.agent-plane` and needs consistent docs.

## Verify Steps

- `node --version` shows Node.js 20+.
- `npm -w @agentplane/agentplane run build` succeeds.
- `node packages/agentplane/dist/cli.mjs --help` prints help.

## Rollback Plan

- Revert commits created for AP-001..AP-006.
- Keep existing Python framework unchanged; do not switch any projects to `.agentplane` until M7.
