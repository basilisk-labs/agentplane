Task: `202610221938-VGPVEZ`
Title: Make the supervised timeout EPERM gone-case test deterministic for 0.7.13
Canonical task record: `.agentplane/tasks/202610221938-VGPVEZ/README.md`

## Summary

Make the supervised timeout EPERM gone-case test deterministic for 0.7.13

On PR #6147 head 0e308ea53, hosted verify-tests failed because the gone-mode EPERM fixture sets terminate_grace_ms to zero and races child stdout completion against fallback SIGKILL. Preserve the production process supervision invariant and existing gone-mode assertions. Change only test synchronization so simulated group SIGKILL EPERM is observed before clean child close; retain a bounded positive grace and assert the simulated EPERM occurred. Scope to the one regression test file.

## Scope

- In scope: On PR #6147 head 0e308ea53, hosted verify-tests failed because the gone-mode EPERM fixture sets terminate_grace_ms to zero and races child stdout completion against fallback SIGKILL. Preserve the production process supervision invariant and existing gone-mode assertions. Change only test synchronization so simulated group SIGKILL EPERM is observed before clean child close; retain a bounded positive grace and assert the simulated EPERM occurred. Scope to the one regression test file.
- Out of scope: unrelated refactors not required for "Make the supervised timeout EPERM gone-case test deterministic for 0.7.13".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-22T19:45:08.781Z
- Branch: task/202610221938-VGPVEZ/make-the-supervised-timeout-eperm-gone-case-test
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/runner/process-supervision.test.ts         | 23 +++++++++++++++++++---
 1 file changed, 20 insertions(+), 3 deletions(-)
```

</details>
