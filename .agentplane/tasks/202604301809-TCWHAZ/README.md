---
id: "202604301809-TCWHAZ"
title: "Audit GPT-5.5 prompt surfaces"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "prompt-assembly"
verify:
  - "agentplane runtime explain --json"
  - "bun run agents:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T18:09:05.183Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-30T18:14:28.886Z"
  updated_by: "CODER"
  note: "Re-verified after local PR artifact commit: runtime explain OK, agents templates OK, policy routing OK."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: audit current prompt assets, runtime assembly, execution profile config, generated mirrors, and validation coverage before prompt behavior edits."
events:
  -
    type: "status"
    at: "2026-04-30T18:10:42.185Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit current prompt assets, runtime assembly, execution profile config, generated mirrors, and validation coverage before prompt behavior edits."
  -
    type: "verify"
    at: "2026-04-30T18:13:25.423Z"
    author: "CODER"
    state: "ok"
    note: "Verified prompt surface audit: runtime explain reports repo-local 0.4.0 and no active prompt graph; agents:check reports templates OK; policy routing check reports OK."
  -
    type: "verify"
    at: "2026-04-30T18:14:28.886Z"
    author: "CODER"
    state: "ok"
    note: "Re-verified after local PR artifact commit: runtime explain OK, agents templates OK, policy routing OK."
