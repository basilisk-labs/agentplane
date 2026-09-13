Task: `202609121424-4BC7B3`
Title: Qualify and document the 0.7.9 stabilization candidate for ST-18 through ST-20
Canonical task record: `.agentplane/tasks/202609121424-4BC7B3/README.md`

## Summary

Qualify and document the 0.7.9 stabilization candidate for ST-18 through ST-20

Source contract: agentplane-roadmap-r2 cards ST-18, ST-19, and ST-20. Build the exact clean installed candidate and run the frozen direct, branch, recovery, old-record, required PLANNER, and required EVALUATOR corpus. Then, under the user-approved spend and sandbox authority, execute the preregistered M01 paired pilot with complete all-attempt raw evidence and expand only by its fixed uncertainty rule; report NOT ESTABLISHED when coverage is insufficient. Record exact product and target SHAs separately. Finally document only observed 0.7.9 behavior and measurements and the 0.7.10 through 0.7.14 boundary. Do not weaken golden outcomes, disable Blueprint writers, omit required stages, rerun until green, or claim unsupported efficiency. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: package tarball check, local install smoke, release critical suite, benchmark check and replay check, documentation bootstrap and onboarding checks, plus exact evidence review.

## Scope

- In scope: Source contract: agentplane-roadmap-r2 cards ST-18, ST-19, and ST-20. Build the exact clean installed candidate and run the frozen direct, branch, recovery, old-record, required PLANNER, and required EVALUATOR corpus. Then, under the user-approved spend and sandbox authority, execute the preregistered M01 paired pilot with complete all-attempt raw evidence and expand only by its fixed uncertainty rule; report NOT ESTABLISHED when coverage is insufficient. Record exact product and target SHAs separately. Finally document only observed 0.7.9 behavior and measurements and the 0.7.10 through 0.7.14 boundary. Do not weaken golden outcomes, disable Blueprint writers, omit required stages, rerun until green, or claim unsupported efficiency. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: package tarball check, local install smoke, release critical suite, benchmark check and replay check, documentation bootstrap and onboarding checks, plus exact evidence review.
- Out of scope: unrelated refactors not required for "Qualify and document the 0.7.9 stabilization candidate for ST-18 through ST-20".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-13T21:47:48.659Z
- Branch: task/202609121424-4BC7B3/qualify-and-document-the-0-7-9-stabilization-can
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/blueprints.mdx                      |   15 +
 docs/internal/v0.7-agent-efficiency-baseline.md    |   32 +
 docs/user/commands.mdx                             |    7 +-
 docs/user/task-lifecycle.mdx                       |    3 +
 docs/user/workflow.mdx                             |   33 +
 .../m01-0.7.9-token-pilot-v1/authority.json        |   24 +
 .../m01-0.7.9-token-pilot-v1/campaign.lock.json    |  457 ++++++++
 .../m01-0.7.9-token-pilot-v1/evidence.json         | 1220 ++++++++++++++++++++
 .../previous-runtime/agentplane.tgz                |  Bin 0 -> 1754032 bytes
 .../previous-runtime/package-lock.json             |  474 ++++++++
 .../previous-runtime/package.json                  |    8 +
 .../product-candidate.json                         |   35 +
 .../product-minimal_agent.json                     |   13 +
 .../product-previous_release.json                  |   22 +
 .../baselines/m01-0.7.9-token-pilot-v1/report.json |  419 +++++++
 .../m01-0.7.9-token-pilot-v1/target.bundle         |  Bin 0 -> 468 bytes
 .../m01-0.7.9-token-pilot-v2/authority.json        |   28 +
 .../m01-0.7.9-token-pilot-v2/campaign.lock.json    |  457 ++++++++
 .../m01-0.7.9-token-pilot-v2/disposition.json      |   40 +
 .../m01-0.7.9-token-pilot-v2/evidence.json         | 1170 +++++++++++++++++++
 .../product-candidate.json                         |   35 +
 .../product-minimal_agent.json                     |   13 +
 .../product-previous_release.json                  |   22 +
 .../baselines/m01-0.7.9-token-pilot-v2/report.json |  260 +++++
 .../m01-0.7.9-token-pilot-v2/target.bundle         |  Bin 0 -> 468 bytes
 .../baselines/v0.7.9-stabilization-candidate.json  |   58 +
 scripts/bench/paired-live-codex-launcher.mjs       |  598 ++++++++++
 scripts/bench/paired-live-codex-launcher.test.mjs  |  149 +++
 scripts/bench/paired-m01-materialize.mjs           |  340 ++++++
 scripts/bench/paired-m01-materialize.test.mjs      |   60 +
 scripts/bench/paired-m01-oracle.mjs                |   31 +
 scripts/bench/paired-production-driver.mjs         |  175 ++-
 scripts/bench/paired-production-driver.test.mjs    |  100 +-
 scripts/bench/paired-result-report.mjs             |  229 ++--
 scripts/bench/paired-result-report.test.mjs        |  157 ++-
 35 files changed, 6444 insertions(+), 240 deletions(-)
```

</details>
