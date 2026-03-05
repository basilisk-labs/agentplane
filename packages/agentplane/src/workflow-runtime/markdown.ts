import { parseTaskReadme, renderTaskFrontmatter } from "@agentplaneorg/core";

import type {
  WorkflowDiagnostic,
  WorkflowDocument,
  WorkflowFrontMatter,
  WorkflowSections,
  WorkflowValidationResult,
} from "./types.js";

const REQUIRED_SECTIONS = ["Prompt Template", "Checks", "Fallback"] as const;

function sectionDiagnostics(sections: WorkflowSections): WorkflowDiagnostic[] {
  const out: WorkflowDiagnostic[] = [];
  for (const section of REQUIRED_SECTIONS) {
    const value = sections[section];
    if (!value || value.trim().length === 0) {
      out.push({
        code: "WF_REQUIRED_SECTION_MISSING",
        severity: "ERROR",
        path: `sections.${section}`,
        message: `Missing required section: ${section}`,
      });
    }
  }
  return out;
}

function splitFrontMatter(input: string): {
  frontMatterText: string;
  body: string;
} {
  const normalized = input.replaceAll("\r\n", "\n");
  if (!normalized.startsWith("---\n")) {
    return { frontMatterText: "", body: normalized };
  }
  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) {
    return {
      frontMatterText: normalized.slice(4),
      body: "",
    };
  }
  return {
    frontMatterText: normalized.slice(4, end),
    body: normalized.slice(end + 5),
  };
}

function parseSections(body: string): WorkflowSections {
  const lines = body.replaceAll("\r\n", "\n").split("\n");
  const sections: WorkflowSections = {};
  let current: string | null = null;
  let buffer: string[] = [];

  const flush = () => {
    if (!current) return;
    sections[current] = buffer.join("\n").trim();
    buffer = [];
  };

  for (const line of lines) {
    const heading = /^##\s+(.+)\s*$/.exec(line);
    if (heading?.[1]) {
      flush();
      current = heading[1].trim();
      continue;
    }
    if (current) buffer.push(line);
  }
  flush();
  return sections;
}

function readFrontMatterMap(frontMatterText: string): {
  value: Record<string, unknown>;
  diagnostics: WorkflowDiagnostic[];
} {
  if (!frontMatterText.trim()) {
    return {
      value: {},
      diagnostics: [
        {
          code: "WF_SCHEMA_MISSING",
          severity: "ERROR",
          path: "front_matter",
          message: "Front matter is required.",
        },
      ],
    };
  }

  try {
    const parsed = parseTaskReadme(`---\n${frontMatterText}\n---\n`).frontmatter as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {
        value: {},
        diagnostics: [
          {
            code: "WF_FRONTMATTER_NOT_OBJECT",
            severity: "ERROR",
            path: "front_matter",
            message: "Workflow front matter must decode to an object.",
          },
        ],
      };
    }
    return { value: parsed as Record<string, unknown>, diagnostics: [] };
  } catch (error) {
    return {
      value: {},
      diagnostics: [
        {
          code: "WF_PARSE_ERROR",
          severity: "ERROR",
          path: "front_matter",
          message: `Failed to parse workflow front matter: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
}

export function parseWorkflowMarkdown(
  text: string,
  sourcePath?: string,
): {
  document: Omit<WorkflowDocument, "frontMatter"> & { frontMatter: WorkflowFrontMatter };
  diagnostics: WorkflowDiagnostic[];
} {
  const { frontMatterText, body } = splitFrontMatter(text);
  const fm = readFrontMatterMap(frontMatterText);
  const sections = parseSections(body);
  const diagnostics = [...fm.diagnostics, ...sectionDiagnostics(sections)];

  const frontMatter = fm.value as unknown as WorkflowFrontMatter;

  return {
    document: {
      frontMatter,
      frontMatterRaw: fm.value,
      body,
      sections,
      promptTemplate: sections["Prompt Template"] ?? "",
      sourcePath,
    },
    diagnostics,
  };
}

function toYamlObject(frontMatter: Record<string, unknown>): string {
  const fm = renderTaskFrontmatter(frontMatter);
  return fm.replace(/^---\n/, "").replace(/\n---\n$/, "");
}

export function serializeWorkflowMarkdown(
  frontMatter: Record<string, unknown>,
  sections: WorkflowSections,
): string {
  const orderedSections = ["Prompt Template", "Checks", "Fallback"] as const;
  const renderedSections: string[] = [];

  for (const name of orderedSections) {
    const content = sections[name] ?? "";
    renderedSections.push(`## ${name}\n${content}`.trimEnd());
  }

  const extras = Object.keys(sections)
    .filter((name) => !orderedSections.includes(name as (typeof orderedSections)[number]))
    .toSorted();

  for (const name of extras) {
    renderedSections.push(`## ${name}\n${sections[name] ?? ""}`.trimEnd());
  }

  return `---\n${toYamlObject(frontMatter)}\n---\n\n${renderedSections.join("\n\n")}\n`;
}

export function diagnosticsToValidationResult(
  diagnostics: WorkflowDiagnostic[],
): WorkflowValidationResult {
  const hasError = diagnostics.some((d) => d.severity === "ERROR");
  return {
    ok: !hasError,
    diagnostics,
  };
}
