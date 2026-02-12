---
id: "202602121056-4B15SH"
title: "CI: enforce generated CLI docs freshness after command changes"
result_summary: "CI now enforces up-to-date generated CLI reference"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-12T11:02:33.915Z"
  updated_by: "CODER"
  note: "Verified: added CLI reference freshness checker, wired into CI/publish and release:ci-check; regenerated cli-reference and checker passes with lint."
commit:
  hash: "cedd27766d8cacb1275cc267dc23a501d182b9ca"
  message: "✅ 4B15SH ci: enforce generated cli reference freshness"
comments:
  -
    author: "CODER"
    body: "Start: add deterministic cli-reference freshness checker and enforce it in CI/release gates."
  -
    author: "CODER"
    body: "Verified: checker script compares generated output to docs/user/cli-reference.generated.mdx and is wired into CI, publish, and release:ci-check."
events:
  -
    type: "status"
    at: "2026-02-12T11:00:52.602Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add deterministic cli-reference freshness checker and enforce it in CI/release gates."
  -
    type: "verify"
    at: "2026-02-12T11:02:33.915Z"
    author: "CODER"
    state: "ok"
    note: "Verified: added CLI reference freshness checker, wired into CI/publish and release:ci-check; regenerated cli-reference and checker passes with lint."
  -
    type: "status"
    at: "2026-02-12T11:03:58.579Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: checker script compares generated output to docs/user/cli-reference.generated.mdx and is wired into CI, publish, and release:ci-check."
doc_version: 2
doc_updated_at: "2026-02-12T11:03:58.579Z"
doc_updated_by: "CODER"
description: "Introduce a check that fails CI when docs/user/cli-reference.generated.mdx is stale relative to current CLI command specs/guide."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-12T11:02:33.915Z — VERIFY — ok

By: CODER

Note: Verified: added CLI reference freshness checker, wired into CI/publish and release:ci-check; regenerated cli-reference and checker passes with lint.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T11:00:52.602Z, excerpt_hash=sha256:be6b967105c4eee5351f03788bc5c99e9f0394a2fab4ea6a0f583e11f7e019a4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
2. node scripts/check-cli-reference-fresh.mjs
3. bun run lint
