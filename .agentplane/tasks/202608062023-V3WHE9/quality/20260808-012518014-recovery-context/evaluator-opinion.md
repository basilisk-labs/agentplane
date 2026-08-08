# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- GC can delete an object that becomes reachable after inventory construction because apply mode rechecks only the object's file identity and hash, not reachability or pin state, immediately before unlinking.

## Evidence
- .agentplane/tasks/202608062023-V3WHE9/quality/objects/sha256/2e0fbb8166689441f3fcd937bc2fc7750e54aa92dcb7289ec4f12de9eb99a13a.patch
- .agentplane/tasks/202608062023-V3WHE9/README.md

## Missing Tests
- A GC apply concurrency test in which a manifest referencing an unchanged collectible object is atomically published after inventory construction but before unlink; GC must preserve the object or abort.
- A GC apply concurrency test in which task state changes to active, failing, or release-pinned after inventory construction but before unlink; GC must preserve the object or abort.

## Hidden Assumptions
- No manifest or task-retention state can change between the initial inventory scan and each unlink.
- Hash and file-metadata stability alone are sufficient proof that an object remains unreferenced and unpinned.

## Residual Risks
- Rework GC apply so each candidate's reachability, task pin/failure/release state, expiry, and hash are revalidated at the deletion boundary under a concurrency-safe protocol; add manifest-publication and task-state race tests before reevaluation.
