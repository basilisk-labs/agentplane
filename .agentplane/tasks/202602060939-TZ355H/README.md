---
id: "202602060939-TZ355H"
title: "F1: Migrate task README docs to new template (Plan + Verification + frontmatter)"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202602060828-XNQ05M"
  - "202602060831-K1EC6R"
  - "202602060857-KN1ZRG"
tags:
  - "roadmap"
  - "tasks"
  - "migration"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T10:31:59.336Z"
  updated_by: "USER"
  note: "Approved (chat 2026-02-06)"
verification:
  state: "ok"
  updated_at: "2026-02-06T10:43:04.867Z"
  updated_by: "CODER"
  note: "F1: added task migrate-doc command and tests; bun run format:check, lint, test:fast, test:cli:core"
commit:
  hash: "33b0547928e046be1196b930c0c96c0f1de26c61"
  message: "🧰 TZ355H migrate task README docs to new template"
comments:
  -
    author: "CODER"
    body: "Start: Implement doc migration command (migrate-doc) to add Plan/Verification sections and frontmatter defaults without content loss; add idempotence tests."
  -
    author: "CODER"
    body: "Verified: Implemented  to add missing Plan/Verification sections and pending plan_approval/verification frontmatter without losing content, with idempotence tests; updated CLI wiring/help and ran format:check, lint, test:fast, test:cli:core."
doc_version: 2
doc_updated_at: "2026-02-06T10:43:13.577Z"
doc_updated_by: "CODER"
description: "Add migrate-doc command to backfill Plan/Verification sections and plan_approval/verification objects without losing content; idempotent."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Add agentplane task migrate-doc command to migrate existing task READMEs\n2) Migration: add missing ## Plan/## Verification sections without deleting content\n3) Initialize missing frontmatter plan_approval + verification with pending state\n4) Ensure YAML formatting uses current diff-friendly renderer\n5) Tests: migration preserves content; second run is idempotent (0 diff)

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T10:43:04.867Z — VERIFY — ok

By: CODER

Note: F1: added task migrate-doc command and tests; bun run format:check, lint, test:fast, test:cli:core

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
