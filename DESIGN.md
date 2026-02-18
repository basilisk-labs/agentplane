# AgentPlane Website — Design Language & Constraints (v1)

This document defines the design system for the AgentPlane presentation website: a typography-first, engineering-grade, minimal interface. It is intended as a **contract** for implementation decisions, to prevent stylistic drift.

---

## 1. Core Intent

### 1.1 Product story the design must support

- **Agent-first**: the interface foregrounds agent workflows and enforcement mechanisms (policy, gates, auditability).
- **Proof over promise**: claims are backed by artifacts (CLI transcripts, policy excerpts, workflow lines), not decorative visuals.
- **Boring on purpose**: calm, precise, “tooling” energy—no hype.

### 1.2 Visual metaphor

A clean **engineering sheet**:

- editorial typography,
- subtle grid paper when warranted,
- margin notes,
- calibration marks / corner ticks,
- small “watchdog” anchors in **Geist Pixel** as minimal visual cues.

---

## 2. Non-goals (Hard No)

The following are explicitly disallowed unless this document is revised:

- SaaS-style **card grids** as the primary layout language.
- Heavy backgrounds, gradients, glassmorphism, glow, 3D, illustrations-for-vibes.
- Rounded shapes as a motif (`rounded-none` by default).
- Shadows as a structural tool (`shadow-none` by default).
- “Playful” motion: bouncing, parallax, scroll-jacking, animated backgrounds.
- Multi-accent color palettes, neon, or “AI futurism”.

---

## 3. Global Constraints

### 3.1 Layout constraints

- **Text column width:** target `66–78ch` for main prose.
- **Structure comes from rhythm:** spacing + hairline dividers, not boxes.
- **Sections:** large vertical spacing; avoid nested containers.

### 3.2 Visual constraints

- Default: **no radius**, **no shadows**.
- Borders are **hairline** and low contrast.
- Visual ornaments must be:
  - low-frequency (not repeated everywhere),
  - low-contrast (never competing with content),
  - functional (anchoring, navigation, orientation).

### 3.3 Performance constraints

- Marketing pages should be **static/SSG** by default.
- Minimize client-side JS; prefer CSS transitions for interactions.
- Avoid heavy client libraries for visuals (Lottie, large icon packs, client syntax highlighting).

### 3.4 Accessibility constraints

- All motion respects `prefers-reduced-motion`.
- Focus states are explicit and high-clarity (no blur/glow).
- Grid overlays must not reduce readability (if you _notice_ the grid while reading, it is too strong).

---

## 4. Typography

### 4.1 Font stack

- Primary: **Geist Sans**
- Monospace artifacts: **Geist Mono**
- Micro-anchors: **Geist Pixel** (very limited usage; see §8)

### 4.2 Type scale (targets, not absolutes)

Use clamp-based sizes when possible.

- **H1:** 56–72px, weight 700, `tracking ~ -0.03em`, tight leading (`~1.0`)
- **H2:** 36–44px, weight 650–700
- **H3:** 22–26px, weight 650
- **Body:** 17–18px, weight 400–450, `leading 1.45–1.6`
- **Meta:** 13–14px, weight 450–500
- **Mono artifacts:** 13–15px, weight 450–500

### 4.3 Typographic rules

- Headings should be short (1–2 lines). Prefer **precision** over cleverness.
- Avoid italics as a primary emphasis tool; prefer weight and spacing.
- Links: subtle underline behavior; never “buttonize” everything.
- Mono text is reserved for artifacts: commands, file paths, snippets, gates, policies.

---

## 5. Color Tokens

### 5.1 Philosophy

- Neutral, print-like contrast.
- **One accent** maximum, used sparingly.

### 5.2 Recommended tokens (CSS variables)

Define as RGB triplets to allow alpha composition.

