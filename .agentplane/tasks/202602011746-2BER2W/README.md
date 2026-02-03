---
id: "202602011746-2BER2W"
title: "Audit test runtime and identify slow suites"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags: ["testing"]
verify: []
commit: { hash: "edce441b3d5c3f65c01265fa365b89ee2c94b06a", message: "⚡ 1KSBF8 2BER2W Z5WV9G BJRJ61 speed up tests: add fast/full/cli scripts; update hooks; document workflow" }
comments:
  - { author: "CODER", body: "Start: audit current test tooling, locate slow suites/timeouts, and propose fast vs full split; will avoid touching unrelated docs changes." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:38.491Z"
doc_updated_by: "agentplane"
description: "Inspect current test tooling/config, measure or infer slow suites/timeouts, and propose fast vs full test split."
---
## Summary

Identified slow CLI integration tests (cli-smoke/run-cli) and proposed a fast vs full split using vitest exclude/include flags.


## Scope

Scope limited to test tooling/scripts and workflow guidance; no production code changes.


## Risks

Fast suite skips CLI integration coverage; mitigate by requiring full suite before push/commit.


## Verify Steps

bun run test:fast


## Rollback Plan

Revert test script and hook changes to restore the previous single-suite workflow.
