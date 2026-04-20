# ADR 0008: Keep yauzl for ZIP Validation

## Status

Accepted

## Date

2026-04-20

## Context

`agentplane` has a small runtime dependency surface, so every CLI runtime dependency needs an
explicit reason to stay. The v2 refactor roadmap asked whether `yauzl` should be replaced by a
lighter ZIP library such as `unzipit` or `fflate`.

The current ZIP path is narrow:

1. `packages/agentplane/src/cli/archive.ts` uses `yauzl` only to list ZIP entries before extraction.
2. The validator rejects unsafe names, path traversal, absolute paths, drive-letter paths, null
   bytes, and symlink entries.
3. Symlink detection depends on ZIP `externalFileAttributes`.
4. Extraction still uses the system `unzip` command after validation.

## Measurements

Package metadata was checked with `npm view` on 2026-04-20:

| Package   | Version checked | Unpacked size | Runtime deps                | Fit                                                                            |
| --------- | --------------: | ------------: | --------------------------- | ------------------------------------------------------------------------------ |
| `yauzl`   |          2.10.0 |  66,204 bytes | `fd-slicer`, `buffer-crc32` | Current implementation; lazy entry scanning; exposes external file attributes. |
| `yauzl`   |           3.3.0 |  97,675 bytes | `buffer-crc32`, `pend`      | Larger than the pinned major; not needed for the current path.                 |
| `unzipit` |           2.0.1 | 133,930 bytes | none reported by `npm view` | Larger than current `yauzl`; browser-oriented API would require adapter work.  |
| `fflate`  |           0.8.2 | 773,398 bytes | none reported by `npm view` | Much larger; would shift the path toward in-process ZIP handling.              |

Local installed size for `yauzl@2.10.0` and its direct runtime deps in this checkout:

| Package        | Local size |
| -------------- | ---------: |
| `yauzl`        |      76 KB |
| `fd-slicer`    |      48 KB |
| `buffer-crc32` |      20 KB |

## Decision

Keep `yauzl@^2.10.0` for now.

Do not migrate to `unzipit` or `fflate` in this refactor cycle. Neither candidate provides the
required roadmap win of reducing bundle/runtime size by more than 30%, and both would create extra
implementation risk around ZIP metadata and extraction semantics.

## Consequences

### Positive

1. The current ZIP validation behavior stays stable.
2. The dependency remains scoped to one file and one purpose.
3. No new extraction implementation or symlink-detection semantics are introduced.

### Negative

1. `agentplane` continues to carry `yauzl` plus two small transitive runtime dependencies.
2. The CLI still relies on a system `unzip` executable for extraction.

## Follow-up

Reopen this decision only if one of these becomes true:

1. ZIP extraction must become fully in-process and cross-platform without relying on system `unzip`.
2. A candidate library demonstrably preserves entry metadata needed for symlink validation and
   reduces total shipped size by more than 30%.
3. `yauzl@2` becomes incompatible with supported Node versions or receives a relevant security
   advisory.
