# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Directory identity checks do not close the directory-swap race because each pathname-based open, link, rename, or unlink still occurs after the final check. A concurrent replacement in that interval can redirect the operation outside the repository; detecting the replacement afterward does not undo the external mutation.

## Evidence
- .agentplane/tasks/202608021535-9EWFAB/quality/objects/sha256/e7f7f44eae484ec631d94304c3807331e8a0a454352a02483b08496721607575.patch
- .agentplane/tasks/202608021535-9EWFAB/verification/20260803172855264-fe8f6a516038c0b9.json

## Missing Tests
- An adversarial concurrency test that replaces a validated parent after the last assertStable call but before the pathname-based open, link, rename, or unlink syscall, and asserts that no external file is created, replaced, or removed.

## Hidden Assumptions
- The implementation assumes a directory cannot be replaced between the final pathname identity check and the following pathname-based filesystem operation.
- The deterministic boundary hooks are assumed to model the complete race window, but they run before assertStable and cannot interpose in the remaining check-to-syscall interval.

## Residual Risks
- The previous directory-swap finding remains unresolved at evaluated SHA 95f214a6f8233c268e71749d17ef896cbbb3be0c: surrounding path-based operations with identity checks still leaves a TOCTOU window. Recovery must use operations anchored to verified directory handles (or a platform helper providing equivalent openat/linkat/renameat/unlinkat semantics), or explicitly narrow the trust model and obtain human approval for the residual external-mutation risk.
