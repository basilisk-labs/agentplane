# PR Review

Created: 2026-10-26T01:46:43.770Z

## Task

- Task: `202610252231-Y5Z4NW`
- Title: Ratchet compatibility candidate for release versions
- Status: DOING
- Branch: `task/202610252231-Y5Z4NW/ratchet-compatibility-candidate-for-release-vers`
- Canonical task record: `.agentplane/tasks/202610252231-Y5Z4NW/README.md`

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-26T01:46:43.770Z
- Branch: task/202610252231-Y5Z4NW/ratchet-compatibility-candidate-for-release-vers
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/release/apply.pipeline/mutation.ts    |  55 ++++++++++
 .../release/apply.version-mutation.test.ts         | 116 ++++++++++++++++++++-
 scripts/bench/capture-compatibility-candidate.mjs  |  65 +++++-------
 .../check-compatibility-contract-baseline.mjs      |  54 ++++------
 scripts/lib/compatibility-candidate-path.mjs       |  31 ++++++
 .../compatibility-incremental-package-delta.mjs    |  58 +++++++++--
 ...ompatibility-incremental-package-delta.test.mjs | 103 +++++++++++++++++-
 7 files changed, 398 insertions(+), 84 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
