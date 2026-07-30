import { describe, expect, it } from "vitest";

import {
  PROJECTION_PREVIEW_MAX_BYTES,
  PROJECTION_PREVIEW_MAX_LINES,
  PROJECTION_WINDOW_MAX_LINES,
  projectRowsForFile,
} from "./reindex-projection.js";

describe("context projection v2", () => {
  it("keeps a long markdown section fully searchable while bounding its preview and source span", () => {
    const tail = "rf16-markdown-tail-sentinel";
    const content = [
      "# Architecture",
      "",
      "## Retrieval boundary",
      ...Array.from({ length: 48 }, (_, index) => `detail line ${index + 1}`),
      tail,
    ].join("\n");

    const section = projectRowsForFile("context/wiki/architecture.md", content).find(
      (row) => row.path === "context/wiki/architecture.md#section=retrieval-boundary",
    );

    expect(section?.search_text).toContain(tail);
    expect(section?.preview_text).not.toContain(tail);
    expect(section?.preview_text.split("\n")).toHaveLength(PROJECTION_PREVIEW_MAX_LINES);
    expect(Buffer.byteLength(section?.preview_text ?? "", "utf8")).toBeLessThanOrEqual(
      PROJECTION_PREVIEW_MAX_BYTES,
    );
    expect(section?.source_refs).toEqual([
      "context/wiki/architecture.md#section=retrieval-boundary",
      "context/wiki/architecture.md#lines=3-52",
    ]);
  });

  it("uses stable JSONL rows and JSON line windows with complete search text", () => {
    const jsonlTail = "rf16-jsonl-tail-sentinel";
    const jsonl = `${JSON.stringify({
      id: "fact:rf16",
      fact: "A fact with a deliberately long value.",
      details: "x".repeat(PROJECTION_PREVIEW_MAX_BYTES),
      tail: jsonlTail,
      source_refs: ["context/raw/research.md#lines=8-9"],
    })}\n`;
    const jsonlRow = projectRowsForFile(".agentplane/context/derived/facts/facts.jsonl", jsonl)[0];
    expect(jsonlRow).toMatchObject({
      path: ".agentplane/context/derived/facts/facts.jsonl#fact=fact:rf16",
      kind: "jsonl-row",
    });
    expect(jsonlRow?.search_text).toContain(jsonlTail);
    expect(Buffer.byteLength(jsonlRow?.preview_text ?? "", "utf8")).toBeLessThanOrEqual(
      PROJECTION_PREVIEW_MAX_BYTES,
    );
    expect(jsonlRow?.source_refs).toEqual(["context/raw/research.md#lines=8-9"]);

    const jsonTail = "rf16-json-tail-sentinel";
    const json = [
      "{",
      ...Array.from(
        { length: PROJECTION_WINDOW_MAX_LINES + 4 },
        (_, index) => `  "field_${index}": "value_${index}",`,
      ),
      `  "tail": "${jsonTail}"`,
      "}",
    ].join("\n");
    const jsonWindow = projectRowsForFile("context/raw/config.json", json).find(
      (row) => row.kind === "json-window" && row.search_text.includes(jsonTail),
    );
    expect(jsonWindow).toMatchObject({
      path: "context/raw/config.json#lines=81-87",
      kind: "json-window",
      source_refs: ["context/raw/config.json#lines=81-87"],
    });
  });

  it("records projection-size boundaries on a scalable fixture within the explicit latency budget", () => {
    const content = Array.from(
      { length: PROJECTION_WINDOW_MAX_LINES * 16 },
      (_, index) => `line ${index + 1}: ${"context ".repeat(32)}`,
    ).join("\n");
    const startedAt = performance.now();
    const rows = projectRowsForFile("context/raw/scalable.txt", content);
    const elapsedMs = performance.now() - startedAt;

    expect(rows.some((row) => row.search_text.includes("line 1280"))).toBe(true);
    expect(
      rows.every(
        (row) => Buffer.byteLength(row.preview_text, "utf8") <= PROJECTION_PREVIEW_MAX_BYTES,
      ),
    ).toBe(true);
    expect(elapsedMs).toBeLessThan(2000);
  });
});
