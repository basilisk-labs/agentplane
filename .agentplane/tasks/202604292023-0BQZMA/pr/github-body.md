## Summary

Migrate agent profiles to addressable prompt fragments

Convert bundled agent JSON profiles from bare string arrays to stable fragment objects with ids, text, and backward-compatible loading so recipes can patch individual agent workflow lines by fragment id.

## Scope

- In scope: Convert bundled agent JSON profiles from bare string arrays to stable fragment objects with ids, text, and backward-compatible loading so recipes can patch individual agent workflow lines by fragment id.
- Out of scope: unrelated refactors not required for "Migrate agent profiles to addressable prompt fragments".

## Verification

- State: ok
- Note: Bundled agent profiles now use addressable fragment objects while installed profile and runner behavior remain string-array compatible; declared checks passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T20:50:01.078Z
- Branch: task/202604292023-0BQZMA/agent-profile-fragments
- Head: 8e793837e3d5

```text
No changes detected.
```

</details>
