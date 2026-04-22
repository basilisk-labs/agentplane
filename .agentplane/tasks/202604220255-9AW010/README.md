---
id: "202604220255-9AW010"
title: "Complete core subpath surface and root import ban"
result_summary: "Added core config/project/commit subpath entries, migrated production import callsites, updated Vitest aliases and test mocks, and enforced production root @agentplaneorg/core import ban."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604220255-AQHZT4"
tags:
  - "architecture"
  - "core"
  - "lint"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:01.169Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T05:53:38.305Z"
  updated_by: "CODER"
  note: "Verified core subpath exports and production root import ban. Checks passed: bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check."
commit:
  hash: "b88824de690666664003a69e864c086a50680cca"
  message: "🧩 9AW010 core: complete subpath imports"
comments:
  -
    author: "CODER"
    body: "Start: add core config/project/commit subpaths and migrate production root core imports."
  -
    author: "CODER"
    body: "Verified: core config/project/commit subpaths are exported, production root imports are banned, and workspace imports use subpaths."
events:
  -
    type: "status"
    at: "2026-04-22T05:18:24.910Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add core config/project/commit subpaths and migrate production root core imports."
  -
    type: "verify"
    at: "2026-04-22T05:53:38.305Z"
    author: "CODER"
    state: "ok"
    note: "Verified core subpath exports and production root import ban. Checks passed: bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check."
  -
    type: "status"
    at: "2026-04-22T05:54:01.019Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: core config/project/commit subpaths are exported, production root imports are banned, and workspace imports use subpaths."
doc_version: 3
doc_updated_at: "2026-04-22T05:54:01.019Z"
doc_updated_by: "CODER"
description: "Add missing core subpath exports for config/project/commit surfaces and make lint enforcement cover remaining production root imports."
sections:
  Summary: "Finish the subpath-export migration so production packages do not depend on the root @agentplaneorg/core barrel except intentional public compatibility cases."
  Scope: "Core package exports, tsup config if needed, ESLint restricted imports, and production import callsites. Avoid breaking external compatibility without documented deprecation."
  Plan: |-
    1. Inventory remaining production root core imports and map symbols to subpaths.
    2. Add missing subpath entries for config/project/commit as needed.
    3. Migrate callsites and extend lint restrictions.
    4. Keep root barrel as compatibility surface where policy requires.
  Verify Steps: "Run lint/fast CI, core build/type checks, arch checks, cold-path check."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T05:53:38.305Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified core subpath exports and production root import ban. Checks passed: bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T05:18:24.928Z, excerpt_hash=sha256:cd3e42ebc31b61adce310efdb18b3dc8d9290a2eb548e5b1bbf2ef525d9e7b8e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore root imports and remove newly added subpath export entries."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Finish the subpath-export migration so production packages do not depend on the root @agentplaneorg/core barrel except intentional public compatibility cases.

## Scope

Core package exports, tsup config if needed, ESLint restricted imports, and production import callsites. Avoid breaking external compatibility without documented deprecation.

## Plan

1. Inventory remaining production root core imports and map symbols to subpaths.
2. Add missing subpath entries for config/project/commit as needed.
3. Migrate callsites and extend lint restrictions.
4. Keep root barrel as compatibility surface where policy requires.

## Verify Steps

Run lint/fast CI, core build/type checks, arch checks, cold-path check.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T05:53:38.305Z — VERIFY — ok

By: CODER

Note: Verified core subpath exports and production root import ban. Checks passed: bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T05:18:24.928Z, excerpt_hash=sha256:cd3e42ebc31b61adce310efdb18b3dc8d9290a2eb548e5b1bbf2ef525d9e7b8e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore root imports and remove newly added subpath export entries.

## Findings

None yet.
