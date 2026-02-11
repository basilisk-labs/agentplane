---
id: "202602112051-A9ANGA"
title: "Enforce release-time dependency parity (agentplane/core)"
result_summary: "Release validation now blocks agentplane/core dependency drift"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602112051-AGP0RF"
tags:
  - "code"
  - "release"
  - "quality"
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
  hash: "faba798154dc17a951aa47e2d2cacfaa6d7a90c2"
  message: "🛠️ A9ANGA release: enforce core dependency parity in release check"
comments:
  -
    author: "CODER"
    body: "Start: Enforcing release-time parity between agentplane version and @agentplaneorg/core dependency."
  -
    author: "CODER"
    body: "Verified: check-release-version enforces package versions and @agentplaneorg/core dependency parity; dedicated script tests pass."
events:
  -
    type: "status"
    at: "2026-02-11T20:58:09.354Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Enforcing release-time parity between agentplane version and @agentplaneorg/core dependency."
  -
    type: "status"
    at: "2026-02-11T21:00:41.484Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: check-release-version enforces package versions and @agentplaneorg/core dependency parity; dedicated script tests pass."
doc_version: 2
doc_updated_at: "2026-02-11T21:00:41.484Z"
doc_updated_by: "CODER"
description: "Extend release validation to fail when packages/agentplane depends on @agentplaneorg/core version that does not match release version."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

1) node scripts/check-release-version.mjs --tag v0.2.19
Expected: passes with current repo versions.
2) node -e "const fs=require("fs");const p="packages/agentplane/package.json";const j=JSON.parse(fs.readFileSync(p,"utf8"));j.dependencies["@agentplaneorg/core"]="0.0.0";fs.writeFileSync(p,JSON.stringify(j,null,2)+"\n");" && node scripts/check-release-version.mjs --tag v0.2.19
Expected: fails with clear parity error.
3) bun run test:critical
Expected: pass.
