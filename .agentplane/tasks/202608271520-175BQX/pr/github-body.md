Task: `202608271520-175BQX`
Title: Modernize route-decision fixture prerequisites
Canonical task record: `.agentplane/tasks/202608271520-175BQX/README.md`

## Summary

Modernize route-decision fixture prerequisites

Repair 29 freshly reproduced failures in seven route-decision CLI suites on main 2c9a2f59146c302c517524136e66abb902f92ba6. Provide real Git execution bases before task creation and structured semantic planning prerequisites for downstream routing scenarios. Add one narrowly scoped route-decision.testkit.ts helper if needed to submit real PLANNER results through the existing exchange. Preserve exact approval and provider boundaries, local-only versus remote evidence, quality freshness, semantic changes versus lifecycle-only commits, batch ownership, direct terminal routing, and no-provider-call assertions. Preserve planning-first negative scenarios. Do not relabel downstream safety expectations as planning failures. No production behavior, global fixture helper semantics, CI gates, timeouts, policy, release state or roadmap dependency changes. Require all scoped tests, lint, formatting, unchanged oversized-test baseline and full CI. This scope is disjoint from current fixture repairs.

## Scope

- In scope: Repair 29 freshly reproduced failures in seven route-decision CLI suites on main 2c9a2f59146c302c517524136e66abb902f92ba6. Provide real Git execution bases before task creation and structured semantic planning prerequisites for downstream routing scenarios. Add one narrowly scoped route-decision.testkit.ts helper if needed to submit real PLANNER results through the existing exchange. Preserve exact approval and provider boundaries, local-only versus remote evidence, quality freshness, semantic changes versus lifecycle-only commits, batch ownership, direct terminal routing, and no-provider-call assertions. Preserve planning-first negative scenarios. Do not relabel downstream safety expectations as planning failures. No production behavior, global fixture helper semantics, CI gates, timeouts, policy, release state or roadmap dependency changes. Require all scoped tests, lint, formatting, unchanged oversized-test baseline and full CI. This scope is disjoint from current fixture repairs.
- Out of scope: unrelated refactors not required for "Modernize route-decision fixture prerequisites".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-27T16:34:13.630Z
- Branch: task/202608271520-175BQX/modernize-route-decision-fixture-prerequisites
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/cli/route-decision.testkit.ts   | 250 +++++++++++++++++++++
 .../cli/run-cli.core.route-decision.batch.test.ts  |  90 +++-----
 ...cli.core.route-decision.direct-closeout.test.ts |  83 ++-----
 ...li.core.route-decision.pr-open-metadata.test.ts |  48 +---
 .../run-cli.core.route-decision.quality.test.ts    |  27 +--
 ...i.core.route-decision.remote-confidence.test.ts |   4 +-
 .../src/cli/run-cli.core.route-decision.test.ts    | 142 ++----------
 ...un-cli.core.route-decision.verification.test.ts |  95 ++++----
 8 files changed, 369 insertions(+), 370 deletions(-)
```

</details>
