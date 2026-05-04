# PR Review

Created: 2026-05-04T18:05:43.955Z
Branch: task/202605041805-1SY9WX/ap-agent-mode

## Summary

Add experimental ap agent mode

Add an experimental short ap entrypoint with agent-oriented defaults, non-interactive guardrails, and focused verification for the next release.

## Scope

- In scope: Add an experimental short ap entrypoint with agent-oriented defaults, non-interactive guardrails, and focused verification for the next release.
- Out of scope: unrelated refactors not required for "Add experimental ap agent mode".

## Verification

### Plan

1. Run focused CLI tests for experimental ap agent mode. Expected: compact help defaults, shorthand expansion, and non-interactive init error behavior pass.
2. Run installed/package smoke coverage for the ap bin. Expected: pseudo-installed and npm tarball installs expose ap and agentplane successfully.
3. Run package tarball policy. Expected: agentplane package includes bin/ap.js and no unexpected files.
4. Run typecheck, git diff --check, policy routing, framework bootstrap, and agentplane doctor. Expected: all pass or any unrelated broad-suite failures are recorded explicitly.

### Current Status

- State: ok
- Note: Addressed Codex review blockers for ap shorthand and agent-mode JSON global parse errors; targeted agent-mode tests, installed smoke, lint, and diff check passed.

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

- Updated: 2026-05-04T19:23:38.990Z
- Branch: task/202605041805-1SY9WX/ap-agent-mode
- Head: 1fddd152c511

```text
 .agentplane/agents/CODER.json                      |  4 +-
 .agentplane/agents/CREATOR.json                    |  4 +-
 .agentplane/agents/DOCS.json                       |  6 +-
 .agentplane/agents/EVALUATOR.json                  |  2 +-
 .agentplane/agents/INTEGRATOR.json                 |  6 +-
 .agentplane/agents/ORCHESTRATOR.json               |  4 +-
 .agentplane/agents/PLANNER.json                    |  4 +-
 .agentplane/agents/REDMINE.json                    |  2 +-
 .agentplane/agents/REVIEWER.json                   |  4 +-
 .agentplane/agents/SKILL_EXTRACTOR.json            |  4 +-
 .agentplane/agents/TESTER.json                     |  4 +-
 .agentplane/agents/UPDATER.json                    |  2 +-
 .agentplane/agents/UPGRADER.json                   |  6 +-
 packages/agentplane/README.md                      | 11 ++++
 packages/agentplane/assets/AGENTS.md               | 54 +++++++--------
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
 packages/agentplane/bin/ap.js                      |  7 ++
 packages/agentplane/bin/runtime-watch.js           |  1 +
 packages/agentplane/package.json                   |  2 +
 .../agentplane/src/agents/agents-template.test.ts  |  6 +-
 .../agentplane/src/cli/run-cli.agent-mode.test.ts  | 34 ++++++++++
 .../src/cli/run-cli.core.installed-smoke.test.ts   | 20 ++++++
 packages/agentplane/src/cli/run-cli.ts             | 10 ++-
 .../agentplane/src/cli/run-cli/agent-mode.test.ts  | 28 ++++++++
 packages/agentplane/src/cli/run-cli/agent-mode.ts  | 77 ++++++++++++++++++++++
 packages/agentplane/src/cli/runtime-watch.test.ts  |  1 +
 .../src/commands/runtime.command.test.ts           |  2 +-
 packages/agentplane/src/commands/upgrade.ts        |  1 -
 scripts/check-local-tarball-install-smoke.mjs      |  9 +++
 scripts/check-package-tarball.mjs                  |  1 +
 scripts/lib/generated-artifacts.mjs                |  1 +
 45 files changed, 296 insertions(+), 99 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
