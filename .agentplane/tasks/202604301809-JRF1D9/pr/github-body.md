## Summary

Document and verify GPT-5.5 prompt migration

Update developer documentation and generated prompt parity after the GPT-5.5 prompt migration, then run the final local verification stack before branch_pr integration.

## Scope

- In scope: Update developer documentation and generated prompt parity after the GPT-5.5 prompt migration, then run the final local verification stack before branch_pr integration.
- Out of scope: unrelated refactors not required for "Document and verify GPT-5.5 prompt migration".

## Verification

- State: ok
- Note: Verified: GPT-5.5 prompt migration is documented in developer prompt assembly docs, quality checklist, and docs IA; compact keyed agent profile storage and backward-compatible legacy readers are documented; runtime reasoning/verbosity and Responses phase boundaries are described as config/runner concerns. Checks: bun run agents:check; node .agentplane/policy/check-routing.mjs; git diff --check; targeted Prettier check; bun run framework:dev:bootstrap; agentplane doctor; bun run docs:site:check; focused prompt-assembly and prompt-fragment tests (45 pass).
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T19:41:08.952Z
- Branch: task/202604301809-JRF1D9/gpt55-docs-verification
- Head: da3d7bb959cd

```text
 .../documentation-information-architecture.mdx     |  1 +
 docs/developer/modular-prompt-assembly.mdx         | 38 ++++++++++++++++++++++
 docs/developer/testing-and-quality.mdx             | 15 ++++++---
 3 files changed, 50 insertions(+), 4 deletions(-)
```

</details>
