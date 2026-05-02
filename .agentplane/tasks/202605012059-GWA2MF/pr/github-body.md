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

- Updated: 2026-05-02T06:52:07.342Z
- Branch: task/202605012059-GWA2MF/cli-perf
- Head: f9e0b161ce19

```text
 .github/PULL_REQUEST_TEMPLATE.md             |  30 ++-
 docs/developer/performance-baselines.mdx     |  62 +++++
 package.json                                 |   5 +
 scripts/README.md                            |  13 +-
 scripts/baselines/cli-walltime-baseline.json |  55 ++++
 scripts/check-cli-walltime-baseline.mjs      | 196 ++++++++++++++
 scripts/cli-benchmark-runner.mjs             | 379 ++++++++++++++++++++++++++
 scripts/cli-benchmark-suites.json            |  56 ++++
 scripts/cli-walltime-suites.json             |  56 ++++
 scripts/compare-cli-perf.mjs                 | 209 +++++++++++++++
 scripts/compare-cli-walltime.mjs             | 222 ++++++++++++++++
 scripts/measure-cli-cold-path.mjs            | 279 ++-----------------
 scripts/measure-cli-perf.mjs                 |  11 +
 scripts/measure-cli-walltime.mjs             | 382 +++++++++++++++++++++++++++
 14 files changed, 1687 insertions(+), 268 deletions(-)
```

</details>