- `--bg`: `255 255 255`
- `--fg`: `10 10 10` (near-black, not pure #000)
- `--muted`: `90 90 90`
- `--faint`: `120 120 120`
- `--border`: `230 230 230`
- `--grid`: `0 0 0` (used only with very low alpha)
- `--accent`: choose one:
  - Neutral accent: `10 10 10` (accent via underline/weight)
  - Teal accent: `13 148 136` (quiet teal)

### 5.3 Accent usage rules

Accent is allowed only for:

- link hover/active,
- current nav item,
- the `/` in the wordmark,
- tiny state markers in artifacts (e.g., `MUST NOT`).

No accent backgrounds. No full-bleed accent sections.

---

## 6. Spacing & Rhythm

### 6.1 Grid

- Base unit: **4px**.
- Major section spacing: **64–96px** (desktop), **48–72px** (mobile).

### 6.2 Rhythm rules

- Prefer vertical rhythm over boxes.
- Use hairline dividers to separate semantic blocks.

---

## 7. Engineering Sheet Elements (Minimal “Agent-first” Ornament)

These are the only approved “decorative” elements, and must remain subtle.

### 7.1 Grid paper overlay

Purpose: provide an engineering feel and orientation.

Rules:

- Use only on hero or one demonstrative section—not globally.
- Opacity target: **4–8%** depending on screen and content density.
- Mobile: weaken or disable.

Implementation hint:

- 64px major grid + optional 16px minor grid with lower alpha.

### 7.2 Corner ticks / calibration marks

Purpose: anchor the “sheet” metaphor.

Rules:

- Only on hero and/or a single key section.
- 1px lines, short segments, low contrast.

### 7.3 Margin notes (engineering annotations)

A margin note is a compact mono label tied to a nearby paragraph/section.

Rules:

- Max 1–2 per viewport.
- 120–160 characters max.
- Use tags like: `NOTE`, `RISK`, `INVARIANT`, `ASSUMPTION`.

Visual:

- Small mono, faint text.
- One thin vertical line—no box.

---

## 8. Geist Pixel Usage (Micro Anchors)

### 8.1 Intent

Geist Pixel is used as a **watchdog-style anchor**: tiny, deliberate, technical. It must never become a “style” that dominates the site.

### 8.2 Allowed uses (only)

- Tiny **section anchor labels** (e.g., `A01`, `WF-02`, `POL-01`) near dividers.
- Small “stamp” labels on artifacts: `PROOF`, `TRACE`, `GATE`, `EXPORT`.
- Minimal corner tags in the hero (e.g., build/commit placeholder).
- Optional micro-status in workflow lines (e.g., `APPROVAL REQUIRED`).

### 8.3 Disallowed uses

- Body text, headings, navigation labels, CTAs.
- Large blocks or repeated patterns.
- Anything that reduces readability.

### 8.4 Visual constraints

- Size: **10–12px** (rarely 13px).
- Tracking: slightly positive (`0.06em` to `0.12em`).
- Color: `--faint` or `--muted`; accent only in exceptional cases.
- Placement: near edges or as a margin cue; never central.

---

## 9. Core Components (Primitive-first)

### 9.1 Divider (hairline)

- 1px border using `--border`.
- Used to structure content instead of cards.

### 9.2 Link

- Default: no pill, no icon noise.
- Hover: underline appears (or thickens slightly).
- Active: subtle contrast increase; optional accent underline.

### 9.3 Button (rare)

Buttons should feel like “links with intent”.

Rules:

- Rectangular, border 1px.
- No radius.
- No shadows.
- Primary CTA may invert foreground/background; secondary stays outline.

### 9.4 Artifact blocks (the “proof” layer)

Artifacts must be minimal and readable:

- **Terminal Transcript**
  - mono, plain, minimal emphasis (no rainbow highlighting)
  - copy action allowed (microinteraction)
- **Policy Excerpt**
  - emphasize `MUST` / `MUST NOT` via weight + minimal marker
- **Workflow Line**
  - textual pipeline `Preflight → Plan → Approve → Execute → Verify → Export`
- **Diff Snippet** (optional)
  - simple `+/-` lines; no GitHub mimicry

Artifacts should be limited to **one per section**.

---

## 10. Motion & Microinteractions

### 10.1 Motion principles

- Motion must provide **feedback** or **orientation**.
- Avoid attention-seeking animation.
- Respect `prefers-reduced-motion`.

### 10.2 Approved microinteractions

- Link underline transition (opacity/width).
- Hairline divider highlight on hover (very subtle).
- Copy button feedback on artifacts (“Copied”).
- Nav active indicator transitions.
- The wordmark slash (`/`) animation (see below).

### 10.3 Slash animation (`agent/plane`)

Intent: a quiet sign of “separation / operator / cursor”, not a mascot.

Default recommended behavior: **blink**

- Opacity: `1.0 ↔ 0.35`
- Period: ~1.2–1.6s
- On hover: stabilize at opacity 1.0

Alternative (slightly more visible): **micro-nudge**

- Translate X by 1px back and forth every ~2.4–3.2s

Hard rules:

- No rotation, no scaling.
- No multi-color cycling.

---

## 11. Content Style Rules (So the design holds)

### 11.1 Claim structure

Each section should follow:

1. One-line claim (what).
2. 2–4 lines rationale (why).
3. One artifact (proof).
4. Optional margin note (risk/invariant).

### 11.2 Language

- Short sentences.
- Technical precision.
- No vague “AI will change everything” statements.
- Prefer verbs: enforce, gate, trace, export, reproduce.

---

## 12. Implementation Notes (Tailwind + Next.js)

### 12.1 Tailwind defaults

- `rounded-none`, `shadow-none`.
- Prefer borders and spacing to create structure.
- Custom utilities recommended:
  - `grid-paper` background
  - `hairline-divider`
  - `margin-note`
  - `pixel-tag`
  - `artifact-block`

### 12.2 Rendering strategy

- Static pages by default (SSG/export).
- Avoid `use client` unless strictly necessary.
- Any interactive component must justify its client JS cost.

### 12.3 Dark mode policy

- Light-first.
- Dark mode only via `prefers-color-scheme` (no UI toggle unless required).
- Grid overlays must be recalibrated in dark mode to avoid noise.

---

## 13. QA Checklist (Definition of Done)

Typography & layout

- [ ] Main text stays within 66–78ch.
- [ ] Headings are short and readable.
- [ ] No card-grid dominates the layout.

Visual discipline

- [ ] No shadows and no radius unless explicitly justified.
- [ ] Only one accent color in use.
- [ ] Grid paper is used sparingly and remains subtle.

Artifacts

- [ ] At least one “proof artifact” exists for each major claim.
- [ ] Artifacts are minimal, mono-first, and readable.

Motion & a11y

- [ ] `prefers-reduced-motion` disables non-essential animation.
- [ ] Focus outlines are clear, not decorative.
- [ ] Hover states are informative, not playful.

Performance

- [ ] Minimal client JS.
- [ ] No heavy visual libraries.

---

## 14. Versioning

- v1: initial contract (typography-first engineering sheet + Geist Pixel micro anchors).
- Any addition of new motifs must update this document first.
