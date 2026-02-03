---
id: "202601161024-D3BPVB"
title: "Remove framework upgrade tests"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["workflow"]
verify: []
commit: { hash: "05bc03f42fffec8f445cd18289fa47cae633874f", message: "✨ D3BPVB remove upgrade tests" }
comments:
  - { author: "CODER", body: "verified: Removed the unused upgrade regression tests and documented their removal." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:52.078Z"
doc_updated_by: "agentplane"
description: "Delete tests/test_framework_upgrade.py and update documentation now that the regression suite is gone."
---
## Summary
- Remove the regression suite that previously affirmed the framework upgrade helpers.


## Context
- The automated tests were added for the stale-detection math, but the user now requests deleting them.


## Scope
- Delete `tests/test_framework_upgrade.py` (along with the empty `tests/` directory).
- Update the related task doc to explain that verification now occurs manually.


## Risks
- Removing the only regression test leaves the helper logic unverified; future regression coverage should reintroduce a similar suite if needed.


## Verify Steps
- None (tests deleted by design).


## Rollback Plan
- Restore `tests/test_framework_upgrade.py` from Git history and revert this change if the regression coverage is required again.


## Notes
- There are no other references to `tests/test_framework_upgrade.py` once the file and doc updates are committed.