doc_version: 3
doc_updated_at: "2026-04-30T18:14:28.891Z"
doc_updated_by: "CODER"
description: "Inventory the current v0.4 prompt architecture against OpenAI GPT-5.5 prompt guidance. Map every active prompt surface, canonical source, generated mirror, runtime path, and existing validation before editing prompt behavior."
sections:
  Summary: |-
    Audit GPT-5.5 prompt surfaces
    
    Inventory the current v0.4 prompt architecture against OpenAI GPT-5.5 prompt guidance. Map every active prompt surface, canonical source, generated mirror, runtime path, and existing validation before editing prompt behavior.
  Scope: |-
    - In scope: Inventory the current v0.4 prompt architecture against OpenAI GPT-5.5 prompt guidance. Map every active prompt surface, canonical source, generated mirror, runtime path, and existing validation before editing prompt behavior.
    - Out of scope: unrelated refactors not required for "Audit GPT-5.5 prompt surfaces".
  Plan: |-
    1. Inspect current prompt assets, fragment/module registry, runner prompt bridge, execution profile config, docs, and generated parity checks.
    2. Produce a task-local inventory of canonical prompt sources, generated outputs, current tests, and GPT-5.5 migration gaps.
    3. Do not modify prompt behavior in this task.
    4. Verify with agentplane runtime explain --json, bun run agents:check, and node .agentplane/policy/check-routing.mjs.
  Verify Steps: |-
    1. Review the requested outcome for "Audit GPT-5.5 prompt surfaces". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-30T18:13:25.423Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified prompt surface audit: runtime explain reports repo-local 0.4.0 and no active prompt graph; agents:check reports templates OK; policy routing check reports OK.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T18:13:10.218Z, excerpt_hash=sha256:a73207076d593a2e37454b9eb1779bc8a1fe3d5918269ca6a81bd2371d6846c7
    
    ### 2026-04-30T18:14:28.886Z — VERIFY — ok
    
    By: CODER
    
    Note: Re-verified after local PR artifact commit: runtime explain OK, agents templates OK, policy routing OK.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T18:13:25.435Z, excerpt_hash=sha256:a73207076d593a2e37454b9eb1779bc8a1fe3d5918269ca6a81bd2371d6846c7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    ### Prompt surface inventory
    
    - Canonical bundled prompt assets: `packages/agentplane/assets/AGENTS.md`, `packages/agentplane/assets/RUNNER.md`, `packages/agentplane/assets/policy/**`, and `packages/agentplane/assets/agents/*.json`. Installed mirrors live under `.agentplane/policy/**` and `.agentplane/agents/*.json`; they are generated/parity surfaces, not independent authorities.
    - Prompt fragments are already the v0.4 source unit. Markdown fragments use `ap:fragment` markers; agent profile arrays support structured fragment objects with stable `id`, `text`, and `mutability`.
    - Framework prompt registry: `packages/agentplane/src/runtime/prompt-modules/registry.ts` compiles gateway, policy, agent profile, runner, and execution-profile modules with deterministic addresses, provenance, mutability, load rules, and hashes.
    - Runner assembly path: `packages/agentplane/src/runner/context/base-prompts.ts` loads framework runner, repository gateway, execution profile, owner profile, overlays, project skills, and recipe context; then `prompt-module-bridge.ts` round-trips prompt blocks through modules before sorting by priority.
    - Execution profile runtime already exposes `reasoning_effort`, tool budgets, approvals, stop conditions, handoff conditions, unsafe actions, and runner settings. `text.verbosity` is not modeled today.
    - Current adapter path is Codex CLI preparation in `packages/agentplane/src/runner/adapters/codex-preparation.ts`; it builds `codex -a never exec --json --output-last-message ...`. No active Responses API assistant-item replay surface or `phase: commentary/final_answer` handling was found in runner code.
    - Documentation authority for prompt assembly is `docs/developer/modular-prompt-assembly.mdx`; it already documents runtime surfaces, fragment contract, recipe mutation targeting, diagnostics, and safe-change rules.
    - Active installed role set includes `UPDATER.json`; the old plan item about a missing UPDATER role is stale against current code.
    
    ### GPT-5.5 migration gaps
    
    - Agent profile workflow arrays remain process-heavy: CODER has 15 workflow entries, PLANNER 18, ORCHESTRATOR 19. They should be normalized into outcome-first fragments: Goal, Success criteria, Constraints, Stop rules, Output.
    - Shared collaboration, visible progress, retrieval budget, final-output contract, and Findings/incidents boundary are repeated or implicit rather than factored into a small shared contract.
    - Existing hard gates belong in `AGENTS.md` and policy modules; role JSON should reference loaded gateway and policy modules as binding constraints instead of restating command routes.
    - Diagnostics currently validate prompt fragments/modules, but there is no dedicated GPT-5.5 contract scan for overuse of absolute rules, missing stop rules, duplicate approval gates, or missing referenced roles.
    - Runtime config has reasoning effort but not an explicit verbosity policy. Because the active runner is Codex CLI, any `phase`/Responses API work must be guarded as not applicable unless a separate Responses adapter exists.
    
    ### Task boundary
    
    This task intentionally made no prompt behavior changes. The dependent tasks own diagnostics, shared contract fragments, role normalization, runtime alignment, and docs/verification.
    
    - Observation: Current code has UPDATER.json and no active Responses API phase replay path; T6 should align the actual Codex CLI runner/execution profile contract rather than editing a non-existent Responses adapter.
      Impact: Updated downstream implementation assumptions for GPT-5.5 prompt migration.
      Resolution: Recorded task-local inventory and migration gaps in Findings; no prompt behavior changes made in this task.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Audit GPT-5.5 prompt surfaces

Inventory the current v0.4 prompt architecture against OpenAI GPT-5.5 prompt guidance. Map every active prompt surface, canonical source, generated mirror, runtime path, and existing validation before editing prompt behavior.

## Scope

- In scope: Inventory the current v0.4 prompt architecture against OpenAI GPT-5.5 prompt guidance. Map every active prompt surface, canonical source, generated mirror, runtime path, and existing validation before editing prompt behavior.
- Out of scope: unrelated refactors not required for "Audit GPT-5.5 prompt surfaces".

## Plan

1. Inspect current prompt assets, fragment/module registry, runner prompt bridge, execution profile config, docs, and generated parity checks.
2. Produce a task-local inventory of canonical prompt sources, generated outputs, current tests, and GPT-5.5 migration gaps.
3. Do not modify prompt behavior in this task.
4. Verify with agentplane runtime explain --json, bun run agents:check, and node .agentplane/policy/check-routing.mjs.

## Verify Steps

1. Review the requested outcome for "Audit GPT-5.5 prompt surfaces". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-30T18:13:25.423Z — VERIFY — ok

By: CODER

