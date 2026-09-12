Task: `202609122236-JFNN6B`
Title: Simplify the test suite without weakening safety-critical coverage
Canonical task record: `.agentplane/tasks/202609122236-JFNN6B/README.md`

## Summary

Simplify the test suite without weakening safety-critical coverage

Remove unused GPT-5.5/GPT-5.6 prompt diagnostic implementations and self-tests, retain the prompt module compiler and model-neutral behavioral contracts, remove the historical fixed-byte assertion while retaining semantic prompt assertions, remove the duplicate coverage-threshold configuration guard, and route agent-efficiency benchmark tests to a separate qualification suite instead of the normal critical CLI gate. Preserve exit-code, scope, symlink, protected-path, trust-boundary, task-centric, and context critical tests. Reduce critical suite process overhead only if the resulting suite passes repeatedly. Avoid files currently modified by tasks 202609080727-BAWTEE and 202609121424-T83XJA. Do not modify benchmark fixtures or semantic gateway implementation.

## Scope

- In scope: Remove unused GPT-5.5/GPT-5.6 prompt diagnostic implementations and self-tests, retain the prompt module compiler and model-neutral behavioral contracts, remove the historical fixed-byte assertion while retaining semantic prompt assertions, remove the duplicate coverage-threshold configuration guard, and route agent-efficiency benchmark tests to a separate qualification suite instead of the normal critical CLI gate. Preserve exit-code, scope, symlink, protected-path, trust-boundary, task-centric, and context critical tests. Reduce critical suite process overhead only if the resulting suite passes repeatedly. Avoid files currently modified by tasks 202609080727-BAWTEE and 202609121424-T83XJA. Do not modify benchmark fixtures or semantic gateway implementation.
- Out of scope: unrelated refactors not required for "Simplify the test suite without weakening safety-critical coverage".

## Verification

- State: pending
- Note: Invalidated by USER-approved execution scope extension.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-12T22:42:33.380Z
- Branch: task/202609122236-JFNN6B/simplify-the-test-suite-without-weakening-safety
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 package.json                                       |   4 +-
 .../commands/release/release-ci-contract.test.ts   |  19 ++-
 .../task-run-bootstrap.result-examples.test.ts     |   5 +-
 .../runtime/prompt-modules/gpt55-contract.test.ts  | 167 ---------------------
 .../src/runtime/prompt-modules/gpt55-contract.ts   | 137 -----------------
 .../runtime/prompt-modules/gpt56-contract.test.ts  | 119 ---------------
 .../src/runtime/prompt-modules/gpt56-contract.ts   |  78 ----------
 .../agentplane/src/runtime/prompt-modules/index.ts |   2 -
 scripts/README.md                                  |  64 ++++----
 scripts/check-coverage-thresholds.mjs              |   1 -
 scripts/checks/check-coverage-thresholds.mjs       |  48 ------
 scripts/lib/test-route-registry.mjs                |  27 +++-
 12 files changed, 76 insertions(+), 595 deletions(-)
```

</details>
