Task: `202605012059-GWA2MF`
Title: Внедрить CLI performance benchmark framework

## Summary

Внедрить CLI performance benchmark framework

Добавить механизмы замера и сравнения производительности CLI для оценки качества рефакторинга, покрыть hot-пути и хранить baseline/трендовые отчёты.

## Scope

- In scope: Добавить механизмы замера и сравнения производительности CLI для оценки качества рефакторинга, покрыть hot-пути и хранить baseline/трендовые отчёты.
- Out of scope: unrelated refactors not required for "Внедрить CLI performance benchmark framework".

## Verification

- State: ok
- Note: Wall-time process for CLI now includes mandatory team PR local step and before/after report template; baseline thresholds updated and checked.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-02T06:55:03.195Z
- Branch: task/202605012059-GWA2MF/cli-perf
- Head: 1b7e01c9cc1e

```text
 .github/PULL_REQUEST_TEMPLATE.md                   |  29 ++
 docs/developer/performance-baselines.mdx           |  62 ++++
 package.json                                       |   5 +
 .../cli/prepare-hosted-task-closure-script.test.ts |   4 +-
 .../cli/run-cli.core.task-hosted-close-pr.test.ts  |   4 +-
 scripts/README.md                                  |  13 +-
 scripts/baselines/cli-walltime-baseline.json       |  55 +++
 scripts/check-cli-walltime-baseline.mjs            | 201 +++++++++++
 scripts/cli-benchmark-runner.mjs                   | 391 ++++++++++++++++++++
 scripts/cli-benchmark-suites.json                  |  56 +++
 scripts/cli-walltime-suites.json                   |  56 +++
 scripts/compare-cli-perf.mjs                       | 220 ++++++++++++
 scripts/compare-cli-walltime.mjs                   | 238 ++++++++++++
 scripts/measure-cli-cold-path.mjs                  | 283 ++-------------
 scripts/measure-cli-perf.mjs                       |  13 +
 scripts/measure-cli-walltime.mjs                   | 397 +++++++++++++++++++++
 16 files changed, 1754 insertions(+), 273 deletions(-)
```

</details>
