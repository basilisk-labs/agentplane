Task: `202605081651-Y9DYVQ`
Title: Add semantic clone detection to refactor analysis
Canonical task record: `.agentplane/tasks/202605081651-Y9DYVQ/README.md`

## Summary

Add semantic clone detection to refactor analysis

Evaluate and wire a semantic clone detector such as jscpd or an equivalent AST/token-based tool into the analysis workflow so future refactor reviews identify structural duplication beyond line counts and simple duplicate scans.

## Scope

- In scope: Evaluate and wire a semantic clone detector such as jscpd or an equivalent AST/token-based tool into the analysis workflow so future refactor reviews identify structural duplication beyond line counts and simple duplicate scans.
- Out of scope: unrelated refactors not required for "Add semantic clone detection to refactor analysis".

## Verification

- State: ok
- Note: Implemented semantic clone detection with jscpd report/check/baseline workflows. Verification passed: clone:check, docs:scripts:check, knip:check, hotspots:check, typecheck, lint:core, targeted task-doc/cold-path/release publish tests. Full test:fast was attempted repeatedly but local full-suite runs timed out in heavy release asset suites; targeted release publish test passed and earlier standalone run passed before later machine-load timeouts.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T17:59:13.469Z
- Branch: task/202605081651-Y9DYVQ/semantic-clone-detection
- Head: cf6066170e74

```text
 .../blueprint/resolved-snapshot.json               | 504 ++++++++++++++
 bun.lock                                           | 129 +++-
 package.json                                       |   4 +
 .../src/cli/measure-cli-cold-path-script.test.ts   |   2 +-
 .../agentplane/src/commands/task/shared/docs.ts    |   9 +-
 scripts/README.md                                  |  10 +-
 scripts/baselines/clone-baseline.json              | 743 +++++++++++++++++++++
 scripts/check-clone-baseline.mjs                   | 309 +++++++++
 scripts/generate-scripts-readme.mjs                |   7 +-
 9 files changed, 1698 insertions(+), 19 deletions(-)
```

</details>
