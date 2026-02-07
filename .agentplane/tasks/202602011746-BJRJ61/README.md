---
id: "202602011746-BJRJ61"
title: "Update docs and optional hooks for test workflow"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202602011746-Z5WV9G"
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
doc_updated_at: "2026-02-01T17:53:56+00:00"
doc_updated_by: "agentctl"
description: "Document fast vs full test workflow and (if appropriate) add lightweight hooks or CI guidance to require full tests only on commit/push."
---
## Summary

Documented fast/full/CLI test commands and clarified hook behavior for local workflows.

## Scope

Updated docs/developer/testing-and-quality.mdx.

## Risks

Docs could drift from script behavior; keep testing docs aligned with package.json and hooks.

## Verify Steps

Review docs/developer/testing-and-quality.mdx for updated commands.

## Rollback Plan

Revert docs/developer/testing-and-quality.mdx to the previous test instructions.

## Plan


## Verification
