# ADR 0010: Core Root Export Compatibility

## Status

Accepted

## Date

2026-04-22

## Context

`@agentplaneorg/core` publishes both a root export and domain subpath exports:

1. `@agentplaneorg/core`
2. `@agentplaneorg/core/fs`
3. `@agentplaneorg/core/git`
4. `@agentplaneorg/core/logger`
5. `@agentplaneorg/core/process`
6. `@agentplaneorg/core/schemas`
7. `@agentplaneorg/core/tasks`

The root export is the historical public import surface for external consumers. The subpath exports
were added to make internal ownership clearer and to let package consumers load narrower runtime
areas when they only need filesystem, Git, process, schema, logger, or task helpers.

Internal Agentplane packages now have lint coverage that restricts selected runtime imports from the
root export when a matching subpath exists. That guard is an internal architecture rule, not a public
package removal policy.

## Decision

Keep `@agentplaneorg/core` as a backward-compatible aggregate export during the current patch/minor
line.

Use subpath imports for internal runtime code whenever a symbol is owned by a published subpath:

```ts
import { runProcess } from "@agentplaneorg/core/process";
import { GitContext } from "@agentplaneorg/core/git";
import { renderTaskReadme } from "@agentplaneorg/core/tasks";
```

Do not remove existing root re-exports in a patch release. A future breaking release may remove or
narrow the root aggregate only after a new ADR or release plan defines:

1. the exact removed symbols;
2. the replacement subpath for each symbol;
3. the migration window;
4. release notes for external consumers;
5. verification that repository imports no longer depend on the removed root surface.

New public symbols should be added to the narrowest owning subpath first. Re-exporting them from the
root aggregate requires an explicit compatibility reason.

## Consequences

### Positive

1. Existing external `@agentplaneorg/core` consumers keep working across patch releases.
2. Internal runtime code can still get the cold-start and ownership benefits of subpath imports.
3. The lint rule can enforce internal module boundaries without becoming a hidden public API break.

### Negative

1. The root aggregate remains broader than the preferred internal import style.
2. Some symbols may be available from both the root and a subpath until the next breaking release.
3. External consumers may keep using the aggregate unless documentation points them to subpaths.

## Follow-up

Reopen this decision when one of these becomes true:

1. A breaking release is planned for `@agentplaneorg/core`.
2. A new subpath is added to the package exports.
3. The internal restricted-import list no longer matches the published subpath surface.
