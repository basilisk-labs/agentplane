import type { HelpJson } from "./help-render.js";

function escInline(text: string): string {
  return text.replaceAll("`", "\\`");
}

function toAnchor(text: string): string {
  return text
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/(^-|-$)/g, "");
}

function formatDefaultValue(value: unknown): string {
  if (value === undefined) return "";
  if (value === null) return "null";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "bigint") return value.toString();
  try {
    return JSON.stringify(value);
  } catch {
    return "[unserializable]";
  }
}

export function renderCliDocsMdx(specs: readonly HelpJson[]): string {
  const byGroup = new Map<string, readonly HelpJson[]>();
  for (const s of specs) {
    const g = s.group || "Other";
    byGroup.set(g, [...(byGroup.get(g) ?? []), s]);
  }

  const groups = [...byGroup.keys()].toSorted((a, b) => a.localeCompare(b));
  const groupEntries = groups.map((g) => ({
    group: g,
    specs: (byGroup.get(g) ?? []).toSorted((a, b) => a.id.join(" ").localeCompare(b.id.join(" "))),
  }));

  const indexLines = groupEntries.flatMap(({ group, specs }) => [
    `- ${group}`,
    ...specs.map((s) => {
      const title = s.id.join(" ");
      return `  - [${title}](#${toAnchor(title)})`;
    }),
  ]);

  const bodyLines = groupEntries.flatMap(({ group, specs }) => {
    const groupHeader = ["", `## ${group}`];
    const commandBlocks = specs.flatMap((s) => {
      const summaryLines = s.description
        ? ["", escInline(s.summary), "", escInline(s.description)]
        : ["", escInline(s.summary)];

      const usageLines = ["", "Usage:", "", "```text", ...(s.usage ?? []), "```"];

      const visibleOpts = (s.options ?? []).filter((o) => !o.hidden);
      const optionLines =
        visibleOpts.length === 0
          ? []
          : [
              "",
              "Options:",
              "",
              ...visibleOpts.map((o) => {
                const short = o.short ? `-${o.short}, ` : "";
                const head =
                  o.kind === "string"
                    ? `${short}--${o.name} ${o.valueHint ?? "<value>"}`
                    : `${short}--${o.name}`;
                const meta = [
                  o.required ? "required" : null,
                  o.repeatable ? "repeatable" : null,
                  o.choices && o.choices.length > 0 ? `choices=${o.choices.join("|")}` : null,
                  o.patternHint ? `format=${o.patternHint}` : null,
                  o.default === undefined ? null : `default=${formatDefaultValue(o.default)}`,
                  o.deprecated ? `deprecated=${o.deprecated}` : null,
                ].filter((x): x is string => x !== null);
                const suffix = meta.length > 0 ? ` (${meta.join(", ")})` : "";
                return `- \`${escInline(head)}\`: ${escInline(o.description)}${escInline(suffix)}`;
              }),
            ];

      const notesLines =
        s.notes && s.notes.length > 0
          ? ["", "Notes:", "", ...s.notes.map((n) => `- ${escInline(n)}`)]
          : [];

      const examplesLines =
        s.examples && s.examples.length > 0
          ? [
              "",
              "Examples:",
              "",
              ...s.examples.flatMap((ex) => {
                const why = ex.why ? [`- ${escInline(ex.why)}`] : [];
                return ["```sh", ex.cmd, "```", ...why];
              }),
            ]
          : [];

      return [
        "",
        `### ${s.id.join(" ")}`,
        "",
        ...summaryLines,
        ...usageLines,
        ...optionLines,
        ...notesLines,
        ...examplesLines,
      ];
    });
    return [...groupHeader, ...commandBlocks];
  });

  const lines = [
    "# CLI Reference (Generated)",
    "",
    "This page is generated from the CLI command specs. Do not edit it by hand; edit the specs instead.",
    "",
    "## Index",
    "",
    ...indexLines,
    ...bodyLines,
    "",
  ];

  return lines.join("\n");
}
