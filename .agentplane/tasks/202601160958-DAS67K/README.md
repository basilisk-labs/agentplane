---
id: "202601160958-DAS67K"
title: "Define UPGRADER agent and workflow"
status: "DONE"
priority: "normal"
owner: "CREATOR"
depends_on: []
tags:
  - "agents"
  - "workflow"
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
  hash: "f58936f62dc99a48a59dc6481ee2477602267672"
  message: "✨ DAS67K tidy deps"
comments:
  -
    author: "CREATOR"
    body: "verified: Documented the UPGRADER agent lifecycle, triggers, and config expectations for automation readiness."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:51.092Z"
doc_updated_by: "agentplane"
description: "Review agentctl layout and specify UPGRADER responsibilities for automatic framework refresh, covering trigger conditions, config timestamp handling, and interactions with other agents."
---
## Summary

- Capture the new UPGRADER agent's purpose so the automation keeps framework metadata accurate and actions predictable.
- Describe the trigger rules, configuration dependencies, and downstream reporting that make the agent actionable.

## Context

- agentctl now exposes `upgrade`, a CLI path that must honor the `framework` section of `.agent-plane/config.json` and stay aligned with the pinned base branch.
- CREATOR owns communicating how UPGRADER should be invoked (stale/forced), what it writes back to the config, and how other agents rely on it.

## Scope

- Document the staleness threshold (10 days) and forced path that decide when the agent runs.
- Spell out the required clean-tree/base-branch preconditions and the metadata (`framework.last_update`, `framework.source`) the agent reads/writes.
- Explain the expected outputs (updated config, run report, PR notes) so REVIEWER/INTEGRATOR know what to look for.

## Risks

- Forced pulls assume `git pull --ff-only` will succeed; if upstream diverges the command fails and the agent must surface that error.
- Network or GitHub availability affects automation; the agent must log retries/failures so humans can intervene.

## Verify Steps

- Review `.agent-plane/agentctl.py` to ensure the upgrade command follows the documented behavior.
- Run `python3 -m unittest tests.test_framework_upgrade` to prove helper math that enters the spec works.
- Optionally execute `python .agent-plane/agentctl.py upgrade --force` from a clean base branch to validate the end-to-end flow.

## Rollback Plan

- Revert the agent spec (`.agent-plane/agents/UPGRADER.json`) and the section additions in `.agent-plane/config.json` to drop the new metadata if problems surface.
- Revert any upgrade command invocations by resetting the branch to the prior commit, then re-run tests.

## Notes

- Downstream tasks cover the actual CLI implementation (`202601160958-NV8M5V`) and regression tests (`202601160958-AM3G42`), so keep this spec in sync with those artifacts.

## Plan


## Verification
