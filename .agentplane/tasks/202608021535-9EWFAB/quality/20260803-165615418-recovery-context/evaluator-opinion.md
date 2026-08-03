# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The content-addressed evidence store validates paths lexically but does not reject symlinked parent directories, allowing object writes or frozen-artifact reads to escape the repository.

## Evidence
- .agentplane/tasks/202608021535-9EWFAB/quality/objects/sha256/3f18f075a19d2a4c72f66a302849b36dcefe8a131bffc188d4ada68c7e669482.patch
- .agentplane/policy/security.must.md

## Missing Tests
- Add negative tests replacing quality/objects, quality/objects/sha256, and quality/objects/.staging with symlinks to an outside-repository directory; preparation and packet verification must reject them without reading or writing the target.

## Hidden Assumptions
- Task-local quality and object-store parent directories are assumed never to be symlinks or concurrently replaced by symlinks.

## Residual Risks
- Harden object-store creation and packet verification against symlinked ancestors using repository-boundary-aware real-path or descriptor-based checks, then rerun focused collision, concurrency, symlink-escape, critical, and contract suites.
