# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The symlink hardening remains vulnerable to a directory-swap race: parent directories are checked by pathname, then later path-based open, rename, link, or unlink operations follow those paths without binding the operation to the verified directory handle. A concurrent process can replace a checked directory with an external symlink between validation and mutation, allowing writes outside the repository.

## Evidence
- .agentplane/tasks/202608021535-9EWFAB/quality/objects/sha256/f8387e823a299bd00fd12e1f11ff156021c37ef89c6fc208bb458af3c33e4179.patch

## Missing Tests
- Add a deterministic adversarial race test that replaces each checked parent directory with an external symlink after validation but before open, rename, link, and cleanup, and assert that no file is read, created, replaced, or removed outside the repository.

## Hidden Assumptions
- No concurrent process can rename or replace a validated parent directory between the pathname-based check and the subsequent filesystem operation.

## Residual Risks
- Replace check-then-use pathname operations with a mechanism that binds reads, publication, rename, and cleanup to verified directory handles or otherwise makes containment atomic; then add deterministic directory-swap race coverage and rerun the focused security and repository contract suites.
