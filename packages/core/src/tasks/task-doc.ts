const DOC_SECTION_HEADER = "## Summary";
const DOC_SECTION_HEADER_RE = /^##\s+Summary(?:\s|$|#)/;
const AUTO_SUMMARY_HEADER = "## Changes Summary (auto)";

export function normalizeDocSectionName(section: string): string {
  return section.trim().replaceAll(/\s+/g, " ").toLowerCase();
}

function normalizeDoc(text: string): string {
  return (text ?? "")
    .split("\n")
    .map((line) => line.replaceAll(/\s+$/gu, ""))
    .join("\n")
    .trim();
}

export function splitCombinedHeadingLines(doc: string): string[] {
  const lines = doc.replaceAll("\r\n", "\n").split("\n");
  const out: string[] = [];
  let inFence = false;

  for (const line of lines) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      out.push(line);
      continue;
    }

    if (!inFence && line.includes("## ")) {
      const matches = [...line.matchAll(/##\s+/g)];
      if (matches.length > 1 && matches[0]?.index === 0) {
        let start = 0;
        for (let i = 1; i < matches.length; i += 1) {
          const idx = matches[i]?.index ?? 0;
          const chunk = line.slice(start, idx).trimEnd();
          if (chunk) out.push(chunk);
          start = idx;
        }
        const last = line.slice(start).trimEnd();
        if (last) out.push(last);
        continue;
      }
    }

    out.push(line);
  }

  return out;
}

function normalizeSectionLines(lines: string[]): string[] {
  const trimmedLines = [...lines];
  while (trimmedLines.length > 0 && trimmedLines[0]?.trim() === "") trimmedLines.shift();
  while (trimmedLines.length > 0 && trimmedLines.at(-1)?.trim() === "") trimmedLines.pop();

  const out: string[] = [];
  let inFence = false;
  let pendingBlank = false;

  for (const line of trimmedLines) {
    const fenceCheck = line.trimStart();
    if (fenceCheck.startsWith("```")) {
      if (pendingBlank) {
        out.push("");
        pendingBlank = false;
      }
      out.push(line);
      inFence = !inFence;
      continue;
    }

    if (inFence) {
      out.push(line);
      continue;
    }

    if (line.trim() === "") {
      pendingBlank = true;
      continue;
    }

    if (pendingBlank) {
      out.push("");
      pendingBlank = false;
    }
    out.push(line);
  }

  return out;
}

export function normalizeTaskDoc(doc: string): string {
  const normalized = doc.replaceAll("\r\n", "\n");
  const trimmed = normalized.replaceAll(/^\n+|\n+$/g, "");
  if (!trimmed) return "";

  const lines = splitCombinedHeadingLines(trimmed);
  const sections = new Map<string, { title: string; lines: string[] }>();
  const order: string[] = [];
  const pendingSeparator = new Set<string>();
  let currentKey: string | null = null;

  for (const line of lines) {
    const match = /^##\s+(.*)$/.exec(line.trim());
    if (match) {
      const title = match[1]?.trim() ?? "";
      const key = normalizeDocSectionName(title);
      if (key) {
        const existing = sections.get(key);
        if (existing) {
          if (existing.lines.some((entry) => entry.trim() !== "")) {
            pendingSeparator.add(key);
          }
        } else {
          sections.set(key, { title, lines: [] });
          order.push(key);
        }
        currentKey = key;
        continue;
      }
    }
    if (currentKey) {
      const entry = sections.get(currentKey);
      if (!entry) continue;
      if (pendingSeparator.has(currentKey) && line.trim() !== "") {
        entry.lines.push("");
        pendingSeparator.delete(currentKey);
      }
      entry.lines.push(line);
    }
  }

  if (order.length === 0) return trimmed;

  const out: string[] = [];
  for (const key of order) {
    const section = sections.get(key);
    if (!section) continue;
    const normalizedLines = normalizeSectionLines(section.lines);
    if (normalizedLines.length > 0) {
      out.push(`## ${section.title}`, "", ...normalizedLines, "");
    } else {
      out.push(`## ${section.title}`, "", "");
    }
  }

  return out.join("\n").trimEnd();
}

export function extractTaskDoc(body: string): string {
  if (!body) return "";
  const lines = body.split("\n");
  let startIdx: number | null = null;
  for (const [idx, line] of lines.entries()) {
    if (DOC_SECTION_HEADER_RE.test(line.trim())) {
      startIdx = idx;
      break;
    }
  }
  if (startIdx === null) return "";
  if (lines[startIdx]?.trim() !== DOC_SECTION_HEADER) {
    lines[startIdx] = DOC_SECTION_HEADER;
  }
  let endIdx = lines.length;
  for (let idx = startIdx + 1; idx < lines.length; idx += 1) {
    if (lines[idx]?.trim() === AUTO_SUMMARY_HEADER) {
      endIdx = idx;
      break;
    }
  }
  const doc = lines.slice(startIdx, endIdx).join("\n").trimEnd();
  return normalizeTaskDoc(doc);
}

