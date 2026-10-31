# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- P2: captureExternalTaskArtifacts always reads .agentplane/tasks/<taskId>. verification-retry-effect-recovery reads command.config.paths.workflow_dir, but all five artifact capture calls omit that path. With workflow_dir=operations/native/tasks, capture returns an empty artifact map and the typed retry fails because its prepared Task README is unavailable. The source and call sites are present in the frozen actual-diff evidence.
- Residual risk: The current full validation is valid for its covered configuration. It does not establish custom workflow-directory recovery.

## Evidence
- .agentplane/tasks/202610280840-VPBGBK/quality/objects/sha256/bf19f6163c58f9624371b0510c646ced692957bceb776b2df90bd56625a36e47.patch

## Missing Tests
- Run the real-check retry success, refusal, interruption and tamper cases with both .agentplane/tasks and operations/native/tasks. Verify exact old/new artifact and PR preservation for both layouts.

## Hidden Assumptions
- The implementation assumes that protected Task artifacts always use the default .agentplane/tasks directory.

## Residual Risks
- The completed Kernel and its frozen Plan must stay unchanged. The helper file is already admitted through the native completed-scope recovery. Pass the validated configured workflow directory into all five capture calls. Preserve existing default callers and path-containment/symlink guards. A retained private control reproduction105 fails on the old helper with the prepared-README error; it is context, not native acceptance authority. Qualify corrected source through fresh native checks and a new EVALUATOR.
