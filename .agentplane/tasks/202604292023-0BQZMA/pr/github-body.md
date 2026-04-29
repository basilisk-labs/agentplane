## Summary

Migrate agent profiles to addressable prompt fragments

Convert bundled agent JSON profiles from bare string arrays to stable fragment objects with ids, text, and backward-compatible loading so recipes can patch individual agent workflow lines by fragment id.

## Scope

- In scope: Convert bundled agent JSON profiles from bare string arrays to stable fragment objects with ids, text, and backward-compatible loading so recipes can patch individual agent workflow lines by fragment id.
- Out of scope: unrelated refactors not required for "Migrate agent profiles to addressable prompt fragments".

## Verification

- State: ok
- Note: Bundled agent profiles now use addressable fragment objects while installed profile and runner behavior remain string-array compatible; declared checks passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

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
