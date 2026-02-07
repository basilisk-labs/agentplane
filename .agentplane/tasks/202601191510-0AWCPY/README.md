---
id: "202601191510-0AWCPY"
title: "Implement recipes CLI and bundle compiler"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202601191510-QN0W0P"
tags:
  - "recipes"
  - "cli"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "b5d407ce6f52d57fc1103f2be5f3e9ebde18fbc8"
  message: "✨ 0AWCPY implement recipes CLI: add scan/show/compile/explain and bundle compiler"
comments:
  -
    author: "CODER"
    body: "verified: ran python .agent-plane/recipes.py --help to confirm CLI wiring and subcommand registration."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:54.620Z"
doc_updated_by: "agentplane"
description: "Build .agent-plane/recipes.py with scan/show/compile/explain, manifest normalization, context assembly, and inventory generation per recipes PRD."
---
## Summary

Implemented the recipes CLI with scan/show/compile/explain and bundle generation logic.

## Context

Added .agent-plane/recipes.py per the recipes PRD and enforced local-only behavior with context policies.

## Scope

CLI supports manifest normalization (v1 + legacy), inventory generation, bundle compilation with context hashing/inline policy, env/input validation, and bundle markdown output; added gitignore rules for run/cache artifacts.

## Risks

Minimal JSON schema validation may diverge from full schema; large context globs could still be slow if include patterns are broad.

## Verify Steps

python .agent-plane/recipes.py --help

## Rollback Plan

Revert commit b5d407ce6f52 to remove the recipes CLI and related ignore rules.

## Notes

CLI remains non-executing (scan/show/compile/explain only) and enforces no-network, no-task-writes behavior.

## Plan


## Verification
