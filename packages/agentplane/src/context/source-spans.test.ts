import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import type { ManifestEntry } from "./ingest-manifest.js";
import { buildSourceSpanSkeleton } from "./source-spans.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-source-spans-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  for (const root of tempRoots) await rm(root, { recursive: true, force: true });
  tempRoots = [];
});

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

function source(pathname: string, contentType = "text/markdown"): ManifestEntry {
  return {
    path: pathname,
    sha256: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    size_bytes: 1,
    mtime: "2026-07-02T00:00:00.000Z",
    content_type: contentType,
    status: "new",
  };
}

describe("source span skeleton", () => {
  it("keeps span IDs stable when identical markdown section text moves", async () => {
    const firstRoot = await tempRoot();
    const secondRoot = await tempRoot();
    await write(firstRoot, "context/raw/spec.md", "# API\n\nStable contract.\n");
    await write(
      secondRoot,
      "context/raw/spec.md",
      "# Intro\n\nMoved preface.\n\n# API\n\nStable contract.\n",
    );

    const first = await buildSourceSpanSkeleton({
      root: firstRoot,
      sources: [source("context/raw/spec.md")],
    });
    const second = await buildSourceSpanSkeleton({
      root: secondRoot,
      sources: [source("context/raw/spec.md")],
    });

    const firstApi = first.find((span) => span.text_preview.includes("Stable contract"));
    const secondApi = second.find((span) => span.text_preview.includes("Stable contract"));
    expect(firstApi?.span_id).toBe(secondApi?.span_id);
    expect(firstApi?.start_line).not.toBe(secondApi?.start_line);
  });

  it("skips unsupported non-text sources", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/image.png", "not real image bytes");

    await expect(
      buildSourceSpanSkeleton({
        root,
        sources: [source("context/raw/image.png", "application/octet-stream")],
      }),
    ).resolves.toEqual([]);
  });

  it("emits markdown preface content before the first heading", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/raw/spec.md",
      "---\ntitle: Spec\n---\n\nPreface requirement.\n\n# Main\n\nBody requirement.\n",
    );

    const spans = await buildSourceSpanSkeleton({
      root,
      sources: [source("context/raw/spec.md")],
    });

    expect(spans).toHaveLength(2);
    expect(spans[0]).toMatchObject({
      start_line: 1,
      end_line: 6,
      suggested_span_type: "markdown_section",
    });
    expect(spans[0]?.text_preview).toContain("Preface requirement");
    expect(spans[1]).toMatchObject({
      start_line: 7,
      suggested_span_type: "markdown_section",
    });
  });

  it("disambiguates repeated source spans in the same file", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/raw/repeated.txt",
      "Repeated requirement.\n\nRepeated requirement.\n",
    );

    const spans = await buildSourceSpanSkeleton({
      root,
      sources: [source("context/raw/repeated.txt", "text/plain")],
    });

    expect(spans).toHaveLength(2);
    expect(spans[0]?.content_sha256).toBe(spans[1]?.content_sha256);
    expect(spans[0]?.span_id).not.toBe(spans[1]?.span_id);
    expect(spans.map((span) => span.span_id.split(".").at(-1))).toEqual(["1", "2"]);
  });
});
