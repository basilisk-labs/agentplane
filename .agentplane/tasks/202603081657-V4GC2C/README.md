---
id: "202603081657-V4GC2C"
title: "Modernize installed agent prompts for current best practices"
result_summary: "Modernized the installed development-agent prompts to align with current prompt-engineering best practices: clearer role boundaries, explicit uncertainty handling, evidence-oriented outputs, and synchronized bundled/installable prompt assets."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "agents"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T17:05:20.029Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T17:05:56.456Z"
  updated_by: "CODER"
  note: "Verified prompt modernization with bun run agents:check, bunx vitest run packages/agentplane/src/agents/agents-template.test.ts, and bun run docs:site:check; bundled assets, installed .agentplane/agents mirror, and the updated docs/user/agents.mdx surface all stayed consistent."
commit:
  hash: "dadc1fec6adfd7baa2853ac5c40a25bcd06517fe"
  message: "✨ V4GC2C agents: modernize installed development prompts"
comments:
  -
    author: "CODER"
    body: "Start: auditing bundled agent prompts, current role boundaries, and prompt contract enforcement so the installed development agents can be refactored to a clearer, lower-ambiguity instruction set without breaking workflow policy."
  -
    author: "CODER"
    body: "Verified: modernized bundled development-agent prompts now emphasize narrower role boundaries, clearer assumptions/escalation rules, and evidence-oriented outputs, with bundled assets, installed mirrors, and the user-facing agents docs surface all verified."
events:
  -
    type: "status"
    at: "2026-03-08T16:58:43.735Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: auditing bundled agent prompts, current role boundaries, and prompt contract enforcement so the installed development agents can be refactored to a clearer, lower-ambiguity instruction set without breaking workflow policy."
  -
    type: "verify"
    at: "2026-03-08T17:05:56.456Z"
    author: "CODER"
    state: "ok"
    note: "Verified prompt modernization with bun run agents:check, bunx vitest run packages/agentplane/src/agents/agents-template.test.ts, and bun run docs:site:check; bundled assets, installed .agentplane/agents mirror, and the updated docs/user/agents.mdx surface all stayed consistent."
  -
    type: "status"
    at: "2026-03-08T17:06:54.356Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: modernized bundled development-agent prompts now emphasize narrower role boundaries, clearer assumptions/escalation rules, and evidence-oriented outputs, with bundled assets, installed mirrors, and the user-facing agents docs surface all verified."
doc_version: 3
doc_updated_at: "2026-03-08T17:06:54.356Z"
doc_updated_by: "CODER"
description: "Audit the bundled development-agent prompts, compare them with current primary-source prompt-engineering guidance, and improve the installed prompts and supporting docs/tests without breaking the repository workflow contract."
id_source: "generated"
---
## Summary

Modernize installed agent prompts for current best practices

Audit the bundled development-agent prompts, compare them with current primary-source prompt-engineering guidance, and improve the installed prompts and supporting docs/tests without breaking the repository workflow contract.

## Scope

- In scope: Audit the bundled development-agent prompts, compare them with current primary-source prompt-engineering guidance, and improve the installed prompts and supporting docs/tests without breaking the repository workflow contract.
- Out of scope: unrelated refactors not required for "Modernize installed agent prompts for current best practices".

## Plan

1. Audit the bundled agent JSON prompts, the generator/tests that enforce them, and the current role/help surfaces.
2. Compare the current prompt structure against current primary-source prompt-engineering guidance and identify concrete prompt anti-patterns to remove.
3. Refactor the installed development-agent prompts to use clearer role boundaries, explicit action/stop rules, and stronger uncertainty/escalation handling while preserving the repository workflow contract.
4. Update any docs/tests/snapshots that enforce prompt wording or installed assets, then run targeted verification for agent templates and affected CLI/help surfaces.

## Verify Steps

1. Run `bun run agents:check`. Expected: bundled `packages/agentplane/assets/agents/*.json` and installed `.agentplane/agents/*.json` stay synchronized with no drift.
2. Run `bunx vitest run packages/agentplane/src/agents/agents-template.test.ts`. Expected: bundled agent templates, installed agent profiles, and managed mirrors stay in sync.
3. Run `bun run docs:site:check`. Expected: the updated `docs/user/agents.mdx` page builds cleanly and no docs-site validation step fails.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T17:05:56.456Z — VERIFY — ok

By: CODER

Note: Verified prompt modernization with bun run agents:check, bunx vitest run packages/agentplane/src/agents/agents-template.test.ts, and bun run docs:site:check; bundled assets, installed .agentplane/agents mirror, and the updated docs/user/agents.mdx surface all stayed consistent.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T17:05:51.143Z, excerpt_hash=sha256:e4f207850d4db884167916edb52903a6d7b6a33dc42b254db637fa9b607bb692

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: the bundled development-agent prompts had grown repetitive and left too much ambiguity around decision boundaries, uncertainty handling, and escalation paths.
  Impact: roles were still usable, but they pushed too much cognitive work onto the caller and made overlap between planning, implementation, review, and integration easier than necessary.
  Resolution: rewrote the installed agent JSON profiles to emphasize narrow role ownership, explicit assumptions/stop rules, evidence-oriented outputs, and task-local Findings instead of premature policy promotion.
  Promotion: none.
