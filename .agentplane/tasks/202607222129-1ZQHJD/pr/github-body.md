Task: `202607222129-1ZQHJD`
Title: Capture anchored multi-run RF-04 replay telemetry
Canonical task record: `.agentplane/tasks/202607222129-1ZQHJD/README.md`

## Summary

Capture anchored multi-run RF-04 replay telemetry

Add an additive replay baseline for immutable pre-v0.7 main commit 1a702e160ba9f0efe7067f2a22fc008defc89ffb by executing all ten RF-04 scenarios at least five times in isolated fixtures, recording authoritative observed outcomes, provider token usage, cognitive and orchestration proxies, latency, retrieval, and evidence-provenance metrics, and enforcing offline provenance and coverage checks without rewriting the historical RF-04 baseline or changing product semantics.

## Scope

- Resolve 70/70 outcome cells with field-level provenance: golden expectations and declared lifecycle controls are fixture_control; filesystem effects, final status, scope violations, and other independently measured facts are supervisor_observed. Never relabel fixture controls as observations.
- Resolve 27/27 provider-reported role token cells and all 170 scalar cells as an observed value or typed not_applicable; never encode unknown as zero and never persist prompts, final text, stderr, credentials, or hidden reasoning.
- Capture ten RF-04 scenarios at five runs each as 50 sanitized envelopes and 55 declared provider episodes under one fixed model/runtime profile, using exact-anchor CLI preparation and the reviewed Codex driver.
- Preserve scripts/baselines/agent-efficiency-pre-v0.7-main.json unchanged; the replay baseline remains additive and anchored to exact historical main 1a702e160ba9f0efe7067f2a22fc008defc89ffb.
- Keep product semantics unchanged; this task measures and verifies the pre-v0.7 control.

## Verification

- State: needs_rework
- Note:

