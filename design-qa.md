# Homepage design QA

References: selected 1024 × 1536 desktop mockup (`exec-c047d834-adbc-4a5b-92bc-370163411689.png`) and the generated 853 × 1844 mobile concept (`exec-e38c4f61-8d3e-46b0-b01b-e1a4b9bf6b51.png`).

Continuation mockups, completed before implementation:

- `homepage-continuation/desktop-middle.png`: proof overview, authority gap, control loop.
- `homepage-continuation/desktop-lower.png`: Git evidence, compatibility, workflow modes, docs, closing CTA.
- `homepage-continuation/mobile-middle.png`: simplified overview, diff, and 2 × 2 control loop.
- `homepage-continuation/mobile-lower.png`: compact evidence ledger, tool grid, routes, docs, and CTA.

The files are in `/Users/densmirnov/.codex/visualizations/2026/09/23/01a0ce1b-2b80-7ec0-8199-b204155a1ece/homepage-continuation/`.

## Desktop comparison

- Compared the reference and the local production build at 1024 px after entrance motion settled.
- The headline starts at y=146 px, the repository window at y=438 px, and the proof section at y=1156 px. These match the reference layout to within a few pixels.
- The white surface, coral action, dotted edges, repository split view, syntax-colored ACR, and four-stage footer follow the reference. The file tree now uses consistent folder glyphs and includes the `src` and `tests` folders from the mockup.
- The thin progress line, per-file caption, and changing handwritten notes retain the requested interaction.
- Compared every continuation section in a full-page 1024 px browser capture. They now use the same centered content grid, dotted edge texture, compact section spacing, pale-blue technical borders, and coral accents as the mockups.
- The authority example includes a readable diff and handwritten annotation. The control loop uses four visible pictograms and an evidence card. The lower page has a Git evidence ledger, four tool cards, two workflow cards, bordered documentation rows, and a closing CTA.

## Behavior and responsive check

- The generated mobile concept guided the simplified 390 px layout: logo and menu, stacked actions, horizontal artifact tabs, 11 visible code lines, a thin progress line, one handwritten note, and a 2 × 2 stage summary below the card.
- Rechecked the published beta against the concept and corrected its mobile proportions. At 390 px, the headline starts at y=81 px, the 330 px wide card at y=332 px, and the proof section at y=746 px. The concept scales to approximately y=85 px, y=332 px, and y=741 px at that width.
- The first three artifact tabs now fill the card width, with an icon and blue active underline. Other files remain available by horizontal scrolling. The card height is 251 px, close to the concept's approximately 248 px.
- At 390 px and 320 px, document scroll width equals viewport width. The mobile tabs expose all seven artifacts and scroll inside the card.
- Compared the continuation against both mobile mockups in a full-page 390 px capture and checked the narrower 320 px layout. The proof points are short rows, the control loop is 2 × 2, the evidence ledger stays in two columns, the tool names form a 2 × 2 grid, and workflow routes stack as cards.
- Selecting Verify in the control loop changes the pressed state and evidence to the verification message and artifact.
- Selecting `AGENTS.md` changes the code, caption, and handwritten note. It leaves the hero's internal scroll position at zero; the repository window no longer jumps within the hero.
- After 900 ms of playback, pausing held the progress line at 13.58 px through a further 650 ms. Resuming advanced the line and selected the next file after the remaining interval, with matching caption and note.
- Reduced-motion preference uses a manual next-file control by code path; this preference was not emulated in the browser session.
- The homepage links to existing quickstart and GitHub destinations.

## Verification

- `bun run docs:site:typecheck` passed.
- `bun run docs:site:check:design` passed.
- `bun run docs:site:build:check` passed.

Final result: passed.
