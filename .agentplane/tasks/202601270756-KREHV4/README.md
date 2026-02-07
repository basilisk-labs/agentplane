---
id: "202601270756-KREHV4"
title: "AP-002: Fix file formats v1 (tasks/exports/config/PR meta)"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202601270755-M1Q50F"
tags:
  - "nodejs"
  - "spec"
  - "schemas"
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
  hash: "e7101cd7c5f2ac4d76c9776bfd8cb58c1acb8cbe"
  message: "✨ KREHV4 spec: add v1 schemas and examples (config/tasks/pr meta)"
comments:
  -
    author: "CODER"
    body: "Start: adding v1 JSON Schemas + examples for config, task frontmatter, tasks export, and PR artifacts."
  -
    author: "CODER"
    body: "verified: added packages/spec with v1 JSON Schemas + examples for config, task README frontmatter, tasks export, and PR meta."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:03.319Z"
doc_updated_by: "agentplane"
description: "Define v1 file formats for AGENTS.md, .agentplane/config.json, task README frontmatter+sections, tasks.json export schema+checksum canonicalization, and PR artifacts."
---
## Summary

Freeze v1 file formats (tasks/config/PR meta) and ship JSON Schemas + examples for Node.js implementation.

## Scope

- Specify the v1 schemas for:
  - `AGENTS.md` (sections/contract for entrypoint generation).
  - `.agentplane/config.json` (schema_version, workflow_mode, paths, policies).
  - Task README frontmatter + required sections.
  - `tasks.json` export + checksum canonicalization rules.
  - PR artifacts (meta + verify log + diffstat + optional review notes).
- Add schemas and examples under `packages/spec/`.

## Risks

- Over-specifying early can slow down implementation; keep schemas focused on v1 invariants.
- Canonicalization details (JSON ordering/whitespace) can cause parity drift later.

## Verify Steps

- Validate example JSON files against the shipped schemas.
- Confirm the spec matches the migration constraints (no `.agent-plane` compatibility).

## Rollback Plan

- Revert schema/spec commits if they block implementation; re-introduce minimal schemas later.

## Plan


## Verification
