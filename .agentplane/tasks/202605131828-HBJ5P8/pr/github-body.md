Task: `202605131828-HBJ5P8`
Title: Make test routing faster and more flexible
Canonical task record: `.agentplane/tasks/202605131828-HBJ5P8/README.md`

## Summary

Make test routing faster and more flexible

Improve AgentPlane test selection and runner ergonomics: support combined impacted buckets, add a smoke local CI mode, route critical CLI tests through the chunked suite runner, and capture timing evidence for slow tests.

## Scope

- In scope: Improve AgentPlane test selection and runner ergonomics: support combined impacted buckets, add a smoke local CI mode, route critical CLI tests through the chunked suite runner, and capture timing evidence for slow tests.
- Out of scope: unrelated refactors not required for "Make test routing faster and more flexible".

## Verification

- State: ok
- Note: Verified: flexible test routing, smoke local CI mode, critical-cli chunk runner, timing reports, route registry, eslint, generated scripts docs, diff hygiene, and policy routing pass on current task branch head.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T19:11:58.775Z
- Branch: task/202605131828-HBJ5P8/flexible-test-routing
- Head: fa819a8ee3b4

```text
 .../blueprint/resolved-snapshot.json               | 552 +++++++++++++++++++++
 package.json                                       |   3 +-
 .../agentplane/src/cli/local-ci-selection.test.ts  |  32 +-
 .../commands/release/release-ci-contract.test.ts   |   6 +
 scripts/README.md                                  |   3 +-
 scripts/checks/run-local-ci.mjs                    |  62 ++-
 scripts/checks/run-vitest-suite.mjs                |  87 +++-
 scripts/lib/local-ci-selection.d.ts                |   4 +-
 scripts/lib/local-ci-selection.mjs                 | 120 +++++
 scripts/lib/test-route-registry.mjs                |  14 +
 10 files changed, 857 insertions(+), 26 deletions(-)
```

</details>
