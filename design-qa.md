# Homepage design QA

References: selected 1024 × 1536 desktop mockup (`exec-c047d834-adbc-4a5b-92bc-370163411689.png`) and the generated 853 × 1844 mobile concept (`exec-e38c4f61-8d3e-46b0-b01b-e1a4b9bf6b51.png`).

## Desktop comparison

- Compared the reference and the local production build at 1024 px after entrance motion settled.
- The headline starts at y=146 px, the repository window at y=438 px, and the proof section at y=1156 px. These match the reference layout to within a few pixels.
- The white surface, coral action, dotted edges, repository split view, syntax-colored ACR, and four-stage footer follow the reference. The file tree now uses consistent folder glyphs and includes the `src` and `tests` folders from the mockup.
- The thin progress line, per-file caption, and changing handwritten notes retain the requested interaction.

## Behavior and responsive check

- The generated mobile concept guided the simplified 390 px layout: logo and menu, stacked actions, horizontal artifact tabs, 11 visible code lines, a thin progress line, one handwritten note, and a 2 × 2 stage summary below the card.
- At 390 px and 320 px, document scroll width equals viewport width. The mobile tabs expose all seven artifacts and scroll inside the card.
- Selecting `AGENTS.md` changes the code, caption, and handwritten note. It leaves the hero's internal scroll position at zero; the repository window no longer jumps within the hero.
- After 900 ms of playback, pausing held the progress line at 13.58 px through a further 650 ms. Resuming advanced the line and selected the next file after the remaining interval, with matching caption and note.
- Reduced-motion preference uses a manual next-file control by code path; this preference was not emulated in the browser session.
- The homepage links to existing quickstart and GitHub destinations.

## Verification

- `bun run docs:site:typecheck` passed.
- `bun run docs:site:check:design` passed.
- `bun run docs:site:build:check` passed.

Final result: passed.
