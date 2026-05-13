# PR Review

Created: 2026-05-13T13:15:04.831Z

## Task

- Task: `202605131043-2GMHKQ`
- Title: Move generated projections under .agentplane/generated
- Status: DOING
- Branch: `task/202605131043-2GMHKQ/generated-scripts-context-refactor`
- Canonical task record: `.agentplane/tasks/202605131043-2GMHKQ/README.md`

## Verification

- State: ok
- Note: Verified: Obsidian/task navigation projection now writes to .agentplane/generated/obsidian with legacy generated-root cleanup. Checks passed: focused obsidian/context Vitest, typecheck, eslint, prettier, docs:cli:check, docs:ia:check, framework:dev:bootstrap.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T13:16:42.947Z
- Branch: task/202605131043-2GMHKQ/generated-scripts-context-refactor
- Head: be1ece1cb5f9

```text
 .../blueprint/resolved-snapshot.json               |  512 +++++++++
 .agentplane/tasks/202605131043-802HWG/README.md    |   91 +-
 .../blueprint/resolved-snapshot.json               |  512 +++++++++
 .agentplane/tasks/202605131043-GD7RJJ/README.md    |   91 +-
 .../blueprint/resolved-snapshot.json               |  512 +++++++++
 docs/developer/project-layout.mdx                  |   11 +-
 docs/user/cli-reference.generated.mdx              |    8 +-
 docs/user/commands.mdx                             |   27 +-
 docs/user/tasks-and-backends.mdx                   |   23 +-
 package.json                                       |  174 ++--
 packages/agentplane/package.json                   |    8 +-
 .../src/commands/context/context-utils.ts          |  262 +----
 packages/agentplane/src/commands/context/doctor.ts |  272 +----
 .../commands/context/harvest-tasks-artifacts.ts    |  572 +---------
 .../src/commands/context/harvest-tasks-markers.ts  |  132 +--
 packages/agentplane/src/commands/context/ingest.ts |  592 +----------
 .../agentplane/src/commands/context/reindex.ts     |  396 +------
 packages/agentplane/src/commands/context/sqlite.ts |  217 +---
 .../agentplane/src/commands/context/verify-task.ts |  422 +-------
 .../src/commands/task/obsidian.command.ts          |    8 +-
 packages/agentplane/src/commands/task/obsidian.ts  |   61 +-
 .../src/commands/task/obsidian.unit.test.ts        |   71 +-
 packages/agentplane/src/context/context-utils.ts   |  261 +++++
 packages/agentplane/src/context/doctor.ts          |  271 +++++
 .../src/context/harvest-tasks-artifacts.ts         |  571 ++++++++++
 .../src/context/harvest-tasks-markers.ts           |  131 +++
 packages/agentplane/src/context/ingest.ts          |  590 +++++++++++
 packages/agentplane/src/context/reindex.ts         |  395 +++++++
 packages/agentplane/src/context/sqlite.ts          |  212 ++++
 packages/agentplane/src/context/verify-task.ts     |  421 ++++++++
 .../src/runtime/shared/runtime-artifacts.ts        |    1 +
 packages/core/package.json                         |    8 +-
 packages/recipes/package.json                      |    8 +-
 scripts/README.md                                  |  240 ++---
 scripts/bench/cli-benchmark-runner.mjs             |  249 +++++
 scripts/bench/compare-cli-perf.mjs                 |  220 ++++
 scripts/bench/compare-cli-walltime.mjs             |  238 +++++
 scripts/bench/measure-cli-cold-path.mjs            |   20 +
 scripts/bench/measure-cli-perf.mjs                 |   13 +
 scripts/bench/measure-cli-walltime.mjs             |  209 ++++
 scripts/bootstrap-framework-dev.mjs                |  363 +------
 scripts/check-acr-example-version.mjs              |   33 +-
 scripts/check-agent-bootstrap-fresh.mjs            |  288 +-----
 scripts/check-agent-onboarding-scenario.mjs        |  159 +--
 scripts/check-agentplane-artifacts.mjs             |  120 +--
 scripts/check-blueprint-release-gate.mjs           |   56 +-
 scripts/check-cli-cold-baseline.mjs                |  262 +----
 scripts/check-cli-reference-fresh.mjs              |   43 +-
 scripts/check-cli-walltime-baseline.mjs            |  203 +---
 scripts/check-clone-baseline.mjs                   |  311 +-----
 scripts/check-coverage-thresholds.mjs              |   50 +-
 scripts/check-critical-test-route.mjs              |   95 +-
 scripts/check-depcruise-known-violations.mjs       |  143 +--
 scripts/check-design-language.mjs                  |  118 +--
 scripts/check-docs-ia.mjs                          |  381 +------
 scripts/check-github-protection-contract.mjs       |  143 +--
 scripts/check-knip-baseline.mjs                    |  253 +----
 scripts/check-local-tarball-install-smoke.mjs      |  120 +--
 scripts/check-no-console.mjs                       |  130 +--
 scripts/check-npm-version-availability.mjs         |   84 +-
 scripts/check-oversized-test-baseline.mjs          |  286 +----
 scripts/check-package-tarball.mjs                  |  151 +--
 scripts/check-policy-routing.mjs                   |    3 +-
 scripts/check-published-packages.mjs               |  115 +--
 scripts/check-recipes-inventory-fresh.mjs          |   25 +-
 scripts/check-release-demo.mjs                     |   41 +-
 scripts/check-release-incidents.mjs                |   52 +-
 scripts/check-release-notes.mjs                    |  215 +---
 scripts/check-release-parity.mjs                   |   27 +-
 scripts/check-release-recovery-state.mjs           | 1088 +-------------------
 scripts/check-release-version.mjs                  |   55 +-
 scripts/check-significant-coverage.mjs             |   42 +-
 scripts/check-spec-examples.mjs                    |  207 +---
 scripts/check-task-state.mjs                       |  108 +-
 scripts/check-test-routing.mjs                     |  131 +--
 scripts/check-types-files.mjs                      |   97 +-
 scripts/check-vitest-projects.mjs                  |   42 +-
 scripts/check-workflow-command-contract.mjs        |  115 +--
 scripts/check-workflow-harness-coverage.mjs        |   52 +-
 scripts/checks/check-acr-example-version.mjs       |   31 +
 scripts/checks/check-agent-bootstrap-fresh.mjs     |  286 +++++
 scripts/checks/check-agent-onboarding-scenario.mjs |  157 +++
 scripts/checks/check-agentplane-artifacts.mjs      |  118 +++
 scripts/checks/check-blueprint-release-gate.mjs    |   54 +
 scripts/checks/check-cli-cold-baseline.mjs         |  260 +++++
 scripts/checks/check-cli-reference-fresh.mjs       |   41 +
 scripts/checks/check-cli-walltime-baseline.mjs     |  201 ++++
 scripts/checks/check-clone-baseline.mjs            |  309 ++++++
 scripts/checks/check-coverage-thresholds.mjs       |   48 +
 scripts/checks/check-critical-test-route.mjs       |   93 ++
 .../checks/check-depcruise-known-violations.mjs    |  141 +++
 scripts/checks/check-design-language.mjs           |  116 +++
 scripts/checks/check-docs-ia.mjs                   |  379 +++++++
 .../checks/check-github-protection-contract.mjs    |  141 +++
 scripts/checks/check-knip-baseline.mjs             |  251 +++++
 scripts/checks/check-no-console.mjs                |  128 +++
 scripts/checks/check-oversized-test-baseline.mjs   |  284 +++++
 scripts/checks/check-policy-routing.mjs            |    1 +
 scripts/checks/check-recipes-inventory-fresh.mjs   |   23 +
 scripts/checks/check-significant-coverage.mjs      |   40 +
 scripts/checks/check-spec-examples.mjs             |  205 ++++
 scripts/checks/check-task-state.mjs                |  106 ++
 scripts/checks/check-test-routing.mjs              |  129 +++
 scripts/checks/check-types-files.mjs               |   95 ++
 scripts/checks/check-vitest-projects.mjs           |   40 +
 scripts/checks/check-workflow-command-contract.mjs |  113 ++
 scripts/checks/check-workflow-harness-coverage.mjs |   50 +
 scripts/checks/ci-scope.mjs                        |  115 +++
 scripts/checks/hotspot-report.mjs                  |  508 +++++++++
 scripts/checks/run-backend-live-suite.mjs          |   99 ++
 scripts/checks/run-checks.mjs                      |   91 ++
 scripts/checks/run-commit-msg-hook.mjs             |   26 +
 scripts/checks/run-local-ci.mjs                    |  233 +++++
 scripts/checks/run-pre-commit-hook.mjs             |  123 +++
 scripts/checks/run-pre-commit-test-fast.mjs        |   31 +
 scripts/checks/run-pre-push-hook.mjs               |  331 ++++++
 scripts/checks/run-significant-coverage-suite.mjs  |   29 +
 scripts/checks/run-vitest-suite.mjs                |  162 +++
 scripts/ci-scope.mjs                               |  117 +--
 scripts/cli-benchmark-runner.mjs                   |  254 +----
 scripts/compare-cli-perf.mjs                       |  222 +---
 scripts/compare-cli-walltime.mjs                   |  240 +----
 scripts/enforce-github-publish.mjs                 |   13 +-
 scripts/generate-agent-bootstrap-doc.mjs           |   58 +-
 scripts/generate-builtin-assets.mjs                |  112 +-
 scripts/generate-bun-cli-assets.mjs                |  245 +----
 scripts/generate-llms-full.mjs                     |   52 +-
 scripts/generate-recipes-inventory.mjs             |  174 +---
 scripts/generate-release-distribution.mjs          |  531 +---------
 scripts/generate-roadmap-illustration.mjs          |   51 +-
 scripts/generate-scripts-readme.mjs                |  187 +---
 scripts/generate-standalone-cli-assets.mjs         |  591 +----------
 scripts/generate-website-docs.mjs                  |   90 +-
 scripts/generate/generate-agent-bootstrap-doc.mjs  |   56 +
 scripts/generate/generate-builtin-assets.mjs       |  110 ++
 scripts/generate/generate-bun-cli-assets.mjs       |  243 +++++
 scripts/generate/generate-llms-full.mjs            |   50 +
 scripts/generate/generate-recipes-inventory.mjs    |  171 +++
 scripts/generate/generate-release-distribution.mjs |  529 ++++++++++
 scripts/generate/generate-roadmap-illustration.mjs |   49 +
 scripts/generate/generate-scripts-readme.mjs       |  187 ++++
 .../generate/generate-standalone-cli-assets.mjs    |  589 +++++++++++
 scripts/generate/generate-website-docs.mjs         |   88 ++
 scripts/generate/render-ghcr-image-metadata.mjs    |  217 ++++
 scripts/generate/render-homebrew-formula.mjs       |  194 ++++
 scripts/generate/render-scoop-manifest.mjs         |  175 ++++
 .../generate/render-setup-agentplane-action.mjs    |  268 +++++
 scripts/generate/sync-agent-templates.mjs          |   74 ++
 scripts/generate/sync-schemas.mjs                  |   91 ++
 scripts/hotspot-report.mjs                         |  510 +--------
 scripts/manifest.mjs                               |  824 +--------------
 scripts/measure-cli-cold-path.mjs                  |   22 +-
 scripts/measure-cli-perf.mjs                       |   15 +-
 scripts/measure-cli-walltime.mjs                   |  214 +---
 scripts/prepare-hosted-task-closure.mjs            |  164 +--
 scripts/prune-package-js.mjs                       |   26 +-
 scripts/publish-external-distribution.mjs          |  361 +------
 scripts/reinstall-global-agentplane.sh             |   41 +-
 scripts/release-check.mjs                          |    4 +-
 scripts/release-task-evidence.mjs                  |  517 +---------
 .../release/check-local-tarball-install-smoke.mjs  |  118 +++
 scripts/release/check-npm-version-availability.mjs |   82 ++
 scripts/release/check-package-tarball.mjs          |  149 +++
 scripts/release/check-published-packages.mjs       |  113 ++
 scripts/release/check-release-demo.mjs             |   39 +
 scripts/release/check-release-incidents.mjs        |   50 +
 scripts/release/check-release-notes.mjs            |  213 ++++
 scripts/release/check-release-parity.mjs           |   25 +
 scripts/release/check-release-recovery-state.mjs   | 1086 +++++++++++++++++++
 scripts/release/check-release-version.mjs          |   53 +
 scripts/release/enforce-github-publish.mjs         |   11 +
 scripts/release/manifest.mjs                       |  822 +++++++++++++++
 scripts/release/prune-package-js.mjs               |   24 +
 scripts/release/publish-external-distribution.mjs  |  359 +++++++
 scripts/release/release-check.mjs                  |    2 +
 scripts/release/release-task-evidence.mjs          |  515 +++++++++
 scripts/release/resolve-canonical-release-sha.mjs  |  244 +++++
 scripts/release/resolve-release-ready-source.mjs   |   94 ++
 scripts/release/run-local-release-e2e.mjs          |  357 +++++++
 scripts/release/smoke-bun-compiled-cli.mjs         |  208 ++++
 scripts/release/smoke-standalone-cli-artifact.mjs  |  280 +++++
 scripts/render-ghcr-image-metadata.mjs             |  219 +---
 scripts/render-homebrew-formula.mjs                |  196 +---
 scripts/render-scoop-manifest.mjs                  |  177 +---
 scripts/render-setup-agentplane-action.mjs         |  270 +----
 scripts/repair-historical-task-commits.mjs         |  121 +--
 scripts/resolve-canonical-release-sha.mjs          |  246 +----
 scripts/resolve-release-ready-source.mjs           |   96 +-
 scripts/run-backend-live-suite.mjs                 |  101 +-
 scripts/run-checks.mjs                             |   93 +-
 scripts/run-commit-msg-hook.mjs                    |   28 +-
 scripts/run-local-ci.mjs                           |  235 +----
 scripts/run-local-release-e2e.mjs                  |  359 +------
 scripts/run-pre-commit-hook.mjs                    |  125 +--
 scripts/run-pre-commit-test-fast.mjs               |   33 +-
 scripts/run-pre-push-hook.mjs                      |  333 +-----
 scripts/run-runner-codex-approval-probe.mjs        |  221 +---
 scripts/run-runner-codex-smoke.mjs                 |  601 +----------
 scripts/run-significant-coverage-suite.mjs         |   31 +-
 scripts/run-vitest-suite.mjs                       |  164 +--
 scripts/run-workflow-coverage-suite.mjs            |   31 +-
 scripts/run-workflows-lint.mjs                     |   40 +-
 scripts/smoke-bun-compiled-cli.mjs                 |  210 +---
 scripts/smoke-standalone-cli-artifact.mjs          |  282 +----
 scripts/sync-agent-templates.mjs                   |   76 +-
 scripts/sync-schemas.mjs                           |   93 +-
 scripts/verify-global-agentplane-install.mjs       |  174 +---
 scripts/wait-remote-pr-checks.mjs                  |  596 +----------
 scripts/workflow/bootstrap-framework-dev.mjs       |  361 +++++++
 scripts/workflow/prepare-hosted-task-closure.mjs   |  162 +++
 scripts/workflow/reinstall-global-agentplane.sh    |   38 +
 .../workflow/repair-historical-task-commits.mjs    |  119 +++
 .../workflow/run-runner-codex-approval-probe.mjs   |  219 ++++
 scripts/workflow/run-runner-codex-smoke.mjs        |  599 +++++++++++
 scripts/workflow/run-workflow-coverage-suite.mjs   |   29 +
 scripts/workflow/run-workflows-lint.mjs            |   38 +
 .../workflow/verify-global-agentplane-install.mjs  |  172 ++++
 scripts/workflow/wait-remote-pr-checks.mjs         |  594 +++++++++++
 218 files changed, 21886 insertions(+), 19993 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
