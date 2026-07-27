# PR Review

Created: 2026-07-27T12:39:26.919Z

## Task

- Task: `202607221849-TBTX8X`
- Title: Prepare and apply typed evaluator results
- Status: DOING
- Branch: `task/202607221849-TBTX8X/prepare-and-apply-typed-evaluator-results`
- Canonical task record: `.agentplane/tasks/202607221849-TBTX8X/README.md`

## Verification

- State: ok
- Note: Verified RF-12a against all five task steps: 14 focused evaluator tests cover prepared frozen evidence, strict typed apply, staleness and mutation rejection, in-process use cases, and distinct human provenance. schema check, lifecycle invariants, agentplane typecheck, policy routing, and the reviewed compatibility ratchet passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-27T12:46:00.307Z
- Branch: task/202607221849-TBTX8X/prepare-and-apply-typed-evaluator-results
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  35 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../src/cli/run-cli/command-catalog/project.ts     |   4 +
 .../evaluator/evaluator-quality-artifacts.ts       |  46 +-
 .../commands/evaluator/evaluator-review-apply.ts   | 211 ++++++++
 .../commands/evaluator/evaluator-review-usecase.ts | 558 +++++++++++++++++++++
 .../evaluator/evaluator-run.command.test.ts        | 169 ++++++-
 .../src/commands/evaluator/evaluator.command.ts    | 395 ++++++++-------
 .../src/commands/evaluator/evaluator.spec.ts       |  99 +++-
 .../baselines/v0.7-compatibility-candidate.json    | 149 +++++-
 .../check-compatibility-contract-baseline.mjs      |  85 ++++
 11 files changed, 1537 insertions(+), 221 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
