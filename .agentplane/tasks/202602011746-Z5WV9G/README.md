---
id: "202602011746-Z5WV9G"
title: "Implement fast/full test entrypoints"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202602011746-2BER2W"
tags:
  - "testing"
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
  hash: "edce441b3d5c3f65c01265fa365b89ee2c94b06a"
  message: "⚡ 1KSBF8 2BER2W Z5WV9G BJRJ61 speed up tests: add fast/full/cli scripts; update hooks; document workflow"
comments: []
doc_version: 2
doc_updated_at: "2026-02-01T17:53:33+00:00"
doc_updated_by: "agentctl"
description: "Add modular test scripts/config for fast (default) and full (pre-push/commit) runs; adjust timeouts if needed and keep coverage sensible."
---
## Summary

Added fast/full/CLI test scripts, updated hooks to run fast tests on pre-commit and full tests on pre-push, and aligned docs.

## Scope

Updated test scripts in package.json, hook commands in lefthook.yml, and testing docs.

## Risks

Hook behavior changes may surprise contributors; ensure full suite remains required before push/commit.

## Verify Steps

bun run test:fast

## Rollback Plan

Revert package.json, lefthook.yml, and docs changes to restore the prior single test command and hook behavior.

## Plan


## Verification