Note: Verified prompt surface audit: runtime explain reports repo-local 0.4.0 and no active prompt graph; agents:check reports templates OK; policy routing check reports OK.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T18:13:10.218Z, excerpt_hash=sha256:a73207076d593a2e37454b9eb1779bc8a1fe3d5918269ca6a81bd2371d6846c7

### 2026-04-30T18:14:28.886Z — VERIFY — ok

By: CODER

Note: Re-verified after local PR artifact commit: runtime explain OK, agents templates OK, policy routing OK.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T18:13:25.435Z, excerpt_hash=sha256:a73207076d593a2e37454b9eb1779bc8a1fe3d5918269ca6a81bd2371d6846c7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

### Prompt surface inventory

- Canonical bundled prompt assets: `packages/agentplane/assets/AGENTS.md`, `packages/agentplane/assets/RUNNER.md`, `packages/agentplane/assets/policy/**`, and `packages/agentplane/assets/agents/*.json`. Installed mirrors live under `.agentplane/policy/**` and `.agentplane/agents/*.json`; they are generated/parity surfaces, not independent authorities.
- Prompt fragments are already the v0.4 source unit. Markdown fragments use `ap:fragment` markers; agent profile arrays support structured fragment objects with stable `id`, `text`, and `mutability`.
- Framework prompt registry: `packages/agentplane/src/runtime/prompt-modules/registry.ts` compiles gateway, policy, agent profile, runner, and execution-profile modules with deterministic addresses, provenance, mutability, load rules, and hashes.
- Runner assembly path: `packages/agentplane/src/runner/context/base-prompts.ts` loads framework runner, repository gateway, execution profile, owner profile, overlays, project skills, and recipe context; then `prompt-module-bridge.ts` round-trips prompt blocks through modules before sorting by priority.
- Execution profile runtime already exposes `reasoning_effort`, tool budgets, approvals, stop conditions, handoff conditions, unsafe actions, and runner settings. `text.verbosity` is not modeled today.
- Current adapter path is Codex CLI preparation in `packages/agentplane/src/runner/adapters/codex-preparation.ts`; it builds `codex -a never exec --json --output-last-message ...`. No active Responses API assistant-item replay surface or `phase: commentary/final_answer` handling was found in runner code.
- Documentation authority for prompt assembly is `docs/developer/modular-prompt-assembly.mdx`; it already documents runtime surfaces, fragment contract, recipe mutation targeting, diagnostics, and safe-change rules.
- Active installed role set includes `UPDATER.json`; the old plan item about a missing UPDATER role is stale against current code.

### GPT-5.5 migration gaps

- Agent profile workflow arrays remain process-heavy: CODER has 15 workflow entries, PLANNER 18, ORCHESTRATOR 19. They should be normalized into outcome-first fragments: Goal, Success criteria, Constraints, Stop rules, Output.
- Shared collaboration, visible progress, retrieval budget, final-output contract, and Findings/incidents boundary are repeated or implicit rather than factored into a small shared contract.
- Existing hard gates belong in `AGENTS.md` and policy modules; role JSON should reference loaded gateway and policy modules as binding constraints instead of restating command routes.
- Diagnostics currently validate prompt fragments/modules, but there is no dedicated GPT-5.5 contract scan for overuse of absolute rules, missing stop rules, duplicate approval gates, or missing referenced roles.
- Runtime config has reasoning effort but not an explicit verbosity policy. Because the active runner is Codex CLI, any `phase`/Responses API work must be guarded as not applicable unless a separate Responses adapter exists.

### Task boundary

This task intentionally made no prompt behavior changes. The dependent tasks own diagnostics, shared contract fragments, role normalization, runtime alignment, and docs/verification.

- Observation: Current code has UPDATER.json and no active Responses API phase replay path; T6 should align the actual Codex CLI runner/execution profile contract rather than editing a non-existent Responses adapter.
  Impact: Updated downstream implementation assumptions for GPT-5.5 prompt migration.
  Resolution: Recorded task-local inventory and migration gaps in Findings; no prompt behavior changes made in this task.
  Promotion: incident-candidate
  Fixability: external
