Task: `202605041759-TPAWWJ`
Title: Refresh README demo tape and social assets

## Summary

Refresh README demo tape and social assets

Replace the README demo VHS tape/GIF with a working ACR-ready scenario and include refreshed social/header assets.

## Scope

- In scope: Replace the README demo VHS tape/GIF with a working ACR-ready scenario and include refreshed social/header assets.
- Out of scope: unrelated refactors not required for "Refresh README demo tape and social assets".

## Verification

- State: ok
- Note: Command: vhs docs/assets/agentplane-demo.tape | Result: pass | Evidence: generated docs/assets/agentplane-demo.gif as 960x540 GIF. Command: git diff --check | Result: pass | Evidence: no whitespace errors. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: agentplane doctor | Result: pass | Evidence: doctor OK with only informational runtime handoff entries.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T18:02:58.770Z
- Branch: task/202605041759-TPAWWJ/readme-demo-assets
- Head: a1dead881c96

```text
 docs/assets/agentplane-demo.gif     | Bin 59788 -> 3834539 bytes
 docs/assets/agentplane-demo.tape    | 110 +++++++++++++++++++++++++++++++-----
 docs/assets/header.png              | Bin 170586 -> 84547 bytes
 docs/assets/header.svg              |  40 +++++++++++++
 docs/assets/social/hn-card.svg      |  32 ++++++++++-
 docs/assets/social/og-image.svg     |  39 ++++++++++++-
 docs/assets/social/twitter-card.svg |  38 ++++++++++++-
 7 files changed, 243 insertions(+), 16 deletions(-)
```

</details>
