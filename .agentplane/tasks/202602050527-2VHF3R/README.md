---
id: "202602050527-2VHF3R"
title: "AP-001: Align exit codes with CLI contract"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "cli", "errors", "contract"]
verify: []
commit: { hash: "0e43b050ec7a13329ae787bff9163f0f64a0fd4b", message: "🧩 2VHF3R align exit codes with contract" }
comments:
  - { author: "CODER", body: "Start: align E_NETWORK/E_BACKEND exit codes and add contract tests." }
  - { author: "CODER", body: "Verified: bun run test:agentplane; bun run test:cli:core; updated E_NETWORK/E_BACKEND exit codes per contract." }
  - { author: "CODER", body: "Verified: bun run test:agentplane; bun run test:cli:core; updated exit codes per contract." }
doc_version: 2
doc_updated_at: "2026-02-05T05:37:53.404Z"
doc_updated_by: "CODER"
description: "Unify exit codes for E_NETWORK/E_BACKEND per cli-contract; add tests."
id_source: "generated"
---
## Summary

Align CLI exit codes with documented contract for network/backend errors and lock behavior via tests.

## Scope

Add a single exit-code mapping module, update network/backend call sites, and add contract tests.

## Risks

Risk: hidden call sites still set legacy exit codes; mitigate via targeted tests covering E_NETWORK/E_BACKEND and contract table.

## Verify Steps

Run CLI unit tests covering exit codes; confirm E_NETWORK -> 7 and E_BACKEND -> 6; ensure other codes match doc.

## Rollback Plan

Revert commit for this task; restore previous exit-code assignments and tests if regressions appear.
