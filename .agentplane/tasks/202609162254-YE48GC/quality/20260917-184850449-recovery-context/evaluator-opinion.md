# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 4 typed finding(s).

## Findings
- High: hashVerificationEvidenceFilesystemEntry applies O_NOFOLLOW only to the final path component. A path such as <gitRoot>/evidence-link/file, where evidence-link points outside gitRoot, passes the lexical root check, readlink on the final regular file returns null, and open follows the intermediate symlink. Canonical containment must be checked for the opened entry before any bytes are read, with a regression test for an intermediate symlink to an external directory.
- The evaluator policy fixture now uses exclusive wx creation, task branch refs come from the observed ref inventory, and GitContext.commit keeps message data out of command arguments; these changes preserve their existing behavior.
- Supervisor verification passed the full declared local contract, including full CI and packed-install smoke.
- Residual risk: Hosted CodeQL must confirm that all four alerts close on the final head.

## Evidence
- .agentplane/tasks/202609162254-YE48GC/quality/objects/sha256/0ca5fcc5e27ccd0781dbdbb847a842f5ac686d24a683bec3a24c6114066791ef.patch

## Missing Tests
- Add a verification-evidence regression that rejects a repository-relative path whose intermediate directory symlink resolves outside gitRoot.

## Hidden Assumptions
- The current helper assumes that parent path components inside the lexical repository path are not symlinks.

## Residual Risks
- Resolve the evidence path to a canonical target inside the canonical git root and bind that containment decision to the opened descriptor before reading. Preserve same-descriptor stability checks and add the intermediate-symlink escape regression.
