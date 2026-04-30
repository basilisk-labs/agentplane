## Summary

Introduce shared GPT-5.5 prompt contract fragments

Add shared outcome-first prompt guidance as stable fragments: visible progress, retrieval budget, validation behavior, final output contract, findings/incidents boundary, and generic stop rules, without weakening hard workflow/security gates.

## Scope

- In scope: Add shared outcome-first prompt guidance as stable fragments: visible progress, retrieval budget, validation behavior, final output contract, findings/incidents boundary, and generic stop rules, without weakening hard workflow/security gates.
- Out of scope: unrelated refactors not required for "Introduce shared GPT-5.5 prompt contract fragments".

## Verification

- State: ok
- Note: Verified: shared GPT-5.5 gateway contract remains under AGENTS budget; agents templates OK; registry/agents-template/GPT-5.5 diagnostics tests pass; policy routing OK; git diff check OK at commit 721b8d4.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T18:32:09.527Z
- Branch: task/202604301809-K5P2HX/gpt55-shared-contract
- Head: 721b8d4c336f

```text
 packages/agentplane/assets/AGENTS.md | 7 +++++--
 1 file changed, 5 insertions(+), 2 deletions(-)
```

</details>
