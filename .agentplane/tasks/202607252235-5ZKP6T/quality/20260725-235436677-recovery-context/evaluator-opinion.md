# Semantic quality review: rework

Provenance: evaluator_supplied

Rework: the repair revalidates the authoritative source but can unlink a replica changed after inspection.

## Findings
- applyForeignTaskReadmeReplicaRepair captures a fresh replica identity at lines 496-504, then awaits full source revalidation at lines 509-512, and unlinks at line 514 without comparing the target to the original replica proof. A changed regular replica can therefore be deleted.
- The durable regression covers only source text mutation after inspection; it does not cover source replacement, removal, symlink substitution, or a replica mutation after proof.

## Evidence
- .agentplane/tasks/202607252235-5ZKP6T/README.md
- packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.ts:485-523
- packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts:287-318
- bunx vitest run packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.worktree.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000 (42 passed)

## Missing Tests
- Durable deterministic cases for authoritative source replacement, deletion, and symlink substitution after proof, plus modified regular replica replacement after inspection.

## Hidden Assumptions
- The replica remains unchanged while asynchronous authoritative-source revalidation runs.

## Residual Risks
- A concurrent local writer can replace the untracked foreign README after inspection and cause safe-apply to delete content that no longer matches the approved proof.
