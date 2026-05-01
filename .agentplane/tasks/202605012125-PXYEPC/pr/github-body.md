Task: `202605012125-PXYEPC`
Title: Automate external distribution repo publishing

## Summary

Automate external distribution repo publishing

Publish Homebrew, Scoop, and setup-agentplane outputs to their external repositories from the release workflow when credentials are configured.

## Scope

- In scope: Publish Homebrew, Scoop, and setup-agentplane outputs to their external repositories from the release workflow when credentials are configured.
- Out of scope: unrelated refactors not required for "Automate external distribution repo publishing".

## Verification

- State: ok
- Note: External distribution publishing automation verified.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T21:31:57.672Z
- Branch: task/202605012125-PXYEPC/external-distribution-publish
- Head: 9b6156d62117

```text
 .github/workflows/publish.yml                      |  49 ++++
 .../publish-external-distribution-script.test.ts   | 121 ++++++++++
 .../release/publish-workflow-contract.test.ts      |  31 +++
 scripts/publish-external-distribution.mjs          | 251 +++++++++++++++++++++
 4 files changed, 452 insertions(+)
```

</details>
