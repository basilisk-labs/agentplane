Task: `202609231941-2A8922`
Title: Decouple hook runner from mutable checkouts
Canonical task record: `.agentplane/tasks/202609231941-2A8922/README.md`

## Summary

Decouple hook runner from mutable checkouts

Resolve issues #5941 and #5942 by making explicit hook runner recovery authoritative, rejecting unsafe mutable installed-runner coupling, and adding clean-consumer hook execution coverage.

## Scope

- In scope: Resolve issues #5941 and #5942 by making explicit hook runner recovery authoritative, rejecting unsafe mutable installed-runner coupling, and adding clean-consumer hook execution coverage.
- Out of scope: unrelated refactors not required for "Decouple hook runner from mutable checkouts".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-23T21:28:32.973Z
- Branch: task/202609231941-2A8922/decouple-hook-runner
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.hooks.install.test.ts     | 38 ++++++++++++
 .../src/cli/verify-global-install-script.test.ts   | 67 +++++++++++++++++++---
 .../commands/release/release-ci-contract.test.ts   |  8 ++-
 .../src/commands/shared/hook-shim-template.ts      | 12 ++--
 scripts/workflow/bootstrap-framework-dev.mjs       | 12 ++--
 scripts/workflow/reinstall-global-agentplane.sh    | 45 ++++++++++-----
 .../workflow/verify-global-agentplane-install.mjs  | 50 ++++++++++++++--
 7 files changed, 190 insertions(+), 42 deletions(-)
```

</details>
