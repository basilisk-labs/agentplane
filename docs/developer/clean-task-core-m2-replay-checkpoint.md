# M2 persistence replay checkpoint

Task: `202608291006-2A6BJC`.

This is an implementation checkpoint, not final M2 qualification or M3 cutover approval.
The legacy production lifecycle remains authoritative.

## Implemented boundaries

- Local CAS, explicitly serialized atomic storage, and a cloud fake share the kernel adapter.
  Serialized storage reuses the existing file transaction fence. Every writer must use the same
  storage-owned fence. An uncoordinated legacy writer is not covered by this guarantee.
- Preview and execution reject authority for a different repository.
- Read-only next-action projection returns a reason code and never grants authority.
- Actual legacy Task reads and canonical reads are compared on Task ID, storage revision and
  projected status. The comparison reports the first divergent field and source identity.
  This is not equivalence between the two lifecycle command implementations.
- Review identity is derived from the current approved plan, WorkItem result and repository
  fingerprint. Operational document timestamps do not stale it. A new result does.
- A new WorkItem attempt clears the prior result, output manifests and validation. Its prior
  mutation receipts remain available for idempotent replay.

## Capture and replay

`scripts/bench/qualify-kernel-replay.mjs <exact-sha> --capture <new-file>` runs from an isolated
checkout and exports persistence observations only after the complete selected test run and
the dependency, harness and tracked-tree checks pass. It never overwrites an existing corpus.
The driver and its helpers must match the anchor. Captured fixtures contain command source
bytes, byte digests, events, receipts, aggregate and projection digests, effect states,
actual next-action codes, and normalized comparisons from both read paths.

The five Task classes run through all three storage modes. Atomic-write interruption tests
cover before-write, after-write and unknown-readback outcomes. Ledger checkpoints include
creation, planning, approval, materialization, claim, execution, result, inspection, validation,
WorkItem completion, commit, review, PR, merge, hosted close, publication, cleanup, final
validation and Task completion. Commit, review, provider and cleanup effects are explicit
fixture ledger effects. They are not real GitHub, registry, evaluator or workspace operations.
M3 must separately qualify those production adapters.

## Remaining mandatory acceptance

The initial checkpoint's full `test:fast` run failed 12 tests across seven suites after
1,280 seconds. Its saved predecessor run took 253 seconds. A serial Node 24 control reran
all seven suites without code or timeout changes and passed all 104 tests. A later four-worker
control also passed those 104 tests. The cause of the full-run failure is not established.
These controls do not replace a successful complete verification run.

Further persistence tests exposed two read-projection defects on all three backends: an
unclaimed optional WorkItem was selected after all required work completed, and a blocked
WorkItem hid independent ready work. The projection now permits final validation in the first
case and selects ready work in the second. Ready work must still pass the canonical resource
conflict rule. The projection and command admission reuse that one rule. A blocked resource
owner prevents a conflicting claim until its claim is resolved or cancelled.

1. Commit the capture implementation through the supervisor before assigning its exact source
   identity. A working-tree SHA does not identify uncommitted implementation bytes.
2. Freeze and replay the complete twelve-family manifest from the M0 specification. Preserve
   the existing reviewed kernel, migration and evidence corpora. Add missing plan, WorkItem
   dependency/fan-out, required-input, missing-executable, metadata and workspace variants.
3. Include the actual persistence/read comparisons, complete interruption matrix, canary,
   repeat migration with no byte change and exact-byte rollback under one implementation
   identity. Report every remaining mismatch or unsupported case.
4. Run full local verification, independent semantic review, exact-head hosted checks,
   supervised integration and hosted closure. None is implied by this checkpoint.

The final qualification report and frozen corpus remain required outputs. No legacy deletion,
repository-wide Task migration, twenty-task self-hosting claim or release drill is authorized
by this checkpoint report.
