---
id: "202603071440-66YY8J"
title: "Add startup surface drift check"
status: "TODO"
priority: "med"
owner: "TESTER"
depends_on:
  - "202603071440-XT4PAE"
  - "202603071440-X5MFK1"
tags:
  - "code"
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
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-03-07T14:43:09.250Z"
doc_updated_by: "TESTER"
description: "Add an automated consistency check so AGENTS.md, quickstart, role output, and bootstrap docs cannot silently diverge."
id_source: "generated"
---
## Summary

Add an automated startup-surface drift check across gateway, bootstrap docs, and CLI help.

## Scope

Create a check that fails when canonical startup commands or references diverge between AGENTS, bootstrap docs, and CLI-generated help.

## Plan

1. Add a check script. 2. Add tests or CI wiring. 3. Make the failure actionable and low-noise.

## Risks

A weak drift check adds maintenance cost without catching real divergence; an over-strict one may become flaky.

## Verify Steps

1. Run the new drift check. 2. Run relevant CLI/doc tests. 3. Confirm failure text names the mismatching surface.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove or loosen the new check if it produces false positives or cannot run in standard repo verification.