export function mergeTaskDoc(body: string, doc: string): string {
  const docText = normalizeTaskDoc(String(doc ?? ""));
  if (docText) {
    const lines = body ? body.split("\n") : [];
    let prefixIdx: number | null = null;
    for (const [idx, line] of lines.entries()) {
      if (DOC_SECTION_HEADER_RE.test(line.trim())) {
        prefixIdx = idx;
        break;
      }
    }
    const prefixText = prefixIdx === null ? "" : lines.slice(0, prefixIdx).join("\n").trimEnd();

    let autoIdx: number | null = null;
    for (const [idx, line] of lines.entries()) {
      if (line.trim() === AUTO_SUMMARY_HEADER) {
        autoIdx = idx;
        break;
      }
    }
    const autoBlock = autoIdx === null ? "" : lines.slice(autoIdx).join("\n").trimEnd();

    const parts: string[] = [];
    if (prefixText) {
      parts.push(prefixText, "");
    }
    parts.push(docText.trimEnd());
    if (autoBlock) {
      parts.push("", autoBlock);
    }
    return `${parts.join("\n").trimEnd()}\n`;
  }
  return body;
}

export function docChanged(existing: string, updated: string): boolean {
  return normalizeDoc(existing) !== normalizeDoc(updated);
}

function escapeRegExp(text: string): string {
  return text.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\\$&`);
}

export function setMarkdownSection(body: string, section: string, text: string): string {
  const lines = body.replaceAll("\r\n", "\n").split("\n");
  const headingRe = new RegExp(String.raw`^##\s+${escapeRegExp(section)}\s*$`);

  let start = -1;
  let nextHeading = lines.length;

  for (const [i, line] of lines.entries()) {
    if (!line.startsWith("## ")) continue;
    if (start === -1) {
      if (headingRe.test(line)) start = i;
      continue;
    }
    nextHeading = i;
    break;
  }

  const newTextLines = text.replaceAll("\r\n", "\n").split("\n");
  const replacement = ["", ...newTextLines, ""];

  if (start === -1) {
    const out = [...lines];
    if (out.length > 0 && out.at(-1)?.trim() !== "") out.push("");
    out.push(`## ${section}`, ...replacement);
    return `${out.join("\n")}\n`;
  }

  const out = [...lines.slice(0, start + 1), ...replacement, ...lines.slice(nextHeading)];
  return `${out.join("\n")}\n`;
}

function normalizeDocSections(doc: string, required: string[]): string {
  const lines = splitCombinedHeadingLines(doc);
  const sections = new Map<string, { title: string; lines: string[] }>();
  const order: string[] = [];
  const pendingSeparator = new Set<string>();
  let currentKey: string | null = null;

  for (const line of lines) {
    const match = /^##\s+(.*)$/.exec(line.trim());
    if (match) {
      const title = match[1]?.trim() ?? "";
      const key = normalizeDocSectionName(title);
      if (key) {
        const existing = sections.get(key);
        if (existing) {
          if (existing.lines.some((entry) => entry.trim() !== "")) {
            pendingSeparator.add(key);
          }
        } else {
          sections.set(key, { title, lines: [] });
          order.push(key);
        }
        currentKey = key;
        continue;
      }
    }
    if (currentKey) {
      const entry = sections.get(currentKey);
      if (!entry) continue;
      if (pendingSeparator.has(currentKey) && line.trim() !== "") {
        entry.lines.push("");
        pendingSeparator.delete(currentKey);
      }
      entry.lines.push(line);
    }
  }

  const out: string[] = [];
  const seen = new Set(order);

  for (const key of order) {
    const section = sections.get(key);
    if (!section) continue;
    out.push(`## ${section.title}`);
    if (section.lines.length > 0) {
      out.push(...section.lines);
    } else {
      out.push("");
    }
    out.push("");
  }

  for (const requiredSection of required) {
    const requiredKey = normalizeDocSectionName(requiredSection);
    if (seen.has(requiredKey)) continue;
    out.push(`## ${requiredSection}`, "", "");
  }

  return `${out.join("\n").trimEnd()}\n`;
}

export function ensureDocSections(doc: string, required: string[]): string {
  const trimmed = doc.trim();
  if (!trimmed) {
    const blocks = required.map((section) => `## ${section}\n`);
    return `${blocks.join("\n").trimEnd()}\n`;
  }
  return normalizeDocSections(doc, required);
}

export function parseDocSections(doc: string): {
  sections: Map<string, { title: string; lines: string[] }>;
  order: string[];
} {
  const lines = splitCombinedHeadingLines(doc);
  const sections = new Map<string, { title: string; lines: string[] }>();
  const order: string[] = [];
  let currentKey: string | null = null;
  for (const line of lines) {
    const match = /^##\s+(.*)$/.exec(line.trim());
    if (match) {
      const title = match[1]?.trim() ?? "";
      const key = normalizeDocSectionName(title);
      if (key) {
        if (!sections.has(key)) {
          sections.set(key, { title, lines: [] });
          order.push(key);
        }
        currentKey = key;
        continue;
      }
    }
    if (currentKey) {
      const entry = sections.get(currentKey);
      if (entry) entry.lines.push(line);
    }
  }
  return { sections, order };
}
