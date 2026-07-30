# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- Stale-lock reclamation has a time-of-check/time-of-use race: after reading and classifying one lock as reclaimable, rename operates only on the shared path and does not verify that the lock still has the same owner token. If the observed lock is released and a new owner acquires the path before rename, the reclaimer can remove the new live owner's lock, allowing concurrent CURATOR task creation and inconsistent selection evidence.
- The frozen observed-checks artifact contains no verification records, runner history, or runtime evidence, so it does not deterministically substantiate the declared checks or the claimed concurrency scenarios at the evaluated SHA.

## Evidence
- .agentplane/tasks/202607221852-WF8A0X/quality/20260730-175534581-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221852-WF8A0X/quality/20260730-175534581-recovery-context/evaluator-observed-checks.json

## Missing Tests
- A deterministic race test that pauses stale-lock reclamation after reading the old owner token, releases that lock, lets a new owner acquire the same path, then proves reclamation cannot rename or delete the new owner's lock.
- Frozen check evidence tied to evaluated SHA 7c362c886e4faff750282a47a59034ac3ad42b68 for the declared task-state, critical, typecheck, and focused concurrency tests.

## Hidden Assumptions
- The lock path still identifies the same owner between read/stat and rename.
- Process liveness and lease expiry alone are sufficient without compare-and-delete semantics for lock reclamation.
- The TESTER summary is accepted as proof even though the frozen observed-checks artifact contains no command-level records or runtime evidence.

## Residual Risks
- Make stale-lock reclamation ownership-safe so it cannot remove a replacement lock, add the interleaving regression test, and freeze command-level verification evidence for the evaluated SHA before reevaluation.
