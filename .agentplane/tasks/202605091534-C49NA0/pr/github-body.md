Task: `202605091534-C49NA0`
Title: Integrate atomic global reinstall helper
Canonical task record: `.agentplane/tasks/202605091534-C49NA0/README.md`

## Summary

Integrate atomic global reinstall helper

Integrate the existing local runtime-install-atomic branch changes into current main: make scripts/reinstall-global-agentplane.sh use an atomic npm link workflow, update release contract coverage, and align developer docs.

## Scope

- In scope: Integrate the existing local runtime-install-atomic branch changes into current main: make scripts/reinstall-global-agentplane.sh use an atomic npm link workflow, update release contract coverage, and align developer docs.
- Out of scope: unrelated refactors not required for "Integrate atomic global reinstall helper".

## Verification

- State: ok
- Note: Runtime reinstall helper integration verified.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T15:36:26.507Z
- Branch: task/202605091534-C49NA0/runtime-reinstall-helper
- Head: 24428fa78335

```text
 .../blueprint/resolved-snapshot.json               | 536 +++++++++++++++++++++
 docs/developer/testing-and-quality.mdx             |   8 +-
 .../commands/release/release-ci-contract.test.ts   |  15 +-
 scripts/reinstall-global-agentplane.sh             |  22 +-
 4 files changed, 566 insertions(+), 15 deletions(-)
```

</details>
