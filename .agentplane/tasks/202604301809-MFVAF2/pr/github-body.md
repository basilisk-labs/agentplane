## Summary

Add GPT-5.5 prompt contract diagnostics

Add a focused diagnostic/test surface that detects prompt contracts that are still procedural or conflict-prone: missing outcome sections, heuristic MUST usage, duplicate approval gates, missing validation commands, unstable fragment IDs, or missing stop rules.

## Scope

- In scope: Add a focused diagnostic/test surface that detects prompt contracts that are still procedural or conflict-prone: missing outcome sections, heuristic MUST usage, duplicate approval gates, missing validation commands, unstable fragment IDs, or missing stop rules.
- Out of scope: unrelated refactors not required for "Add GPT-5.5 prompt contract diagnostics".

## Verification

- State: ok
- Note: Verified: GPT-5.5 prompt contract diagnostics added; focused prompt-module and fragment tests pass; agents templates OK; typecheck OK; framework bootstrap OK; git diff check OK.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T18:23:18.835Z
- Branch: task/202604301809-MFVAF2/gpt55-contract-diagnostics
- Head: 27511d74c16c

```text
 .../runtime/prompt-modules/gpt55-contract.test.ts  | 139 +++++++++++++++++++++
 .../src/runtime/prompt-modules/gpt55-contract.ts   | 137 ++++++++++++++++++++
 .../agentplane/src/runtime/prompt-modules/index.ts |   5 +
 3 files changed, 281 insertions(+)
```

</details>
