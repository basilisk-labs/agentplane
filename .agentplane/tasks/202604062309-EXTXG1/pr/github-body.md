## Summary

Promote confirmed external workflow incidents into incidents registry

Append confirmed external operational lessons from the recent GitHub transport/reconciliation cycle into .agentplane/policy/incidents.md with concrete rules and evidence.

## Scope

- In scope: Append confirmed external operational lessons from the recent GitHub transport/reconciliation cycle into .agentplane/policy/incidents.md with concrete rules and evidence.
- Out of scope: unrelated refactors not required for "Promote confirmed external workflow incidents into incidents registry".

## Verification

### Plan

1. Review the appended incidents against the recorded task evidence. Expected: every new entry is supported by concrete repository evidence and describes an external operational failure mode rather than an already-fixed code defect.
2. Run policy routing validation. Expected: `node .agentplane/policy/check-routing.mjs` passes after the registry update.
3. Review `.agentplane/policy/incidents.md` for format and append-only discipline. Expected: new entries are machine-matchable and keep the registry schema intact.

### Current Status

- State: ok
- Note: Confirmed external-only incidents, synced canonical assets to generated policy, and refreshed PR artifacts on the published head.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-07T00:07:54.112Z
- Branch: task/202604062309-EXTXG1/external-incident-backfill
- Head: 611b4f1283d5

```text
 .agentplane/policy/incidents.md                    |  46 +++--
 .agentplane/tasks/202604062309-EXTXG1/README.md    | 211 +++++++++++++++++++++
 .../tasks/202604062309-EXTXG1/pr/diffstat.txt      |  11 ++
 .../tasks/202604062309-EXTXG1/pr/github-body.md    |  60 ++++++
 .../tasks/202604062309-EXTXG1/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604062309-EXTXG1/pr/meta.json |  14 ++
 .../tasks/202604062309-EXTXG1/pr/notes.jsonl       |   0
 .agentplane/tasks/202604062309-EXTXG1/pr/review.md |  67 +++++++
 .../tasks/202604062309-EXTXG1/pr/verify.log        |   0
 packages/agentplane/assets/policy/incidents.md     |  46 +++--
 10 files changed, 418 insertions(+), 38 deletions(-)
```

</details>
