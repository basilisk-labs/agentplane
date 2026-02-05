---
id: "202602051201-8C5SHH"
title: "AP-020c: zip validation via yauzl"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202602051201-MNK3HD"]
tags: ["roadmap", "security", "archive", "backend"]
verify: ["bun run test:fast"]
commit: { hash: "4c71f6e7f028d30b66722e2944e917817abc7865", message: "🛡️ 8C5SHH yauzl zip validation" }
comments:
  - { author: "CODER", body: "Start: auditing current archive validation (tar/unzip), recipe/upgrade entry points, and tests before switching zip handling to yauzl." }
  - { author: "CODER", body: "Verified: bun run test:fast; bun run lint; bun run test:fast (post-lint)." }
doc_version: 2
doc_updated_at: "2026-02-05T12:09:10.752Z"
doc_updated_by: "CODER"
description: "Replace/extend zip validation to use yauzl for safe entry inspection (zip-slip prevention) across updates/recipes."
id_source: "generated"
---
## Summary

Switched zip entry validation to yauzl (zip-slip/symlink detection) and added yauzl dependencies.

## Scope

Updated archive validation to use yauzl for zip entry inspection; kept tar handling via tar/unzip; added @types/yauzl; retained existing extract flow.

## Risks

Zip symlink detection relies on externalFileAttributes; archives without proper attributes may bypass symlink detection.

## Verify Steps

bun run test:fast -- --run packages/agentplane/src/cli/archive.test.ts

## Rollback Plan

Revert this task commit to restore unzip-based zip validation.
