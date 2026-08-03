# Semantic quality review: pass

Provenance: human_supplied

The qualification harness now excludes only its active nested evidence directory from frozen-subject cleanliness checks while preserving strict detection of all unrelated changes.

## Findings
- PASS: the exclusion is derived from a validated repo-relative nested path and uses a top-level Git exclude pathspec, so it cannot widen beyond the selected evidence subtree.
- PASS: the real Git repository test proves evidence writes are ignored, an unrelated untracked file still blocks qualification, and repository-root or outside paths are rejected.
- PASS: matched CLI and supervisor latency scenarios both completed against the exact frozen implementation commit with 2/2 scenarios passing, demonstrating that qualification output no longer invalidates its own subject.

## Evidence
- scripts/qualification/release-qualification.mjs
- scripts/qualification/release-qualification.test.mjs
- .agentplane/tasks/202608032116-QFBVB5/evidence/self-dirty-regression/report.json
- .agentplane/tasks/202608032116-QFBVB5/verification/20260803212326932-eafa88c37183750f.json

## Missing Tests
- none recorded

## Hidden Assumptions
- The release qualification runner must continue to pass its output directory through AGENTPLANE_QUALIFICATION_EVIDENCE_DIR to child scenarios.

## Residual Risks
- Direct callers that write evidence inside the repository without passing evidenceDirectory or the environment variable remain intentionally subject to the strict clean-worktree failure.
