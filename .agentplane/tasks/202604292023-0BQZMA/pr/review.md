# PR Review

Created: 2026-04-29T20:50:01.078Z
Branch: task/202604292023-0BQZMA/agent-profile-fragments

## Summary

Migrate agent profiles to addressable prompt fragments

Convert bundled agent JSON profiles from bare string arrays to stable fragment objects with ids, text, and backward-compatible loading so recipes can patch individual agent workflow lines by fragment id.

## Scope

- In scope: Convert bundled agent JSON profiles from bare string arrays to stable fragment objects with ids, text, and backward-compatible loading so recipes can patch individual agent workflow lines by fragment id.
- Out of scope: unrelated refactors not required for "Migrate agent profiles to addressable prompt fragments".

## Verification

### Plan

1. Run `bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Bundled agent profiles now use addressable fragment objects while installed profile and runner behavior remain string-array compatible; declared checks passed.

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

- Updated: 2026-04-29T20:57:07.679Z
- Branch: task/202604292023-0BQZMA/agent-profile-fragments
- Head: 226f7dba8d2d

```text
 packages/agentplane/assets/agents/CODER.json       | 138 +++++++++++++++----
 packages/agentplane/assets/agents/CREATOR.json     |  90 ++++++++++--
 packages/agentplane/assets/agents/DOCS.json        |  96 ++++++++++---
 packages/agentplane/assets/agents/INTEGRATOR.json  | 108 ++++++++++++---
 .../agentplane/assets/agents/ORCHESTRATOR.json     | 152 +++++++++++++++++----
 packages/agentplane/assets/agents/PLANNER.json     | 144 +++++++++++++++----
 packages/agentplane/assets/agents/REDMINE.json     |  96 ++++++++++---
 packages/agentplane/assets/agents/REVIEWER.json    |  86 ++++++++++--
 .../agentplane/assets/agents/SKILL_EXTRACTOR.json  | 108 ++++++++++++---
 packages/agentplane/assets/agents/TESTER.json      | 108 ++++++++++++---
 packages/agentplane/assets/agents/UPDATER.json     |  78 +++++++++--
 packages/agentplane/assets/agents/UPGRADER.json    | 108 ++++++++++++---
 .../agentplane/src/agents/agents-template.test.ts  |  26 +++-
 packages/agentplane/src/agents/agents-template.ts  |  84 +++++++++++-
 .../cli/run-cli/commands/core/agent-profiles.ts    |  24 +++-
 .../src/runtime/prompt-fragments/json.ts           |   2 +-
 .../src/runtime/prompt-fragments/markdown.ts       |   2 +-
 .../src/runtime/prompt-fragments/model.ts          |   2 +-
 .../src/runtime/prompt-fragments/validation.ts     |   2 +-
 19 files changed, 1221 insertions(+), 233 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
