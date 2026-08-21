# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 6 typed finding(s).

## Findings
- The modified one-confirmation scenario stops at route.remote.refresh and explicitly expects a framework_transition. It proves one user boundary only through local quality review, not through provider publication, integration, hosted closeout, and cleanup to logical completion as required by plan item 8.
- Crash replay is not exercised. The new test proves only that executionGrantOperationLeaseId is deterministic; it does not invoke configured authority twice after a simulated crash and prove that durable grants, audit entries, and repository/provider effects are not duplicated.
- The concurrent-base test compares typescriptSha..typescript immediately after reading typescriptSha, so the empty diff assertion is tautological. It does not allocate simultaneous master- and typescript-based task worktrees, add independent task commits, and prove that cumulative TypeScript history is excluded from each task-local diff.
- resolveLogicalRepositoryIdentity returns task_execution_context.repository_identity before validating base_sha against the current Git object graph. Copying a task artifact and grant into an unrelated repository can therefore reuse the stored identity instead of failing closed, defeating the repository binding introduced by this rework.
- Residual risk: A real task can still stop after its only user confirmation when it reaches provider execution, despite local tests being green.
- Residual risk: A replay or copied task artifact can exercise authority outside the exact repository/effect instance intended by the approved plan.

## Evidence
- .agentplane/tasks/202608211020-FGAPJC/quality/objects/sha256/470aedad8cc4e9188b8a48409fcdaa6b2459494b804df5dec0528491c60fa274.patch

## Missing Tests
- One HostUserDecision drives a managed branch_pr task through provider publication, integration, hosted closeout, and cleanup to a terminal logical-completion state with no second user boundary.
- Crash replay invokes the same grant-covered operation twice and proves one durable lease/grant, one audit transition, and one effect receipt.
- Concurrent master/typescript task worktrees prove task-local diffs exclude cumulative commits from their respective frozen bases.
- A stored repository identity copied into a repository with a different root-object identity is rejected.

## Hidden Assumptions
- Reaching the first provider transition is assumed to be equivalent to logical completion.
- A deterministic lease identifier is assumed by itself to make durable effect execution idempotent.
- A frozen base SHA with no subsequent commit is assumed to prove task-diff isolation.
- A task-persisted repository identity is assumed to be trustworthy without current Git anchoring.

## Residual Risks
- Keep all accepted rework. Add a terminal managed-supervisor integration fixture that composes HostUserDecision, ExecutionGrant, grant-derived leases, provider operations, hosted close, and cleanup; add a double-invocation persistence/effect replay test; replace the tautological branch assertion with two real task worktrees and independent commits; and validate any persisted task repository identity against the current repository root objects/base SHA before returning it. These are bounded corrections within the approved plan and require no new user confirmation.
