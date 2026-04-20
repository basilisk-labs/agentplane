# AgentPlane Design Guide

This file is the short navigation contract for AgentPlane public surfaces. Historical strategy and
long-lived architecture decisions live in [docs/adr/README.md](docs/adr/README.md).

## Positioning

AgentPlane should look like a Git-native control plane for auditable agent work, not a generic AI
assistant, hosted autonomy dashboard, or decorative workflow framework.

Primary line:

**AgentPlane is a Git-native control plane for auditable agent work.**

Human version:

**Put coding agents on a governed Git workflow.**

## Visual Direction

Use an editorial control surface over engineering artifacts:

- clear typography,
- proof-oriented repo and workflow surfaces,
- restrained neutral color,
- one cool technical accent,
- visible task, approval, verification, and closure boundaries.

Avoid:

- neon, cyberpunk, or generic AI visual language,
- decorative glass everywhere,
- fake dashboards that do not map to shipped behavior,
- repeated feature-card farms without proof artifacts,
- animation that competes with comprehension.

## Layout Rules

Top-level pages should explain the product before internal doctrine:

1. Category and value.
2. Repository surface.
3. Control boundary.
4. Concrete proof.
5. Next action.

Approved section patterns:

- editorial left / proof right,
- proof left / explanatory right,
- compact comparison rows,
- workflow timeline,
- small bento groups only when each tile maps to a real product surface.

## Typography And Material

Use the site fonts already configured by the website:

- Geist Sans for prose and headings,
- Geist Mono for commands and repo artifacts,
- Geist Pixel only for small labels when already present.

Keep body prose readable, with compact paragraphs and enough spacing between proof surfaces.

## Design QA

Before publishing a public page, confirm:

- the first screen explains what AgentPlane is,
- every major visual card carries an artifact, command, workflow step, or proof point,
- claims map to shipped behavior,
- product limits are visible,
- the page routes to docs, setup, workflow, or command reference.

Run:

```bash
bun run docs:site:check:design
```