```text
Fresh clone:check on RF-04 head ba30ea2a fails only because the branch is eight main commits behind
W084MM: 91 clones versus baseline 88. Update the task branch from main fd1e52a7, keep RF-04
artifacts and immutable anchor unchanged, then rerun the full declared verification contract.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-23T12:19:22.838Z
- Branch: task/202607222129-1ZQHJD/capture-anchored-multi-run-rf-04-replay-telemetr
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221838-SD1W93/README.md    |   12 +-
 .agentplane/tasks/202607221907-DK2CJF/README.md    |    2 +
 .github/workflows/ci.yml                           |    4 +
 .github/workflows/prepublish.yml                   |    3 +
 .prettierignore                                    |    5 +
 docs/internal/v0.7-agent-efficiency-baseline.md    |  137 +-
 docs/internal/v0.7-refactor-plan.md                |    1 +
 package.json                                       |    4 +-
 ...critical.agent-efficiency-replay-driver.test.ts |  535 ++
 ...tical.agent-efficiency-replay-hardening.test.ts |  728 +++
 ...un-cli.critical.agent-efficiency-replay.test.ts |  958 +++
 scripts/README.md                                  |   66 +-
 .../agent-efficiency-pre-v0.7-replay.json          | 6296 ++++++++++++++++++++
 .../adapter_failure/run-01.json                    |  363 ++
 .../adapter_failure/run-02.json                    |  363 ++
 .../adapter_failure/run-03.json                    |  363 ++
 .../adapter_failure/run-04.json                    |  363 ++
 .../adapter_failure/run-05.json                    |  363 ++
 .../approval_required/run-01.json                  |  330 +
 .../approval_required/run-02.json                  |  330 +
 .../approval_required/run-03.json                  |  330 +
 .../approval_required/run-04.json                  |  330 +
 .../approval_required/run-05.json                  |  330 +
 .../branch_pr/run-01.json                          |  395 ++
 .../branch_pr/run-02.json                          |  397 ++
 .../branch_pr/run-03.json                          |  397 ++
 .../branch_pr/run-04.json                          |  397 ++
 .../branch_pr/run-05.json                          |  395 ++
 .../context_assimilation/run-01.json               |  330 +
 .../context_assimilation/run-02.json               |  330 +
 .../context_assimilation/run-03.json               |  330 +
 .../context_assimilation/run-04.json               |  330 +
 .../context_assimilation/run-05.json               |  330 +
 .../direct/run-01.json                             |  365 ++
 .../direct/run-02.json                             |  365 ++
 .../direct/run-03.json                             |  365 ++
 .../direct/run-04.json                             |  365 ++
 .../direct/run-05.json                             |  367 ++
 .../evaluator_rework/run-01.json                   |  397 ++
 .../evaluator_rework/run-02.json                   |  397 ++
 .../evaluator_rework/run-03.json                   |  397 ++
 .../evaluator_rework/run-04.json                   |  397 ++
 .../evaluator_rework/run-05.json                   |  399 ++
 .../hermes_one_step/run-01.json                    |  363 ++
 .../hermes_one_step/run-02.json                    |  363 ++
 .../hermes_one_step/run-03.json                    |  365 ++
 .../hermes_one_step/run-04.json                    |  365 ++
 .../hermes_one_step/run-05.json                    |  367 ++
 .../missing_knowledge/run-01.json                  |  363 ++
 .../missing_knowledge/run-02.json                  |  363 ++
 .../missing_knowledge/run-03.json                  |  363 ++
 .../missing_knowledge/run-04.json                  |  363 ++
 .../missing_knowledge/run-05.json                  |  363 ++
 .../scope_violation/run-01.json                    |  365 ++
 .../scope_violation/run-02.json                    |  365 ++
 .../scope_violation/run-03.json                    |  365 ++
 .../scope_violation/run-04.json                    |  365 ++
 .../scope_violation/run-05.json                    |  363 ++
 .../stale_state/run-01.json                        |  330 +
 .../stale_state/run-02.json                        |  330 +
 .../stale_state/run-03.json                        |  330 +
 .../stale_state/run-04.json                        |  330 +
 .../stale_state/run-05.json                        |  330 +
 .../adapter_failure/run-01.json                    |  158 +
 .../adapter_failure/run-02.json                    |  158 +
 .../adapter_failure/run-03.json                    |  158 +
 .../adapter_failure/run-04.json                    |  158 +
 .../adapter_failure/run-05.json                    |  158 +
 .../approval_required/run-01.json                  |  108 +
 .../approval_required/run-02.json                  |  108 +
 .../approval_required/run-03.json                  |  108 +
 .../approval_required/run-04.json                  |  108 +
 .../approval_required/run-05.json                  |  108 +
 .../branch_pr/run-01.json                          |  225 +
 .../branch_pr/run-02.json                          |  229 +
 .../branch_pr/run-03.json                          |  229 +
 .../branch_pr/run-04.json                          |  229 +
 .../branch_pr/run-05.json                          |  215 +
 .../context_assimilation/run-01.json               |  109 +
 .../context_assimilation/run-02.json               |  109 +
 .../context_assimilation/run-03.json               |  109 +
 .../context_assimilation/run-04.json               |  109 +
 .../context_assimilation/run-05.json               |  109 +
 .../direct/run-01.json                             |  178 +
 .../direct/run-02.json                             |  178 +
 .../direct/run-03.json                             |  178 +
 .../direct/run-04.json                             |  178 +
 .../direct/run-05.json                             |  172 +
 .../evaluator_rework/run-01.json                   |  309 +
 .../evaluator_rework/run-02.json                   |  316 +
 .../evaluator_rework/run-03.json                   |  309 +
 .../evaluator_rework/run-04.json                   |  309 +
 .../evaluator_rework/run-05.json                   |  303 +
 .../hermes_one_step/run-01.json                    |  170 +
 .../hermes_one_step/run-02.json                    |  170 +
 .../hermes_one_step/run-03.json                    |  174 +
 .../hermes_one_step/run-04.json                    |  174 +
 .../hermes_one_step/run-05.json                    |  168 +
 .../missing_knowledge/run-01.json                  |  158 +
 .../missing_knowledge/run-02.json                  |  158 +
 .../missing_knowledge/run-03.json                  |  158 +
 .../missing_knowledge/run-04.json                  |  158 +
 .../missing_knowledge/run-05.json                  |  158 +
 .../scope_violation/run-01.json                    |  170 +
 .../scope_violation/run-02.json                    |  177 +
 .../scope_violation/run-03.json                    |  177 +
 .../scope_violation/run-04.json                    |  170 +
 .../scope_violation/run-05.json                    |  164 +
 .../stale_state/run-01.json                        |  109 +
 .../stale_state/run-02.json                        |  109 +
 .../stale_state/run-03.json                        |  109 +
 .../stale_state/run-04.json                        |  109 +
 .../stale_state/run-05.json                        |  109 +
 scripts/bench/capture-agent-efficiency-replay.mjs  |  595 ++
 .../internal/agent-efficiency-anchor-runtime.mjs   |  254 +
 .../agent-efficiency-anchor-supervisor.mjs         |  559 ++
 .../internal/agent-efficiency-capture-runtime.mjs  |  130 +
 .../internal/agent-efficiency-codex-runtime.mjs    |  264 +
 .../agent-efficiency-dependency-manifest.mjs       |  485 ++
 .../internal/agent-efficiency-driver-contract.mjs  |  112 +
 .../internal/agent-efficiency-fixture-effects.mjs  |  133 +
 .../bench/run-agent-efficiency-codex-replay.mjs    |  587 ++
 scripts/checks/check-agent-efficiency-replay.mjs   |  179 +
 scripts/lib/agent-efficiency-replay-harness.mjs    |  133 +
 scripts/lib/agent-efficiency-replay-safety.mjs     |  317 +
 scripts/lib/agent-efficiency-replay.mjs            | 1480 +++++
 126 files changed, 40437 insertions(+), 44 deletions(-)
```

</details>
