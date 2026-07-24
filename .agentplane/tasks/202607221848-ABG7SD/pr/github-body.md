Task: `202607221848-ABG7SD`
Title: Align CLI error, exit-code, and Node support contracts
Canonical task record: `.agentplane/tasks/202607221848-ABG7SD/README.md`

## Summary

Align CLI error, exit-code, and Node support contracts

Correct the verified drift between documented and runtime exit/error shapes, structured remediation fields, package engine ranges, and the CI support matrix before 0.7 compatibility is frozen.

## Scope

- In scope: one generated source for CLI exit codes and error payload documentation, guidance/remediation compatibility, installed-tarball fixtures, aligned Node engine declarations or an explicit tested matrix, and CI coverage for every supported runtime.
- Out of scope: changing unrelated command semantics or removing an existing error field without migration evidence.

## Verification

- State: ok
- Note:

```text
Implementation rework verified at 8bf0104e: runtime-derived CLI/error docs, exact installed-tarball
envelopes, mandatory core/recipes Node matrix, focused 9/9, docs check, typecheck, critical,
ci:contract and RF04 offline replay 50/70/27/170 pass; independent semantic review PASS. Hosted Node
20 cells remain a PR integration gate.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-24T09:06:11.144Z
- Branch: task/202607221848-ABG7SD/align-cli-error-exit-code-and-node-support-contr
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/ci.yml                           |  57 +++++
 docs/developer/cli-contract.mdx                    |  37 +--
 docs/user/cli-reference.generated.mdx              |  51 +++-
 packages/agentplane/src/cli/cli-contract.test.ts   |  66 ++++-
 packages/agentplane/src/cli/exit-codes.ts          |  21 ++
 .../src/cli/run-cli.core.docs-cli.test.ts          |   3 +
 ...-cli.critical.agent-efficiency-baseline.test.ts |   6 +-
 .../agentplane/src/cli/spec/docs-render.test.ts    |  19 ++
 packages/agentplane/src/cli/spec/docs-render.ts    |  57 ++++-
 .../commands/release/ci-workflow-contract.test.ts  |   2 +-
 .../release/workflow-node-version-contract.test.ts | 120 ++++++++-
 packages/agentplane/src/shared/errors.test.ts      |  58 +++++
 packages/agentplane/src/shared/errors.ts           |  69 +++++-
 .../baselines/v0.7-compatibility-candidate.json    |  28 ++-
 .../check-compatibility-contract-baseline.mjs      |  42 +++-
 .../release/check-local-tarball-install-smoke.mjs  | 267 ++++++++++++++++++++-
 scripts/release/check-package-node-runtime.mjs     | 164 +++++++++++++
 17 files changed, 1025 insertions(+), 42 deletions(-)
```

</details>
