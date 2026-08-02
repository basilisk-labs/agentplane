# PR Review

Created: 2026-08-02T11:27:47.149Z

## Task

- Task: `202608021125-DR7J1E`
- Title: Build the v0.7.1 end-to-end release qualification suite
- Status: DOING
- Branch: `task/202608021125-DR7J1E/build-the-v0-7-1-end-to-end-release-qualificatio`
- Canonical task record: `.agentplane/tasks/202608021125-DR7J1E/README.md`

## Verification

- State: needs_rework
- Note: Rework the task verification contract: the harness correctly emits release-blocking defects, but current Verify Steps incorrectly require the not-yet-fixed candidate to pass the final product gate before the harness can be integrated.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T11:30:44.483Z
- Branch: task/202608021125-DR7J1E/build-the-v0-7-1-end-to-end-release-qualificatio
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .gitignore                                         |   1 +
 package.json                                       |   4 +
 scripts/README.md                                  |   8 +
 scripts/lib/test-route-registry.mjs                |  99 +++++
 .../check-v0.7.1-efficiency-evidence.mjs           | 221 +++++++++++
 .../check-v0.7.1-product-contract.mjs              | 185 ++++++++++
 .../measure-v0.7.1-matched-cli-latency.mjs         | 302 +++++++++++++++
 scripts/qualification/release-qualification.mjs    | 388 ++++++++++++++++++++
 .../qualification/release-qualification.test.mjs   | 201 ++++++++++
 .../run-v0.7.1-release-qualification.mjs           | 244 +++++++++++++
 .../v0.7.1-release-qualification.json              | 406 +++++++++++++++++++++
 11 files changed, 2059 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
