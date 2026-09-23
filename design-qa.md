# Homepage design QA

Reference: selected 1024 × 1536 Agentplane homepage mockup (`exec-c047d834-adbc-4a5b-92bc-370163411689.png`).

## Desktop comparison

- Compared the reference and the local production build at 1024 px after entrance motion settled.
- The headline starts at y=146 px, the repository window at y=438 px, and the proof section at y=1156 px. These match the reference layout to within a few pixels.
- The white surface, coral action, dotted edges, repository split view, syntax-colored ACR, and four-stage footer follow the reference.
- The thin progress line, per-file caption, and changing handwritten notes retain the requested interaction.

## Behavior and responsive check

- At 390 px, the page has no document-level horizontal overflow. The file list scrolls horizontally inside the repository window.
- The file list exposes seven buttons. Selecting `AGENTS.md` with the keyboard changed the editor content, caption, and handwritten notes.
- The tour advances between files and can be paused. Reduced-motion users receive a manual next-file control.
- The homepage links to existing quickstart and GitHub destinations.

## Verification

- `bun run docs:site:typecheck` passed.
- `bun run docs:site:check:design` passed.
- `bun run docs:site:build:check` passed.

Final result: passed.
