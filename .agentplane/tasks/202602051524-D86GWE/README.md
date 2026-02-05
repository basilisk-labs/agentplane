---
id: "202602051524-D86GWE"
title: "AP-080: Sign recipes index"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "recipes", "security"]
verify: []
commit: { hash: "de8eaeb3cca9a840ed47be975afc1d80b8fcb5d5", message: "✨ D86GWE sign recipes index verification" }
comments:
  - { author: "CODER", body: "Start: Implement signed recipes index validation, update recipes repo, and add tests/docs per scope." }
  - { author: "CODER", body: "Verified: Implemented signed recipes index verification and published index.json.sig; bun run test:fast. Signature failure/success validated via recipes tests." }
doc_version: 2
doc_updated_at: "2026-02-05T15:44:10.341Z"
doc_updated_by: "CODER"
description: "Add signed recipes index verification in CLI and publish index.json.sig in recipes repo."
id_source: "generated"
---
## Summary

Sign recipes index and verify signatures before using the catalog.

## Scope

- Add signature file index.json.sig in agentplane-recipes.
- Verify index signature in CLI for remote/local/cache sources.
- Add tests for invalid/missing signature.
- Update docs describing signed index.

## Risks

- Signature verification could break existing installs without signed index.
- Key rotation mistakes could block updates.

## Verify Steps

- Run bun run test:fast.
- Verify recipes list-remote fails on missing/invalid signature.
- Verify recipes list-remote succeeds with signed index.

## Verification

Pending.

- ✅ bun run test:fast (pass).\n- ✅ recipes list-remote signature failure/success covered in recipes tests (missing/invalid signature + signed index).

## Rollback Plan

- Revert CLI signature verification changes.
- Remove index.json.sig from recipes repo if needed.
