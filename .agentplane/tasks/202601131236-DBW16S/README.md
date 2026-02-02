---
id: "202601131236-DBW16S"
title: "Analyze config.json candidates for agent settings"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["config", "agentctl"]
verify: []
commit: { hash: "0c10cf66377f30d87d7f9049a820a193b137b6cd", message: "✨ DBW16S analyze config candidates for agent settings" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: audit config.json and agent guidance to propose new agent settings and agentctl toggles." }
  - { author: "ORCHESTRATOR", body: "verified: doc-only analysis | details: no tests required for this task." }
doc_version: 2
doc_updated_at: "2026-01-30T08:52:24+00:00"
doc_updated_by: "agentctl"
description: "Review repo configs and agent guidance to propose settings that belong in config.json and how agentctl should toggle them."
---
## Summary

Reviewed AGENTS.md + agent JSON + current config.json and proposed candidate agent settings to move into config.json with suggested agentctl toggles.

## Context

AGENTS.md currently embeds default_agent/shared_state and runtime expectations (model, reasoning effort, approvals). config.json already handles workflow, tasks, commit, and paths. This task identifies which agent-facing knobs are best promoted into config.json and how agentctl should expose them.

## Scope

- Enumerate agent-facing settings that are currently hardcoded in AGENTS.md or code.
- Recommend which belong in config.json vs remain in AGENTS.md.
- Suggest agentctl config keys and example set commands for the approved candidates.

## Risks

- Moving behavioral rules from AGENTS.md into config risks inconsistency between docs and runtime.
- Settings that the CLI/agentctl cannot enforce may give a false sense of safety if exposed as config.

## Verify Steps

Doc-only change: review task README for completeness and accuracy (no tests run).

## Rollback Plan

Revert the task README updates; no code or runtime changes.

## Notes

Candidates to promote into config.json (agent-facing):
- agents.default_agent (string): mirrors AGENTS.md default_agent; used by agentctl/CLI when an agent id is omitted.
- agents.shared_state_paths (string[]): mirrors AGENTS.md shared_state; lets tools surface where shared artifacts live.
- agents.model (string) + agents.reasoning_effort (low|medium|high): aligns with AGENTS.md defaults; informative for wrappers.
- agents.approvals.require_plan (bool): whether orchestration must request plan approval before execution.
- agents.approvals.require_external_access (bool): whether network/outside-repo actions require explicit user approval.

Suggested agentctl toggles (examples):
- python .agent-plane/agentctl.py config set agents.default_agent ORCHESTRATOR
- python .agent-plane/agentctl.py config set agents.shared_state_paths '[.agent-plane/tasks]' --json
- python .agent-plane/agentctl.py config set agents.model GPT-5-Codex
- python .agent-plane/agentctl.py config set agents.reasoning_effort medium
- python .agent-plane/agentctl.py config set agents.approvals.require_plan true
- python .agent-plane/agentctl.py config set agents.approvals.require_external_access true

Keep in AGENTS.md (doc-only; not reliably enforceable by agentctl today):
- Narrative behavior rules, step sequencing, and non-local constraints that rely on human/LLM compliance.

Optional non-agent config candidates (CLI/runtime constants to reduce hardcoding):
- recipes.index_url (currently DEFAULT_RECIPES_INDEX_URL)
- recipes.dir / recipes.lock / recipes.index (currently RECIPES_DIR_NAME, RECIPES_LOCK_NAME, RECIPES_INDEX_NAME)

Recommendation: only promote settings that agentctl or wrapper tooling can honor without violating the “core minimum” principle.
