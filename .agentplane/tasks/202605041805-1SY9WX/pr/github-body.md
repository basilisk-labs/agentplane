Task: `202605041805-1SY9WX`
Title: Add experimental ap agent mode

## Summary

Add experimental ap agent mode

Add an experimental short ap entrypoint with agent-oriented defaults, non-interactive guardrails, and focused verification for the next release.

## Scope

- In scope: Add an experimental short ap entrypoint with agent-oriented defaults, non-interactive guardrails, and focused verification for the next release.
- Out of scope: unrelated refactors not required for "Add experimental ap agent mode".

## Verification

- State: ok
- Note: Prompt assets now prefer compact ap agent commands with agentplane fallback; routing, focused ap tests, typecheck, bootstrap, tarball check, and doctor passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T18:26:31.849Z
- Branch: task/202605041805-1SY9WX/ap-agent-mode
- Head: d8095eeb4369

```text
 packages/agentplane/README.md                      | 11 ++++
 packages/agentplane/assets/AGENTS.md               | 54 ++++++++---------
 packages/agentplane/assets/RUNNER.md               |  4 +-
 packages/agentplane/assets/agents/CODER.json       |  4 +-
 packages/agentplane/assets/agents/CREATOR.json     |  4 +-
 packages/agentplane/assets/agents/DOCS.json        |  6 +-
 packages/agentplane/assets/agents/EVALUATOR.json   |  2 +-
 packages/agentplane/assets/agents/INTEGRATOR.json  |  6 +-
 .../agentplane/assets/agents/ORCHESTRATOR.json     |  4 +-
 packages/agentplane/assets/agents/PLANNER.json     |  4 +-
 packages/agentplane/assets/agents/REDMINE.json     |  2 +-
 packages/agentplane/assets/agents/REVIEWER.json    |  4 +-
 .../agentplane/assets/agents/SKILL_EXTRACTOR.json  |  4 +-
 packages/agentplane/assets/agents/TESTER.json      |  4 +-
 packages/agentplane/assets/agents/UPDATER.json     |  2 +-
 packages/agentplane/assets/agents/UPGRADER.json    |  6 +-
 .../assets/codex-plugin/skills/agentplane/SKILL.md | 22 +++----
 packages/agentplane/bin/ap.js                      |  7 +++
 packages/agentplane/bin/runtime-watch.js           |  1 +
 packages/agentplane/package.json                   |  2 +
 .../src/cli/run-cli.core.installed-smoke.test.ts   | 16 +++++
 packages/agentplane/src/cli/run-cli.core.test.ts   | 67 +++++++++++++++++++++
 packages/agentplane/src/cli/run-cli.ts             |  8 ++-
 packages/agentplane/src/cli/run-cli/agent-mode.ts  | 70 ++++++++++++++++++++++
 scripts/check-local-tarball-install-smoke.mjs      |  9 +++
 scripts/check-package-tarball.mjs                  |  1 +
 scripts/lib/generated-artifacts.mjs                |  1 +
 27 files changed, 258 insertions(+), 67 deletions(-)
```

</details>
