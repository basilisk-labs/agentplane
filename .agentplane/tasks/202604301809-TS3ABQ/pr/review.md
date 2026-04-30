# PR Review

Created: 2026-04-30T18:36:44.737Z
Branch: task/202604301809-TS3ABQ/gpt55-core-agent-profiles

## Summary

Normalize core agent profiles for GPT-5.5

Rewrite core agent profiles around Goal, Success criteria, Constraints, Stop rules, and Output while preserving role boundaries and AgentPlane lifecycle constraints.

## Scope

- In scope: Rewrite core agent profiles around Goal, Success criteria, Constraints, Stop rules, and Output while preserving role boundaries and AgentPlane lifecycle constraints.
- Out of scope: unrelated refactors not required for "Normalize core agent profiles for GPT-5.5".

## Verification

### Plan

1. Review the requested outcome for "Normalize core agent profiles for GPT-5.5". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Verified: compact keyed agent profile format added with derived fragment ids and legacy array/object compatibility; core profiles normalized to Goal/Success criteria/Constraints/Stop rules/Output; role/IDE readers handle keyed maps; docs updated. Checks: bun run agents:sync, bun run agents:check, targeted prompt/template/registry/GPT-5.5 tests, bun run typecheck, bun run lint:core, node .agentplane/policy/check-routing.mjs, git diff --check, targeted Prettier check, agentplane role CODER.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T19:00:40.243Z
- Branch: task/202604301809-TS3ABQ/gpt55-core-agent-profiles
- Head: 3b9799c1478f

```text
 .agentplane/agents/CODER.json                      | 144 +++----------------
 .agentplane/agents/ORCHESTRATOR.json               | 152 +++------------------
 .agentplane/agents/PLANNER.json                    | 147 +++-----------------
 .agentplane/agents/REVIEWER.json                   |  97 +++----------
 .agentplane/agents/TESTER.json                     | 119 +++-------------
 docs/developer/modular-prompt-assembly.mdx         |  32 +++--
 packages/agentplane/assets/agents/CODER.json       | 144 +++----------------
 .../agentplane/assets/agents/ORCHESTRATOR.json     | 152 +++------------------
 packages/agentplane/assets/agents/PLANNER.json     | 147 +++-----------------
 packages/agentplane/assets/agents/REVIEWER.json    |  97 +++----------
 packages/agentplane/assets/agents/TESTER.json      | 119 +++-------------
 .../agentplane/src/agents/agents-template.test.ts  |  26 ++--
 packages/agentplane/src/agents/agents-template.ts  |  21 +--
 .../cli/run-cli/commands/core/agent-profiles.ts    |   4 +-
 .../agentplane/src/cli/run-cli/commands/ide.ts     |  20 ++-
 .../src/runtime/prompt-fragments/json.test.ts      |  60 ++++++++
 .../src/runtime/prompt-fragments/json.ts           | 105 ++++++++++++--
 .../src/runtime/prompt-fragments/model.ts          |   6 +-
 .../runtime/prompt-modules/gpt55-contract.test.ts  |  25 +++-
 .../src/runtime/prompt-modules/registry.test.ts    |   4 +-
 20 files changed, 428 insertions(+), 1193 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
