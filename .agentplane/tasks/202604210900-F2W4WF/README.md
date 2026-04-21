---
id: "202604210900-F2W4WF"
title: "Define recipes signing algorithm policy"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "security"
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
doc_version: 3
doc_updated_at: "2026-04-21T09:00:14.570Z"
doc_updated_by: "PLANNER"
description: "Add an ADR and verifier-registry path for recipe index signatures so ed25519 remains supported while future algorithm rotation is possible."
sections:
  Summary: "Formalize recipe signing algorithm policy and replace hard-coded single-algorithm assumptions with an explicit verifier registry."
  Scope: "In scope: ADR, recipe signature verification code, algorithm/key_id handling, and tests. Out of scope: implementing a production PQC verifier dependency unless already available."
  Plan: |-
    1. Document current ed25519 behavior and rotation requirements.
    2. Add ADR describing allowed algorithms, key_id, created_at, and future dual-signature policy.
    3. Refactor verifier code into a registry that currently supports ed25519.
    4. Add tests for unknown algorithms and valid ed25519 signatures.
  Verify Steps: |-
    - ed25519 verification still passes.
    - Unknown algorithms fail clearly.
    - ADR records future PQC/dual-signature policy without pretending it is implemented.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert ADR and verifier registry changes."
  Findings: "Source input: AUDIT H-5 and REFACTORING_PLAN E.3."
id_source: "generated"
---
## Summary

Formalize recipe signing algorithm policy and replace hard-coded single-algorithm assumptions with an explicit verifier registry.

## Scope

In scope: ADR, recipe signature verification code, algorithm/key_id handling, and tests. Out of scope: implementing a production PQC verifier dependency unless already available.

## Plan

1. Document current ed25519 behavior and rotation requirements.
2. Add ADR describing allowed algorithms, key_id, created_at, and future dual-signature policy.
3. Refactor verifier code into a registry that currently supports ed25519.
4. Add tests for unknown algorithms and valid ed25519 signatures.

## Verify Steps

- ed25519 verification still passes.
- Unknown algorithms fail clearly.
- ADR records future PQC/dual-signature policy without pretending it is implemented.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert ADR and verifier registry changes.

## Findings

Source input: AUDIT H-5 and REFACTORING_PLAN E.3.
